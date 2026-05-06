/**
 * Diplomacy Scene - 外交管理
 */
import { state } from '../core/gameState.js';
import { NATION_LIST, MAJOR_POWERS } from '../data/nations.js';

export function showDiplomacy(game) {
  game._clearUI();
  game.scene = 'diplomacy';
  game.ui.createPanel(40, 40, game.w - 80, game.h - 80, '🤝 外交');

  let y = 100;
  [...NATION_LIST].sort((a, b) => (b.military + b.economy) - (a.military + a.economy)).forEach(n => {
    if (y > game.h - 140) return;
    const rel = state.getNationRelation('player', n.id);
    game.ui.createText(70, y, `${n.emblem} ${n.name}`, { fill: parseInt(n.color.slice(1), 16) });
    game.ui.createProgressBar(200, y - 5, 100, 10, rel + 100, 200,
      rel > 60 ? 0x50C878 : rel > 30 ? 0xD4A853 : 0xDC143C);
    game.ui.createText(310, y, `${rel}`, { fontSize: 12 });
    game.ui.createButton(380, y - 12, 60, 24, '赠礼', () => { state.sendGift(n.id, 'food', 10); });
    game.ui.createButton(450, y - 12, 60, 24, '结盟', () => { state.proposeAlliance(n.id); });
    y += 30;
  });

  y += 15;
  game.ui.createText(70, y, '【四大帝国影响】', { fontSize: 16, bold: true }); y += 25;
  Object.entries(MAJOR_POWERS).forEach(([id, mp]) => {
    const rel = state.majorPowerRelations[id];
    game.ui.createText(70, y, `${mp.emblem} ${mp.name}`, { fill: parseInt(mp.color.slice(1), 16) });
    game.ui.createProgressBar(200, y - 5, 100, 10, rel, 100, parseInt(mp.color.slice(1), 16));
    y += 25;
  });

  game.ui.createButton(game.w / 2 - 60, game.h - 100, 120, 40, '返回', () => game._showMap());
}