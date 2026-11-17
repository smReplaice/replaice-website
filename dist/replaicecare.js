export const carePath='/platform/replaicecare';
export const careProduct=['ReplaiceCare','Agentic AI for Healthcare','Connected Intelligence. Coordinated Care. Better Outcomes.','ReplaiceCare unifies fragmented clinical, operational, and administrative systems through specialized AI agents. It connects healthcare data, coordinates multistep workflows, and helps providers and health plans reduce administrative burden while preserving human oversight.',['Clinical and Operational Intelligence','EHR and Payer System Integration','Patient Access and Care Coordination','Claims and Revenue Cycle Automation','Healthcare Knowledge and Guidelines','Governed Agentic Workflows'],carePath];
export const scenes=[
 ['Request received','A fictional patient-service request arrives for a referral packet.','Referral intake'],
 ['Authorized context retrieved','The agent checks approved sources using role-based access.','Context ready'],
 ['Requirement flagged','The referral packet is missing an administrative intake form.','Missing intake form'],
 ['Task routed','The agent creates a task for the patient access team.','Assigned to Patient Access'],
 ['Ready for Review','The intake form is attached and the packet awaits review.','Review pending'],
 ['Human approval recorded','A qualified reviewer checks the packet and approves the administrative handoff.','Reviewer approved'],
 ['Workflow complete','The packet is handed off and the audit trail records the action.','Audit trail updated']
];
export const sources=['Electronic Health Record','Billing System','Payer Platform','Clinical Guidelines','Approved Regulatory Data'];
export function careDemo(){return `<section class="care-demo" data-care-demo aria-label="ReplaiceCare workflow demo"><div class="mono">Healthcare operations · Fictional demo</div><div data-care-app><div class="care-demo-grid"><div><strong>Authorized sources</strong><ul>${sources.map(x=>`<li>${x}</li>`).join('')}</ul></div><div data-care-scene><span class="mono">Referral intake</span><h3>Request received</h3><p>${scenes[0][1]}</p></div></div><div class="care-controls"><progress max="7" value="1" aria-label="Workflow progress"></progress><span data-care-count>1 / 7</span></div></div></section>`;}
export function mountCare(){
 if(!document.querySelector('[data-care-app]'))return;
 const style=document.createElement('link');
 style.rel='stylesheet';
 style.href='/replaicecare-ui.css';
 document.head.append(style);
 void import('./replaicecare-ui.js');
}
const sections=[
 ['Why healthcare needs connected intelligence','Staff often work across separate patient records, billing tools, payer portals and policy documents. ReplaiceCare brings the authorized information and next steps into one workflow.'],
 ['One intelligent layer across healthcare','Connect approved systems and route work across patient access, care coordination and revenue cycle teams.'],
 ['Clinical and operational data integrations','Scope candidate connections to EHRs, billing systems, payer platforms, approved guidelines and regulatory sources. Validate permissions and data mappings for each deployment.'],
 ['Specialized healthcare AI agents','Use agents for referral intake, document checks, work queue routing and policy retrieval. Each agent works within its assigned role and approved tools.'],
 ['Patient access and care coordination','Check referral packet completeness, flag missing forms and route administrative follow-up to the right team.'],
 ['Claims and revenue cycle operations','Identify missing documentation, prepare exception queues and assemble evidence for staff review. Coverage and payment decisions remain with authorized people.'],
 ['Healthcare knowledge intelligence','Retrieve approved guidelines and policies with source references so teams can verify the information they use.'],
 ['Workflow orchestration','Coordinate tasks across teams and systems, track the owner of each step and surface exceptions for review.'],
 ['Human oversight and governance','Apply role-based access, approval checkpoints and audit trails. Limit sensitive information to authorized users. Qualified clinicians retain responsibility for clinical decisions.'],
 ['Healthcare use cases','Prepare a referral packet, route a billing documentation exception or help operations staff locate an approved policy.'],
 ['Outcomes and value','Measure administrative turnaround, incomplete packets, manual handoffs and time spent resolving exceptions against your own baseline.']
];
const diagrams=[
 ['EHR integration',['Authorized EHR','Access check','Agent context']],
 ['Connected healthcare systems',['EHR · Billing · Payer','Approved context','Work queues']],
 ['Multi-agent orchestration',['Intake agent','Document agent','Routing agent']],
 ['Human approval',['Proposed action','Human review','Approved handoff']],
 ['Operational intelligence',['Workflow events','Audit history','Operations review']]
];
const vector=(title,nodes)=>`<figure><figcaption>${title}</figcaption><svg viewBox="0 0 360 78" role="img" aria-label="${nodes.join(' to ')}"><path d="M54 40H306" stroke="#50d8e0" stroke-width="2"/>${nodes.map((n,i)=>`<rect x="${i*122}" y="22" width="116" height="36" rx="8" fill="#163654" stroke="#527b9c"/><text x="${i*122+58}" y="44" fill="#f0faff" font-size="11" text-anchor="middle" font-family="system-ui">${n}</text>`).join('')}</svg></figure>`;
export function renderCarePage(){return `<section class="section dark care-hero"><div class="wrap care-hero-grid"><div class="detail-heading"><div class="eyebrow editorial-oval">${careProduct[1]}</div><h1>${careProduct[2]}</h1></div><div><p>${careProduct[3]}</p><div class="actions"><a class="button" href="#care-demo">Explore the workflow</a></div></div><img src="/media/replaicecare-clinical-workspace.webp" width="2048" height="1006" alt="ReplaiceCare clinical workspace showing consultation queues and alerts"></div></section><div class="section wrap care-detail"><div id="care-demo">${careDemo()}</div><div class="care-sections">${sections.map(([title,body],i)=>`<article><h2>${title}</h2><p>${body}</p>${[2,1,7,8,10].includes(i)?vector(...diagrams[[2,1,7,8,10].indexOf(i)]):''}</article>`).join('')}</div><section class="care-final"><h2>See ReplaiceCare in action</h2><p>Walk through an administrative workflow with your team and identify the systems, approvals and outcomes that matter.</p><a class="button" href="/contact/">Request a healthcare demo</a></section></div>`;}
