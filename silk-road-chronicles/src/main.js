/**
 * 西域群英传 v6.0 - Silk Road Chronicles (PixiJS WebGL)
 * City/Tribe level system, nation selection, event triggers
 * Strategy wargame with 3000+ characters
 */
import { PixiApp } from './engine/PixiApp.js';
import { generateAllCharacters, getCharacterStats } from './data/characters.js';
import { state } from './core/gameState.js';
import { showMenu } from './scenes/menuScene.js';
import { showNationSelect } from './scenes/nationSelectScene.js';
import { showOasisSelect } from './scenes/oasisScene.js';
import { showMap, handleMapClick } from './scenes/mapScene.js';
import { showTribe } from './scenes/tribeScene.js';
import { showMilitary } from './scenes/militaryScene.js';
import { showCommerce } from './scenes/commerceScene.js';
import { showDiplomacy } from './scenes/diplomacyScene.js';

class SilkRoadGame {
  constructor() {
    this.pixiApp = null;
    this.scene = 'loading';
    this.frame = 0;
    this.menuSel = 0;
    this.isDragging = false;
    this._mapRenderPending = false;
  }

  get app() { return this.pixiApp; }
  get w() { return this.pixiApp.width; }
  get h() { return this.pixiApp.height; }
  get ui() { return this.pixiApp.ui; }
  get mapRenderer() { return this.pixiApp.mapRenderer; }
  get particles() { return this.pixiApp.particles; }

  async init() {
    this.pixiApp = new PixiApp();
    await this.pixiApp.init();

    const chars = generateAllCharacters();
    state.characters = chars;
    state.stats = getCharacterStats(chars);

    this.mapRenderer.init(this.pixiApp.terrainLayer);
    this._setupInput();

    const loadEl = document.getElementById('loading-screen');
    if (loadEl) loadEl.classList.add('hidden');

    setTimeout(() => {
      this.scene = 'menu';
      this._showMenu();
    }, 300);
  }

  _requestMapRender() {
    if (this._mapRenderPending) return;
    this._mapRenderPending = true;
    requestAnimationFrame(() => {
      this._mapRenderPending = false;
      if (this.scene === 'map') {
        this.mapRenderer.render(this.pixiApp.terrainLayer, this.pixiApp.buildingLayer, this.w, this.h);
      }
    });
  }

  _setupInput() {
    const canvas = this.pixiApp.app.view;
    let lastPos = null;

    canvas.addEventListener('pointerdown', (e) => {
      lastPos = { x: e.clientX, y: e.clientY };
      this.isDragging = false;
    });

    canvas.addEventListener('pointermove', (e) => {
      if (lastPos && e.buttons > 0) {
        const dx = e.clientX - lastPos.x;
        const dy = e.clientY - lastPos.y;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) this.isDragging = true;
        if (this.scene === 'map') {
          this.mapRenderer.updateCamera(-dx, -dy);
          this._requestMapRender();
        }
        lastPos = { x: e.clientX, y: e.clientY };
      }
    });

    canvas.addEventListener('pointerup', (e) => {
      if (!this.isDragging && this.scene === 'map') {
        handleMapClick(this, e.clientX, e.clientY);
      }
      lastPos = null;
    });

    canvas.addEventListener('wheel', (e) => {
      if (this.scene === 'map') {
        e.preventDefault();
        const zoomDelta = e.deltaY > 0 ? -0.08 : 0.08;
        this.mapRenderer.setZoom(zoomDelta, e.clientX, e.clientY);
        this._requestMapRender();
      }
    }, { passive: false });

    document.addEventListener('keydown', (e) => {
      if (this.scene === 'menu') {
        if (e.key === 'ArrowUp') this.menuSel = Math.max(0, this.menuSel - 1);
        if (e.key === 'ArrowDown') this.menuSel = Math.min(3, this.menuSel + 1);
        if (e.key === 'Enter') this._menuAction(this.menuSel);
      }
      if (e.key === 'Escape') this._showMap();
      if (this.scene === 'map') {
        const s = 24;
        if (e.key === 'w') this.mapRenderer.updateCamera(0, -s);
        if (e.key === 's') this.mapRenderer.updateCamera(0, s);
        if (e.key === 'a') this.mapRenderer.updateCamera(-s, 0);
        if (e.key === 'd') this.mapRenderer.updateCamera(s, 0);
        this._requestMapRender();
      }
    });
  }

  _clearUI() {
    this.ui.clear();
    this.pixiApp.terrainLayer.removeChildren();
    this.pixiApp.buildingLayer.removeChildren();
    this.pixiApp.bgLayer.removeChildren();
  }

  // Scene delegates
  _showMenu() { showMenu(this); }
  _menuAction(i) {
    if (i === 0) this._showNationSelect();
    else if (i === 1) this._showMap();
  }
  _showNationSelect() { showNationSelect(this); }
  _showOasisSelect() { showOasisSelect(this); }
  _showMap() { showMap(this); }
  _showTribe() { showTribe(this); }
  _showMilitary() { showMilitary(this); }
  _showCommerce() { showCommerce(this); }
  _showDiplomacy() { showDiplomacy(this); }
}

// Bootstrap
console.log('[Bootstrap] Starting Silk Road Chronicles v6.0...');
const game = new SilkRoadGame();
game.init().then(() => {
  console.log('[Bootstrap] Game initialized successfully!');
}).catch(err => {
  console.error('[Bootstrap] Game init failed:', err);
  const loadEl = document.getElementById('loading-text');
  if (loadEl) loadEl.textContent = 'Error: ' + err.message;
  const loadScreen = document.getElementById('loading-screen');
  if (loadScreen) loadScreen.style.background = 'radial-gradient(ellipse at center, #2a0505 0%, #0a0505 70%)';
});