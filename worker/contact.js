const recipients=['sm@replaice.co','rajiv@replaice.co','shubhamb@replaice.co'];
const fields={'Name':120,'Business email':254,'Company':160,'Country':120,'Product interest':120,'Business challenge':400,'Message':4000};
const recent=new Map();
const reply=(body,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store'}});
const escape=value=>value.replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const format=value=>escape(value).replace(/\r?\n/g,'<br>');
const shell=(title,content)=>`<div style="font:16px/1.55 Arial,sans-serif;color:#142847;max-width:650px;margin:auto"><div style="background:#102544;color:white;padding:22px;border-radius:8px 8px 0 0"><strong>Replaice</strong><h1 style="font-size:23px;margin:8px 0 0">${title}</h1></div><div style="padding:22px;border:1px solid #dbe5f1">${content}</div></div>`;

async function send(env,to,subject,html){
 const response=await fetch('https://beacon.replaice.co/api/v1/threads',{
  method:'POST',signal:AbortSignal.timeout(8000),
  headers:{'Content-Type':'application/json','X-BEACON-TOKEN':env.BEACON_TOKEN},
  body:JSON.stringify({uuid:crypto.randomUUID(),service_name:env.BEACON_SERVICE_NAME,domain_number:Number(env.BEACON_DOMAIN_NUMBER||2),from_name:'Replaice',to,cc:[],subject,html,is_reply:'false'})
 });
 if(!response.ok)throw new Error('Beacon rejected the request');
}

export async function contact(request,env){
 if(request.method!=='POST')return reply({message:'Use POST to submit an enquiry.'},405);
 if(request.headers.get('Origin')!==new URL(request.url).origin)return reply({message:'Invalid request origin.'},403);
 if(!request.headers.get('Content-Type')?.startsWith('application/json'))return reply({message:'Invalid request format.'},415);
 if(!env.BEACON_TOKEN||!env.BEACON_SERVICE_NAME)return reply({message:'Online enquiries are temporarily unavailable. Please email contactus@replaice.co.'},503);
 if(Number(request.headers.get('Content-Length'))>16000)return reply({message:'Enquiry is too long.'},413);
 let input;
 try{
  const body=await request.text();
  if(body.length>16000)return reply({message:'Enquiry is too long.'},413);
  input=JSON.parse(body);
 }catch{return reply({message:'Invalid enquiry.'},400);}
 if(!input||typeof input!=='object'||Array.isArray(input)||input.Website)return reply({message:'Invalid enquiry.'},400);
 const values={};
 for(const [name,max] of Object.entries(fields)){
  const value=typeof input[name]==='string'?input[name].trim():'';
  if(!value||value.length>max)return reply({message:`Enter a valid ${name.toLowerCase()}.`},400);
  values[name]=value;
 }
 const email=values['Business email'];
 if(!/^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]+$/.test(email))return reply({message:'Enter a valid business email.'},400);
 const ip=request.headers.get('CF-Connecting-IP');
 const now=Date.now();
 for(const [key,entry] of recent)if(entry.until<=now)recent.delete(key);
 if(ip){
  const key=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(ip));
  const hash=Array.from(new Uint8Array(key)).join('.');
  const entry=recent.get(hash)||{count:0,until:now+600000};
  if(entry.count>=5||(!recent.has(hash)&&recent.size>=10000))return reply({message:'Too many enquiries. Please try again later.'},429);
  entry.count++;
  recent.set(hash,entry);
 }
 const {city,region,country}=request.cf||{};
 const location=[...new Set([city,region,country].filter(Boolean))].join(', ')||'Unavailable';
 const rows=Object.entries({...values,'Approximate location':location}).map(([label,value])=>`<tr><th scope="row" style="text-align:left;vertical-align:top;padding:8px;background:#f0f5fb">${escape(label)}</th><td style="padding:8px;overflow-wrap:anywhere">${format(value)}</td></tr>`).join('');
 try{
  await send(env,recipients,'New enquiry from the Replaice website',shell('New website enquiry',`<table style="width:100%;border-collapse:collapse">${rows}</table>`));
 }catch{return reply({message:'We could not submit your enquiry. Please try again or email contactus@replaice.co.'},502);}
 let confirmationQueued=true;
 try{
  await send(env,[email],'We received your Replaice enquiry',shell('Thank you for contacting us',`<p>Hello ${escape(values.Name)},</p><p>We’ve received your enquiry about <strong>${escape(values['Product interest'])}</strong>. A member of the Replaice team will review it and follow up at this email address.</p><p>Replaice Enterprise AI Team</p>`));
 }catch{confirmationQueued=false;}
 return reply({confirmationQueued},202);
}
