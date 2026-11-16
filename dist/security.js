const controls=[
 ['Permission-aware access','Use access rules to define which data and actions are available to users and AI agents.','M12 2 4 5v6c0 5 3 8 8 11 5-3 8-6 8-11V5z M9 12l2 2 4-4'],
 ['Workflow observability','Review agent activity, workflow outcomes, exceptions, and audit history.','M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z'],
 ['Data and action governance','Set operating boundaries and route sensitive actions to people for approval.','M5 3h14v18H5z M8 8h8m-8 4h8m-8 4h5']
];
const frameworks=[
 ['ISO/IEC 27001','Information security management','M12 2 4 5v6c0 5 3 8 8 11 5-3 8-6 8-11V5z M8 11h8m-4-4v8'],
 ['SOC 2','Independent controls reporting','M6 3h9l4 4v14H6z M14 3v5h5 M9 13h7m-7 4h7'],
 ['HIPAA','Health information safeguards','M12 20S3 15 3 8a5 5 0 0 1 9-2 5 5 0 0 1 9 2c0 7-9 12-9 12z M9 11h6m-3-3v6'],
 ['GDPR','Personal data protection','M5 10h14v11H5z M8 10V7a4 4 0 0 1 8 0v3 M12 14v3']
];
const icon=path=>`<svg viewBox="0 0 24 24" width="27" height="27" fill="none" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${path}"/></svg>`;

export function renderSecurity(){
 return `<section class="section security" id="trust" aria-labelledby="security-title"><div class="wrap">
 <div class="security-panel">
  <ul class="security-controls">${controls.map(([title,body,path])=>`<li>${icon(path)}<div><h3>${title}</h3><p>${body}</p></div></li>`).join('')}</ul>
  <div class="security-story"><div class="eyebrow">Enterprise security</div><h2 id="security-title">Keep enterprise AI <em>under control.</em></h2><p>Give AI agents the access they need, define when a person must approve an action, and keep a record of what happened.</p><div class="actions"><a class="button" href="/contact/">Discuss security requirements ↗</a></div></div>
 </div>
 <div class="security-assurance"><h3>Standards and regulations for your security review</h3><p>These references describe review topics. Ask our team for verified assurance documentation and deployment-specific requirements.</p>
 <ul>${frameworks.map(([name,detail,path])=>`<li>${icon(path)}<strong>${name}</strong><span>${detail}</span></li>`).join('')}</ul></div>
 </div></section>`;
}
