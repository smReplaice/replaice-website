const logo=(label)=>`<span class="reference-system">${label}</span>`;
function flow(paths,viewBox){
 return `<svg class="architecture-links" viewBox="${viewBox}" preserveAspectRatio="none" aria-hidden="true">${paths.map((path,i)=>`<path class="architecture-wire" d="${path}"/><path class="architecture-packet" pathLength="100" d="${path}" style="--packet-delay:${-i*.16}s"/>`).join('')}</svg>`;
}
export function renderHeroArchitecture(){
 const inputs=Array.from({length:28},(_,i)=>{
  const x=(i+.5)*1200/28;
  return `M${x} 64 V31 Q${x} 25 ${x+(x<600?6:-6)} 25 H600 V0`;
 });
 return `<figure class="architecture reference-architecture" aria-labelledby="architecture-title">
  <figcaption><h2 id="architecture-title">Replaice platform architecture</h2><button type="button" data-architecture-toggle hidden>Pause data flow</button></figcaption>
  <div class="reference-viewport" tabindex="0" role="region" aria-label="Platform diagram. Scroll horizontally on smaller screens.">
   <div class="reference-board">
    <div class="reference-agent"><span class="reference-agent-icon" aria-hidden="true">✧</span><div><strong>Replaice AI Agent</strong><span>Your enterprise AI co-worker.</span></div></div>
    ${flow(['M600 48 V0'],'0 0 1200 48')}
    <div class="reference-core">
     <div class="reference-band"><div><h3>Replaice Intelligence</h3><p>Orchestrate AI for enterprise work.</p></div><span>Task routing · AI usage controls · Model access · APIs &amp; MCP</span></div>
     <div class="reference-context"><div><h3>Replaice Enterprise Context</h3><p>Ground AI in the people, knowledge, and systems behind your work.</p></div><div class="reference-graph" role="img" aria-label="Personal and enterprise graphs connect response preferences, habits, goals and tasks with people, customers, content, products and infrastructure.">${flow(["M150 116 H220","M470 114 H526","M865 114 H915","M1210 116 H1254"],"0 0 1315 248")}</div></div>
     <div class="reference-band reference-governance"><div><h3>Replaice Governance</h3><p>Set boundaries for enterprise AI.</p></div><span>Permissions · Agent guardrails · Human approvals · Audit history</span></div>
    </div>
    ${flow(inputs,'0 0 1200 64')}
    <div class="reference-integrations"><div class="reference-icons" role="img" aria-label="Illustrative integrations across cloud, collaboration, data, developer, and business tools"></div>${logo('ERP')}${logo('CRM')}</div>
    <p class="reference-caption">Illustrative enterprise systems and data flow</p>
   </div>
  </div>
 </figure>`;
}
export function mountHeroArchitecture(){
 const diagram=document.querySelector('.reference-architecture');
 if(!diagram)return;
 const toggle=diagram.querySelector('[data-architecture-toggle]');
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 let paused=motion.matches;
 function update(){
  diagram.classList.toggle('architecture-paused',paused);
  toggle.textContent=paused?'Play data flow':'Pause data flow';
 }
 toggle.hidden=false;
 toggle.onclick=()=>{paused=!paused;update();};
 motion.addEventListener('change',()=>{paused=motion.matches;update();});
 new IntersectionObserver(([entry])=>diagram.classList.toggle('architecture-visible',entry.isIntersecting)).observe(diagram);
 update();
}
