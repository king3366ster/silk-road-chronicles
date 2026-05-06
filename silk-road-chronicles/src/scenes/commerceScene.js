/**
 * Commerce Scene v3 - 商贸管理
 * Typed slave trading with preferences
 */
import { state } from '../core/gameState.js';
import { SLAVE_TYPES, SLAVE_MARKETS, SLAVE_ROLES, SLAVE_PREFERENCES, RESOURCE_TYPES } from '../data/worldData.js';

let _tab = 'resources';

export function showCommerce(game) {
  game._clearUI();
  game.scene = 'commerce';
  _tab = 'resources';
  _renderCommerce(game);
}

function _renderCommerce(game) {
  game.ui.createPanel(20, 20, game.w - 40, game.h - 40, '💰 商贸管理');

  const tabs = ['resources|资源交易', 'slaves|奴隶市场'];
  let tx = 60;
  tabs.forEach(t => {
    const [id, label] = t.split('|');
    const active = _tab === id;
    game.ui.createButton(tx, 65, 100, 28, label, () => { _tab = id; _renderCommerce(game); },
      active ? 0xD4A853 : 0x4A3728, active ? 0x000000 : 0xD4A853);
    tx += 110;
  });

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
  game.ui.createText(x, y, '💰 奴隶市场（六大类型）', { fontSize: 16, fill: 0xFFD700, bold: true });
  y += 15;
  game.ui.createText(x, y, `金币: ${state.player.gold}`, { fontSize: 12, fill: 0xD4A853 });
  y += 20;

  // Current inventory
  game.ui.createText(x, y, '【当前库存】', { fontSize: 13, fill: 0xD4A853, bold: true }); y += 20;
  Object.entries(SLAVE_TYPES).forEach(([id, st]) => {
    const count = state.slaves.inventory[id] || 0;
    if (count > 0) {
      game.ui.createText(x + 10, y, `${st.icon} ${st.name}: ${count} (单价${st.basePrice}金)`, { fontSize: 12, fill: st.color });
      y += 18;
    }
  });
  y += 10;

  // Markets
  game.ui.createText(x, y, '【各城邦奴隶市场】', { fontSize: 13, fill: 0xD4A853, bold: true }); y += 22;
  Object.entries(SLAVE_MARKETS).forEach(([marketId, market]) => {
    game.ui.createPanel(x, y, w - 20, 60, '', 0x1a0a04);
    game.ui.createText(x + 10, y + 5, market.name, { fontSize: 13, fill: 0xF0E68C, bold: true });

    const pref = SLAVE_PREFERENCES[marketId];
    if (pref) {
      const prefNames = pref.prefer.map(t => SLAVE_TYPES[t]?.name || t).join('、');
      game.ui.createText(x + 10, y + 22, `偏好: ${prefNames}`, { fontSize: 10, fill: 0x27AE60 });
    }

    // Buy/sell buttons for top 3 available types
    let bx = x + 10;
    const available = Object.entries(market.supply).filter(([, v]) => v > 0).slice(0, 3);
    available.forEach(([type]) => {
      const st = SLAVE_TYPES[type];
      if (!st) return;
      game.ui.createButton(bx, y + 38, 80, 20, `${st.icon}买1(${st.basePrice}金)`, () => {
        if (state.player.gold >= st.basePrice) {
          state.buySlaves(type, 1, st.basePrice);
          alert(`购买1名${st.name}`);
          _renderCommerce(game);
        } else alert('金币不足！');
      }, 0x8B0000);
      bx += 85;
    });
    y += 65;
  });

  y += 10;
  game.ui.createText(x, y, '💡 高级奴隶(舞女/侍妾)价格更高，但外交赠礼效果更好', { fontSize: 11, fill: 0x888888 });
}