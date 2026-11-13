const shapes=[
 ['Drone',[
  'M136 91h48l15 19-15 19h-48l-15-19z M147 101h26v18h-26z M146 130l-9 22h-18m55-22 9 22h18',
  'M131 97 87 66m102 31 44-31m-102 57-44 31m102-31 44 31',
  'M66 66h42m-21-8v16m125-8h42m-21-8v16M66 154h42m-21-8v16m125-8h42m-21-8v16'
 ]],
 ['Humanoid and Quadruped',[
  'M111 63 130 41 160 33 190 41 209 63 211 105 199 131 178 150 142 150 121 131 109 105Z M111 68l-10 8v24l10 8m98-40 10 8v24l-10 8',
  'M119 69 141 58h38l22 11-4 24-23 11h-28l-23-11Z M133 80h18m18 0h18 M160 104l-6 12h12m-24 9 18 8 18-8',
  'M130 41l11 17m49-17-11 17m-58 73 9-25m69 25-9-25m-43 44-8 12h42l-8-12 M151 48h18'
 ]],
 ['Smart glasses',[
  'M63 90q2-10 16-10h58l23 9 23-9h58q14 0 16 10l-9 42q-2 11-16 13h-38q-15 0-20-14l-8-19h-12l-8 19q-5 14-20 14H88q-14-2-16-13z',
  'M63 92 43 77v24l24 15m190-24 20-15v24l-24 15m-155-9 15-9m-9 21 23-14m65 14 23-14m-17 25 26-15',
  'M206 94h27v24m-27-24v9m27 15h-8m-17 8h18v-13'
 ]],

];
export function northstarMotion(){
 return `<div class="northstar-motion" role="img" aria-label="Line drawings of a drone, humanoid face with Humanoid and Quadruped labels, and AI and IoT enabled smart glasses"><svg viewBox="0 0 320 224" aria-hidden="true">${shapes.map(([,paths],index)=>`<g class="northstar-scene" style="--scene-delay:${index*4}s">${paths.map((path,i)=>`<path d="${path}" pathLength="100" style="--stroke-delay:${i*.28}s"/>`).join('')} ${index===0?'<text class="northstar-typing" style="--letters:5" x="160" y="197" text-anchor="middle">Drone</text>':index===2?'<text class="northstar-typing" style="--letters:31" x="160" y="197" text-anchor="middle">AI &amp; IoT enabled smart wearable</text>':index===1?'<text class="northstar-typing" x="54" y="197">Humanoid</text><text class="northstar-typing" x="170" y="197">Quadruped</text>':''}</g>`).join('')}</svg></div>`;
}
