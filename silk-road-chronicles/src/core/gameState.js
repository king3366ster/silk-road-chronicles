/**
 * Game State v3 - 全局游戏状态
 * 6 unit types, slave roles (labor/breeding/entertainment/sacrifice/training)
 */
export const state = {
  turn: 1, phase: 'menu', characters: {}, stats: null,
  player: {
    name: '旅行者', title: '无名旅人', gold: 200, level: 1, exp: 0,
    location: { x: 48, y: 48 }, currentNation: 'loulan',
    stats: { military: 10, economy: 10, diplomacy: 10, culture: 10, charisma: 15 }
  },
  tribe: {
    name: '未命名部落', population: 50, maxPopulation: 200, happiness: 60, techLevel: 1,
    agriculture: { farms: 1, maxFarms: 5, output: 10 },
    commerce: { markets: 0, maxMarkets: 3, income: 0 },
    military: { barracks: 0, maxBarracks: 3, soldiers: 10 }
  },
  resources: {
    food: 200, wood: 50, stone: 30, iron: 10, gold_ore: 0,
    jade: 0, silk: 0, spice: 0, horse: 0, leather: 0,
    cotton: 0, dye: 0, wine: 0, salt: 0, herb: 0,
    gem: 0, fur: 0, steel: 0, coal: 0, ore: 0, camel: 0,
  },
  // 6 unit types army
  army: {
    infantry: 10,       // 步兵
    cavalry: 0,         // 骑兵
    archerCav: 0,       // 弓骑兵
    camel: 0,           // 骆驼兵
    femaleInfantry: 0,  // 女步兵
    femaleCavalry: 0,   // 女骑兵
    morale: 70,
  },
  // Slave system
  slaves: {
    total: 0,
    assigned: {
      labor_farm: 0,    // 农业劳力
      labor_mine: 0,    // 采矿劳力
      labor_wood: 0,    // 伐木劳力
      labor_craft: 0,   // 工匠劳力
      breeding: 0,      // 生育繁衍
      entertainment: 0, // 舞女乐师
      sacrifice: 0,     // 祭祀牺牲
    },
    training: [], // { slaveId, type, turnsLeft, result }
  },
  // Trained citizens (from slaves)
  trainedCitizens: {
    craftsman: 0,
    merchant: 0,
    farmer: 0,
    soldier: 0,
    general: 0,
  },
  // Hired characters
  hiredGenerals: [], hiredOfficials: [], hiredMerchants: [], hiredSpies: [],
  // Tribe relations
  tribeRelations: {},
  controlledCities: new Set(),
  controlledTribes: new Set(),
  controlledSince: {}, // tribeId → turn number when controlled
  alliances: [], tradeRoutes: [], ownedTerritories: new Set(),
  activeQuests: [], completedQuests: [], currentMainQuest: 'main_001',
  unlockedCG: new Set(),
  // 6 Major Power Relations
  majorPowerRelations: { han: 50, xiongnu: 30, kushan: 40, parthia: 35, rome: 20, sassanid: 25 },

  get totalArmy() {
    const a = this.army;
    return a.infantry + a.cavalry + a.archerCav + a.camel + a.femaleInfantry + a.femaleCavalry;
  },

  getNationRelation(a, b) { return 50 + Math.floor(Math.random() * 20 - 10); },
  movePlayer(x, y) { this.player.location.x = x; this.player.location.y = y; },
  addGold(n) { this.player.gold += n; },
  addExp(n) { this.player.exp += n; },

  nextTurn() {
    this.turn++;
    this.resources.food += this.tribe.agriculture.output;
    this.player.gold += this.tribe.commerce.income;
    this.tradeRoutes.forEach(t => this.player.gold += t.income);

    // Slave labor production
    const s = this.slaves;
    if (s.assigned.labor_farm > 0) this.resources.food += Math.floor(s.assigned.labor_farm * 2);
    if (s.assigned.labor_mine > 0) this.resources.ore += Math.floor(s.assigned.labor_mine * 1);
    if (s.assigned.labor_wood > 0) this.resources.wood += Math.floor(s.assigned.labor_wood * 1);
    if (s.assigned.labor_craft > 0) this.player.gold += Math.floor(s.assigned.labor_craft * 3);
    if (s.assigned.entertainment > 0) this.player.gold += Math.floor(s.assigned.entertainment * 5);
    if (s.assigned.breeding > 0) this.tribe.population += Math.floor(s.assigned.breeding * 0.1);
    if (s.assigned.sacrifice > 0) this.army.morale = Math.min(100, this.army.morale + Math.floor(s.assigned.sacrifice * 0.5));

    // Trained citizen bonuses
    if (this.trainedCitizens.craftsman > 0) this.player.gold += this.trainedCitizens.craftsman * 5;
    if (this.trainedCitizens.merchant > 0) this.tribe.commerce.income += this.trainedCitizens.merchant * 2;
    if (this.trainedCitizens.farmer > 0) this.resources.food += this.trainedCitizens.farmer * 3;

    // Process slave training
    this.slaves.training = this.slaves.training.filter(t => {
      t.turnsLeft--;
      if (t.turnsLeft <= 0) {
        this.trainedCitizens[t.result] = (this.trainedCitizens[t.result] || 0) + 1;
        this.slaves.total = Math.max(0, this.slaves.total - 1);
        return false;
      }
      return true;
    });

    // Controlled tribe income
    this.controlledTribes.forEach(tid => {
      this.resources.food += 5;
      this.player.gold += 3;
    });

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

  // Recruit tribe soldiers (部落征召)
  recruitTribeSoldiers(unitType, count) {
    if (this.resources.food >= count * 5 && this.player.gold >= count * 15) {
      this.resources.food -= count * 5;
      this.player.gold -= count * 15;
      if (this.army[unitType] !== undefined) {
        this.army[unitType] += count;
      }
      return true;
    }
    return false;
  },

  // Hire mercenaries (雇佣兵)
  hireMercenary(mercType, cost) {
    if (this.player.gold >= cost) {
      this.player.gold -= cost;
      return true;
    }
    return false;
  },

  // Slave management
  assignSlave(role, count) {
    const available = this.slaves.total - Object.values(this.slaves.assigned).reduce((a, b) => a + b, 0);
    const canAssign = Math.min(count, available);
    if (canAssign > 0 && this.slaves.assigned[role] !== undefined) {
      this.slaves.assigned[role] += canAssign;
      return canAssign;
    }
    return 0;
  },

  unassignSlave(role, count) {
    if (this.slaves.assigned[role] >= count) {
      this.slaves.assigned[role] -= count;
      return count;
    }
    return 0;
  },

  buySlaves(count, cost) {
    this.slaves.total += count;
    this.player.gold -= cost;
  },

  sellSlaves(count, price) {
    // Can only sell unassigned slaves
    const available = this.slaves.total - Object.values(this.slaves.assigned).reduce((a, b) => a + b, 0);
    const canSell = Math.min(count, available);
    this.slaves.total -= canSell;
    this.player.gold += Math.floor(canSell * price);
    return canSell;
  },

  // Plunder slaves from tribe (掠夺奴隶)
  plunderSlaves(tribe) {
    const yield_ = Math.floor(Math.random() * 25) + 5;
    const goldYield = Math.floor(Math.random() * 80) + 20;
    this.slaves.total += yield_;
    this.player.gold += goldYield;
    this.tribeRelations[tribe.id] = (this.tribeRelations[tribe.id] || 50) - 30;
    return { slaves: yield_, gold: goldYield };
  },

  // Train slave into citizen
  trainSlave(trainingType) {
    const available = this.slaves.total - Object.values(this.slaves.assigned).reduce((a, b) => a + b, 0);
    if (available <= 0) return false;
    this.slaves.training.push({
      slaveId: Date.now(),
      type: trainingType.id,
      turnsLeft: trainingType.turns,
      result: trainingType.result,
    });
    this.slaves.total++; // temporarily count as in-training
    return true;
  },

  // Hire from city
  hireGeneral(charId) {
    if (this.player.gold >= 200 && !this.hiredGenerals.includes(charId)) {
      this.player.gold -= 200;
      this.hiredGenerals.push(charId);
      return true;
    } return false;
  },
  hireOfficial(charId) {
    if (this.player.gold >= 150 && !this.hiredOfficials.includes(charId)) {
      this.player.gold -= 150;
      this.hiredOfficials.push(charId);
      return true;
    } return false;
  },

  establishTribe(oasisId) { this.tribe.name = '绿洲部落'; },
  startQuest(qId) { if (!this.activeQuests.includes(qId)) this.activeQuests.push(qId); },
};