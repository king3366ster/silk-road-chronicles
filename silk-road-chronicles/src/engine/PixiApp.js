/**
 * PixiJS Application Shell v5.0
 * WebGL-powered rendering with filters, blend modes, and particle effects
 */
import * as PIXI from 'pixi.js';
import { PortraitRenderer } from './PortraitRenderer.js';
import { MapRenderer } from './MapRenderer.js';
import { ParticleSystem } from './ParticleSystem.js';
import { AncientUI } from './UISystem.js';

export class PixiApp {
  constructor() {
    this.app = null;
    this.scenes = {};
    this.currentScene = null;
    this.portrait = new PortraitRenderer();
    this.mapRenderer = new MapRenderer();
    this.particles = new ParticleSystem();
    this.ui = null;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.frame = 0;
    this.onReady = null;
  }

  async init() {
    this.app = new PIXI.Application({
      width: this.width,
      height: this.height,
      backgroundColor: 0x0a0500,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      powerPreference: 'high-performance',
    });

    document.getElementById('game-container').appendChild(this.app.view);
    this.app.view.style.position = 'absolute';
    this.app.view.style.top = '0';
    this.app.view.style.left = '0';

    // Create scene layers
    this.bgLayer = new PIXI.Container();       // Background/map
    this.terrainLayer = new PIXI.Container();   // Terrain tiles
    this.roadLayer = new PIXI.Container();      // Roads & rivers
    this.buildingLayer = new PIXI.Container();  // Buildings
    this.charLayer = new PIXI.Container();      // Characters on map
    this.particleLayer = new PIXI.Container();  // Particles
    this.uiLayer = new PIXI.Container();        // UI overlay
    this.dialogLayer = new PIXI.Container();    // Dialogs/modals

    this.app.stage.addChild(this.bgLayer);
    this.app.stage.addChild(this.terrainLayer);
    this.app.stage.addChild(this.roadLayer);
    this.app.stage.addChild(this.buildingLayer);
    this.app.stage.addChild(this.charLayer);
    this.app.stage.addChild(this.particleLayer);
    this.app.stage.addChild(this.uiLayer);
    this.app.stage.addChild(this.dialogLayer);

    this.ui = new AncientUI(this.uiLayer, this.dialogLayer, this.width, this.height);
    this.particles.init(this.particleLayer, this.width, this.height);

    // Global filters for atmosphere
    this.app.stage.filters = [];

    // Resize handler
    window.addEventListener('resize', () => this._resize());

    // Ticker
    this.app.ticker.add((delta) => this._update(delta));

    if (this.onReady) this.onReady();
  }

  _resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.app.renderer.resize(this.width, this.height);
    if (this.ui) this.ui.resize(this.width, this.height);
  }

  _update(delta) {
    this.frame++;
    this.particles.update(delta);
    if (this.currentScene && this.currentScene.update) {
      this.currentScene.update(delta, this.frame);
    }
  }

  clearLayers() {
    [this.bgLayer, this.terrainLayer, this.roadLayer, this.buildingLayer,
     this.charLayer, this.particleLayer, this.uiLayer, this.dialogLayer].forEach(l => {
      l.removeChildren();
    });
  }

  showScene(sceneName, data) {
    this.clearLayers();
    this.currentScene = this.scenes[sceneName];
    if (this.currentScene && this.currentScene.enter) {
      this.currentScene.enter(data);
    }
  }

  registerScene(name, scene) {
    this.scenes[name] = scene;
  }

  destroy() {
    this.app.destroy(true);
  }
}