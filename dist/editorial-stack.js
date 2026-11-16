export function mountEditorialStack(main) {
 const header=document.querySelector('.edition-header');
 const sections=[...main.children].filter(section=>section.matches('section, .edition-architecture-band, .edition-trust'));
 if(sections.length<2||!window.ResizeObserver||!CSS.supports('position','sticky'))return;
 const viewport=document.createElement('div');
 viewport.className='editorial-viewport';
 viewport.setAttribute('aria-hidden','true');
 document.body.append(viewport);
 function measure(){
  const top=header?.offsetHeight||0;
  const height=viewport.clientHeight;
  main.classList.toggle('editorial-stack',height-top>=280);
  main.style.setProperty('--stack-header',top+'px');
  sections.forEach((section,index)=>{
   section.style.setProperty('--stack-order',index+1);
   section.style.setProperty('--stack-top',Math.min(top,height-section.offsetHeight)+'px');
  });
 }
 sections.forEach((section,index)=>{
  section.classList.add('editorial-layer');
  if(index<sections.length-1)section.classList.add('editorial-hold');
 });
 const observer=new ResizeObserver(measure);
 [viewport,...sections,...(header?[header]:[])].forEach(element=>observer.observe(element));
 measure();
 main.addEventListener('focusin',event=>{
  const control=event.target;
  if(!control.matches(':focus-visible'))return;
  requestAnimationFrame(()=>{
   if(document.activeElement!==control)return;
   const box=control.getBoundingClientRect();
   const x=box.left+box.width/2,y=box.top+box.height/2;
   if(control.contains(document.elementFromPoint(x,y)))return;
   main.classList.add('editorial-focus-flow');
   control.scrollIntoView({block:'center',behavior:'instant'});
  });
 });
 main.addEventListener('focusout',()=>requestAnimationFrame(()=>{
  if(!main.contains(document.activeElement)) main.classList.remove('editorial-focus-flow');
 }));
}
