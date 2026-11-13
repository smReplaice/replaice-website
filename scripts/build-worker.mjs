import {readdir,mkdir,readFile,writeFile} from 'node:fs/promises';
import {extname} from 'node:path';
const dir=new URL('../dist/',import.meta.url);
const types={'.jpg':'image/jpeg','.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.txt':'text/plain; charset=utf-8','.xml':'application/xml; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.gif':'image/gif'};
const assets={};
async function collect(prefix=''){
 for(const entry of await readdir(new URL(prefix,dir),{withFileTypes:true})){
  if(entry.name.startsWith('.')||entry.name==='server')continue;
  const path=prefix+entry.name;
  if(entry.isDirectory())await collect(path+'/');
  else if(types[extname(path)])assets['/'+path]=[types[extname(path)],(await readFile(new URL(path,dir))).toString('base64')];
 }
}
await collect();
const contact=(await readFile(new URL('../worker/contact.js',import.meta.url),'utf8'));
const assistant=await readFile(new URL('../worker/assistant.js',import.meta.url),'utf8');
const entry=`
export default {fetch(request,env){
 const {pathname}=new URL(request.url);
 if(pathname==='/api/assistant/session')return assistantSession(request,env);
 if(pathname==='/api/contact')return contact(request,env);
 if(request.method!=='GET'&&request.method!=='HEAD')return new Response(null,{status:405});
 const asset=assets[pathname]||assets[(pathname.endsWith('/')?pathname:pathname+'/')+'index.html'];
 if(!asset)return new Response('Page not found',{status:404});
 const [type,content]=asset;
 return new Response(request.method==='HEAD'?null:Uint8Array.from(atob(content),c=>c.charCodeAt(0)),{headers:{'Content-Type':type,'X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','X-Frame-Options':'SAMEORIGIN','Content-Security-Policy':"frame-ancestors 'self'; object-src 'none'; base-uri 'self'; form-action 'self'",'Permissions-Policy':'camera=(), geolocation=(), microphone=(self)'}});
}};
`;
await mkdir(new URL('server/',dir),{recursive:true});
await writeFile(new URL('server/index.js',dir),contact+'\n'+assistant+'\nconst assets='+JSON.stringify(assets)+';\n'+entry);
