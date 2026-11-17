import {biltflowScreens} from './biltflow-demo.js';
const stories={
 'enterprise-ai':{
  headline:'Put your enterprise knowledge to work.',
  title:'From source to approved action',
  steps:[
   ['Retrieve','Read the travel policy and expense guide','Travel Policy §4.2 · Expense Guide §3'],
   ['Answer','Hotel stays over the policy cap need manager approval.','Cited answer · Travel Policy §4.2'],
   ['Approve','Manager approves the exception request.','Approval recorded'],
   ['Act','Agent updates the expense case with the decision and citation.','Case updated']
  ]
 },
 'construction-ai':{
  headline:'See what a project change affects before it reaches site.',

 },
 'agentic-ai':{
  headline:'Give AI a task, the tools to do it, and clear limits.',
  title:'Agent execution timeline',
  steps:[
   ['Task','Prepare a supplier onboarding request.','Assigned to the procurement agent'],
   ['Tool used','Check the supplier register and onboarding requirements.','Read-only access'],
   ['Escalated','Send missing insurance evidence to procurement for review.','Reason · required evidence is missing'],
   ['Waiting','Resume onboarding when the reviewer approves.','Supplier record remains pending']
  ]
 },
 'ai-customer-support-it-helpdesk':{
  headline:'Resolve routine requests. Give people the context for the hard ones.',
  title:'Replaice Desk ticket flow',
  steps:[
   ['Intake','Email arrives about an account access issue.','Ticket D-104 · Email'],
   ['Resolve','Agent verifies eligibility, runs the approved reset workflow, and closes the ticket.','D-104 · Resolved'],
   ['Human handoff','A separate payroll access request needs elevated permissions.','D-105 · Routed to Level 2'],
   ['Context attached','The specialist receives the request, checks performed, and escalation reason.','D-105 · Ready for review']
  ]
 }
,
 'implementation-services': {
  headline:'Take one workflow from pilot to production.',
  title:'From workflow selection to rollout',
  steps:[
   ['Scope','Agree what the pilot should improve.','Workflow owner and baseline'],
   ['Integrate','Connect the approved data and systems.','Access, permissions and review steps'],
   ['Pilot','Test routine cases and exceptions with a small group.','Quality and turnaround checks'],
   ['Roll out','Review results and plan the handover.','Training, monitoring and support']
  ]
 }
};
export const solutionHeadline=slug=>stories[slug].headline;
export function renderSolutionVisual(slug){
 if(slug==='construction-ai')return `<div class="construction-carousel" aria-label="BiltFlow product screenshots">${biltflowScreens.map(([module,title,,screen,alt],i)=>`<figure aria-hidden="${i!==0}"><img src="/media/biltflow-${screen}.png" alt="${alt}" decoding="async"><figcaption><strong>${screen==='pulse'?'Pulse':module}</strong><span>${title}.</span></figcaption></figure>`).join('')}</div>`;
 const story=stories[slug];
 return `<figure class="solution-workflow">
 <figcaption><span class="mono">Illustrative workflow</span><strong>${story.title}</strong></figcaption>

 <ol>${story.steps.map(([phase,event,detail])=>`<li><span class="mono">${phase}</span><strong>${event}</strong><small>${detail}</small></li>`).join('')}</ol>
 </figure>`;
}

export function mountConstructionCarousel(){
 const carousel=document.querySelector('.construction-carousel');
 if(!carousel)return;
 const slides=[...carousel.querySelectorAll('figure')];
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 let active=0,timer,visible=!('IntersectionObserver' in window);
 function sync(){
  clearInterval(timer);
  if(!visible||document.hidden||motion.matches)return;
  timer=setInterval(()=>{
   const next=(active+1)%slides.length;
   if(!slides[next].querySelector('img').naturalWidth)return;
   slides[active].setAttribute('aria-hidden','true');
   slides[next].setAttribute('aria-hidden','false');
   active=next;
  },3000);
 }
 if(!visible)new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();}).observe(carousel);
 motion.addEventListener('change',sync);
 document.addEventListener('visibilitychange',sync);
 sync();
}
