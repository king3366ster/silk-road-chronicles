/**
 * Game State - 全局游戏状态
 */
export const state = {
  turn: 1, phase: 'menu', characters: {}, stats: null,
  player: {
    name: '旅行者', title: '无名旅人', gold: 100, level: 1, exp: 0,
    location: { x: 48, y: 48 }, currentNation: 'loulan',
    stats: { military: 10, economy: 10, diplomacy: 10, culture: 10, charisma: 15 }
  },
  tribe: {
    name: '未命名部落', population: 50, maxPopulation: 200, happiness: 60, techLevel: 1,
    agriculture: { farms: 1, maxFarms: 5, output: 10 },
    commerce: { markets: 0, maxMarkets: 3, income: 0 },
    military: { barracks: 0, maxBarracks: 3, soldiers: 10 }
  },
  resources: { food: 100, wood: 50, stone: 30, jade: 0, silk: 0, spice: 0, horse: 0, iron: 0 },
  army: { infantry: 10, cavalry: 0, archers: 0, morale: 70 },
  alliances: [], tradeRoutes: [], ownedTerritories: new Set(),
  activeQuests: [], completedQuests: [], currentMainQuest: 'main_001',
  unlockedCG: new Set(),
  majorPowerRelations: { han: 50, xiongnu: 30, persia: 40, rome: 20 },

  getNationRelation(a, b) { return 50 + Math.floor(Math.random() * 20 - 10); },
  movePlayer(x, y) { this.player.location.x = x; this.player.location.y = y; },
  addGold(n) { this.player.gold += n; },
  addExp(n) { this.player.exp += n; },

  nextTurn() {
    this.turn++;
    this.resources.food += this.tribe.agriculture.output;
    this.player.gold += this.tribe.commerce.income;
    this.tradeRoutes.forEach(t => this.player.gold += t.income);
    return { text: `第${this.turn}回合开始` };
  },

  sendGift(nId, type, amt) {},
  proposeAlliance(nId) { this.alliances.push(nId); return { msg: '结盟成功！' }; },
  proposeMarriage(chId) { return { msg: '求婚成功！' }; },

  buildFarm() {
    if (this.resources.wood >= 20 && this.tribe.agriculture.farms < this.tribe.agriculture.maxFarms) {
      this.resources.wood -= 20; this.tribe.agriculture.farms++;
      this.tribe.agriculture.output += 10; return true;
    } return false;
  },
  buildMarket() {
    if (this.player.gold >= 50 && this.tribe.commerce.markets < this.tribe.commerce.maxMarkets) {
      this.player.gold -= 50; this.tribe.commerce.markets++;
      this.tribe.commerce.income += 15; return true;
    } return false;
  },
  buildBarracks() {
    if (this.resources.stone >= 40 && this.tribe.military.barracks < this.tribe.military.maxBarracks) {
      this.resources.stone -= 40; this.tribe.military.barracks++; return true;
    } return false;
  },
  recruitSoldiers(n) {
    if (this.resources.food >= n * 10 && this.tribe.population >= n + 5) {
      this.resources.food -= n * 10; this.tribe.population -= n;
      this.army.infantry += n; this.tribe.military.soldiers += n; return true;
    } return false;
  },
  establishTribe(oasisId) { this.tribe.name = '绿洲部落'; },
  startQuest(qId) { if (!this.activeQuests.includes(qId)) this.activeQuests.push(qId); },
};