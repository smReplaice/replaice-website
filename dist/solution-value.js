const value={
 'implementation-services': [['Define success before building','Agree a baseline and acceptance criteria with the people who own the workflow.'],['Validate with a pilot','Test familiar requests and exceptions with a small group before expanding access.'],['Prepare for rollout','Assign ownership for training, monitoring and support.']],
 'enterprise-ai':[
  ['Choose a workflow with measurable value','Map the current process, establish a baseline for turnaround time or manual effort, and select a use case with a clear owner and success measure.'],
  ['Make enterprise knowledge usable','Connect approved documents, data and applications. HybridRAG Agent retrieves relevant context so teams can check the sources behind an answer.'],
  ['Put the workflow into production','Define permissions, human approval points and exception paths. Track completion time, rework and escalations before extending the workflow.']
 ],
 'construction-ai':[
  ['Reduce duplicate project administration','Carry site assumptions, drawing revisions and quantities into schedules, trade packages and claims reviews. Teams spend less time copying records and reconciling versions.'],
  ['Make changes visible across delivery','Use Pulse milestones, Vault revisions and ResourceFlow forecasts to see how a scope change affects procurement dates and crew capacity.'],
  ['Keep commercial decisions traceable','Review bids against a consistent scope and compare subcontractor claims with awarded rates and prior certifications. Keep award and payment approvals with authorised staff.']
 ],
 'agentic-ai':[
  ['Automate work across systems','Give agents a defined task, the context to complete it and access to approved tools. Use them to prepare records, route requests and update connected systems.'],
  ['Give reviewers a clear exception queue','Send uncertain or sensitive actions to the right person with the source evidence and proposed next step.'],
  ['Measure completed work','Track completion, manual interventions and failed actions. Use those measures to refine workflows and decide which steps to automate next.']
 ],
 'ai-customer-support-it-helpdesk':[
  ['Unify customer and IT requests','Use Replaice Desk to capture requests from voice, email, messaging and web and create a ticket with the relevant context.'],
  ['Resolve repeatable Level 1 work','Retrieve approved knowledge and run authorised resolution steps for routine requests. Track resolution time and repeat contacts.'],
  ['Give Level 2 teams a better handoff','Escalate exceptions with the issue summary, conversation history and steps already attempted, so the next person can pick up the ticket without restarting it.']
 ]
};
export function renderSolutionValue(slug){
 return `<section class="section wrap solution-value" aria-labelledby="value-title"><div class="eyebrow">Replaice in practice</div><h2 id="value-title">Where Replaice adds value</h2><div class="value-cards">${value[slug].map(([title,body])=>`<article><h3>${title}</h3><p>${body}</p></article>`).join('')}</div></section>`;
}
export function renderConstructionCase(){
 return `<section class="wrap construction-case" aria-labelledby="case-title">
 <div class="eyebrow">Illustrative case study · Australia</div><h2 id="case-title">A major contractor consolidates its project technology.</h2>
 <p>This model represents a large Australian contractor running multiple projects. The figures are planning assumptions for a hypothetical rollout.</p>
 <div class="case-metrics"><article><strong>A$720,000</strong><span>Modelled annual technology savings</span></article><article><strong>30%</strong><span>Lower recurring technology budget</span></article><article><strong>8,000 hours</strong><span>Modelled annual administrative capacity freed</span></article></div>
 <div class="case-details"><article><h3>Annual technology budget</h3><p>Amounts in AUD. The model assumes overlapping tools are retired after rollout.</p>
 <table><thead><tr><th scope="col">Cost category</th><th scope="col">Before</th><th scope="col">After</th></tr></thead><tbody>
 <tr><th scope="row">Software subscriptions</th><td>A$1.40m</td><td>A$1.00m</td></tr>
 <tr><th scope="row">Integrations and maintenance</th><td>A$600k</td><td>A$430k</td></tr>
 <tr><th scope="row">External technical support</th><td>A$400k</td><td>A$250k</td></tr>
 </tbody><tfoot><tr><th scope="row">Total</th><td>A$2.40m</td><td>A$1.68m</td></tr></tfoot></table>
 <p>The model excludes one-off migration and training costs. Administrative capacity is tracked separately from the technology savings.</p></article>
 <article><h3>How agents reduce manual effort</h3><ul>
 <li><strong>Drawing changes.</strong> Flag changes for quantity and schedule review. 1,200 reviews × 3 hours saved = 3,600 hours.</li>
 <li><strong>Procurement packages.</strong> Draft scopes from approved quantities and flag gaps in bids. 900 packages × 2 hours saved = 1,800 hours.</li>
 <li><strong>Subcontractor claims.</strong> Check rates and prior claims and route discrepancies to the reviewer. 1,300 claims × 2 hours saved = 2,600 hours.</li>
 </ul><p>That is about 4.4 full-time equivalents of capacity at 1,800 productive hours per year. Project teams retain approval of awards and payments and can redirect that time to delivery and exception handling.</p></article></div>
 </section>`;
}
