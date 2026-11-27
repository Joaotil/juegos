/* =========================================================
   dialogue.js — Personajes, avatares e historia principal
   Para editar un diálogo: cambia el texto entre comillas.
   Formato de cada línea: [personaje, "texto", "sonido opcional"]
   Sonidos disponibles: wind, water, drip, mystery, bell, success, win
   ========================================================= */

const CHARACTERS = {
  narrador: {
    name: 'Narrador',
    role: 'Sabio agricultor de Lloa',
    desc: 'Guía al visitante con calma y memoria. Conoce cada ladera y cada canal de Valle Verde.',
    color: '#896B4B',
    look: { bg: '#EADCC2', skin: '#A8754F', cloth: '#8C3B2E', cloth2: '#E0A33A', hair: 'short', hairColor: '#D9D4CA', hat: 'fedora', hatColor: '#4A3A2A', band: '#E0A33A', beard: true }
  },
  manuel: {
    name: 'Don Manuel',
    role: 'Agricultor de la comunidad',
    desc: 'Directo y franco. Conoce de cerca los problemas de Valle Verde porque los vive cada día.',
    color: '#5B4636',
    look: { bg: '#D9E4C8', skin: '#9C6844', cloth: '#5B4636', cloth2: '#C9A45C', hair: 'short', hairColor: '#2A211B', hat: 'fedora', hatColor: '#2F2A26', band: '#B23A48', mustache: true }
  },
  rosa: {
    name: 'Rosa',
    role: 'Agricultora',
    desc: 'Preocupada por el agua y los cultivos. Siempre piensa primero en las familias.',
    color: '#B23A48',
    look: { bg: '#F4DCCF', skin: '#B57B55', cloth: '#B23A48', cloth2: '#F3EBDD', hair: 'braids', hairColor: '#1F1814', hat: 'fedora', hatColor: '#3B2F2A', band: '#E0A33A' }
  },
  mateo: {
    name: 'Mateo',
    role: 'Encargado del agua',
    desc: 'Ordenado y práctico. Organiza los turnos y la distribución del agua; le encantan los números.',
    color: '#2F6E8C',
    look: { bg: '#D3E7EC', skin: '#A97450', cloth: '#2F6E8C', cloth2: '#79B8C5', hair: 'short', hairColor: '#1F1814', hat: 'cap', hatColor: '#315B43' }
  },
  nami: {
    name: 'Nami Killa',
    role: 'Guardiana de los cultivos andinos',
    desc: 'Serena y sabia. Protege la oca y los saberes de la tierra; su nombre lleva a la luna (killa).',
    color: '#315B43',
    look: { bg: '#E1E8CF', skin: '#9E6A45', cloth: '#315B43', cloth2: '#E0A33A', hair: 'long', hairColor: '#1F1814', hat: 'moonband', hatColor: '#896B4B' }
  },
  yaku: {
    name: 'Yaku',
    role: 'Espíritu del agua',
    desc: 'Misterioso y juguetón. Protege los canales y habla con voz de corriente.',
    color: '#3E8FA3',
    look: { spirit: true }
  },
  visitante: {
    name: 'Visitante',
    role: 'Tú',
    desc: 'Llegas a Valle Verde con curiosidad y ganas de ayudar. Tus decisiones cambian la historia.',
    color: '#718C61',
    look: { bg: '#F3EBDD', skin: '#C68E63', cloth: '#718C61', cloth2: '#896B4B', hair: 'short', hairColor: '#5A3B26', hat: 'cap', hatColor: '#896B4B', pack: true }
  }
};

/* Dibuja el retrato de un personaje como SVG (sin archivos externos).
   Para usar una imagen propia: coloca el archivo en assets/characters/
   y agrega en CHARACTERS la propiedad  img: 'assets/characters/rosa.png' */
function avatarSVG(id) {
  const c = CHARACTERS[id];
  if (c.img) return `<img src="${c.img}" alt="" />`;
  const a = c.look;
  if (a.spirit) {
    return `<svg viewBox="0 0 120 120" aria-hidden="true">
      <rect width="120" height="120" fill="#CFE8EE"/>
      <circle cx="22" cy="26" r="3" fill="#fff" opacity=".8"/><circle cx="98" cy="34" r="2" fill="#fff" opacity=".8"/><circle cx="90" cy="88" r="2.5" fill="#fff" opacity=".7"/>
      <path d="M60 14C60 14 28 54 28 76c0 19 14 32 32 32s32-13 32-32C92 54 60 14 60 14z" fill="#79B8C5"/>
      <path d="M60 22C60 22 34 56 34 76c0 4 1 8 2 11 8-28 24-46 24-65z" fill="#A9D6DF"/>
      <ellipse cx="48" cy="58" rx="5" ry="9" fill="#fff" opacity=".55"/>
      <ellipse cx="51" cy="74" rx="5" ry="6" fill="#fff"/><ellipse cx="69" cy="74" rx="5" ry="6" fill="#fff"/>
      <circle cx="52" cy="75" r="2.8" fill="#1E4A57"/><circle cx="70" cy="75" r="2.8" fill="#1E4A57"/>
      <path d="M53 86q7 6 14 0" stroke="#1E4A57" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      <path d="M30 100q8-6 15 0t15 0 15 0 15 0" stroke="#3E8FA3" stroke-width="3" fill="none" stroke-linecap="round"/>
    </svg>`;
  }
  const ink = '#2A1E16';
  let back = '', hair = '', hat = '', face = '', extra = '';
  if (a.hair === 'long') back = `<path d="M37 50c-3 30 1 48 5 54h36c4-6 8-24 5-54z" fill="${a.hairColor}"/>`;
  if (a.hair === 'short' || a.hair === 'braids' || a.hair === 'long')
    hair = `<path d="M40 54c-1-20 40-20 40 0-4-10-36-10-40 0z" fill="${a.hairColor}"/>`;
  if (a.hair === 'braids')
    hair += `<path d="M41 52c-4 18-2 34 2 46M79 52c4 18 2 34-2 46" stroke="${a.hairColor}" stroke-width="7" fill="none" stroke-linecap="round"/>
             <circle cx="43" cy="99" r="3.5" fill="#E0A33A"/><circle cx="77" cy="99" r="3.5" fill="#E0A33A"/>`;
  if (a.hat === 'fedora')
    hat = `<ellipse cx="60" cy="38" rx="31" ry="6.5" fill="${a.hatColor}"/><path d="M44 38c0-17 32-17 32 0z" fill="${a.hatColor}"/><rect x="44" y="31" width="32" height="4.5" fill="${a.band}"/>`;
  if (a.hat === 'cap')
    hat = `<path d="M40 47c0-21 40-21 40 0z" fill="${a.hatColor}"/><path d="M76 44l20 4-18 3z" fill="${a.hatColor}"/>`;
  if (a.hat === 'moonband')
    hat = `<path d="M41 45q19-8 38 0" stroke="${a.hatColor}" stroke-width="5" fill="none"/><circle cx="60" cy="39" r="5.5" fill="#F3EBDD"/><circle cx="62.5" cy="37.5" r="4.6" fill="${a.hatColor}"/>`;
  if (a.beard) face += `<path d="M42 58c1 24 35 24 36 0-5 14-31 14-36 0z" fill="#ECE6DA"/>`;
  if (a.mustache) face += `<path d="M51 64q9-6 18 0-9-2-18 0z" fill="${ink}" stroke="${ink}" stroke-width="2" stroke-linejoin="round"/>`;
  if (a.pack) extra = `<path d="M38 92l6 28M82 92l-6 28" stroke="${a.cloth2}" stroke-width="6"/>`;
  return `<svg viewBox="0 0 120 120" aria-hidden="true">
    <rect width="120" height="120" fill="${a.bg}"/>
    ${back}
    <path d="M20 122c0-30 18-40 40-40s40 10 40 40z" fill="${a.cloth}"/>
    <path d="M38 90l22 22 22-22" stroke="${a.cloth2}" stroke-width="4" fill="none"/>
    <path d="M30 104h60" stroke="${a.cloth2}" stroke-width="2" opacity=".6"/>
    ${extra}
    <rect x="53" y="68" width="14" height="16" rx="5" fill="${a.skin}"/>
    <ellipse cx="60" cy="55" rx="19" ry="22" fill="${a.skin}"/>
    ${hair}
    <circle cx="52.5" cy="56" r="2.3" fill="${ink}"/><circle cx="67.5" cy="56" r="2.3" fill="${ink}"/>
    <circle cx="48" cy="63" r="3.4" fill="#E58C7A" opacity=".35"/><circle cx="72" cy="63" r="3.4" fill="#E58C7A" opacity=".35"/>
    ${face}
    <path d="M54 67q6 5 12 0" stroke="${ink}" stroke-width="2" fill="none" stroke-linecap="round"/>
    ${hat}
  </svg>`;
}

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
