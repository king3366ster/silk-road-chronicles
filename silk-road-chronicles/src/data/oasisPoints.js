/**
 * 绿洲选择点 - Oasis Selection Points for game start
 */
export const OASIS_POINTS = [
  { id: 'oasis_1', name: '月牙泉', x: 48, y: 48, desc: '沙漠中的一弯明月', terrain: 'desert', water: 60, fertility: 30, nearbyNations: ['loulan', 'shanshan'], difficulty: 'medium', resources: { jade: 1, silk: 0, spice: 0, horse: 0, iron: 0, gold: 0 } },
  { id: 'oasis_2', name: '孔雀河畔', x: 38, y: 38, desc: '孔雀河滋养的绿洲', terrain: 'oasis', water: 80, fertility: 60, nearbyNations: ['karashahr', 'bugur', 'kucha'], difficulty: 'easy', resources: { jade: 0, silk: 1, spice: 0, horse: 0, iron: 1, gold: 0 } },
  { id: 'oasis_3', name: '玉龙喀什', x: 28, y: 58, desc: '于阗附近的玉石之河', terrain: 'oasis', water: 75, fertility: 55, nearbyNations: ['khotan', 'jumi', 'pishan'], difficulty: 'easy', resources: { jade: 2, silk: 0, spice: 0, horse: 0, iron: 0, gold: 1 } },
  { id: 'oasis_4', name: '火焰谷', x: 58, y: 32, desc: '火焰山下的热浪绿洲', terrain: 'desert', water: 40, fertility: 25, nearbyNations: ['karakhoja', 'gaochang', 'beshbaliq'], difficulty: 'hard', resources: { jade: 0, silk: 0, spice: 1, horse: 0, iron: 1, gold: 0 } },
  { id: 'oasis_5', name: '天山雪泉', x: 52, y: 18, desc: '天山融雪形成的绿洲', terrain: 'steppe', water: 70, fertility: 40, nearbyNations: ['wusun', 'tokuz', 'beshbaliq'], difficulty: 'hard', resources: { jade: 0, silk: 0, spice: 0, horse: 2, iron: 0, gold: 0 } },
  { id: 'oasis_6', name: '子母河畔', x: 18, y: 42, desc: '西梁女国附近的神秘绿洲', terrain: 'valley', water: 90, fertility: 70, nearbyNations: ['xiliang', 'kashgar', 'karghalik'], difficulty: 'easy', resources: { jade: 0, silk: 1, spice: 1, horse: 0, iron: 0, gold: 0 } },
  { id: 'oasis_7', name: '阿玛宗山泉', x: 72, y: 28, desc: '阿玛宗领地边缘的隐蔽泉眼', terrain: 'mountain', water: 50, fertility: 20, nearbyNations: ['amazons', 'chumi'], difficulty: 'hard', resources: { jade: 0, silk: 0, spice: 0, horse: 1, iron: 1, gold: 0 } },
  { id: 'oasis_8', name: '葱岭牧场', x: 12, y: 38, desc: '帕米尔高原下的牧场绿洲', terrain: 'valley', water: 65, fertility: 45, nearbyNations: ['tashkurgan', 'jieshi', 'kashgar'], difficulty: 'medium', resources: { jade: 1, silk: 0, spice: 0, horse: 1, iron: 0, gold: 0 } }
];