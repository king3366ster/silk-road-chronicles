/**
 * 西域群英传 - Silk Road Chronicles
 * Enhanced Main Game with Tribe Building, Diplomacy, Commerce, Military, Ceremony
 */

import gameState from './engine/GameState.js';
import { CombatSystem } from './engine/CombatSystem.js';
import { NATIONS, NATION_LIST, OASIS_POINTS, MAJOR_POWERS } from './data/nations.js';
import { CG_DATA } from './data/quests.js';

const TILE = 64, COLS = 80, ROWS = 65;
const C = {
  bg:'#1a0e05', panel:'rgba(30,18,8,0.92)', border:'#8B7355',
  gold:'#D4A853', goldL:'#F0D890', text:'#E8D5B5', dim:'#9B8B70', bright:'#FFF8E8',
  red:'#DC143C', green:'#50C878', blue:'#4A90D9', pink:'#FF69B4', purple:'#9B59B6',
  hp:'#4CAF50', mp:'#2196F3', hpBg:'#333',
  btn:'#3D2B1F', btnH:'#5D4037', sel:'#FFD700',
  move:'rgba(100,200,255,0.3)', atk:'rgba(255,80,80,0.3)',
};

class Game {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'gameCanvas';
    document.getElementById('game-container').appendChild(this.canvas);
    this.x = this.canvas.getContext('2d');
    this.combat = new CombatSystem();
    this.w = window.innerWidth; this.h = window.innerHeight;
    this.canvas.width = this.w; this.canvas.height = this.h;
    this.scene = 'menu'; this.cx = 0; this.cy = 0; this.tcx = 0; this.tcy = 0;
    this.mouse = { x: 0, y: 0, click: false, rclick: false };
    this.keys = {}; this.menuSel = 0; this.oasisSel = 0;
    this.dlgText = ''; this.dlgSpeaker = ''; this.dlgPortrait = null;
    this.notif = null; this.notifT = 0; this.panel = null;
    this.frame = 0; this.fade = 0; this.fading = false; this.fadeCb = null;
    this.bUnit = null; this.bAction = 'select';
    this.particles = []; this.lt = 0; this.dt = 0;
    this.cgList = Object.keys(CG_DATA);
    this.tribeTab = 0; this.dipNation = null; this.dipAction = null;
    this.interactChar = null; this.interactStep = 0;
    this._setupInput();
    window.addEventListener('resize', () => { this.w = window.innerWidth; this.h = window.innerHeight; this.canvas.width = this.w; this.canvas.height = this.h; });
  }

  _setupInput() {
    this.canvas.addEventListener('mousemove', e => { this.mouse.x = e.clientX; this.mouse.y = e.clientY; });
    this.canvas.addEventListener('mousedown', e => { if (e.button === 0) this.mouse.click = true; if (e.button === 2) this.mouse.rclick = true; });
    this.canvas.addEventListener('contextmenu', e => e.preventDefault());
    this.canvas.addEventListener('wheel', e => { if (this.scene === 'map') { this.tcy += e.deltaY * 0.5; this.tcx += e.deltaX * 0.5; this._clamp(); } });
    document.addEventListener('keydown', e => { this.keys[e.key] = true; this._key(e.key); });
    document.addEventListener('keyup', e => { this.keys[e.key] = false; });
  }

  _clamp() { this.tcx = Math.max(0, Math.min(COLS * TILE - this.w, this.tcx)); this.tcy = Math.max(0, Math.min(ROWS * TILE - this.h, this.tcy)); }

  _key(k) {
    if (this.scene === 'menu') {
      if (k === 'ArrowUp') this.menuSel = Math.max(0, this.menuSel - 1);
      if (k === 'ArrowDown') this.menuSel = Math.min(3, this.menuSel + 1);
      if (k === 'Enter') this._menuClick(this.menuSel);
    }
    if (this.scene === 'oasis_select') {
      if (k === 'ArrowLeft') this.oasisSel = Math.max(0, this.oasisSel - 1);
      if (k === 'ArrowRight') this.oasisSel = Math.min(OASIS_POINTS.length - 1, this.oasisSel + 1);
      if (k === 'Enter') this._selectOasis(this.oasisSel);
    }
    if (k === 'Escape') { if (this.panel) this.panel = null; else if (!['menu','oasis_select'].includes(this.scene)) this.scene = 'map'; }
    if (this.scene === 'map') {
      const s = 24;
      if (k === 'w' || k === 'ArrowUp') this.tcy -= s;
      if (k === 's' || k === 'ArrowDown') this.tcy += s;
      if (k === 'a' || k === 'ArrowLeft') this.tcx -= s;
      if (k === 'd' || k === 'ArrowRight') this.tcx += s;
      this._clamp();
    }
  }

  start() {
    const ls = document.getElementById('loading-screen');
    if (ls) { ls.classList.add('hidden'); setTimeout(() => ls.remove(), 600); }
    this.loop(0);
  }

  loop(t) {
    this.dt = Math.min(50, t - this.lt); this.lt = t; this.frame++;
    this._update(); this._render();
    this.mouse.click = false; this.mouse.rclick = false;
    requestAnimationFrame(t2 => this.loop(t2));
  }

  _update() {
    this.cx += (this.tcx - this.cx) * 0.1; this.cy += (this.tcy - this.cy) * 0.1;
    if (this.fading) { this.fade += 0.03; if (this.fade >= 1) { if (this.fadeCb) this.fadeCb(); this.fading = false; } }
    else if (this.fade > 0) { this.fade -= 0.03; if (this.fade < 0) this.fade = 0; }
    if (this.notifT > 0) this.notifT--;
    this.particles = this.particles.filter(p => { p.x += p.vx; p.y += p.vy; p.life--; return p.life > 0; });
  }

  _render() {
    const x = this.x;
    x.fillStyle = C.bg; x.fillRect(0, 0, this.w, this.h);
    switch (this.scene) {
      case 'menu': this._rMenu(x); break;
      case 'oasis_select': this._rOasisSelect(x); break;
      case 'map': this._rMap(x); break;
      case 'battle': this._rBattle(x); break;
      case 'dialogue': this._rDlg(x); break;
      case 'quest': this._rQuest(x); break;
      case 'cg': this._rCG(x); break;
      case 'character': this._rChars(x); break;
      case 'tribe': this._rTribe(x); break;
      case 'diplomacy': this._rDiplomacy(x); break;
      case 'commerce': this._rCommerce(x); break;
      case 'military': this._rMilitary(x); break;
      case 'ceremony': this._rCeremony(x); break;
      case 'interact': this._rInteract(x); break;
    }
    if (this.notif && this.notifT > 0) this._rNotif(x);
    if (this.fade > 0) { x.fillStyle = `rgba(0,0,0,${this.fade})`; x.fillRect(0, 0, this.w, this.h); }
  }

  // === HELPERS ===
  rr(x, bx, by, bw, bh, r) {
    x.beginPath(); x.moveTo(bx + r, by); x.lineTo(bx + bw - r, by);
    x.quadraticCurveTo(bx + bw, by, bx + bw, by + r); x.lineTo(bx + bw, by + bh - r);
    x.quadraticCurveTo(bx + bw, by + bh, bx + bw - r, by + bh); x.lineTo(bx + r, by + bh);
    x.quadraticCurveTo(bx, by + bh, bx, by + bh - r); x.lineTo(bx, by + r);
    x.quadraticCurveTo(bx, by, bx + r, by); x.closePath();
  }
  _notif(msg) { this.notif = msg; this.notifT = 180; }
  _fadeTo(cb) { this.fading = true; this.fade = 0; this.fadeCb = cb; }
  _center() { this.tcx = gameState.player.location.x * TILE - this.w / 2; this.tcy = gameState.player.location.y * TILE - this.h / 2; this._clamp(); this.cx = this.tcx; this.cy = this.tcy; }
  _rParticles(x) { this.particles.forEach(p => { x.globalAlpha = p.life / p.maxLife; x.fillStyle = p.color; x.beginPath(); x.arc(p.x, p.y, p.size, 0, Math.PI * 2); x.fill(); }); x.globalAlpha = 1; }
  _rNotif(x) {
    const a = Math.min(1, this.notifT / 30); x.save(); x.globalAlpha = a;
    x.font = '18px "Microsoft YaHei",serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
    const tw = x.measureText(this.notif).width + 40;
    x.fillStyle = C.panel; this.rr(x, this.w / 2 - tw / 2, 70, tw, 40, 8); x.fill();
    x.strokeStyle = C.gold; x.lineWidth = 1; this.rr(x, this.w / 2 - tw / 2, 70, tw, 40, 8); x.stroke();
    x.fillStyle = C.goldL; x.fillText(this.notif, this.w / 2, 90); x.restore();
  }
  _btn(x, bx, by, bw, bh, txt, color) {
    const h = this.mouse.x >= bx && this.mouse.x <= bx + bw && this.mouse.y >= by && this.mouse.y <= by + bh;
    x.fillStyle = h ? C.btnH : C.btn; this.rr(x, bx, by, bw, bh, 6); x.fill();
    if (h) { x.strokeStyle = color || C.gold; x.lineWidth = 1; this.rr(x, bx, by, bw, bh, 6); x.stroke(); }
    x.font = '14px "Microsoft YaHei",serif'; x.fillStyle = h ? C.goldL : C.text;
    x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, bx + bw / 2, by + bh / 2);
    return h && this.mouse.click;
  }
  _bar(x, bx, by, bw, bh, val, max, color) {
    x.fillStyle = C.hpBg; x.fillRect(bx, by, bw, bh);
    x.fillStyle = color; x.fillRect(bx, by, bw * Math.min(1, val / max), bh);
  }
  _panel(x, px, py, pw, ph) {
    x.fillStyle = C.panel; this.rr(x, px, py, pw, ph, 12); x.fill();
    x.strokeStyle = C.border; x.lineWidth = 2; this.rr(x, px, py, pw, ph, 12); x.stroke();
  }
  _drawPortrait(x, cx, cy, size, gender, nationColor) {
    // Procedural character portrait
    x.save();
    // Background circle
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, size);
    g.addColorStop(0, nationColor + '40'); g.addColorStop(1, nationColor + '10');
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, size, 0, Math.PI * 2); x.fill();
    // Head
    x.fillStyle = gender === 'female' ? '#FFE4C4' : '#DEB887';
    x.beginPath(); x.arc(cx, cy - size * 0.15, size * 0.35, 0, Math.PI * 2); x.fill();
    // Hair
    x.fillStyle = gender === 'female' ? '#2C1810' : '#1a1a1a';
    x.beginPath(); x.arc(cx, cy - size * 0.25, size * 0.38, Math.PI, Math.PI * 2); x.fill();
    if (gender === 'female') {
      // Long hair
      x.fillRect(cx - size * 0.35, cy - size * 0.15, size * 0.12, size * 0.6);
      x.fillRect(cx + size * 0.23, cy - size * 0.15, size * 0.12, size * 0.6);
      // Hair ornament
      x.fillStyle = C.gold; x.beginPath(); x.arc(cx, cy - size * 0.35, size * 0.08, 0, Math.PI * 2); x.fill();
    }
    // Eyes
    x.fillStyle = '#2C1810';
    x.beginPath(); x.arc(cx - size * 0.12, cy - size * 0.15, size * 0.05, 0, Math.PI * 2); x.fill();
    x.beginPath(); x.arc(cx + size * 0.12, cy - size * 0.15, size * 0.05, 0, Math.PI * 2); x.fill();
    // Mouth
    x.strokeStyle = gender === 'female' ? C.pink : '#8B4513'; x.lineWidth = 1.5;
    x.beginPath(); x.arc(cx, cy + size * 0.02, size * 0.08, 0.1 * Math.PI, 0.9 * Math.PI); x.stroke();
    // Body/shoulders
    x.fillStyle = nationColor + '80';
    x.beginPath(); x.moveTo(cx - size * 0.4, cy + size * 0.55); x.lineTo(cx - size * 0.2, cy + size * 0.15);
    x.lineTo(cx + size * 0.2, cy + size * 0.15); x.lineTo(cx + size * 0.4, cy + size * 0.55); x.closePath(); x.fill();
    x.restore();
  }

  // === MENU ===
  _rMenu(x) {
    const cx = this.w / 2, cy = this.h / 2;
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, this.w * 0.6);
    g.addColorStop(0, '#2d1810'); g.addColorStop(0.5, '#1a0e05'); g.addColorStop(1, '#0a0500');
    x.fillStyle = g; x.fillRect(0, 0, this.w, this.h);
    if (this.frame % 3 === 0) this.particles.push({ x: Math.random() * this.w, y: this.h + 10, vx: (Math.random() - 0.5) * 0.5, vy: -Math.random() * 1.5 - 0.5, life: 200, maxLife: 200, color: C.gold, size: Math.random() * 2 + 1 });
    this._rParticles(x);
    x.save(); x.textAlign = 'center'; x.textBaseline = 'middle';
    x.shadowColor = C.gold; x.shadowBlur = 30;
    x.font = 'bold 72px "Microsoft YaHei","SimHei",serif'; x.fillStyle = C.gold;
    x.fillText('西域群英传', cx, cy - 180); x.shadowBlur = 0;
    x.font = '24px "Microsoft YaHei",serif'; x.fillStyle = C.dim;
    x.fillText('SILK ROAD CHRONICLES', cx, cy - 120);
    x.strokeStyle = C.gold; x.lineWidth = 1; x.beginPath(); x.moveTo(cx - 200, cy - 90); x.lineTo(cx + 200, cy - 90); x.stroke();
    const items = ['开始新游戏', '继续游戏', 'CG 回忆', '退出'];
    items.forEach((it, i) => {
      const y = cy - 30 + i * 60; const sel = i === this.menuSel;
      const hov = Math.abs(this.mouse.x - cx) < 150 && Math.abs(this.mouse.y - y) < 25;
      if (hov) this.menuSel = i;
      if (sel || hov) { x.fillStyle = 'rgba(212,168,83,0.15)'; this.rr(x, cx - 160, y - 22, 320, 44, 8); x.fill(); x.strokeStyle = C.gold; x.lineWidth = 1; this.rr(x, cx - 160, y - 22, 320, 44, 8); x.stroke(); }
      x.font = sel ? 'bold 26px "Microsoft YaHei",serif' : '22px "Microsoft YaHei",serif';
      x.fillStyle = sel ? C.goldL : C.text; x.fillText(it, cx, y);
      if (sel) { x.fillStyle = C.gold; x.fillText('◆', cx - 140, y); x.fillText('◆', cx + 140, y); }
    });
    x.font = '14px "Microsoft YaHei",serif'; x.fillStyle = C.dim;
    x.fillText('v2.0 - 西域三十六国 · 部落崛起', cx, this.h - 40);
    x.restore();
    if (this.mouse.click) items.forEach((it, i) => { const y = cy - 30 + i * 60; if (Math.abs(this.mouse.x - cx) < 150 && Math.abs(this.mouse.y - y) < 25) this._menuClick(i); });
  }

  _menuClick(i) {
    if (i === 0) this._fadeTo(() => { gameState.reset(); this.scene = 'oasis_select'; });
    else if (i === 1) { if (gameState.hasSave()) { gameState.load(); this.scene = 'map'; this._center(); this._notif('读取存档成功！'); } else this._notif('没有找到存档！'); }
    else if (i === 2) this.scene = 'cg';
  }

  // === OASIS SELECTION ===
  _rOasisSelect(x) {
    // Background
    const g = x.createLinearGradient(0, 0, this.w, this.h);
    g.addColorStop(0, '#1a1020'); g.addColorStop(0.5, '#2d1810'); g.addColorStop(1, '#0a0500');
    x.fillStyle = g; x.fillRect(0, 0, this.w, this.h);
    // Stars
    for (let i = 0; i < 50; i++) { x.fillStyle = `rgba(255,255,200,${Math.random() * 0.5 + 0.2})`; x.fillRect((i * 137) % this.w, (i * 89) % (this.h * 0.4), 2, 2); }
    // Title
    x.save(); x.textAlign = 'center'; x.textBaseline = 'middle';
    x.font = 'bold 36px "Microsoft YaHei",serif'; x.fillStyle = C.gold;
    x.fillText('🏜️ 选择你的绿洲', this.w / 2, 50);
    x.font = '16px "Microsoft YaHei",serif'; x.fillStyle = C.dim;
    x.fillText('在沙漠边缘找到一片绿洲，开始你的西域传奇', this.w / 2, 85);
    x.restore();
    // Oasis cards
    const cardW = 200, cardH = 280, gap = 20;
    const totalW = OASIS_POINTS.length * (cardW + gap) - gap;
    const startX = (this.w - totalW) / 2;
    OASIS_POINTS.forEach((o, i) => {
      const bx = startX + i * (cardW + gap), by = 120;
      const sel = i === this.oasisSel;
      const hov = this.mouse.x >= bx && this.mouse.x <= bx + cardW && this.mouse.y >= by && this.mouse.y <= by + cardH;
      if (hov) this.oasisSel = i;
      // Card bg
      x.fillStyle = sel ? '#2d1810' : '#1a1008'; this.rr(x, bx, by, cardW, cardH, 10); x.fill();
      x.strokeStyle = sel ? C.gold : (hov ? C.goldL : C.border); x.lineWidth = sel ? 2 : 1;
      this.rr(x, bx, by, cardW, cardH, 10); x.stroke();
      // Terrain icon
      const terrainIcons = { desert: '🏜️', oasis: '🌴', mountain: '🏔️', steppe: '🌾', valley: '🏞️', lake: '💧', plains: '🌿' };
      x.font = '48px serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
      x.fillText(terrainIcons[o.terrain] || '🏜️', bx + cardW / 2, by + 50);
      // Name
      x.font = 'bold 18px "Microsoft YaHei",serif'; x.fillStyle = sel ? C.goldL : C.text;
      x.fillText(o.name, bx + cardW / 2, by + 95);
      // Difficulty
      const diffColors = { easy: C.green, medium: C.gold, hard: C.red };
      const diffNames = { easy: '简单', medium: '普通', hard: '困难' };
      x.font = '14px "Microsoft YaHei",serif'; x.fillStyle = diffColors[o.difficulty];
      x.fillText('难度: ' + diffNames[o.difficulty], bx + cardW / 2, by + 118);
      // Stats bars
      x.font = '12px "Microsoft YaHei",serif'; x.textAlign = 'left';
      let yy = by + 140;
      x.fillStyle = C.dim; x.fillText('水源', bx + 15, yy); this._bar(x, bx + 55, yy - 6, 120, 10, o.water, 100, C.blue); yy += 22;
      x.fillStyle = C.dim; x.fillText('肥沃', bx + 15, yy); this._bar(x, bx + 55, yy - 6, 120, 10, o.fertility, 100, C.green); yy += 22;
      // Nearby nations
      x.fillStyle = C.dim; x.font = '11px "Microsoft YaHei",serif';
      o.nearbyNations.forEach((nId, ni) => {
        const n = NATIONS[nId];
        if (n) { x.fillStyle = n.color; x.fillText('• ' + n.name, bx + 15, yy + ni * 16); }
      });
      // Select button
      if (sel && this._btn(x, bx + 30, by + cardH - 45, cardW - 60, 32, '选择此地', diffColors[o.difficulty])) this._selectOasis(i);
    });
    // Description panel
    const o = OASIS_POINTS[this.oasisSel];
    if (o) {
      const dp = 140, dpy = this.h - dp - 20;
      this._panel(x, 40, dpy, this.w - 80, dp);
      x.font = '16px "Microsoft YaHei",serif'; x.fillStyle = C.text; x.textAlign = 'left';
      x.fillText(o.desc, 70, dpy + 30);
      x.font = '14px "Microsoft YaHei",serif'; x.fillStyle = C.dim;
      x.fillText('周边国家: ' + o.nearbyNations.map(n => NATIONS[n]?.name || n).join(', '), 70, dpy + 55);
      const diffDescs = { easy: '友善的邻国会提供帮助，适合新手', medium: '需要谨慎经营，平衡各方关系', hard: '强敌环伺，需要高超的策略' };
      x.fillStyle = C.gold; x.fillText(diffDescs[o.difficulty], 70, dpy + 80);
      x.fillText('初始资源: ' + Object.entries(o.resources).filter(([,v]) => v > 0).map(([k,v]) => v + k).join(' '), 70, dpy + 105);
    }
  }

  _selectOasis(i) {
    const o = OASIS_POINTS[i];
    this._fadeTo(() => {
      gameState.establishTribe(o.id);
      gameState.phase = 'playing';
      this.scene = 'map';
      this._center();
      this._notif(`在${o.name}建立了部落！开始你的西域传奇！`);
      gameState.startQuest('main_001');
    });
  }

  // === MAP ===
  _rMap(x) {
    const sc = Math.floor(this.cx / TILE), sr = Math.floor(this.cy / TILE);
    const ec = Math.min(COLS, sc + Math.ceil(this.w / TILE) + 2);
    const er = Math.min(ROWS, sr + Math.ceil(this.h / TILE) + 2);
    const tc = { desert:['#D4B896','#C8AD8A','#DCC4A0'], oasis:['#7CB342','#8BC34A','#689F38'], mountain:['#8D6E63','#795548','#6D4C41'], steppe:['#A5D6A7','#81C784','#9CCC65'], lake:['#4FC3F7','#29B6F6','#03A9F4'], valley:['#AED581','#8BC34A','#7CB342'], plains:['#C5E1A5','#AED581','#9CCC65'] };
    for (let r = sr; r < er; r++) for (let c = sc; c < ec; c++) {
      let t = 'desert';
      if (r < 10) t = 'steppe'; else if (r < 20) t = c < 20 ? 'mountain' : 'steppe';
      else if (r < 40) t = c < 15 ? 'mountain' : c > 65 ? 'mountain' : 'desert';
      else if (r >= 55) t = 'mountain';
      for (const n of NATION_LIST) { if (n.territory.some(p => p.x === c && p.y === r)) { t = n.terrain; break; } }
      const cs = tc[t] || tc.desert;
      x.fillStyle = cs[(c * 7 + r * 13) % cs.length];
      x.fillRect(c * TILE - this.cx, r * TILE - this.cy, TILE, TILE);
    }
    // Territories
    for (const n of NATION_LIST) {
      const own = gameState.ownedTerritories.has(n.id);
      n.territory.forEach(t => {
        const sx = t.x * TILE - this.cx, sy = t.y * TILE - this.cy;
        if (sx > -TILE && sx < this.w && sy > -TILE && sy < this.h) {
          x.fillStyle = n.color + (own ? '59' : '33'); x.fillRect(sx, sy, TILE, TILE);
          x.strokeStyle = n.color + '80'; x.lineWidth = 1; x.strokeRect(sx + 1, sy + 1, TILE - 2, TILE - 2);
        }
      });
    }
    // Cities
    for (const n of NATION_LIST) {
      const sx = n.capital.x * TILE - this.cx, sy = n.capital.y * TILE - this.cy;
      if (sx > -128 && sx < this.w + 64 && sy > -128 && sy < this.h + 64) {
        const sz = 20 + Math.sin(this.frame * 0.03) * 3;
        x.save(); x.beginPath(); x.arc(sx + 32, sy + 32, sz, 0, Math.PI * 2);
        x.fillStyle = n.color + '60'; x.fill(); x.strokeStyle = n.color; x.lineWidth = 2; x.stroke();
        x.font = '20px serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
        x.fillText(n.emblem, sx + 32, sy + 32);
        x.font = 'bold 12px "Microsoft YaHei",serif'; x.fillStyle = C.bright; x.strokeStyle = '#000'; x.lineWidth = 3;
        x.strokeText(n.name, sx + 32, sy + 60); x.fillText(n.name, sx + 32, sy + 60);
        x.restore();
      }
    }
    // Player
    const px = gameState.player.location.x * TILE - this.cx, py = gameState.player.location.y * TILE - this.cy;
    x.save(); const gs = 16 + Math.sin(this.frame * 0.05) * 4;
    x.beginPath(); x.arc(px + 32, py + 32, gs, 0, Math.PI * 2); x.fillStyle = 'rgba(255,215,0,0.3)'; x.fill();
    x.font = '28px serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('🧭', px + 32, py + 32);
    x.restore();
    // HUD
    x.fillStyle = C.panel; x.fillRect(0, 0, this.w, 50);
    x.strokeStyle = C.border; x.lineWidth = 1; x.beginPath(); x.moveTo(0, 50); x.lineTo(this.w, 50); x.stroke();
    x.save(); x.textBaseline = 'middle';
    x.font = 'bold 16px "Microsoft YaHei",serif'; x.fillStyle = C.gold; x.textAlign = 'left';
    x.fillText('⚔ ' + gameState.player.title + ' ' + gameState.player.name, 15, 25);
    x.font = '14px "Microsoft YaHei",serif'; x.fillStyle = C.text;
    x.fillText('Lv.' + gameState.player.level, 250, 25);
    x.fillStyle = C.gold; x.fillText('💰' + gameState.player.gold, 310, 25);
    x.fillStyle = C.text; x.fillText('📅第' + gameState.turn + '回合', 400, 25);
    x.fillText('👥' + gameState.tribe.population + '人', 510, 25);
    x.fillText('🌾' + Math.floor(gameState.resources.food), 590, 25);
    const st = gameState.player.stats;
    x.font = '12px "Microsoft YaHei",serif'; x.fillStyle = C.dim; x.textAlign = 'right';
    x.fillText('武' + st.military + ' 商' + st.economy + ' 外' + st.diplomacy + ' 文' + st.culture + ' 魅' + st.charisma, this.w - 15, 25);
    x.restore();
    // Action bar
    const by = this.h - 60;
    x.fillStyle = C.panel; x.fillRect(0, by, this.w, 60);
    x.strokeStyle = C.border; x.lineWidth = 1; x.beginPath(); x.moveTo(0, by); x.lineTo(this.w, by); x.stroke();
    const btns = [
      ['🏘️ 部落', () => { this.scene = 'tribe'; }],
      ['⚔️ 军事', () => { this.scene = 'military'; }],
      ['💰 商贸', () => { this.scene = 'commerce'; }],
      ['🤝 外交', () => { this.scene = 'diplomacy'; }],
      ['📜 任务', () => { this.scene = 'quest'; }],
      ['👥 角色', () => { this.scene = 'character'; }],
      ['💬 互动', () => { this._startInteract(); }],
      ['🎭 礼仪', () => { this.scene = 'ceremony'; }],
      ['⏭️ 回合', () => { const evt = gameState.nextTurn(); this._notif(evt.text); }],
      ['💾 存档', () => { gameState.save(); this._notif('存档成功！'); }]
    ];
    const bw = 100, sx = (this.w - btns.length * bw) / 2;
    btns.forEach((b, i) => { if (this._btn(x, sx + i * bw, by + 8, bw - 6, 44, b[0])) b[1](); });
    // Side panel
    if (this.panel) this._rPanel(x);
    // Map click
    if (this.mouse.click) {
      const col = Math.floor((this.mouse.x + this.cx) / TILE), row = Math.floor((this.mouse.y + this.cy) / TILE);
      if (col >= 0 && col < COLS && row >= 0 && row < ROWS && this.mouse.y > 50 && this.mouse.y < this.h - 60) {
        for (const n of NATION_LIST) {
          if (n.capital.x === col && n.capital.y === row) { this.panel = { type: 'nation', nation: n }; return; }
        }
        gameState.movePlayer(col, row);
      }
    }
  }

  _rPanel(x) {
    const pw = 350, px = this.w - pw - 10, py = 60, ph = this.h - 140;
    this._panel(x, px, py, pw, ph);
    const n = this.panel.nation;
    if (this.panel.type === 'nation' && n) {
      x.save(); x.textAlign = 'center'; x.textBaseline = 'middle';
      x.font = 'bold 22px "Microsoft YaHei",serif'; x.fillStyle = n.color;
      x.fillText(n.emblem + ' ' + n.name, px + pw / 2, py + 35);
      x.font = '13px "Microsoft YaHei",serif'; x.fillStyle = C.dim;
      x.fillText(n.nameEn + (n.isAllFemale ? ' ♀全女性国家' : ''), px + pw / 2, py + 58);
      x.font = '13px "Microsoft YaHei",serif'; x.fillStyle = C.text; x.textAlign = 'left';
      const lines = (n.description || '').match(/.{1,22}/g) || [];
      lines.forEach((l, i) => x.fillText(l, px + 15, py + 80 + i * 20));
      let yy = py + 80 + lines.length * 20 + 10;
      // Skills
      x.fillStyle = C.gold; x.font = 'bold 13px "Microsoft YaHei",serif';
      x.fillText('【特殊技能】', px + 15, yy); yy += 22;
      x.font = '12px "Microsoft YaHei",serif';
      Object.entries(n.skills || {}).forEach(([cat, sk]) => {
        x.fillStyle = C.text; x.fillText(sk.icon + ' ' + sk.name, px + 15, yy);
        x.fillStyle = C.dim; x.fillText(sk.desc.substring(0, 16), px + 120, yy);
        yy += 18;
      });
      yy += 8;
      // Bars
      x.fillStyle = C.gold; x.font = 'bold 13px "Microsoft YaHei",serif';
      x.fillText('【国力】', px + 15, yy); yy += 22;
      x.font = '12px "Microsoft YaHei",serif';
      [['军事',n.military,C.red],['经济',n.economy,C.green],['外交',n.diplomacy,C.blue],['文化',n.culture,C.pink]].forEach(([l,v,c]) => {
        x.fillStyle = C.text; x.fillText(l, px + 15, yy);
        this._bar(x, px + 60, yy - 6, 180, 10, v, 100, c);
        x.fillStyle = c; x.fillText(v, px + 250, yy); yy += 20;
      });
      yy += 8;
      x.fillStyle = C.gold; x.font = 'bold 13px "Microsoft YaHei",serif';
      x.fillText('【特产】' + n.speciality, px + 15, yy); yy += 20;
      x.font = '12px "Microsoft YaHei",serif'; x.fillStyle = C.dim;
      const rel = gameState.getNationRelation('player', n.id);
      x.fillText('关系: ' + rel + (this.alliances?.includes(n.id) ? ' (盟友)' : ''), px + 15, yy); yy += 20;
      // Actions
      if (this._btn(x, px + 15, yy, 100, 30, '💬 互动', C.blue)) { this.dipNation = n.id; this._startInteract(); }
      if (this._btn(x, px + 125, yy, 100, 30, '🎁 赠礼', C.green)) { gameState.sendGift(n.id, 'food', 10); this._notif('赠送了食物'); }
      if (this._btn(x, px + 235, yy, 100, 30, '🤝 结盟', C.gold)) { const r = gameState.proposeAlliance(n.id); this._notif(r.msg); }
      x.restore();
    }
    if (this._btn(x, px + pw - 40, py + 5, 35, 30, '✕')) this.panel = null;
  }

  // === TRIBE MANAGEMENT ===
  _rTribe(x) {
    x.fillStyle = C.bg; x.fillRect(0, 0, this.w, this.h);
    this._panel(x, 40, 40, this.w - 80, this.h - 80);
    x.save(); x.textAlign = 'center'; x.textBaseline = 'middle';
    x.font = 'bold 28px "Microsoft YaHei",serif'; x.fillStyle = C.gold;
    x.fillText('🏘️ ' + gameState.tribe.name, this.w / 2, 75);
    x.restore();
    const t = gameState.tribe, r = gameState.resources;
    // Left: Stats
    let lx = 70, ly = 110;
    x.font = 'bold 16px "Microsoft YaHei",serif'; x.fillStyle = C.gold; x.textAlign = 'left';
    x.fillText('【部落概况】', lx, ly); ly += 28;
    x.font = '14px "Microsoft YaHei",serif';
    x.fillStyle = C.text; x.fillText('👥 人口: ' + t.population + '/' + t.maxPopulation, lx, ly); ly += 22;
    x.fillText('😊 幸福度: ', lx, ly); this._bar(x, lx + 90, ly - 6, 120, 10, t.happiness, 100, C.green); ly += 22;
    x.fillText('🔧 科技: ' + t.techLevel, lx, ly); ly += 30;
    // Resources
    x.fillStyle = C.gold; x.font = 'bold 16px "Microsoft YaHei",serif';
    x.fillText('【资源】', lx, ly); ly += 25;
    x.font = '14px "Microsoft YaHei",serif';
    [['🌾 食物', r.food], ['🪵 木材', r.wood], ['🪨 石料', r.stone], ['💎 玉石', r.jade], ['🧵 丝绸', r.silk], ['✨ 香料', r.spice], ['🐎 马匹', r.horse], ['⚒️ 铁矿', r.iron]].forEach(([n, v]) => {
      x.fillStyle = C.text; x.fillText(n + ': ' + Math.floor(v), lx, ly); ly += 20;
    });
    // Right: Buildings
    const rx = this.w / 2 + 20;
    let ry = 110;
    x.fillStyle = C.gold; x.font = 'bold 16px "Microsoft YaHei",serif'; x.textAlign = 'left';
    x.fillText('【农业】', rx, ry); ry += 25;
    x.font = '14px "Microsoft YaHei",serif'; x.fillStyle = C.text;
    x.fillText('农田: ' + t.agriculture.farms + '/' + t.agriculture.maxFarms + ' 产出:' + t.agriculture.output, rx, ry); ry += 22;
    if (this._btn(x, rx, ry, 140, 30, '🌾 建农田(20木)')) { if (gameState.buildFarm()) this._notif('农田建成！'); else this._notif('资源不足或已达上限'); }
    ry += 40;
    x.fillStyle = C.gold; x.font = 'bold 16px "Microsoft YaHei",serif';
    x.fillText('【生态】', rx, ry); ry += 25;
    x.font = '14px "Microsoft YaHei",serif'; x.fillStyle = C.text;
    x.fillText('树木: ' + t.ecology.trees + '/' + t.ecology.maxTrees + ' 水源:' + Math.floor(t.ecology.water), rx, ry); ry += 22;
    if (this._btn(x, rx, ry, 140, 30, '🌳 种树')) { if (gameState.plantTrees()) this._notif('种下了一棵树！'); else this._notif('已达上限'); }
    ry += 40;
    x.fillStyle = C.gold; x.font = 'bold 16px "Microsoft YaHei",serif';
    x.fillText('【商业】', rx, ry); ry += 25;
    x.font = '14px "Microsoft YaHei",serif'; x.fillStyle = C.text;
    x.fillText('市场: ' + t.commerce.markets + '/' + t.commerce.maxMarkets + ' 收入:' + t.commerce.income + '/回合', rx, ry); ry += 22;
    if (this._btn(x, rx, ry, 160, 30, '🏪 建市场(50金)')) { if (gameState.buildMarket()) this._notif('市场建成！'); else this._notif('金币不足或已达上限'); }
    ry += 40;
    x.fillStyle = C.gold; x.font = 'bold 16px "Microsoft YaHei",serif';
    x.fillText('【军事】', rx, ry); ry += 25;
    x.font = '14px "Microsoft YaHei",serif'; x.fillStyle = C.text;
    x.fillText('兵营: ' + t.military.barracks + '/' + t.military.maxBarracks + ' 士兵:' + t.military.soldiers, rx, ry); ry += 22;
    if (this._btn(x, rx, ry, 160, 30, '🏰 建兵营(40石)')) { if (gameState.buildBarracks()) this._notif('兵营建成！'); else this._notif('石料不足或已达上限'); }
    ry += 35;
    if (this._btn(x, rx, ry, 160, 30, '⚔️ 征兵(10人/100粮)')) { if (gameState.recruitSoldiers(10)) this._notif('征兵10人！'); else this._notif('粮食或人口不足'); }
    if (this._btn(x, this.w / 2 - 60, this.h - 100, 120, 40, '返回')) this.scene = 'map';
  }

  // === DIPLOMACY ===
  _rDiplomacy(x) {
    x.fillStyle = C.bg; x.fillRect(0, 0, this.w, this.h);
    this._panel(x, 40, 40, this.w - 80, this.h - 80);
    x.save(); x.textAlign = 'center'; x.textBaseline = 'middle';
    x.font = 'bold 28px "Microsoft YaHei",serif'; x.fillStyle = C.gold;
    x.fillText('🤝 外交', this.w / 2, 75);
    x.restore();
    // Nation list with relations
    let yy = 110; x.textAlign = 'left';
    const sortedNations = NATION_LIST.sort((a, b) => (b.military + b.economy) - (a.military + a.economy));
    sortedNations.forEach(n => {
      if (yy > this.h - 120) return;
      const rel = gameState.getNationRelation('player', n.id);
      const isAlly = gameState.alliances.includes(n.id);
      x.fillStyle = n.color; x.font = '14px "Microsoft YaHei",serif';
      x.fillText(n.emblem + ' ' + n.name, 70, yy);
      this._bar(x, 200, yy - 6, 100, 10, rel + 100, 200, rel > 60 ? C.green : rel > 30 ? C.gold : C.red);
      x.fillStyle = C.dim; x.font = '12px "Microsoft YaHei",serif';
      x.fillText(rel + (isAlly ? '盟友' : ''), 310, yy);
      // Actions
      if (this._btn(x, 380, yy - 12, 60, 24, '赠礼')) { gameState.sendGift(n.id, 'food', 10); this._notif('向' + n.name + '赠礼'); }
      if (this._btn(x, 450, yy - 12, 60, 24, '结盟')) { const r = gameState.proposeAlliance(n.id); this._notif(r.msg); }
      if (n.skills?.diplomacy && this._btn(x, 520, yy - 12, 80, 24, n.skills.diplomacy.icon + '特殊')) { this._notif(n.skills.diplomacy.name + ': ' + n.skills.diplomacy.desc); }
      yy += 30;
    });
    // Major powers
    yy += 20;
    x.fillStyle = C.gold; x.font = 'bold 16px "Microsoft YaHei",serif';
    x.fillText('【四大帝国影响】', 70, yy); yy += 25;
    Object.entries(MAJOR_POWERS).forEach(([id, mp]) => {
      const rel = gameState.majorPowerRelations[id];
      x.fillStyle = mp.color; x.font = '14px "Microsoft YaHei",serif';
      x.fillText(mp.emblem + ' ' + mp.name, 70, yy);
      this._bar(x, 200, yy - 6, 100, 10, rel, 100, mp.color);
      x.fillStyle = C.dim; x.font = '12px "Microsoft YaHei",serif';
      x.fillText(rel + '/100', 310, yy);
      yy += 25;
    });
    if (this._btn(x, this.w / 2 - 60, this.h - 100, 120, 40, '返回')) this.scene = 'map';
  }

  // === COMMERCE ===
  _rCommerce(x) {
    x.fillStyle = C.bg; x.fillRect(0, 0, this.w, this.h);
    this._panel(x, 40, 40, this.w - 80, this.h - 80);
    x.save(); x.textAlign = 'center'; x.textBaseline = 'middle';
    x.font = 'bold 28px "Microsoft YaHei",serif'; x.fillStyle = C.gold;
    x.fillText('💰 商贸', this.w / 2, 75);
    x.restore();
    const t = gameState.tribe;
    let yy = 110; x.textAlign = 'left';
    x.font = '16px "Microsoft YaHei",serif'; x.fillStyle = C.text;
    x.fillText('金币: ' + gameState.player.gold + '  商业收入: ' + t.commerce.income + '/回合', 70, yy); yy += 30;
    x.fillStyle = C.gold; x.font = 'bold 16px "Microsoft YaHei",serif';
    x.fillText('【贸易路线】', 70, yy); yy += 25;
    // Available trade routes based on alliances
    if (gameState.alliances.length === 0) { x.font = '14px "Microsoft YaHei",serif'; x.fillStyle = C.dim; x.fillText('需要先结盟才能开通贸易路线', 90, yy); }
    gameState.alliances.forEach(nId => {
      const n = NATIONS[nId]; if (!n) return;
      x.font = '14px "Microsoft YaHei",serif'; x.fillStyle = n.color;
      x.fillText(n.emblem + ' ' + n.name + ' - 预计收入: ' + Math.floor(n.economy * 0.3) + '/回合', 90, yy);
      if (this._btn(x, 400, yy - 12, 80, 24, '开通商路')) {
        gameState.tradeRoutes.push({ nation: nId, income: Math.floor(n.economy * 0.3) });
        this._notif('与' + n.name + '开通了贸易路线！');
      }
      yy += 28;
    });
    yy += 20;
    x.fillStyle = C.gold; x.font = 'bold 16px "Microsoft YaHei",serif';
    x.fillText('【资源交易】', 70, yy); yy += 25;
    const prices = { jade: 50, silk: 30, spice: 25, horse: 40, iron: 20, wood: 5, stone: 8 };
    Object.entries(prices).forEach(([res, price]) => {
      if (yy > this.h - 120) return;
      x.font = '14px "Microsoft YaHei",serif'; x.fillStyle = C.text;
      x.fillText(res + ': ' + Math.floor(gameState.resources[res] || 0) + ' (单价' + price + '金)', 90, yy);
      if (this._btn(x, 380, yy - 12, 50, 24, '卖出')) { if (gameState.resources[res] > 0) { gameState.resources[res]--; gameState.addGold(price); this._notif('卖出1' + res); } }
      if (this._btn(x, 440, yy - 12, 50, 24, '买入')) { if (gameState.player.gold >= price) { gameState.addGold(-price); gameState.resources[res] = (gameState.resources[res] || 0) + 1; this._notif('买入1' + res); } }
      yy += 26;
    });
    if (this._btn(x, this.w / 2 - 60, this.h - 100, 120, 40, '返回')) this.scene = 'map';
  }

  // === MILITARY ===
  _rMilitary(x) {
    x.fillStyle = C.bg; x.fillRect(0, 0, this.w, this.h);
    this._panel(x, 40, 40, this.w - 80, this.h - 80);
    x.save(); x.textAlign = 'center'; x.textBaseline = 'middle';
    x.font = 'bold 28px "Microsoft YaHei",serif'; x.fillStyle = C.red;
    x.fillText('⚔️ 军事', this.w / 2, 75);
    x.restore();
    const a = gameState.army, t = gameState.tribe;
    let yy = 110; x.textAlign = 'left';
    x.font = '16px "Microsoft YaHei",serif'; x.fillStyle = C.text;
    x.fillText('总兵力: ' + (a.infantry + a.cavalry + a.archers), 70, yy); yy += 25;
    x.fillText('步兵: ' + a.infantry + '  骑兵: ' + a.cavalry + '  弓兵: ' + a.archers, 70, yy); yy += 25;
    x.fillText('士气: ', 70, yy); this._bar(x, 130, yy - 6, 150, 12, a.morale, 100, C.green);
    x.fillStyle = C.text; x.fillText(a.morale + '/100', 290, yy); yy += 35;
    // Recruit
    x.fillStyle = C.gold; x.font = 'bold 16px "Microsoft YaHei",serif';
    x.fillText('【征兵】', 70, yy); yy += 25;
    x.font = '14px "Microsoft YaHei",serif'; x.fillStyle = C.text;
    x.fillText('可征兵: ' + Math.max(0, gameState.tribe.population - 5) + '人 (消耗粮食)', 90, yy); yy += 25;
    if (this._btn(x, 90, yy, 120, 30, '征步兵x10')) { if (gameState.recruitSoldiers(10)) this._notif('征兵成功！'); else this._notif('资源不足'); }
    if (this._btn(x, 220, yy, 120, 30, '征步兵x50')) { if (gameState.recruitSoldiers(50)) this._notif('征兵成功！'); else this._notif('资源不足'); }
    yy += 40;
    // Attack options
    x.fillStyle = C.gold; x.font = 'bold 16px "Microsoft YaHei",serif';
    x.fillText('【军事行动】', 70, yy); yy += 25;
    const targetNations = NATION_LIST.filter(n => !gameState.ownedTerritories.has(n.id) && !gameState.alliances.includes(n.id));
    targetNations.slice(0, 8).forEach(n => {
      if (yy > this.h - 120) return;
      x.font = '14px "Microsoft YaHei",serif'; x.fillStyle = n.color;
      x.fillText(n.emblem + ' ' + n.name + ' (军力:' + n.military + ')', 90, yy);
      if (this._btn(x, 350, yy - 12, 80, 24, '⚔️ 进攻')) { this._startBattle(n); }
      if (this._btn(x, 440, yy - 12, 80, 24, '🔍 侦察')) { this._notif(n.name + ' - 军:' + n.military + ' 经:' + n.economy + ' 外:' + n.diplomacy); }
      yy += 28;
    });
    if (this._btn(x, this.w / 2 - 60, this.h - 100, 120, 40, '返回')) this.scene = 'map';
  }

  _startBattle(nation) {
    const n = nation || NATIONS[gameState.player.currentNation || 'loulan'];
    const a = gameState.army;
    const playerArmy = [
      { name: '指挥官', maxHp: 120 + gameState.player.stats.military, maxMp: 60, speed: 4, attack: 30 + gameState.player.stats.military, defense: 20, attackRange: 1, stats: { military: gameState.player.stats.military } },
    ];
    for (let i = 0; i < Math.min(3, Math.floor(a.infantry / 10)); i++) playerArmy.push({ name: '步兵' + (i + 1), maxHp: 80, maxMp: 30, speed: 3, attack: 25, defense: 20, attackRange: 1, stats: { military: 20 } });
    const enemyArmy = [];
    for (let i = 0; i < 3; i++) enemyArmy.push({ name: (n ? n.name : '敌') + '兵', maxHp: 70 + (n ? n.military : 30), maxMp: 30, speed: 3, attack: 20 + (n ? n.military * 0.3 : 10), defense: 15, attackRange: 1, stats: { military: n ? n.military * 0.3 : 15 } });
    this.combat.initBattle(playerArmy, enemyArmy, n ? n.terrain : 'desert');
    this.bUnit = null; this.bAction = 'select'; this.scene = 'battle';
  }

  // === CEREMONY ===
  _rCeremony(x) {
    x.fillStyle = C.bg; x.fillRect(0, 0, this.w, this.h);
    // Elegant background
    const g = x.createRadialGradient(this.w / 2, this.h / 2, 0, this.w / 2, this.h / 2, this.w * 0.5);
    g.addColorStop(0, '#2d1810'); g.addColorStop(1, '#0a0500');
    x.fillStyle = g; x.fillRect(0, 0, this.w, this.h);
    // Decorative border
    x.strokeStyle = C.gold + '40'; x.lineWidth = 2;
    x.strokeRect(60, 60, this.w - 120, this.h - 120);
    x.strokeRect(65, 65, this.w - 130, this.h - 130);
    this._panel(x, 80, 80, this.w - 160, this.h - 160);
    x.save(); x.textAlign = 'center'; x.textBaseline = 'middle';
    x.font = 'bold 28px "Microsoft YaHei",serif'; x.fillStyle = C.gold;
    x.fillText('🎭 礼仪殿', this.w / 2, 115);
    x.restore();
    let yy = 150; x.textAlign = 'left';
    // Marriage candidates
    x.fillStyle = C.pink; x.font = 'bold 16px "Microsoft YaHei",serif';
    x.fillText('💕 【联姻候选】', 110, yy); yy += 28;
    const candidates = Object.values(gameState.characters).filter(c => c.gender === 'female' && !c.recruited && c.relation >= 50).slice(0, 8);
    if (candidates.length === 0) { x.font = '14px "Microsoft YaHei",serif'; x.fillStyle = C.dim; x.fillText('需要先与女性角色互动提升好感度', 130, yy); }
    candidates.forEach(ch => {
      if (yy > this.h - 180) return;
      const n = NATIONS[ch.nation];
      this._drawPortrait(x, 140, yy, 18, ch.gender, n?.color || C.gold);
      x.font = '14px "Microsoft YaHei",serif'; x.fillStyle = C.pink;
      x.fillText(ch.name + '(' + ch.title + ')', 170, yy);
      x.fillStyle = C.dim; x.font = '12px "Microsoft YaHei",serif';
      x.fillText('好感:' + ch.relation + ' 来自:' + (n?.name || ''), 350, yy);
      if (ch.relation >= 70 && this._btn(x, 520, yy - 12, 80, 24, '💍 求婚', C.pink)) {
        const r = gameState.proposeMarriage(ch.id);
        this._notif(r.msg);
      } else if (ch.relation < 70) {
        x.fillStyle = C.dim; x.font = '11px "Microsoft YaHei",serif'; x.fillText('(好感70可求婚)', 530, yy);
      }
      yy += 32;
    });
    yy += 15;
    // Ceremony actions
    x.fillStyle = C.gold; x.font = 'bold 16px "Microsoft YaHei",serif';
    x.fillText('🎭 【礼仪活动】', 110, yy); yy += 28;
    const ceremonies = [
      ['🎊 举办宴会 (100金)', () => { if (gameState.player.gold >= 100) { gameState.addGold(-100); gameState.addExp(30); gameState.tribe.happiness += 10; this._notif('宴会成功举办！声望提升'); } else this._notif('金币不足'); }],
      ['🙏 祭祀天地 (50粮)', () => { if (gameState.resources.food >= 50) { gameState.resources.food -= 50; gameState.addExp(20); this._notif('祭祀完成，风调雨顺！'); } else this._notif('粮食不足'); }],
      ['🏇 赛马大会 (80金)', () => { if (gameState.player.gold >= 80) { gameState.addGold(-80); gameState.addExp(25); this._notif('赛马大会圆满结束！'); } else this._notif('金币不足'); }],
      ['💃 歌舞表演 (60金)', () => { if (gameState.player.gold >= 60) { gameState.addGold(-60); gameState.player.stats.charisma += 2; this._notif('歌舞表演赢得了众人的赞赏！'); } else this._notif('金币不足'); }],
    ];
    ceremonies.forEach(([label, action]) => {
      if (this._btn(x, 110, yy, 200, 32, label)) action();
      yy += 38;
    });
    if (this._btn(x, this.w / 2 - 60, this.h - 100, 120, 40, '返回')) this.scene = 'map';
  }

  // === CHARACTER INTERACTION ===
  _startInteract() {
    const nation = gameState.player.currentNation || this.dipNation;
    const chars = Object.values(gameState.characters).filter(c => c.nation === nation);
    if (chars.length > 0) {
      this.interactChar = chars[Math.floor(Math.random() * chars.length)];
      this.interactStep = 0;
      this.scene = 'interact';
    } else {
      this._notif('此处没有可互动的角色');
    }
  }

  _rInteract(x) {
    const ch = this.interactChar;
    if (!ch) { this.scene = 'map'; return; }
    const n = NATIONS[ch.nation];
    // Background
    const g = x.createLinearGradient(0, 0, this.w, this.h);
    g.addColorStop(0, '#1a1020'); g.addColorStop(0.5, n?.color ? n.color + '15' : '#2d181015'); g.addColorStop(1, '#0a0500');
    x.fillStyle = g; x.fillRect(0, 0, this.w, this.h);
    // Decorative elements
    for (let i = 0; i < 20; i++) {
      x.fillStyle = `rgba(212,168,83,${0.03 + Math.sin(this.frame * 0.02 + i) * 0.02})`;
      x.beginPath(); x.arc(Math.random() * this.w, Math.random() * this.h, Math.random() * 30 + 10, 0, Math.PI * 2); x.fill();
    }
    // Portrait (large)
    this._drawPortrait(x, this.w / 2, this.h / 2 - 100, 120, ch.gender, n?.color || C.gold);
    // Name & title
    x.save(); x.textAlign = 'center'; x.textBaseline = 'middle';
    x.font = 'bold 24px "Microsoft YaHei",serif'; x.fillStyle = ch.gender === 'female' ? C.pink : C.blue;
    x.fillText(ch.name, this.w / 2, this.h / 2 + 40);
    x.font = '16px "Microsoft YaHei",serif'; x.fillStyle = C.dim;
    x.fillText(ch.title + ' · ' + (n?.name || ''), this.w / 2, this.h / 2 + 65);
    // Relation bar
    x.fillText('好感度', this.w / 2, this.h / 2 + 90);
    this._bar(x, this.w / 2 - 80, this.h / 2 + 100, 160, 12, ch.relation, 100, C.pink);
    x.fillStyle = C.text; x.font = '14px "Microsoft YaHei",serif';
    x.fillText(ch.relation + '/100', this.w / 2, this.h / 2 + 125);
    x.restore();
    // Dialogue
    const dialogues = ch.dialogue || ['你好，旅行者。', '愿丝路平安。', '欢迎来到我们的土地。'];
    const dlg = dialogues[Math.floor(this.frame / 120) % dialogues.length];
    const bh = 120, by = this.h - bh - 80;
    this._panel(x, 60, by, this.w - 120, bh);
    x.font = '18px "Microsoft YaHei",serif'; x.fillStyle = C.text; x.textAlign = 'left';
    const dlgLines = (dlg || '').match(/.{1,40}/g) || [];
    dlgLines.forEach((l, i) => x.fillText(l, 90, by + 30 + i * 26));
    // Interaction buttons
    const bby = this.h - 65;
    if (this._btn(x, this.w / 2 - 250, bby, 100, 36, '💬 交谈')) { ch.relation = Math.min(100, ch.relation + 5); this._notif('好感+5'); gameState.addExp(5); }
    if (this._btn(x, this.w / 2 - 130, bby, 100, 36, '🎁 赠礼')) { if (gameState.resources.food >= 10) { gameState.resources.food -= 10; ch.relation = Math.min(100, ch.relation + 15); this._notif('赠送食物，好感+15'); } else this._notif('粮食不足'); }
    if (this._btn(x, this.w / 2 - 10, bby, 100, 36, '🎵 歌舞')) { if (gameState.player.stats.charisma > 15) { ch.relation = Math.min(100, ch.relation + 10); this._notif('表演了一段歌舞，好感+10'); } else this._notif('魅力不足'); }
    if (ch.gender === 'female' && this._btn(x, this.w / 2 + 110, bby, 100, 36, '💕 表白', C.pink)) {
      if (ch.relation >= 70) { const r = gameState.proposeMarriage(ch.id); this._notif(r.msg); this.scene = 'map'; }
      else this._notif('好感不足70，对方害羞地低下了头...');
    }
    if (this._btn(x, this.w / 2 + 230, bby, 80, 36, '返回')) this.scene = 'map';
  }

  // === BATTLE (same as before but enhanced) ===
  _rBattle(x) {
    const cw = Math.floor(this.w / this.combat.gridWidth), ch = Math.floor((this.h - 120) / this.combat.gridHeight);
    const cs = Math.min(cw, ch), ox = (this.w - cs * this.combat.gridWidth) / 2, oy = 60;
    x.fillStyle = '#1a1a2e'; x.fillRect(0, 0, this.w, this.h);
    for (let r = 0; r < this.combat.gridHeight; r++) for (let c = 0; c < this.combat.gridWidth; c++) {
      const sx = ox + c * cs, sy = oy + r * cs;
      x.fillStyle = (c + r) % 2 === 0 ? '#2a2a3e' : '#252538'; x.fillRect(sx, sy, cs, cs);
      if (this.combat.moveRange.some(p => p.x === c && p.y === r)) { x.fillStyle = C.move; x.fillRect(sx, sy, cs, cs); }
      if (this.combat.attackRange.some(p => p.x === c && p.y === r)) { x.fillStyle = C.atk; x.fillRect(sx, sy, cs, cs); }
    }
    this.combat.units.filter(u => u.hp > 0).forEach(u => {
      const ux = ox + u.x * cs + cs / 2, uy = oy + u.y * cs + cs / 2;
      x.beginPath(); x.arc(ux, uy, cs * 0.35, 0, Math.PI * 2);
      x.fillStyle = u.side === 'player' ? C.blue : C.red; x.fill();
      if (this.bUnit === u.id) { x.strokeStyle = C.sel; x.lineWidth = 3; x.stroke(); }
      x.font = Math.floor(cs * 0.22) + 'px "Microsoft YaHei",serif'; x.fillStyle = '#fff';
      x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText((u.name || '兵').substring(0, 3), ux, uy);
      const bw = cs * 0.6, bh = 4, bx = ux - bw / 2, byy = uy + cs * 0.35 + 4;
      x.fillStyle = C.hpBg; x.fillRect(bx, byy, bw, bh);
      x.fillStyle = u.hp / u.maxHp > 0.3 ? C.hp : C.red; x.fillRect(bx, byy, bw * (u.hp / u.maxHp), bh);
    });
    x.fillStyle = C.panel; x.fillRect(0, 0, this.w, 55);
    x.font = 'bold 18px "Microsoft YaHei",serif'; x.fillStyle = C.gold; x.textAlign = 'center';
    x.fillText('⚔️ 回合 ' + (this.combat.turnNumber + 1) + ' - ' + (this.combat.currentTurn === 'player' ? '我方行动' : '敌方行动'), this.w / 2, 20);
    x.font = '14px "Microsoft YaHei",serif'; x.fillStyle = C.text;
    x.fillText('我方: ' + this.combat.getAliveUnits('player').length + ' | 敌方: ' + this.combat.getAliveUnits('enemy').length, this.w / 2, 42);
    const lx = this.w - 280, ly = this.h - 200;
    x.fillStyle = 'rgba(0,0,0,0.6)'; this.rr(x, lx, ly, 270, 190, 8); x.fill();
    x.font = '12px "Microsoft YaHei",serif'; x.fillStyle = C.dim; x.textAlign = 'left';
    this.combat.combatLog.slice(-8).forEach((l, i) => x.fillText(l.message, lx + 10, ly + 20 + i * 22));
    if (this.combat.result) {
      x.fillStyle = 'rgba(0,0,0,0.7)'; x.fillRect(0, 0, this.w, this.h);
      x.font = 'bold 48px "Microsoft YaHei",serif'; x.fillStyle = this.combat.result.winner === 'player' ? C.green : C.red;
      x.textAlign = 'center'; x.fillText(this.combat.result.text, this.w / 2, this.h / 2 - 30);
      x.font = '20px "Microsoft YaHei",serif'; x.fillStyle = C.text; x.fillText('点击任意处返回', this.w / 2, this.h / 2 + 30);
      if (this.mouse.click) { this.scene = 'map'; this.combat.result = null; if (this.combat.result?.winner === 'player') gameState.addExp(50); }
    }
    if (this.mouse.click && !this.combat.result && this.combat.currentTurn === 'player') {
      const col = Math.floor((this.mouse.x - ox) / cs), row = Math.floor((this.mouse.y - oy) / cs);
      if (col >= 0 && col < this.combat.gridWidth && row >= 0 && row < this.combat.gridHeight) {
        const cu = this.combat.getUnit(col, row);
        if (this.bAction === 'select') {
          if (cu && cu.side === 'player' && !cu.moved) {
            this.bUnit = cu.id; this.combat.moveRange = this.combat.calculateMoveRange(cu);
            this.combat.attackRange = this.combat.calculateAttackRange(cu); this.bAction = 'move';
          }
        } else if (this.bAction === 'move') {
          if (cu && cu.side === 'enemy') {
            const atk = this.combat.units.find(u => u.id === this.bUnit);
            if (atk) this.combat.attack(atk, cu);
            this.bAction = 'select'; this.bUnit = null; this.combat.moveRange = []; this.combat.attackRange = [];
          } else if (this.combat.moveRange.some(p => p.x === col && p.y === row)) {
            const u = this.combat.units.find(u2 => u2.id === this.bUnit);
            if (u) { this.combat.moveUnit(u, col, row); this.combat.moveRange = []; this.combat.attackRange = this.combat.calculateAttackRange(u); this.bAction = this.combat.attackRange.length > 0 ? 'attack' : 'select'; if (this.bAction === 'select') this.bUnit = null; }
          } else { this.bAction = 'select'; this.bUnit = null; this.combat.moveRange = []; this.combat.attackRange = []; }
        } else if (this.bAction === 'attack') {
          if (cu && cu.side === 'enemy') { const atk = this.combat.units.find(u => u.id === this.bUnit); if (atk) this.combat.attack(atk, cu); }
          this.bAction = 'select'; this.bUnit = null; this.combat.moveRange = []; this.combat.attackRange = [];
        }
        if (!this.combat.result && !this.combat.getAliveUnits('player').some(u => !u.moved || !u.attacked)) {
          this.combat.endTurn(); setTimeout(() => this.combat.processEnemyTurn(), 500);
        }
      }
    }
  }

  // === DIALOGUE ===
  _rDlg(x) {
    x.fillStyle = '#0a0500'; x.fillRect(0, 0, this.w, this.h);
    const g = x.createLinearGradient(0, 0, this.w, this.h);
    g.addColorStop(0, '#1a1020'); g.addColorStop(0.5, '#2d1810'); g.addColorStop(1, '#0a0500');
    x.fillStyle = g; x.fillRect(0, 0, this.w, this.h);
    const bh = 200, by = this.h - bh - 20;
    this._panel(x, 40, by, this.w - 80, bh);
    x.font = 'bold 20px "Microsoft YaHei",serif'; x.fillStyle = C.gold; x.textAlign = 'left';
    x.fillText(this.dlgSpeaker || '???', 70, by + 35);
    x.font = '18px "Microsoft YaHei",serif'; x.fillStyle = C.text;
    const dlgLines = (this.dlgText || '').match(/.{1,40}/g) || [];
    dlgLines.forEach((l, i) => x.fillText(l, 70, by + 70 + i * 28));
    x.font = '14px "Microsoft YaHei",serif'; x.fillStyle = C.dim; x.textAlign = 'center';
    x.fillText('点击继续...', this.w / 2, by + bh - 20);
    if (this.mouse.click) this.scene = 'map';
  }

  // === QUEST ===
  _rQuest(x) {
    x.fillStyle = C.bg; x.fillRect(0, 0, this.w, this.h);
    this._panel(x, 40, 40, this.w - 80, this.h - 80);
    x.save(); x.textAlign = 'center'; x.textBaseline = 'middle';
    x.font = 'bold 28px "Microsoft YaHei",serif'; x.fillStyle = C.gold;
    x.fillText('📜 任务', this.w / 2, 80); x.restore();
    x.font = '18px "Microsoft YaHei",serif'; x.fillStyle = C.text; x.textAlign = 'left';
    x.fillText('当前主线: ' + gameState.currentMainQuest, 70, 120);
    let yy = 160;
    x.fillStyle = C.gold; x.font = 'bold 16px "Microsoft YaHei",serif';
    x.fillText('进行中的任务:', 70, yy); yy += 30;
    gameState.activeQuests.forEach(qid => { x.font = '15px "Microsoft YaHei",serif'; x.fillStyle = C.text; x.fillText('• ' + qid, 90, yy); yy += 25; });
    if (gameState.activeQuests.length === 0) { x.font = '14px "Microsoft YaHei",serif'; x.fillStyle = C.dim; x.fillText('暂无进行中的任务', 90, yy); }
    yy += 30; x.fillStyle = C.gold; x.font = 'bold 16px "Microsoft YaHei",serif';
    x.fillText('已完成: ' + gameState.completedQuests.length, 70, yy);
    if (this._btn(x, this.w / 2 - 60, this.h - 100, 120, 40, '返回')) this.scene = 'map';
  }

  // === CG GALLERY ===
  _rCG(x) {
    x.fillStyle = C.bg; x.fillRect(0, 0, this.w, this.h);
    this._panel(x, 40, 40, this.w - 80, this.h - 80);
    x.save(); x.textAlign = 'center'; x.textBaseline = 'middle';
    x.font = 'bold 28px "Microsoft YaHei",serif'; x.fillStyle = C.gold;
    x.fillText('🖼️ CG 回忆', this.w / 2, 80); x.restore();
    const cols = 4, cw = (this.w - 160) / cols, ch2 = cw * 0.6;
    this.cgList.forEach((cgId, i) => {
      const col = i % cols, row = Math.floor(i / cols);
      const bx = 60 + col * cw, by = 120 + row * (ch2 + 15);
      if (by + ch2 > this.h - 100) return;
      const cg = CG_DATA[cgId]; const unlocked = gameState.unlockedCG.has(cgId);
      x.fillStyle = unlocked ? '#2d1810' : '#1a1a1a'; this.rr(x, bx, by, cw - 10, ch2, 8); x.fill();
      x.strokeStyle = unlocked ? C.gold : '#333'; x.lineWidth = 1; this.rr(x, bx, by, cw - 10, ch2, 8); x.stroke();
      x.font = '14px "Microsoft YaHei",serif'; x.fillStyle = unlocked ? C.text : C.dim;
      x.textAlign = 'center'; x.textBaseline = 'middle';
      x.fillText(unlocked ? cg.title : '???', bx + (cw - 10) / 2, by + ch2 / 2 - 10);
      x.font = '11px "Microsoft YaHei",serif';
      x.fillText(unlocked ? cg.description.substring(0, 12) : '未解锁', bx + (cw - 10) / 2, by + ch2 / 2 + 15);
    });
    if (this._btn(x, this.w / 2 - 60, this.h - 100, 120, 40, '返回')) this.scene = 'menu';
  }

  // === CHARACTER LIST ===
  _rChars(x) {
    x.fillStyle = C.bg; x.fillRect(0, 0, this.w, this.h);
    this._panel(x, 40, 40, this.w - 80, this.h - 80);
    x.save(); x.textAlign = 'center'; x.textBaseline = 'middle';
    x.font = 'bold 28px "Microsoft YaHei",serif'; x.fillStyle = C.gold;
    x.fillText('👥 角色 (' + gameState.stats.total + '人 | 女' + gameState.stats.female + ' 男' + gameState.stats.male + ')', this.w / 2, 80);
    x.restore();
    const nation = gameState.player.currentNation || 'loulan';
    const chars = Object.values(gameState.characters).filter(c => c.nation === nation).slice(0, 20);
    let yy = 120;
    x.font = 'bold 16px "Microsoft YaHei",serif'; x.fillStyle = C.gold; x.textAlign = 'left';
    x.fillText('当前地区: ' + (NATIONS[nation]?.name || nation), 70, yy); yy += 30;
    chars.forEach(ch => {
      x.font = '14px "Microsoft YaHei",serif';
      x.fillStyle = ch.gender === 'female' ? C.pink : C.blue;
      x.fillText((ch.gender === 'female' ? '♀' : '♂') + ' ' + ch.name + '（' + ch.title + '）', 90, yy);
      x.fillStyle = C.dim; x.font = '12px "Microsoft YaHei",serif';
      x.fillText('武' + ch.stats.military + ' 商' + ch.stats.economy + ' 外' + ch.stats.diplomacy, 400, yy);
      yy += 24; if (yy > this.h - 120) return;
    });
    if (this._btn(x, this.w / 2 - 60, this.h - 100, 120, 40, '返回')) this.scene = 'map';
  }
}

// ============================================
// BOOTSTRAP
// ============================================
const game = new Game();
const loadingBar = document.getElementById('loading-bar');
const loadingText = document.getElementById('loading-text');
let loadProgress = 0;
const loadInterval = setInterval(() => {
  loadProgress += Math.random() * 15 + 5;
  if (loadProgress >= 100) { loadProgress = 100; clearInterval(loadInterval); setTimeout(() => game.start(), 300); }
  if (loadingBar) loadingBar.style.width = loadProgress + '%';
  if (loadingText) {
    const msgs = ['加载西域地图...', '生成1000+角色...', '初始化国家关系...', '准备战斗系统...', '编织丝路故事...'];
    loadingText.textContent = msgs[Math.min(Math.floor(loadProgress / 25), msgs.length - 1)];
  }
}, 200);
