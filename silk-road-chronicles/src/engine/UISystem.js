/**
 * Ancient Chinese UI System v5.0 - PixiJS WebGL
 * Silk-textured panels, gold ornate borders, brush-stroke style
 */
import * as PIXI from 'pixi.js';

const GOLD = 0xD4A853;
const DARK_GOLD = 0x8B7355;
const SILK = 0x2C1810;
const SILK_LIGHT = 0x4a2c1a;
const JADE = 0x2E8B57;
const CRIMSON = 0xDC143C;

export class AncientUI {
  constructor(uiLayer, dialogLayer, w, h) {
    this.uiLayer = uiLayer;
    this.dialogLayer = dialogLayer;
    this.w = w;
    this.h = h;
    this.buttons = [];
    this.panels = [];
    this.tooltip = null;
  }

  resize(w, h) {
    this.w = w; this.h = h;
  }

  // === Panel with silk texture and gold border ===
  createPanel(x, y, w, h, title, opts = {}) {
    const container = new PIXI.Container();
    container.position.set(x, y);

    const g = new PIXI.Graphics();
    // Silk background with gradient effect
    g.beginFill(opts.bgColor || SILK, opts.bgAlpha || 0.92);
    g.drawRoundedRect(0, 0, w, h, 8);
    g.endFill();

    // Inner silk texture pattern
    g.beginFill(SILK_LIGHT, 0.15);
    for (let py = 10; py < h - 10; py += 12) {
      g.drawRect(8, py, w - 16, 1);
    }
    g.endFill();

    // Gold border - outer
    g.lineStyle(3, GOLD, 0.9);
    g.drawRoundedRect(0, 0, w, h, 8);

    // Gold border - inner
    g.lineStyle(1, GOLD, 0.4);
    g.drawRoundedRect(4, 4, w - 8, h - 8, 6);

    // Corner ornaments
    const cs = 15;
    g.lineStyle(2, GOLD, 0.8);
    [[0, 0], [w - cs, 0], [0, h - cs], [w - cs, h - cs]].forEach(([cx, cy]) => {
      g.moveTo(cx + cs / 2, cy); g.lineTo(cx + cs, cy + cs / 2);
      g.moveTo(cx + cs / 2, cy + cs); g.lineTo(cx, cy + cs / 2);
      g.beginFill(GOLD, 0.6); g.drawCircle(cx + cs / 2, cy + cs / 2, 3); g.endFill();
    });

    container.addChild(g);

    // Title bar
    if (title) {
      const titleBg = new PIXI.Graphics();
      titleBg.beginFill(DARK_GOLD, 0.3);
      titleBg.drawRoundedRect(10, 6, w - 20, 28, 4);
      titleBg.endFill();
      container.addChild(titleBg);

      const titleText = new PIXI.Text(title, {
        fontFamily: 'serif', fontSize: 16, fill: GOLD,
        fontWeight: 'bold', align: 'center',
        stroke: 0x000000, strokeThickness: 1
      });
      titleText.anchor.set(0.5, 0);
      titleText.position.set(w / 2, 8);
      container.addChild(titleText);
    }

    this.uiLayer.addChild(container);
    this.panels.push(container);
    return container;
  }

  // === Ancient-style button ===
  createButton(x, y, w, h, text, onClick, opts = {}) {
    const container = new PIXI.Container();
    container.position.set(x, y);
    container.eventMode = 'static';
    container.cursor = 'pointer';

    const g = new PIXI.Graphics();
    const color = opts.color || DARK_GOLD;
    const hoverColor = opts.hoverColor || GOLD;

    // Button background
    g.beginFill(color, 0.85);
    g.drawRoundedRect(0, 0, w, h, 5);
    g.endFill();
    g.lineStyle(2, GOLD, 0.7);
    g.drawRoundedRect(0, 0, w, h, 5);

    // Inner decoration line
    g.lineStyle(1, GOLD, 0.3);
    g.drawRoundedRect(3, 3, w - 6, h - 6, 3);

    container.addChild(g);

    const label = new PIXI.Text(text, {
      fontFamily: 'serif', fontSize: opts.fontSize || 14,
      fill: opts.textColor || 0xF0E68C,
      fontWeight: 'bold', align: 'center',
      stroke: 0x000000, strokeThickness: 1
    });
    label.anchor.set(0.5);
    label.position.set(w / 2, h / 2);
    container.addChild(label);

    // Hover effects
    container.on('pointerover', () => {
      g.clear();
      g.beginFill(hoverColor, 0.95);
      g.drawRoundedRect(0, 0, w, h, 5);
      g.endFill();
      g.lineStyle(2, 0xFFD700, 1);
      g.drawRoundedRect(0, 0, w, h, 5);
      g.lineStyle(1, 0xFFD700, 0.5);
      g.drawRoundedRect(3, 3, w - 6, h - 6, 3);
      label.style.fill = 0xFFFFFF;
      container.scale.set(1.05);
    });
    container.on('pointerout', () => {
      g.clear();
      g.beginFill(color, 0.85);
      g.drawRoundedRect(0, 0, w, h, 5);
      g.endFill();
      g.lineStyle(2, GOLD, 0.7);
      g.drawRoundedRect(0, 0, w, h, 5);
      g.lineStyle(1, GOLD, 0.3);
      g.drawRoundedRect(3, 3, w - 6, h - 6, 3);
      label.style.fill = opts.textColor || 0xF0E68C;
      container.scale.set(1);
    });
    if (onClick) container.on('pointerdown', onClick);

    this.uiLayer.addChild(container);
    this.buttons.push(container);
    return container;
  }

  // === Text label ===
  createText(x, y, text, opts = {}) {
    const t = new PIXI.Text(text, {
      fontFamily: opts.fontFamily || 'serif',
      fontSize: opts.fontSize || 14,
      fill: opts.fill || GOLD,
      fontWeight: opts.bold ? 'bold' : 'normal',
      align: opts.align || 'left',
      stroke: opts.stroke || 0x000000,
      strokeThickness: opts.strokeThickness || 1,
      wordWrap: opts.wordWrap ? true : false,
      wordWrapWidth: opts.wordWrapWidth || 300,
      lineHeight: opts.lineHeight || 20
    });
    t.position.set(x, y);
    if (opts.anchor) t.anchor.set(opts.anchor[0], opts.anchor[1]);
    this.uiLayer.addChild(t);
    return t;
  }

  // === Progress bar (silk style) ===
  createProgressBar(x, y, w, h, value, max, color) {
    const g = new PIXI.Graphics();
    // Background
    g.beginFill(0x1a1a1a, 0.7);
    g.drawRoundedRect(0, 0, w, h, 3);
    g.endFill();
    // Fill
    const fillW = Math.max(0, (value / max) * (w - 4));
    g.beginFill(color || JADE, 0.8);
    g.drawRoundedRect(2, 2, fillW, h - 4, 2);
    g.endFill();
    // Border
    g.lineStyle(1, GOLD, 0.5);
    g.drawRoundedRect(0, 0, w, h, 3);

    g.position.set(x, y);
    this.uiLayer.addChild(g);
    return g;
  }

  // === Dialog box (bottom of screen, visual novel style) ===
  showDialog(speaker, text, portrait, onDismiss) {
    this.hideDialog();
    const container = new PIXI.Container();
    const dh = 180;
    const dy = this.h - dh - 10;

    // Background panel
    const g = new PIXI.Graphics();
    g.beginFill(SILK, 0.95);
    g.drawRoundedRect(20, dy, this.w - 40, dh, 10);
    g.endFill();
    g.lineStyle(3, GOLD, 0.8);
    g.drawRoundedRect(20, dy, this.w - 40, dh, 10);
    g.lineStyle(1, GOLD, 0.3);
    g.drawRoundedRect(24, dy + 4, this.w - 48, dh - 8, 8);
    container.addChild(g);

    // Portrait
    if (portrait) {
      const pContainer = new PIXI.Container();
      const pBg = new PIXI.Graphics();
      pBg.beginFill(0x1a0e05, 0.8);
      pBg.drawRoundedRect(0, 0, 140, 160, 6);
      pBg.endFill();
      pBg.lineStyle(2, GOLD, 0.6);
      pBg.drawRoundedRect(0, 0, 140, 160, 6);
      pContainer.addChild(pBg);
      portrait.width = 130; portrait.height = 150;
      portrait.position.set(70, 80);
      portrait.anchor.set(0.5);
      pContainer.addChild(portrait);
      pContainer.position.set(35, dy + 10);
      container.addChild(pContainer);
    }

    // Speaker name
    if (speaker) {
      const nameBg = new PIXI.Graphics();
      nameBg.beginFill(DARK_GOLD, 0.6);
      nameBg.drawRoundedRect(190, dy + 8, 120, 26, 4);
      nameBg.endFill();
      nameBg.lineStyle(1, GOLD, 0.5);
      nameBg.drawRoundedRect(190, dy + 8, 120, 26, 4);
      container.addChild(nameBg);

      const nameText = new PIXI.Text(speaker, {
        fontFamily: 'serif', fontSize: 15, fill: 0xFFD700,
        fontWeight: 'bold', align: 'center',
        stroke: 0x000000, strokeThickness: 1
      });
      nameText.anchor.set(0.5);
      nameText.position.set(250, dy + 21);
      container.addChild(nameText);
    }

    // Dialog text
    const dialogText = new PIXI.Text(text, {
      fontFamily: 'serif', fontSize: 16, fill: 0xF0E68C,
      lineHeight: 24, wordWrap: true,
      wordWrapWidth: this.w - (portrait ? 280 : 80),
      stroke: 0x000000, strokeThickness: 0.5
    });
    dialogText.position.set(portrait ? 190 : 50, dy + 42);
    container.addChild(dialogText);

    // Click to dismiss
    container.eventMode = 'static';
    if (onDismiss) container.on('pointerdown', onDismiss);

    this.dialogLayer.addChild(container);
    this._activeDialog = container;
    return container;
  }

  hideDialog() {
    if (this._activeDialog) {
      this._activeDialog.destroy({ children: true });
      this._activeDialog = null;
    }
  }

  // === Top bar (resources, turn info) ===
  createTopBar(state) {
    const bar = new PIXI.Container();
    const g = new PIXI.Graphics();
    g.beginFill(SILK, 0.9);
    g.drawRect(0, 0, this.w, 40);
    g.endFill();
    g.lineStyle(1, GOLD, 0.5);
    g.moveTo(0, 40); g.lineTo(this.w, 40);
    bar.addChild(g);

    const items = [
      { label: '回合', value: `${state.turn}` },
      { label: '金币', value: `${state.player.gold}` },
      { label: '等级', value: `Lv.${state.player.level}` },
      { label: '粮食', value: `${state.resources.food}` },
      { label: '兵力', value: `${state.army.infantry}` },
    ];

    let xOff = 20;
    items.forEach(item => {
      const t = new PIXI.Text(`${item.label}: ${item.value}`, {
        fontFamily: 'serif', fontSize: 13, fill: GOLD,
        stroke: 0x000000, strokeThickness: 1
      });
      t.position.set(xOff, 12);
      bar.addChild(t);
      xOff += 140;
    });

    this.uiLayer.addChild(bar);
    return bar;
  }

  // === Mini map ===
  createMiniMap(x, y, size, mapRenderer) {
    const container = new PIXI.Container();
    container.position.set(x, y);

    const g = new PIXI.Graphics();
    g.beginFill(SILK, 0.9);
    g.drawRoundedRect(0, 0, size, size, 6);
    g.endFill();
    g.lineStyle(2, GOLD, 0.7);
    g.drawRoundedRect(0, 0, size, size, 6);

    // Draw simplified terrain
    const scale = size / 100;
    for (let ty = 0; ty < 100; ty += 2) {
      for (let tx = 0; tx < 100; tx += 2) {
        const tile = mapRenderer.mapData?.[ty]?.[tx];
        if (!tile) continue;
        let color = 0xC8A850; // default desert
        if (tile.type === 'water' || tile.type === 'deep_water') color = 0x2e86c1;
        else if (tile.type === 'mountain' || tile.type === 'snow') color = 0x8e9eab;
        else if (tile.type === 'grass' || tile.type === 'oasis') color = 0x27ae60;
        else if (tile.type === 'forest') color = 0x1e8449;
        else if (tile.type === 'city') color = 0xFF4444;
        g.beginFill(color, 0.7);
        g.drawRect(tx * scale, ty * scale, 2 * scale, 2 * scale);
        g.endFill();
      }
    }

    // Player position
    g.beginFill(0xFFD700, 1);
    g.drawCircle(48 * scale, 48 * scale, 3);
    g.endFill();

    container.addChild(g);
    this.uiLayer.addChild(container);
    return container;
  }

  clear() {
    this.buttons.forEach(b => b.destroy({ children: true }));
    this.panels.forEach(p => p.destroy({ children: true }));
    this.buttons = [];
    this.panels = [];
    this.uiLayer.removeChildren();
    this.dialogLayer.removeChildren();
    this._activeDialog = null;
  }
}