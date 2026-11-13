import {northstarMotion} from "./northstar-motion.js";
import {carePath,careDemo,mountCare,renderCarePage} from './replaicecare.js';
import {renderBiltFlowDemo} from "./biltflow-demo.js";
import {solutionHeadline,renderSolutionVisual} from "./solution-visuals.js";
import {renderSolutionValue,renderConstructionCase} from "./solution-value.js";
import {renderConstructionLifecycle} from "./construction-lifecycle.js";
import {legalPages} from "./legal.js";
import {renderHeroCity,mountHeroCity} from "./hero-city.js";
import {renderSecurity} from "./security.js";
import {solutions} from "./discovery.js";
import {renderHeroArchitecture,mountHeroArchitecture} from "./hero-architecture.js";
import {products,marketingMetrics} from './data.js';
const productId=p=>p[0].toLowerCase().replaceAll(' ','-');
const link=(href,label,kind='')=>`<a class="button ${kind}" href="${href}">${label} <span aria-hidden="true">↗</span></a>`;
const headline=(label,title,body='')=>`<div class="intro"><div class="eyebrow">${label}</div><h2>${title}</h2>${body?'<p>'+body+'</p>':''}</div>`;
const illustrations=[
'<rect x="20" y="25" width="75" height="30" rx="5"/><rect x="20" y="75" width="75" height="30" rx="5"/><path class="flow" d="M95 40H130V65H160 M95 90H130V65"/><rect x="160" y="38" width="103" height="54" rx="8"/><path d="M180 55h62m-62 12h48m-48 12h35"/>',
'<path class="flow" d="M47 65H250"/><circle cx="47" cy="65" r="20" fill="#10213c"/><circle cx="146" cy="65" r="26" fill="#10213c"/><circle cx="250" cy="65" r="20" fill="#10213c"/><path d="M37 65h20m-10-10v20m87-11 9 9 15-16m84 8 6 6 10-12"/>',
'<path d="M40 103l105-30 104 30-104 23z M89 87V55l56-17 56 17v32m-56-49v54m-56-37 56 19 56-19 M128 22h34m-43-7 9 7-9 7m52-14-9 7 9 7"/><path class="flow" d="M145 25L89 87m56-62 56 62"/>'
];
const pillars=[
['transformation','Enterprise AI Transformation','Turn institutional knowledge into production-ready intelligence.','Transform enterprise data, workflows and expertise into secure AI systems.',['Discover high-impact AI opportunities','Connect business knowledge, applications and models','Deploy governed workflows and measure performance'],'/solutions/enterprise-ai/','Transform Your Enterprise'],
['agents','Agentic AI Platforms','Put intelligence to work.','Automate complex processes and coordinate execution across enterprise systems.',['Specialized enterprise AI for operational workflows','Agents that plan and take authorized actions','Cross-system orchestration with human oversight'],'#platforms','Explore Our AI Platforms'],
['physical','Physical AI & Robotics','Bring intelligence into the real world.','NorthStar combines drones, robotics, computer vision and agents to optimize physical operations.',['Autonomous site capture and analysis','Visual detection of progress, quality and safety issues','Evidence linked to drawings, quantities and schedules'],'#northstar','Discover NorthStar']
];
const demo=p=>`<div class="demo" data-demo="${productId(p)}"><div class="demo-head mono"><span>${p[0]} workflow</span><span>Illustrative data</span></div><div class="demo-body"><ol>${p[6].map((s,i)=>`<li><span aria-hidden="true">${String(i+1).padStart(2,'0')} · </span>${s}</li>`).join('')}</ol><div class="demo-output"></div></div><div class="demo-controls"><span class="mono demo-state">Ready</span><div><button type="button" data-play aria-label="Play or pause ${p[0]} demo">Pause</button> <button type="button" data-replay aria-label="Replay ${p[0]} demo">Replay</button></div></div></div>`;
const hybridFlow=()=>`<div class="hybrid-flow" data-hybrid-flow>
  <div class="hybrid-flow-grid">
    <figure><figcaption><h4>ETL for AI data</h4><p>Cleanse and process images, documents, and connected data sources. Structure them into datasets that preserve meaning for retrieval.</p></figcaption>
      <img src="/media/hybrid-etl.png" width="670" height="312" loading="lazy" decoding="async" data-loop="/media/hybrid-etl.gif" alt="Images, documents, and data sources flow into the ETL pipeline and emerge as a structured dataset."></figure>
    <figure><figcaption><h4>High-precision hybrid search</h4><p>Combine vector search, BM25 full-text search, and tensor retrieval. Apply custom scoring and reranking to select the most relevant context for the answer.</p></figcaption>
      <img src="/media/hybrid-search.png" width="670" height="312" loading="lazy" decoding="async" data-loop="/media/hybrid-search.gif" alt="A query branches into vector, full-text, and tensor retrieval. Results merge at the reranker and flow to the answer."></figure>
  </div><button class="hybrid-play" type="button">Pause animation</button>
</div>`;
const platformCard=p=>`<article class="product" id="${productId(p)}"><div class="product-copy"><div class="mono">${p[1]}</div><h3>${p[0]}</h3><p><strong>${p[2]}</strong></p><p>${p[3]}</p><ul>${p[4].map(x=>`<li>${x}</li>`).join('')}</ul><a class="link" href="${p[5]}"${p[5].startsWith('https://')?' target="_blank" rel="noopener noreferrer"':''}>Explore ${p[0]} ↗</a></div>${p[0]==='ReplaiceCare'?careDemo():p[0]==='BiltFlow'?renderBiltFlowDemo():p[0]==='HybridRAG Agent'?hybridFlow():demo(p)}${p[0]==='NorthStar'?northstarMotion():''}</article>`;
const contact=()=>`<section class="section"><div class="wrap"><div class="eyebrow">Contact Replaice</div><h1>Talk to our <em>AI team.</em></h1><div class="contact-grid" style="margin-top:28px"><div><p>Tell us about your enterprise workflows and where you want to put AI to work.</p><div class="offices"><article><h3>India</h3><p>Replaice Technologies Pvt Ltd<br>Bizzhub, 6th Floor, No. 144<br>MSR North Tower, Outer Ring Road<br>Nagavara, Hebbal, Bengaluru, Karnataka 560045<br>India</p></article><article><h3>Singapore Head Office</h3><p>Huntglobal Pte Ltd<br>Level 8, 2 Venture Drive<br>Singapore 608526</p></article></div></div><form id="enquiry"><p>We’ll email a confirmation to your business address. We include your approximate city, region, and country, inferred from your IP address when available, in the internal enquiry. See our <a href="/privacy/" class="link">Privacy Policy</a>.</p><label>Name<input name="Name" autocomplete="name" required></label><label>Business email<input name="Business email" type="email" autocomplete="email" required></label><label>Company<input name="Company" autocomplete="organization" required></label><label>Country<input name="Country" autocomplete="country-name" required></label><label>Product interest<select name="Product interest" required><option value="">Select a platform or service</option>${[...products.map(p=>p[0]),'Enterprise AI Transformation','Other'].map(x=>`<option>${x}</option>`).join('')}</select></label><label>Business challenge<input name="Business challenge" required></label><label>Message<textarea name="Message" required></textarea></label><div hidden><label>Website<input name="Website" tabindex="-1" autocomplete="off"></label></div><button class="button" type="submit">Send enquiry</button><p role="status" id="form-status"></p></form></div></div></section>`;
const closing=()=>`<section class="closing dark"><div class="wrap"><h2>Your enterprise is ready for <em>intelligent action.</em></h2><p>Build connected operations with specialized agentic platforms, trusted enterprise intelligence and physical AI.</p><div class="actions">${link('/contact/','Talk to Our AI Team')}${link('/#platforms','Explore Our Platforms','outline')}</div></div></section>`;
const benchmarkMetrics=[
 [String(products.length),'Specialized AI platforms'],
 ['40+','Distinct language models'],
 ['110 hours','Saved per user per year'],
 ['275+','Work app and data source connections'],
 ['3+ billion','Cumulative searches across documents and knowledge objects'],
 ['99.9%+','Uptime across core search and AI services']
];
const renderBenchmarkStrip=()=>`<section class="benchmark-strip" aria-labelledby="benchmark-title"><div class="wrap"><h2 id="benchmark-title">Illustrative enterprise AI benchmarks</h2><dl>${benchmarkMetrics.map(([value,label])=>`<div><dt>${label}</dt><dd>${value}</dd></div>`).join('')}</dl></div></section>`;
const home=()=>`
<section class="hero city-hero">${renderHeroCity()}<div class="wrap city-copy"><div class="eyebrow">Enterprise Agentic AI + Physical AI</div><h1>From Enterprise Complexity to <em>Intelligent Action.</em></h1><p class="sub">Powered by Agentic AI &amp; Physical AI.</p><p>Replaice transforms enterprise expertise, data, and operational complexity into intelligent action. Our specialized AI platforms combine enterprise knowledge, autonomous agents, and physical intelligence to help organizations adopt AI, orchestrate mission-critical workflows, and accelerate business transformation.</p><div class="actions">${link('#platforms','Explore Our Platforms')}${link('/contact/','Talk to Our AI Team','outline')}</div></div></section>${renderBenchmarkStrip()}<div class="wrap city-architecture">${renderHeroArchitecture()}</div>

<section class="section wrap" id="solutions">${headline('What we do','Enterprise intelligence.<br><em>Built around your business.</em>','Replaice combines enterprise technology expertise with purpose-built AI platforms to help organizations move from experimentation to intelligent, autonomous operations.')}<div class="pillars">${pillars.map((p,i)=>`<article class="pillar" id="${p[0]}"><div class="art"><svg viewBox="0 0 285 130" aria-hidden="true" fill="none" stroke="#80ddf4" stroke-width="1.5">${illustrations[i]}</svg></div><div class="pillar-copy"><div class="mono">${p[1]}</div><h3>${p[2]}</h3><p>${p[3]}</p><ul>${p[4].map(s=>`<li>${s}</li>`).join('')}</ul><a class="link" href="${p[5]}">${p[6]} ↗</a></div></article>`).join('')}</div></section>
<section class="section dark" id="platforms"><div class="wrap">${headline('The Replaice product ecosystem','Purpose-built AI.<br><em>Enterprise-wide impact.</em>','Seven specialized AI platforms for construction, robotics, compliance, enterprise knowledge, customer support, engagement and healthcare.')}<div class="products">${products.map(platformCard).join('')}</div></div></section>
${renderSecurity()}
${marketingMetrics.some(m=>m.verified)?`<section class="section wrap"><h2>Operational outcomes</h2>${marketingMetrics.filter(m=>m.verified).map(m=>`<p>${m.value} ${m.label}</p>`).join('')}</section>`:''}<section class="section wrap" id="enterprise-ai-solutions">${headline('Solutions','Find the right enterprise AI solution.')}<div class="compare">${solutions.map(item=>`<article><h3><a href="/solutions/${item.slug}/">${item.title}</a></h3><p>${item.summary}</p><a class="link" href="/solutions/${item.slug}/">Explore solution ↗</a></article>`).join('')}</div></section>${closing()}`;
export function renderPage(path){
 if(path.replace(/\/$/,'')===carePath)return renderCarePage();
 const [,page,slug]=path.split('/');
 const legal=legalPages[path.endsWith('/')?path:path+'/'];
 if(legal)return `<section class="section wrap legal-page"><h1>${legal.title}</h1><p>${legal.summary}</p>${legal.sections.map(([title,body])=>`<section><h2>${title}</h2><p>${body}</p></section>`).join('')}</section>`;
 if(page==='contact')return contact();
 if(page==='engage'){
  const p=products.find(p=>p[0]==='Engage');
  return `<section class="section dark"><div class="wrap"><div class="eyebrow">${p[1]}</div><h1>Engage</h1><div class="intro" style="margin-top:20px"><h2>${p[2]}</h2><p>${p[3]}</p></div><div class="engage-demo">${demo(p)}</div><div class="actions">${link('/contact/','Request an Engage demo')}</div></div></section>${closing()}`;
 }
 const solution=solutions.find(item=>item.slug===slug);
 if(page==='solutions'&&solution){
  return `<section class="section wrap enterprise-solution"><div><div class="intro"><div class="eyebrow">Replaice solutions</div><h1>${solutionHeadline(solution.slug)}</h1><p>${solution.summary}</p></div><h2>What you can do</h2><ul>${solution.examples.map(item=>`<li>${item}</li>`).join('')}</ul><h2>Related platforms</h2><ul>${solution.platforms.map(name=>`<li><a class="link" href="/#${productId([name])}">${name} ↗</a></li>`).join('')}</ul><div class="actions">${link('/contact/','Talk to Our AI Team')}</div></div>${renderSolutionVisual(solution.slug)}</section>${renderSolutionValue(solution.slug)}${solution.slug==='construction-ai'?renderConstructionLifecycle()+renderConstructionCase():''}`;
 }
 return home();
}
if(typeof document!=='undefined'){
const page=location.pathname.split('/')[1];
const main=document.querySelector('main');
if(!main.firstElementChild)main.innerHTML=renderPage(location.pathname);
if(!page){mountHeroArchitecture();mountHeroCity();}
mountCare();
void import("./assistant.js");
document.querySelector('#platform-menu').innerHTML=products.map(p=>`<a href="${p[0]==='ReplaiceCare'?carePath:'/#'+productId(p)}">${p[0]}</a>`).join('');
const menu=document.querySelector('#menu'),navigation=document.querySelector('#navigation');
function closeNav(){navigation.classList.remove('open');menu.setAttribute('aria-expanded','false');navigation.querySelectorAll('details').forEach(d=>d.open=false);}
menu.onclick=()=>menu.setAttribute('aria-expanded',String(navigation.classList.toggle('open')));
navigation.addEventListener('click',e=>{if(e.target.closest('a'))closeNav();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const open=navigation.querySelector('details[open] summary');const mobile=navigation.classList.contains('open');closeNav();if(mobile)menu.focus();else open?.focus();}});
document.addEventListener('click',e=>{if(!e.target.closest('nav'))closeNav();});
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('[data-hybrid-flow]').forEach(flow=>{
 const button=flow.querySelector('button');
 const images=[...flow.querySelectorAll('img')].map(img=>({img,still:img.getAttribute('src')}));
 let playing=!reduced.matches,visible=false;
 function sync(){
  button.textContent=playing?'Pause animation':'Play animation';
  images.forEach(({img,still})=>{
   const source=playing&&visible&&!document.hidden?img.dataset.loop:still;
   if(img.getAttribute('src')!==source)img.src=source;
  });
 }
 button.onclick=()=>{playing=!playing;sync();};
 new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();}).observe(flow);
 reduced.addEventListener('change',()=>{playing=!reduced.matches;sync();});
 document.addEventListener('visibilitychange',sync);
 sync();
});
document.querySelectorAll('[data-demo]').forEach(el=>{
 const p=products.find(x=>productId(x)===el.dataset.demo);
 const rows=[...el.querySelectorAll('li')],play=el.querySelector('[data-play]'),state=el.querySelector('.demo-state'),output=el.querySelector('.demo-output');
 let step=reduced.matches?rows.length:0,playing=!reduced.matches,visible=false,timer;
 function render(){rows.forEach((row,i)=>{row.classList.toggle('active',i===step);row.classList.toggle('done',i<step);});state.textContent=step===rows.length?'Completed':'Step '+(step+1)+' / '+rows.length;output.textContent=step===rows.length?p[7]:'';play.textContent=playing?'Pause':'Play';}
 function schedule(){clearTimeout(timer);if(visible&&playing&&!document.hidden)timer=setTimeout(()=>{step=(step+1)%(rows.length+1);render();schedule();},step===rows.length?3100:1350);}
 play.onclick=()=>{playing=!playing;render();schedule();};el.querySelector('[data-replay]').onclick=()=>{step=0;playing=!reduced.matches;render();schedule();};
 new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;schedule();}).observe(el);document.addEventListener('visibilitychange',schedule);reduced.addEventListener('change',()=>{if(reduced.matches){playing=false;step=rows.length;render();schedule();}});render();
});
const motionObserver=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>target.classList.toggle('in-view',isIntersecting)));
document.querySelectorAll('.graph,.art').forEach(el=>motionObserver.observe(el));
document.querySelector('#enquiry')?.addEventListener('submit',async e=>{
 e.preventDefault();
 const form=e.currentTarget,button=form.querySelector('button[type="submit"]'),status=document.querySelector('#form-status');
 button.disabled=true;
 status.textContent='Sending your enquiry…';
 try{
  const response=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form)))});
  const result=await response.json();
  if(!response.ok)throw new Error(result.message);
  status.textContent=result.confirmationQueued?'Thank you. We received your enquiry and queued your confirmation email.':'Thank you. We received your enquiry. Your confirmation email could not be queued.';
  form.reset();
 }catch(error){
  status.textContent=error.message||'Unable to submit. Please email contactus@replaice.co.';
 }finally{button.disabled=false;}
});
}
