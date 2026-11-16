const posters={neural:'/media/neural-grid.svg',scan:'/media/northstar-scan.svg'};
export const spatialScene=kind=>`<div class="spatial-scene spatial-${kind}" data-spatial="${kind}" style="--poster:url('${posters[kind]}')" role="img" aria-label="${kind==='scan'?'Drone scanning a construction site grid':'Blue enterprise network grid'}"></div>`;

export function mountSpatialScenes(){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const lowPower=navigator.connection?.saveData||(navigator.deviceMemory&&navigator.deviceMemory<=4)||(navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=4);
 if(lowPower||!('IntersectionObserver'in window))return;
 for(const host of document.querySelectorAll('[data-spatial]')){
  let visible=false,started=false,update;
  const sync=()=>{
   if(visible&&!reduced.matches&&!started){
    started=true;
    const load=()=>initScene(host).then(fn=>{update=fn;sync();}).catch(()=>host.replaceChildren());
    if('requestIdleCallback'in window)requestIdleCallback(load,{timeout:2500});else setTimeout(load,500);
   }
   update?.(visible&&!document.hidden&&!reduced.matches);
  };
  new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();}).observe(host);
  reduced.addEventListener('change',sync);
  document.addEventListener('visibilitychange',sync);
 }
}
async function initScene(host){
 const {mountSpatialEngine}=await import('./spatial-engine.js');
 return mountSpatialEngine(host);
}
