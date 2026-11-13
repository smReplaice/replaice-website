import {SimliClient,LogLevel} from 'simli-client';

export async function connectAssistant(widget,isCurrent,onEnd){
 let avatar,stream,context,socket,node,closed=false,timeout;
 const end=()=>{
  if(closed)return;
  closed=true;
  clearTimeout(timeout);
  node?.disconnect();
  stream?.getTracks().forEach(track=>track.stop());
  if(context)void context.close().catch(()=>{});
  socket?.close();
  if(avatar)void Promise.resolve(avatar.stop()).catch(()=>{});
 };
 try{
  context=new AudioContext({sampleRate:16000});
  const resumed=context.resume();
  void resumed.catch(()=>{});
  const response=await fetch('/api/assistant/session',{method:'POST'});
  if(!response.headers.get('Content-Type')?.includes('application/json')){
   throw new Error('The voice backend is not running. Start the website with npm run dev, then open http://localhost:8080.');
  }
  let config;
  try{config=await response.json();}
  catch{throw new Error('The voice backend returned an invalid response. Please restart it and try again.');}
  if(!response.ok)throw new Error(config.message||'Unable to start voice chat.');
  if(!isCurrent())throw new Error('Session cancelled.');
  stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true},video:false});
  if(!isCurrent())throw new Error('Session cancelled.');
  if(context.sampleRate!==16000)throw new Error('This browser does not support the required audio format.');
  await resumed;
  await context.audioWorklet.addModule('/assistant-mic.js');
  avatar=new SimliClient(config.avatarToken,widget.querySelector('video'),widget.querySelector('audio'),null,LogLevel.ERROR);
  await Promise.race([avatar.start(),new Promise((_,reject)=>{timeout=setTimeout(()=>reject(new Error('Avatar connection timed out.')),15000);})]);
  clearTimeout(timeout);
  if(!isCurrent())throw new Error('Session cancelled.');
  socket=new WebSocket(config.signedUrl);
  const send=data=>{if(socket.readyState===WebSocket.OPEN)socket.send(JSON.stringify(data));};
  node=new AudioWorkletNode(context,'assistant-mic');
  let ready=false;
  node.port.onmessage=({data})=>{
   if(!ready||!isCurrent())return;
   send({user_audio_chunk:btoa(String.fromCharCode(...new Uint8Array(data)))});
  };
  const silent=context.createGain();
  silent.gain.value=0;
  context.createMediaStreamSource(stream).connect(node).connect(silent).connect(context.destination);
  await new Promise((resolve,reject)=>{
   timeout=setTimeout(()=>reject(new Error('Voice connection timed out.')),12000);
   socket.onopen=()=>send({type:'conversation_initiation_client_data'});
   socket.onerror=()=>reject(new Error('Unable to connect to the voice agent.'));
   socket.onclose=()=>{reject(new Error('Voice connection ended.'));if(ready&&!closed)onEnd('Voice connection ended.');};
   socket.onmessage=({data})=>{
    if(!isCurrent()||closed)return;
    try{
     const event=JSON.parse(data);
     if(event.type==='conversation_initiation_metadata'){
      const meta=event.conversation_initiation_metadata_event;
      if(meta.agent_output_audio_format!=='pcm_16000'||meta.user_input_audio_format!=='pcm_16000'){
       reject(new Error('Configure ElevenLabs input and output as 16 kHz PCM.'));
       return;
      }
      ready=true;
      clearTimeout(timeout);
      resolve();
     }
     if(event.type==='ping')send({type:'pong',event_id:event.ping_event.event_id});
     if(event.type==='audio')avatar.sendAudioData(Uint8Array.from(atob(event.audio_event.audio_base_64),c=>c.charCodeAt(0)));
     if(event.type==='interruption')avatar.ClearBuffer();
    }catch{if(ready)onEnd('Audio playback was interrupted. Please reconnect.');else reject(new Error('Unable to initialize audio.'));}
   };
  });
  timeout=setTimeout(()=>onEnd('Voice session ended. You can start another chat.'),600000);
  end.sendText=text=>send({type:'user_message',text});
  return end;
 }catch(error){end();throw error;}
}
