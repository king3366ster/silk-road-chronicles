/**
 * Enhanced Game State Manager with Tribe Building Systems
 */
import { NATIONS, OASIS_POINTS, MAJOR_POWERS } from '../data/nations.js';
import { generateAllCharacters, getCharacterStats } from '../data/characters.js';
import { MAIN_STORY, SIDE_QUESTS, CG_DATA } from '../data/quests.js';

class GameState {
  constructor() { this.reset(); }

  reset() {
    this.phase = 'menu'; this.turn = 1; this.chapter = 1; this.year = 1;
    this.player = {
      name: '无名旅人', title: '沙漠中的流浪者', level: 1, exp: 0, expToNext: 100,
      gold: 30, alignment: 'neutral',
      stats: { military: 10, economy: 10, diplomacy: 10, culture: 5, charisma: 15 },
      location: { x: 48, y: 48 }, currentNation: null,
      titles: [], achievements: [], spouse: null, marriages: []
    };
    this.nations = JSON.parse(JSON.stringify(NATIONS));
    this.characters = generateAllCharacters();
    this.nationRelations = {};
    this.ownedTerritories = new Set();
    this.alliances = []; this.wars = [];
    this.activeQuests = []; this.completedQuests = [];
    this.currentMainQuest = 'main_001'; this.questProgress = {};
    // Tribe system
    this.tribe = {
      name: '未命名部落', established: false, oasisId: null,
      population: 0, maxPopulation: 50, happiness: 70,
      agriculture: { level: 1, farms: 0, output: 0, maxFarms: 5 },
      ecology: { level: 1, trees: 0, water: 0, maxTrees: 20, waterSupply: 0 },
      commerce: { level: 1, markets: 0, income: 0, maxMarkets: 3, tradeRoutes: [] },
      military: { level: 1, barracks: 0, soldiers: 0, maxBarracks: 3, training: 0 },
      buildings: [], techLevel: 1
    };
    this.army = { infantry: 0, cavalry: 0, archers: 0, siege: 0, morale: 80, generals: [] };
    this.tradeRoutes = []; this.caravans = []; this.inventory = [];
    this.resources = { food: 50, wood: 20, stone: 10, jade: 0, silk: 0, spice: 0, horse: 0, iron: 0 };
    this.recruitedCharacters = [];
    this.unlockedCG = new Set(); this.viewedCG = new Set();
    this.events = []; this.eventLog = [];
    this.majorPowerRelations = { han: 50, xiongnu: 50, persia: 50, rome: 50 };
    this.initNationRelations();
    this.stats = getCharacterStats(this.characters);
  }

  initNationRelations() {
    const ids = Object.keys(this.nations);
    for (let i = 0; i < ids.length; i++)
      for (let j = i + 1; j < ids.length; j++)
        this.nationRelations[`${ids[i]}_${ids[j]}`] = Math.floor(Math.random() * 40) + 30;
  }

  getNationRelation(n1, n2) {
    return this.nationRelations[`${n1}_${n2}`] || this.nationRelations[`${n2}_${n1}`] || 50;
  }
  setNationRelation(n1, n2, v) { this.nationRelations[`${n1}_${n2}`] = Math.max(-100, Math.min(100, v)); }

  // === Tribe Building ===
  establishTribe(oasisId) {
    const oasis = OASIS_POINTS.find(o => o.id === oasisId);
    if (!oasis) return false;
    this.tribe.established = true;
    this.tribe.oasisId = oasisId;
    this.tribe.name = oasis.name + '部落';
    this.player.location = { x: oasis.x, y: oasis.y };
    this.tribe.ecology.water = oasis.water;
    this.tribe.ecology.waterSupply = oasis.water;
    this.tribe.agriculture.output = Math.floor(oasis.fertility * 0.5);
    this.tribe.population = 10;
    this.tribe.maxPopulation = 50 + oasis.water;
    // Initial resources from oasis
    Object.entries(oasis.resources).forEach(([k, v]) => { if (this.resources[k] !== undefined) this.resources[k] += v; });
    // Check nearby nations for initial events
    oasis.nearbyNations.forEach(nId => {
      const n = this.nations[nId];
      if (n) {
        if (n.attitude === 'friendly') {
          this.addGold(50); this.resources.food += 30;
          this.eventLog.push(`${n.name}送来了粮食和金币作为见面礼！`);
        } else if (n.attitude === 'aggressive') {
          this.eventLog.push(`${n.name}对你的到来表示不满，需要警惕！`);
        }
      }
    });
    this.player.title = '部落首领';
    return true;
  }

  // === Building Actions ===
  buildFarm() {
    const cost = 20; if (this.tribe.agriculture.farms >= this.tribe.agriculture.maxFarms || this.resources.wood < cost) return false;
    this.resources.wood -= cost; this.tribe.agriculture.farms++;
    this.tribe.agriculture.output += 5 + Math.floor(this.tribe.agriculture.level * 2);
    return true;
  }
  buildMarket() {
    const cost = 50; if (this.tribe.commerce.markets >= this.tribe.commerce.maxMarkets || this.gold < cost) return false;
    this.gold -= cost; this.tribe.commerce.markets++;
    this.tribe.commerce.income += 10 + this.tribe.commerce.level * 5;
    return true;
  }
  buildBarracks() {
    const cost = 40; if (this.tribe.military.barracks >= this.tribe.military.maxBarracks || this.resources.stone < cost) return false;
    this.resources.stone -= cost; this.tribe.military.barracks++;
    this.tribe.military.maxSoldiers = this.tribe.military.barracks * 20;
    return true;
  }
  plantTrees() {
    if (this.tribe.ecology.trees >= this.tribe.ecology.maxTrees) return false;
    this.tribe.ecology.trees++;
    this.tribe.ecology.water = Math.min(100, this.tribe.ecology.waterSupply + this.tribe.ecology.trees * 2);
    return true;
  }
  recruitSoldiers(count) {
    const cost = count * 10;
    if (this.resources.food < cost || this.tribe.population < count + 5) return false;
    this.resources.food -= cost; this.tribe.population -= count;
    this.army.infantry += count; this.tribe.military.soldiers += count;
    return true;
  }

  // === Diplomacy Actions ===
  proposeAlliance(nationId) {
    const rel = this.getNationRelation('player', nationId);
    if (rel < 60) return { success: false, msg: '关系不足，需要60以上好感度' };
    if (this.alliances.includes(nationId)) return { success: false, msg: '已经是盟友了' };
    const n = this.nations[nationId];
    if (n.attitude === 'aggressive' && rel < 80) return { success: false, msg: `${n.name}不愿与你结盟` };
    this.alliances.push(nationId);
    return { success: true, msg: `与${n.name}结成联盟！` };
  }
  proposeMarriage(charId) {
    const ch = this.characters[charId];
    if (!ch || ch.recruited) return { success: false, msg: '角色不可用' };
    if (ch.relation < 70) return { success: false, msg: '好感度不足70，对方婉拒了你的求婚' };
    ch.recruited = true; ch.relation = 100;
    this.recruitedCharacters.push(charId);
    this.player.spouse = charId;
    this.player.marriages.push({ charId, turn: this.turn });
    const nation = this.nations[ch.nation];
    if (nation) this.setNationRelation('player', ch.nation, this.getNationRelation('player', ch.nation) + 30);
    return { success: true, msg: `${ch.name}接受了你的求婚！联姻成功！`, cg: 'marriage_' + ch.nation };
  }
  sendGift(nationId, resource, amount) {
    if ((this.resources[resource] || 0) < amount) return { success: false, msg: '资源不足' };
    this.resources[resource] -= amount;
    const gain = Math.floor(amount * 2);
    this.setNationRelation('player', nationId, this.getNationRelation('player', nationId) + gain);
    const n = this.nations[nationId];
    return { success: true, msg: `向${n.name}赠送了${amount}${resource}，好感+${gain}` };
  }

  // === Turn Processing ===
  nextTurn() {
    this.turn++; this.year = Math.floor(this.turn / 12) + 1;
    if (this.tribe.established) this.processTribe();
    this.processEconomy(); this.processDiplomacy();
    return this.processEvents();
  }
  processTribe() {
    // Population growth
    const growthRate = this.tribe.happiness > 50 ? 0.05 : 0.02;
    const growth = Math.floor(this.tribe.population * growthRate);
    this.tribe.population = Math.min(this.tribe.maxPopulation, this.tribe.population + growth);
    // Food consumption
    const foodNeed = this.tribe.population * 0.5 + this.army.infantry * 0.8;
    this.resources.food += this.tribe.agriculture.output - foodNeed;
    if (this.resources.food < 0) { this.tribe.happiness -= 10; this.resources.food = 0; this.eventLog.push('粮食不足！民众不满！'); }
    else this.tribe.happiness = Math.min(100, this.tribe.happiness + 2);
    // Commerce income
    this.gold += this.tribe.commerce.income;
    // Ecology
    if (this.tribe.ecology.trees > 5) this.tribe.agriculture.output += 1;
    // Military training
    if (this.tribe.military.barracks > 0) this.tribe.military.training += this.tribe.military.barracks;
  }
  processEconomy() {
    this.tradeRoutes.forEach(r => this.addGold(r.income || 10));
    this.ownedTerritories.forEach(nId => {
      const n = this.nations[nId];
      if (n) this.addGold(Math.floor(n.economy * 0.5));
    });
  }
  processDiplomacy() {
    Object.keys(this.nationRelations).forEach(k => {
      this.nationRelations[k] = Math.max(-100, Math.min(100, this.nationRelations[k] + Math.floor(Math.random() * 5) - 2));
    });
  }
  processEvents() {
    const events = [
      { type: 'trade_boom', text: '丝绸之路贸易繁荣！', effect: () => this.addGold(100) },
      { type: 'sandstorm', text: '沙暴来袭！', effect: () => { this.addGold(-50); if (this.tribe.established) this.tribe.ecology.trees = Math.max(0, this.tribe.ecology.trees - 2); } },
      { type: 'diplomat', text: '一位使者前来拜访。', effect: () => {} },
      { type: 'recruit', text: '有旅人想加入你的部落。', effect: () => { if (this.tribe.established) this.tribe.population += 5; } },
      { type: 'discovery', text: '发现了一处古代遗迹！', effect: () => this.addExp(50) },
      { type: 'merchant', text: '一位粟特商人路过。', effect: () => this.addGold(30) },
      { type: 'han_envoy', text: '汉朝使节经过西域。', effect: () => { this.majorPowerRelations.han += 5; } },
      { type: 'xiongnu_raid', text: '匈奴骑兵在北方出没！', effect: () => { this.majorPowerRelations.xiongnu -= 5; } },
    ];
    const evt = events[Math.floor(Math.random() * events.length)];
    evt.effect(); this.events.push({ ...evt, turn: this.turn });
    return evt;
  }

  addExp(amount) {
    this.player.exp += amount;
    while (this.player.exp >= this.player.expToNext) {
      this.player.exp -= this.player.expToNext;
      this.player.level++; this.player.expToNext = Math.floor(this.player.expToNext * 1.5);
      const stats = Object.keys(this.player.stats);
      this.player.stats[stats[Math.floor(Math.random() * stats.length)]] += 3;
    }
  }
  addGold(a) { this.player.gold = Math.max(0, this.player.gold + a); }
  movePlayer(x, y) {
    this.player.location = { x, y };
    for (const [id, nation] of Object.entries(this.nations)) {
      for (const tile of nation.territory) {
        if (tile.x === x && tile.y === y) { this.player.currentNation = id; return id; }
      }
    }
    this.player.currentNation = null; return null;
  }
  recruitCharacter(charId) {
    const ch = this.characters[charId];
    if (ch && !ch.recruited) { ch.recruited = true; this.recruitedCharacters.push(charId); return true; }
    return false;
  }
  startQuest(qid) { if (!this.activeQuests.includes(qid)) { this.activeQuests.push(qid); this.questProgress[qid] = { started: true }; } }
  completeQuest(qid) {
    const idx = this.activeQuests.indexOf(qid);
    if (idx !== -1) {
      this.activeQuests.splice(idx, 1); this.completedQuests.push(qid);
      const quest = [...MAIN_STORY, ...SIDE_QUESTS].find(q => q.id === qid);
      if (quest && quest.rewards) {
        if (quest.rewards.gold) this.addGold(quest.rewards.gold);
        if (quest.rewards.exp) this.addExp(quest.rewards.exp);
        if (quest.rewards.title) this.player.titles.push(quest.rewards.title);
        if (quest.rewards.cg) this.unlockCG(quest.rewards.cg);
        if (quest.nextQuest) this.currentMainQuest = quest.nextQuest;
      }
      return true;
    }
    return false;
  }
  unlockCG(cgId) { this.unlockedCG.add(cgId); }
  save() {
    const d = {
      phase: this.phase, turn: this.turn, chapter: this.chapter, year: this.year,
      player: this.player, nationRelations: this.nationRelations,
      ownedTerritories: [...this.ownedTerritories], alliances: this.alliances,
      activeQuests: this.activeQuests, completedQuests: this.completedQuests,
      currentMainQuest: this.currentMainQuest, questProgress: this.questProgress,
      tribe: this.tribe, army: this.army, tradeRoutes: this.tradeRoutes,
      inventory: this.inventory, resources: this.resources,
      recruitedCharacters: this.recruitedCharacters,
      unlockedCG: [...this.unlockedCG], events: this.events.slice(-50),
      eventLog: this.eventLog.slice(-50), majorPowerRelations: this.majorPowerRelations,
      characterStates: Object.fromEntries(Object.entries(this.characters).map(([id, c]) => [id, { relation: c.relation, recruited: c.recruited }]))
    };
    localStorage.setItem('silk_road_chronicles_save', JSON.stringify(d));
  }
  load() {
    const data = localStorage.getItem('silk_road_chronicles_save');
    if (!data) return false;
    try {
      const s = JSON.parse(data);
      Object.keys(s).forEach(k => {
        if (k === 'ownedTerritories') this.ownedTerritories = new Set(s[k]);
        else if (k === 'unlockedCG') this.unlockedCG = new Set(s[k]);
        else if (k === 'characterStates') Object.entries(s[k]).forEach(([id, st]) => { if (this.characters[id]) Object.assign(this.characters[id], st); });
        else this[k] = s[k];
      });
      return true;
    } catch (e) { return false; }
  }
  hasSave() { return !!localStorage.getItem('silk_road_chronicles_save'); }
}

const gameState = new GameState();
export default gameState;