/**
 * Map Scene - 主地图场景
 */
import { state } from '../core/gameState.js';
import { NATION_LIST } from '../data/nations.js';

export function showMap(game) {
  game.ui.clear();
  game.pixiApp.bgLayer.removeChildren();
  game.scene = 'map';
  game.particles.clear();
  game.particles.addEffect('sand');

  game.mapRenderer.invalidate();
  game.mapRenderer.centerOn(state.player.location.x, state.player.location.y);
  game.mapRenderer.render(game.pixiApp.terrainLayer, game.pixiApp.buildingLayer, game.w, game.h);

  game.ui.createTopBar(state);
  game.ui.createMiniMap(game.w - 170, 50, 160, game.mapRenderer);

  // View mode toggle buttons
  const viewBtns = [['🗺️策略', 'strategy'], ['⚔️势力', 'territory'], ['🌄实景', 'landscape']];
  const vbw = 80, vby = 55;
  viewBtns.forEach((b, i) => {
    const isActive = game.mapRenderer.viewMode === b[1];
    game.ui.createButton(game.w - 90, vby + i * 38, vbw, 32, b[0], () => {
      game.mapRenderer.setViewMode(b[1]);
      game.mapRenderer.render(game.pixiApp.terrainLayer, game.pixiApp.buildingLayer, game.w, game.h);
      showMap(game);
    }, { fontSize: 12, color: isActive ? 0xFFD700 : 0x888888 });
  });

  // Bottom action buttons
  const btns = [
    ['🏘️部落', () => game._showTribe()],
    ['⚔️军事', () => game._showMilitary()],
    ['💰商贸', () => game._showCommerce()],
    ['🤝外交', () => game._showDiplomacy()],
    ['📜任务', () => {}],
    ['👥角色', () => {}],
    ['⏭️回合', () => { state.nextTurn(); showMap(game); }],
    ['💾存档', () => {}]
  ];
  const bw = 105, sx = (game.w - btns.length * bw) / 2;
  btns.forEach((b, i) => {
    game.ui.createButton(sx + i * bw, game.h - 55, bw - 4, 44, b[0], b[1], { fontSize: 13 });
  });
}

export function handleMapClick(game, sx, sy) {
  if (sy < 50 || sy > game.h - 60) return;
  const tile = game.mapRenderer.screenToTile(sx, sy);
  for (const n of NATION_LIST) {
    if (n.capital && n.capital.x === tile.x && n.capital.y === tile.y) {
      showNationInfo(game, n);
      return;
    }
  }
  state.movePlayer(tile.x, tile.y);
  showMap(game);
}

export function showNationInfo(game, n) {
  game.ui.showDialog(n.name, n.description + (n.isAllFemale ? ' ♀全女性国家' : ''), null,
    () => { game.ui.hideDialog(); });
}