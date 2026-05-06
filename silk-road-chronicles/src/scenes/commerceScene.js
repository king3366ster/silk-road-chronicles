/**
 * Commerce Scene - 商贸管理
 */
import { state } from '../core/gameState.js';

export function showCommerce(game) {
  game._clearUI();
  game.scene = 'commerce';
  game.ui.createPanel(40, 40, game.w - 80, game.h - 80, '💰 商贸');

  game.ui.createText(70, 100,
    `金币: ${state.player.gold}  商业收入: ${state.tribe.commerce.income}/回合`, { fontSize: 16 });

  game.ui.createText(70, 135, '【资源交易】', { fontSize: 16, bold: true });
  const prices = { jade: 50, silk: 30, spice: 25, horse: 40, iron: 20 };
  let y = 165;
  Object.entries(prices).forEach(([res, price]) => {
    game.ui.createText(90, y, `${res}: ${Math.floor(state.resources[res] || 0)} (单价${price}金)`);
    game.ui.createButton(380, y - 12, 50, 24, '卖出', () => {
      if (state.resources[res] > 0) { state.resources[res]--; state.addGold(price); showCommerce(game); }
    });
    game.ui.createButton(440, y - 12, 50, 24, '买入', () => {
      if (state.player.gold >= price) { state.addGold(-price); state.resources[res]++; showCommerce(game); }
    });
    y += 30;
  });

  game.ui.createButton(game.w / 2 - 60, game.h - 100, 120, 40, '返回', () => game._showMap());
}