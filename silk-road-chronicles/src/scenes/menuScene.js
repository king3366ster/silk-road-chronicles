/**
 * Menu Scene - 主菜单
 */
import { state } from '../core/gameState.js';

export function showMenu(game) {
  game._clearUI();
  game.scene = 'menu';
  game.particles.clear();
  game.particles.addEffect('sparkle');
  game.particles.addEffect('petals');

  game.ui.createText(game.w / 2, game.h / 2 - 180,
    '西域群英传', { fontSize: 64, fill: 0xD4A853, bold: true, anchor: [0.5, 0.5],
      stroke: 0x000000, strokeThickness: 3 });
  game.ui.createText(game.w / 2, game.h / 2 - 120,
    'SILK ROAD CHRONICLES', { fontSize: 22, fill: 0x9B8B70, anchor: [0.5, 0.5] });

  const items = ['开始新游戏', '继续游戏', 'CG 回忆', '退出'];
  items.forEach((text, i) => {
    game.ui.createButton(game.w / 2 - 130, game.h / 2 - 30 + i * 60, 260, 48, text,
      () => menuAction(game, i), { fontSize: 20 });
  });

  game.ui.createText(game.w / 2, game.h - 40,
    `v5.0 PixiJS - ${state.stats?.total || 3000}+角色 · ${state.stats?.female || 2000}+女性`,
    { fontSize: 13, fill: 0x9B8B70, anchor: [0.5, 0.5] });
}

export function menuAction(game, i) {
  if (i === 0) game._showOasisSelect();
  else if (i === 1) game._showMap();
}