/* =========================================================
   game.js — Estado de la partida, puntuación y guardado
   ========================================================= */

const Game = {
  KEY: 'mision-lloa-secreto-aguas-v1',
  BASE: 100,          // puntos por desafío
  PENALTY: 10,        // puntos que se restan por cada intento fallido
  MIN: 40,            // mínimo por desafío completado
  state: null,

  fresh() {
    return { completed: [], scores: {}, errors: {}, evidence: [], startedAt: null, finishedAt: null,
             decision: null, playerName: '', seenIntro: false };
  },
  load() {
    try {
      const s = JSON.parse(localStorage.getItem(this.KEY));
      if (s && Array.isArray(s.completed)) return Object.assign(this.fresh(), s);
    } catch (e) { /* almacenamiento no disponible: se juega sin guardar */ }
    return null;
  },
  save() { try { localStorage.setItem(this.KEY, JSON.stringify(this.state)); } catch (e) {} },
  reset() { try { localStorage.removeItem(this.KEY); } catch (e) {} this.state = this.fresh(); },
  start() { if (!this.state.startedAt) this.state.startedAt = Date.now(); this.save(); },

  status(id) {
    if (this.state.completed.includes(id)) return 'done';
    const next = MISSIONS.find(m => !this.state.completed.includes(m.id));
    return next && next.id === id ? 'open' : 'locked';
  },
  addError(id) { this.state.errors[id] = (this.state.errors[id] || 0) + 1; this.save(); },
  addEvidence(evId) { if (!this.state.evidence.includes(evId)) { this.state.evidence.push(evId); this.save(); return true; } return false; },

  /* Puntaje de un desafío normal: 100 − 10 por error (mínimo 40) */
  missionScore(id) { return Math.max(this.MIN, this.BASE - this.PENALTY * (this.state.errors[id] || 0)); },
  complete(id, score) {
    if (!this.state.completed.includes(id)) this.state.completed.push(id);
    this.state.scores[id] = score;
    if (this.state.completed.length === MISSIONS.length) this.state.finishedAt = Date.now();
    this.save();
  },
  total() { return Object.values(this.state.scores).reduce((a, b) => a + b, 0); },
  maxTotal() { return MISSIONS.reduce((a, m) => a + (m.maxScore || this.BASE), 0); },
  // shortcut: el tiempo cuenta desde el inicio aunque se cierre la pestaña; medir solo tiempo activo si se necesita
  elapsed() { return this.state.startedAt ? (this.state.finishedAt || Date.now()) - this.state.startedAt : 0; },

  /* Evalúa la decisión final. Devuelve puntaje (máx. 150) y detalle de la rúbrica. */
  scoreDecision(proposal, evidenceIds, text) {
    const relevant = evidenceIds.filter(e => proposal.relevant.includes(e));
    const irrelevant = evidenceIds.length - relevant.length;
    const keys = JUSTIFY_KEYS.filter(k => k.re.test(text));
    const len = text.trim().length;
    const parts = {
      propuesta: proposal.quality * 20,                                            // máx. 60
      evidencias: Math.max(0, Math.min(relevant.length, 3) * 15 - irrelevant * 5), // máx. 45
      justificacion: (len >= 80 ? 15 : len >= 40 ? 8 : 0) + Math.min(keys.length, 6) * 5 // máx. 45
    };
    const score = parts.propuesta + parts.evidencias + parts.justificacion;
    const pass = proposal.quality >= 2 && relevant.length >= 2 && len >= 40 && score >= 90;
    return { score, parts, pass, relevant, irrelevant, keys, len };
  },

  /* Comprueba un número escrito por el estudiante (acepta coma decimal). */
  parseNum(v) { const n = parseFloat(String(v).trim().replace(',', '.')); return isNaN(n) ? null : n; },
  checkNum(v, field) { const n = this.parseNum(v); return n !== null && Math.abs(n - field.answer) <= (field.tol || 0) + 1e-9; }
};

Game.state = Game.load() || Game.fresh();
