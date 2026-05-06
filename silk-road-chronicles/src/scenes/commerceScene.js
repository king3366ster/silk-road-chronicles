/**
 * Commerce Scene v2 - 商贸管理
 * Resource trading + slave market integration
 */
import { state } from '../core/gameState.js';
import { SLAVE_MARKETS, SLAVE_ROLES, RESOURCE_TYPES } from '../data/worldData.js';

let _tab = 'resources'; // resources | slaves

export function showCommerce(game) {
  game._clearUI();
  game.scene = 'commerce';
  _tab = 'resources';
  _renderCommerce(game);
}

function _renderCommerce(game) {
  game.ui.createPanel(20, 20, game.w - 40, game.h - 40, '💰 商贸管理');

  // Tab bar
  const tabs = ['resources|资源交易', 'slaves|奴隶市场'];
  let tx = 60;
  tabs.forEach(t => {
    const [id, label] = t.split('|');
    const active = _tab === id;
    game.ui.createButton(tx, 65, 100, 28, label, () => { _tab = id; _renderCommerce(game); },
      active ? 0xD4A853 : 0x4A3728, active ? 0x000000 : 0xD4A853);
    tx += 110;
  });

  // Content area
  const cx = 50, cy = 100, cw = game.w - 100, ch = game.h - 180;
  game.ui.createPanel(cx, cy, cw, ch, '', 0x1a1008);

  if (_tab === 'resources') _renderResources(game, cx + 10, cy + 10, cw - 20, ch - 20);
  else if (_tab === 'slaves') _renderSlaveMarket(game, cx + 10, cy + 10, cw - 20, ch - 20);

  game.ui.createButton(game.w / 2 - 60, game.h - 60, 120, 40, '返回地图', () => game._showMap());
}

function _renderResources(game, x, y, w, h) {
  game.ui.createText(x, y,
    `金币: ${state.player.gold}  商业收入: ${state.tribe.commerce.income}/回合`, { fontSize: 16, fill: 0xFFD700, bold: true });
  y += 30;

  game.ui.createText(x, y, '【资源交易】', { fontSize: 16, fill: 0xD4A853, bold: true });
  y += 25;

  const prices = {
    jade: 50, silk: 30, spice: 25, horse: 40, iron: 20,
    cotton: 15, wine: 18, salt: 10, herb: 22, gem: 80,
    fur: 15, camel: 35, leather: 12, ore: 8, wood: 5,
  };

  Object.entries(prices).forEach(([res, price]) => {
    const rt = RESOURCE_TYPES[res];
    const icon = rt ? rt.icon : '';
    const name = rt ? rt.name : res;
    const amount = Math.floor(state.resources[res] || 0);

    game.ui.createText(x + 10, y, `${icon}${name}: ${amount} (单价${price}金)`, { fontSize: 12, fill: 0xF0E68C });
    game.ui.createButton(x + 280, y - 10, 50, 24, '卖出', () => {
      if (state.resources[res] > 0) { state.resources[res]--; state.addGold(price); _renderCommerce(game); }
    }, 0x8B0000);
    game.ui.createButton(x + 340, y - 10, 50, 24, '买入', () => {
      if (state.player.gold >= price) { state.addGold(-price); state.resources[res]++; _renderCommerce(game); }
    }, 0x2E4053);
    y += 28;
  });
}

function _renderSlaveMarket(game, x, y, w, h) {
  const available = state.slaves.total - Object.values(state.slaves.assigned).reduce((a, b) => a + b, 0);
  game.ui.createText(x, y,
    `奴隶: ${state.slaves.total} | 可售: ${available} | 金币: ${state.player.gold}`,
    { fontSize: 14, fill: 0xFFD700, bold: true });
  y += 30;

  game.ui.createText(x, y, '【奴隶市场】', { fontSize: 14, fill: 0xD4A853, bold: true });
  y += 25;

  Object.entries(SLAVE_MARKETS).forEach(([id, market]) => {
    game.ui.createPanel(x, y, w - 20, 55, '', 0x1a0a04);
    game.ui.createText(x + 10, y + 5, `${market.femaleOnly ? '♀' : '⛓️'} ${market.name}`, { fontSize: 13, fill: 0xF0E68C, bold: true });
    game.ui.createText(x + 10, y + 25, `价格: ${market.price.low}-${market.price.high}金 | 供给: ${market.supply}`, { fontSize: 11, fill: 0xCCCCCC });

    game.ui.createButton(x + w - 200, y + 12, 55, 28, '买x5', () => {
      const cost = Math.floor(5 * (market.price.low + market.price.high) / 2);
      if (state.player.gold >= cost) {
        state.buySlaves(5, cost);
        alert(`购买5名奴隶，花费${cost}金`);
        _renderCommerce(game);
      } else alert('金币不足！');
    }, 0x8B0000);
    game.ui.createButton(x + w - 135, y + 12, 55, 28, '买x20', () => {
      const cost = Math.floor(20 * (market.price.low + market.price.high) / 2);
      if (state.player.gold >= cost) {
        state.buySlaves(20, cost);
        alert(`购买20名奴隶，花费${cost}金`);
        _renderCommerce(game);
      } else alert('金币不足！');
    }, 0x6B0000);
    game.ui.createButton(x + w - 70, y + 12, 55, 28, '售x5', () => {
      const sold = state.sellSlaves(5, market.price.low);
      if (sold > 0) { alert(`出售${sold}名奴隶`); _renderCommerce(game); }
      else alert('没有可出售的奴隶');
    }, 0x2E4053);
    y += 62;
  });

  y += 10;
  game.ui.createText(x, y, '【奴隶用途】', { fontSize: 13, fill: 0xD4A853, bold: true }); y += 22;
  Object.entries(SLAVE_ROLES).forEach(([id, role]) => {
    game.ui.createText(x + 10, y, `${role.icon} ${role.name} - ${role.desc}`, { fontSize: 11, fill: 0xCCCCCC });
    y += 18;
  });
}