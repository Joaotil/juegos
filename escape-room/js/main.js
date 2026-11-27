/* =========================================================
   main.js — Pantallas, navegación y mecánicas de juego
   ========================================================= */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const app = $('#app');
const fmt = n => String(n).replace('.', ',');
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fmtTime = ms => { const s = Math.floor(ms / 1000), h = Math.floor(s / 3600), m = Math.floor(s / 60) % 60; return (h ? h + ':' + String(m).padStart(2, '0') : m) + ':' + String(s % 60).padStart(2, '0'); };

const PRAISE = ['¡Correcto!', '¡Muy bien!', '¡Excelente trabajo!', '¡Lo lograste!'];
const PRAISE_CHAR = ['¡Eso es! Sigamos.', '¡Sabía que podías!', 'Cada respuesta acerca el agua a Valle Verde.', '¡Bien pensado, visitante!'];
const TRY_AGAIN = ['Casi… revisa con calma y vuelve a intentarlo.', 'No te preocupes, equivocarse también es aprender.', 'Mira otra vez los datos; la respuesta está ahí.'];

/* ---------- Iconos (trazos SVG 24×24) ---------- */
const ICONS = {
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  drop: '<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  leaf: '<path d="M5 19C5 10 11 5 20 5c0 9-5 15-14 15"/><path d="m5 19 8-8"/>',
  bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"/>',
  scale: '<path d="M12 4v16M6 20h12M5 8h14M5 8l-3 6a3 3 0 0 0 6 0zM19 8l-3 6a3 3 0 0 0 6 0z"/>',
  heart: '<path d="M12 20s-7-4.4-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  bag: '<path d="M5 8h14l-1 13H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  star: '<path d="m12 3 2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/>',
  sound: '<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12"/>',
  mute: '<path d="M4 9v6h4l5 4V5L8 9z"/><path d="m17 9 5 6M22 9l-5 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  back: '<path d="M15 5l-7 7 7 7"/>',
  next: '<path d="M9 5l7 7-7 7"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M17 6l3 3"/>',
  calc: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01"/>',
  map: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
  music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  users: '<circle cx="9" cy="8" r="4"/><path d="M2 21c0-4 3-7 7-7s7 3 7 7"/><path d="M16 4a4 4 0 0 1 0 8M22 21c0-3-2-6-5-6.7"/>',
  reset: '<path d="M4 4v6h6"/><path d="M5 15a8 8 0 1 0 2-8.5L4 10"/>',
  radio: '<rect x="3" y="9" width="18" height="12" rx="2"/><path d="m7 9 10-6"/><circle cx="15" cy="15" r="3"/><path d="M6 13h3M6 17h3"/>'
};
const icon = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n]}</svg>`;
const mLabel = m => m.label || `Desafío ${m.id}`;
const avatar = (id, size = '') => `<span class="avatar ${size}" style="--c:${CHARACTERS[id].color}">${avatarSVG(id)}</span>`;

/* ---------- Personajes animados que hablan ---------- */
const charHTML = (id, cls = '') => `<div class="char ${cls}" data-id="${id}" style="--d:-${(Math.random() * 3).toFixed(2)}s;--c:${CHARACTERS[id].color}">${charSVG(id)}</div>`;

/* Escribe el texto letra por letra mientras el personaje mueve la boca.
   el._finish() completa el texto al instante (botón «Siguiente»). */
function speak(el, text, id, done) {
  if (!el) return; // la pantalla cambió antes de que el personaje hablara
  clearTimeout(el._t);
  $$('.char.talking').forEach(c => c.classList.remove('talking'));
  const who = id ? $$(`.char[data-id="${id}"]`) : [];
  who.forEach(c => c.classList.add('talking'));
  const sr = el.nextElementSibling;
  if (sr && sr.classList.contains('sr-only')) sr.textContent = text;
  let i = 0;
  const finish = () => { clearTimeout(el._t); el.textContent = text; el._finish = null; who.forEach(c => c.classList.remove('talking')); done && done(); };
  el._finish = finish;
  if (reduceMotion) return finish();
  const tick = () => {
    if (!el.isConnected) return;
    i = Math.min(text.length, i + 2);
    el.textContent = text.slice(0, i);
    if (id && i % 6 === 0) Sound.blip(CHARACTERS[id].pitch);
    if (i < text.length) el._t = setTimeout(tick, 22); else finish();
  };
  tick();
}

/* ---------- Barra superior (HUD) ---------- */
function hud() {
  const done = Game.state.completed.length;
  return `<header class="hud">
    <button class="pill brand" data-act="map" aria-label="Ir al mapa">${icon('drop')}<span>Misión Lloa</span></button>
    <div class="hud-chips">
      <div class="pill drops" role="img" aria-label="Progreso: ${done} de ${MISSIONS.length} estaciones">${MISSIONS.map((m, i) => `<i class="${i < done ? 'on' : ''}"></i>`).join('')}<b>${done}/${MISSIONS.length}</b></div>
      <div class="pill" title="Puntuación">${icon('star')}<b id="hud-score">${Game.total()}</b></div>
      <div class="pill hide-sm" title="Tiempo">${icon('clock')}<b id="hud-time">${fmtTime(Game.elapsed())}</b></div>
      <button class="pill" data-act="evidence" aria-label="Evidencias (${Game.state.evidence.length})">${icon('bag')}<b>${Game.state.evidence.length}</b></button>
      <button class="pill round" data-act="sound" aria-label="Sonido" aria-pressed="${Sound.on}">${icon(Sound.on ? 'sound' : 'mute')}</button>
      <button class="pill round" data-act="menu" aria-label="Menú">${icon('menu')}</button>
    </div>
  </header>`;
}
setInterval(() => { const t = $('#hud-time'); if (t) t.textContent = fmtTime(Game.elapsed()); }, 1000);

function render(html) { app.innerHTML = html; window.scrollTo(0, 0); }

/* =========================================================
   PANTALLA A · Bienvenida
   ========================================================= */
function screenWelcome() {
  const has = Game.state.startedAt;
  render(`<section class="screen welcome">
    <div class="bg">${landscape()}</div>
    <div class="welcome-grid">
      <div class="hero-card">
        <p class="eyebrow">U. E. Franciscana «San Andrés Quitumbe» · Proyecto ABP</p>
        <h1 class="title">Misión Lloa <em>El secreto de las aguas</em></h1>
        <p class="kichwa"><i>yaku kamachikkuna</i> · guardianes del agua en los Andes</p>
        <div class="weave" aria-hidden="true"></div>
        <p class="lead">Valle Verde cultiva la oca en las faldas del Pichincha, pero sus depósitos ya no alcanzan. Sigue el río, supera siete desafíos y la estación de inglés, y descubre el secreto de las aguas.</p>
        <div class="actions">
          ${has ? `<button class="btn primary lg" data-act="continue">${icon('next')}<span>Continuar aventura</span></button><button class="btn sand" data-act="newgame"><span>Nueva partida</span></button>`
                : `<button class="btn primary lg" data-act="start">${icon('next')}<span>Comenzar aventura</span></button>`}
        </div>
        <div class="hero-foot">
          <label class="switch"><input type="checkbox" id="amb-toggle" ${Sound.ambientOn ? 'checked' : ''}><span class="track"><span></span></span>${icon('music')} Música ambiental</label>
          <div class="medallions" role="img" aria-label="Personajes de Valle Verde">${['narrador', 'manuel', 'rosa', 'mateo', 'nami', 'visitante'].map(id => `<span class="medal" title="${CHARACTERS[id].name}">${avatar(id)}</span>`).join('')}</div>
        </div>
      </div>
      <div class="hero-yaku">
        <div class="yaku-bubble"><p class="said" id="w-text" aria-hidden="true"></p><p class="sr-only" aria-live="polite"></p></div>
        ${charHTML('yaku', 'enter')}
      </div>
    </div>
  </section>`);
  $('#amb-toggle').addEventListener('change', e => { if (e.target.checked !== Sound.ambientOn) Sound.toggleAmbient(); });
  setTimeout(() => speak($('#w-text'), '¡Hola, visitante! Soy Yaku, el espíritu del agua. Los depósitos de Valle Verde ya no alcanzan para las familias ni para la oca. ¿Me acompañas río abajo?', 'yaku'), 500);
}

/* =========================================================
   PANTALLA B · Personajes
   ========================================================= */
function screenCharacters(back) {
  const ids = Object.keys(CHARACTERS);
  render(`<section class="screen characters">
    <div class="bg">${landscape()}</div>
    <div class="wrap">
      <div class="pane-title"><p class="tag">Los habitantes de Valle Verde</p><h2 class="h2">Conoce a los personajes</h2><p class="sub">Toca a un personaje para volver a escucharlo.</p></div>
      <div class="cast-grid">${ids.map((id, i) => {
        const c = CHARACTERS[id];
        return `<button class="char-card" data-say="${id}" style="--i:${i};--c:${c.color}" aria-label="Escuchar a ${c.name}">
          <div class="cc-stage">${charHTML(id, 'enter')}</div>
          <div class="cc-info"><h3>${c.name}</h3><p class="role">${c.role}</p><p class="cc-line" aria-hidden="true">${c.desc}</p><p class="sr-only" aria-live="polite"></p></div>
        </button>`;
      }).join('')}</div>
      <div class="actions center"><button class="btn primary lg" data-act="${back ? 'map' : 'story'}">${icon('next')}<span>${back ? 'Volver al mapa' : 'Escuchar la historia'}</span></button></div>
    </div>
  </section>`);
  let i = 0;
  const next = () => { if (i < ids.length && $('.characters')) sayCard(ids[i++], next); };
  setTimeout(next, 600);
}

function sayCard(id, done) {
  const card = $(`.char-card[data-say="${id}"]`); if (!card) return;
  $$('.char-card.speaking').forEach(c => c.classList.remove('speaking'));
  card.classList.add('speaking');
  speak($('.cc-line', card), CHARACTERS[id].hello, id, () => { card.classList.remove('speaking'); if (done) setTimeout(done, 300); });
}

/* =========================================================
   PANTALLA C · Diálogos de historia (intro y desenlace)
   ========================================================= */
function screenDialogue(lines, onDone, label) {
  const cast = [...new Set(lines.map(l => l[0]))];
  render(`<section class="screen story">
    <div class="bg">${landscape()}</div>
    <p class="story-label">${label}</p>
    <div class="stage">${cast.map(id => `<div class="actor" data-actor="${id}">${charHTML(id, 'enter')}<span class="actor-name">${CHARACTERS[id].name}</span></div>`).join('')}</div>
    <div class="dlg">
      <p class="dlg-tab" id="dlg-name"></p>
      <p class="dlg-text" id="dlg-text" aria-hidden="true"></p><p class="sr-only" aria-live="polite"></p>
      <div class="dlg-actions"><span class="dlg-count" id="dlg-count"></span><button class="btn sand sm" id="dlg-skip"><span>Saltar</span></button><button class="btn primary" id="dlg-next"><span>Siguiente</span>${icon('next')}</button></div>
    </div>
  </section>`);
  let i = 0;
  const t = $('#dlg-text');
  const show = () => {
    const [id, text, sfx] = lines[i], c = CHARACTERS[id];
    const tab = $('#dlg-name');
    tab.innerHTML = `${c.name} <small>${c.role}</small>`; tab.style.setProperty('--c', c.color);
    $('#dlg-count').textContent = `${i + 1} / ${lines.length}`;
    $$('.actor').forEach(a => a.classList.toggle('on', a.dataset.actor === id));
    $('#dlg-next span').textContent = i === lines.length - 1 ? 'Continuar' : 'Siguiente';
    Sound.play(sfx);
    speak(t, text, id);
  };
  $('#dlg-next').addEventListener('click', () => {
    if (t._finish) return t._finish();
    Sound.play('click'); if (++i >= lines.length) onDone(); else show();
  });
  $('#dlg-skip').addEventListener('click', onDone);
  show();
  $('#dlg-next').focus();
}

/* =========================================================
   PANTALLA D · Mapa de misiones
   ========================================================= */
function screenMap(sel) {
  const done = Game.state.completed.length, N = MISSIONS.length;
  const cur = sel ?? Math.min(done, N - 1);
  render(`${hud()}<section class="screen map">
    <div class="map-layout">
      <div class="map-wrap">
        ${mapSVG(done)}
        <div class="map-title"><small>Mapa del agua</small><b>Valle Verde · Lloa</b></div>
        ${MISSIONS.map((m, i) => {
          const st = Game.status(m.id), [x, y] = MAP_PTS[i];
          return `<button class="node is-${st}" data-node="${i}" style="left:${x / 10}%;top:${y / 13}%" aria-label="${mLabel(m)}: ${m.title}. ${st === 'done' ? 'Completado' : st === 'open' ? 'Disponible' : 'Bloqueado'}">
            <span class="node-dot">${st === 'locked' ? icon('lock') : icon(m.icon)}</span><span class="node-n">${m.id === 8 ? 'EN' : m.id}</span>${st === 'done' ? `<span class="node-ok">${icon('check')}</span>` : ''}</button>`;
        }).join('')}
      </div>
      <aside class="route">
        <div class="route-card" id="route-card" aria-live="polite"></div>
        <ol class="route-list">${MISSIONS.map((m, i) => {
          const st = Game.status(m.id);
          return `<li><button class="rl is-${st}" data-node="${i}"><span class="rl-dot">${st === 'done' ? icon('check') : st === 'locked' ? icon('lock') : icon(m.icon)}</span>
            <span class="rl-t"><small>${mLabel(m)}</small>${m.title}</span>${st === 'done' ? `<b>${Game.state.scores[m.id]}</b>` : ''}</button></li>`;
        }).join('')}</ol>
        ${done === N ? `<button class="btn primary lg" data-act="ending">${icon('next')}<span>Ver el desenlace</span></button>` : ''}
      </aside>
    </div>
  </section>`);
  showRoute(cur);
}

function showRoute(i, scroll) {
  const m = MISSIONS[i], st = Game.status(m.id), c = CHARACTERS[m.char];
  $$('[data-node]').forEach(b => b.classList.toggle('sel', +b.dataset.node === i));
  const card = $('#route-card');
  card.innerHTML = `<div class="rc-top"><div class="rc-char">${charHTML(m.char, 'enter')}</div>
      <div><p class="eyebrow">${mLabel(m)} · ${c.name}</p><h2>${m.title}</h2></div></div>
    <p class="rc-goal">${m.goal}</p>
    <p class="rc-status is-${st}">${st === 'done' ? `${icon('check')} Completado · ${Game.state.scores[m.id]} puntos` : st === 'open' ? `${icon('drop')} ${m.steps.length} actividades te esperan` : `${icon('lock')} El agua todavía no llega hasta aquí.`}</p>
    ${st === 'open' ? `<button class="btn primary lg" data-act="enter" data-id="${m.id}">${icon('next')}<span>Entrar</span></button>` : ''}`;
  if (scroll && innerWidth < 900) card.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
}

/* =========================================================
   PANTALLA E · Desafío
   ========================================================= */
let ctx = null;

function screenMission(id) {
  const m = MISSIONS.find(x => x.id === id);
  if (Game.status(id) !== 'open') return;
  ctx = { m, step: 0, decision: null };
  render(`${hud()}<section class="screen mission">
    <div class="m-top">
      <button class="btn ghost sm" data-act="map">${icon('back')} Mapa</button>
      <div class="m-title"><p class="eyebrow">${m.label || `Desafío ${m.id} de 7`} · ${CHARACTERS[m.char].name}</p><h2>${m.title}</h2></div>
      <ol class="dots" aria-label="Actividades">${m.steps.map(() => '<li></li>').join('')}</ol>
    </div>
    <div class="m-grid">
      <aside class="m-scene">
        <div class="bg">${landscape()}</div>
        <div class="speaker" id="spk"></div>
        <div class="bubble" id="bubble"><p class="who" id="spk-name"></p><p class="said" id="spk-text" aria-hidden="true"></p><p class="sr-only" aria-live="polite"></p><div id="bubble-act"></div></div>
      </aside>
      <div class="m-panel" id="panel"><div class="panel-wait">${icon('drop')}<p>Escucha a ${CHARACTERS[m.char].name}…</p></div></div>
    </div>
  </section>`);
  playLines(m.intro, () => runStep(0));
}

function say(id, text, next) {
  const c = CHARACTERS[id], spk = $('#spk');
  if (spk.dataset.id !== id) { spk.dataset.id = id; spk.innerHTML = charHTML(id, 'enter'); }
  $('#spk-name').innerHTML = `${c.name} <small>${c.role}</small>`;
  $('#bubble').style.setProperty('--c', c.color);
  const t = $('#spk-text');
  speak(t, text, id);
  const act = $('#bubble-act');
  act.innerHTML = next ? `<button class="btn primary sm" id="bubble-next"><span>Siguiente</span>${icon('next')}</button>` : '';
  if (next) {
    const b = $('#bubble-next');
    b.addEventListener('click', () => { if (t._finish) return t._finish(); Sound.play('click'); act.innerHTML = ''; next(); });
    b.focus({ preventScroll: true });
  }
}

function playLines(lines, done) {
  let i = 0;
  const step = () => { const [id, text, sfx] = lines[i]; Sound.play(sfx); say(id, text, () => (++i < lines.length ? step() : done())); };
  step();
}

function updateDots() { $$('.dots li').forEach((li, i) => { li.className = i < ctx.step ? 'done' : i === ctx.step ? 'now' : ''; }); }

function runStep(i) {
  const m = ctx.m, s = m.steps[i], T = STEPS[s.type];
  ctx.step = i; updateDots();
  let tries = 0;
  const panel = $('#panel');
  panel.innerHTML = `<div class="step">
    <header class="step-head">
      <p class="kicker">Actividad ${i + 1} de ${m.steps.length}${s.lang === 'en' ? ` <span class="tag-en">${icon('radio')} English</span>` : ''}</p>
      <h3>${s.title}</h3>${s.prompt ? `<p class="prompt">${s.prompt}</p>` : ''}
    </header>
    <div class="step-body"${s.lang ? ` lang="${s.lang}"` : ''}>${T.html(s, m)}</div>
    <footer class="step-foot"><p class="fb" role="status" aria-live="polite"></p>
      ${T.auto ? '' : `<button class="btn primary" data-step="check">${s.type === 'decision' ? 'Presentar mi decisión' : s.type === 'pledge' ? 'Firmar compromiso' : 'Comprobar'}</button>`}
      <button class="btn primary" data-step="next" hidden>${i + 1 < m.steps.length ? 'Continuar' : 'Terminar desafío'} ${icon('next')}</button>
    </footer>
  </div>`;
  const body = $('.step-body', panel), fb = $('.fb', panel), stepEl = $('.step', panel);
  const feedback = (msg, tone) => { fb.textContent = msg || ''; fb.className = 'fb ' + (tone || ''); };
  const api = {
    say: (text, who = m.char) => say(who, text),
    changed: () => feedback(''),
    check: () => doCheck(),
    done: (msg) => finish(msg),
    fail: (msg) => fail({ msg })
  };
  function doCheck() {
    const r = T.check(body, s, api);
    if (r.ok) return finish(r.msg, r.quiet);
    if (r.incomplete) { feedback(r.msg, 'warn'); return; }
    fail(r);
  }
  function fail(r) {
    tries++;
    if (!r.noPenalty) Game.addError(m.id);
    Sound.play('error');
    feedback(r.msg || 'Revisa tu respuesta e inténtalo de nuevo.', 'bad');
    if (!r.quiet) say(m.char, s.hint ? `Pista: ${s.hint}` : pick(TRY_AGAIN));
    if (!reduceMotion) stepEl.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(5px)' }, { transform: 'translateX(0)' }], { duration: 260, easing: 'ease-out' });
  }
  function finish(msg, quiet) {
    body.classList.add('locked');
    Sound.play('success');
    feedback(msg || pick(PRAISE), 'good');
    if (!quiet) say(m.char, pick(PRAISE_CHAR));
    if (s.grant && Game.addEvidence(s.grant)) toast(`Nueva evidencia: ${EVIDENCE[s.grant].name}`);
    const c = $('[data-step="check"]', panel); if (c) c.hidden = true;
    const n = $('[data-step="next"]', panel); n.hidden = false; n.focus({ preventScroll: true });
    refreshHud();
  }
  $('[data-step="check"]', panel)?.addEventListener('click', doCheck);
  $('[data-step="next"]', panel).addEventListener('click', () => { Sound.play('click'); i + 1 < m.steps.length ? runStep(i + 1) : completeMission(); });
  T.mount?.(body, s, api);
  if (i > 0 && innerWidth < 900) panel.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
}

function completeMission() {
  const m = ctx.m;
  ctx.step = m.steps.length; updateDots();
  const score = m.id === 6 ? Math.max(60, ctx.decision.score - 5 * (Game.state.errors[6] || 0)) : Game.missionScore(m.id);
  const fresh = m.evidence.filter(e => Game.addEvidence(e));
  Game.complete(m.id, score);
  refreshHud();
  let lines = m.success;
  if (m.id === 6) {
    const p = m.proposals.find(x => x.id === ctx.decision.proposal);
    lines = [['visitante', `«${ctx.decision.text.trim().slice(0, 260)}»`], ...m.success, p.reaction];
  }
  $('#panel').innerHTML = `<div class="panel-wait done">${icon('check')}<p>¡Desafío superado!</p></div>`;
  playLines(lines, () => showReward(m, score, fresh));
}

function showReward(m, score, fresh) {
  Sound.play('unlock');
  const last = m.id === 7;
  const el = document.createElement('div');
  el.className = 'reward';
  el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', 'Desafío completado');
  el.innerHTML = `<div class="reward-card">
    <div class="splash" aria-hidden="true">${Array.from({ length: 10 }, (_, i) => `<i style="--a:${i * 36}deg;--d:${60 + (i % 3) * 18}px"></i>`).join('')}${icon('check')}</div>
    <p class="eyebrow">${mLabel(m)} completado</p>
    <h2>${m.title}</h2>
    <p class="pts">+${score} <small>puntos</small></p>
    ${fresh.length ? `<p class="small-title">Evidencia${fresh.length > 1 ? 's' : ''} obtenida${fresh.length > 1 ? 's' : ''}</p>${fresh.map(evCard).join('')}` : ''}
    <button class="btn primary lg" data-act="${last ? 'ending' : 'map'}"><span>${last ? 'Ver el desenlace' : 'Volver al mapa'}</span>${icon('next')}</button>
  </div>`;
  document.body.appendChild(el);
  el.querySelector('button').focus();
}

/* ---------- Tarjeta de evidencia ---------- */
function evCard(id) {
  const e = EVIDENCE[id];
  return `<article class="ev">
    <div class="ev-top"><span class="ev-ic">${icon('key')}</span><div><h4>${e.name}</h4><p class="ev-desc">${e.desc}</p></div><span class="ev-m">${e.mission === 8 ? 'Inglés' : 'Desafío ' + e.mission}</span></div>
    <p class="ev-info">${e.info}</p>
    <p class="ev-src">Fuente: ${e.source}</p>
  </article>`;
}

/* =========================================================
   MECÁNICAS DE LAS ACTIVIDADES
   ========================================================= */
const tableHTML = t => `<div class="table-wrap"><table><thead><tr>${t.head.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${t.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

function flip(el, mutate) {
  const a = el.getBoundingClientRect();
  el.style.transform = '';
  mutate();
  const b = el.getBoundingClientRect();
  const dx = a.left - b.left, dy = a.top - b.top;
  if (reduceMotion || (!dx && !dy)) return;
  el.animate([{ transform: `translate(${dx}px,${dy}px)` }, { transform: 'none' }], { duration: 260, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' });
}

function tankSVG() {
  const k = ++uid;
  return `<figure class="tank"><svg viewBox="0 0 210 230" role="img" aria-label="Depósito comunitario frente a la demanda de 15 unidades">
    <defs><clipPath id="tc${k}"><rect x="18" y="22" width="100" height="180" rx="14"/></clipPath></defs>
    <rect x="18" y="22" width="100" height="180" rx="14" fill="#FFFDF7"/>
    <g clip-path="url(#tc${k})"><rect class="tank-water" x="18" y="22" width="100" height="180" fill="#79B8C5"/></g>
    <rect x="18" y="22" width="100" height="180" rx="14" fill="none" stroke="#896B4B" stroke-width="4"/>
    <line x1="8" x2="128" y1="22" y2="22" stroke="#B23A48" stroke-width="2.5" stroke-dasharray="5 4"/>
    <text x="134" y="26" class="tk-l red">15 u · 100 %</text>
    <g class="tank-marks">
      <line x1="10" x2="126" y1="82" y2="82" stroke="#315B43" stroke-width="2"/><text x="134" y="86" class="tk-l">10 u · 66,7 %</text>
      <line x1="10" x2="126" y1="118" y2="118" stroke="#896B4B" stroke-width="2"/><text x="134" y="122" class="tk-l">7 u · 46,7 %</text>
    </g>
    <text x="68" y="140" text-anchor="middle" class="tk-q">?</text>
  </svg><figcaption>Demanda: <b>15 u</b> · Inicial: <b>10 u</b> · Sequía: <b>7 u</b></figcaption></figure>`;
}

const STEPS = {
  /* ---- Explorar la escena ---- */
  hotspots: {
    auto: true,
    html: s => `<div class="hs-scene">${landscape({ fit: 'meet' })}${s.spots.map((p, i) => `<button class="hs" data-i="${i}" style="left:${p.x}%;top:${p.y}%" aria-label="Pista: ${p.label}"><span></span></button>`).join('')}</div>
      <p class="hs-count"><b>0</b> de ${s.spots.length} pistas encontradas</p><ol class="hs-list"></ol>`,
    mount(root, s, api) {
      const found = new Set();
      root.addEventListener('click', e => {
        const b = e.target.closest('.hs'); if (!b || root.classList.contains('locked')) return;
        const i = +b.dataset.i, p = s.spots[i];
        api.say(p.text);
        if (found.has(i)) return;
        found.add(i); b.classList.add('found'); Sound.play('drip');
        $('.hs-list', root).insertAdjacentHTML('beforeend', `<li><b>${p.label}:</b> ${p.text}</li>`);
        $('.hs-count b', root).textContent = found.size;
        if (found.size === s.spots.length) setTimeout(() => api.done('¡Encontraste todas las pistas!'), 500);
      });
    }
  },

  /* ---- Preguntas de opción ---- */
  quiz: {
    html: s => `${s.sources ? `<div class="sources">${s.sources.map(([t, q]) => `<blockquote><cite>${t}</cite><p>${q}</p></blockquote>`).join('')}</div>` : ''}
      ${s.questions.map((q, qi) => `<fieldset class="q"><legend>${q.q}</legend>${q.options.map((o, oi) => `<label class="opt"><input type="radio" name="q${qi}" value="${oi}"><span class="opt-l">${'ABCD'[oi]}</span><span class="opt-t">${o}</span></label>`).join('')}</fieldset>`).join('')}`,
    mount(root, s, api) { root.addEventListener('change', () => { api.changed(); $$('.opt', root).forEach(o => o.classList.remove('right', 'wrong')); }); },
    check(root, s) {
      const sel = s.questions.map((q, qi) => $(`input[name="q${qi}"]:checked`, root));
      if (sel.some(x => !x)) return { incomplete: true, msg: s.questions.length > 1 ? 'Responde todas las preguntas.' : 'Elige una respuesta.' };
      let bad = 0;
      sel.forEach((inp, qi) => { const ok = +inp.value === s.questions[qi].answer; inp.closest('.opt').classList.add(ok ? 'right' : 'wrong'); if (!ok) bad++; });
      return bad ? { ok: false, msg: s.questions.length > 1 ? `${bad} respuesta(s) incorrecta(s). Inténtalo de nuevo.` : 'Esa no es la respuesta. Inténtalo de nuevo.' } : { ok: true };
    }
  },

  /* ---- Cálculos ---- */
  numbers: {
    html: s => `${s.table ? tableHTML(s.table) : ''}${s.formula ? `<p class="formula">${icon('calc')}<span>${s.formula}</span></p>` : ''}
      <div class="num-layout${s.tank ? ' with-tank' : ''}">${s.tank ? tankSVG() : ''}<div class="nums">
      ${s.fields.map((f, i) => `<label class="num"><span class="num-label">${f.label}</span><span class="num-in"><input type="text" inputmode="decimal" autocomplete="off" spellcheck="false" data-i="${i}"><em>${f.unit}</em></span></label>`).join('')}
      ${s.sum ? `<p class="sum">Total repartido: <b>0</b> de ${s.sum} u</p>` : ''}</div></div>`,
    mount(root, s, api) {
      root.addEventListener('input', e => {
        api.changed(); e.target.closest('.num')?.classList.remove('right', 'wrong');
        if (s.sum) {
          const t = $$('input', root).reduce((a, x) => a + (Game.parseNum(x.value) || 0), 0);
          const el = $('.sum', root); $('b', el).textContent = fmt(Math.round(t * 100) / 100);
          el.classList.toggle('ok', Math.abs(t - s.sum) <= 0.02);
        }
      });
      root.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.tagName === 'INPUT') { e.preventDefault(); if (!root.classList.contains('locked')) api.check(); } });
    },
    check(root, s) {
      const ins = $$('input', root);
      if (ins.some(x => Game.parseNum(x.value) === null)) return { incomplete: true, msg: 'Escribe un número en cada casilla (puedes usar coma decimal).' };
      let bad = 0;
      ins.forEach((x, i) => { const ok = Game.checkNum(x.value, s.fields[i]); x.closest('.num').classList.toggle('right', ok); x.closest('.num').classList.toggle('wrong', !ok); if (!ok) bad++; });
      if (bad) return { ok: false, msg: `${bad} resultado(s) por revisar.` };
      if (s.tank) {
        const w = $('.tank-water', root), tank = $('.tank', root);
        tank.classList.add('revealed');
        w.style.transform = 'scaleY(.667)';
        setTimeout(() => { w.style.transform = 'scaleY(.467)'; }, reduceMotion ? 0 : 1100);
      }
      return { ok: true };
    }
  },

  /* ---- Arrastrar y soltar (o tocar y colocar) ---- */
  place: {
    html: s => `${s.clues ? `<ul class="clues">${s.clues.map(c => `<li>${icon('key')}<span>${c}</span></li>`).join('')}</ul>` : ''}
      <div class="place mode-${s.mode}">
        <div class="pool zone" data-zone="pool" tabindex="0" role="button" aria-label="Bandeja de elementos">
          <p class="pool-hint">Arrastra cada tarjeta, o tócala y luego toca su lugar.</p>
          ${shuffle(s.items.map((_, i) => i)).map(i => `<button type="button" class="chip" data-item="${i}">${s.items[i].text}</button>`).join('')}
        </div>
        <div class="zones">${s.zones.map((z, zi) => `<div class="zone${z.tone ? ' tone-' + z.tone : ''}" data-zone="${zi}" tabindex="0" role="button" aria-label="Colocar en: ${z.label}">
          <div class="zone-head"><b>${z.label}</b>${z.sub ? `<small>${z.sub}</small>` : ''}</div><div class="zone-slot"></div></div>`).join('')}</div>
      </div>`,
    mount(root, s, api) {
      const cap = s.mode === 'classify' ? Infinity : 1;
      const pool = $('.pool', root);
      let selected = null, drag = null, suppress = false;
      const select = chip => {
        selected?.classList.remove('selected');
        selected = chip && chip !== selected ? chip : null;
        selected?.classList.add('selected');
        root.classList.toggle('picking', !!selected);
      };
      const place = (chip, zone) => {
        const slot = zone === pool ? pool : $('.zone-slot', zone);
        if (cap === 1 && zone !== pool) { const occ = $('.chip', slot); if (occ && occ !== chip) flip(occ, () => pool.appendChild(occ)); }
        flip(chip, () => slot.appendChild(chip));
        chip.classList.remove('wrong', 'right');
        Sound.play('click'); api.changed();
      };
      const zoneAt = (x, y, chip) => document.elementsFromPoint(x, y).filter(el => !chip.contains(el)).map(el => el.closest('.zone')).find(z => z && root.contains(z)) || null;

      root.addEventListener('click', e => {
        if (suppress || root.classList.contains('locked')) return;
        const chip = e.target.closest('.chip');
        if (chip) { select(chip); return; }
        const zone = e.target.closest('.zone');
        if (zone && selected) { const c = selected; select(null); place(c, zone); }
      });
      root.addEventListener('keydown', e => {
        if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('zone') && selected) { e.preventDefault(); const c = selected; select(null); place(c, e.target); }
      });
      root.addEventListener('pointerdown', e => {
        const chip = e.target.closest('.chip');
        if (!chip || drag || e.button > 0 || root.classList.contains('locked')) return;
        drag = { chip, id: e.pointerId, x0: e.clientX, y0: e.clientY, cx: e.clientX, cy: e.clientY, sx: scrollX, sy: scrollY, moved: false, over: null };
        chip.setPointerCapture(e.pointerId);
      });
      const track = () => {
        // seguimiento 1:1 con el dedo, compensando el desplazamiento de la página
        const dx = drag.cx - drag.x0 + scrollX - drag.sx, dy = drag.cy - drag.y0 + scrollY - drag.sy;
        drag.chip.style.transform = `translate(${dx}px,${dy}px)`;
        const z = zoneAt(drag.cx, drag.cy, drag.chip);
        if (z !== drag.over) { drag.over?.classList.remove('over'); z?.classList.add('over'); drag.over = z; }
      };
      const autoScroll = () => {
        if (!drag?.moved) return;
        const top = 120, bottom = innerHeight - 80; // 120: deja libre la barra superior
        const v = drag.cy > bottom ? Math.min(16, (drag.cy - bottom) / 4) : drag.cy < top ? -Math.min(16, (top - drag.cy) / 4) : 0;
        if (v) { scrollBy(0, v); track(); }
        requestAnimationFrame(autoScroll);
      };
      root.addEventListener('pointermove', e => {
        if (!drag || e.pointerId !== drag.id) return;
        drag.cx = e.clientX; drag.cy = e.clientY;
        if (!drag.moved) {
          if (Math.hypot(drag.cx - drag.x0, drag.cy - drag.y0) < 6) return;
          drag.moved = true; drag.chip.classList.add('dragging'); select(null); requestAnimationFrame(autoScroll);
        }
        track();
      });
      const end = e => {
        if (!drag || e.pointerId !== drag.id) return;
        const { chip, moved, over } = drag; drag = null;
        over?.classList.remove('over');
        if (!moved) return;
        suppress = true; setTimeout(() => { suppress = false; }, 60);
        chip.classList.remove('dragging');
        if (over && e.type === 'pointerup') place(chip, over); else flip(chip, () => {});
      };
      root.addEventListener('pointerup', end);
      root.addEventListener('pointercancel', end);
    },
    check(root, s) {
      const chips = $$('.chip', root);
      if (chips.some(c => c.parentElement.classList.contains('pool'))) return { incomplete: true, msg: 'Todavía quedan tarjetas por ubicar.' };
      let bad = 0;
      chips.forEach(c => { const ok = +c.closest('.zone').dataset.zone === s.items[+c.dataset.item].zone; c.classList.toggle('right', ok); c.classList.toggle('wrong', !ok); if (!ok) bad++; });
      return bad ? { ok: false, msg: `${bad} tarjeta(s) no están en su lugar. Muévelas y vuelve a comprobar.` } : { ok: true };
    }
  },

  /* ---- Decisión final ---- */
  decision: {
    html: (s, m) => {
      const evs = Game.state.evidence.filter(id => EVIDENCE[id].mission < 7);
      return `<div class="keydata">${[['Demanda', '15 u'], ['Inicial', '10 u'], ['Sequía', '7 u'], ['Llenado en sequía', '46,7 %'], ['Falta', '8 u']].map(([a, b]) => `<span><small>${a}</small><b>${b}</b></span>`).join('')}</div>
      <section class="dec"><h4><span>1</span> Compara las alternativas y elige una</h4>
        <div class="props">${m.proposals.map(p => `<label class="prop"><input type="radio" name="prop" value="${p.id}"><span class="prop-n">${p.name}</span>
          <span class="prop-tags">${p.covers.length ? p.covers.map(c => `<i>${icon('check')}${c}</i>`).join('') : '<i class="no">No atiende el problema</i>'}</span></label>`).join('')}</div></section>
      <section class="dec"><h4><span>2</span> Elige tus evidencias <small>(mínimo 2)</small></h4>
        <div class="ev-pick">${evs.map(id => `<label class="evp"><input type="checkbox" value="${id}"><span class="evp-box">${icon('check')}</span><span class="evp-t"><b>${EVIDENCE[id].name}</b><small>Desafío ${EVIDENCE[id].mission}</small><span>${EVIDENCE[id].info}</span></span></label>`).join('')}</div></section>
      <section class="dec"><h4><span>3</span> Justifica tu decisión</h4>
        <textarea id="just" rows="5" maxlength="700" placeholder="Elijo esta propuesta porque… (usa datos y cálculos de tus evidencias)"></textarea>
        <p class="counter"><span id="jc">0</span> caracteres · mínimo 40</p>
        <details class="rubric"><summary>¿Cómo se evalúa tu decisión?</summary><ul>
          <li><b>Propuesta (60 pts):</b> ¿atiende el almacenamiento y la distribución del agua?</li>
          <li><b>Evidencias (45 pts):</b> 15 pts por cada evidencia pertinente (máx. 3); −5 por cada una que no apoya tu propuesta.</li>
          <li><b>Justificación (45 pts):</b> extensión suficiente y argumentos sobre capacidad, datos, déficit, distribución, familias y sostenibilidad.</li>
          <li>Necesitas una propuesta que ayude, 2 evidencias pertinentes y 90 pts o más.</li></ul></details></section>
      <div id="dec-result"></div>`;
    },
    mount(root, s, api) {
      root.addEventListener('input', e => { if (e.target.id === 'just') $('#jc', root).textContent = e.target.value.trim().length; api.changed(); });
    },
    check(root, s, api) {
      const m = ctx.m;
      const pid = $('input[name="prop"]:checked', root)?.value;
      const evs = $$('.ev-pick input:checked', root).map(x => x.value);
      const text = $('#just', root).value;
      if (!pid) return { incomplete: true, msg: 'Elige una propuesta.' };
      if (evs.length < 2) return { incomplete: true, msg: 'Selecciona al menos 2 evidencias.' };
      if (text.trim().length < 40) return { incomplete: true, msg: 'Escribe una justificación de al menos 40 caracteres.' };
      const p = m.proposals.find(x => x.id === pid);
      const r = Game.scoreDecision(p, evs, text);
      const bar = (label, v, max) => `<div class="rb"><span>${label}</span><div class="rb-bar"><i style="transform:scaleX(${v / max})"></i></div><b>${v}/${max}</b></div>`;
      const tips = [];
      if (p.quality < 2) tips.push('La propuesta elegida no resuelve el problema del almacenamiento: revisa la evidencia «Alternativas sostenibles».');
      else if (p.quality < 3) tips.push('Tu propuesta ayuda, pero atiende solo una parte del problema. ¿Qué otra alternativa podría completarla?');
      if (r.relevant.length < 2) tips.push('Usa al menos 2 evidencias que apoyen directamente tu propuesta.');
      if (r.irrelevant) tips.push(`${r.irrelevant} evidencia(s) no apoyan esta propuesta.`);
      const missing = JUSTIFY_KEYS.filter(k => !r.keys.includes(k)).map(k => k.label.toLowerCase());
      if (missing.length > 2) tips.push(`Fortalece tu justificación hablando de: ${missing.slice(0, 3).join(', ')}.`);
      $('#dec-result', root).innerHTML = `<div class="result ${r.pass ? 'pass' : 'fail'}">
        <p class="result-score"><b>${r.score}</b>/150 · ${r.pass ? 'Decisión bien fundamentada' : 'Tu decisión necesita más fundamento'}</p>
        ${bar('Propuesta', r.parts.propuesta, 60)}${bar('Evidencias', r.parts.evidencias, 45)}${bar('Justificación', r.parts.justificacion, 45)}
        ${tips.length ? `<ul class="tips">${tips.map(t => `<li>${t}</li>`).join('')}</ul>` : ''}</div>`;
      say(p.reaction[0], p.reaction[1]);
      if (!r.pass) return { ok: false, noPenalty: true, quiet: true, msg: 'Mejora tu propuesta, tus evidencias o tu justificación y vuelve a presentarla.' };
      ctx.decision = { proposal: pid, evidence: evs, text, score: r.score };
      Game.state.decision = ctx.decision; Game.save();
      root.querySelectorAll('input, textarea').forEach(x => { x.disabled = true; });
      return { ok: true, quiet: true, msg: `¡Decisión aprobada con ${r.score} de 150 puntos!` };
    }
  },

  /* ---- Compromiso ---- */
  pledge: {
    html: s => `<div class="pledge">${s.items.map(t => `<label class="evp pl"><input type="checkbox"><span class="evp-box">${icon('check')}</span><span class="evp-t"><b>${t}</b></span></label>`).join('')}
      <label class="name-in"><span>Tu nombre o el de tu equipo</span><input type="text" id="pname" maxlength="60" autocomplete="off" value=""></label></div>`,
    check(root) {
      const boxes = $$('input[type=checkbox]', root), name = $('#pname', root).value.trim();
      if (boxes.some(b => !b.checked)) return { incomplete: true, msg: 'Marca los tres compromisos.' };
      if (!name) return { incomplete: true, msg: 'Escribe tu nombre para firmar.' };
      Game.state.playerName = name; Game.save();
      return { ok: true, msg: `Compromiso firmado por ${name}.` };
    }
  }
};

/* =========================================================
   PANTALLAS H e I · Desenlace y resultados
   ========================================================= */
function screenEnding() {
  const d = Game.state.decision, name = Game.state.playerName || 'el visitante';
  const extra = [];
  if (d) {
    const p = MISSIONS.find(x => x.id === 6).proposals.find(x => x.id === d.proposal);
    extra.push(['narrador', p.quality === 3 ? `La comunidad adoptó la propuesta que defendió ${name}: «${p.name}».`
      : `La comunidad tomó la idea de ${name} («${p.name}») y la completó con las demás alternativas.`]);
  }
  const lines = STORY_ENDING.slice(0, 1).concat(extra, STORY_ENDING.slice(1));
  screenDialogue(lines, screenResults, 'Desenlace');
}

function screenResults() {
  const st = Game.state, total = Game.total(), max = Game.maxTotal(), pct = total / max;
  const rank = pct >= 0.9 ? 'Guardián legendario del agua' : pct >= 0.75 ? 'Guardián experto del agua' : 'Guardián aprendiz del agua';
  Sound.play('win');
  render(`${hud()}<section class="screen results">
    <div class="bg soft">${landscape()}</div>
    <div class="results-card">
      <p class="eyebrow">Misión Lloa · El secreto de las aguas</p>
      <h1 class="h1">¡Misión cumplida!</h1>
      <p class="rank">${icon('star')} ${rank}${st.playerName ? ` · <b>${st.playerName.replace(/[<>&]/g, '')}</b>` : ''}</p>
      <div class="stats">
        <div><small>Estaciones</small><b>${st.completed.length}/${MISSIONS.length}</b></div>
        <div><small>Puntuación</small><b>${total}<i>/${max}</i></b></div>
        <div><small>Evidencias</small><b>${st.evidence.length}/${Object.keys(EVIDENCE).length}</b></div>
        <div><small>Tiempo</small><b>${fmtTime(Game.elapsed())}</b></div>
      </div>
      <ol class="breakdown">${MISSIONS.map(m => `<li><span>${m.id}. ${m.title}</span><b>${st.scores[m.id] ?? 0}<i>/${m.maxScore || Game.BASE}</i></b></li>`).join('')}</ol>
      <blockquote class="final">${FINAL_MESSAGE}</blockquote>
      <p class="final-en" lang="en">Congratulations! You completed all the missions. You helped Lloa find solutions to its water storage problem. Save water, save lives!</p>
      <div class="actions center">
        <button class="btn ghost" data-act="evidence">${icon('bag')} Ver evidencias</button>
        <button class="btn ghost" data-act="map">${icon('map')} Ver mapa</button>
        <button class="btn primary" data-act="replay">${icon('reset')} Volver a jugar</button>
      </div>
    </div>
  </section>`);
}

/* =========================================================
   Ventanas: evidencias, menú y avisos
   ========================================================= */
function openSheet(title, inner) {
  const d = document.createElement('dialog');
  d.className = 'sheet';
  d.innerHTML = `<div class="sheet-head"><h2>${title}</h2><button class="hud-btn" data-close aria-label="Cerrar">${icon('close')}</button></div><div class="sheet-body">${inner}</div>`;
  document.body.appendChild(d);
  d.addEventListener('close', () => d.remove());
  d.addEventListener('click', e => { if (e.target === d || e.target.closest('[data-close]')) d.close(); });
  d.showModal();
  return d;
}

function openEvidence() {
  const ids = Object.keys(EVIDENCE);
  const got = Game.state.evidence;
  openSheet(`Evidencias <small>${got.length}/${ids.length}</small>`, `<p class="sheet-sub">Las evidencias te servirán para defender tu decisión en el Desafío 6.</p>
    <div class="ev-list">${ids.map(id => got.includes(id) ? evCard(id)
      : `<article class="ev locked"><div class="ev-top"><span class="ev-ic">${icon('lock')}</span><div><h4>Evidencia oculta</h4><p class="ev-desc">Se obtiene en ${EVIDENCE[id].mission === 8 ? 'la estación de inglés' : 'el Desafío ' + EVIDENCE[id].mission}.</p></div></div></article>`).join('')}</div>`);
}

function openMenu() {
  const st = Game.state;
  const tile = (m, ic, label, sub, tone) => `<button class="tile ${tone}" data-m="${m}">${icon(ic)}<span>${label}</span>${sub ? `<small>${sub}</small>` : ''}</button>`;
  const d = openSheet('Menú del guardián', `<div class="menu-hero">
      <div class="menu-yaku">${charHTML('yaku', 'enter')}</div>
      <div class="menu-stats">
        <span><small>Estaciones</small><b>${st.completed.length}/${MISSIONS.length}</b></span>
        <span><small>Puntos</small><b>${Game.total()}</b></span>
        <span><small>Evidencias</small><b>${st.evidence.length}/${Object.keys(EVIDENCE).length}</b></span>
        <span><small>Tiempo</small><b>${fmtTime(Game.elapsed())}</b></span>
      </div>
    </div>
    <div class="menu-grid">
      ${tile('resume', 'next', 'Seguir jugando', '', 't-green')}
      ${tile('map', 'map', 'Mapa', 'Misiones', 't-blue')}
      ${tile('chars', 'users', 'Personajes', 'Escúchalos', 't-pink')}
      ${tile('evidence', 'bag', 'Evidencias', `${st.evidence.length} reunidas`, 't-yellow')}
      ${tile('sound', Sound.on ? 'sound' : 'mute', 'Sonidos', Sound.on ? 'Activados' : 'Apagados', 't-teal')}
      ${tile('amb', 'music', 'Música', Sound.ambientOn ? 'Activada' : 'Apagada', 't-purple')}
      ${tile('reset', 'reset', 'Reiniciar', 'Borra el progreso', 't-red wide')}
    </div>`);
  d.classList.add('menu-sheet');
  d.addEventListener('click', e => {
    const b = e.target.closest('[data-m]'); if (!b) return;
    const a = b.dataset.m;
    Sound.play('click');
    if (a === 'amb') { Sound.toggleAmbient(); $('small', b).textContent = Sound.ambientOn ? 'Activada' : 'Apagada'; return; }
    if (a === 'sound') { Sound.toggle(); $('small', b).textContent = Sound.on ? 'Activados' : 'Apagados'; refreshHud(); return; }
    if (a === 'reset') {
      if (b.dataset.confirm) { d.close(); Game.reset(); screenWelcome(); return; }
      b.dataset.confirm = '1'; $('span', b).textContent = '¿Seguro?'; $('small', b).textContent = 'Toca otra vez para borrar todo'; return;
    }
    d.close();
    if (a === 'chars') screenCharacters(true);
    if (a === 'map') goMap();
    if (a === 'evidence') openEvidence();
  });
}

function toast(msg) {
  const t = document.createElement('div');
  t.className = 'toast'; t.setAttribute('role', 'status');
  t.innerHTML = `${icon('key')}<span>${msg}</span>`;
  document.body.appendChild(t);
  setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 300); }, 2600);
}

function refreshHud() {
  const h = $('.hud'); if (!h) return;
  const tmp = document.createElement('div'); tmp.innerHTML = hud();
  h.replaceWith(tmp.firstElementChild);
}

function goMap() { $$('.reward').forEach(r => r.remove()); if (Game.state.seenIntro) screenMap(); else screenCharacters(); }

/* ---------- Acciones globales ---------- */
document.addEventListener('click', e => {
  const b = e.target.closest('[data-act]');
  if (b) {
    const a = b.dataset.act;
    Sound.play('click');
    if (a === 'start' || a === 'newgame') {
      if (a === 'newgame') Game.reset();
      Sound.init(); Sound.startAmbient(); Game.start(); screenCharacters();
    }
    if (a === 'continue') { Sound.init(); Sound.startAmbient(); Game.state.completed.length === MISSIONS.length ? screenResults() : goMap(); }
    if (a === 'story') screenDialogue(STORY_INTRO, () => { Game.state.seenIntro = true; Game.save(); screenMap(); }, 'Introducción');
    if (a === 'map') goMap();
    if (a === 'enter') screenMission(+b.dataset.id);
    if (a === 'evidence') openEvidence();
    if (a === 'menu') openMenu();
    if (a === 'sound') { Sound.toggle(); refreshHud(); }
    if (a === 'ending') { $$('.reward').forEach(r => r.remove()); screenEnding(); }
    if (a === 'replay') { Game.reset(); screenWelcome(); }
    return;
  }
  const cc = e.target.closest('[data-say]');
  if (cc) { sayCard(cc.dataset.say); return; }
  const n = e.target.closest('[data-node]');
  if (n) {
    const i = +n.dataset.node, st = Game.status(MISSIONS[i].id);
    Sound.play(st === 'locked' ? 'error' : 'bell');
    showRoute(i, true);
  }
});

screenWelcome();
