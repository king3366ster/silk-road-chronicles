/**
 * Military Scene v4 - 军事管理 + 战争前置条件
 * 7 unit types with counter system, mercenaries, war prerequisites
 */
import { state } from '../core/gameState.js';
import { NATION_LIST, NATIONS } from '../data/nations.js';
import { UNIT_TYPES, COUNTER_TABLE, MERCENARY_TYPES, TRIBES_FULL, isAllFemaleNation } from '../data/worldData.js';
import { canAttackNation, ABILITIES, RECRUITMENT_COSTS } from '../data/questSystem.js';

let _tab = 'army'; // army | counter | mercenary | recruit | war

export function showMilitary(game) {
  game._clearUI();
  game.scene = 'military';
  _renderMilitary(game);
}

function _renderMilitary(game) {
  game.ui.createPanel(20, 20, game.w - 40, game.h - 40, '⚔️ 军事管理');

  // Tab bar
  const tabs = ['army|兵力总览', 'counter|克制关系', 'mercenary|雇佣兵', 'recruit|征兵', 'war|⚔️宣战'];
  let tx = 60;
  tabs.forEach(t => {
    const [id, label] = t.split('|');
    const active = _tab === id;
    game.ui.createButton(tx, 65, 100, 28, label, () => { _tab = id; _renderMilitary(game); },
      active ? 0xD4A853 : 0x4A3728, active ? 0x000000 : 0xD4A853);
    tx += 110;
  });

  // Content area
  const cx = 50, cy = 100, cw = game.w - 100, ch = game.h - 180;
  game.ui.createPanel(cx, cy, cw, ch, '', 0x1a1008);

  if (_tab === 'army') _renderArmy(game, cx + 10, cy + 10, cw - 20, ch - 20);
  else if (_tab === 'counter') _renderCounter(game, cx + 10, cy + 10, cw - 20, ch - 20);
  else if (_tab === 'mercenary') _renderMercenary(game, cx + 10, cy + 10, cw - 20, ch - 20);
  else if (_tab === 'recruit') _renderRecruit(game, cx + 10, cy + 10, cw - 20, ch - 20);
  else if (_tab === 'war') _renderWar(game, cx + 10, cy + 10, cw - 20, ch - 20);

  game.ui.createButton(game.w / 2 - 60, game.h - 60, 120, 40, '返回地图', () => game._showMap());
}

function _renderArmy(game, x, y, w, h) {
  const a = state.army;
  const total = state.totalArmy;

  game.ui.createText(x, y, `总兵力: ${total}  士气: ${a.morale}`, { fontSize: 16, fill: 0xFFD700, bold: true });
  y += 30;

  // 7 unit types display (含女弓骑兵)
  const units = [
    { key: 'infantry', ...UNIT_TYPES.infantry },
    { key: 'cavalry', ...UNIT_TYPES.cavalry },
    { key: 'archerCav', ...UNIT_TYPES.archerCav },
    { key: 'camel', ...UNIT_TYPES.camel },
    { key: 'femaleInfantry', ...UNIT_TYPES.femaleInfantry },
    { key: 'femaleCavalry', ...UNIT_TYPES.femaleCavalry },
    { key: 'femaleArcherCav', ...UNIT_TYPES.femaleArcherCav },
  ];

  units.forEach(u => {
    const count = a[u.key] || 0;
    game.ui.createPanel(x, y, w - 20, 50, '', 0x1a0a04);

    // Icon + name
    game.ui.createText(x + 10, y + 5, `${u.icon} ${u.name}`, { fontSize: 14, fill: u.color, bold: true });
    game.ui.createText(x + 10, y + 25, u.desc, { fontSize: 10, fill: 0x888888 });

    // Count
    game.ui.createText(x + 300, y + 15, `数量: ${count}`, { fontSize: 14, fill: 0xF0E68C, bold: true });

    // Stats
    game.ui.createText(x + 400, y + 5, `攻:${u.atk} 防:${u.def} 速:${u.spd}`, { fontSize: 11, fill: 0xCCCCCC });
    game.ui.createText(x + 400, y + 25, `射程:${u.range} ${u.femaleOnly ? '♀女兵' : ''}`, { fontSize: 11, fill: u.femaleOnly ? 0xFF69B4 : 0xAAAAAA });

    // Counter info
    const counterNames = u.counters.map(c => UNIT_TYPES[c]?.name || c).join('、');
    game.ui.createText(x + 550, y + 5, `克制: ${counterNames}`, { fontSize: 11, fill: 0x27AE60 });
    const cByNames = u.counteredBy.map(c => UNIT_TYPES[c]?.name || c).join('、');
    game.ui.createText(x + 550, y + 25, `被克: ${cByNames}`, { fontSize: 11, fill: 0xE74C3C });

    y += 58;
  });

  // Morale bar
  y += 10;
  game.ui.createText(x, y, '士气:', { fontSize: 13, fill: 0xD4A853 });
  game.ui.createProgressBar(x + 50, y - 3, 200, 14, a.morale, 100,
    a.morale > 70 ? 0x27AE60 : a.morale > 50 ? 0xF39C12 : 0xE74C3C);
}

function _renderCounter(game, x, y, w, h) {
  game.ui.createText(x, y, '⚔️ 兵种克制关系', { fontSize: 16, fill: 0xFFD700, bold: true });
  y += 30;

  game.ui.createText(x, y, '克制链: 弓骑→步兵→骆驼→骑兵→弓骑', { fontSize: 13, fill: 0xD4A853 });
  y += 20;
  game.ui.createText(x, y, '女兵克制同类型男兵（士气优势）| 女弓骑兵克制步兵与骆驼', { fontSize: 13, fill: 0xFF69B4 });
  y += 20;
  game.ui.createText(x, y, '骆驼兵在沙漠地形战力×1.5', { fontSize: 13, fill: 0xD4A853 });
  y += 30;

  // Counter table header
  const types = Object.keys(COUNTER_TABLE);
  const colW = 75;
  game.ui.createText(x, y, '攻↓\\守→', { fontSize: 10, fill: 0x888888 });
  types.forEach((t, i) => {
    game.ui.createText(x + 80 + i * colW, y, UNIT_TYPES[t].name, { fontSize: 10, fill: UNIT_TYPES[t].color });
  });
  y += 20;

  // Counter table rows
  types.forEach(attacker => {
    game.ui.createText(x, y, UNIT_TYPES[attacker].name, { fontSize: 10, fill: UNIT_TYPES[attacker].color });
    types.forEach((defender, i) => {
      const mult = COUNTER_TABLE[attacker][defender];
      let color = 0xCCCCCC;
      if (mult > 1.2) color = 0x27AE60;      // strong advantage
      else if (mult > 1.0) color = 0x7DCEA0;  // slight advantage
      else if (mult < 0.7) color = 0xE74C3C;  // strong disadvantage
      else if (mult < 1.0) color = 0xF39C12;  // slight disadvantage
      game.ui.createText(x + 80 + i * colW, y, `${mult.toFixed(1)}`, { fontSize: 11, fill: color, bold: mult > 1.2 || mult < 0.7 });
    });
    y += 20;
  });

  y += 20;
  game.ui.createText(x, y, '💡 数值>1.0表示攻击方优势，<1.0表示劣势', { fontSize: 11, fill: 0x888888 });
}

function _renderMercenary(game, x, y, w, h) {
  game.ui.createText(x, y, '💰 雇佣兵市场', { fontSize: 16, fill: 0xFFD700, bold: true });
  y += 15;
  game.ui.createText(x, y, `可用金币: ${state.player.gold}`, { fontSize: 12, fill: 0xD4A853 });
  y += 30;

  Object.entries(MERCENARY_TYPES).forEach(([id, m]) => {
    const ut = UNIT_TYPES[m.type];
    game.ui.createPanel(x, y, w - 20, 55, '', 0x1a0a04);
    game.ui.createText(x + 10, y + 5, `${ut?.icon || '⚔️'} ${m.name}`, { fontSize: 13, fill: ut?.color || 0xCCCCCC, bold: true });
    game.ui.createText(x + 10, y + 25, m.desc, { fontSize: 11, fill: 0xAAAAAA });
    game.ui.createText(x + 10, y + 40, `类型: ${ut?.name || m.type} | 攻:${m.atk} 防:${m.def}`, { fontSize: 11, fill: 0xCCCCCC });
    game.ui.createButton(x + w - 160, y + 12, 130, 30, `雇佣 ${m.cost}金`, () => {
      if (state.hireMercenary(id, m.cost)) {
        // Add to army
        if (state.army[m.type] !== undefined) state.army[m.type] += 10;
        alert(`雇佣了 ${m.name} x10！`);
        _renderMilitary(game);
      } else {
        alert('金币不足！');
      }
    }, 0x8B0000);
    y += 62;
  });
}

function _renderRecruit(game, x, y, w, h) {
  game.ui.createText(x, y, '⚔️ 部落征召', { fontSize: 16, fill: 0xFFD700, bold: true });
  y += 15;
  game.ui.createText(x, y, `金币: ${state.player.gold} | 粮食: ${state.resources.food} | 马: ${state.resources.horse} | 骆驼: ${state.resources.camel}`, { fontSize: 12, fill: 0xD4A853 });
  y += 30;

  // 7 unit types for recruitment (含女弓骑兵)
  const units = [
    { key: 'infantry', ...UNIT_TYPES.infantry },
    { key: 'cavalry', ...UNIT_TYPES.cavalry },
    { key: 'archerCav', ...UNIT_TYPES.archerCav },
    { key: 'camel', ...UNIT_TYPES.camel },
    { key: 'femaleInfantry', ...UNIT_TYPES.femaleInfantry },
    { key: 'femaleCavalry', ...UNIT_TYPES.femaleCavalry },
    { key: 'femaleArcherCav', ...UNIT_TYPES.femaleArcherCav },
  ];

  units.forEach(u => {
    game.ui.createPanel(x, y, w - 20, 45, '', 0x1a0a04);
    game.ui.createText(x + 10, y + 5, `${u.icon} ${u.name}`, { fontSize: 13, fill: u.color, bold: true });
    const costStr = Object.entries(u.cost).map(([k, v]) => `${k}:${v}`).join(' ');
    game.ui.createText(x + 10, y + 25, `费用: ${costStr} | 攻:${u.atk} 防:${u.def}`, { fontSize: 11, fill: 0xCCCCCC });

    game.ui.createButton(x + w - 200, y + 8, 80, 28, '征召x10', () => {
      if (state.recruitTribeSoldiers(u.key, 10)) {
        alert(`征召了 ${u.name} x10！`);
        _renderMilitary(game);
      } else {
        alert('资源不足！');
      }
    }, 0x2E4053);
    game.ui.createButton(x + w - 110, y + 8, 80, 28, '征召x50', () => {
      if (state.recruitTribeSoldiers(u.key, 50)) {
        alert(`征召了 ${u.name} x50！`);
        _renderMilitary(game);
      } else {
        alert('资源不足！');
      }
    }, 0x8B0000);
    y += 52;
  });
}

// === WAR DECLARATION TAB ===
function _renderWar(game, x, y, w, h) {
  const hasWarAbility = state.unlockedAbilities.includes('war_declaration');

  game.ui.createText(x, y, '⚔️ 宣战管理', { fontSize: 16, fill: 0xFFD700, bold: true });
  y += 22;

  if (!hasWarAbility) {
    game.ui.createText(x, y, '🔒 需要先解锁「宣战能力」', { fontSize: 13, fill: 0xE74C3C });
    y += 20;
    game.ui.createText(x, y, '💡 完成城市发展任务，将城市升级至3级即可解锁。', { fontSize: 11, fill: 0x888888 });
    y += 20;
    game.ui.createText(x, y, `当前城市等级: ${state.nationLevel} (需要3级)`, { fontSize: 11, fill: 0xAAAAAA });
    return;
  }

  game.ui.createText(x, y, `我方总兵力: ${state.totalArmy} | 金: ${state.player.gold} | 粮: ${state.resources.food}`, 
    { fontSize: 12, fill: 0xD4A853 });
  y += 20;
  game.ui.createText(x, y, '⚠️ 攻城前需完成该城邦50%以上的部落任务', { fontSize: 11, fill: 0xF39C12 });
  y += 25;

  // Nation list with war prerequisites
  game.ui.createText(x, y, '【城邦攻占条件】', { fontSize: 13, fill: 0xFFD700, bold: true }); y += 22;

  const nationKeys = Object.keys(NATIONS).slice(0, 10);
  nationKeys.forEach(nId => {
    const nation = NATIONS[nId];
    if (!nation) return;
    const nc = parseInt(nation.color.slice(1), 16);
    const attackCheck = canAttackNation(nId, state, TRIBES_FULL);
    const isAtWar = state.atWar?.includes(nId);

    game.ui.createPanel(x, y, w - 20, 55, '', 0x1a0a04);
    game.ui.createText(x + 10, y + 5, `${nation.name}`, { fontSize: 13, fill: nc, bold: true });
    if (isAllFemaleNation(nId)) {
      game.ui.createText(x + 100, y + 5, '♀', { fontSize: 13, fill: 0xFF69B4 });
    }
    game.ui.createText(x + 10, y + 22, attackCheck.reason, { fontSize: 11, fill: attackCheck.canAttack ? 0x27AE60 : 0x888888 });

    // Progress bar for tribe quests
    if (attackCheck.total > 0) {
      game.ui.createText(x + 10, y + 38, `部落任务: ${attackCheck.completed}/${attackCheck.required}(需${Math.ceil(attackCheck.total * 0.5)}/${attackCheck.total})`, 
        { fontSize: 10, fill: 0x85C1E9 });
      game.ui.createProgressBar(x + 250, y + 38, 100, 8, attackCheck.completed, attackCheck.total, 
        attackCheck.canAttack ? 0x27AE60 : 0xF39C12);
    }

    if (isAtWar) {
      game.ui.createButton(x + w - 120, y + 12, 90, 28, '⚔️交战中', () => {}, 0x8B0000);
    } else if (attackCheck.canAttack) {
      game.ui.createButton(x + w - 120, y + 12, 90, 28, '⚔️宣战!', () => {
        if (confirm(`确定向${nation.name}宣战？\n这将消耗大量资源和兵力。`)) {
          state.declareWar(nId);
          alert(`已向${nation.name}宣战！`);
          _renderMilitary(game);
        }
      }, 0xE74C3C);
    } else {
      game.ui.createText(x + w - 120, y + 15, '🔒不可攻', { fontSize: 11, fill: 0x666666 });
    }
    y += 60;
  });

  // Active wars
  if (state.atWar?.length > 0) {
    y += 5;
    game.ui.createText(x, y, `【当前交战: ${state.atWar.length}】`, { fontSize: 12, fill: 0xE74C3C, bold: true }); y += 20;
    state.atWar.forEach(nId => {
      const nation = NATIONS[nId];
      if (nation) {
        game.ui.createText(x + 10, y, `⚔️ ${nation.name}`, { fontSize: 11, fill: parseInt(nation.color.slice(1), 16) });
        y += 16;
      }
    });
  }
}
