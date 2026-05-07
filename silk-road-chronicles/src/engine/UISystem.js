/**
 * Ancient Chinese UI System v6.0 - PixiJS WebGL
 * Fixed: text tracking, proper cleanup, toast notifications, scroll support
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
    this.texts = [];    // Track all text elements
    this.graphics = []; // Track all graphics (progress bars etc)
    this.tooltip = null;
    this._toastQueue = [];
    this._activeToast = null;
  }

  resize(w, h) {
    this.w = w; this.h = h;
  }

  // === Panel with silk texture and gold border ===
  createPanel(x, y, w, h, titleOrBg, opts = {}) {
    const container = new PIXI.Container();
    container.position.set(x, y);

    // Support passing bgColor as titleOrBg (number)
    let title = null;
    let bgColor = opts.bgColor || SILK;
    let bgAlpha = opts.bgAlpha || 0.92;
    if (typeof titleOrBg === 'string') title = titleOrBg;
    else if (typeof titleOrBg === 'number') bgColor = titleOrBg;

    const g = new PIXI.Graphics();
    g.beginFill(bgColor, bgAlpha);
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
      stroke: 0x000000, strokeThickness: 1,
      wordWrap: w > 60,
      wordWrapWidth: w - 10,
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

  // === Text label (tracked for cleanup) ===
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
    this.texts.push(t);  // Track for cleanup
    return t;
  }

  // === Progress bar (silk style) - tracked ===
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
    this.graphics.push(g);  // Track for cleanup
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

    // Click anywhere to dismiss
    container.eventMode = 'static';
    // Add a transparent hit area covering the whole dialog
    const hitArea = new PIXI.Graphics();
    hitArea.beginFill(0x000000, 0);
    hitArea.drawRect(20, dy, this.w - 40, dh);
    hitArea.endFill();
    hitArea.eventMode = 'static';
    hitArea.cursor = 'pointer';
    container.addChild(hitArea);

    if (onDismiss) {
      hitArea.on('pointerdown', onDismiss);
    }

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

  // === Toast notification (replaces alert) ===
  showToast(message, duration = 2500) {
    this._toastQueue.push({ message, duration });
    if (!this._activeToast) this._processToastQueue();
  }

  _processToastQueue() {
    if (this._toastQueue.length === 0) {
      this._activeToast = null;
      return;
    }

    const { message, duration } = this._toastQueue.shift();
    this._showToastInternal(message, duration);
  }

  _showToastInternal(message, duration) {
    // Remove previous toast
    if (this._activeToast) {
      this._activeToast.destroy({ children: true });
      this._activeToast = null;
    }

    const container = new PIXI.Container();
    const toastW = Math.min(this.w - 80, 500);
    const toastH = 50;
    const toastX = (this.w - toastW) / 2;
    const toastY = this.h / 2 - toastH / 2;

    // Background
    const g = new PIXI.Graphics();
    g.beginFill(0x1a1008, 0.95);
    g.drawRoundedRect(0, 0, toastW, toastH, 8);
    g.endFill();
    g.lineStyle(2, GOLD, 0.8);
    g.drawRoundedRect(0, 0, toastW, toastH, 8);
    container.addChild(g);

    // Text
    const text = new PIXI.Text(message, {
      fontFamily: 'serif', fontSize: 14, fill: 0xF0E68C,
      fontWeight: 'bold', align: 'center',
      stroke: 0x000000, strokeThickness: 1,
      wordWrap: true, wordWrapWidth: toastW - 20,
    });
    text.anchor.set(0.5);
    text.position.set(toastW / 2, toastH / 2);
    container.addChild(text);

    container.position.set(toastX, toastY);
    this.dialogLayer.addChild(container);
    this._activeToast = container;

    // Auto dismiss
    setTimeout(() => {
      if (this._activeToast === container) {
        container.destroy({ children: true });
        this._activeToast = null;
        this._processToastQueue();
      }
    }, duration);
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

    const totalArmy = state.totalArmy || (state.army ? Object.entries(state.army).filter(([k]) => k !== 'morale').reduce((s, [, v]) => s + (v || 0), 0) : 0);

    // Turn info with season
    let turnStr = `回合:${state.turn}`;
    if (state.turnInfo) {
      const ti = state.turnInfo;
      turnStr = `${ti.year}年${ti.monthName}(${ti.seasonName})`;
    }

    const items = [
      { label: turnStr, value: '' },
      { label: '金币', value: `${state.player.gold}` },
      { label: '等级', value: `Lv.${state.nationLevel || state.player.level}` },
      { label: '粮食', value: `${state.resources.food}` },
      { label: '兵力', value: `${totalArmy}` },
      { label: '奴隶', value: `${state.slaves?.total || 0}` },
      { label: '公民', value: `${state.citizens?.total || 0}` },
    ];

    let xOff = 15;
    items.forEach(item => {
      const displayText = item.value ? `${item.label}:${item.value}` : item.label;
      const t = new PIXI.Text(displayText, {
        fontFamily: 'serif', fontSize: 12, fill: GOLD,
        stroke: 0x000000, strokeThickness: 1
      });
      t.position.set(xOff, 13);
      bar.addChild(t);
      xOff += t.width + 20;
    });

    this.uiLayer.addChild(bar);
    this.panels.push(bar);
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

    // Draw simplified terrain from heightMap
    const hm = mapRenderer.heightMap;
    if (hm && hm.length > 0) {
      const mw = hm[0].length, mh = hm.length;
      const scaleX = size / mw, scaleY = size / mh;
      for (let ty = 0; ty < mh; ty += 2) {
        for (let tx = 0; tx < mw; tx += 2) {
          const h = hm[ty][tx];
          let color = 0xC8A850;
          if (h < -2) color = 0x1a5276;
          else if (h < 0) color = 0x2e86c1;
          else if (h > 10) color = 0xFDFEFE;
          else if (h > 5) color = 0x8e9eab;
          else if (h > 2) color = 0x6B8E5A;
          else if (h > 0.5) color = 0xD4A853;
          g.beginFill(color, 0.7);
          g.drawRect(tx * scaleX, ty * scaleY, 2 * scaleX, 2 * scaleY);
          g.endFill();
        }
      }
    }

    // Player position indicator
    g.beginFill(0xFFD700, 1);
    g.drawCircle(size / 2, size / 2, 3);
    g.endFill();

    container.addChild(g);
    this.uiLayer.addChild(container);
    this.panels.push(container);
    return container;
  }

  // === Clear ALL tracked UI elements ===
  clear() {
    // Destroy buttons
    this.buttons.forEach(b => b.destroy({ children: true }));
    this.buttons = [];

    // Destroy panels
    this.panels.forEach(p => p.destroy({ children: true }));
    this.panels = [];

    // Destroy texts
    this.texts.forEach(t => t.destroy({ children: true }));
    this.texts = [];

    // Destroy graphics (progress bars etc)
    this.graphics.forEach(g => g.destroy({ children: true }));
    this.graphics = [];

    // Clear any remaining children
    this.uiLayer.removeChildren();
    this.dialogLayer.removeChildren();
    this._activeDialog = null;
    this._activeToast = null;
    this._toastQueue = [];
  }
}