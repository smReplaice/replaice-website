import {spatialScene} from './spatial-scenes.js';

const demo='/contact/?product=NorthStar';
const aerial='/media/northstar-aerial.webp';
const photos=[
 ['operator','Site professional operating a drone'],
 ['aerial','Overhead view of a construction site'],

];
const reviewVisuals=[
 '<figure class="ns-review-photo"><img src="/media/northstar-aerial-detail.webp" alt="Aerial view of building work in progress" loading="lazy"><figcaption>Example aerial evidence for review</figcaption></figure>',
 '<div class="ns-record"><small>ILLUSTRATIVE DRAWING REFERENCE</small><strong>A-101 · Zone B</strong><span>Compare the observed slab edge with the current drawing revision before deciding on follow-up.</span></div>',
];
const capabilities=[
 ['Inspect with better visibility.','Use drone and robotic capture to help teams review physical conditions across the areas included in an inspection. Give reviewers visual context beyond isolated notes and verbal updates.'],
 ['Bring potential issues into focus.','Surface visual observations that may indicate progress, quality or safety concerns. Present the evidence clearly so qualified reviewers can investigate and decide what action is appropriate.'],
 ['Connect findings to the project.','Link observations with relevant drawings and schedules so teams can understand where a finding belongs and what it may affect.'],
];
const planning=[
 ['Scope the inspection.','Identify the site or asset, inspection objectives, capture conditions and the people responsible for reviewing findings.'],
 ['Connect the right information.','Confirm which drawings, schedules and project records are available, along with access requirements and integration options.'],
 ['Agree on review and evaluation.','Define how observations will be assessed, who decides on follow-up and how the initial deployment will be evaluated.'],
];
export function northstarPage(){
 return `<section class="wrap edition-section ns-hero"><div class="detail-heading"><p class="edition-label editorial-oval">Physical AI & Robotics</p><h1>NorthStar</h1></div><div><p>NorthStar brings together drones, robotics and visual AI to help teams inspect physical sites, review potential issues and connect findings to project records.</p><p>Give project teams a clearer view of what is happening on site—and the context to decide what happens next.</p><div class="actions"><a class="button" href="${demo}">Book a NorthStar demo</a><a class="button outline" href="#inspection-capabilities">See what teams can do ↓</a><a class="button outline" href="https://northstar.biltflow.com/" target="_blank" rel="noopener noreferrer">Visit NorthStar website ↗</a></div></div><div class="ns-hero-media"><img src="${aerial}" width="1024" height="768" alt="Overhead view of a construction site"></div><figure class="ns-quadruped"><img src="/media/northstar-quadruped.webp" width="950" height="534" alt="NorthStar quadruped ground robot"><figcaption><strong>All-weather quadruped ground drone</strong><p>NorthStar’s four-legged unmanned ground vehicle uses a proprietary blind-mode control system to traverse rough terrain. It adapts to slippery or uneven ground and can right itself after a fall. Cameras, 3D imaging and LiDAR help teams inspect site progress and work quality.</p></figcaption></figure></section>
 <section class="wrap edition-section" id="inspection-capabilities"><p class="edition-label">WHAT TEAMS CAN DO</p><h2>See the site. Understand the implications.</h2><p>Bring visual evidence and project information together to support inspection, coordination and review.</p><div class="ns-capabilities">${capabilities.map(([title,copy],i)=>`<article>${i===0?`<figure class="ns-gallery" data-ns-gallery><img src="/media/northstar-${photos[0][0]}.webp" alt="${photos[0][1]}" loading="lazy"><figcaption aria-live="polite">${photos[0][1]}</figcaption><div class="ns-gallery-controls" hidden><button type="button" data-direction="-1" aria-label="Previous photo">←</button><button type="button" data-direction="1" aria-label="Next photo">→</button></div></figure>`:reviewVisuals[i-1]}<h3>${title}</h3><p>${copy}</p></article>`).join('')}</div><figure class="ns-scan">${spatialScene('scan')}<figcaption>Illustrative drone scan</figcaption></figure></section>
 <section class="ns-band"><div class="wrap edition-section"><p class="edition-label">PLAN YOUR DEPLOYMENT</p><h2>Start with one site. Define what success looks like.</h2><p>Work with the Replaice team to identify a suitable inspection workflow, establish the evidence your teams need and plan how findings will connect to existing project processes.</p><div class="ns-hero ns-planning"><div class="ns-record"><small>INSPECTION PLANNING</small><strong>Site · Evidence · Review</strong><span>Define what to capture, the records to compare and who will decide on follow-up.</span></div><div><p class="edition-label">Proposed engagement approach</p>${planning.map(([title,copy])=>`<h3>${title}</h3><p>${copy}</p>`).join('')}</div></div><div class="actions"><a class="button" href="${demo}">Discuss your inspection workflow →</a><a class="button outline" href="/#trust">Review governance and security →</a></div></div></section>`;
}
export function mountNorthstarGallery(){
 const gallery=document.querySelector('[data-ns-gallery]');
 if(!gallery)return;
 const image=gallery.querySelector('img'),caption=gallery.querySelector('figcaption'),controls=gallery.querySelector('.ns-gallery-controls');
 let index=0;
 controls.hidden=false;
 controls.addEventListener('click',event=>{
  const button=event.target.closest('button');
  if(!button)return;
  index=(index+Number(button.dataset.direction)+photos.length)%photos.length;
  const [file,label]=photos[index];
  image.src='/media/northstar-'+file+'.webp';
  image.alt=label;
  caption.textContent=label;
 });
}
