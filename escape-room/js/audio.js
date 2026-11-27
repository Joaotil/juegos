/* =========================================================
   audio.js — Sonidos generados con Web Audio API (sin archivos)
   Para usar un archivo propio: colócalo en assets/audio/ y
   agrega su ruta en FILES, por ejemplo  success: 'assets/audio/exito.mp3'
   ========================================================= */

const Sound = {
  FILES: {},              // { nombreDelSonido: 'ruta/al/archivo.mp3' }
  on: true,
  ambientOn: false,
  ctx: null,
  amb: null,

  init() {
    if (!this.ctx) {
      const C = window.AudioContext || window.webkitAudioContext;
      if (!C) return null;
      this.ctx = new C();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.9;
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
    return this.ctx;
  },

  tone(freq, dur, { type = 'sine', vol = 0.12, at = 0, slide = 0 } = {}) {
    const c = this.ctx, t = c.currentTime + at;
    const o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(freq * slide, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(this.master);
    o.start(t); o.stop(t + dur + 0.05);
  },

  noise(dur, { vol = 0.08, freq = 800, q = 0.7, at = 0 } = {}) {
    const c = this.ctx, t = c.currentTime + at;
    const buf = c.createBuffer(1, c.sampleRate * dur, c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const src = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    src.buffer = buf; f.type = 'bandpass'; f.frequency.value = freq; f.Q.value = q;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + dur * 0.3);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f).connect(g).connect(this.master);
    src.start(t);
  },

  play(name) {
    if (!this.on || !name) return;
    if (this.FILES[name]) { const a = new Audio(this.FILES[name]); a.volume = 0.7; a.play().catch(() => {}); return; }
    if (!this.init()) return;
    switch (name) {
      case 'click': this.tone(660, 0.07, { type: 'triangle', vol: 0.05 }); break;
      case 'drip': [0, 0.35, 0.8].forEach(a => this.tone(1400, 0.12, { vol: 0.08, at: a, slide: 0.45 })); break;
      case 'water': this.noise(1.6, { vol: 0.07, freq: 1200, q: 0.5 }); break;
      case 'wind': this.noise(2.4, { vol: 0.06, freq: 400, q: 0.4 }); break;
      case 'bell': this.tone(880, 1.2, { vol: 0.08 }); this.tone(1320, 1, { vol: 0.04 }); break;
      case 'mystery': [0, 0.25, 0.5].forEach((a, i) => this.tone([220, 262, 233][i], 0.6, { type: 'triangle', vol: 0.06, at: a })); break;
      case 'success': [523, 659, 784].forEach((f, i) => this.tone(f, 0.28, { type: 'triangle', vol: 0.08, at: i * 0.09 })); break;
      case 'error': this.tone(196, 0.25, { type: 'sine', vol: 0.09, slide: 0.8 }); break;
      case 'unlock': [392, 523, 659, 1047].forEach((f, i) => this.tone(f, 0.35, { type: 'triangle', vol: 0.07, at: i * 0.08 })); break;
      case 'win': [523, 659, 784, 1047, 784, 1047].forEach((f, i) => this.tone(f, 0.4, { type: 'triangle', vol: 0.08, at: i * 0.12 })); break;
    }
  },

  /* «Voz» de los personajes mientras hablan (solo si el audio ya fue activado por el usuario) */
  blip(pitch) {
    if (!this.on || !this.ctx || this.ctx.state !== 'running') return;
    this.tone(pitch * (0.9 + Math.random() * 0.25), 0.05, { type: 'square', vol: 0.015 });
  },
  pop() { if (this.on && this.ctx && this.ctx.state === 'running') this.tone(880 + Math.random() * 300, 0.09, { type: 'triangle', vol: 0.06, slide: 1.5 }); },

  /* Ambiente de montaña: viento suave y gotas al azar */
  startAmbient() {
    if (!this.on || !this.ambientOn || this.amb || !this.init()) return;
    const c = this.ctx;
    const buf = c.createBuffer(1, c.sampleRate * 4, c.sampleRate);
    const d = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < d.length; i++) { last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02; d[i] = last * 3.5; }
    const src = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    src.buffer = buf; src.loop = true; f.type = 'lowpass'; f.frequency.value = 500; g.gain.value = 0.18;
    const lfo = c.createOscillator(), lg = c.createGain();
    lfo.frequency.value = 0.08; lg.gain.value = 0.08; lfo.connect(lg).connect(g.gain); lfo.start();
    src.connect(f).connect(g).connect(this.master); src.start();
    const drip = () => { if (this.amb) { if (Math.random() < 0.6) this.tone(1200 + Math.random() * 600, 0.1, { vol: 0.025, slide: 0.5 }); this.amb.timer = setTimeout(drip, 1800 + Math.random() * 3000); } };
    this.amb = { src, lfo, timer: setTimeout(drip, 1500) };
  },
  stopAmbient() {
    if (!this.amb) return;
    try { this.amb.src.stop(); this.amb.lfo.stop(); } catch (e) {}
    clearTimeout(this.amb.timer); this.amb = null;
  },
  toggle() { this.on = !this.on; if (!this.on) this.stopAmbient(); else this.startAmbient(); return this.on; },
  toggleAmbient() { this.ambientOn = !this.ambientOn; if (this.ambientOn) { this.on = true; this.startAmbient(); } else this.stopAmbient(); return this.ambientOn; }
};
