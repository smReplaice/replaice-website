import {northstarPage,mountNorthstarGallery} from "./northstar-page.js";
import { industrySlides, mountIndustrySlides } from "./industry-slides.js";
import { renderHeroArchitecture } from './hero-architecture.js';
import { spatialScene, mountSpatialScenes } from './spatial-scenes.js';
import { platformExpansion, mountPlatformExpansion } from './platform-expansion.js';
import { renderHeroCity } from './hero-city.js';
import { products } from './data.js';
import { productKey } from './editorial.js';
import { renderBiltFlowDemo } from './biltflow-demo.js';
import { renderConstructionLifecycle } from './construction-lifecycle.js';
import { renderCarePage } from './replaicecare.js';

const demo = '/contact/';
const route = name => '/platforms/' + productKey(name) + '/';
const button = (url, label, extra='') => `<a class="button ${extra}" href="${url}">${label} <span aria-hidden="true">→</span></a>`;
const heading = (label,title) => `<p class="edition-label">${label}</p><h2>${title}</h2>`;
const groups = [
 ['Enterprise Intelligence',['HybridRAG Agent','Replaice Desk','Engage','Janavy']],
 ['Construction & Physical AI',['BiltFlow','NorthStar']],
 ['Healthcare',['ReplaiceCare']],
];
const solutions = [
 ['Enterprise AI Transformation','Scope the right workflow and connect your business knowledge.','/solutions/enterprise-ai/'],
 ['Agentic AI Platforms','Give agents authorized tools, guardrails and review steps.','/solutions/agentic-ai/'],
 ['Physical AI & Robotics','Turn site observations into project actions.',route('NorthStar')],
 ['Implementation Services','Plan integrations, pilot a workflow and measure results.','/solutions/enterprise-ai/#implementation'],
];
const industries = [
 ['Construction & Real Estate','Bring drawings, quantities, procurement and schedules together—from early planning through delivery.','/solutions/construction-ai/','/media/biltflow-vault.png','Keep projects connected.','BiltFlow','Explore construction'],
 ['Healthcare','Connect patient access, referrals, claims and administrative workflows across healthcare systems, with human oversight.',route('ReplaiceCare'),'/media/replaicecare-healthcare.webp','Coordinate the work around care.','ReplaiceCare','Explore healthcare'],
 ['Customer Service','Connect conversations with relevant knowledge and authorized actions. Resolve routine requests and route exceptions to the right team.','/solutions/ai-customer-support-it-helpdesk/','/media/enterprise-ai-workflow.svg','Move requests to resolution.','Replaice Desk','Explore customer service'],
 ['Enterprise IT','Help service teams find approved information, respond to requests and carry out authorized tasks across business applications.',route('Replaice Desk'),'/media/hybrid-search.png','Turn knowledge into action.','Replaice Desk','Explore enterprise IT'],
];
const company=[['About','Enterprise AI and physical intelligence from India and Singapore.','/#about'],['Careers','Ask about working with Replaice.','/contact/#careers'],['Contact','Talk to the team.','/contact/'],['Trust Center','Review governance capabilities.','/#trust']];
const entries=list=>list.map(([name,desc,url])=>`<a href="${url}"><strong>${name}</strong><small>${desc}</small></a>`).join('');
const panel=(title,html)=>`<details><summary>${title}</summary><div class="edition-mega">${html}</div></details>`;
export function editionNav(){
 return `<header class="edition-header"><nav aria-label="Main navigation"><a href="/" aria-label="Replaice home"><img src="/logo.png" alt="Replaice" width="142" height="29"></a><button id="menu" aria-expanded="false" aria-controls="navigation">Menu</button><div id="navigation">${panel('Platforms',groups.map(([name,names])=>`<section><p class="edition-label">${name}</p>${names.map(name=>{const p=products.find(item=>item[0]===name);return `<a href="/#platforms/${productKey(name)}"><span class="edition-icon" data-product-route="${route(name)}" aria-hidden="true">◇</span><strong>${name}</strong><span class="edition-label">${p[1]}</span><small>${p[3]}</small></a>`;}).join('')}</section>`).join('')+`<a class="arch-feature" href="/#architecture"><span aria-hidden="true">▱<br>▱<br>▱</span><strong>Platform architecture →</strong><small>See how it all connects.</small></a>`)}${panel('Solutions',entries(solutions))}${panel('Where we work',entries(industries))}<a href="/#trust">Security</a>${panel('Company',entries(company))}<a class="button small" href="${demo}">Book a demo →</a></div></nav></header>`;
}
export function editionFooter(){
 const links=(label,list)=>`<section><p class="edition-label">${label}</p>${list.map(([title,url])=>`<a href="${url}">${title}</a>`).join('')}</section>`;
 return `<footer class="edition-footer"><div class="wrap"><div class="edition-footer-grid">${links('Platforms',products.map(([name])=>[name,route(name)]))}${links('Solutions',solutions.map(([name,,url])=>[name,url]))}${links('Where we work',industries.map(([name,,url])=>[name,url]))}${links('Company',[...company.map(([name,,url])=>[name,url]),['Privacy','/privacy/'],['Terms','/terms/']])}</div><div class="edition-wordmark"><img src="/logo.png" alt="Replaice" width="1000" height="206"><span aria-hidden="true"></span></div><div class="edition-footer-meta"><p>India · Singapore</p><div class="edition-social"><span>Follow Replaice</span><a href="https://www.linkedin.com/company/replaice-ai/" target="_blank" rel="noopener noreferrer" aria-label="Follow Replaice on LinkedIn"><svg viewBox="0 0 24 24" width="21" height="21" fill="currentColor" aria-hidden="true"><path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM3.3 10h3.4v11H3.3zm6 0h3.3v1.5a4 4 0 0 1 3.5-1.8c3.7 0 4.4 2.3 4.4 5.4V21h-3.4v-5.3c0-1.3 0-2.9-1.8-2.9s-2.5 1.4-2.5 2.8V21H9.3z"/></svg></a><a href="https://www.youtube.com/@Replaice-ai" target="_blank" rel="noopener noreferrer" aria-label="Follow Replaice on YouTube"><svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M22 8a3 3 0 0 0-2.1-2.2C18 5.3 12 5.3 12 5.3s-6 0-7.9.5A3 3 0 0 0 2 8a24 24 0 0 0 0 8 3 3 0 0 0 2.1 2.2c1.9.5 7.9.5 7.9.5s6 0 7.9-.5A3 3 0 0 0 22 16a24 24 0 0 0 0-8Zm-12 7.3V8.7l5.8 3.3z"/></svg></a></div></div></div></footer>`;
}
const picture=(src,alt)=>`<img src="${src}" alt="${alt}" loading="lazy" decoding="async">`;
const visuals={BiltFlow:['/media/biltflow-vault.png','Drawing review in BiltFlow Vault'],ReplaiceCare:['/media/replaicecare-healthcare.webp','Healthcare operations']};
const hybridSearch=()=>`<figure class="edition-hybrid-search" data-hybrid-flow><img src="/media/hybrid-search.png" data-loop="/media/hybrid-search.gif" width="670" height="312" loading="lazy" decoding="async" alt="A query flows through vector, full-text and tensor retrieval before reranking and answer delivery."></figure>`;
const industryAnimation=(src,gif,alt)=>`<figure class="industry-animation edition-hybrid-search" data-hybrid-flow><img src="${src}" data-loop="${gif}" alt="${alt}" loading="lazy" decoding="async"></figure>`;
const mobileWorkflow = name => {
 const service=name==='Customer Service';
 const steps=service?[['Applications','Documents','Data sources'],['Replaice AI agents','Retrieve · plan · act'],['Human approval'],['Auditable action']]:[['Query'],['Retrieve'],['Vector','Full-text','Tensor'],['Rerank'],['Answer']];
 return `<div class="market-mobile-workflow" role="group" aria-label="${service?'Enterprise AI workflow':'Retrieve, score and rerank'}"><ol>${steps.map(group=>`<li>${group.map(label=>`<span>${label}</span>`).join('')}</li>`).join('')}</ol></div>`;
};
const industryMedia=(name,src)=>name==='Customer Service'?industryAnimation(src,'/media/enterprise-ai-workflow.gif','Data flows from applications and documents through Replaice agents to a reviewed action.'):name==='Enterprise IT'?industryAnimation(src,'/media/hybrid-search.gif','A service query flows through hybrid search and reranking.'):(industrySlides(name,src)||picture(src,''));
const visual=p=>p[0]==='HybridRAG Agent'?hybridSearch():p[0]==='NorthStar'?spatialScene('scan'):visuals[p[0]]?picture(...visuals[p[0]]):`<div class="edition-work"><p class="edition-label">Illustrative workflow</p><ol>${p[6].slice(0,3).map(s=>`<li>${s}</li>`).join('')}</ol></div>`;
const cta=()=>`<section class="edition-band"><div class="wrap"><h2>Your enterprise is ready for intelligent action.</h2>${button(demo,'Book a demo','outline')}</div></section>`;
export function editionHome(renderSecurity){
 return `<section class="hero city-hero edition-hero" id="about">${renderHeroCity()}${spatialScene('neural')}<div class="wrap city-copy"><div class="eyebrow">Enterprise Agentic AI + Physical AI</div><h1>From Enterprise Complexity to <span class="edition-hero-accent">Intelligent Action.</span></h1><p class="sub">Powered by Agentic AI &amp; Physical AI.</p><p>Replaice transforms enterprise expertise, data, and operational complexity into intelligent action. Our specialized AI platforms combine enterprise knowledge, autonomous agents, and physical intelligence to help organizations adopt AI, orchestrate mission-critical workflows, and accelerate business transformation.</p><div class="actions">${button('#platforms','Explore Our Platforms')}${button('/contact/','Talk to Our AI Team','outline')}</div></div></section>
 <section class="edition-proof" aria-labelledby="benchmarks-title"><div class="wrap"><h2 id="benchmarks-title">Enterprise AI benchmarks achieved</h2><dl class="edition-benchmarks">${[
 ['Specialized AI platforms',String(products.length)],
 ['Distinct language models','40+'],
 ['Saved per user per year','110 hours'],
 ['Work app and data source connections','250+'],
 ['Cumulative searches across documents and knowledge objects','3+ billion'],
 ['Uptime across core search and AI services','99.9%+'],
 ].map(([label,value])=>`<div><dt>${label}</dt><dd>${value}</dd></div>`).join('')}</dl></div></section>
 <section class="edition-platforms edition-platform-feature" id="platforms"><div class="wrap edition-section">${heading('Platforms','Seven platforms. <em>One intelligent enterprise.</em>')}<p class="platform-intro">Purpose-built AI for knowledge, support, engagement, documents, construction, robotics and healthcare, with governance at the core.</p>${platformExpansion(products,visual)}</div></section>
 <section class="edition-architecture-band" id="architecture"><div class="wrap edition-section"><p class="edition-label">Architecture</p>${renderHeroArchitecture()}</div></section>
 <section class="edition-industries edition-markets" id="solutions" aria-labelledby="markets-heading"><div class="wrap edition-section">
 <div class="markets-intro"><div><p class="edition-label">WHERE WE WORK</p><h2 id="markets-heading">Built around your business.</h2></div><p>Connect the knowledge, systems and workflows behind your operations—with AI designed for the work your teams do.</p></div>
 <div class="edition-industry-grid markets-grid">${industries.map(([name,desc,url,src,title,product,label])=>`<article class="market-story"><div class="market-media">${industryMedia(name,src)}${name==='Customer Service'||name==='Enterprise IT'?mobileWorkflow(name):''}</div><div class="market-copy"><p class="edition-label">${name}</p><h3>${title}</h3><p>${desc}</p><p class="market-product">${product}</p><a class="market-action" href="${url}">${label}<span aria-hidden="true">→</span></a></div></article>`).join('')}</div></div></section>
 <section class="edition-case-study"><div class="wrap edition-section"><p class="edition-label">Enterprise AI in practice</p><blockquote>“Replaice transformed how leading Australian construction companies work—unifying fragmented legacy software in BiltFlow, connecting workflows across the construction lifecycle, and reducing technology costs by 60%.”</blockquote>${button(demo,'Book a demo','outline')}</div></section>
 <div class="edition-trust">${renderSecurity()}</div>${cta()}`;
}
const deskFeatures=[
 ['Employee IT service','Give employees one place to request access, report issues and get help. Automate routine Level 1 work and route exceptions to the right team.'],
 ['Omnichannel customer support','Connect conversations across voice, chat, email and messaging so agents can pick up with the context they need.'],
 ['Website and in-app conversations','Answer common questions where customers already are, and route sales or customer-success inquiries to the right person.'],
 ['Cloud contact centre workflows','Handle calls through connected telephony and pass complex requests to a person with the conversation context.'],
 ['Sales and marketing handoffs','Share relevant service context with connected CRM workflows so teams can coordinate follow-up.'],
 ['AI answers and service insights','Use approved knowledge to answer questions and surface recurring issues for service teams to investigate.'],
];
const renderDeskFeatures=()=>`<section class="edition-platforms"><div class="wrap edition-section"><h2>Deliver faster, more proactive IT service.</h2><p>Bring IT requests, asset context and service operations into one workflow. Automate routine support, spot recurring issues and give teams visibility into what needs attention.</p><div class="edition-desk-features">${deskFeatures.map(([title,copy])=>`<article><h3>${title}</h3><p>${copy}</p></article>`).join('')}</div></div></section>`;
export function editionProduct(slug){
 if(slug==="northstar")return northstarPage();
 const p=products.find(item=>productKey(item[0])===(slug==='desk'?'replaice-desk':slug));
 if(!p)return null;
 if(p[0]==='ReplaiceCare')return renderCarePage();
 return `<section class="wrap edition-section edition-product-hero"><div><p class="edition-label">${p[1]}</p><h1>${p[0]}</h1><h2>${p[2]}</h2><p>${p[3]}</p>${button(demo,'Book a demo')}</div>${p[0]==='Engage'?'<img class="engage-hero-diagram" src="/media/replaice-engage.webp" alt="Replaice Engage workflow: understand the audience, personalize the message, orchestrate across email, WhatsApp, SMS, voice and web, and learn from every response.">':p[0]==='Replaice Desk'?'<img class="engage-hero-diagram" src="/media/replaice-desk.webp" width="2048" height="990" alt="Replaice Desk inbox, ticket activity and assignment controls">':visual(p)}</section>
 ${p[0]==='BiltFlow'?renderConstructionLifecycle('biltflow-lifecycle',renderBiltFlowDemo()):`
 <section class="edition-platforms"><div class="wrap edition-section">${heading('How it works','Follow the workflow.')}${visual(p)}</div></section>
 <section class="wrap edition-section">${heading('Capabilities','What your teams can do.') }<ul class="edition-features">${p[4].map(s=>`<li>${s}</li>`).join('')}</ul></section>`}
 ${p[0]==='Replaice Desk'?renderDeskFeatures():''}
 <section class="edition-industries"><div class="wrap edition-section">${heading(p[0]==='BiltFlow'?'Deployment':'Deployment','Connect the workflow to your business.')}${p[0]==='BiltFlow'?'<p>Link drawing revisions in Vault to the quantities, procurement packages and programme milestones that need review.</p>':''}<p>Discuss your systems, access controls and approval requirements with our implementation team.</p><a href="/#trust">Explore governance and security →</a></div></section>${cta()}`;
}
export function mountEdition(){
 mountNorthstarGallery();
 mountIndustrySlides();
 const wordmark=document.querySelector('.edition-wordmark');
 wordmark?.addEventListener('pointermove',event=>{
  if(event.pointerType==='touch')return;
  const rect=wordmark.getBoundingClientRect();
  wordmark.style.setProperty('--glow-x',(event.clientX-rect.left)+'px');
  wordmark.style.setProperty('--glow-y',(event.clientY-rect.top)+'px');
 });

 mountPlatformExpansion();
 const startScenes=()=>setTimeout(mountSpatialScenes,300);
 if(document.readyState==='complete')startScenes();else addEventListener('load',startScenes,{once:true});
 if(location.pathname!=="/")document.querySelectorAll("[data-product-route]").forEach(tile=>tile.closest("a").href=tile.dataset.productRoute);
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 if(reduce.matches||!('IntersectionObserver' in window))return;
 document.querySelectorAll('.edition-hero h1').forEach(h=>{for(const node of [...h.childNodes]){const container=node.nodeType===1?node:h;const words=node.textContent.trim().split(/\s+/);const fragment=document.createDocumentFragment();for(const word of words){const mask=document.createElement('span');mask.className='edition-mask';const span=document.createElement('span');span.textContent=word;mask.append(span);fragment.append(mask,' ');}if(container===h)node.replaceWith(fragment);else container.replaceChildren(fragment);}h.querySelectorAll('.edition-mask span').forEach((el,i)=>el.style.animationDelay=i*60+'ms');});
 const observer=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{if(!isIntersecting)return;target.classList.add('edition-visible');observer.unobserve(target);if(target.dataset.count){const goal=+target.dataset.count;const start=performance.now();const tick=now=>{const progress=Math.min(1,(now-start)/450);target.textContent=Math.round(goal*progress);if(progress<1)requestAnimationFrame(tick);};requestAnimationFrame(tick);}}),{threshold:.16});
 document.querySelectorAll('.edition-diagram, .edition-section h2, [data-count]').forEach(el=>observer.observe(el));
}
