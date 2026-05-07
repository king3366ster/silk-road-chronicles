/**
 * Map Scene v3 - 主地图场景
 * Fixed: proper turn feedback, better layout, toast notifications
 */
import { state } from '../core/gameState.js';
import { NATION_LIST } from '../data/nations.js';

export function showMap(game) {
  game._clearUI();
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

  // Player info panel (left side)
  const infoX = 10, infoY = 50;
  game.ui.createPanel(infoX, infoY, 180, 120, '');
  game.ui.createText(infoX + 10, infoY + 8, `${state.player.name}`, { fontSize: 15, fill: 0xFFD700, bold: true });
  game.ui.createText(infoX + 10, infoY + 28, `称号: ${state.player.title}`, { fontSize: 12, fill: 0xCCCCCC });
  game.ui.createText(infoX + 10, infoY + 44, `武力:${state.player.stats.military} 经济:${state.player.stats.economy}`, { fontSize: 11, fill: 0xBBBBBB });
  game.ui.createText(infoX + 10, infoY + 58, `外交:${state.player.stats.diplomacy} 文化:${state.player.stats.culture}`, { fontSize: 11, fill: 0xBBBBBB });
  game.ui.createText(infoX + 10, infoY + 72, `魅力:${state.player.stats.charisma} 经验:${state.player.exp}`, { fontSize: 11, fill: 0xBBBBBB });

  // Development balance
  const balance = state.developmentBalance;
  const balColor = balance.score >= 80 ? 0x27AE60 : balance.score >= 50 ? 0xF39C12 : 0xE74C3C;
  game.ui.createText(infoX + 10, infoY + 88, `发展: ${balance.desc}(${balance.score})`, { fontSize: 11, fill: balColor });
  game.ui.createProgressBar(infoX + 10, infoY + 104, 160, 8, balance.score, 100, balColor);

  // Bottom action buttons
  const btns = [
    ['🏘️部落', () => game._showTribe()],
    ['⚔️军事', () => game._showMilitary()],
    ['💰商贸', () => game._showCommerce()],
    ['🤝外交', () => game._showDiplomacy()],
    ['📜任务', () => game._showTribe()],  // Go to tribe quests tab
    ['👥角色', () => game.ui.showToast('角色系统开发中...')],
    ['⏭️回合', () => {
      try {
        const result = state.nextTurn();
        game.ui.showToast(result.text, 3000);
        // Show triggered events
        if (result.triggeredEvents && result.triggeredEvents.length > 0) {
          result.triggeredEvents.forEach((evt, i) => {
            setTimeout(() => {
              game.ui.showToast(`⚡ ${evt.name}: ${evt.desc}`, 3500);
            }, (i + 1) * 1500);
          });
        }
        // Show balance issues
        if (result.balance && result.balance.issues) {
          const evtLen = result.triggeredEvents?.length || 0;
          result.balance.issues.forEach((issue, i) => {
            setTimeout(() => {
              game.ui.showToast(`⚠️ ${issue}`, 3000);
            }, (evtLen + i + 1) * 1500);
          });
        }
        showMap(game);
      } catch (err) {
        console.error('[NextTurn] Error:', err);
        game.ui.showToast(`回合错误: ${err.message}`, 4000);
      }
    }],
    ['💾存档', () => game.ui.showToast('存档功能开发中...')]
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
  const isAllFemale = n.isAllFemale;
  const info = `${n.description}${isAllFemale ? '\n\n♀ 全女性国家 - 所有市民均为女性' : ''}`;
  game.ui.showDialog(n.name, info, null,
    () => { game.ui.hideDialog(); });
}