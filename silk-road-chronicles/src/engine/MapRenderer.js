/**
 * Map Renderer v10 - Triple View with double-buffer
 */
import * as PIXI from 'pixi.js';
import { NATIONS } from '../data/nations.js';
import { TILE_W, TILE_H, MAP_W, MAP_H, _ng, TC, terrainType, genHeight,
  PASSES, PORTS, TRIBES, GEO_LABELS, RIVERS, SILK_ROADS, CITY_ROADS } from './mapData.js';

export class MapRenderer {
  constructor() {
    this.container = null;
    this.heightMap = genHeight();
    this.camX = 0; this.camY = 0; this.zoom = 1;
    this.waterFrame = 0;
    this.viewMode = 'strategy';
    this._bufT = new PIXI.Container();
    this._bufB = new PIXI.Container();
    this._frontT = null; this._frontB = null;
    this._dirty = true;
  }

  init(c) { this.container = c; }
  _h(x, y) { return (y < 0 || y >= MAP_H || x < 0 || x >= MAP_W) ? 0 : this.heightMap[y][x]; }
  _ho(x, y) { return Math.max(0, this._h(x, y)) * 3; }
  _toScr(tx, ty, ho = 0) {
    const z = this.zoom;
    return { x: (tx - ty) * TILE_W / 2 * z - this.camX, y: (tx + ty) * TILE_H / 2 * z - this.camY - ho * z };
  }
  _curve(g, pts, ox, oy) {
    if (pts.length < 2) return;
    g.moveTo(pts[0].x + ox, pts[0].y + oy);
    if (pts.length === 2) { g.lineTo(pts[1].x + ox, pts[1].y + oy); return; }
    for (let i = 1; i < pts.length - 1; i++)
      g.quadraticCurveTo(pts[i].x + ox, pts[i].y + oy, (pts[i].x + pts[i + 1].x) / 2 + ox, (pts[i].y + pts[i + 1].y) / 2 + oy);
    g.lineTo(pts[pts.length - 1].x + ox, pts[pts.length - 1].y + oy);
  }

  setViewMode(m) { if (this.viewMode !== m) { this.viewMode = m; this._dirty = true; } }
  invalidate() { this._dirty = true; }

  render(tL, bL, vW, vH) {
    if (!this._dirty) return;
    this._dirty = false;
    this._bufT.removeChildren(); this._bufB.removeChildren();
    if (this.viewMode === 'strategy') this._renderStrategy(vW, vH);
    else if (this.viewMode === 'territory') this._renderTerritory(vW, vH);
    else this._renderLandscape(vW, vH);
    if (this._frontT) { tL.removeChild(this._frontT); bL.removeChild(this._frontB); }
    tL.addChild(this._bufT); bL.addChild(this._bufB);
    this._frontT = this._bufT; this._frontB = this._bufB;
    this._bufT = new PIXI.Container(); this._bufB = new PIXI.Container();
  }

  _renderStrategy(vW, vH) {
    const g = new PIXI.Graphics(), z = this.zoom, tw = TILE_W / 2 * z, th = TILE_H / 2 * z;
    for (let y = 0; y < MAP_H; y++) for (let x = 0; x < MAP_W; x++) {
      const h = this.heightMap[y][x], ho = h > 0 ? h * 3 * z : 0;
      const sx = (x - y) * TILE_W / 2 * z - this.camX, sy = (x + y) * TILE_H / 2 * z - this.camY - ho;
      if (sx < -tw * 3 || sx > vW + tw * 3 || sy < -th * 10 || sy > vH + th * 6) continue;
      const tt = terrainType(x, y), c = TC[tt] || TC.desert;
      if (h > 1) { const sH = Math.min(h * 3, 35) * z;
        g.beginFill(c[1], .8); g.moveTo(sx + tw, sy); g.lineTo(sx + tw, sy + sH); g.lineTo(sx, sy + th + sH); g.lineTo(sx, sy + th); g.closePath(); g.endFill();
        g.beginFill(c[1], .6); g.moveTo(sx - tw, sy); g.lineTo(sx - tw, sy + sH); g.lineTo(sx, sy + th + sH); g.lineTo(sx, sy + th); g.closePath(); g.endFill(); }
      g.beginFill(c[0]); g.moveTo(sx, sy - th); g.lineTo(sx + tw, sy); g.lineTo(sx, sy + th); g.lineTo(sx - tw, sy); g.closePath(); g.endFill();
      g.beginFill(0xFFFFFF, h > 0 ? .08 : 0); g.moveTo(sx, sy - th); g.lineTo(sx + tw, sy); g.lineTo(sx, sy + th); g.closePath(); g.endFill();
      const nation = _ng[y * MAP_W + x];
      if (nation) { const nc = parseInt((nation.color || '#888').slice(1), 16); g.beginFill(nc, .15); g.moveTo(sx, sy - th); g.lineTo(sx + tw, sy); g.lineTo(sx, sy + th); g.lineTo(sx - tw, sy); g.closePath(); g.endFill(); }
      if (tt === 'water' || tt === 'deepwater') { g.beginFill(0xFFFFFF, .03 + Math.sin(this.waterFrame * .04 + x * .3 + y * .2) * .02); g.moveTo(sx, sy - th); g.lineTo(sx + tw, sy); g.lineTo(sx, sy + th); g.lineTo(sx - tw, sy); g.closePath(); g.endFill(); }
      if (h > 10) { const pH = (h - 8) * 2 * z; g.beginFill(0xFFFFFF, .85); g.moveTo(sx, sy - th - pH); g.lineTo(sx - 5 * z, sy - th + 2 * z); g.lineTo(sx + 5 * z, sy - th + 2 * z); g.closePath(); g.endFill(); }
      if (tt === 'forest' && (x + y) % 3 === 0) { g.beginFill(0x1B5E20); g.moveTo(sx, sy - th - 8 * z); g.lineTo(sx - 4 * z, sy - th); g.lineTo(sx + 4 * z, sy - th); g.closePath(); g.endFill(); }
      if (tt === 'desert' && (x + y) % 5 === 0) { g.beginFill(0xD4B060, .3); g.moveTo(sx - 3 * z, sy); g.lineTo(sx, sy - 4 * z); g.lineTo(sx + 3 * z, sy); g.closePath(); g.endFill(); }
    }
    this._bufT.addChild(g);
    this._drawBorders(this._bufT); this._drawRivers(this._bufT); this._drawRoads(this._bufT);
    this._drawPasses(this._bufB); this._drawPorts(this._bufB); this._drawTribes(this._bufB);
    this._drawCities(this._bufB); this._drawGeoLabels(this._bufB);
    this._addTitle(this._bufB, '🗺️ 策略地图', vW);
  }

  _renderTerritory(vW, vH) {
    const g = new PIXI.Graphics(), z = this.zoom, tw = TILE_W / 2 * z, th = TILE_H / 2 * z;
    g.beginFill(0x2C1810, 1); g.drawRect(0, 0, vW, vH); g.endFill();
    for (let y = 0; y < MAP_H; y++) for (let x = 0; x < MAP_W; x++) {
      const sx = (x - y) * TILE_W / 2 * z - this.camX, sy = (x + y) * TILE_H / 2 * z - this.camY;
      if (sx < -tw * 3 || sx > vW + tw * 3 || sy < -th * 3 || sy > vH + th * 3) continue;
      const nation = _ng[y * MAP_W + x], tt = terrainType(x, y);
      if (nation) { const nc = parseInt((nation.color || '#888').slice(1), 16);
        g.beginFill(nc, .7); g.moveTo(sx, sy - th); g.lineTo(sx + tw, sy); g.lineTo(sx, sy + th); g.lineTo(sx - tw, sy); g.closePath(); g.endFill(); }
      else { const tc = TC[tt] || TC.desert; g.beginFill(tc[0], .3); g.moveTo(sx, sy - th); g.lineTo(sx + tw, sy); g.lineTo(sx, sy + th); g.lineTo(sx - tw, sy); g.closePath(); g.endFill(); }
      if (tt === 'water' || tt === 'deepwater') { g.beginFill(0x2980B9, .5); g.moveTo(sx, sy - th); g.lineTo(sx + tw, sy); g.lineTo(sx, sy + th); g.lineTo(sx - tw, sy); g.closePath(); g.endFill(); }
    }
    this._bufT.addChild(g);
    const bg = new PIXI.Graphics();
    Object.values(NATIONS || {}).forEach(n => { if (!n.territory?.length) return;
      const nc = parseInt((n.color || '#888').slice(1), 16); bg.lineStyle(3 * z, nc, .95);
      n.territory.forEach(t => { const p = this._toScr(t.x, t.y, 0), tw2 = TILE_W / 2 * z, th2 = TILE_H / 2 * z;
        const edge = (dx, dy) => { const nn = _ng[(t.y + dy) * MAP_W + (t.x + dx)]; return !nn || nn.id !== n.id; };
        if (edge(1, 0)) { bg.moveTo(p.x + tw2, p.y); bg.lineTo(p.x, p.y + th2); }
        if (edge(-1, 0)) { bg.moveTo(p.x - tw2, p.y); bg.lineTo(p.x, p.y + th2); }
        if (edge(0, -1)) { bg.moveTo(p.x - tw2, p.y); bg.lineTo(p.x, p.y - th2); }
        if (edge(0, 1)) { bg.moveTo(p.x + tw2, p.y); bg.lineTo(p.x, p.y - th2); }
      }); });
    this._bufT.addChild(bg);
    const rg = new PIXI.Graphics(); for (const r of RIVERS) { rg.lineStyle(r.w * z, 0x2980B9, .6); this._curve(rg, r.pts.map(p => this._toScr(p.x, p.y, 0)), 0, 0); } this._bufT.addChild(rg);
    const sg = new PIXI.Graphics(); for (const r of SILK_ROADS) { sg.lineStyle(r.w * z, r.color, .5); this._curve(sg, r.pts.map(p => this._toScr(p.x, p.y, 0)), 0, 0); } this._bufT.addChild(sg);
    Object.values(NATIONS || {}).forEach(n => { if (!n.capital) return;
      const pos = this._toScr(n.capital.x, n.capital.y, 8), nc = parseInt((n.color || '#FFD700').slice(1), 16), s = z;
      const cg = new PIXI.Graphics(); cg.beginFill(nc, .9); cg.drawCircle(pos.x, pos.y, 10 * s); cg.endFill();
      if (n.isAllFemale) { cg.beginFill(0xFF69B4, .9); cg.drawCircle(pos.x + 8 * s, pos.y - 8 * s, 4 * s); cg.endFill(); }
      this._bufB.addChild(cg);
      const t = new PIXI.Text(n.name, { fontFamily: 'serif', fontSize: Math.max(12, 15 * z), fill: 0xFFFFFF, stroke: 0x000000, strokeThickness: 3, fontWeight: 'bold' });
      t.anchor.set(.5); t.position.set(pos.x, pos.y - 18 * s); this._bufB.addChild(t);
      const st = new PIXI.Text('⚔' + (n.military || 0) + ' 💰' + (n.economy || 0), { fontSize: Math.max(9, 10 * z), fill: 0xDDDDDD, stroke: 0x000000, strokeThickness: 1 });
      st.anchor.set(.5); st.position.set(pos.x, pos.y + 14 * s); this._bufB.addChild(st);
    });
    this._drawGeoLabels(this._bufB);
    this._addTitle(this._bufB, '🗺️ 势力地图', vW);
  }

  _renderLandscape(vW, vH) {
    const g = new PIXI.Graphics(), z = this.zoom, tw = TILE_W / 2 * z, th = TILE_H / 2 * z;
    for (let i = 0; i < Math.min(vH, 200); i++) { const t = i / 200;
      g.beginFill(((Math.floor(15 + t * 20)) << 16) | ((Math.floor(10 + t * 30)) << 8) | Math.floor(40 + t * 15), .5); g.drawRect(0, i, vW, 1); g.endFill(); }
    for (let y = 0; y < MAP_H; y++) for (let x = 0; x < MAP_W; x++) {
      const h = this.heightMap[y][x], ho = h > 0 ? h * 3 * z : 0;
      const sx = (x - y) * TILE_W / 2 * z - this.camX, sy = (x + y) * TILE_H / 2 * z - this.camY - ho;
      if (sx < -tw * 4 || sx > vW + tw * 4 || sy < -th * 12 || sy > vH + th * 8) continue;
      const tt = terrainType(x, y);
      let topC, sideC;
      switch (tt) {
        case 'deepwater': topC = 0x0e3d5c; sideC = 0x082840; break; case 'water': topC = 0x2471A3; sideC = 0x1a5276; break;
        case 'sand': topC = 0xE8D5A0; sideC = 0xC8A860; break; case 'desert': topC = 0xD4A853; sideC = 0xB08830; break;
        case 'grass': topC = 0x5DAE5E; sideC = 0x3D8B3E; break; case 'forest': topC = 0x1E7E34; sideC = 0x145A24; break;
        case 'mountain': topC = 0x7F8C8D; sideC = 0x566573; break; case 'snow': topC = 0xFDFEFE; sideC = 0xD5DBDB; break;
        case 'oasis': topC = 0x27AE60; sideC = 0x1E8449; break; default: topC = 0xD4A853; sideC = 0xB08830;
      }
      if (h > .5) { const sH = Math.min(h * 3, 40) * z;
        g.beginFill(sideC, .85); g.moveTo(sx + tw, sy); g.lineTo(sx + tw, sy + sH); g.lineTo(sx, sy + th + sH); g.lineTo(sx, sy + th); g.closePath(); g.endFill();
        g.beginFill(sideC, .65); g.moveTo(sx - tw, sy); g.lineTo(sx - tw, sy + sH); g.lineTo(sx, sy + th + sH); g.lineTo(sx, sy + th); g.closePath(); g.endFill(); }
      g.beginFill(topC); g.moveTo(sx, sy - th); g.lineTo(sx + tw, sy); g.lineTo(sx, sy + th); g.lineTo(sx - tw, sy); g.closePath(); g.endFill();
      g.beginFill(0xFFF8DC, h > 2 ? .12 : .04); g.moveTo(sx, sy - th); g.lineTo(sx + tw, sy); g.lineTo(sx, sy + th); g.closePath(); g.endFill();
      g.beginFill(0x000000, h > 2 ? .08 : .02); g.moveTo(sx, sy - th); g.lineTo(sx - tw, sy); g.lineTo(sx, sy + th); g.closePath(); g.endFill();
      if (tt === 'forest' && (x + y) % 2 === 0) { const tH = (6 + (x * 7 + y * 13) % 5) * z;
        g.beginFill(0x5D4037, .7); g.drawRect(sx - 1 * z, sy - th - tH + 3 * z, 2 * z, tH - 3 * z); g.endFill();
        g.beginFill(0x1B5E20, .85); g.moveTo(sx, sy - th - tH); g.lineTo(sx - 5 * z, sy - th - tH + 4 * z); g.lineTo(sx + 5 * z, sy - th - tH + 4 * z); g.closePath(); g.endFill(); }
      if (h > 8) { const pH = (h - 6) * 2.5 * z;
        g.beginFill(0xFFFFFF, .9); g.moveTo(sx, sy - th - pH); g.lineTo(sx - 6 * z, sy - th + 2 * z); g.lineTo(sx + 6 * z, sy - th + 2 * z); g.closePath(); g.endFill();
        if ((x + y) % 7 === 0) { g.beginFill(0xFFFFFF, .6 + Math.sin(this.waterFrame * .1 + x) * .3); g.drawCircle(sx - 2 * z, sy - th - pH + 3 * z, 1.5 * z); g.endFill(); } }
      if (tt === 'oasis' && (x + y) % 4 === 0) { const pH = 10 * z;
        g.beginFill(0x6D4C41, .8); g.drawRect(sx - 1 * z, sy - th - pH, 2 * z, pH); g.endFill();
        g.beginFill(0x27AE60, .8); for (let a = 0; a < 5; a++) { const ang = (a / 5) * Math.PI * 2; g.drawEllipse(sx + Math.cos(ang) * 6 * z, sy - th - pH + Math.sin(ang) * 3 * z, 5 * z, 2 * z); } g.endFill(); }
      if (tt === 'water') { const wo = Math.sin(this.waterFrame * .05 + x * .4 + y * .3) * 2 * z;
        g.beginFill(0x85C1E9, .15); g.moveTo(sx - 3 * z, sy + wo); g.quadraticCurveTo(sx, sy - 2 * z + wo, sx + 3 * z, sy + wo); g.lineTo(sx + 3 * z, sy + 3 * z + wo); g.lineTo(sx - 3 * z, sy + 3 * z + wo); g.closePath(); g.endFill(); }
    }
    this._bufT.addChild(g);
    for (const r of RIVERS) { const pts = r.pts.map(p => this._toScr(p.x, p.y, this._ho(Math.floor(p.x), Math.floor(p.y))));
      const rg = new PIXI.Graphics(); rg.lineStyle(r.w * z + 2, 0x1a5276, .3); this._curve(rg, pts, 0, 0);
      rg.lineStyle(r.w * z, r.color, .85); this._curve(rg, pts, 0, 0); this._bufT.addChild(rg); }
    for (const r of SILK_ROADS) { const pts = r.pts.map(p => this._toScr(p.x, p.y, this._ho(Math.floor(p.x), Math.floor(p.y)) + 2));
      const sg = new PIXI.Graphics(); sg.lineStyle(r.w * z, r.color, .7); this._curve(sg, pts, 0, 0); this._bufT.addChild(sg); }
    this._drawCities(this._bufB); this._drawGeoLabels(this._bufB);
    this._addTitle(this._bufB, '🌄 实景地图', vW);
  }

  _drawBorders(layer) {
    const g = new PIXI.Graphics(), z = this.zoom;
    Object.values(NATIONS || {}).forEach(n => { if (!n.territory?.length) return;
      const nc = parseInt((n.color || '#888').slice(1), 16); g.lineStyle(2.5 * z, nc, .65);
      n.territory.forEach(t => { const p = this._toScr(t.x, t.y, this._ho(t.x, t.y)), tw2 = TILE_W / 2 * z, th2 = TILE_H / 2 * z;
        const edge = (dx, dy) => { const nn = _ng[(t.y + dy) * MAP_W + (t.x + dx)]; return !nn || nn.id !== n.id; };
        if (edge(1, 0)) { g.moveTo(p.x + tw2, p.y); g.lineTo(p.x, p.y + th2); }
        if (edge(-1, 0)) { g.moveTo(p.x - tw2, p.y); g.lineTo(p.x, p.y + th2); }
        if (edge(0, -1)) { g.moveTo(p.x - tw2, p.y); g.lineTo(p.x, p.y - th2); }
        if (edge(0, 1)) { g.moveTo(p.x + tw2, p.y); g.lineTo(p.x, p.y - th2); }
      }); }); layer.addChild(g);
  }

  _drawRivers(layer) {
    const g = new PIXI.Graphics(), z = this.zoom;
    for (const r of RIVERS) { const pts = r.pts.map(p => this._toScr(p.x, p.y, this._ho(Math.floor(p.x), Math.floor(p.y))));
      g.lineStyle(r.w * z + 4, 0x0a2a4a, .4); this._curve(g, pts, 2, 2);
      g.lineStyle(r.w * z, r.color, .8); this._curve(g, pts, 0, 0);
      if (r.np) { const np = this._toScr(r.np.x, r.np.y, this._ho(Math.floor(r.np.x), Math.floor(r.np.y)));
        const t = new PIXI.Text(r.name, { fontFamily: 'serif', fontSize: Math.max(10, 12 * z), fill: 0x85C1E9, stroke: 0x0a2a4a, strokeThickness: 2 });
        t.anchor.set(.5); t.position.set(np.x, np.y - 10 * z); layer.addChild(t); } }
    layer.addChild(g);
  }

  _drawRoads(layer) {
    const g = new PIXI.Graphics(), z = this.zoom;
    for (const r of SILK_ROADS) { const pts = r.pts.map(p => this._toScr(p.x, p.y, this._ho(Math.floor(p.x), Math.floor(p.y)) + 2));
      g.lineStyle(r.w * z + 2, 0x000000, .1); this._curve(g, pts, 1, 1);
      g.lineStyle(r.w * z, r.color, .65); this._curve(g, pts, 0, 0);
      if (r.np) { const np = this._toScr(r.np.x, r.np.y, this._ho(Math.floor(r.np.x), Math.floor(r.np.y)) + 2);
        const t = new PIXI.Text(r.name, { fontFamily: 'serif', fontSize: Math.max(9, 11 * z), fill: r.color, stroke: 0x000000, strokeThickness: 2, fontStyle: 'italic' });
        t.anchor.set(.5); t.position.set(np.x, np.y - 12 * z); layer.addChild(t); } }
    g.lineStyle(1.5 * z, 0x8B7355, .3);
    for (const r of CITY_ROADS) { const pts = r.pts.map(p => this._toScr(p.x, p.y, this._ho(Math.floor(p.x), Math.floor(p.y)) + 1)); g.moveTo(pts[0].x, pts[0].y); g.lineTo(pts[1].x, pts[1].y); }
    layer.addChild(g);
  }

  _drawPasses(layer) {
    const g = new PIXI.Graphics(), z = this.zoom;
    for (const p of PASSES) { const pos = this._toScr(p.x, p.y, this._ho(p.x, p.y) + 5), s = z;
      g.beginFill(0x6D4C41, .9); g.drawRect(pos.x - 8 * s, pos.y - 6 * s, 16 * s, 8 * s); g.endFill();
      g.beginFill(0x8D6E63, .95); g.drawRect(pos.x - 9 * s, pos.y - 12 * s, 5 * s, 6 * s); g.drawRect(pos.x - 2 * s, pos.y - 14 * s, 5 * s, 8 * s); g.drawRect(pos.x + 5 * s, pos.y - 12 * s, 5 * s, 6 * s); g.endFill();
      const t = new PIXI.Text(p.name, { fontFamily: 'serif', fontSize: Math.max(11, 14 * z), fill: 0xDEB887, stroke: 0x000000, strokeThickness: 2, fontWeight: 'bold' });
      t.anchor.set(.5); t.position.set(pos.x, pos.y - 20 * s); layer.addChild(t); }
    layer.addChild(g);
  }

  _drawPorts(layer) {
    const g = new PIXI.Graphics(), z = this.zoom;
    for (const p of PORTS) { const pos = this._toScr(p.x, p.y, this._ho(p.x, p.y) + 2), s = z;
      g.beginFill(0x8D6E63, .85); g.drawRect(pos.x - 7 * s, pos.y - 3 * s, 14 * s, 6 * s); g.endFill();
      g.beginFill(0xFFFFFF, .7); g.drawPolygon([pos.x, pos.y - 3 * s, pos.x, pos.y - 8 * s, pos.x + 3 * s, pos.y - 4 * s]); g.endFill();
      const t = new PIXI.Text(p.name, { fontFamily: 'serif', fontSize: Math.max(10, 12 * z), fill: 0x5DADE2, stroke: 0x000000, strokeThickness: 2 });
      t.anchor.set(.5); t.position.set(pos.x, pos.y - 14 * s); layer.addChild(t); }
    layer.addChild(g);
  }

  _drawTribes(layer) {
    const g = new PIXI.Graphics(), z = this.zoom;
    for (const t of TRIBES) { const pos = this._toScr(t.x, t.y, this._ho(t.x, t.y) + 1), s = z;
      const nc = parseInt((NATIONS && NATIONS[t.n] ? NATIONS[t.n].color : '#888').slice(1), 16);
      g.beginFill(nc, .9); g.drawPolygon([pos.x, pos.y - 12 * s, pos.x - 5 * s, pos.y - 5 * s, pos.x + 5 * s, pos.y - 5 * s]); g.endFill();
      g.beginFill(nc, .7); g.drawPolygon([pos.x - 5 * s, pos.y, pos.x - 3 * s, pos.y - 7 * s, pos.x + 3 * s, pos.y - 7 * s, pos.x + 5 * s, pos.y]); g.endFill();
      if (t.f) { g.beginFill(0xFF69B4, .8); g.drawCircle(pos.x + 5 * s, pos.y - 10 * s, 3 * s); g.endFill(); }
      const lt = new PIXI.Text(t.name, { fontFamily: 'serif', fontSize: Math.max(9, 10 * z), fill: t.f ? 0xFF69B4 : 0xCCBB99, stroke: 0x000000, strokeThickness: 1 });
      lt.anchor.set(.5); lt.position.set(pos.x, pos.y - 16 * s); layer.addChild(lt); }
    layer.addChild(g);
  }

  _drawCities(layer) {
    if (!NATIONS) return;
    const g = new PIXI.Graphics(), z = this.zoom;
    Object.values(NATIONS).forEach(n => { if (!n.capital) return;
      const h = this._h(n.capital.x, n.capital.y);
      const pos = this._toScr(n.capital.x, n.capital.y, Math.max(0, h) * 3 + 8);
      const nc = parseInt((n.color || '#FFD700').slice(1), 16), s = z;
      const wallR = 14 * s;
      g.beginFill(0x000000, .15); g.drawEllipse(pos.x + 2 * s, pos.y + 3 * s, wallR + 2 * s, wallR * .6 + 2 * s); g.endFill();
      g.beginFill(nc, .5); g.drawEllipse(pos.x, pos.y - 2 * s, wallR, wallR * .5); g.endFill();
      g.beginFill(nc, .75); g.drawEllipse(pos.x, pos.y, wallR, wallR * .55); g.endFill();
      g.lineStyle(2 * s, nc, .9); g.drawEllipse(pos.x, pos.y - 1 * s, wallR, wallR * .52); g.lineStyle(0);
      const towers = [[-1, -.4], [1, -.4], [-1, .3], [1, .3]];
      for (const [tx, ty] of towers) { const tpx = pos.x + tx * wallR * .85, tpy = pos.y + ty * wallR * .85;
        g.beginFill(nc, .9); g.drawRect(tpx - 3 * s, tpy - 8 * s, 6 * s, 10 * s); g.endFill();
        g.beginFill(nc, 1); g.drawRect(tpx - 4 * s, tpy - 10 * s, 2 * s, 3 * s); g.drawRect(tpx - .5 * s, tpy - 10 * s, 2 * s, 3 * s); g.endFill(); }
      g.beginFill(nc, .85); g.drawRect(pos.x - 6 * s, pos.y - 14 * s, 12 * s, 10 * s); g.endFill();
      g.beginFill(nc, .95); g.drawEllipse(pos.x, pos.y - 14 * s, 7 * s, 6 * s); g.endFill();
      g.lineStyle(1.5 * s, 0x5D4037, .8); g.moveTo(pos.x + 6 * s, pos.y - 14 * s); g.lineTo(pos.x + 6 * s, pos.y - 28 * s); g.lineStyle(0);
      g.beginFill(nc, .9); g.drawPolygon([pos.x + 6 * s, pos.y - 28 * s, pos.x + 14 * s, pos.y - 24 * s, pos.x + 6 * s, pos.y - 20 * s]); g.endFill();
      if (n.isAllFemale) { g.beginFill(0xFF69B4, .85); g.drawCircle(pos.x + 10 * s, pos.y - 20 * s, 5 * s); g.endFill();
        const ft = new PIXI.Text('♀', { fontSize: Math.max(9, 9 * z), fill: 0xFFFFFF, fontWeight: 'bold' }); ft.anchor.set(.5); ft.position.set(pos.x + 10 * s, pos.y - 20 * s); layer.addChild(ft); }
      const lt = new PIXI.Text(n.name, { fontFamily: 'serif', fontSize: Math.max(14, 18 * z), fill: 0xFFD700, stroke: 0x000000, strokeThickness: Math.max(2, 3 * z), fontWeight: 'bold' });
      lt.anchor.set(.5); lt.position.set(pos.x, pos.y - 32 * s); layer.addChild(lt);
    }); layer.addChild(g);
  }

  _drawGeoLabels(layer) {
    const z = this.zoom;
    for (const gl of GEO_LABELS) { const pos = this._toScr(gl.x, gl.y, this._ho(gl.x, gl.y));
      const t = new PIXI.Text(gl.text, { fontFamily: 'serif', fontSize: Math.max(11, Math.round(gl.size * z)), fill: gl.color || 0xCCCCCC, stroke: 0x000000, strokeThickness: 2, fontWeight: 'bold' });
      t.anchor.set(.5); t.position.set(pos.x, pos.y); t.alpha = gl.alpha || .6; layer.addChild(t); }
  }

  _addTitle(layer, text, vW) {
    const t = new PIXI.Text(text, { fontSize: 20, fill: 0xFFD700, stroke: 0x000000, strokeThickness: 3, fontWeight: 'bold' });
    t.anchor.set(.5); t.position.set(vW / 2, 25); layer.addChild(t);
  }

  updateCamera(dx, dy) { this.camX += dx; this.camY += dy; this._dirty = true; }
  centerOn(tx, ty) { const h = this._h(Math.floor(tx), Math.floor(ty));
    const sx = (tx - ty) * TILE_W / 2 * this.zoom, sy = (tx + ty) * TILE_H / 2 * this.zoom - Math.max(0, h) * 3 * this.zoom;
    this.camX = sx - window.innerWidth / 2; this.camY = sy - window.innerHeight / 2; this._dirty = true; }
  setZoom(delta, cx, cy) { const old = this.zoom; this.zoom = Math.max(.3, Math.min(2.5, this.zoom + delta));
    const r = this.zoom / old; this.camX = cx - (cx + this.camX) * r; this.camY = cy - (cy + this.camY) * r; this._dirty = true; }
  update(frame) { this.waterFrame = frame; }
  screenToTile(sx, sy) {
    const z = this.zoom, wx = (sx + this.camX) / z, wy = (sy + this.camY) / z;
    const tx = Math.floor((wx / (TILE_W / 2) + wy / (TILE_H / 2)) / 2);
    const ty = Math.floor((wy / (TILE_H / 2) - wx / (TILE_W / 2)) / 2);
    return { x: Math.max(0, Math.min(MAP_W - 1, tx)), y: Math.max(0, Math.min(MAP_H - 1, ty)) };
  }
}
