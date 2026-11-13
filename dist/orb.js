const descriptions = [
 ['.hero','Replaice','Agentic AI and physical AI turn enterprise knowledge into action.'],
 ['#solutions','What we do','Explore enterprise transformation, agentic platforms, and physical AI.'],
 ['#platforms','Our platforms','Six specialized platforms for construction, robotics, knowledge, compliance, support, and engagement.'],
 ['#trust','Enterprise trust','See how permissions, human approvals, and audit history govern automation.'],
 ['.closing','Talk to our AI team','Explore where AI can help in your enterprise workflows.']
];

export function mountSectionOrb() {
 const sections=descriptions.map(([selector,title,description])=>({element:document.querySelector(selector),title,description})).filter(section=>section.element);
 if (!sections.length) return;
 const guide=document.createElement('aside');
 guide.className='section-orb';
 guide.setAttribute('aria-label','Section guide');
 guide.innerHTML='<button type="button" aria-expanded="false" aria-controls="orb-info"><img src="/media/section-orb.svg" width="76" height="76" alt=""></button><div class="orb-info" id="orb-info" hidden><strong></strong><p></p></div>';
 document.body.append(guide);
 const button=guide.querySelector('button'),info=guide.querySelector('.orb-info');
 const title=info.querySelector('strong'),description=info.querySelector('p');
 let active,timeout,scheduled=false;
 function hide() {
  clearTimeout(timeout);
  info.hidden=true;
  button.setAttribute('aria-expanded','false');
 }
 function show(auto=false) {
  clearTimeout(timeout);
  info.hidden=false;
  button.setAttribute('aria-expanded','true');
  if (auto) timeout=setTimeout(hide,4200);
 }
 function update() {
  scheduled=false;
  const marker=innerHeight*.43;
  let next=sections[0];
  for(const section of sections) {
   if(section.element.getBoundingClientRect().top<=marker) next=section;
  }
  if(next!==active) {
   active=next;
   title.textContent=next.title;
   description.textContent=next.description;
   button.setAttribute('aria-label','About '+next.title);
   const index=sections.indexOf(next);
   guide.style.setProperty('--orb-height', [30,42,48,39,46,53][index]+'dvh');
   show(true);
  }
 }
 function schedule() {
  if (!scheduled) {
   scheduled=true;
   requestAnimationFrame(update);
  }
 }
 button.addEventListener('click',()=>info.hidden?show():hide());
 document.addEventListener('keydown',event=>{if(event.key==='Escape')hide();});
 window.addEventListener('scroll',schedule,{passive:true});
 window.addEventListener('resize',schedule);
 update();
}
