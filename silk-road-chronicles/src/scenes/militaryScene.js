/**
 * Military Scene - 军事管理
 */
import { state } from '../core/gameState.js';
import { NATION_LIST } from '../data/nations.js';

export function showMilitary(game) {
  game._clearUI();
  game.scene = 'military';
  game.ui.createPanel(40, 40, game.w - 80, game.h - 80, '⚔️ 军事');

  const a = state.army;
  game.ui.createText(70, 100, `总兵力: ${a.infantry + a.cavalry + a.archers}`, { fontSize: 16 });
  game.ui.createText(70, 125, `步兵: ${a.infantry}  骑兵: ${a.cavalry}  弓兵: ${a.archers}`);
  game.ui.createText(70, 150, '士气:');
  game.ui.createProgressBar(130, 146, 150, 12, a.morale, 100, 0x4CAF50);

  game.ui.createText(70, 185, '【征兵】', { fontSize: 16, bold: true });
  game.ui.createButton(90, 210, 140, 32, '征步兵x10', () => { state.recruitSoldiers(10); showMilitary(game); });
  game.ui.createButton(240, 210, 140, 32, '征步兵x50', () => { state.recruitSoldiers(50); showMilitary(game); });

  game.ui.createText(70, 260, '【军事行动】', { fontSize: 16, bold: true });
  let y = 290;
  NATION_LIST.filter(n => !state.alliances.includes(n.id)).slice(0, 8).forEach(n => {
    game.ui.createText(90, y, `${n.emblem} ${n.name} (军力:${n.military})`,
      { fill: parseInt(n.color.slice(1), 16) });
    y += 28;
  });

  game.ui.createButton(game.w / 2 - 60, game.h - 100, 120, 40, '返回', () => game._showMap());
}