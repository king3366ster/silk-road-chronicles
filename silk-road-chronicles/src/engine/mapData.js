/**
 * Map data constants shared across views
 */
import { NATIONS, NATION_LIST } from '../data/nations.js';

export const TILE_W = 64, TILE_H = 32, MAP_W = 100, MAP_H = 100;

export const PASSES = [
  { name: '铁门关', x: 38, y: 28 }, { name: '葱岭关', x: 12, y: 33 },
  { name: '玉门关', x: 85, y: 42 }, { name: '阳关', x: 82, y: 45 },
  { name: '天山隘口', x: 48, y: 22 }, { name: '昆仑隘口', x: 30, y: 68 },
  { name: '阿玛宗山口', x: 70, y: 22 }, { name: '火焰口', x: 58, y: 28 },
];
export const PORTS = [
  { name: '楼兰港', x: 53, y: 48 }, { name: '危须渔港', x: 43, y: 33 },
  { name: '焉耆港', x: 47, y: 28 }, { name: '于阗港', x: 23, y: 58 },
  { name: '莎车渡口', x: 22, y: 52 }, { name: '西梁渡口', x: 16, y: 42 },
];
export const TRIBES = [
  { name: '盐泽部落', x: 52, y: 42, n: 'loulan' }, { name: '流沙部落', x: 58, y: 48, n: 'loulan' },
  { name: '罗布部落', x: 50, y: 50, n: 'loulan' }, { name: '千佛部落', x: 32, y: 32, n: 'kucha' },
  { name: '乐舞部落', x: 38, y: 38, n: 'kucha' }, { name: '石窟部落', x: 33, y: 37, n: 'kucha' },
  { name: '玉石部落', x: 22, y: 58, n: 'khotan' }, { name: '河畔部落', x: 28, y: 62, n: 'khotan' },
  { name: '织锦部落', x: 27, y: 56, n: 'khotan' }, { name: '沙暴部落', x: 62, y: 52, n: 'shanshan' },
  { name: '天马部落', x: 48, y: 12, n: 'wusun' }, { name: '草原部落', x: 53, y: 18, n: 'wusun' },
  { name: '猎鹰部落', x: 47, y: 18, n: 'wusun' }, { name: '铁山部落', x: 42, y: 28, n: 'karashahr' },
  { name: '锻造部落', x: 38, y: 32, n: 'karashahr' }, { name: '葡萄部落', x: 28, y: 38, n: 'aksu' },
  { name: '巴扎部落', x: 18, y: 33, n: 'kashgar' }, { name: '织毯部落', x: 12, y: 38, n: 'kashgar' },
  { name: '刀匠部落', x: 18, y: 52, n: 'yarkand' }, { name: '歌舞部落', x: 22, y: 58, n: 'yarkand' },
  { name: '猎豹女族', x: 72, y: 22, n: 'amazons', f: true }, { name: '鹰翼女族', x: 78, y: 28, n: 'amazons', f: true },
  { name: '烈焰女族', x: 73, y: 28, n: 'amazons', f: true }, { name: '月影女族', x: 77, y: 24, n: 'amazons', f: true },
  { name: '百花女族', x: 12, y: 38, n: 'xiliang', f: true }, { name: '织云女族', x: 18, y: 42, n: 'xiliang', f: true },
  { name: '月泉女族', x: 13, y: 43, n: 'xiliang', f: true }, { name: '丝语女族', x: 17, y: 38, n: 'xiliang', f: true },
  { name: '玉石部落', x: 28, y: 52, n: 'jumi' }, { name: '织毯部落', x: 42, y: 52, n: 'charklik' },
  { name: '古墓部落', x: 38, y: 58, n: 'niya' }, { name: '渔盐部落', x: 47, y: 33, n: 'kroran' },
  { name: '屯田部落', x: 42, y: 38, n: 'bugur' }, { name: '猎户部落', x: 68, y: 52, n: 'qarqan' },
  { name: '果园部落', x: 22, y: 48, n: 'pishan' }, { name: '商队部落', x: 8, y: 28, n: 'soche' },
  { name: '牧场部落', x: 8, y: 12, n: 'kangju' }, { name: '马场部落', x: 8, y: 42, n: 'dayuan' },
  { name: '宝石部落', x: 12, y: 48, n: 'jieshi' }, { name: '石城部落', x: 8, y: 38, n: 'tashkurgan' },
  { name: '染坊部落', x: 18, y: 43, n: 'karghalik' }, { name: '香料部落', x: 33, y: 58, n: 'keriya' },
  { name: '盐湖部落', x: 48, y: 58, n: 'charchan' }, { name: '猎鹰部落', x: 22, y: 22, n: 'wucha' },
  { name: '狼群部落', x: 62, y: 8, n: 'tokuz' }, { name: '僧院部落', x: 52, y: 28, n: 'karakhoja' },
  { name: '军镇部落', x: 52, y: 22, n: 'beshbaliq' }, { name: '湖畔部落', x: 47, y: 28, n: 'yanqi' },
  { name: '骆驼部落', x: 62, y: 33, n: 'chumi' }, { name: '河谷部落', x: 42, y: 8, n: 'chumukun' },
  { name: '河防部落', x: 48, y: 33, n: 'gaochang' },
];
export const GEO_LABELS = [
  { text: '天 山 脉', x: 50, y: 12, size: 20, color: 0xECF0F1 },
  { text: '昆 仑 山 脉', x: 35, y: 75, size: 18, color: 0xECF0F1 },
  { text: '帕 米 尔 高 原', x: 8, y: 35, size: 15, color: 0xD5D8DC },
  { text: '阿尔金山', x: 65, y: 62, size: 14, color: 0xD5D8DC },
  { text: '塔 克 拉 玛 干 沙 漠', x: 40, y: 48, size: 16, color: 0xD4A853, alpha: 0.35 },
  { text: '罗布泊', x: 55, y: 48, size: 13, color: 0x5DADE2 },
  { text: '博斯腾湖', x: 45, y: 30, size: 12, color: 0x5DADE2 },
  { text: '草 原', x: 55, y: 8, size: 15, color: 0x7DCEA0 },
  { text: '河 西 走 廊', x: 85, y: 48, size: 14, color: 0xD4A853 },
];
export const RIVERS = [
  { name: '塔里木河', np: {x:28,y:38}, color: 0x2980B9, w: 6,
    pts: [{x:45,y:32},{x:42,y:34},{x:38,y:35},{x:34,y:36},{x:30,y:37},{x:26,y:38},{x:22,y:40},{x:18,y:42},{x:15,y:45},{x:12,y:48},{x:10,y:52},{x:8,y:55}] },
  { name: '和田河', np: {x:24,y:52}, color: 0x5DADE2, w: 4,
    pts: [{x:25,y:65},{x:25,y:62},{x:24,y:58},{x:24,y:54},{x:23,y:50},{x:22,y:46},{x:22,y:42}] },
  { name: '叶尔羌河', np: {x:19,y:48}, color: 0x5DADE2, w: 4,
    pts: [{x:18,y:60},{x:18,y:57},{x:19,y:54},{x:19,y:50},{x:18,y:46},{x:18,y:42}] },
  { name: '孔雀河', np: {x:50,y:40}, color: 0x5DADE2, w: 3,
    pts: [{x:55,y:45},{x:52,y:43},{x:48,y:40},{x:45,y:37},{x:43,y:34}] },
  { name: '子母河', np: {x:15,y:40}, color: 0xFF69B4, w: 3,
    pts: [{x:12,y:38},{x:13,y:40},{x:15,y:40},{x:17,y:41},{x:18,y:42}] },
  { name: '伊犁河', np: {x:50,y:14}, color: 0x2980B9, w: 5,
    pts: [{x:40,y:8},{x:43,y:10},{x:46,y:12},{x:50,y:14},{x:54,y:16},{x:58,y:18}] },
  { name: '克里雅河', np: {x:36,y:55}, color: 0x5DADE2, w: 2, pts: [{x:35,y:62},{x:35,y:58},{x:35,y:55},{x:35,y:52}] },
  { name: '车尔臣河', np: {x:55,y:55}, color: 0x5DADE2, w: 2, pts: [{x:55,y:62},{x:55,y:58},{x:55,y:55},{x:55,y:52}] },
];
export const SILK_ROADS = [
  { name: '丝路北道', np: {x:60,y:43}, color: 0xD4A853, w: 3,
    pts: [{x:85,y:45},{x:75,y:42},{x:65,y:43},{x:55,y:45},{x:48,y:42},{x:45,y:35},{x:40,y:30},{x:35,y:35},{x:30,y:40},{x:25,y:38},{x:20,y:35},{x:15,y:35},{x:10,y:38},{x:5,y:45},{x:0,y:50}] },
  { name: '丝路南道', np: {x:50,y:55}, color: 0xC8A060, w: 2.5,
    pts: [{x:85,y:48},{x:75,y:50},{x:65,y:52},{x:55,y:50},{x:50,y:55},{x:45,y:58},{x:40,y:60},{x:35,y:60},{x:30,y:55},{x:25,y:60},{x:20,y:55},{x:15,y:50},{x:15,y:40}] },
  { name: '乌孙道', np: {x:50,y:22}, color: 0xA08040, w: 2, pts: [{x:45,y:35},{x:48,y:25},{x:50,y:15},{x:55,y:20},{x:55,y:30}] },
  { name: '西梁道', np: {x:15,y:37}, color: 0xFF69B4, w: 2, pts: [{x:15,y:35},{x:15,y:38},{x:15,y:40}] },
  { name: '阿玛宗道', np: {x:70,y:30}, color: 0xDC143C, w: 2, pts: [{x:65,y:43},{x:68,y:35},{x:72,y:28},{x:75,y:25}] },
  { name: '葱岭道', np: {x:10,y:40}, color: 0x9B8B70, w: 2, pts: [{x:15,y:35},{x:12,y:38},{x:10,y:40},{x:8,y:45},{x:5,y:45}] },
  { name: '草原道', np: {x:56,y:12}, color: 0x7F8C8D, w: 2, pts: [{x:55,y:20},{x:58,y:15},{x:60,y:10},{x:55,y:10},{x:50,y:15}] },
  { name: '康居道', np: {x:5,y:22}, color: 0x7F8C8D, w: 2, pts: [{x:5,y:30},{x:5,y:25},{x:5,y:15}] },
];

// Pre-compute nation grid
export const _ng = new Array(MAP_W * MAP_H).fill(null);
if (NATIONS) {
  for (const n of Object.values(NATIONS)) {
    if (n.territory) for (const t of n.territory) { if (t.x>=0&&t.x<MAP_W&&t.y>=0&&t.y<MAP_H) _ng[t.y*MAP_W+t.x]=n; }
    if (n.capital) { const cx=n.capital.x,cy=n.capital.y; if(cx>=0&&cx<MAP_W&&cy>=0&&cy<MAP_H) _ng[cy*MAP_W+cx]=n; }
  }
}

// City roads
export const CITY_ROADS = [];
{
  const cs = NATION_LIST.filter(n => n.capital).map(n => ({ id: n.id, x: n.capital.x, y: n.capital.y }));
  for (const c of cs) {
    const nb = cs.filter(o => o.id !== c.id).map(o => ({ ...o, d: Math.abs(o.x - c.x) + Math.abs(o.y - c.y) })).sort((a, b) => a.d - b.d);
    for (let i = 0; i < Math.min(2, nb.length); i++) {
      const k = [c.id, nb[i].id].sort().join('-');
      if (!CITY_ROADS.find(r => r.k === k)) CITY_ROADS.push({ k, pts: [{ x: c.x, y: c.y }, { x: nb[i].x, y: nb[i].y }] });
    }
  }
}

export function genHeight() {
  const h = [];
  for (let y = 0; y < MAP_H; y++) { h[y] = []; for (let x = 0; x < MAP_W; x++) {
    let v = Math.sin(x * .15) * Math.cos(y * .12) * 3 + Math.sin(x * .08 + y * .06) * 2;
    if (y < 25) v += (25 - y) * .5; if (y > 70) v += (y - 70) * .4; if (x < 15) v += (15 - x) * .3;
    const d = Math.sqrt((x - 40) ** 2 + (y - 40) ** 2); if (d < 20) v -= (20 - d) * .15;
    h[y][x] = Math.max(-3, Math.min(20, v));
  }} return h;
}

export function terrainType(x, y) {
  const dx = (x - 50) / 100, dy = (y - 50) / 100, dist = Math.sqrt(dx * dx + dy * dy);
  const n = Math.sin(x * .3) * Math.cos(y * .3) + Math.sin(x * .1 + y * .15) * .5;
  if (x < 8 && y > 30 && y < 70) return 'water'; if (x > 85 && y > 20 && y < 50) return 'deepwater';
  if (dist < .08) return 'water'; if (y > 15 && y < 30 && n > .3) return 'mountain';
  if (y > 10 && y < 20 && n > .5) return 'snow'; if (y > 75 && y < 85 && n > .2) return 'mountain';
  if (n > .4 && y > 25 && y < 40) return 'forest'; if (y < 20 && n > -.2) return 'grass';
  if (dist < .15 && n > .2) return 'oasis'; return n > 0 ? 'sand' : 'desert';
}

export const TC = {
  deepwater: [0x1a5276, 0x0e3d5c], water: [0x2980B9, 0x1a5276],
  sand: [0xf0d9a0, 0xd4b870], desert: [0xe8c878, 0xc8a850],
  grass: [0x7dce82, 0x52be80], forest: [0x27ae60, 0x1e8449],
  mountain: [0x8e9eab, 0x607d8b], snow: [0xecf0f1, 0xbdc3c7],
  oasis: [0x2ecc71, 0x27ae60],
};