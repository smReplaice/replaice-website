const alternates={
 'Healthcare':['/media/amr-workspace.webp','AMR clinical workspace with patient details redacted'],
 'Construction & Real Estate':['/media/construction-pic.webp','Tower cranes above a high-rise construction site'],
};
export function industrySlides(name,src){
 const alternate=alternates[name];
 if(!alternate)return '';
 return `<figure class="industry-slides"><div class="industry-slide-stage"><img src="${src}" alt="${name==='Healthcare'?'Healthcare operations team':'BiltFlow Vault drawing review'}" loading="lazy"><img src="${alternate[0]}" alt="${alternate[1]}" loading="lazy" aria-hidden="true"></div></figure>`;
}
export function mountIndustrySlides(){
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 for(const gallery of document.querySelectorAll('.industry-slides')){
  const images=gallery.querySelectorAll('img');
  images[1].loading='eager';
  let visible=!('IntersectionObserver' in window),alternate=false,timer;
  function sync(){
   clearInterval(timer);
   if(!motion.matches&&visible&&!document.hidden)timer=setInterval(()=>{
    if(!images[1].naturalWidth)return;
    alternate=!alternate;
    gallery.classList.toggle('show-alternate',alternate);
    images[0].setAttribute('aria-hidden',String(alternate));
    images[1].setAttribute('aria-hidden',String(!alternate));
   },3500);
  }
  motion.addEventListener('change',sync);
  document.addEventListener('visibilitychange',sync);
  if (!visible) new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();}).observe(gallery);
  sync();
 }
}
