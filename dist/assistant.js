const widget=document.createElement('aside');
widget.className='site-assistant';
const portrait='<img class="assistant-portrait" src="/media/raj-avatar.jpg" alt="" width="45" height="45">';
widget.innerHTML=`<div class="assistant-nudge" hidden><span data-hint></span><button type="button" data-ask>Ask Raj</button><button type="button" data-dismiss aria-label="Dismiss suggestion">×</button></div>
<button type="button" class="button assistant-launch" aria-expanded="false" aria-controls="assistant-panel">${portrait}<span class="assistant-sparkle" aria-hidden="true">✦</span><strong>Ask Raj</strong></button>
<section id="assistant-panel" class="assistant-panel" hidden aria-label="Replaice AI assistant">
<header>${portrait}<div><strong>Raj</strong><small>Replaice AI Consultant</small></div><button type="button" data-minimize aria-label="Minimize assistant">−</button><button type="button" data-close aria-label="Close assistant">×</button></header>
<div class="assistant-media">${portrait}<video playsinline autoplay muted aria-label="AI avatar"></video><audio autoplay></audio></div>
<div class="assistant-voice-row"><button type="button" class="button" data-start>Speak now</button><p role="status" data-status>Ready</p></div>
<a class="button assistant-book" href="/contact/">Book a demo</a>
<form class="assistant-input"><input enterkeyhint="send" aria-label="Ask Raj a question" placeholder="Ask Raj a question" maxlength="500" required><button type="submit" aria-label="Send question" disabled>→</button></form>
<small class="assistant-disclosure">AI assistant · <a href="/privacy/">Privacy</a></small>
</section>`;
document.body.append(widget);
const panel=widget.querySelector('section'),launch=widget.querySelector('.assistant-launch'),nudge=widget.querySelector('.assistant-nudge'),start=widget.querySelector('[data-start]'),status=widget.querySelector('[data-status]');
let active,revision=0;
const usageKey='replaice-raj-tab-used-v2';
const followup=widget.querySelector('.assistant-book');
let used=false;
try{used=sessionStorage.getItem(usageKey)==='1';}catch{}
function finish(focus=false){
 start.hidden=true;
 question.hidden=true;
 status.textContent='Thanks for talking with Raj. For more details, our consulting team can help you with the next step.';
 followup.textContent='Talk to our consulting team';
 if(focus&&!panel.hidden)followup.focus();
}
const question=widget.querySelector('.assistant-input');
const composer=question.querySelector('input'),sendQuestion=question.querySelector('button');
composer.addEventListener('input',()=>{sendQuestion.disabled=!composer.value.trim();});
question.onsubmit=event=>{
 event.preventDefault();
 const input=question.querySelector('input');
 const value=input.value.trim();
 if(!value)return;
 if(!active){status.textContent='Select Speak now to connect, then send your question.';start.focus();return;}
 active.sendText(value);
 input.value='';
 sendQuestion.disabled=true;
};
const hints={
 biltflow:'Explore how BiltFlow connects construction workflows.',
 northstar:'Ask how NorthStar connects site observations to project records.',
 'hybridrag-agent':'Ask how HybridRAG grounds answers in enterprise knowledge.',
 'replaice-desk':'Explore how Replaice Desk handles support requests.',
 janavy:'Ask how Janavy helps control document access.',
 engage:'Explore customer journeys across email, messaging and voice.',
 replaicecare:'Ask how ReplaiceCare supports healthcare operations.',
 contact:'Have a business challenge in mind? Request a consultation.'
};
const fallback='Wondering where AI could help in your business?';
let seen=false,dismissed=false,hintTimer,scheduled;
const key='replaice-assistant-nudge';
try{seen=sessionStorage.getItem(key)==='1';}catch{}
function dismiss(){
 dismissed=true;
 nudge.hidden=true;
 clearTimeout(hintTimer);
 clearTimeout(scheduled);
 try{sessionStorage.setItem(key,'1');}catch{}
}
function schedule(){
 clearTimeout(scheduled);
 if(seen||dismissed)return;
 scheduled=setTimeout(()=>{
  if(document.hidden||!panel.hidden||document.activeElement?.closest('form,input,textarea,[contenteditable]'))return;
  const context=location.hash.slice(1)||location.pathname.split('/').filter(Boolean).at(-1);
  nudge.querySelector('[data-hint]').textContent=hints[context]||fallback;
  seen=true;
  try{sessionStorage.setItem(key,'1');}catch{}
  nudge.hidden=false;
  hintTimer=setTimeout(()=>{nudge.hidden=true;},8500);
 },10000);
}
schedule();
window.addEventListener('hashchange',schedule);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)schedule();});
nudge.querySelector('[data-dismiss]').onclick=dismiss;
nudge.querySelector('[data-ask]').onclick=()=>toggle(true);
function stop(){
 revision++;
 active?.();
 active=undefined;
 panel.classList.remove("assistant-live");
 start.disabled=false;
 start.textContent='Speak now';
}
function toggle(open){
 panel.hidden=!open;
 widget.classList.toggle("assistant-expanded",open);
 nudge.hidden=true;
 launch.setAttribute('aria-expanded',String(open));
 if(open){dismiss();if(used&&!active)finish(true);else start.focus();}
 else{stop();if(used)finish();launch.focus();}
}
launch.onclick=()=>toggle(panel.hidden);
widget.querySelector('[data-minimize]').onclick=()=>{panel.hidden=true;widget.classList.remove("assistant-expanded");launch.setAttribute('aria-expanded','false');launch.focus();};
widget.querySelector('[data-close]').onclick=()=>toggle(false);
widget.addEventListener('keydown',event=>{if(event.key==='Escape'&&!panel.hidden)toggle(false);});
start.onclick=async()=>{
 if(active){stop();finish(true);return;}
 if(used){finish(true);return;}
 const attempt=++revision;
 start.disabled=true;
 start.textContent='Connecting…';
 status.textContent='Connecting…';
 try{
  const {connectAssistant}=await import('./assistant-voice.js');
  if(attempt!==revision)return;
  const end=await connectAssistant(widget,()=>attempt===revision,message=>{
   if(attempt===revision){stop();if(used)finish(true);else status.textContent=message;}
  });
  if(attempt!==revision){end();return;}
  active=end;
  used=true;
  try{sessionStorage.setItem(usageKey,'1');}catch{}
  panel.classList.add("assistant-live");
  start.textContent='End voice chat';
  status.textContent='Listening. Ask about Replaice.';
 }catch(error){if(attempt===revision){if(error.sessionUsed){used=true;try{sessionStorage.setItem(usageKey,'1');}catch{}finish(true);}else status.textContent=error.message||'Unable to start voice chat.';}}
 finally{if(attempt===revision){start.disabled=false;if(!active)start.textContent='Speak now';}}
};
window.addEventListener('pagehide',()=>{stop();if(used)finish();});
