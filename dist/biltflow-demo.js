export const biltflowScreens=[
 ['Feasibility','Assess the site before committing','Use the satellite view to understand the site, then test cost assumptions, cash flow and development scenarios.','feasibility','Feasibility Satellite Simulator showing the Merrylands site'],
 ['Vault','Review drawing revisions','Compare drawing versions and see where Vault flags issues for the design team to investigate.','vault','Vault Drawing Intelligence showing an annotated floor plan and revision findings'],
 ['Pulse + ProcureFlow','Review schedule and tender impacts','Check milestones and dependencies in Pulse, then review affected trade packages in ProcureFlow.','pulse','Pulse Programme Gantt showing tasks, dependencies, milestones and critical path'],
 ['ResourceFlow','Match workforce capacity to demand','Compare forecast demand with available capacity, spot staffing gaps and adjust allocations across projects.','resourceflow','ResourceFlow workforce dashboard showing utilisation, demand versus capacity and staffing risks']
];
export function renderBiltFlowDemo(){
 return `<section class="drawing-demo" aria-labelledby="drawing-demo-title">
 <div class="mono drawing-label">BiltFlow workflow</div>
 <h4 id="drawing-demo-title">From site feasibility to programme and workforce planning.</h4>
 <ol class="biltflow-photo-steps">${biltflowScreens.map(([module,title,caption,screen,alt])=>`<li><figure><div class="biltflow-screen"><img src="/media/biltflow-${screen}.png" loading="lazy" alt="${alt}"></div><figcaption><span class="mono">${module}</span><h5>${title}</h5><p>${caption}</p></figcaption></figure></li>`).join('')}</ol>
 </section>`;
}
