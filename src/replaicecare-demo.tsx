import React, {useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {motion, useReducedMotion} from 'motion/react';
import {scenes, sources} from '../dist/replaicecare.js';

function CareDemo(){
 const [index,setIndex]=useState(0);
 const [playing,setPlaying]=useState(false);
 const panel=useRef<HTMLDivElement>(null);
 const reduced=useReducedMotion();
 useEffect(()=>{
  if(!playing)return;
  const timer=window.setInterval(()=>setIndex(i=>(i+1)%scenes.length),3800);
  return ()=>window.clearInterval(timer);
 },[playing]);
 useEffect(()=>{
  if(!panel.current)return;
  const observer=new IntersectionObserver(([entry])=>{setPlaying(entry.isIntersecting);});
  observer.observe(panel.current);
  return ()=>observer.disconnect();
 },[]);
 const [title,body,status]=scenes[index];
 return <div ref={panel}>
  <div className="care-demo-grid">
   <div><strong>Authorized sources</strong><ul>{sources.map(source=><li key={source}>{source}{index>0&&<span className="care:ml-2 care:text-teal-200" aria-label="Context checked">✓</span>}</li>)}</ul></div>
   <motion.div key={index} initial={reduced?false:{opacity:0,y:6}} animate={{opacity:1,y:0}} transition={{duration:.28}} aria-live="polite">
    <span className="mono">{status}</span><h3>{title}</h3><p>{body}</p>
    <p className="care:mt-3 care:text-sm">Demo request RC-1042 · Administrative referral</p>
   </motion.div>
  </div>
  <div className="care-controls">
   <progress max={scenes.length} value={index+1} aria-label="Workflow progress"/>
   <span>{index+1} / {scenes.length}</span>
  </div>
 </div>;
}
for(const node of document.querySelectorAll('[data-care-app]'))createRoot(node).render(<CareDemo/>);
