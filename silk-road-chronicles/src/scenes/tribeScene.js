/**
 * Tribe Scene v2 - 部落管理
 * 108 tribes, slave roles (labor/breeding/entertainment/sacrifice/training), plunder rules
 */
import { state } from '../core/gameState.js';
import { NATIONS } from '../data/nations.js';
import { TRIBES_FULL, GARRISONS, RESOURCE_TYPES, SLAVE_MARKETS, SLAVE_ROLES, SLAVE_TRAINING, PLUNDER_RULES, RECRUIT_RULES, INFLUENCE_ZONES, UNIT_TYPES } from '../data/worldData.js';

let _tab = 'tribes'; // tribes | garrison | slaves | trade | recruit | influence
let _nationFilter = 'all';
let _scrollY = 0;

export function showTribe(game) {
  game._clearUI();
  game.scene = 'tribe';
  _scrollY = 0;
  _renderTribe(game);
}

function _renderTribe(game) {
  game.ui.createPanel(20, 20, game.w - 40, game.h - 40, '🏕️ 部落与势力管理');

  // Tab bar
  const tabs = ['tribes|部落总览', 'garrison|城邦守军', 'slaves|奴隶管理', 'trade|奴隶买卖', 'recruit|征兵招募', 'influence|六大帝国'];
  let tx = 40;
  tabs.forEach(t => {
    const [id, label] = t.split('|');
    const active = _tab === id;
    game.ui.createButton(tx, 65, 95, 28, label, () => { _tab = id; _scrollY = 0; _renderTribe(game); },
      active ? 0xD4A853 : 0x4A3728, active ? 0x000000 : 0xD4A853);
    tx += 100;
  });

  // Content area
  const cx = 50, cy = 100, cw = game.w - 100, ch = game.h - 180;
  game.ui.createPanel(cx, cy, cw, ch, '', 0x1a1008);

  if (_tab === 'tribes') _renderTribes(game, cx + 10, cy + 10, cw - 20, ch - 20);
  else if (_tab === 'garrison') _renderGarrison(game, cx + 10, cy + 10, cw - 20, ch - 20);
  else if (_tab === 'slaves') _renderSlaves(game, cx + 10, cy + 10, cw - 20, ch - 20);
  else if (_tab === 'trade') _renderSlaveTrade(game, cx + 10, cy + 10, cw - 20, ch - 20);
  else if (_tab === 'recruit') _renderRecruit(game, cx + 10, cy + 10, cw - 20, ch - 20);
  else if (_tab === 'influence') _renderInfluence(game, cx + 10, cy + 10, cw - 20, ch - 20);

  game.ui.createButton(game.w / 2 - 60, game.h - 60, 120, 40, '返回地图', () => game._showMap());
}

function _renderTribes(game, x, y, w, h) {
  // Nation filter
  game.ui.createText(x, y, '筛选城邦:', { fontSize: 12, fill: 0xD4A853 });
  const nations = ['all|全部', ...Object.keys(NATIONS).slice(0, 10).map(k => `${k}|${NATIONS[k].name}`)];
  let fx = x + 70;
  for (let i = 0; i < Math.min(nations.length, 8); i++) {
    const [id, label] = nations[i].split('|');
    const active = _nationFilter === id;
    game.ui.createButton(fx, y - 5, 55, 22, label, () => { _nationFilter = id; _renderTribe(game); },
      active ? 0x50C878 : 0x2a1a08, active ? 0x000000 : 0xAAAAAA);
    fx += 60;
  }

  y += 30;
  game.ui.createText(x, y, '部落名称', { fontSize: 11, fill: 0xFFD700, bold: true });
  game.ui.createText(x + 100, y, '所属城邦', { fontSize: 11, fill: 0xFFD700 });
  game.ui.createText(x + 170, y, '人口', { fontSize: 11, fill: 0xFFD700 });
  game.ui.createText(x + 220, y, '兵力', { fontSize: 11, fill: 0xFFD700 });
  game.ui.createText(x + 270, y, '类型', { fontSize: 11, fill: 0xFFD700 });
  game.ui.createText(x + 320, y, '主要资源', { fontSize: 11, fill: 0xFFD700 });
  y += 20;

  const filtered = _nationFilter === 'all' ? TRIBES_FULL : TRIBES_FULL.filter(t => t.nation === _nationFilter);
  const maxRows = Math.min(Math.floor((h - 80) / 22), filtered.length);

  for (let i = 0; i < maxRows; i++) {
    const t = filtered[i + Math.floor(_scrollY)];
    if (!t) break;
    const nation = NATIONS[t.nation];
    const nc = nation ? parseInt(nation.color.slice(1), 16) : 0xAAAAAA;
    const rowY = y + i * 22;
    const isFemale = t.female;
    const canPlunder = PLUNDER_RULES.canPlunder(t, state);

    game.ui.createText(x, rowY, `${isFemale ? '♀' : '⛺'} ${t.name}`, { fontSize: 11, fill: isFemale ? 0xFF69B4 : nc });
    game.ui.createText(x + 100, rowY, nation ? nation.name : t.nation, { fontSize: 11, fill: nc });
    game.ui.createText(x + 170, rowY, `${t.pop}`, { fontSize: 11, fill: 0xCCCCCC });
    game.ui.createText(x + 220, rowY, `${t.troops}`, { fontSize: 11, fill: 0xE74C3C });
    game.ui.createText(x + 270, rowY, t.type === 'nomadic' ? '游牧' : '定居', { fontSize: 11, fill: t.type === 'nomadic' ? 0xF39C12 : 0x27AE60 });

    const resStr = Object.entries(t.res).slice(0, 2).map(([k, v]) => {
      const rt = RESOURCE_TYPES[k];
      return `${rt ? rt.icon : k}${v}`;
    }).join(' ');
    game.ui.createText(x + 320, rowY, resStr, { fontSize: 11, fill: 0x85C1E9 });

    // Action buttons
    game.ui.createButton(x + w - 200, rowY - 5, 55, 20, '征兵', () => _recruitFrom(game, t), 0x8B0000);
    game.ui.createButton(x + w - 140, rowY - 5, 55, 20, '贸易', () => _tradeWith(game, t), 0x2E4053);
    if (canPlunder) {
      game.ui.createButton(x + w - 75, rowY - 5, 55, 20, '掠夺', () => _plunderTribe(game, t), 0x6B0000);
    }
  }

  // Summary
  const totalPop = filtered.reduce((s, t) => s + t.pop, 0);
  const totalTroops = filtered.reduce((s, t) => s + t.troops, 0);
  game.ui.createText(x, y + maxRows * 22 + 10,
    `共 ${filtered.length} 个部落 | 总人口: ${totalPop.toLocaleString()} | 可征兵: ${totalTroops.toLocaleString()}`,
    { fontSize: 13, fill: 0xFFD700, bold: true });
  game.ui.createText(x, y + maxRows * 22 + 30,
    '💡 同盟/归降/占领30天以上的部落不可掠夺奴隶',
    { fontSize: 11, fill: 0x888888 });
}

function _renderGarrison(game, x, y, w, h) {
  game.ui.createText(x, y, '🏰 城邦守军', { fontSize: 14, fill: 0xFFD700, bold: true }); y += 25;

  game.ui.createText(x, y, '【城邦守兵】', { fontSize: 12, fill: 0xD4A853, bold: true }); y += 20;
  game.ui.createText(x, y, '城邦', { fontSize: 10, fill: 0x888888 });
  game.ui.createText(x + 80, y, '兵力', { fontSize: 10, fill: 0x888888 });
  game.ui.createText(x + 130, y, '类型', { fontSize: 10, fill: 0x888888 });
  game.ui.createText(x + 190, y, '士气', { fontSize: 10, fill: 0x888888 });
  y += 18;

  const cityEntries = Object.entries(GARRISONS.cities);
  for (let i = 0; i < Math.min(cityEntries.length, Math.floor((h - 140) / 18)); i++) {
    const [id, g] = cityEntries[i];
    const nation = NATIONS[id];
    if (!nation) continue;
    const nc = parseInt(nation.color.slice(1), 16);
    game.ui.createText(x, y, nation.name, { fontSize: 11, fill: nc });
    game.ui.createText(x + 80, y, `${g.troops}`, { fontSize: 11, fill: 0xE74C3C });
    const typeMap = { infantry: '步兵', cavalry: '骑兵', mixed: '混合', naval: '水军', mercenary: '雇佣' };
    game.ui.createText(x + 130, y, typeMap[g.type] || g.type, { fontSize: 11, fill: 0xAAAAAA });
    game.ui.createProgressBar(x + 190, y - 3, 60, 10, g.morale, 100, g.morale > 70 ? 0x27AE60 : g.morale > 50 ? 0xF39C12 : 0xE74C3C);
    y += 18;
  }

  y += 10;
  game.ui.createText(x, y, '【关隘守兵】', { fontSize: 12, fill: 0xD4A853, bold: true }); y += 20;
  Object.entries(GARRISONS.passes).forEach(([name, g]) => {
    game.ui.createText(x, y, `🏔️ ${name}`, { fontSize: 11, fill: 0xDEB887 });
    game.ui.createText(x + 100, y, `兵力:${g.troops}`, { fontSize: 11, fill: 0xE74C3C });
    game.ui.createText(x + 170, y, `士气:${g.morale}`, { fontSize: 11, fill: 0x27AE60 });
    y += 18;
  });

  y += 5;
  game.ui.createText(x, y, '【渡口守兵】', { fontSize: 12, fill: 0xD4A853, bold: true }); y += 20;
  Object.entries(GARRISONS.ferries).forEach(([name, g]) => {
    game.ui.createText(x, y, `⚓ ${name}`, { fontSize: 11, fill: 0x5DADE2 });
    game.ui.createText(x + 100, y, `兵力:${g.troops}`, { fontSize: 11, fill: 0xE74C3C });
    game.ui.createText(x + 170, y, `士气:${g.morale}`, { fontSize: 11, fill: 0x27AE60 });
    y += 18;
  });
}

function _renderSlaves(game, x, y, w, h) {
  const s = state.slaves;
  const assigned = Object.values(s.assigned).reduce((a, b) => a + b, 0);
  const available = s.total - assigned;

  game.ui.createText(x, y, '⛓️ 奴隶管理', { fontSize: 16, fill: 0xFFD700, bold: true });
  y += 25;
  game.ui.createText(x, y, `奴隶总数: ${s.total} | 已分配: ${assigned} | 可用: ${available}`, { fontSize: 13, fill: 0xD4A853 });
  y += 25;

  // Slave roles
  game.ui.createText(x, y, '【奴隶分配】', { fontSize: 13, fill: 0xFFD700, bold: true }); y += 22;

  Object.entries(SLAVE_ROLES).forEach(([id, role]) => {
    const count = s.assigned[id] || 0;
    game.ui.createPanel(x, y, w - 20, 40, '', 0x1a0a04);
    game.ui.createText(x + 10, y + 5, `${role.icon} ${role.name}: ${count}`, { fontSize: 12, fill: 0xF0E68C, bold: true });
    game.ui.createText(x + 10, y + 22, role.desc, { fontSize: 10, fill: 0x888888 });

    game.ui.createButton(x + w - 140, y + 5, 50, 26, '+1', () => {
      const added = state.assignSlave(id, 1);
      if (added > 0) _renderTribe(game);
      else alert('没有可用奴隶！');
    }, 0x2E4053);
    game.ui.createButton(x + w - 80, y + 5, 50, 26, '-1', () => {
      state.unassignSlave(id, 1);
      _renderTribe(game);
    }, 0x8B0000);
    y += 46;
  });

  // Slave training
  y += 10;
  game.ui.createText(x, y, '【奴隶培训改造】', { fontSize: 13, fill: 0xFFD700, bold: true }); y += 22;

  Object.entries(SLAVE_TRAINING).forEach(([id, train]) => {
    const costStr = Object.entries(train.cost).map(([k, v]) => `${k}:${v}`).join(' ');
    game.ui.createPanel(x, y, w - 20, 40, '', 0x1a0a04);
    game.ui.createText(x + 10, y + 5, `${train.name} (${train.turns}回合)`, { fontSize: 12, fill: 0xF0E68C, bold: true });
    game.ui.createText(x + 10, y + 22, `${train.desc} | 费用: ${costStr}`, { fontSize: 10, fill: 0x888888 });

    game.ui.createButton(x + w - 80, y + 5, 60, 26, '培训', () => {
      if (state.player.gold >= (train.cost.gold || 0)) {
        state.player.gold -= (train.cost.gold || 0);
        state.trainSlave(train);
        alert(`开始${train.name}，需${train.turns}回合`);
        _renderTribe(game);
      } else {
        alert('金币不足！');
      }
    }, 0x2E4053);
    y += 46;
  });

  // Training in progress
  if (s.training.length > 0) {
    y += 10;
    game.ui.createText(x, y, '【培训中】', { fontSize: 12, fill: 0xD4A853 }); y += 20;
    s.training.forEach(t => {
      game.ui.createText(x + 10, y, `${t.type} → ${t.result} (剩余${t.turnsLeft}回合)`, { fontSize: 11, fill: 0xCCCCCC });
      y += 18;
    });
  }

  // Trained citizens
  y += 10;
  game.ui.createText(x, y, '【已培训公民】', { fontSize: 12, fill: 0xD4A853 }); y += 20;
  Object.entries(state.trainedCitizens).forEach(([k, v]) => {
    if (v > 0) {
      game.ui.createText(x + 10, y, `${k}: ${v}`, { fontSize: 11, fill: 0x27AE60 });
      y += 18;
    }
  });
}

function _renderSlaveTrade(game, x, y, w, h) {
  game.ui.createText(x, y, '💰 奴隶买卖市场', { fontSize: 16, fill: 0xFFD700, bold: true });
  y += 15;
  const available = state.slaves.total - Object.values(state.slaves.assigned).reduce((a, b) => a + b, 0);
  game.ui.createText(x, y, `金币: ${state.player.gold} | 拥有奴隶: ${state.slaves.total} | 可出售: ${available}`, { fontSize: 12, fill: 0xD4A853 });
  y += 30;

  Object.entries(SLAVE_MARKETS).forEach(([id, market]) => {
    const nation = NATIONS[id];
    const nc = nation ? parseInt(nation.color.slice(1), 16) : 0xAAAAAA;
    game.ui.createPanel(x, y, w - 20, 65, '', 0x1a0a04);
    game.ui.createText(x + 10, y + 5, `${market.femaleOnly ? '♀' : '⛓️'} ${market.name}`, { fontSize: 13, fill: nc, bold: true });
    game.ui.createText(x + 10, y + 25, `容量: ${market.capacity} | 价格: ${market.price.low}-${market.price.high}金 | 供给: ${market.supply}`, { fontSize: 11, fill: 0xCCCCCC });
    if (market.femaleOnly) {
      game.ui.createText(x + 10, y + 42, '♀ 仅限女性奴隶', { fontSize: 11, fill: 0xFF69B4 });
    }

    game.ui.createButton(x + w - 160, y + 15, 60, 28, '购买x5', () => _buySlaves(game, id, 5), 0x8B0000);
    game.ui.createButton(x + w - 90, y + 15, 60, 28, '出售x5', () => _sellSlaves(game, id, 5), 0x2E4053);
    y += 72;
  });

  y += 10;
  game.ui.createText(x, y, '💡 可从敌对部落掠夺奴隶。同盟/归降/占领30天以上不可掠夺。', { fontSize: 11, fill: 0x888888 });
}

function _renderRecruit(game, x, y, w, h) {
  game.ui.createText(x, y, '⚔️ 征兵与招募', { fontSize: 14, fill: 0xFFD700, bold: true }); y += 25;

  game.ui.createText(x, y, '【部落征召方式】', { fontSize: 12, fill: 0xD4A853, bold: true }); y += 22;
  Object.entries(RECRUIT_RULES).forEach(([id, rule]) => {
    game.ui.createPanel(x, y, w - 20, 50, '', 0x1a0a04);
    game.ui.createText(x + 10, y + 5, rule.desc + (rule.femaleOnly ? ' ♀' : ''), { fontSize: 12, fill: rule.femaleOnly ? 0xFF69B4 : 0xFFD700, bold: true });
    const costStr = Object.entries(rule.cost).map(([k, v]) => `${k}:${v}`).join(' ');
    game.ui.createText(x + 10, y + 25, `费用: ${costStr} | 产出: ${rule.yield.min}-${rule.yield.max}人 | 兵种: ${rule.types.join(', ')}`, { fontSize: 11, fill: 0xCCCCCC });
    y += 55;
  });

  y += 10;
  game.ui.createText(x, y, '【雇佣兵】(即时生效，金币购买)', { fontSize: 12, fill: 0xD4A853, bold: true }); y += 22;
  game.ui.createText(x, y, '前往军事管理→雇佣兵页面购买', { fontSize: 11, fill: 0xAAAAAA }); y += 20;

  y += 10;
  game.ui.createText(x, y, '【城邦招聘】(需前往城邦)', { fontSize: 12, fill: 0xD4A853, bold: true }); y += 22;
  game.ui.createText(x, y, '武将 - 前往城邦酒馆招募，200金+5丝绸', { fontSize: 11, fill: 0xE74C3C }); y += 18;
  game.ui.createText(x, y, '文官 - 前往城邦学堂招聘，150金+3玉石', { fontSize: 11, fill: 0x3498DB }); y += 18;
  game.ui.createText(x, y, '商人 - 前往城邦集市雇佣，100金+5香料', { fontSize: 11, fill: 0xF39C12 }); y += 18;
  game.ui.createText(x, y, '密探 - 前往城邦暗巷寻觅，300金', { fontSize: 11, fill: 0x8E44AD }); y += 25;

  game.ui.createText(x, y, '💡 从部落征兵会降低忠诚度，志愿兵则提升忠诚度。', { fontSize: 11, fill: 0x888888 });
}

function _renderInfluence(game, x, y, w, h) {
  game.ui.createText(x, y, '🌍 六大帝国势力范围', { fontSize: 14, fill: 0xFFD700, bold: true }); y += 25;

  const colors = { han: 0xDC143C, xiongnu: 0x8B4513, kushan: 0xDAA520, parthia: 0x9B59B6, rome: 0x3498DB, sassanid: 0x8B008B };

  Object.entries(INFLUENCE_ZONES).forEach(([id, zone]) => {
    const c = colors[id] || 0xAAAAAA;
    game.ui.createPanel(x, y, w - 20, 80, '', 0x1a0a04);
    game.ui.createText(x + 10, y + 5, zone.name, { fontSize: 14, fill: c, bold: true });
    game.ui.createText(x + 10, y + 25, `影响力: ${zone.influence}% | 驻军: ${zone.troops} | 位置: ${zone.garrison}`, { fontSize: 11, fill: 0xCCCCCC });
    const zoneNames = zone.zones.map(z => NATIONS[z]?.name || z).join('、');
    game.ui.createText(x + 10, y + 45, `势力范围: ${zoneNames || '无直接控制'}`, { fontSize: 11, fill: 0xAAAAAA });
    game.ui.createProgressBar(x + 10, y + 62, 200, 8, zone.influence, 100, c);
    y += 90;
  });
}

// === Actions ===

function _recruitFrom(game, tribe) {
  const count = Math.floor(Math.random() * 10) + 5;
  const isFemale = tribe.female;
  const unitType = isFemale
    ? (Math.random() > 0.5 ? 'femaleInfantry' : 'femaleCavalry')
    : (Math.random() > 0.5 ? 'infantry' : 'cavalry');
  if (state.army[unitType] !== undefined) {
    state.army[unitType] += count;
  }
  state.player.gold -= 10;
  state.resources.food -= 5;
  alert(`从${tribe.name}征得 ${UNIT_TYPES[unitType]?.name || unitType} x${count}！`);
}

function _tradeWith(game, tribe) {
  const resKeys = Object.keys(tribe.res);
  if (resKeys.length > 0) {
    const res = resKeys[Math.floor(Math.random() * resKeys.length)];
    const amount = tribe.res[res];
    alert(`与${tribe.name}交易获得 ${RESOURCE_TYPES[res]?.icon || ''}${RESOURCE_TYPES[res]?.name || res} x${amount}`);
  }
}

function _plunderTribe(game, tribe) {
  if (!PLUNDER_RULES.canPlunder(tribe, state)) {
    alert('该部落已归降/同盟/占领超过30天，不可掠夺！');
    return;
  }
  const result = state.plunderSlaves(tribe);
  alert(`掠夺${tribe.name}！获得 ${result.slaves} 名奴隶，${result.gold} 金币`);
}

function _buySlaves(game, marketId, count) {
  const market = SLAVE_MARKETS[marketId];
  const avgPrice = (market.price.low + market.price.high) / 2;
  const cost = Math.floor(count * avgPrice);
  if (state.player.gold >= cost) {
    state.buySlaves(count, cost);
    alert(`在${market.name}购买 ${count} 名奴隶，花费 ${cost} 金`);
    _renderTribe(game);
  } else {
    alert('金币不足！');
  }
}

function _sellSlaves(game, marketId, count) {
  const market = SLAVE_MARKETS[marketId];
  const sold = state.sellSlaves(count, market.price.low);
  if (sold > 0) {
    alert(`在${market.name}出售 ${sold} 名奴隶`);
    _renderTribe(game);
  } else {
    alert('没有可出售的奴隶（需先从分配中释放）');
  }
}