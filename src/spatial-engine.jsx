import React, {useMemo} from 'react';
import {createRoot} from 'react-dom/client';
import {Canvas,useFrame} from '@react-three/fiber';
import {PerspectiveCamera} from '@react-three/drei';
import {EffectComposer,Bloom} from '@react-three/postprocessing';
import * as T from 'three';

function buildScene(scan){
 const group=new T.Group();
 group.add(new T.GridHelper(18,24,0x448eff,0x1a4487));
 const points=[];
 for(let i=0;i<100;i++){
  const x=(i%10-4.5)*1.35,z=(Math.floor(i/10)-4.5)*1.35;
  points.push(x,scan?.04:Math.sin(i*1.7)*.8,z);
 }
 const geometry=new T.BufferGeometry();
 geometry.setAttribute('position',new T.Float32BufferAttribute(points,3));
 group.add(new T.Points(geometry,new T.PointsMaterial({color:new T.Color(0x73bbff).multiplyScalar(2.4),size:.12,transparent:true,opacity:.9,toneMapped:false})));
 let drone,beam;
 if(scan){
  drone=new T.Group();
  const material=new T.MeshBasicMaterial({color:0x9acbff,wireframe:true});
  for(const [w,h,d,x,z] of [[1.4,.32,.8,0,0],[3,.1,.15,0,0],[.12,.1,1.8,-1.4,0],[.12,.1,1.8,1.4,0]]){
   const piece=new T.Mesh(new T.BoxGeometry(w,h,d),material);
   piece.position.set(x,0,z);drone.add(piece);
  }
  beam=new T.Mesh(new T.ConeGeometry(1.9,2.5,24,1,true),new T.MeshBasicMaterial({color:0x418aff,transparent:true,opacity:.16,side:T.DoubleSide,depthWrite:false,blending:T.AdditiveBlending}));
  beam.position.y=-1.25;drone.add(beam);group.add(drone);
 }
 return {group,drone,beam};
}
function Scene({scan,pointer}){
 const {group,drone,beam}=useMemo(()=>buildScene(scan),[scan]);
 useFrame(({clock})=>{
  const t=clock.elapsedTime;
  group.rotation.y=scan?.05+Math.sin(t*.15)*.12:t*.075+pointer.x*.14;
  group.rotation.x=scan?0:pointer.y*.09;
  if(drone){drone.position.set(Math.sin(t*.55)*3,2.6+Math.sin(t*1.3)*.15,Math.cos(t*.55)*2);beam.material.opacity=.12+Math.sin(t*2)**2*.08;}
 });
 return <primitive object={group}/>;
}
class SceneBoundary extends React.Component{
 state={failed:false};
 static getDerivedStateFromError(){return {failed:true};}
 componentDidCatch(){this.props.onFailure();}
 render(){return this.state.failed?null:this.props.children;}
}
export function mountSpatialEngine(host){
 const pointer={x:0,y:0};
 const scan=host.dataset.spatial==='scan';
 const root=createRoot(host);
 let failed=false;
 (host.closest('.city-hero')||host).addEventListener('pointermove',event=>{
  const bounds=host.getBoundingClientRect();
  if(!bounds.width||!bounds.height)return;
  pointer.x=Math.max(-1,Math.min(1,2*(event.clientX-bounds.left)/bounds.width-1));
  pointer.y=Math.max(-1,Math.min(1,2*(event.clientY-bounds.top)/bounds.height-1));
 },{passive:true});
 const fail=()=>{failed=true;host.classList.remove('spatial-ready');};
 const created=({gl})=>{
  gl.domElement.addEventListener('webglcontextlost',()=>{fail();root.render(null);},{once:true});
 };
 return playing=>{
  host.classList.toggle('spatial-ready',playing&&!failed);
  if(failed)return;
  root.render(<SceneBoundary onFailure={fail}><Canvas frameloop={playing?'always':'never'} dpr={[1,1.5]} gl={{alpha:true,antialias:false,powerPreference:'low-power'}} onCreated={created} fallback={<span/>}>
   <PerspectiveCamera makeDefault position={[9,8,13]} rotation={[-0.47,0.53,0.25]} fov={39}/>
   <Scene scan={scan} pointer={pointer}/>
   <EffectComposer multisampling={0}><Bloom luminanceThreshold={1.3} intensity={0.28} mipmapBlur/></EffectComposer>
  </Canvas></SceneBoundary>);
 };
}
