/**
 * Diplomacy Scene v3 - 外交系统
 * Fixed: replaced alert() with toast
 */
import { state } from '../core/gameState.js';
import { NATIONS } from '../data/nations.js';
import { SLAVE_TYPES, SLAVE_PREFERENCES, SLAVE_TRIBUTE, INFLUENCE_ZONES } from '../data/worldData.js';

let _tab = 'overview';

export function showDiplomacy(game) {
  game._clearUI();
  game.scene = 'diplomacy';
  _tab = 'overview';
  _renderDiplomacy(game);
}

function _renderDiplomacy(game) {
  game.ui.createPanel(20, 20, game.w - 40, game.h - 40, '🤝 外交管理');

  const tabs = ['overview|外交总览', 'tribute|奴隶贡品', 'alliance|同盟结盟'];
  let tx = 60;
  tabs.forEach(t => {
    const [id, label] = t.split('|');
    const active = _tab === id;
    game.ui.createButton(tx, 65, 100, 28, label, () => { _tab = id; _renderDiplomacy(game); },
      { color: active ? 0xD4A853 : 0x4A3728, textColor: active ? 0x000000 : 0xD4A853 });
    tx += 110;
  });

  const cx = 50, cy = 100, cw = game.w - 100, ch = game.h - 180;
  game.ui.createPanel(cx, cy, cw, ch, '', { bgColor: 0x1a1008 });

  if (_tab === 'overview') _renderOverview(game, cx + 10, cy + 10, cw - 20, ch - 20);
  else if (_tab === 'tribute') _renderTribute(game, cx + 10, cy + 10, cw - 20, ch - 20);
  else if (_tab === 'alliance') _renderAlliance(game, cx + 10, cy + 10, cw - 20, ch - 20);

  game.ui.createButton(game.w / 2 - 60, game.h - 60, 120, 40, '返回地图', () => game._showMap());
}

function _renderOverview(game, x, y, w, h) {
  game.ui.createText(x, y, '🌍 六大帝国关系', { fontSize: 14, fill: 0xFFD700, bold: true }); y += 25;
  const colors = { han: 0xDC143C, xiongnu: 0x8B4513, kushan: 0xDAA520, parthia: 0x9B59B6, rome: 0x3498DB, sassanid: 0x8B008B };

  Object.entries(INFLUENCE_ZONES || {}).forEach(([id, zone]) => {
    const rel = state.majorPowerRelations[id] || 50;
    const c = colors[id] || 0xAAAAAA;
    const pref = SLAVE_PREFERENCES[id];
    game.ui.createPanel(x, y, w - 20, 50, 0x1a0a04);
    game.ui.createText(x + 10, y + 5, zone.name, { fontSize: 13, fill: c, bold: true });
    game.ui.createText(x + 10, y + 22, `关系: ${rel}/100`, { fontSize: 11, fill: rel > 70 ? 0x27AE60 : rel > 40 ? 0xF39C12 : 0xE74C3C });
    game.ui.createProgressBar(x + 120, y + 22, 100, 10, rel, 100, rel > 70 ? 0x27AE60 : rel > 40 ? 0xF39C12 : 0xE74C3C);
    if (pref) {
      const prefNames = pref.prefer.map(t => SLAVE_TYPES[t]?.name || t).join('、');
      game.ui.createText(x + 10, y + 38, `偏好: ${prefNames}`, { fontSize: 10, fill: 0x888888 });
    }
    y += 55;
  });
}

function _renderTribute(game, x, y, w, h) {
  game.ui.createText(x, y, '🎁 奴隶贡品与赠礼', { fontSize: 16, fill: 0xFFD700, bold: true });
  y += 15;
  game.ui.createText(x, y, '将奴隶作为贡品赠送给六大帝国或城邦，提升关系', { fontSize: 12, fill: 0xD4A853 });
  y += 20;

  game.ui.createText(x, y, '【可用奴隶】', { fontSize: 12, fill: 0xD4A853, bold: true }); y += 20;
  const invStr = Object.entries(state.slaves.inventory).filter(([, v]) => v > 0).map(([k, v]) => {
    const st = SLAVE_TYPES[k];
    return `${st?.icon || ''}${st?.name}:${v}`;
  }).join('  ') || '无';
  game.ui.createText(x + 10, y, invStr, { fontSize: 12, fill: 0xF0E68C });
  y += 25;

  // Tribute to major powers
  game.ui.createText(x, y, '【向六大帝国进贡】', { fontSize: 13, fill: 0xFFD700, bold: true }); y += 22;
  const colors = { han: 0xDC143C, xiongnu: 0x8B4513, kushan: 0xDAA520, parthia: 0x9B59B6, rome: 0x3498DB, sassanid: 0x8B008B };

  const majorTribute = SLAVE_TRIBUTE && SLAVE_TRIBUTE.majorPower ? SLAVE_TRIBUTE.majorPower : {};
  Object.entries(majorTribute).forEach(([powerId, info]) => {
    const zone = INFLUENCE_ZONES ? INFLUENCE_ZONES[powerId] : null;
    const c = colors[powerId] || 0xAAAAAA;
    const rel = state.majorPowerRelations[powerId] || 50;
    game.ui.createPanel(x, y, w - 20, 55, 0x1a0a04);
    game.ui.createText(x + 10, y + 5, zone ? zone.name : powerId, { fontSize: 12, fill: c, bold: true });
    game.ui.createText(x + 10, y + 22, `关系:${rel} | 最佳赠礼: ${info.bestGift.map(t => SLAVE_TYPES[t]?.name || t).join('、')}`, { fontSize: 11, fill: 0xCCCCCC });
    game.ui.createText(x + 10, y + 38, info.desc, { fontSize: 10, fill: 0x888888 });

    let bx = x + w - 280;
    Object.entries(state.slaves.inventory).filter(([, v]) => v > 0).slice(0, 3).forEach(([type]) => {
      const st = SLAVE_TYPES[type];
      if (!st) return;
      game.ui.createButton(bx, y + 5, 80, 22, `${st.icon}赠1`, () => {
        const calcFn = SLAVE_TRIBUTE && SLAVE_TRIBUTE.calcGiftEffect ? SLAVE_TRIBUTE.calcGiftEffect.bind(SLAVE_TRIBUTE) : null;
        const effect = state.sendSlaveTribute(powerId, type, 1, true, calcFn);
        if (effect) {
          game.ui.showToast(`向${zone?.name}赠送${st.name}！关系+${effect.relationGain}${effect.isBest ? '(最佳!)' : ''}`);
          _renderDiplomacy(game);
        } else game.ui.showToast('赠送失败！');
      }, { color: 0x8B0000 });
      bx += 85;
    });
    y += 60;
  });

  // Tribute to city-states
  y += 5;
  game.ui.createText(x, y, '【向城邦赠送奴隶】', { fontSize: 13, fill: 0xFFD700, bold: true }); y += 22;
  const cityStates = { amazons: '阿玛宗', xiliang: '西梁女国', kucha: '龟兹', kashgar: '疏勒', soche: '粟特' };
  const cityTribute = SLAVE_TRIBUTE && SLAVE_TRIBUTE.cityState ? SLAVE_TRIBUTE.cityState : {};
  Object.entries(cityStates).forEach(([csId, csName]) => {
    const info = cityTribute[csId] || cityTribute.default || { bestGift: [], desc: '' };
    game.ui.createPanel(x, y, w - 20, 40, 0x1a0a04);
    game.ui.createText(x + 10, y + 5, csName, { fontSize: 12, fill: 0xF0E68C, bold: true });
    game.ui.createText(x + 10, y + 22, `偏好: ${info.bestGift.map(t => SLAVE_TYPES[t]?.name || t).join('、')} | ${info.desc}`, { fontSize: 10, fill: 0x888888 });

    let bx = x + w - 280;
    Object.entries(state.slaves.inventory).filter(([, v]) => v > 0).slice(0, 3).forEach(([type]) => {
      const st = SLAVE_TYPES[type];
      if (!st) return;
      game.ui.createButton(bx, y + 5, 80, 22, `${st.icon}赠1`, () => {
        const calcFn = SLAVE_TRIBUTE && SLAVE_TRIBUTE.calcGiftEffect ? SLAVE_TRIBUTE.calcGiftEffect.bind(SLAVE_TRIBUTE) : null;
        const effect = state.sendSlaveTribute(csId, type, 1, false, calcFn);
        if (effect) {
          game.ui.showToast(`向${csName}赠送${st.name}！关系+${effect.relationGain}${effect.isBest ? '(最佳!)' : ''}`);
          _renderDiplomacy(game);
        } else game.ui.showToast('赠送失败！');
      }, { color: 0x2E4053 });
      bx += 85;
    });
    y += 45;
  });

  y += 5;
  game.ui.createText(x, y, '💡 赠送对方偏好的奴隶类型效果最佳！阿玛宗/西梁急需男奴繁衍后代。', { fontSize: 11, fill: 0x888888 });
}

function _renderAlliance(game, x, y, w, h) {
  game.ui.createText(x, y, '🤝 同盟与结盟', { fontSize: 14, fill: 0xFFD700, bold: true }); y += 25;
  game.ui.createText(x, y, '当前同盟:', { fontSize: 12, fill: 0xD4A853 }); y += 20;
  if (state.alliances.length === 0) {
    game.ui.createText(x + 10, y, '暂无同盟', { fontSize: 11, fill: 0x888888 });
  } else {
    state.alliances.forEach(a => {
      const n = NATIONS[a];
      game.ui.createText(x + 10, y, `✓ ${n ? n.name : a}`, { fontSize: 12, fill: 0x27AE60 });
      y += 18;
    });
  }
  y += 15;
  game.ui.createText(x, y, '💡 通过赠送奴隶贡品提升关系至80+可提议结盟', { fontSize: 11, fill: 0x888888 });
}