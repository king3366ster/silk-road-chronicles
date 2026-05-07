/**
 * Tribe Scene v5 - 部落管理 + 任务系统
 * Fixed: replaced alert() with toast, better layout
 */
import { state } from '../core/gameState.js';
import { NATIONS } from '../data/nations.js';
import { TRIBES_FULL, GARRISONS, RESOURCE_TYPES, SLAVE_TYPES, SLAVE_MARKETS, SLAVE_ROLES, SLAVE_PREFERENCES, PLUNDER_RULES, RECRUIT_RULES, INFLUENCE_ZONES, UNIT_TYPES } from '../data/worldData.js';
import { getAvailableQuests, generateTribeQuests, generateCapitalQuests, canAttackNation, getNextObjective, ABILITIES, GAME_PHASES, CITY_DEVELOPMENT, RECRUITMENT_COSTS } from '../data/questSystem.js';

let _tab = 'tribes';
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

  const tabs = ['tribes|部落总览', 'quests|📜任务', 'develop|城市发展', 'garrison|城邦守军', 'slaves|奴隶管理', 'trade|奴隶买卖', 'recruit|征兵招募', 'influence|六大帝国'];
  let tx = 40;
  tabs.forEach(t => {
    const [id, label] = t.split('|');
    const active = _tab === id;
    game.ui.createButton(tx, 65, 95, 28, label, () => { _tab = id; _scrollY = 0; _renderTribe(game); },
      { color: active ? 0xD4A853 : 0x4A3728, textColor: active ? 0x000000 : 0xD4A853 });
    tx += 100;
  });

  const cx = 50, cy = 100, cw = game.w - 100, ch = game.h - 180;
  game.ui.createPanel(cx, cy, cw, ch, '', { bgColor: 0x1a1008 });

  if (_tab === 'tribes') _renderTribes(game, cx + 10, cy + 10, cw - 20, ch - 20);
  else if (_tab === 'quests') _renderQuests(game, cx + 10, cy + 10, cw - 20, ch - 20);
  else if (_tab === 'develop') _renderDevelopment(game, cx + 10, cy + 10, cw - 20, ch - 20);
  else if (_tab === 'garrison') _renderGarrison(game, cx + 10, cy + 10, cw - 20, ch - 20);
  else if (_tab === 'slaves') _renderSlaves(game, cx + 10, cy + 10, cw - 20, ch - 20);
  else if (_tab === 'trade') _renderSlaveTrade(game, cx + 10, cy + 10, cw - 20, ch - 20);
  else if (_tab === 'recruit') _renderRecruit(game, cx + 10, cy + 10, cw - 20, ch - 20);
  else if (_tab === 'influence') _renderInfluence(game, cx + 10, cy + 10, cw - 20, ch - 20);

  game.ui.createButton(game.w / 2 - 60, game.h - 60, 120, 40, '返回地图', () => game._showMap());
}

function _renderTribes(game, x, y, w, h) {
  game.ui.createText(x, y, '筛选城邦:', { fontSize: 12, fill: 0xD4A853 });
  const nations = ['all|全部', ...Object.keys(NATIONS).slice(0, 10).map(k => `${k}|${NATIONS[k].name}`)];
  let fx = x + 70;
  for (let i = 0; i < Math.min(nations.length, 8); i++) {
    const [id, label] = nations[i].split('|');
    const active = _nationFilter === id;
    game.ui.createButton(fx, y - 5, 55, 22, label, () => { _nationFilter = id; _renderTribe(game); },
      { color: active ? 0x50C878 : 0x2a1a08, textColor: active ? 0x000000 : 0xAAAAAA });
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
    const canPlunder = PLUNDER_RULES && PLUNDER_RULES.canPlunder ? PLUNDER_RULES.canPlunder(t, state) : false;

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

    game.ui.createButton(x + w - 200, rowY - 5, 55, 20, '征兵', () => _recruitFrom(game, t), { color: 0x8B0000 });
    game.ui.createButton(x + w - 140, rowY - 5, 55, 20, '贸易', () => _tradeWith(game, t), { color: 0x2E4053 });
    if (canPlunder) {
      game.ui.createButton(x + w - 75, rowY - 5, 55, 20, '掠夺', () => _plunderTribe(game, t), { color: 0x6B0000 });
    }
  }

  const totalPop = filtered.reduce((s, t) => s + t.pop, 0);
  const totalTroops = filtered.reduce((s, t) => s + t.troops, 0);
  game.ui.createText(x, y + maxRows * 22 + 10,
    `共 ${filtered.length} 个部落 | 总人口: ${totalPop.toLocaleString()} | 可征兵: ${totalTroops.toLocaleString()}`,
    { fontSize: 13, fill: 0xFFD700, bold: true });
  game.ui.createText(x, y + maxRows * 22 + 30,
    '💡 同盟/归降/占领30天以上的部落不可掠夺 | 掠夺阿玛宗/西梁获得女奴隶',
    { fontSize: 11, fill: 0x888888 });
}

function _renderGarrison(game, x, y, w, h) {
  game.ui.createText(x, y, '🏰 城邦守军', { fontSize: 14, fill: 0xFFD700, bold: true }); y += 25;
  game.ui.createText(x, y, '【城邦守兵】', { fontSize: 12, fill: 0xD4A853, bold: true }); y += 20;

  const cityEntries = Object.entries(GARRISONS.cities || {});
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
  Object.entries(GARRISONS.passes || {}).forEach(([name, g]) => {
    game.ui.createText(x, y, `🏔️ ${name}: 兵力${g.troops} 士气${g.morale}`, { fontSize: 11, fill: 0xDEB887 });
    y += 18;
  });
  y += 5;
  game.ui.createText(x, y, '【渡口守兵】', { fontSize: 12, fill: 0xD4A853, bold: true }); y += 20;
  Object.entries(GARRISONS.ferries || {}).forEach(([name, g]) => {
    game.ui.createText(x, y, `⚓ ${name}: 兵力${g.troops} 士气${g.morale}`, { fontSize: 11, fill: 0x5DADE2 });
    y += 18;
  });
}

function _renderSlaves(game, x, y, w, h) {
  const s = state.slaves;
  const assigned = Object.values(s.assigned).reduce((a, b) => a + b, 0);
  const available = s.total - assigned;

  game.ui.createText(x, y, '⛓️ 奴隶管理（六大类型）', { fontSize: 16, fill: 0xFFD700, bold: true });
  y += 25;
  game.ui.createText(x, y, `奴隶总数: ${s.total} | 已分配: ${assigned} | 可用: ${available}`, { fontSize: 13, fill: 0xD4A853 });
  y += 25;

  game.ui.createText(x, y, '【奴隶库存】', { fontSize: 13, fill: 0xFFD700, bold: true }); y += 22;
  Object.entries(SLAVE_TYPES).forEach(([id, st]) => {
    const count = s.inventory[id] || 0;
    game.ui.createPanel(x, y, w - 20, 35, 0x1a0a04);
    game.ui.createText(x + 10, y + 5, `${st.icon} ${st.name}: ${count}`, { fontSize: 12, fill: st.color, bold: true });
    game.ui.createText(x + 150, y + 5, `单价:${st.basePrice}金`, { fontSize: 11, fill: 0xCCCCCC });
    game.ui.createText(x + 10, y + 20, st.desc, { fontSize: 10, fill: 0x888888 });
    y += 40;
  });

  y += 5;
  game.ui.createText(x, y, '【奴隶分配】', { fontSize: 13, fill: 0xFFD700, bold: true }); y += 22;
  Object.entries(SLAVE_ROLES).forEach(([id, role]) => {
    const count = s.assigned[id] || 0;
    game.ui.createPanel(x, y, w - 20, 35, 0x1a0a04);
    game.ui.createText(x + 10, y + 5, `${role.icon} ${role.name}: ${count}`, { fontSize: 12, fill: 0xF0E68C, bold: true });
    game.ui.createText(x + 10, y + 20, `${role.desc}`, { fontSize: 10, fill: 0x888888 });

    game.ui.createButton(x + w - 140, y + 3, 50, 26, '+1', () => {
      const added = state.assignSlave(id, 1);
      if (added > 0) _renderTribe(game);
      else game.ui.showToast('没有可用奴隶！');
    }, { color: 0x2E4053 });
    game.ui.createButton(x + w - 80, y + 3, 50, 26, '-1', () => {
      state.unassignSlave(id, 1);
      _renderTribe(game);
    }, { color: 0x8B0000 });
    y += 40;
  });

  if (s.training && s.training.length > 0) {
    y += 5;
    game.ui.createText(x, y, '【培训中】', { fontSize: 12, fill: 0xD4A853 }); y += 20;
    s.training.forEach(t => {
      game.ui.createText(x + 10, y, `${t.type} → ${t.result} (剩余${t.turnsLeft}回合)`, { fontSize: 11, fill: 0xCCCCCC });
      y += 18;
    });
  }
}

function _renderSlaveTrade(game, x, y, w, h) {
  game.ui.createText(x, y, '💰 奴隶买卖市场', { fontSize: 16, fill: 0xFFD700, bold: true });
  y += 15;
  game.ui.createText(x, y, `金币: ${state.player.gold} | 奴隶总数: ${state.slaves.total}`, { fontSize: 12, fill: 0xD4A853 });
  y += 25;

  game.ui.createText(x, y, '【当前库存】', { fontSize: 12, fill: 0xD4A853, bold: true }); y += 20;
  const invStr = Object.entries(state.slaves.inventory).map(([k, v]) => {
    const st = SLAVE_TYPES[k];
    return `${st?.icon || ''}${st?.name || k}:${v}`;
  }).join('  ');
  game.ui.createText(x + 10, y, invStr, { fontSize: 11, fill: 0xF0E68C });
  y += 25;

  game.ui.createText(x, y, '【奴隶市场】', { fontSize: 13, fill: 0xFFD700, bold: true }); y += 22;
  Object.entries(SLAVE_MARKETS).forEach(([id, market]) => {
    const nation = NATIONS[id];
    const nc = nation ? parseInt(nation.color.slice(1), 16) : 0xAAAAAA;
    const pref = SLAVE_PREFERENCES[id];
    game.ui.createPanel(x, y, w - 20, 75, 0x1a0a04);
    game.ui.createText(x + 10, y + 5, `${market.name}`, { fontSize: 13, fill: nc, bold: true });
    game.ui.createText(x + 10, y + 22, `容量:${market.capacity}`, { fontSize: 11, fill: 0xCCCCCC });
    if (pref) {
      const prefNames = pref.prefer.map(t => SLAVE_TYPES[t]?.name || t).join('、');
      game.ui.createText(x + 10, y + 38, `偏好: ${prefNames}`, { fontSize: 10, fill: 0x27AE60 });
    }

    const supplyStr = Object.entries(market.supply).filter(([, v]) => v > 0).map(([k, v]) => {
      const st = SLAVE_TYPES[k];
      return `${st?.icon || ''}${v}`;
    }).join(' ');
    game.ui.createText(x + 10, y + 54, `供应: ${supplyStr}`, { fontSize: 10, fill: 0x85C1E9 });

    let bx = x + w - 280;
    Object.entries(market.supply).filter(([, v]) => v > 0).slice(0, 4).forEach(([type]) => {
      const st = SLAVE_TYPES[type];
      if (!st) return;
      const price = st.basePrice;
      game.ui.createButton(bx, y + 5, 60, 24, `${st.icon}买`, () => {
        if (state.player.gold >= price) {
          state.buySlaves(type, 1, price);
          game.ui.showToast(`购买1名${st.name}，花费${price}金`);
          _renderTribe(game);
        } else game.ui.showToast('金币不足！');
      }, { color: 0x8B0000 });
      game.ui.createButton(bx, y + 32, 60, 24, `${st.icon}卖`, () => {
        const sold = state.sellSlaves(type, 1, Math.floor(price * 0.7));
        if (sold > 0) { game.ui.showToast(`出售1名${st.name}`); _renderTribe(game); }
        else game.ui.showToast(`没有可出售的${st.name}`);
      }, { color: 0x2E4053 });
      bx += 65;
    });
    y += 82;
  });
}

function _renderRecruit(game, x, y, w, h) {
  game.ui.createText(x, y, '⚔️ 征兵与招募', { fontSize: 14, fill: 0xFFD700, bold: true }); y += 25;
  game.ui.createText(x, y, '【部落征召方式】', { fontSize: 12, fill: 0xD4A853, bold: true }); y += 22;
  Object.entries(RECRUIT_RULES || {}).forEach(([id, rule]) => {
    game.ui.createPanel(x, y, w - 20, 40, 0x1a0a04);
    game.ui.createText(x + 10, y + 5, rule.desc + (rule.femaleOnly ? ' ♀' : ''), { fontSize: 12, fill: rule.femaleOnly ? 0xFF69B4 : 0xFFD700, bold: true });
    const costStr = Object.entries(rule.cost).map(([k, v]) => `${k}:${v}`).join(' ');
    game.ui.createText(x + 10, y + 22, `费用: ${costStr} | 产出: ${rule.yield.min}-${rule.yield.max}人`, { fontSize: 11, fill: 0xCCCCCC });
    y += 45;
  });

  y += 10;
  game.ui.createText(x, y, '【城邦招聘】', { fontSize: 12, fill: 0xD4A853, bold: true }); y += 22;
  game.ui.createText(x, y, '武将200金+5丝绸 | 文官150金+3玉石 | 商人100金+5香料 | 密探300金', { fontSize: 11, fill: 0xAAAAAA });
}

function _renderInfluence(game, x, y, w, h) {
  game.ui.createText(x, y, '🌍 六大帝国势力范围', { fontSize: 14, fill: 0xFFD700, bold: true }); y += 25;
  const colors = { han: 0xDC143C, xiongnu: 0x8B4513, kushan: 0xDAA520, parthia: 0x9B59B6, rome: 0x3498DB, sassanid: 0x8B008B };

  Object.entries(INFLUENCE_ZONES || {}).forEach(([id, zone]) => {
    const c = colors[id] || 0xAAAAAA;
    const pref = SLAVE_PREFERENCES[id];
    game.ui.createPanel(x, y, w - 20, 75, 0x1a0a04);
    game.ui.createText(x + 10, y + 5, zone.name, { fontSize: 14, fill: c, bold: true });
    game.ui.createText(x + 10, y + 25, `影响力: ${zone.influence}% | 驻军: ${zone.troops}`, { fontSize: 11, fill: 0xCCCCCC });
    if (pref) {
      const prefNames = pref.prefer.map(t => SLAVE_TYPES[t]?.name || t).join('、');
      game.ui.createText(x + 10, y + 42, `奴隶偏好: ${prefNames}`, { fontSize: 11, fill: 0x27AE60 });
    }
    game.ui.createProgressBar(x + 10, y + 60, 200, 8, zone.influence, 100, c);
    y += 82;
  });
}

// === QUEST & PROGRESSION TAB ===

function _renderQuests(game, x, y, w, h) {
  const phase = state.gamePhase || 'nation_select';
  const phaseData = GAME_PHASES[phase] || GAME_PHASES.nation_select;
  const nextObj = getNextObjective(state, TRIBES_FULL);

  game.ui.createText(x, y, `${phaseData.icon} 当前阶段: ${phaseData.name}`, { fontSize: 14, fill: 0xFFD700, bold: true });
  y += 20;
  game.ui.createText(x, y, `📋 ${nextObj.text}`, { fontSize: 12, fill: 0x50C878 });
  y += 20;
  game.ui.createText(x, y, `回合:${state.turn} | 等级:${state.nationLevel} | 金:${state.player.gold} | 粮:${state.resources.food}`, { fontSize: 11, fill: 0xAAAAAA });
  y += 25;

  game.ui.createText(x, y, '【已解锁能力】', { fontSize: 12, fill: 0xD4A853, bold: true }); y += 20;
  if (state.unlockedAbilities.length === 0) {
    game.ui.createText(x + 10, y, '暂无 - 完成任务来解锁能力', { fontSize: 11, fill: 0x888888 });
    y += 18;
  } else {
    let abX = x + 10;
    state.unlockedAbilities.forEach(abId => {
      const ab = ABILITIES[abId];
      if (ab) {
        game.ui.createText(abX, y, `${ab.icon}${ab.name}`, { fontSize: 11, fill: 0x50C878 });
        abX += 80;
        if (abX > x + w - 80) { abX = x + 10; y += 18; }
      }
    });
    y += 22;
  }

  y += 5;
  game.ui.createText(x, y, '【可接任务】', { fontSize: 13, fill: 0xFFD700, bold: true }); y += 22;

  const availableQuests = getAvailableQuests(state, TRIBES_FULL);
  if (availableQuests.length === 0) {
    game.ui.createText(x + 10, y, '当前没有可用任务。', { fontSize: 11, fill: 0x888888 });
    y += 40;
  } else {
    availableQuests.forEach(quest => {
      const canComplete = state.checkQuestCompletion(quest);
      const diffColors = { easy: 0x27AE60, medium: 0xF39C12, hard: 0xE74C3C };
      const dc = diffColors[quest.difficulty] || 0xAAAAAA;

      game.ui.createPanel(x, y, w - 20, 70, 0x1a0a04);
      game.ui.createText(x + 10, y + 5, `${quest.name}`, { fontSize: 12, fill: 0xF0E68C, bold: true });
      game.ui.createText(x + w - 100, y + 5, `[${quest.difficulty || '?'}]`, { fontSize: 11, fill: dc });
      game.ui.createText(x + 10, y + 22, quest.desc, { fontSize: 10, fill: 0xCCCCCC });

      const objStr = (quest.objectives || []).map(o => o.desc).join(' | ');
      game.ui.createText(x + 10, y + 37, `目标: ${objStr}`, { fontSize: 10, fill: 0x85C1E9 });

      const r = quest.rewards || {};
      const rewardParts = [];
      if (r.gold) rewardParts.push(`金+${r.gold}`);
      if (r.food) rewardParts.push(`粮+${r.food}`);
      if (r.unlockAbility) rewardParts.push(`解锁:${ABILITIES[r.unlockAbility]?.name || r.unlockAbility}`);
      if (r.citizens) rewardParts.push('公民');
      if (r.slaves) rewardParts.push('奴隶');
      game.ui.createText(x + 10, y + 52, `奖励: ${rewardParts.join(' | ')}`, { fontSize: 10, fill: 0x50C878 });

      if (canComplete) {
        game.ui.createButton(x + w - 100, y + 35, 80, 28, '✅ 完成', () => {
          const result = state.payAndCompleteQuest(quest);
          game.ui.showToast(result.msg);
          _renderTribe(game);
        }, { color: 0x27AE60 });
      } else {
        game.ui.createButton(x + w - 100, y + 35, 80, 28, '📋 接受', () => {
          state.startQuest(quest.id);
          game.ui.showToast(`已接受任务: ${quest.name}`);
          _renderTribe(game);
        }, { color: 0x2E4053 });
      }
      y += 75;
    });
  }

  y += 5;
  game.ui.createText(x, y, `【已完成任务: ${state.completedQuests.length}】`, { fontSize: 12, fill: 0xD4A853, bold: true }); y += 20;
  state.completedQuests.slice(-5).forEach(qId => {
    game.ui.createText(x + 10, y, `✅ ${qId}`, { fontSize: 10, fill: 0x666666 });
    y += 15;
  });

  y += 10;
  game.ui.createText(x, y, '【攻城前置条件】', { fontSize: 12, fill: 0xD4A853, bold: true }); y += 20;
  Object.keys(NATIONS).slice(0, 10).forEach(nId => {
    const attackCheck = canAttackNation(nId, state, TRIBES_FULL);
    const nation = NATIONS[nId];
    const statusIcon = attackCheck.canAttack ? '⚔️' : '🔒';
    game.ui.createText(x + 10, y, `${statusIcon} ${nation?.name || nId}: ${attackCheck.reason}`,
      { fontSize: 10, fill: attackCheck.canAttack ? 0x27AE60 : 0x888888 });
    y += 16;
  });
}

// === CITY DEVELOPMENT TAB ===

function _renderDevelopment(game, x, y, w, h) {
  const cs = state.cityStats;
  const levelInfo = (CITY_DEVELOPMENT && CITY_DEVELOPMENT.cityLevelEffects) ?
    CITY_DEVELOPMENT.cityLevelEffects[state.nationLevel] || CITY_DEVELOPMENT.cityLevelEffects[1] :
    { name: '村落', desc: '基础等级' };

  game.ui.createText(x, y, `📈 城市发展 (等级${state.nationLevel}: ${levelInfo.name})`, { fontSize: 14, fill: 0xFFD700, bold: true });
  y += 22;
  game.ui.createText(x, y, `${levelInfo.desc || ''}`, { fontSize: 11, fill: 0xAAAAAA });
  y += 20;

  game.ui.createText(x, y, '【城市属性】', { fontSize: 12, fill: 0xD4A853, bold: true }); y += 20;
  const statItems = [
    { label: '粮食产出', val: cs.food_production, icon: '🌾' },
    { label: '金币产出', val: cs.gold_production, icon: '💰' },
    { label: '科技产出', val: cs.tech_production, icon: '🔬' },
    { label: '兵器产出', val: cs.weapon_production, icon: '⚔️' },
    { label: '征兵容量', val: cs.recruit_capacity, icon: '🗡️' },
    { label: '骑兵容量', val: cs.cavalry_capacity, icon: '🐎' },
    { label: '骆驼容量', val: cs.camel_capacity, icon: '🐫' },
    { label: '人口上限', val: cs.max_population, icon: '👥' },
  ];
  let sx = x + 10;
  statItems.forEach(s => {
    game.ui.createText(sx, y, `${s.icon}${s.label}:${s.val}`, { fontSize: 10, fill: 0xCCCCCC });
    sx += 100;
    if (sx > x + w - 100) { sx = x + 10; y += 16; }
  });
  y += 22;

  game.ui.createText(x, y, '【城市升级】', { fontSize: 12, fill: 0xD4A853, bold: true }); y += 20;
  const canUpgrade = state.canDo('upgrade_city');
  if (canUpgrade && canUpgrade.canDo) {
    game.ui.createButton(x + 10, y, 120, 28, `升级至${state.nationLevel + 1}级`, () => {
      const result = state.upgradeNationLevel();
      game.ui.showToast(result.msg);
      _renderTribe(game);
    }, { color: 0x50C878 });
  } else {
    game.ui.createText(x + 10, y, `🔒 ${canUpgrade ? canUpgrade.reason : '条件不足'}`, { fontSize: 11, fill: 0x888888 });
  }
  y += 35;

  // Projects
  if (CITY_DEVELOPMENT && CITY_DEVELOPMENT.projects) {
    game.ui.createText(x, y, '【建设项目】', { fontSize: 13, fill: 0xFFD700, bold: true }); y += 22;
    Object.entries(CITY_DEVELOPMENT.projects).forEach(([pId, proj]) => {
      if (proj.requireCityLevel > state.nationLevel) return;
      game.ui.createPanel(x, y, w - 20, 40, 0x1a0a04);
      game.ui.createText(x + 10, y + 5, `${proj.icon || '🏗️'} ${proj.name}`, { fontSize: 12, fill: 0xF0E68C, bold: true });
      game.ui.createText(x + 10, y + 22, `${proj.desc || ''} | 费用:${proj.cost?.gold || 0}金`, { fontSize: 10, fill: 0x888888 });

      game.ui.createButton(x + w - 100, y + 5, 80, 28, '建造', () => {
        if (state.player.gold >= (proj.cost?.gold || 0)) {
          state.player.gold -= (proj.cost?.gold || 0);
          game.ui.showToast(`开始建造 ${proj.name}`);
          _renderTribe(game);
        } else game.ui.showToast('金币不足！');
      }, { color: 0x2E4053 });
      y += 45;
    });
  }
}

// === HELPER ACTIONS ===

function _recruitFrom(game, tribe) {
  const cost = 10;
  if (state.player.gold >= cost) {
    state.addGold(-cost);
    const count = Math.min(tribe.troops, Math.floor(Math.random() * 20) + 5);
    if (state.army.infantry !== undefined) state.army.infantry += count;
    game.ui.showToast(`从${tribe.name}征召了${count}名士兵`);
    _renderTribe(game);
  } else game.ui.showToast('金币不足！');
}

function _tradeWith(game, tribe) {
  const resKeys = Object.keys(tribe.res);
  if (resKeys.length > 0) {
    const res = resKeys[Math.floor(Math.random() * resKeys.length)];
    const amount = Math.min(tribe.res[res], Math.floor(Math.random() * 5) + 1);
    const cost = amount * 10;
    if (state.player.gold >= cost) {
      state.addGold(-cost);
      state.resources[res] = (state.resources[res] || 0) + amount;
      game.ui.showToast(`从${tribe.name}购买了${amount}单位资源`);
      _renderTribe(game);
    } else game.ui.showToast('金币不足！');
  } else game.ui.showToast('该部落没有可交易资源');
}

function _plunderTribe(game, tribe) {
  const goldGain = Math.floor(Math.random() * 50) + 10;
  state.addGold(goldGain);
  const isFemale = tribe.female;
  if (isFemale) {
    game.ui.showToast(`掠夺${tribe.name}！获得${goldGain}金和女奴隶`);
  } else {
    game.ui.showToast(`掠夺${tribe.name}！获得${goldGain}金`);
  }
  _renderTribe(game);
}