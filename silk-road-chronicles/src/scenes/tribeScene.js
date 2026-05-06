/**
 * Tribe Scene - 部落管理
 */
import { state } from '../core/gameState.js';

export function showTribe(game) {
  game._clearUI();
  game.scene = 'tribe';
  game.ui.createPanel(40, 40, game.w - 80, game.h - 80, '🏘️ ' + state.tribe.name);

  let y = 100;
  game.ui.createText(70, y, '【部落概况】', { fontSize: 16, bold: true }); y += 28;
  game.ui.createText(70, y, `👥 人口: ${state.tribe.population}/${state.tribe.maxPopulation}`); y += 22;
  game.ui.createText(70, y, '😊 幸福度:');
  game.ui.createProgressBar(160, y - 5, 120, 10, state.tribe.happiness, 100, 0x4CAF50); y += 30;

  game.ui.createText(70, y, '【资源】', { fontSize: 16, bold: true }); y += 25;
  [['🌾食物', state.resources.food], ['🪵木材', state.resources.wood], ['💎玉石', state.resources.jade],
   ['🧵丝绸', state.resources.silk], ['✨香料', state.resources.spice], ['🐎马匹', state.resources.horse]
  ].forEach(([n, v]) => {
    game.ui.createText(90, y, `${n}: ${Math.floor(v)}`); y += 20;
  });

  const rx = game.w / 2 + 20;

  // Agriculture
  game.ui.createText(rx, 100, '【农业】', { fontSize: 16, bold: true });
  game.ui.createText(rx, 128, `农田: ${state.tribe.agriculture.farms}/${state.tribe.agriculture.maxFarms} 产出:${state.tribe.agriculture.output}`);
  game.ui.createButton(rx, 155, 160, 32, '🌾 建农田(20木)', () => {
    if (state.buildFarm()) showTribe(game);
  });

  // Commerce
  game.ui.createText(rx, 200, '【商业】', { fontSize: 16, bold: true });
  game.ui.createText(rx, 228, `市场: ${state.tribe.commerce.markets}/${state.tribe.commerce.maxMarkets} 收入:${state.tribe.commerce.income}/回合`);
  game.ui.createButton(rx, 255, 160, 32, '🏪 建市场(50金)', () => {
    if (state.buildMarket()) showTribe(game);
  });

  // Military
  game.ui.createText(rx, 300, '【军事】', { fontSize: 16, bold: true });
  game.ui.createText(rx, 328, `兵营: ${state.tribe.military.barracks} 士兵:${state.tribe.military.soldiers}`);
  game.ui.createButton(rx, 355, 160, 32, '🏰 建兵营(40石)', () => {
    if (state.buildBarracks()) showTribe(game);
  });

  game.ui.createButton(game.w / 2 - 60, game.h - 100, 120, 40, '返回', () => game._showMap());
}