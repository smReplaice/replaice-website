const screens = {
  BiltFlow: ['/media/biltflow-vault.png', 'Vault drawing comparison with revision findings', 'Drawing intelligence in BiltFlow Vault'],
  'ReplaiceCare': ['/media/replaicecare-healthcare.webp', 'Healthcare staff collaborating in a clinical setting', 'Coordinating administrative work across care teams'],
};
const scenes = {
  NorthStar: ['Site inspection', 'Drone or robot captures site conditions', 'Flag an observation', 'Link to drawing and schedule'],
  'HybridRAG Agent': ['Grounded answer', 'Search policies and project documents', 'Rerank relevant passages', 'Return an answer with sources'],
  'Replaice Desk': ['Support request', 'Account access ticket received', 'Check policy and attempt reset', 'Escalate exceptions to a person'],
  Janavy: ['Confidential agreement', 'Invite an authorized recipient', 'Require acceptance of the NDA', 'Review document activity'],
  Engage: ['Renewal journey', 'Customer enters renewal segment', 'Send an approved message', 'Adapt the next step to the response'],
};
export const productKey = name => name.toLowerCase().replaceAll(' ', '-');
export const productHref = name => name === 'ReplaiceCare' ? '/platform/replaicecare/' : '/#' + productKey(name);
const figure = name => {
  if (screens[name]) {
    const [src, alt, caption] = screens[name];
    return `<figure class="ed-figure"><img loading="lazy" decoding="async" src="${src}" alt="${alt}"><figcaption>${caption}</figcaption></figure>`;
  }
  const [label, ...steps] = scenes[name];
  return `<figure class="ed-figure ed-scene"><figcaption>Illustrative workflow</figcaption><strong>${label}</strong><ol>${steps.map(step => `<li>${step}</li>`).join('')}</ol></figure>`;
};
const product = ([name, category, headline, summary, , destination], workflows) => {
  const url = name === 'ReplaiceCare' ? '/platform/replaicecare/' : name === 'Engage' ? '/engage/' : destination;
  return `<article class="ed-product" id="${productKey(name)}"><div><p class="eyebrow">${category}</p><h3>${name}</h3><p class="ed-problem">${headline}</p><p>${summary}</p><a class="link" href="${url}" ${url.startsWith('https:') ? 'target="_blank" rel="noopener noreferrer"' : ''}>Explore ${name} <span aria-hidden="true">↗</span></a></div>${figure(name)}${workflows[name] ? `<details class="ed-workflow"><summary>View ${name} workflow</summary>${workflows[name]()}</details>` : ''}</article>`;
};
export function editorialHome(products, solutions, security, workflows) {
  const [lead, northstar, rag, ...supporting] = products;
  return `
  <section class="wrap ed-hero"><div><p class="eyebrow">Enterprise AI and physical intelligence</p><h1>Put enterprise knowledge to work.</h1><p>Replaice connects your data, applications, and teams so AI agents can find the right information and move work forward with human oversight.</p><div class="actions"><a class="button" href="#platforms">Explore products</a><a class="button outline" href="/contact/">Talk to our team</a></div></div>
  <figure class="ed-hero-art"><img src="/media/enterprise-ai-workflow.svg" alt="Enterprise sources feed an evidence-backed answer and an approved action" fetchpriority="high"><figcaption>From enterprise records to an action someone can review.</figcaption></figure></section>
  <section class="wrap ed-section" id="platforms"><p class="eyebrow">Products</p><h2>Find the right platform for the work.</h2><div class="ed-lead">${product(lead, workflows)}</div><div class="ed-pair">${[northstar,rag].map(p => product(p,workflows)).join('')}</div><div class="ed-index">${supporting.map(p => product(p,workflows)).join('')}</div></section>
  <section class="ed-method" id="transformation"><div class="wrap"><h2>From source to action.</h2><ol><li><strong>Connect knowledge</strong><p>Bring documents, operational data, and business applications into the workflow.</p></li><li id="agents"><strong>Give agents a task</strong><p>Retrieve evidence and propose or execute steps within defined permissions.</p></li><li id="physical"><strong>Close the loop</strong><p>Bring observations from the field into the tools teams use to track and resolve work.</p></li></ol></div></section>
  <section class="wrap ed-section" id="solutions"><div id="enterprise-ai-solutions"><p class="eyebrow">Services</p><h2>Start with a business problem.</h2></div><div class="ed-services">${solutions.map(({slug,title,summary}) => `<article><h3><a href="/solutions/${slug}/">${title} <span aria-hidden="true">↗</span></a></h3><p>${summary}</p></article>`).join('')}</div></section>
  ${security()}
  <section class="ed-method"><div class="wrap ed-close"><h2>Which workflow would you change first?</h2><a class="button" href="/contact/">Request a demo</a></div></section>`;
}
