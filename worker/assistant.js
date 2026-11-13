const assistantAgentId='agent_6101m79xnsb5f8pbrqkjd9jtxy4c';
const assistantFaceId='a36d66df-a23d-4569-996b-d0e990019857';
const assistantLimits=new Map();

async function assistantSession(request,env){
 const reply=(body,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store'}});
 if(request.method!=='POST')return reply({},405);
 if(request.headers.get('Origin')!==new URL(request.url).origin)return reply({},403);
 if(!env.ELEVENLABS_API_KEY||!env.SIMLI_API_KEY)return reply({message:'Voice assistant setup is pending. Please contact our team.'},503);
 const ip=request.headers.get('CF-Connecting-IP')||'local';
 const now=Date.now();
 for(const [key,value] of assistantLimits)if(value.expires<=now)assistantLimits.delete(key);
 const limit=assistantLimits.get(ip)||{count:0,expires:now+600000};
 if(limit.count>=5||assistantLimits.size>=5000)return reply({message:'Please try again in a few minutes.'},429);
 limit.count++;
 assistantLimits.set(ip,limit);
 try{
  const agent=encodeURIComponent(env.ELEVENLABS_AGENT_ID||assistantAgentId);
  const [voice,avatar]=await Promise.all([
   fetch('https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id='+agent,{headers:{'xi-api-key':env.ELEVENLABS_API_KEY},signal:AbortSignal.timeout(8000)}),
   fetch('https://api.simli.ai/compose/token',{method:'POST',headers:{'x-simli-api-key':env.SIMLI_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({faceId:env.SIMLI_FACE_ID||assistantFaceId,maxSessionLength:600,maxIdleTime:90}),signal:AbortSignal.timeout(8000)})
  ]);
  if(!voice.ok||!avatar.ok){
   const failures=[['ElevenLabs',voice],['Simli',avatar]].filter(([,response])=>!response.ok).map(([provider,response])=>provider+' HTTP '+response.status);
   return reply({message:'Voice setup failed: '+failures.join(', ')+'.'},502);
  }
  const [{signed_url},{session_token}]=await Promise.all([voice.json(),avatar.json()]);
  if(!signed_url||!session_token)throw new Error();
  return reply({signedUrl:signed_url,avatarToken:session_token});
 }catch{return reply({message:'The voice assistant is temporarily unavailable.'},502);}
}
