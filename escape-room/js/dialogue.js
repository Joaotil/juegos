/* =========================================================
   dialogue.js — Personajes, avatares e historia principal
   Para editar un diálogo: cambia el texto entre comillas.
   Formato de cada línea: [personaje, "texto", "sonido opcional"]
   Sonidos disponibles: wind, water, drip, mystery, bell, success, win
   ========================================================= */

const CHARACTERS = {
  narrador: {
    name: 'Narrador', role: 'Sabio agricultor de Lloa', color: '#C0532F', pitch: 150,
    desc: 'Guía al visitante con calma y memoria. Conoce cada ladera y cada canal de Valle Verde.',
    hello: 'Soy el narrador, un viejo agricultor de Lloa. Te guiaré por cada rincón de Valle Verde.',
    look: { skin: '#B9784C', cloth: '#C0532F', cloth2: '#F2C14E', pants: '#3D3550', hair: 'short', hairColor: '#E9E4DA', hat: 'fedora', hatColor: '#6B4A33', band: '#F2C14E', beard: true, prop: 'stick' }
  },
  manuel: {
    name: 'Don Manuel', role: 'Agricultor de la comunidad', color: '#9C6B3F', pitch: 120,
    desc: 'Directo y franco. Conoce de cerca los problemas de Valle Verde porque los vive cada día.',
    hello: 'Soy Don Manuel. Conozco los problemas de la comunidad: nuestros depósitos ya no alcanzan.',
    look: { skin: '#A86A43', cloth: '#C94F3D', cloth2: '#2B2130', pants: '#33475B', hair: 'short', hairColor: '#2B2130', hat: 'straw', hatColor: '#EBC46A', band: '#C0532F', mustache: true, plaid: true, prop: 'hoe' }
  },
  rosa: {
    name: 'Rosa', role: 'Agricultora', color: '#D6455E', pitch: 260,
    desc: 'Preocupada por el agua y los cultivos. Siempre piensa primero en las familias.',
    hello: 'Soy Rosa. Me preocupan el agua, las familias y nuestros cultivos de oca.',
    look: { skin: '#B9784C', cloth: '#FFF8EA', cloth2: '#D6455E', skirt: '#7A2E5A', hair: 'braids', hairColor: '#2B2130', hat: 'bowler', hatColor: '#2F6B45', shawl: '#D6455E', prop: 'basket' }
  },
  mateo: {
    name: 'Mateo', role: 'Encargado del agua', color: '#1F86B3', pitch: 200,
    desc: 'Ordenado y práctico. Organiza los turnos y la distribución del agua; le encantan los números.',
    hello: 'Soy Mateo, encargado del agua. Organizo los turnos para que todos reciban una cantidad justa.',
    look: { skin: '#B07448', cloth: '#1F86B3', cloth2: '#8ED1F0', pants: '#2B2130', hair: 'short', hairColor: '#2B2130', hat: 'cap', hatColor: '#2F6B45', prop: 'bucket' }
  },
  nami: {
    name: 'Nami Killa', role: 'Guardiana de los cultivos andinos', color: '#2F6B45', pitch: 230,
    desc: 'Serena y sabia. Protege la oca y los saberes de la tierra; su nombre lleva a la luna (killa).',
    hello: 'Soy Nami Killa, guardiana de los cultivos andinos. La oca es parte de nuestra vida.',
    look: { skin: '#A0643F', cloth: '#2F6B45', cloth2: '#F2C14E', skirt: '#2B2130', hair: 'long', hairColor: '#2B2130', hat: 'moon', hatColor: '#9C6B3F', prop: 'oca' }
  },
  yaku: {
    name: 'Yaku', role: 'Espíritu del agua', color: '#1F86B3', pitch: 330,
    desc: 'Misterioso y juguetón. Protege los canales y habla con voz de corriente.',
    hello: 'Soy Yaku, el espíritu del agua. Protejo los canales… ¡cada gota cuenta!',
    look: { spirit: true }
  },
  visitante: {
    name: 'Visitante', role: 'Tú', color: '#5FAE5A', pitch: 180,
    desc: 'Llegas a Valle Verde con curiosidad y ganas de ayudar. Tus decisiones cambian la historia.',
    hello: '¡Y yo soy el visitante! Vine a ayudar a Valle Verde a cuidar su agua.',
    look: { skin: '#C68E63', cloth: '#5FAE5A', cloth2: '#F2C14E', pants: '#33475B', hair: 'short', hairColor: '#6B3E22', hat: 'cap', hatColor: '#F2C14E', pack: true }
  }
};

/* Dibuja a un personaje de cuerpo entero (SVG animable con CSS).
   head = true devuelve solo la cabeza (para iconos pequeños).
   Para usar una imagen propia: coloca el archivo en assets/characters/
   y agrega en CHARACTERS la propiedad  img: 'assets/characters/rosa.png' */
const INK = '#3A2F55';
function charSVG(id, head = false) {
  const c = CHARACTERS[id], a = c.look;
  if (c.img) return `<img src="${c.img}" alt="" />`;
  const S = `stroke="${INK}" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"`;
  const mouth = `<path class="m-closed" d="M62 91q8 7 16 0" fill="none" ${S}/>
    <g class="m-open"><path d="M61 89q9 15 18 0z" fill="#6B1F2E" ${S}/><path d="M65 95q5 4 10 0" fill="#F07C7C"/></g>`;
  if (a.spirit) {
    const vb = head ? '20 58 100 100' : '0 0 140 190';
    return `<svg class="char-svg" viewBox="${vb}" aria-hidden="true">
      <ellipse cx="70" cy="183" rx="30" ry="5" fill="#000" opacity=".15" class="c-shadow"/>
      <g class="c-body float">
        <path d="M70 18C70 18 28 82 28 122c0 28 19 48 42 48s42-20 42-48C112 82 70 18 70 18z" fill="#5CC6EE" ${S}/>
        <path d="M70 34C58 54 40 86 40 116c0 6 1 12 3 16 6-40 20-70 27-98z" fill="#A6E3F7"/>
        <ellipse cx="54" cy="84" rx="6" ry="11" fill="#fff" opacity=".7"/>
        <path d="M31 128q-14 2-16-10M109 128q14 2 16-10" fill="none" ${S}/>
        <g class="c-head">
          <g class="c-eyes"><ellipse cx="57" cy="114" rx="5" ry="6.5" fill="${INK}"/><ellipse cx="83" cy="114" rx="5" ry="6.5" fill="${INK}"/><circle cx="59" cy="111" r="2" fill="#fff"/><circle cx="85" cy="111" r="2" fill="#fff"/></g>
          <ellipse cx="48" cy="126" rx="6" ry="4" fill="#F28B82" opacity=".6"/><ellipse cx="92" cy="126" rx="6" ry="4" fill="#F28B82" opacity=".6"/>
          <g transform="translate(0 38)">${mouth}</g>
        </g>
        <path d="M44 156q8 6 16 0t16 0 16 0" fill="none" stroke="#1F86B3" stroke-width="3" stroke-linecap="round"/>
      </g>
      <g class="sparkles" fill="#fff" ${S} stroke-width="2"><path d="M18 40l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/><path d="M118 66l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/></g>
    </svg>`;
  }
  let back = '', hairTop = '', hat = '', face = '', torsoExtra = '', prop = '', legs = '', front = '';
  // piernas o falda
  if (a.skirt) legs = `<path d="M54 160v16M86 160v16" ${S} stroke-width="9" stroke="${a.skin}"/><path d="M54 160v16M86 160v16" fill="none" ${S} stroke-width="3" stroke="${INK}" opacity="0"/>
      <ellipse cx="53" cy="178" rx="9" ry="5" fill="${INK}"/><ellipse cx="87" cy="178" rx="9" ry="5" fill="${INK}"/>
      <path d="M40 132h60l10 34q-40 10-80 0z" fill="${a.skirt}" ${S}/><path d="M34 158q36 9 72 0" fill="none" stroke="${a.cloth2}" stroke-width="4"/>`;
  else legs = `<rect x="51" y="146" width="15" height="30" rx="6" fill="${a.pants}" ${S}/><rect x="74" y="146" width="15" height="30" rx="6" fill="${a.pants}" ${S}/>
      <ellipse cx="57" cy="178" rx="11" ry="6" fill="#4A2E22" ${S}/><ellipse cx="83" cy="178" rx="11" ry="6" fill="#4A2E22" ${S}/>`;
  if (a.hair === 'long') back = `<path d="M38 70c-6 40 0 66 8 78h48c8-12 14-38 8-78z" fill="${a.hairColor}" ${S}/>`;
  if (a.hair === 'braids') back = `<path d="M42 78q-10 30-4 60M98 78q10 30 4 60" fill="none" stroke="${INK}" stroke-width="13" stroke-linecap="round"/><path d="M42 78q-10 30-4 60M98 78q10 30 4 60" fill="none" stroke="${a.hairColor}" stroke-width="7" stroke-linecap="round"/>
      <circle cx="38" cy="140" r="5" fill="${a.cloth2}" ${S} stroke-width="2.5"/><circle cx="102" cy="140" r="5" fill="${a.cloth2}" ${S} stroke-width="2.5"/>`;
  hairTop = `<path d="M38 70c0-26 64-26 64 0-8-14-56-14-64 0z" fill="${a.hairColor}" ${S}/>`;
  if (a.hat === 'fedora') hat = `<ellipse cx="70" cy="46" rx="44" ry="9" fill="${a.hatColor}" ${S}/><path d="M48 46c0-26 44-26 44 0z" fill="${a.hatColor}" ${S}/><path d="M49 40h42" stroke="${a.band}" stroke-width="5"/>`;
  if (a.hat === 'straw') hat = `<ellipse cx="70" cy="46" rx="52" ry="10" fill="${a.hatColor}" ${S}/><path d="M46 46c0-28 48-28 48 0z" fill="${a.hatColor}" ${S}/><path d="M47 40h46" stroke="${a.band}" stroke-width="5"/><path d="M92 30l14-14" ${S} stroke="${a.band}"/>`;
  if (a.hat === 'bowler') hat = `<ellipse cx="70" cy="44" rx="26" ry="5" fill="${a.hatColor}" ${S}/><path d="M54 44c0-22 32-22 32 0z" fill="${a.hatColor}" ${S}/><path d="M55 39h30" stroke="${a.shawl}" stroke-width="4"/><circle cx="86" cy="38" r="5" fill="#F28BB0" ${S} stroke-width="2.5"/>`;
  if (a.hat === 'cap') hat = `<path d="M38 60c0-34 64-34 64 0z" fill="${a.hatColor}" ${S}/><path d="M96 56l26 6-26 6z" fill="${a.hatColor}" ${S}/><circle cx="70" cy="31" r="3" fill="${INK}"/>`;
  if (a.hat === 'moon') hat = `<path d="M38 62q32-14 64 0" fill="none" stroke="${INK}" stroke-width="11" stroke-linecap="round"/><path d="M38 62q32-14 64 0" fill="none" stroke="${a.hatColor}" stroke-width="6" stroke-linecap="round"/><circle cx="70" cy="50" r="9" fill="#FFF3B0" ${S} stroke-width="2.5"/><circle cx="74" cy="47" r="7.5" fill="${a.hatColor}"/>`;
  if (a.beard) face += `<path d="M44 80c2 30 50 30 52 0-8 14-44 14-52 0z" fill="#F1ECE2" ${S}/>`;
  if (a.mustache) face += `<path d="M58 87q12-8 24 0-12-3-24 0z" fill="${INK}" ${S} stroke-width="3"/>`;
  if (a.plaid) torsoExtra = `<path d="M54 106v42M70 102v50M86 106v42M42 124h56" stroke="${a.cloth2}" stroke-width="2.5" opacity=".55"/>`;
  else torsoExtra = `<path d="M44 128l8-7 8 7 8-7 8 7 8-7 8 7 8-7" fill="none" stroke="${a.cloth2}" stroke-width="4"/>`;
  if (a.shawl) torsoExtra = `<path d="M40 110q30 26 60 0l4 18q-34 22-68 0z" fill="${a.shawl}" ${S}/><circle cx="70" cy="122" r="3.5" fill="#F2C14E" ${S} stroke-width="2"/>`;
  if (a.pack) torsoExtra += `<path d="M52 104l-4 40M88 104l4 40" stroke="#9C6B3F" stroke-width="5"/>`;
  const armL = `<g class="c-arm-l"><path d="M46 112q-16 16-12 36" fill="none" stroke="${INK}" stroke-width="14" stroke-linecap="round"/><path d="M46 112q-16 16-12 36" fill="none" stroke="${a.cloth}" stroke-width="9" stroke-linecap="round"/><circle cx="34" cy="150" r="7" fill="${a.skin}" ${S}/></g>`;
  const armR = `<g class="c-arm-r"><path d="M94 112q16 16 12 36" fill="none" stroke="${INK}" stroke-width="14" stroke-linecap="round"/><path d="M94 112q16 16 12 36" fill="none" stroke="${a.cloth}" stroke-width="9" stroke-linecap="round"/><circle cx="106" cy="150" r="7" fill="${a.skin}" ${S}/></g>`;
  if (a.prop === 'stick') prop = `<path d="M24 112v70" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><path d="M24 112v70" stroke="#9C6B3F" stroke-width="4" stroke-linecap="round"/><path d="M24 112q-2-8 6-10" fill="none" ${S} stroke-width="3"/>`;
  if (a.prop === 'hoe') prop = `<path d="M26 92v90" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><path d="M26 92v90" stroke="#C99A5B" stroke-width="4" stroke-linecap="round"/><path d="M14 96h22l-4 10h-14z" fill="#9AA5AE" ${S} stroke-width="3"/>`;
  if (a.prop === 'basket') front = `<path d="M18 146h32l-4 20h-24z" fill="#D9A25B" ${S} stroke-width="3"/><path d="M22 146q12-14 24 0" fill="none" ${S} stroke-width="3"/><circle cx="28" cy="143" r="4" fill="#E36F9A" ${S} stroke-width="2"/><circle cx="38" cy="142" r="4" fill="#F2C14E" ${S} stroke-width="2"/>`;
  if (a.prop === 'bucket') front = `<path d="M20 148h28l-4 24h-20z" fill="#8ED1F0" ${S} stroke-width="3"/><path d="M22 148q12-16 24 0" fill="none" ${S} stroke-width="3"/><path d="M24 154h20" stroke="#1F86B3" stroke-width="3"/>`;
  if (a.prop === 'oca') front = `<ellipse cx="30" cy="152" rx="8" ry="12" transform="rotate(-20 30 152)" fill="#E36F9A" ${S} stroke-width="3"/><circle cx="28" cy="148" r="1.8" fill="${INK}"/><circle cx="32" cy="156" r="1.8" fill="${INK}"/>`;
  const vb = head ? '18 16 104 104' : '0 0 140 190';
  return `<svg class="char-svg" viewBox="${vb}" aria-hidden="true">
    <ellipse cx="70" cy="183" rx="38" ry="6" fill="#000" opacity=".15" class="c-shadow"/>
    ${prop}
    <g class="c-body">
      ${legs}
      ${back}
      <path d="M42 108q28-12 56 0l6 42q-34 10-68 0z" fill="${a.cloth}" ${S}/>
      ${torsoExtra}
      ${armL}${armR}
      ${front}
      <g class="c-head">
        <circle cx="38" cy="78" r="8" fill="${a.skin}" ${S}/><circle cx="102" cy="78" r="8" fill="${a.skin}" ${S}/>
        <circle cx="70" cy="74" r="33" fill="${a.skin}" ${S}/>
        ${hairTop}
        <path d="M54 66q5-3 9 0M77 66q5-3 9 0" fill="none" ${S} stroke-width="3"/>
        <g class="c-eyes"><ellipse cx="58" cy="76" rx="4.5" ry="5.5" fill="${INK}"/><ellipse cx="82" cy="76" rx="4.5" ry="5.5" fill="${INK}"/><circle cx="59.5" cy="74" r="1.7" fill="#fff"/><circle cx="83.5" cy="74" r="1.7" fill="#fff"/></g>
        <ellipse cx="50" cy="87" rx="6" ry="4" fill="#F28B82" opacity=".6"/><ellipse cx="90" cy="87" rx="6" ry="4" fill="#F28B82" opacity=".6"/>
        ${face}${mouth}
        ${hat}
      </g>
    </g>
  </svg>`;
}
const avatarSVG = id => charSVG(id, true);

/* ---------- Historia de introducción (basada en el guion) ---------- */
const STORY_INTRO = [
  ['narrador', 'Hace muchos años, en una comunidad agrícola de Lloa llamada Valle Verde, sus habitantes se dedicaban al cultivo de la oca, un tubérculo andino muy importante para su alimentación y economía.', 'wind'],
  ['narrador', 'Sin embargo, la comunidad enfrentaba un problema: los depósitos comunitarios no tenían la suficiente capacidad para almacenar el agua necesaria.', 'drip'],
  ['narrador', 'Las familias estaban preocupadas porque el agua debía repartirse entre los hogares y los cultivos. Si no encontraban una solución, la producción de oca podría verse afectada.'],
  ['manuel', '¡Esto es preocupante! Nuestros depósitos ya no son suficientes para guardar toda el agua que necesitamos.'],
  ['rosa', 'Tienes razón, Don Manuel. Nuestros cultivos de oca necesitan agua para crecer, y muchas familias dependen de ella.'],
  ['mateo', 'Como encargado del agua, debo encontrar una manera de organizar su distribución para que todos reciban una cantidad justa.'],
  ['narrador', 'En ese momento, unos pasos se acercan por el camino de piedra… Llega un visitante a la comunidad.', 'mystery'],
  ['narrador', '¡Bienvenido, Visitante! Para ayudar a Valle Verde tendrás que superar siete desafíos. Cada uno te dará una evidencia y te acercará a una solución sostenible.'],
  ['visitante', '¡Acepto el reto! Quiero ayudar a esta comunidad y descubrir cómo podemos cuidar mejor el agua.'],
  ['yaku', 'Shhh… el agua escucha. Reúne las evidencias, visitante: al final tendrás que defender tu decisión con ellas.', 'water']
];

/* ---------- Desenlace (basado en el guion) ---------- */
const STORY_ENDING = [
  ['narrador', 'Después de superar los siete desafíos, la comunidad de Valle Verde comprende que necesita trabajar unida.', 'water'],
  ['manuel', 'Nuestra propuesta será mejorar nuestros depósitos de almacenamiento.'],
  ['mateo', 'También organizaremos turnos de distribución y construiremos nuevos espacios.'],
  ['rosa', 'Además, promoveremos la recolección de agua de lluvia para aprovechar mejor este recurso.'],
  ['visitante', 'Creo que es la mejor decisión porque responde a las necesidades de las familias y la agricultura. Las evidencias demostraron que los depósitos no tienen suficiente capacidad y que se necesita una distribución organizada.'],
  ['nami', 'La esperanza es como una semilla: necesita cuidado para crecer.'],
  ['yaku', '¡Y el agua es la vida de nuestras raíces: cuidémosla siempre!'],
  ['narrador', 'Así, Valle Verde comprende que una sociedad sostenible necesita planificación, responsabilidad y cooperación.'],
  ['rosa', '¡Juntos podemos cuidar el agua y proteger nuestra tierra!'],
  ['narrador', 'Todos: ¡El agua es vida, cuidarla es responsabilidad de todos!', 'win'],
  ['narrador', 'Pero recuerden: si alguna decisión no tiene suficientes evidencias, debemos revisar nuestras misiones e investigar otra vez.']
];

const FINAL_MESSAGE = 'El agua es un recurso indispensable para la vida. Protegerla hoy significa asegurar el bienestar de las futuras generaciones.';
