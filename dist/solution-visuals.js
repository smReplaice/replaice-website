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
  title:'Drawing revision impact',
  drawing:true,
  steps:[
   ['Quantity','Partition length increases by 12 m.','BOQ Engine · Level 03 partitions'],
   ['Package','Update the drywall package scope for review.','ProcureFlow · Tender package PKG-07'],
   ['Milestone','Check whether the additional work affects the fit-out start.','Pulse · Level 03 fit-out']
  ]
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
};
export const solutionHeadline=slug=>stories[slug].headline;
export function renderSolutionVisual(slug){
 const story=stories[slug];
 return `<figure class="solution-workflow">
 <figcaption><span class="mono">Illustrative workflow</span><strong>${story.title}</strong></figcaption>
${story.drawing?`<div class="revision-preview"><svg viewBox="0 0 210 88" aria-hidden="true"><path d="M10 10h190v68H10z M64 10v68m63-68v68m-63-35h63m0 13h73" fill="none" stroke="#85a9cd" stroke-width="2"/><rect x="65" y="30" width="61" height="26" fill="#48e4db30" stroke="#82f8ea" stroke-dasharray="4 3"/></svg><span><strong>Level 03 drawing</strong><small>Rev B → Rev C · Partition change</small></span></div>`:''}
 <ol>${story.steps.map(([phase,event,detail])=>`<li><span class="mono">${phase}</span><strong>${event}</strong><small>${detail}</small></li>`).join('')}</ol>
 </figure>`;
}
