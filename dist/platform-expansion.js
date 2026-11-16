const order=['HybridRAG Agent','Replaice Desk','Engage','Janavy','BiltFlow','NorthStar','ReplaiceCare'];
const colors=['#2450ff','#0b7373','#ff6b4a','#f2a93b','#0b1e4d','#6fa8ff','#18794f'];
const tags=['Knowledge','Support','Engagement','Documents','Construction','Robotics','Healthcare'];
const slug=name=>name.toLowerCase().replaceAll(' ','-');
const careSteps=['Connect authorized systems','Coordinate intake','Route administrative tasks','Review claims workflows'];
const biltflowLifecycle=[
 ['SiteScope','Assess site feasibility and carry project constraints and assumptions into planning.'],
 ['Pulse','Build the programme, connecting phases, dependencies and milestones to delivery dates.'],
 ['Vault','Manage drawings, documents and revisions that define the scope for estimating and procurement.'],
 ['BOQ Engine &amp; Estimator','Turn reviewed drawings into quantities and cost estimates for trade packages.'],
 ['ProcureFlow','Take those packages through tendering, bid comparison and contract award, aligned with programme requirements.'],
 ['PayFlow','Assess progress claims against awarded scope, contract terms and milestones, then certify approved amounts for payment.'],
 ['ResourceFlow','Use programme dates to forecast workforce demand and coordinate allocations across projects throughout delivery.'],
];
export function platformExpansion(products,visual){
 return `<div class="platform-expansion">${order.map((name,i)=>{
  const p=products.find(item=>item[0]===name), id=slug(name);
  const external=/^https:\/\//.test(p[5]);
  return `<article class="platform-fold" id="${id}" style="--tile:${colors[i]};--tile-ink:${[2,3,5].includes(i)?'#0a0f1f':'white'}">
    <button type="button" class="platform-toggle" aria-expanded="false" aria-controls="fold-${id}"><span class="edition-label">${String(i+1).padStart(2,'0')}</span><strong>${name}</strong><span class="edition-label">${tags[i]}</span><span class="platform-teaser">${p[2]}</span></button>
    <div class="platform-detail" id="fold-${id}" hidden><button type="button" class="platform-close" aria-label="Close ${name}">×</button>
    <div class="platform-detail-grid"><div><p class="edition-label">${p[1]}</p><h3 tabindex="-1">${name}</h3><p class="platform-tagline">${p[2]}</p><p>${p[3]}</p>${name==='BiltFlow'?'':`<ul>${p[4].slice(0,3).map(x=>`<li>${x}</li>`).join('')}</ul>`}<div class="actions"><a class="button" href="${external?p[5]:'/platforms/'+id+'/'}" ${external?'target="_blank" rel="noopener noreferrer"':''}>${external?'Visit '+name+' website ↗':'Explore '+name+' →'}</a><a class="button outline" href="/contact/?product=${encodeURIComponent(name)}">Book a demo →</a></div></div>${visual(p)}</div>
    <p class="edition-label">How it works</p>${name==='BiltFlow'?`<h4 class="platform-lifecycle-title">One connected construction lifecycle.</h4><ol class="platform-flow platform-lifecycle">${biltflowLifecycle.map(([module,copy])=>`<li><strong>${module}</strong> — ${copy}</li>`).join('')}</ol>`:`<ol class="platform-flow">${(p[6]||careSteps).map(step=>`<li>${step}</li>`).join('')}</ol>`}</div></article>`;
 }).join('')}</div>`;
}
export function mountPlatformExpansion(){
 const group=document.querySelector('.platform-expansion');
 if(!group)return;
 const folds=[...group.querySelectorAll('.platform-fold')];
 const toggles=folds.map(f=>f.querySelector('.platform-toggle'));
 let active=null;
 function show(fold,focus){
  const previous=active;
  active=fold;
  group.classList.toggle('has-detail',!!fold);
  folds.forEach((item,i)=>{
   const open=item===fold;
   item.classList.toggle('is-active',open);
   toggles[i].setAttribute('aria-expanded',String(open));
   item.querySelector('.platform-detail').hidden=!open;
  });
  if(focus&&fold){fold.querySelector('h3').focus({preventScroll:true});fold.scrollIntoView({block:'nearest'});}
  if(focus&&!fold)previous?.querySelector('.platform-toggle').focus();
 }
 function choose(fold){
  if(active===fold){history.replaceState(null,'','#platforms');show(null,true);return;}
  history.pushState({platformSelection:true},'','#platforms/'+fold.id);
  show(fold,true);
 }
 function sync(){
  const fold=folds.find(item=>location.hash==='#platforms/'+item.id)||null;
  if(fold!==active)show(fold,true);
 }
 toggles.forEach((button,i)=>{
  button.onclick=()=>choose(folds[i]);
  folds[i].querySelector('.platform-close').onclick=()=>choose(folds[i]);
  button.addEventListener('keydown',e=>{
   const direction={ArrowLeft:-1,ArrowUp:-1,ArrowRight:1,ArrowDown:1}[e.key];
   if(!direction)return;
   e.preventDefault();
   const visible=toggles.filter(toggle=>toggle.getClientRects().length);
   visible[(visible.indexOf(button)+direction+visible.length)%visible.length].focus();
  });
 });
 group.addEventListener('keydown',e=>{if(e.key==='Escape'&&active){e.preventDefault();choose(active);}});
 addEventListener('hashchange',sync);
 addEventListener('popstate',sync);
 sync();
}
