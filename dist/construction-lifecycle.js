const stages=[
 ['SiteScope','Scope the site','Compare feasibility scenarios and capture site constraints.','Feasibility assumptions and site constraints','M3 7l6-3 6 3 6-3v13l-6 3-6-3-6 3z M9 4v13m6-10v13'],
 ['Pulse','Plan the program','Build the baseline schedule with phases, dependencies and milestones.','Milestones and required-on-site dates','M4 5h16v15H4z M4 9h16M8 3v4m8-4v4m-8 6h3m2 3h3'],
 ['Vault','Coordinate drawings and documents','Create project records and drawing registers. Upload, review, revise and share drawings and documents with controlled access.','Reviewed drawing revisions and scope documents','M4 6h6l2 2h8v12H4z M8 12h8m-8 4h6'],
 ['BOQ Engine & Estimator','Quantify and price the scope','Extract quantities from drawings and apply trade rates to build the bill of quantities.','Quantities and cost breakdown for trade packages','M4 4h16v16H4z M4 9h16m-10 0v11m-6-5h16'],
 ['ProcureFlow','Tender and award','Build packages, issue RFQs, compare bids and award subcontractor contracts.','Awarded contract, scope and agreed rates','M4 6h16v14H4z M8 6V3h8v3M4 12h16m-10 0v3h4v-3'],
 ['PayFlow','Assess claims and manage payment','Review progress claims against awarded scope, contract terms and program milestones. Certify approved amounts for payment.','Certified amounts and payment status','M3 6h18v12H3z M3 10h18m-14 5h4']
];
const icon=path=>`<svg viewBox="0 0 24 24" width="27" height="27" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${path}"/></svg>`;

export function renderConstructionLifecycle(){
 return `<section class="construction-lifecycle" aria-labelledby="lifecycle-title">
 <div class="eyebrow">BiltFlow lifecycle</div>
 <h2 id="lifecycle-title">From site feasibility to subcontractor payment.</h2>
 <p class="lifecycle-intro">Follow the project records that connect planning, design coordination, procurement and delivery.</p>
 <ol class="lifecycle-stages">${stages.map(([module,title,body,handoff,path],i)=>`<li><div class="lifecycle-marker"><span>${String(i+1).padStart(2,'0')}</span>${icon(path)}</div><div class="lifecycle-module mono">${module}</div><h3>${title}</h3><p>${body}</p><p class="lifecycle-handoff"><strong>${i===stages.length-1?'Payment record':'Handoff'}</strong><span>${handoff}</span></p></li>`).join('')}</ol>
 <aside class="lifecycle-resources"><div>${icon('M4 20V10m5 10V6m5 14v-7m5 7V4M3 20h18')}<div class="mono">ResourceFlow</div><h3>Plan capacity throughout delivery</h3></div><div><p>Use Pulse phases and dates to forecast demand by role and skill. Allocate people across projects, track utilisation and adjust assignments when dates or workloads change.</p><p class="lifecycle-feedback"><strong>Delivery feedback</strong> When drawings, lead times or milestones change, review the affected quantities, procurement packages and resource allocations.</p></div></aside>
 </section>`;
}
