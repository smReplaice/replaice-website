import {editionNav, editionFooter} from "../dist/edition.js";
import {careProduct,carePath} from '../dist/replaicecare.js';
import {legalPages} from "../dist/legal.js";
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {renderPage} from '../dist/app.js';
import {origin,solutions} from '../dist/discovery.js';
import {products} from '../dist/data.js';

const root=new URL('../dist/',import.meta.url);
const template=await readFile(new URL('index.html',root),'utf8');
const name='Replaice';
const description='Replaice provides enterprise AI platforms and implementation services for agentic workflows, construction operations, customer support, IT help desks, healthcare operations, and physical AI.';
const pages=[
 {path:"/platforms/desk/",title:"Replaice Desk | Replaice",summary:products.find(([name])=>name==="Replaice Desk")[3]},
 ...products.map(([name,category,,summary])=>({path:"/platforms/"+name.toLowerCase().replaceAll(" ","-")+"/",title:name+" | "+category+" | Replaice",summary})),
 {path:carePath+'/',title:'ReplaiceCare | Agentic AI for Healthcare',summary:careProduct[3]},
 {path:'/',title:'Replaice | Enterprise Agentic AI & Physical AI Platforms',summary:description},
 {path:'/contact/',title:'Contact Replaice | Enterprise AI Services',summary:'Contact Replaice to discuss enterprise AI transformation, agentic automation, construction AI, or customer and IT support.'},
 {path:'/engage/',title:'Engage | Agentic Customer Engagement by Replaice',summary:products.find(p=>p[0]==='Engage')[3]},
 ...Object.entries(legalPages).map(([path,page])=>({path,title:page.title+' | Replaice',summary:page.summary})),
 ...solutions.map(item=>({...item,path:'/solutions/'+item.slug+'/',title:item.title+' | Replaice'}))
];
const escape=value=>value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const organization={'@type':'Organization','@id':origin+'/#organization',name,url:origin+'/',logo:origin+'/logo.png',description,knowsAbout:solutions.map(item=>item.title)};
const productsSchema=products.map(([name,category,,description,,url])=>({'@type':'SoftwareApplication',name,applicationCategory:category,description,url:origin+"/platforms/"+name.toLowerCase().replaceAll(" ","-")+"/",provider:{'@id':organization['@id']}}));

for(const {path,title,summary,slug} of pages){
 const url=origin+path;
 const graph=[organization,{'@type':'WebPage','@id':url,name:title,url,description:summary,publisher:{'@id':organization['@id']}}];
 if(path==='/')graph.push({'@type':'WebSite',name,url,publisher:{'@id':organization['@id']}},...productsSchema);
 if(slug)graph.push({'@type':'Service',name:solutions.find(item=>item.slug===slug).title,url,description:summary,provider:{'@id':organization['@id']}});
 const tags=`<title>${escape(title)}</title><meta name="description" content="${escape(summary)}"><link rel="canonical" href="${url}"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(summary)}"><meta property="og:url" content="${url}"><meta property="og:type" content="website"><meta property="og:site_name" content="Replaice"><meta property="og:image" content="${origin}/logo.png"><meta name="twitter:card" content="summary"><meta name="twitter:title" content="${escape(title)}"><meta name="twitter:description" content="${escape(summary)}"><script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@graph':graph}).replaceAll('<','\\u003c')}</script>`;
 const html=template.replace(/<header[\s\S]*?<\/header>/,()=>editionNav()).replace(/<footer[\s\S]*?<\/footer>/,()=>editionFooter()).replace(/<!-- discovery-start -->[\s\S]*?<!-- discovery-end -->|<title>[\s\S]*?(?=<link rel="icon")/,`<!-- discovery-start -->${tags}<!-- discovery-end -->`)
  .replace(/<main id="main">[\s\S]*?<\/main>/,()=>`<main id="main">${renderPage(path)}</main>`);
 const directory=new URL('.'+path,root);
 await mkdir(directory,{recursive:true});
 await writeFile(new URL('index.html',directory),html);
}
const urls=pages.map(({path})=>`  <url><loc>${origin+path}</loc></url>`).join('\n');
await writeFile(new URL('sitemap.xml',root),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
await writeFile(new URL('robots.txt',root),`User-agent: OAI-SearchBot\nAllow: /\nDisallow: /api/\n\nUser-agent: Googlebot\nAllow: /\nDisallow: /api/\n\nUser-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${origin}/sitemap.xml\n`);
const solutionLinks=solutions.map(item=>`- [${item.title}](${origin}/solutions/${item.slug}/): ${item.summary}`).join('\n');
const productLinks=products.map(([name,category,,summary])=>`- [${name}](${origin+'/platforms/'+name.toLowerCase().replaceAll(' ','-')+'/'}): ${category}. ${summary}`).join('\n');
await writeFile(new URL('llms.txt',root),`# Replaice\n\n> ${description}\n\nOfficial website: ${origin}/\n\n## Solutions\n\n${solutionLinks}\n\n## Platforms\n\n${productLinks}\n\n## Contact\n\n- [Contact Replaice](${origin}/contact/): Discuss enterprise requirements and request a product demonstration.\n`);
