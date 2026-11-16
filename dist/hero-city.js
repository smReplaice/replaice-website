export function renderHeroCity(){
 return '<div class="city-scene" aria-hidden="true"><div class="city-canvas"></div></div>';
}

export function mountHeroCity(){
 const mount=document.querySelector('.city-canvas');
 if(!mount)return;
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 let visible=false,loading=false,draw,start,stop;
 function sync(){
  if(visible&&!document.hidden){
   if(!loading){loading=true;void load();}
   if(motion.matches){stop?.();draw?.(0);}else start?.();
  }else stop?.();
 }
 async function load(){
  try{
   const T=await import('https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js');
   const renderer=new T.WebGLRenderer({antialias:true,alpha:false});
   renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
   mount.append(renderer.domElement);
   const scene=new T.Scene();
   scene.background=new T.Color(0x040e24);
   scene.fog=new T.FogExp2(0x040e24,.019);
   const camera=new T.PerspectiveCamera(41,1,.2,150);
   const city=new T.Group();
   scene.add(city);
   scene.add(new T.HemisphereLight(0x9bd0ff,0x0e2856,2.0));
   const key=new T.DirectionalLight(0x6fa8ff,2.3);
   key.position.set(8,12,6);
   scene.add(key);
   const rim=new T.DirectionalLight(0x6fa8ff,2.4);
   rim.position.set(-8,9,-12);
   scene.add(rim);
   const ground=new T.GridHelper(85,85,0x345b98,0x142e59);
   city.add(ground);
   const box=new T.BoxGeometry(1,1,1);
   const buildings=new T.InstancedMesh(box,new T.MeshStandardMaterial({color:0xffffff,roughness:.72,metalness:.16}),195);
   const lightStrips=new T.InstancedMesh(box,new T.MeshBasicMaterial({color:0x2687cf}),195*3);
   const dummy=new T.Object3D();
   let seed=163,count=0,lights=0;
   const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
   for(let z=-13;z<=9;z+=2)for(let x=-14;x<=14;x+=2){
    if(x===0||z===1||random()<.08)continue;
    const height=.65+random()**2*7.3,width=.72+random()*.62,depth=.8+random()*.55;
    dummy.position.set(x,height/2,z);
    dummy.scale.set(width,height,depth);
    dummy.updateMatrix();
    buildings.setMatrixAt(count,dummy.matrix);
    buildings.setColorAt(count++,new T.Color().setHSL(.58+random()*.037,.56,.23+random()*.15));
    for(let i=1;i<=3;i++){
     dummy.position.set(x,height*i/4,z+depth/2+.011);
     dummy.scale.set(width*.66,.022,.018);
     dummy.updateMatrix();
     lightStrips.setMatrixAt(lights++,dummy.matrix);
    }
   }
   buildings.count=count;
   lightStrips.count=lights;
   city.add(buildings,lightStrips);
   const traffic=new T.InstancedMesh(box,new T.MeshBasicMaterial({color:0x69d9ff}),22);
   city.add(traffic);
   let frame=0;
   draw=time=>{
    camera.position.set(11+Math.sin(time*.18)*2,12.6,22);
    camera.lookAt(-5.8,1.8,-2);
    for(let i=0;i<traffic.count;i++){
     const position=((i*2.7+time*(2+i%3))%44)-22;
     dummy.position.set(i%2?position:(i%5-2)*4+.98,.055,i%2?(i%5-2)*4+.98:position);
     dummy.scale.set(i%2?.63:.035,.035,i%2?.035:.63);
     dummy.updateMatrix();
     traffic.setMatrixAt(i,dummy.matrix);
    }
    traffic.instanceMatrix.needsUpdate=true;
    renderer.render(scene,camera);
   };
   function resize(){
    const width=mount.clientWidth,height=mount.clientHeight;
    if(!width||!height)return;
    camera.aspect=width/height;
    camera.updateProjectionMatrix();
    renderer.setSize(width,height,false);
    draw(0);
   }
   function tick(now){draw(now/1000);frame=requestAnimationFrame(tick);}
   start=()=>{if(!frame)frame=requestAnimationFrame(tick);};
   stop=()=>{cancelAnimationFrame(frame);frame=0;};
   renderer.domElement.addEventListener('webglcontextlost',()=>{
    stop();mount.classList.remove('city-ready');start=undefined;draw=undefined;
   });
   new ResizeObserver(()=>{if(draw)resize();}).observe(mount);
   resize();
   mount.classList.add('city-ready');
   sync();
  }catch{
   mount.replaceChildren();
  }
 }
 new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();}).observe(mount);
 document.addEventListener('visibilitychange',sync);
 motion.addEventListener('change',sync);
}
