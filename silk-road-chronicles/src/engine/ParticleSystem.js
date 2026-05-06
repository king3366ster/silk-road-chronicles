/**
 * Particle System v5.0 - PixiJS WebGL
 * Petals, sand, fire, snow, sparkles for atmospheric effects
 */
import * as PIXI from 'pixi.js';

class Particle {
  constructor(x, y, vx, vy, life, size, color, type) {
    this.x = x; this.y = y; this.vx = vx; this.vy = vy;
    this.life = life; this.maxLife = life; this.size = size;
    this.color = color; this.type = type;
    this.alpha = 1; this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.1;
  }
}

export class ParticleSystem {
  constructor() {
    this.container = null;
    this.particles = [];
    this.graphics = null;
    this.width = 0; this.height = 0;
    this.activeEffects = new Set(['sand']);
  }

  init(container, w, h) {
    this.container = container;
    this.width = w; this.height = h;
    this.graphics = new PIXI.Graphics();
    container.addChild(this.graphics);
  }

  resize(w, h) { this.width = w; this.height = h; }

  addEffect(name) { this.activeEffects.add(name); }
  removeEffect(name) { this.activeEffects.delete(name); }

  update(delta) {
    // Spawn new particles based on active effects
    if (this.activeEffects.has('sand')) this._spawnSand();
    if (this.activeEffects.has('petals')) this._spawnPetals();
    if (this.activeEffects.has('fire')) this._spawnFire();
    if (this.activeEffects.has('snow')) this._spawnSnow();
    if (this.activeEffects.has('sparkle')) this._spawnSparkle();
    if (this.activeEffects.has('dust')) this._spawnDust();

    // Update existing particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx * delta;
      p.y += p.vy * delta;
      p.life -= delta;
      p.alpha = Math.max(0, p.life / p.maxLife);
      p.rotation += p.rotSpeed * delta;

      // Type-specific behavior
      if (p.type === 'petal') {
        p.vx += Math.sin(p.life * 0.1) * 0.02 * delta;
        p.vy = Math.abs(p.vy) * 0.99; // gentle float
      } else if (p.type === 'sand') {
        p.vx += Math.sin(p.life * 0.05) * 0.01 * delta;
      } else if (p.type === 'fire') {
        p.vx += (Math.random() - 0.5) * 0.1 * delta;
        p.vy -= 0.02 * delta;
        p.size *= 0.995;
      } else if (p.type === 'snow') {
        p.vx += Math.sin(p.life * 0.08) * 0.015 * delta;
      }

      // Remove dead particles
      if (p.life <= 0 || p.alpha <= 0 || p.size < 0.5) {
        this.particles.splice(i, 1);
      }
    }

    // Cap particle count
    if (this.particles.length > 500) {
      this.particles.splice(0, this.particles.length - 500);
    }

    // Render
    this._render();
  }

  _spawnSand() {
    if (Math.random() > 0.3) return;
    this.particles.push(new Particle(
      -10, Math.random() * this.height,
      1.5 + Math.random() * 2, Math.random() * 0.5 - 0.25,
      200 + Math.random() * 100, 1 + Math.random() * 2,
      Math.random() > 0.5 ? 0xD4B870 : 0xC8A850, 'sand'
    ));
  }

  _spawnPetals() {
    if (Math.random() > 0.15) return;
    const colors = [0xFFB7C5, 0xFF69B4, 0xFFC0CB, 0xFF1493, 0xFFFFFF];
    this.particles.push(new Particle(
      Math.random() * this.width, -10,
      Math.random() * 0.5 - 0.25, 0.3 + Math.random() * 0.5,
      300 + Math.random() * 200, 3 + Math.random() * 4,
      colors[Math.floor(Math.random() * colors.length)], 'petal'
    ));
  }

  _spawnFire() {
    if (Math.random() > 0.4) return;
    const colors = [0xFF4500, 0xFF6347, 0xFFD700, 0xFF8C00];
    this.particles.push(new Particle(
      this.width * 0.5 + (Math.random() - 0.5) * 60, this.height * 0.8,
      (Math.random() - 0.5) * 0.5, -1 - Math.random() * 1.5,
      40 + Math.random() * 30, 3 + Math.random() * 5,
      colors[Math.floor(Math.random() * colors.length)], 'fire'
    ));
  }

  _spawnSnow() {
    if (Math.random() > 0.2) return;
    this.particles.push(new Particle(
      Math.random() * this.width, -5,
      Math.random() * 0.3 - 0.15, 0.2 + Math.random() * 0.4,
      400 + Math.random() * 200, 2 + Math.random() * 3,
      0xFFFFFF, 'snow'
    ));
  }

  _spawnSparkle() {
    if (Math.random() > 0.1) return;
    this.particles.push(new Particle(
      Math.random() * this.width, Math.random() * this.height,
      0, 0, 30 + Math.random() * 20, 2 + Math.random() * 3,
      Math.random() > 0.5 ? 0xFFD700 : 0xFFFFFF, 'sparkle'
    ));
  }

  _spawnDust() {
    if (Math.random() > 0.2) return;
    this.particles.push(new Particle(
      Math.random() * this.width, this.height + 5,
      (Math.random() - 0.5) * 0.3, -0.2 - Math.random() * 0.3,
      100 + Math.random() * 100, 1 + Math.random() * 2,
      0xD4B870, 'dust'
    ));
  }

  _render() {
    this.graphics.clear();
    for (const p of this.particles) {
      this.graphics.beginFill(p.color, p.alpha * 0.7);
      if (p.type === 'petal') {
        // Ellipse for petals
        this.graphics.drawEllipse(p.x, p.y, p.size, p.size * 0.6);
      } else if (p.type === 'sparkle') {
        // Diamond shape for sparkles (drawStar not available in PixiJS 7)
        const s = p.size * p.alpha;
        this.graphics.moveTo(p.x, p.y - s);
        this.graphics.lineTo(p.x + s * 0.4, p.y);
        this.graphics.lineTo(p.x, p.y + s);
        this.graphics.lineTo(p.x - s * 0.4, p.y);
        this.graphics.closePath();
      } else {
        this.graphics.drawCircle(p.x, p.y, p.size * p.alpha);
      }
      this.graphics.endFill();
    }
  }

  clear() {
    this.particles = [];
    this.graphics?.clear();
  }
}