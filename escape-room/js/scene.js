/* =========================================================
   scene.js — Paisaje animado de Lloa (SVG estilo caricatura)
   landscape({ fit }) devuelve el paisaje completo.
   fit: 'slice' (llena la pantalla) o 'meet' (se ve entero).
   ========================================================= */

let uid = 0;
const SINK = '#2B2130';

function rng(seed) { return () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }

/* Chacras en forma de colcha (patchwork) sobre una ladera */
function patchwork(seed, y0, y1, rows, cols) {
  const r = rng(seed);
  const C = ['#8CC63F', '#B5D96A', '#F2C14E', '#D9A25B', '#6FB24B', '#C9D98A', '#E8B04B', '#9AC56B', '#C08A57', '#7FBF5F'];
  const P = [];
  for (let i = 0; i <= rows; i++) {
    const t = Math.pow(i / rows, 1.25), y = y0 + (y1 - y0) * t;
    P.push(Array.from({ length: cols + 1 }, (_, j) => [-60 + j * (1320 / cols) + (j && j < cols ? (r() - .5) * 70 : 0), y + (i && i < rows ? (r() - .5) * 18 : 0)]));
  }
  let out = '';
  for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) {
    const a = P[i][j], b = P[i][j + 1], c = P[i + 1][j + 1], d = P[i + 1][j];
    out += `<path d="M${a}L${b}L${c}L${d}Z" fill="${C[Math.floor(r() * C.length)]}"/>`;
    if (r() < .45) { // surcos
      const m = (p, q, t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
      for (const t of [.33, .66]) out += `<path d="M${m(a, d, t)}L${m(b, c, t)}" stroke="${SINK}" stroke-opacity=".18" stroke-width="2"/>`;
    }
  }
  return out;
}

function llama(x, y, s, fur = '#FFF8EA', flip = false) {
  return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})" class="llama">
    <g stroke="${SINK}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round">
      <path d="M-22 18v20M-10 20v18M12 20v18M22 18v20" fill="none"/>
      <ellipse cx="0" cy="10" rx="30" ry="16" fill="${fur}"/>
      <g class="llama-head"><path d="M18 4c4-14 4-28 6-36h12c2 10-2 30-4 40z" fill="${fur}"/>
      <path d="M24-32l-2-12 6 8M34-32l2-12-6 8" fill="${fur}"/>
      <ellipse cx="34" cy="-28" rx="9" ry="6" fill="${fur}"/></g>
      <path d="M-30 4q-8 2-6 10" fill="none"/>
    </g>
    <circle cx="33" cy="-31" r="2" fill="${SINK}"/>
    <path d="M-8 2h20" stroke="#D6455E" stroke-width="4"/>
  </g>`;
}

function tree(x, y, s = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${SINK}" stroke-width="3.5" stroke-linejoin="round">
    <rect x="-4" y="-10" width="8" height="44" rx="3" fill="#7A4E2D"/>
    <path d="M0-92c22 8 26 40 20 66-4 18-36 18-40 0-6-26-2-58 20-66z" fill="#2F7D4A"/>
    <path d="M0-80c8 10 10 30 6 50" fill="none" stroke="#4FA466" stroke-width="3"/>
  </g>`;
}

function landscape({ fit = 'slice' } = {}) {
  const k = ++uid;
  const par = fit === 'meet' ? 'xMidYMid meet' : 'xMidYMax slice';
  const S = `stroke="${SINK}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`;
  const canal = 'M-40 650C170 615 330 580 470 548C575 524 625 486 660 452';
  const cloud = (x, y, s, cls) => `<g class="cloud ${cls}" transform="translate(${x} ${y}) scale(${s})"><path d="M0 30c-18 0-22-24-4-28 2-20 30-24 40-8 10-14 36-10 38 8 18 0 20 28 0 28z" fill="#FFFDF7" ${S}/></g>`;
  return `<svg class="land" viewBox="0 0 1200 700" preserveAspectRatio="${par}" aria-hidden="true">
  <defs>
    <linearGradient id="sky${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7CC8EC"/><stop offset=".55" stop-color="#BFE6F2"/><stop offset="1" stop-color="#FFE9C2"/></linearGradient>
    <clipPath id="hill${k}"><path d="M-40 505C230 446 520 488 760 456 960 430 1100 452 1240 444V720H-40z"/></clipPath>
  </defs>
  <rect width="1200" height="700" fill="url(#sky${k})"/>
  <g transform="translate(1030 118)">
    <g class="sun-rays">${Array.from({ length: 12 }, (_, i) => `<path d="M-14 -62L0 -98 14 -62z" transform="rotate(${i * 30})" fill="${i % 2 ? '#F2C14E' : '#F28B3C'}" ${S} stroke-width="3"/>`).join('')}</g>
    <circle r="56" fill="#FFD45C" ${S}/>
    <path d="M-26-6q8-8 16 0M10-6q8-8 16 0" fill="none" ${S}/>
    <path d="M-16 18q16 14 32 0" fill="none" ${S}/>
    <ellipse cx="-32" cy="12" rx="9" ry="6" fill="#F28B82" opacity=".7"/><ellipse cx="32" cy="12" rx="9" ry="6" fill="#F28B82" opacity=".7"/>
  </g>
  ${cloud(170, 70, 1.6, 'c1')}${cloud(620, 120, 1.1, 'c2')}${cloud(880, 190, 1.3, 'c3')}
  <g class="birds" fill="none" ${S} stroke-width="3"><path d="M380 150q10-10 20 0 10-10 20 0"/><path d="M430 128q8-8 16 0 8-8 16 0"/></g>
  <path d="M250 470L512 172q48-34 92-10 46-26 94 8L960 470z" fill="#A493C2" ${S}/>
  <path d="M512 172q48-34 92-10 46-26 94 8l-36 40-28-18-30 26-30-22-26 18z" fill="#FFFDF7" ${S} stroke-width="3"/>
  <path d="M600 260l30 120M700 280l40 110" stroke="${SINK}" stroke-opacity=".2" stroke-width="3"/>
  <path d="M-40 480C190 392 380 432 560 410 770 386 960 428 1240 388V720H-40z" fill="#7DB85A" ${S}/>
  ${tree(70, 430, .9)}${tree(130, 440, .75)}${tree(1110, 400, .95)}${tree(1170, 410, .8)}${tree(820, 420, .7)}
  <g transform="translate(980 352)" ${S} stroke-width="3.5">
    <rect x="0" y="40" width="70" height="56" fill="#FFFDF7"/><path d="M-8 44L35 12 78 44z" fill="#D9653B"/>
    <rect x="22" y="-8" width="26" height="52" fill="#FFFDF7"/><path d="M18-6L35-28 52-6z" fill="#D9653B"/><path d="M35-28v-18M28-40h14"/>
    <path d="M28 96V72q7-10 14 0v24" fill="#7A4E2D"/><rect x="29" y="8" width="12" height="14" rx="6" fill="#5B3A6B"/>
  </g>
  <g clip-path="url(#hill${k})">${patchwork(7 + k % 3, 440, 720, 6, 10)}</g>
  <path d="M-40 505C230 446 520 488 760 456 960 430 1100 452 1240 444" fill="none" ${S}/>
  <path d="${canal}" fill="none" stroke="${SINK}" stroke-width="30" stroke-linecap="round"/>
  <path d="${canal}" fill="none" stroke="#C9B79C" stroke-width="23" stroke-linecap="round" stroke-dasharray="26 4"/>
  <path d="${canal}" fill="none" stroke="#3FB6E0" stroke-width="11" stroke-linecap="round"/>
  <path class="flow" d="${canal}" fill="none" stroke="#E6F7FC" stroke-width="3.5" stroke-dasharray="16 26" stroke-linecap="round"/>
  <g transform="translate(200 420)" ${S}>
    <rect x="0" y="34" width="104" height="66" fill="#FFF8EA"/><path d="M-14 40L52 0l66 40z" fill="#D9653B"/>
    <path d="M-14 40L52 0l66 40" fill="none" stroke="#A84426" stroke-width="2" transform="translate(0 6)"/>
    <rect x="42" y="58" width="22" height="42" fill="#7A4E2D"/><rect x="12" y="52" width="20" height="18" fill="#8ED1F0"/><rect x="74" y="52" width="20" height="18" fill="#8ED1F0"/>
  </g>
  <g transform="translate(640 356)" ${S}>
    <ellipse cx="50" cy="86" rx="52" ry="12" fill="#B3A48C"/>
    <rect x="-2" y="16" width="104" height="70" fill="#D8CDB8"/>
    <path d="M10 40h80M10 62h80" stroke-width="2.5" stroke-opacity=".35"/>
    <rect x="40" y="26" width="20" height="52" rx="4" fill="#FFF8EA" stroke-width="3"/><rect x="43" y="62" width="14" height="13" fill="#3FB6E0" stroke="none"/>
    <ellipse cx="50" cy="16" rx="52" ry="12" fill="#ECE3D2"/>
  </g>
  ${llama(140, 600, 1.05)}${llama(1060, 520, .8, '#C9925E', true)}
  <g>${Array.from({ length: 14 }, (_, i) => { const x = 840 + (i % 7) * 46 + (i > 6 ? 20 : 0), y = 590 + (i > 6 ? 40 : 0); return `<g transform="translate(${x} ${y})" ${S} stroke-width="2.5"><path d="M0 0c-14-4-16-18-4-20 0-10 14-10 14 0 12 2 10 16-4 20z" fill="#4FA466"/><circle cx="-8" cy="6" r="5" fill="#E36F9A"/><circle cx="6" cy="7" r="5" fill="#F28BB0"/></g>`; }).join('')}</g>
  <path d="M-40 668C300 640 600 690 900 655 1050 640 1150 662 1240 656V720H-40z" fill="#4F9A45" ${S}/>
  <g ${S} stroke-width="2.5">${[[60, 684, '#F2C14E'], [330, 676, '#F28BB0'], [520, 690, '#FFFDF7'], [760, 680, '#F2C14E'], [1010, 668, '#F28BB0']].map(([x, y, f]) => `<circle cx="${x}" cy="${y}" r="7" fill="${f}"/>`).join('')}</g>
  </svg>`;
}
