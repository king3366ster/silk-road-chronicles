/**
 * Oasis Selection Scene - 绿洲选择
 */
import { state } from '../core/gameState.js';
import { OASIS_POINTS } from '../data/oasisPoints.js';

export function showOasisSelect(game) {
  game._clearUI();
  game.scene = 'oasis_select';
  game.particles.removeEffect('sparkle');
  game.particles.addEffect('sand');

  game.ui.createText(game.w / 2, 40, '🏜️ 选择你的绿洲', { fontSize: 32, bold: true, anchor: [0.5, 0.5] });
  game.ui.createText(game.w / 2, 75, '在沙漠边缘找到一片绿洲，开始你的西域传奇',
    { fontSize: 15, fill: 0x9B8B70, anchor: [0.5, 0.5] });

  const cardW = 180, cardH = 260, gap = 15;
  const totalW = OASIS_POINTS.length * (cardW + gap) - gap;
  const startX = Math.max(20, (game.w - totalW) / 2);

  OASIS_POINTS.forEach((o, i) => {
    const x = startX + i * (cardW + gap);
    game.ui.createPanel(x, 100, cardW, cardH, o.name);

    const icons = { desert: '🏜️', oasis: '🌴', mountain: '🏔️', steppe: '🌾', valley: '🏞️', lake: '💧' };
    game.ui.createText(x + cardW / 2, 155, icons[o.terrain] || '🏜️', { fontSize: 36, anchor: [0.5, 0.5] });

    const diffColors = { easy: 0x50C878, medium: 0xD4A853, hard: 0xDC143C };
    const diffNames = { easy: '简单', medium: '普通', hard: '困难' };
    game.ui.createText(x + cardW / 2, 195, '难度: ' + diffNames[o.difficulty],
      { fontSize: 13, fill: diffColors[o.difficulty], anchor: [0.5, 0.5] });

    game.ui.createText(x + 15, 215, '水源', { fontSize: 11 });
    game.ui.createProgressBar(x + 50, 210, 110, 8, o.water, 100, 0x2196F3);
    game.ui.createText(x + 15, 232, '肥沃', { fontSize: 11 });
    game.ui.createProgressBar(x + 50, 227, 110, 8, o.fertility, 100, 0x4CAF50);

    game.ui.createButton(x + 20, 100 + cardH - 50, cardW - 40, 35, '选择此地',
      () => selectOasis(game, i), { color: diffColors[o.difficulty] });
  });
}

function selectOasis(game, i) {
  const o = OASIS_POINTS[i];
  state.establishTribe(o.id);
  state.player.location = { x: Math.floor(o.x), y: Math.floor(o.y) };
  state.phase = 'playing';
  game._showMap();
}