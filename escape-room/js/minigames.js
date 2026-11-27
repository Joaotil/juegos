/* =========================================================
   minigames.js — Minijuegos: atrapa la lluvia, candado,
   canales, memoria, deslizar tarjetas y ordenar letras.
   Cada uno define html(step), mount(root, step, api) y,
   si tiene botón «Comprobar», check(root, step).
   ========================================================= */

const DROP_SVG = `<svg viewBox="0 0 40 52" aria-hidden="true"><path d="M20 3S5 22 5 33a15 15 0 0 0 30 0C35 22 20 3 20 3z" fill="#3FB6E0" stroke="#2B2130" stroke-width="3.5" stroke-linejoin="round"/><ellipse cx="14" cy="31" rx="3" ry="6" fill="#fff" opacity=".75"/></svg>`;
const TRASH_SVG = [
  `<svg viewBox="0 0 40 52" aria-hidden="true"><rect x="11" y="14" width="18" height="34" rx="5" fill="#9AD06B" stroke="#2B2130" stroke-width="3.5"/><rect x="15" y="5" width="10" height="10" rx="2" fill="#D6455E" stroke="#2B2130" stroke-width="3"/><path d="M15 26h10" stroke="#2B2130" stroke-width="3"/></svg>`,
  `<svg viewBox="0 0 40 52" aria-hidden="true"><path d="M8 14h24l-3 34H11z" fill="#B9B4C7" stroke="#2B2130" stroke-width="3.5" stroke-linejoin="round"/><path d="M5 14h30" stroke="#2B2130" stroke-width="4" stroke-linecap="round"/><path d="M16 22v18M24 22v18" stroke="#2B2130" stroke-width="2.5"/></svg>`
];

Object.assign(STEPS, {

  /* ---------- Atrapa la lluvia ---------- */
  catch: {
    auto: true,
    html: s => `<div class="catch" tabindex="0" aria-label="Minijuego: mueve el depósito con las flechas, el mouse o el dedo">
      <div class="catch-hud">
        <span class="ch">${icon('drop')} Atrapada <b class="c-total">0</b>/${s.demand} u</span>
        <span class="ch good">${icon('check')} Guardada <b class="c-stored">0</b> u</span>
        <span class="ch warn">Derramada <b class="c-lost">0</b> u</span>
      </div>
      <div class="bucket"><div class="bucket-body"><div class="bucket-water"></div><span class="bucket-lbl">0/${s.cap}</span></div></div>
      <div class="catch-start"><div class="catch-msg"><b>Depósito comunitario</b><span>Capacidad: ${s.cap} u · La comunidad necesita: ${s.demand} u</span></div><button class="btn primary lg" data-start>${icon('drop')}<span>¡Empezar!</span></button></div>
    </div>`,
    mount(root, s, api) {
      const box = $('.catch', root), bucket = $('.bucket', root);
      let x = .5, items = [], run = false, stored = 0, total = 0, lost = 0, lastT = 0, spawnIn = 0;
      const setX = v => { x = Math.min(.92, Math.max(.08, v)); bucket.style.left = x * 100 + '%'; };
      const fromEvent = e => { const r = box.getBoundingClientRect(); setX((e.clientX - r.left) / r.width); };
      box.addEventListener('pointerdown', e => { if (run) { box.setPointerCapture(e.pointerId); fromEvent(e); } });
      box.addEventListener('pointermove', e => { if (run && (e.pointerType === 'mouse' || e.buttons)) fromEvent(e); });
      box.addEventListener('keydown', e => {
        if (!run) return;
        if (e.key === 'ArrowLeft') { setX(x - .07); e.preventDefault(); }
        if (e.key === 'ArrowRight') { setX(x + .07); e.preventDefault(); }
      });
      const update = () => {
        $('.c-total', root).textContent = total; $('.c-stored', root).textContent = stored; $('.c-lost', root).textContent = lost;
        $('.bucket-water', root).style.transform = `scaleY(${stored / s.cap})`;
        bucket.classList.toggle('full', stored >= s.cap);
        $('.bucket-lbl', root).textContent = stored >= s.cap ? '¡LLENO!' : `${stored}/${s.cap}`;
      };
      const fx = (txt, cls) => {
        const f = document.createElement('span'); f.className = 'fx ' + cls; f.textContent = txt; f.style.left = x * 100 + '%';
        box.appendChild(f); setTimeout(() => f.remove(), 900);
      };
      const spawn = () => {
        const trash = Math.random() < .2, el = document.createElement('div');
        el.className = 'fall' + (trash ? ' trash' : ''); el.innerHTML = trash ? pick(TRASH_SVG) : DROP_SVG;
        box.appendChild(el);
        items.push({ el, trash, x: .07 + Math.random() * .86, y: -50, v: (150 + Math.random() * 90) * Math.max(.8, box.clientHeight / 420) });
      };
      const end = () => {
        run = false; items.forEach(i => i.el.remove()); items = [];
        const ov = $('.catch-start', root); ov.hidden = false;
        ov.innerHTML = `<div class="catch-msg"><b>¡Atrapaste ${total} u!</b><span>Pero el depósito solo guarda ${s.cap} u: se derramaron ${lost} u por falta de espacio.</span></div>`;
        api.done(`El depósito tiene capacidad para ${s.cap} u y la comunidad necesita ${s.demand} u: ¡no alcanza!`);
      };
      const loop = t => {
        if (!run || !box.isConnected) return;
        const dt = Math.min(.05, (t - (lastT || t)) / 1000); lastT = t;
        spawnIn -= dt; if (spawnIn <= 0) { spawn(); spawnIn = .5 + Math.random() * .4; }
        const W = box.clientWidth, H = box.clientHeight, catchY = H - bucket.offsetHeight - 6, half = bucket.offsetWidth / W / 2 + .03;
        items = items.filter(it => {
          it.y += it.v * dt;
          it.el.style.transform = `translate(${it.x * W - 17}px, ${it.y}px)`;
          if (it.y + 40 >= catchY && it.y <= catchY + 20 && Math.abs(it.x - x) < half) {
            it.el.remove();
            if (it.trash) { if (stored > 0) stored--; fx('¡Basura! −1 u', 'bad'); Sound.play('error'); }
            else { total++; if (stored < s.cap) { stored++; fx('+1 u', 'good'); Sound.pop(); } else { lost++; fx('¡Se derrama!', 'warn'); Sound.play('drip'); } }
            bucket.classList.remove('bump'); void bucket.offsetWidth; bucket.classList.add('bump');
            update(); return false;
          }
          if (it.y > H) { it.el.remove(); return false; }
          return true;
        });
        if (total >= s.demand) return end();
        requestAnimationFrame(loop);
      };
      $('[data-start]', root).addEventListener('click', () => {
        $('.catch-start', root).hidden = true; run = true; lastT = 0;
        box.focus({ preventScroll: true }); requestAnimationFrame(loop);
      });
      setX(.5);
    }
  },

  /* ---------- Candado de combinación ---------- */
  lock: {
    html: s => `<div class="lock-wrap">
      <div class="padlock"><div class="shackle"></div><div class="lock-body">
        ${s.dials.map((d, di) => `<div class="dial" data-di="${di}"><span class="dial-n">${di + 1}</span><div class="wheels">${Array.from({ length: d.digits }, (_, wi) => `
          <div class="wheel"><button type="button" class="w-up" aria-label="Subir dígito">▲</button><span class="digit" data-v="0">0</span><button type="button" class="w-down" aria-label="Bajar dígito">▼</button></div>`).join('')}</div></div>`).join('')}
      </div></div>
      <ol class="lock-legend">${s.dials.map(d => `<li>${d.label}</li>`).join('')}</ol>
    </div>`,
    mount(root, s, api) {
      root.addEventListener('click', e => {
        const b = e.target.closest('.w-up, .w-down'); if (!b || root.classList.contains('locked')) return;
        const d = $('.digit', b.closest('.wheel')), up = b.classList.contains('w-up');
        const v = (+d.dataset.v + (up ? 1 : 9)) % 10;
        d.dataset.v = v; d.textContent = v;
        if (!reduceMotion) d.animate([{ transform: `translateY(${up ? 12 : -12}px)`, opacity: .2 }, { transform: 'none', opacity: 1 }], { duration: 160, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' });
        b.closest('.dial').classList.remove('right', 'wrong');
        Sound.play('click'); api.changed();
      });
    },
    check(root, s) {
      let bad = 0;
      $$('.dial', root).forEach((el, di) => {
        const v = +$$('.digit', el).map(d => d.dataset.v).join('');
        const ok = v === s.dials[di].answer;
        el.classList.toggle('right', ok); el.classList.toggle('wrong', !ok); if (!ok) bad++;
      });
      if (bad) return { ok: false, msg: `El candado no abre: ${bad} número(s) de la clave no son correctos.` };
      $('.padlock', root).classList.add('open');
      return { ok: true, msg: '¡Clic! El candado se abrió.' };
    }
  },

  /* ---------- Conecta los canales ---------- */
  pipes: {
    auto: true,
    // N=1, E=2, S=4, W=8. El agua entra por la izquierda de la fila central y sale por la derecha de cada fila.
    SOL: [[3, 6, 10, 10, 10], [10, 15, 10, 10, 10], [6, 3, 10, 10, 10]],
    html: s => {
      const P = STEPS.pipes, rot = m => ((m << 1) | (m >> 3)) & 15;
      const dirs = [[1, 'M50 50V-4'], [2, 'M50 50H104'], [4, 'M50 50V104'], [8, 'M50 50H-4']];
      const tiles = [];
      let solved = true;
      while (solved) {
        tiles.length = 0;
        P.SOL.forEach((row, r) => row.forEach((base, c) => { const k = Math.floor(Math.random() * 4); let m = base; for (let i = 0; i < k; i++) m = rot(m); tiles.push({ r, c, base, k, m }); }));
        solved = tiles.every(t => t.m === P.SOL[t.r][t.c]);
      }
      const draw = base => { const d = dirs.filter(([b]) => base & b).map(([, p]) => p).join(''); return `
        <path d="${d}" stroke="#2B2130" stroke-width="36" fill="none"/><path d="${d}" stroke="#C9B79C" stroke-width="27" fill="none"/>
        <path class="pw" d="${d}" stroke="#3FB6E0" stroke-width="13" fill="none" stroke-linecap="round"/>
        <circle cx="50" cy="50" r="17" fill="#C9B79C" stroke="#2B2130" stroke-width="4.5"/><circle class="pw" cx="50" cy="50" r="7" fill="#3FB6E0"/>`; };
      return `<div class="pipes">
        <div class="p-src">${icon('drop')}<span>Depósito</span></div>
        ${tiles.map(t => `<button type="button" class="ptile" data-r="${t.r}" data-c="${t.c}" data-base="${t.base}" data-k="${t.k}" style="grid-row:${t.r + 1};grid-column:${t.c + 2}" aria-label="Pieza de canal, fila ${t.r + 1}, columna ${t.c + 1}. Toca para girar">
          <svg viewBox="0 0 100 100" style="transform:rotate(${t.k * 90}deg)">${draw(t.base)}</svg></button>`).join('')}
        ${['A', 'B', 'C'].map((f, r) => `<div class="p-fam" data-fam="${r}" style="grid-row:${r + 1}">${icon('leaf')}<span>Familia ${f}</span></div>`).join('')}
      </div><p class="p-moves">Giros: <b>0</b></p>`;
    },
    mount(root, s, api) {
      const rot = m => ((m << 1) | (m >> 3)) & 15;
      const mask = t => { let m = +t.dataset.base; for (let i = 0; i < (+t.dataset.k % 4); i++) m = rot(m); return m; };
      let moves = 0;
      const flood = () => {
        const g = {}; $$('.ptile', root).forEach(t => { g[t.dataset.r + ',' + t.dataset.c] = t; t.classList.remove('wet'); });
        const wet = new Set(), q = [];
        const start = g['1,0'];
        if (mask(start) & 8) { wet.add('1,0'); q.push([1, 0]); }
        const D = [[-1, 0, 1, 4], [0, 1, 2, 8], [1, 0, 4, 1], [0, -1, 8, 2]];
        while (q.length) {
          const [r, c] = q.shift(), m = mask(g[r + ',' + c]);
          for (const [dr, dc, b, o] of D) {
            const k = (r + dr) + ',' + (c + dc), n = g[k];
            if ((m & b) && n && !wet.has(k) && (mask(n) & o)) { wet.add(k); q.push([r + dr, c + dc]); }
          }
        }
        wet.forEach(k => g[k].classList.add('wet'));
        let reached = 0;
        $$('.p-fam', root).forEach(f => { const r = +f.dataset.fam, k = r + ',4', ok = wet.has(k) && (mask(g[k]) & 2); f.classList.toggle('on', !!ok); if (ok) reached++; });
        $('.p-src', root).classList.toggle('on', wet.size > 0);
        return reached;
      };
      root.addEventListener('click', e => {
        const t = e.target.closest('.ptile'); if (!t || root.classList.contains('locked')) return;
        t.dataset.k = +t.dataset.k + 1;
        $('svg', t).style.transform = `rotate(${t.dataset.k * 90}deg)`;
        $('.p-moves b', root).textContent = ++moves;
        Sound.play('click');
        const before = $$('.p-fam.on', root).length, n = flood();
        if (n > before) Sound.play('drip');
        if (n === 3) { root.classList.add('locked'); setTimeout(() => api.done('¡El agua llega a las tres familias!'), 400); }
      });
      flood();
    }
  },

  /* ---------- Memoria ---------- */
  memory: {
    auto: true,
    html: s => {
      const cards = shuffle(s.pairs.flatMap((p, i) => [{ i, t: p[0], k: 'concept' }, { i, t: p[1], k: 'desc' }]));
      return `<div class="memory">${cards.map(c => `<button type="button" class="mcard ${c.k}" data-pair="${c.i}" aria-label="Carta oculta">
        <span class="m-inner"><span class="m-back">${icon('leaf')}</span><span class="m-front">${c.t}</span></span></button>`).join('')}</div>
        <p class="p-moves">Intentos: <b>0</b> · Parejas: <b class="m-found">0</b>/${s.pairs.length}</p>`;
    },
    mount(root, s, api) {
      let open = [], busy = false, tries = 0, found = 0;
      root.addEventListener('click', e => {
        const c = e.target.closest('.mcard');
        if (!c || busy || c.classList.contains('flip') || root.classList.contains('locked')) return;
        c.classList.add('flip'); c.setAttribute('aria-label', $('.m-front', c).textContent); Sound.play('click');
        open.push(c);
        if (open.length < 2) return;
        $('.p-moves b', root).textContent = ++tries;
        const [a, b] = open; open = [];
        if (a.dataset.pair === b.dataset.pair) {
          a.classList.add('match'); b.classList.add('match'); Sound.pop();
          $('.m-found', root).textContent = ++found;
          if (found === s.pairs.length) setTimeout(() => api.done(`¡Memoria completa en ${tries} intentos!`), 450);
        } else {
          busy = true;
          setTimeout(() => { [a, b].forEach(x => { x.classList.remove('flip'); x.setAttribute('aria-label', 'Carta oculta'); }); busy = false; }, 950);
        }
      });
    }
  },

  /* ---------- Deslizar tarjetas ---------- */
  swipe: {
    auto: true,
    html: s => `<div class="swipe">
      <div class="swipe-sides"><span class="no">← ${s.no}</span><span class="yes">${s.yes} →</span></div>
      <div class="deck" tabindex="0" aria-label="Tarjetas: usa las flechas izquierda y derecha">${s.cards.map((c, i) => `<div class="scard" data-i="${i}" style="z-index:${s.cards.length - i};--n:${Math.min(i, 3)}"><span class="s-tag yes">${s.yes}</span><span class="s-tag no">${s.no}</span><p>${c.text}</p></div>`).join('')}</div>
      <div class="swipe-btns"><button type="button" class="round-btn no" data-v="0" aria-label="${s.no}">${icon('close')}</button><span class="swipe-count"><b>1</b>/${s.cards.length}</span><button type="button" class="round-btn yes" data-v="1" aria-label="${s.yes}">${icon('check')}</button></div>
    </div>`,
    mount(root, s, api) {
      const deck = $('.deck', root);
      let idx = 0, drag = null;
      const top = () => $(`.scard[data-i="${idx}"]`, root);
      const restack = () => $$('.scard', root).forEach(c => c.style.setProperty('--n', Math.max(0, Math.min(+c.dataset.i - idx, 3))));
      const decide = yes => {
        const card = top(); if (!card) return;
        const c = s.cards[idx];
        card.style.transition = 'transform 320ms cubic-bezier(0.23, 1, 0.32, 1), opacity 320ms ease';
        if (yes === c.ok) {
          card.style.transform = `translateX(${yes ? 140 : -140}%) rotate(${yes ? 24 : -24}deg)`; card.style.opacity = '0';
          Sound.pop(); api.say(yes ? `¡Sí! «${c.text}» ayuda a Valle Verde.` : `Bien descartada: ${c.why || c.text}`);
          idx++; restack();
          setTimeout(() => card.remove(), 330);
          $('.swipe-count b', root).textContent = Math.min(idx + 1, s.cards.length);
          if (idx === s.cards.length) setTimeout(() => api.done('¡Separaste el agua limpia de la turbia!'), 350);
        } else {
          card.style.transform = ''; card.classList.remove('nope'); void card.offsetWidth; card.classList.add('nope');
          card.style.setProperty('--tilt', '0');
          api.fail(c.ok ? `«${c.text}» sí ayuda a resolver el problema.` : `«${c.text}» no ayuda: ${c.why}`);
        }
      };
      deck.addEventListener('pointerdown', e => {
        const card = e.target.closest('.scard'); if (!card || card !== top() || drag) return;
        drag = { card, id: e.pointerId, x0: e.clientX, t0: performance.now(), dx: 0, lx: e.clientX, lt: performance.now(), v: 0 };
        card.setPointerCapture(e.pointerId); card.style.transition = 'none';
      });
      deck.addEventListener('pointermove', e => {
        if (!drag || e.pointerId !== drag.id) return;
        const now = performance.now();
        drag.v = (e.clientX - drag.lx) / Math.max(1, now - drag.lt); drag.lx = e.clientX; drag.lt = now;
        drag.dx = e.clientX - drag.x0;
        drag.card.style.transform = `translateX(${drag.dx}px) rotate(${drag.dx / 18}deg)`; // 1:1 con el dedo
        drag.card.style.setProperty('--tilt', Math.max(-1, Math.min(1, drag.dx / 120)));
      });
      const end = e => {
        if (!drag || e.pointerId !== drag.id) return;
        const { card, dx, v } = drag; drag = null;
        const w = deck.clientWidth;
        if (Math.abs(dx) > w * .28 || (Math.abs(v) > .5 && Math.abs(dx) > 20)) return decide(dx > 0);
        card.style.transition = 'transform 260ms cubic-bezier(0.23, 1, 0.32, 1)'; card.style.transform = ''; card.style.setProperty('--tilt', 0);
      };
      deck.addEventListener('pointerup', end); deck.addEventListener('pointercancel', end);
      root.addEventListener('click', e => { const b = e.target.closest('.round-btn'); if (b && !root.classList.contains('locked')) decide(b.dataset.v === '1'); });
      deck.addEventListener('keydown', e => { if (e.key === 'ArrowRight') decide(true); if (e.key === 'ArrowLeft') decide(false); });
    }
  },

  /* ---------- Radio Lloa: escucha en inglés ---------- */
  radio: {
    auto: true,
    html: s => `<div class="radio" lang="en">
      <div class="radio-box">
        <div class="r-antenna" aria-hidden="true"></div>
        <div class="r-grill" aria-hidden="true">${Array.from({ length: 5 }, () => '<i></i>').join('')}</div>
        <div class="r-screen">
          <div class="r-top"><span class="r-freq">FM 88.<b class="r-n">1</b> · Radio Lloa</span><span class="r-onair">ON AIR</span></div>
          <p class="r-q" hidden></p>
          <p class="r-hint">Press <b>PLAY</b> and listen carefully.</p>
          <div class="r-signal" aria-label="Señal">${s.questions.map(() => '<i></i>').join('')}</div>
        </div>
        <div class="r-ctrls">
          <button type="button" class="btn primary" data-play>${icon('sound')}<span>Play</span></button>
          <button type="button" class="btn sand sm" data-tx><span>Show text</span></button>
        </div>
      </div>
      <div class="r-opts" role="group" aria-label="Answers"></div>
    </div>`,
    mount(root, s, api) {
      let qi = 0, timer = 0;
      const tts = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
      const box = $('.radio-box', root), q = $('.r-q', root);
      const stop = () => { clearTimeout(timer); box.classList.remove('playing'); if (tts) speechSynthesis.cancel(); };
      const show = () => {
        const Q = s.questions[qi];
        $('.r-n', root).textContent = qi + 1;
        q.textContent = Q.q; q.hidden = tts;
        $('[data-tx] span', root).textContent = 'Show text';
        $('.r-opts', root).innerHTML = Q.options.map((o, oi) => `<button type="button" class="r-opt" data-o="${oi}"><b>${'ABC'[oi]}</b><span>${o}</span></button>`).join('');
      };
      const play = () => {
        if (!tts) { q.hidden = false; return; }
        stop();
        const Q = s.questions[qi];
        const u = new SpeechSynthesisUtterance(`${Q.q} ... A: ${Q.options[0]} ... B: ${Q.options[1]} ... C: ${Q.options[2]}`);
        u.lang = 'en-US'; u.rate = .88;
        const v = speechSynthesis.getVoices().find(x => /^en(-|_)/i.test(x.lang)); if (v) u.voice = v;
        u.onend = stop;
        box.classList.add('playing');
        timer = setTimeout(stop, 15000); // por si el navegador no avisa del final
        speechSynthesis.speak(u);
      };
      root.addEventListener('click', e => {
        if (root.classList.contains('locked')) return;
        if (e.target.closest('[data-play]')) return play();
        if (e.target.closest('[data-tx]')) { q.hidden = !q.hidden; $('[data-tx] span', root).textContent = q.hidden ? 'Show text' : 'Hide text'; return; }
        const b = e.target.closest('.r-opt'); if (!b) return;
        const Q = s.questions[qi];
        if (+b.dataset.o === Q.answer) {
          stop(); b.classList.add('right'); Sound.pop();
          $$('.r-signal i', root)[qi].classList.add('on');
          api.say(['Great job!', 'Excellent!', 'Well done!', 'Perfect!'][qi % 4] + ` Señal: ${Math.round((qi + 1) / s.questions.length * 100)} %`);
          qi++;
          if (qi === s.questions.length) { $('.r-hint', root).innerHTML = '<b>100 %</b> signal!'; setTimeout(() => api.done('Signal at 100 %! Radio Lloa is on air.'), 500); }
          else setTimeout(show, 650);
        } else {
          b.classList.add('wrong');
          api.fail('Try again! Listen once more and read the options carefully.');
        }
      });
      show();
    }
  },

  /* ---------- Ordenar letras ---------- */
  scramble: {
    html: s => {
      const words = s.answer.split(' ');
      const letters = shuffle([...s.answer.replace(/ /g, '')].map((ch, i) => ({ ch, i })));
      return `<div class="scr">
        <div class="scr-slots">${words.map(w => `<div class="scr-word">${[...w].map(() => '<button type="button" class="slot" aria-label="Casilla vacía"></button>').join('')}</div>`).join('')}</div>
        <div class="scr-tiles">${letters.map(l => `<button type="button" class="tile-l" data-ch="${l.ch}">${l.ch}</button>`).join('')}</div>
        <button type="button" class="btn sand sm" data-clear>${icon('reset')}<span>Borrar todo</span></button>
      </div>`;
    },
    mount(root, s, api) {
      root.addEventListener('click', e => {
        if (root.classList.contains('locked')) return;
        const t = e.target.closest('.tile-l:not(.used)');
        if (t) {
          const slot = $('.slot:not(.filled)', root); if (!slot) return;
          slot.textContent = t.dataset.ch; slot.classList.add('filled'); slot._tile = t; t.classList.add('used');
          slot.setAttribute('aria-label', 'Letra ' + t.dataset.ch);
          Sound.blip(260); api.changed(); $$('.slot', root).forEach(x => x.classList.remove('wrong'));
          return;
        }
        const sl = e.target.closest('.slot.filled');
        if (sl) { sl._tile.classList.remove('used'); sl.textContent = ''; sl.classList.remove('filled', 'wrong'); sl.setAttribute('aria-label', 'Casilla vacía'); api.changed(); return; }
        if (e.target.closest('[data-clear]')) $$('.slot.filled', root).forEach(x => { x._tile.classList.remove('used'); x.textContent = ''; x.classList.remove('filled', 'wrong'); });
      });
    },
    check(root, s) {
      const slots = $$('.slot', root);
      if (slots.some(x => !x.classList.contains('filled'))) return { incomplete: true, msg: 'Completa todas las casillas.' };
      const target = s.answer.replace(/ /g, '');
      let bad = 0;
      slots.forEach((x, i) => { const ok = x.textContent === target[i]; x.classList.toggle('wrong', !ok); x.classList.toggle('right', ok); if (!ok) bad++; });
      return bad ? { ok: false, msg: `${bad} letra(s) fuera de lugar.` } : { ok: true, msg: `¡«${s.answer}»!` };
    }
  }
});
