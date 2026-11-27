/* =========================================================
   scene.js — Arte del juego en estilo «papel recortado andino»
   landscape({ fit })  paisaje de Lloa en capas de papel
   mapSVG(stations, done) mapa del río visto desde arriba
   ========================================================= */

let uid = 0;
const SINK = '#2E294E';

function rng(seed) { return () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }

/* Filtros compartidos: sombra de papel y grano */
function paperDefs(k) {
  return `<filter id="ps${k}" x="-10%" y="-20%" width="120%" height="140%"><feDropShadow dx="0" dy="-5" stdDeviation="5" flood-color="${SINK}" flood-opacity=".22"/></filter>
    <filter id="pd${k}" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="5" stdDeviation="4" flood-color="${SINK}" flood-opacity=".25"/></filter>
    <filter id="gr${k}"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .18  0 0 0 0 .16  0 0 0 0 .3  0 0 0 .55 0"/></filter>`;
}

function llama(x, y, s, fur = '#FBF3E4', flip = false) {
  return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})" class="llama">
    <g stroke="${SINK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke-opacity=".55">
      <path d="M-22 18v20M-10 20v18M12 20v18M22 18v20" fill="none" stroke-width="4" stroke-opacity=".8"/>
      <ellipse cx="0" cy="10" rx="30" ry="16" fill="${fur}"/>
      <g class="llama-head"><path d="M18 4c4-14 4-28 6-36h12c2 10-2 30-4 40z" fill="${fur}"/>
      <path d="M24-32l-2-12 6 8M34-32l2-12-6 8" fill="${fur}"/>
      <ellipse cx="34" cy="-28" rx="9" ry="6" fill="${fur}"/></g>
    </g>
    <circle cx="33" cy="-31" r="2" fill="${SINK}"/>
    <path d="M-12 2h24" stroke="#C8553D" stroke-width="5"/><path d="M-12 2h24" stroke="#E9A23B" stroke-width="5" stroke-dasharray="4 4"/>
  </g>`;
}

function tree(x, y, s = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-3" y="-6" width="6" height="40" rx="3" fill="#6B4A33"/>
    <path d="M0-96c20 10 24 44 18 70-4 16-32 16-36 0-6-26-2-60 18-70z" fill="#2F6B4F"/>
    <path d="M0-96c20 10 24 44 18 70-3 12-12 16-18 16z" fill="#245640"/>
  </g>`;
}

function landscape({ fit = 'slice' } = {}) {
  const k = ++uid;
  const par = fit === 'meet' ? 'xMidYMid meet' : 'xMidYMax slice';
  const canal = 'M-40 650C170 615 330 580 470 548C575 524 625 486 660 452';
  const P = `filter="url(#ps${k})"`, D = `filter="url(#pd${k})"`;
  const bands = (y0, n, cols) => Array.from({ length: n }, (_, i) => {
    const y = y0 + i * 34, c = cols[i % cols.length];
    return `<path d="M-40 ${y}C200 ${y - 26} 420 ${y + 16} 700 ${y - 8}S1080 ${y - 30} 1240 ${y - 14}V720H-40z" fill="${c}" ${P}/>`;
  }).join('');
  return `<svg class="land" viewBox="0 0 1200 700" preserveAspectRatio="${par}" aria-hidden="true">
  <defs>
    ${paperDefs(k)}
    <linearGradient id="sky${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ED8DB"/><stop offset=".55" stop-color="#DDEFE3"/><stop offset="1" stop-color="#FDF0D5"/></linearGradient>
    <clipPath id="near${k}"><path d="M-40 505C230 446 520 488 760 456 960 430 1100 452 1240 444V720H-40z"/></clipPath>
  </defs>
  <rect width="1200" height="700" fill="url(#sky${k})"/>
  <g class="inti" transform="translate(930 150)">
    <circle r="120" fill="#FFF4D6" opacity=".55"/><circle r="86" fill="#FFE7A8" opacity=".8"/><circle r="58" fill="#FFD27A"/>
    <g class="inti-ring" fill="none" stroke="#E9A23B" stroke-width="3" stroke-dasharray="2 12" stroke-linecap="round"><circle r="72"/></g>
  </g>
  <g class="condor" transform="translate(300 140)"><path d="M0 0q-30-14-60-6 26 0 40 12-30 2-50 16 34-8 54-10 4 6 16 6t16-6q20 2 54 10-20-14-50-16 14-12 40-12-30-8-60 6z" fill="${SINK}" opacity=".75"/></g>
  <g class="mist m1" opacity=".75"><ellipse cx="260" cy="250" rx="190" ry="20" fill="#fff"/><ellipse cx="380" cy="236" rx="90" ry="16" fill="#fff"/></g>
  <path d="M0 380L110 318 200 344 320 266 420 316 520 250 600 300 700 236 820 300 940 262 1060 322 1200 286V720H0z" fill="#C5CFE0" ${P}/>
  <path d="M230 470C380 300 470 176 540 152c40-12 60 8 90-2 60-10 170 150 350 320z" fill="#7F9BAE" ${P}/>
  <path d="M502 168c30-18 56-14 86-8 22-8 44-12 66 6l-18 24-22-12-24 22-26-18-24 16z" fill="#F7F3EA"/>
  <path d="M560 200c-30 90-80 170-150 250" fill="none" stroke="#6C8799" stroke-width="10" stroke-linecap="round" opacity=".5"/>
  <g class="mist m2" opacity=".85"><ellipse cx="760" cy="330" rx="230" ry="22" fill="#fff"/><ellipse cx="640" cy="318" rx="90" ry="14" fill="#fff"/></g>
  <path d="M-40 480C190 392 380 432 560 410 770 386 960 428 1240 388V720H-40z" fill="#9CC48A" ${P}/>
  ${tree(70, 430, .9)}${tree(120, 446, .7)}${tree(1110, 400, .95)}${tree(1162, 414, .78)}${tree(820, 420, .7)}
  <g transform="translate(980 352)" ${D}>
    <rect x="0" y="40" width="70" height="56" fill="#FBF3E4"/><path d="M-8 44L35 12 78 44z" fill="#C8553D"/>
    <rect x="22" y="-8" width="26" height="52" fill="#FBF3E4"/><path d="M18-6L35-28 52-6z" fill="#C8553D"/><path d="M35-28v-16M29-38h12" stroke="${SINK}" stroke-width="3"/>
    <path d="M28 96V72q7-10 14 0v24" fill="#6B4A33"/><circle cx="35" cy="14" r="6" fill="${SINK}" opacity=".7"/>
  </g>
  <g clip-path="url(#near${k})">
    <rect x="-40" y="420" width="1300" height="300" fill="#7FB56E"/>
    ${bands(482, 8, ['#8FC07A', '#E3C877', '#6FA862', '#B9D48A', '#D9A86A', '#7FB56E', '#A7CC80', '#6A9E5A'])}
  </g>
  <path d="${canal}" fill="none" stroke="#F2EBDC" stroke-width="30" stroke-linecap="round" ${D}/>
  <path d="${canal}" fill="none" stroke="#4EA5D9" stroke-width="15" stroke-linecap="round"/>
  <path class="flow" d="${canal}" fill="none" stroke="#DDF2FB" stroke-width="3" stroke-dasharray="14 28" stroke-linecap="round"/>
  <g transform="translate(200 420)" ${D}>
    <rect x="0" y="34" width="104" height="66" fill="#FBF3E4"/><path d="M-14 40L52 0l66 40z" fill="#C8553D"/><path d="M-14 40L52 0l66 40" fill="none" stroke="#A9432E" stroke-width="4"/>
    <rect x="42" y="58" width="22" height="42" fill="#6B4A33"/><rect x="12" y="52" width="20" height="18" rx="3" fill="#4EA5D9"/><rect x="74" y="52" width="20" height="18" rx="3" fill="#4EA5D9"/>
    <path d="M0 92h104" stroke="#E9A23B" stroke-width="6" stroke-dasharray="8 6"/>
  </g>
  <g transform="translate(640 356)" ${D}>
    <ellipse cx="50" cy="86" rx="52" ry="12" fill="#B9AA90"/>
    <rect x="-2" y="16" width="104" height="70" fill="#DDD2BE"/>
    <path d="M-2 40h104M-2 62h104" stroke="#C4B79E" stroke-width="3"/>
    <rect x="40" y="26" width="20" height="52" rx="4" fill="#FBF3E4"/><rect x="43" y="62" width="14" height="13" rx="2" fill="#4EA5D9"/>
    <ellipse cx="50" cy="16" rx="52" ry="12" fill="#EEE6D6"/>
  </g>
  ${llama(140, 600, 1.05)}${llama(1060, 520, .8, '#B98A5E', true)}
  <g>${Array.from({ length: 14 }, (_, i) => { const x = 840 + (i % 7) * 46 + (i > 6 ? 20 : 0), y = 590 + (i > 6 ? 40 : 0); return `<g transform="translate(${x} ${y})"><path d="M0 0c-14-4-16-18-4-20 0-10 14-10 14 0 12 2 10 16-4 20z" fill="#3F7F4E"/><ellipse cx="-7" cy="6" rx="5" ry="6" fill="#E86A92"/><ellipse cx="6" cy="7" rx="5" ry="6" fill="#F49AB7"/></g>`; }).join('')}</g>
  <path d="M-40 668C300 640 600 690 900 655 1050 640 1150 662 1240 656V720H-40z" fill="#3F6E4C" ${P}/>
  <rect width="1200" height="700" filter="url(#gr${k})" opacity=".35" style="mix-blend-mode:multiply"/>
  </svg>`;
}

/* ---------- Mapa del río (vista desde arriba) ---------- */
// Puntos de cada estación en un lienzo de 1000 × 1300
const MAP_PTS = [[300, 330], [580, 440], [370, 570], [640, 690], [400, 810], [650, 930], [420, 1050], [580, 1170]];
const MAP_SRC = [330, 175], MAP_END = [520, 1265];

/* Curva suave (Catmull-Rom) entre dos puntos, usando sus vecinos */
function seg(p0, p1, p2, p3) {
  const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
  const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
  return `M${p1}C${c1} ${c2} ${p2}`;
}

function mapSVG(done) {
  const k = ++uid, r = rng(11);
  const pts = [MAP_SRC, ...MAP_PTS, MAP_END];
  const segs = pts.slice(0, -1).map((p, i) => seg(pts[i - 1] || p, p, pts[i + 1], pts[i + 2] || pts[i + 1]));
  const contour = (cx, cy, rx, ry, n, cols) => Array.from({ length: n }, (_, i) => {
    const f = 1 - i / n, pts2 = Array.from({ length: 14 }, (_, a) => { const t = a / 14 * Math.PI * 2, j = .88 + r() * .2; return [cx + Math.cos(t) * rx * f * j, cy + Math.sin(t) * ry * f * j]; });
    const d = pts2.map((p, a) => { const q = pts2[(a + 1) % 14]; return `${a ? '' : 'M' + p}Q${p} ${(p[0] + q[0]) / 2},${(p[1] + q[1]) / 2}`; }).join('') + 'Z';
    return `<path d="${d}" fill="${cols[i]}" stroke="#8B6F4E" stroke-opacity=".35" stroke-width="2"/>`;
  }).join('');
  const roofs = (x, y) => `<g transform="translate(${x} ${y})" filter="url(#pd${k})"><rect width="34" height="24" fill="#C8553D"/><path d="M0 12h34" stroke="#A9432E" stroke-width="3"/><rect x="40" y="6" width="26" height="20" fill="#D9714F"/><path d="M53 6v20" stroke="#A9432E" stroke-width="3"/></g>`;
  const trees = (x, y, n) => Array.from({ length: n }, () => { const tx = x + (r() - .5) * 110, ty = y + (r() - .5) * 70, rr = 11 + r() * 9; return `<circle cx="${tx}" cy="${ty}" r="${rr}" fill="#3F7F4E"/><circle cx="${tx - rr * .3}" cy="${ty - rr * .3}" r="${rr * .55}" fill="#5A9A62"/>`; }).join('');
  const terr = (x, y, w, n) => Array.from({ length: n }, (_, i) => `<path d="M${x} ${y + i * 16}q${w / 2} -26 ${w} 0" fill="none" stroke="${['#9CC48A', '#E3C877', '#7FB56E'][i % 3]}" stroke-width="11" stroke-linecap="round"/>`).join('');
  const fog = MAP_PTS.map(([x, y], i) => i <= done ? '' : `<g class="fog" style="--fd:${(i % 3) * -2}s"><ellipse cx="${x}" cy="${y}" rx="120" ry="62" fill="#F7F1E3"/><ellipse cx="${x - 70}" cy="${y + 20}" rx="70" ry="40" fill="#FBF6EC"/><ellipse cx="${x + 80}" cy="${y - 14}" rx="80" ry="44" fill="#F3EBDA"/></g>`).join('');
  return `<svg class="map-svg" viewBox="0 0 1000 1300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>${paperDefs(k)}
      <radialGradient id="vig${k}" cx="50%" cy="50%" r="70%"><stop offset=".6" stop-color="#F3E6C8" stop-opacity="0"/><stop offset="1" stop-color="#B98A5E" stop-opacity=".55"/></radialGradient>
      <filter id="fogb${k}"><feGaussianBlur stdDeviation="14"/></filter>
    </defs>
    <rect width="1000" height="1300" fill="#F3E6C8"/>
    <g opacity=".95">${contour(330, 190, 260, 170, 6, ['#B7C6A0', '#A6B98E', '#93A982', '#8C9C86', '#A8A6B8', '#F7F3EA'])}</g>
    <text x="250" y="118" text-anchor="middle" class="map-lbl">Pichincha</text>
    <g opacity=".9">${contour(860, 420, 170, 130, 4, ['#C7D3A6', '#B4C690', '#A3B985', '#93AC7A'])}</g>
    ${trees(820, 620, 16)}${trees(150, 700, 14)}${trees(830, 1050, 10)}${trees(130, 1120, 12)}
    ${terr(700, 760, 230, 6)}${terr(110, 900, 200, 6)}${terr(660, 1180, 220, 5)}
    ${roofs(180, 470)}${roofs(740, 560)}${roofs(200, 960)}${roofs(760, 1000)}
    <g filter="url(#pd${k})"><ellipse cx="760" cy="840" rx="46" ry="30" fill="#DDD2BE"/><ellipse cx="760" cy="834" rx="34" ry="20" fill="#4EA5D9"/></g>
    <text x="760" y="895" text-anchor="middle" class="map-lbl sm">Depósito</text>
    <g class="riverbed">${segs.map(d => `<path d="${d}" fill="none" stroke="#D8C7A4" stroke-width="30" stroke-linecap="round"/>`).join('')}</g>
    <g class="riverbed-in">${segs.map(d => `<path d="${d}" fill="none" stroke="#C9B48C" stroke-width="10" stroke-linecap="round" stroke-dasharray="2 16"/>`).join('')}</g>
    <g class="river">${segs.map((d, i) => i <= done ? `<path class="${i === done ? 'new' : ''}" d="${d}" pathLength="1" fill="none" stroke="#4EA5D9" stroke-width="20" stroke-linecap="round"/>` : '').join('')}</g>
    <g class="river-shine">${segs.map((d, i) => i <= done ? `<path d="${d}" fill="none" stroke="#DDF2FB" stroke-width="3" stroke-dasharray="10 24" stroke-linecap="round"/>` : '').join('')}</g>
    <g filter="url(#fogb${k})">${fog}</g>
    <g transform="translate(870 1190)" class="chakana" filter="url(#pd${k})">
      <path d="M-15-45h30v15h15v15h15v30h-15v15h-15v15h-30v-15h-15v-15h-15v-30h15v-15h15z" fill="#C8553D"/>
      <circle r="11" fill="#F3E6C8"/><path d="M0-62v-10M0 62v10M-62 0h-10M62 0h10" stroke="${SINK}" stroke-width="3"/>
      <text y="-78" text-anchor="middle" class="map-lbl sm">N</text>
    </g>
    <rect width="1000" height="1300" fill="url(#vig${k})"/>
    <rect width="1000" height="1300" filter="url(#gr${k})" opacity=".3" style="mix-blend-mode:multiply"/>
  </svg>`;
}
