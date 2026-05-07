/**
 * Nation Select Scene - 国家选择界面
 * 玩家可以从36国中任选一国开始游戏
 * 不同国家难度不同
 */
import { state } from '../core/gameState.js';
import { NATIONS, NATION_LIST } from '../data/nations.js';
import { getNationType, getMaxLevel, getLevelData, getDifficulty, CITY_LEVELS, TRIBE_LEVELS } from '../data/worldData.js';

let scrollOffset = 0;
let selectedNation = null;
const PAGE_SIZE = 8;

export function showNationSelect(game) {
  game._clearUI();
  game.scene = 'nationSelect';
  scrollOffset = 0;
  selectedNation = null;

  // Title
  game.ui.createText(game.w / 2, 30, '选择你的国家', {
    fontSize: 36, fill: 0xD4A853, bold: true, anchor: [0.5, 0.5],
    stroke: 0x000000, strokeThickness: 3
  });
  game.ui.createText(game.w / 2, 60, '不同国家拥有不同的难度和特色能力', {
    fontSize: 14, fill: 0x9B8B70, anchor: [0.5, 0.5]
  });

  // Difficulty legend
  const legendY = 85;
  game.ui.createText(80, legendY, '难度:', { fontSize: 13, fill: 0xCCCCCC });
  game.ui.createText(120, legendY, '★简单', { fontSize: 13, fill: 0x50C878 });
  game.ui.createText(180, legendY, '★★普通', { fontSize: 13, fill: 0xD4A853 });
  game.ui.createText(260, legendY, '★★★困难', { fontSize: 13, fill: 0xE74C3C });

  // Nation list
  renderNationList(game);

  // Detail panel (right side)
  renderDetailPanel(game);

  // Navigation buttons
  const btnY = game.h - 50;
  game.ui.createButton(20, btnY, 100, 36, '← 上一页', () => {
    scrollOffset = Math.max(0, scrollOffset - PAGE_SIZE);
    game._showNationSelect();
  }, { fontSize: 14 });

  game.ui.createButton(130, btnY, 100, 36, '下一页 →', () => {
    const maxOffset = Math.max(0, NATION_LIST.length - PAGE_SIZE);
    scrollOffset = Math.min(maxOffset, scrollOffset + PAGE_SIZE);
    game._showNationSelect();
  }, { fontSize: 14 });

  game.ui.createButton(game.w - 230, btnY, 100, 36, '返回', () => {
    game._showMenu();
  }, { fontSize: 14 });

  game.ui.createButton(game.w - 120, btnY, 110, 36, '开始游戏 →', () => {
    if (!selectedNation) {
      selectedNation = NATION_LIST[0].id;
    }
    startGameWithNation(game, selectedNation);
  }, { fontSize: 14, color: 0x50C878 });

  // Page indicator
  const totalPages = Math.ceil(NATION_LIST.length / PAGE_SIZE);
  const currentPage = Math.floor(scrollOffset / PAGE_SIZE) + 1;
  game.ui.createText(225, btnY + 18, `${currentPage}/${totalPages}`, {
    fontSize: 13, fill: 0x9B8B70, anchor: [0.5, 0.5]
  });
}

function renderNationList(game) {
  const startX = 20;
  const startY = 105;
  const rowH = 52;
  const colW = (game.w - 340) / 2;

  const nations = NATION_LIST.slice(scrollOffset, scrollOffset + PAGE_SIZE);

  nations.forEach((nation, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = startX + col * colW;
    const y = startY + row * rowH;

    const isSelected = selectedNation === nation.id;
    const diff = getDifficulty(nation.id);
    const nType = getNationType(nation.id);
    const maxLvl = getMaxLevel(nation.id);

    // Difficulty color
    let diffColor = 0xD4A853;
    let diffStars = '★★';
    if (diff.level === 'easy') { diffColor = 0x50C878; diffStars = '★'; }
    else if (diff.level === 'hard') { diffColor = 0xE74C3C; diffStars = '★★★'; }

    // Background
    const bgColor = isSelected ? 0x3A3520 : (nation.isAllFemale ? 0x2A1525 : 0x1A1A2E);
    game.ui.createPanel(x, y, colW - 10, rowH - 6, bgColor);

    // Nation button
    game.ui.createButton(x + 4, y + 4, colW - 18, rowH - 14, '', () => {
      selectedNation = nation.id;
      game._showNationSelect();
    }, { fontSize: 1 });

    // Emblem + Name
    const nameColor = isSelected ? 0xFFD700 : (nation.isAllFemale ? 0xFF69B4 : 0xE0D8C0);
    game.ui.createText(x + 14, y + 14, `${nation.emblem} ${nation.name}`, {
      fontSize: 16, fill: nameColor, bold: isSelected
    });

    // Type + Difficulty
    const typeLabel = nType === 'tribe' ? `⛺部落(Lv${maxLvl})` : `🏰城邦(Lv${maxLvl})`;
    game.ui.createText(x + 14, y + 34, `${typeLabel}  ${diffStars}`, {
      fontSize: 11, fill: diffColor
    });

    // Key stats
    const statsText = `武${nation.military} 经${nation.economy} 文${nation.culture}`;
    game.ui.createText(x + colW - 100, y + 14, statsText, {
      fontSize: 10, fill: 0x888888
    });

    // Population
    game.ui.createText(x + colW - 100, y + 34, `人口:${nation.population}`, {
      fontSize: 10, fill: 0x888888
    });

    // All-female indicator
    if (nation.isAllFemale) {
      game.ui.createText(x + colW - 30, y + 14, '♀', {
        fontSize: 18, fill: 0xFF69B4, bold: true
      });
    }
  });
}

function renderDetailPanel(game) {
  const panelX = game.w - 300;
  const panelY = 105;
  const panelW = 280;
  const panelH = game.h - 170;

  // Panel background
  game.ui.createPanel(panelX, panelY, panelW, panelH, 0x151520);

  const nation = selectedNation ? NATIONS[selectedNation] : NATION_LIST[0];
  if (!nation) return;

  const diff = getDifficulty(nation.id);
  const nType = getNationType(nation.id);
  const maxLvl = getMaxLevel(nation.id);
  const levelTable = nType === 'tribe' ? TRIBE_LEVELS : CITY_LEVELS;

  let y = panelY + 15;

  // Nation name
  game.ui.createText(panelX + panelW / 2, y, `${nation.emblem} ${nation.name}`, {
    fontSize: 22, fill: parseInt(nation.color.slice(1), 16), bold: true, anchor: [0.5, 0]
  });
  y += 28;

  game.ui.createText(panelX + panelW / 2, y, nation.nameEn, {
    fontSize: 12, fill: 0x888888, anchor: [0.5, 0]
  });
  y += 22;

  // Description (clamped to avoid overflow)
  const descText = nation.description || '';
  const maxDescLen = 60;
  const displayDesc = descText.length > maxDescLen ? descText.slice(0, maxDescLen) + '...' : descText;
  game.ui.createText(panelX + 10, y, displayDesc, {
    fontSize: 12, fill: 0xCCCCCC, wordWrap: true, wordWrapWidth: panelW - 20
  });
  y += 35;

  // Difficulty
  let diffColor = 0xD4A853;
  let diffName = '普通';
  if (diff.level === 'easy') { diffColor = 0x50C878; diffName = '简单'; }
  else if (diff.level === 'hard') { diffColor = 0xE74C3C; diffName = '困难'; }

  game.ui.createText(panelX + 10, y, `难度: ${diffName}`, {
    fontSize: 14, fill: diffColor, bold: true
  });
  y += 20;
  game.ui.createText(panelX + 10, y, diff.desc || '', {
    fontSize: 11, fill: 0x999999
  });
  y += 18;

  // Type & Level
  const typeStr = nType === 'tribe' ? '游牧部落' : '定居城邦';
  game.ui.createText(panelX + 10, y, `类型: ${typeStr} | 最高等级: Lv${maxLvl}`, {
    fontSize: 12, fill: 0xBBBBBB
  });
  y += 20;

  // Level progression
  game.ui.createText(panelX + 10, y, '等级发展:', {
    fontSize: 12, fill: 0xD4A853, bold: true
  });
  y += 16;
  for (let lv = 1; lv <= maxLvl; lv++) {
    const ld = levelTable[lv];
    if (ld) {
      game.ui.createText(panelX + 20, y,
        `Lv${lv} ${ld.icon}${ld.name} - 金+${ld.production.gold} 粮+${ld.production.food} 兵+${ld.production.recruit}`,
        { fontSize: 10, fill: 0x888888 });
      y += 14;
    }
  }
  y += 6;

  // Stats bars
  const stats = [
    { name: '军事', val: nation.military, color: 0xE74C3C },
    { name: '经济', val: nation.economy, color: 0x50C878 },
    { name: '外交', val: nation.diplomacy, color: 0x4A90D9 },
    { name: '文化', val: nation.culture, color: 0x9B59B6 },
  ];
  stats.forEach(s => {
    game.ui.createText(panelX + 10, y, `${s.name}:`, { fontSize: 11, fill: 0xAAAAAA });
    // Bar background
    game.ui.createPanel(panelX + 55, y + 2, 100, 10, 0x333333);
    // Bar fill
    const barW = Math.floor(s.val);
    game.ui.createPanel(panelX + 55, y + 2, barW, 10, s.color);
    game.ui.createText(panelX + 165, y, `${s.val}`, { fontSize: 11, fill: s.color });
    y += 16;
  });
  y += 4;

  // Special skills
  if (nation.skills) {
    game.ui.createText(panelX + 10, y, '特色技能:', {
      fontSize: 12, fill: 0xD4A853, bold: true
    });
    y += 16;
    Object.entries(nation.skills).slice(0, 3).forEach(([key, skill]) => {
      game.ui.createText(panelX + 20, y, `${skill.icon} ${skill.name}`, {
        fontSize: 11, fill: 0xE0D8C0
      });
      y += 14;
      game.ui.createText(panelX + 30, y, skill.desc, {
        fontSize: 10, fill: 0x888888
      });
      y += 14;
    });
  }

  // All-female nation indicator
  if (nation.isAllFemale) {
    y += 4;
    game.ui.createText(panelX + 10, y, '♀ 全女性国家 ♀', {
      fontSize: 14, fill: 0xFF69B4, bold: true
    });
    y += 18;
    game.ui.createText(panelX + 10, y, '所有市民均为女性，女兵精锐', {
      fontSize: 11, fill: 0xFF69B4
    });
  }

  // Lore
  if (nation.lore && y < panelY + panelH - 40) {
    y += 10;
    game.ui.createText(panelX + 10, y, nation.lore, {
      fontSize: 10, fill: 0x777777, wordWrap: true, wordWrapWidth: panelW - 20
    });
  }
}

function startGameWithNation(game, nationId) {
  const diff = state.selectNation(nationId, NATIONS);
  const nation = NATIONS[nationId];

  // Set tribe name based on nation
  state.tribe.name = nation.name + '部';

  console.log(`[NationSelect] Selected ${nation.name}, difficulty: ${diff.level}`);

  // Go to map
  game._showMap();
}