/**
 * Game State v6 - 全局游戏状态
 * Progression: nation select → capital quest → tribe quests → city dev → expansion
 * City development requires resources, affects population/tech/agriculture/commerce
 * War requires completing 50%+ enemy tribe quests first
 */
import { GENERAL_SYSTEM, CITIZEN_TYPES, CITIZEN_JOBS, ALL_FEMALE_NATIONS,
  isAllFemaleNation, getFemaleTrainingDiscount,
  getNationType, getMaxLevel, getLevelData, getDifficulty,
  CITY_LEVELS, TRIBE_LEVELS, LEVEL_UPGRADE_COST, WAR_DAMAGE,
  checkEvents } from '../data/worldData.js';
import { getCurrentPhase, canPerformAction, hasAbility,
  CITY_DEVELOPMENT, RECRUITMENT_COSTS, ABILITIES } from '../data/questSystem.js';

export const state = {
  turn: 1, phase: 'menu', gamePhase: 'nation_select',
  characters: {}, stats: null, nationsData: null,
  battleCount: 0,
  // City development tracking
  cityProjects: {},  // { project_id: true } - completed projects
  cityStats: {
    food_production: 0, gold_production: 0,
    tech_production: 0, weapon_production: 0,
    recruit_capacity: 0, cavalry_capacity: 0, camel_capacity: 0,
    max_population: 500, trade_bonus: 0, troop_quality: 0,
  },
  player: {
    name: '旅行者', title: '无名旅人', gold: 200, level: 1, exp: 0,
    location: { x: 48, y: 48 }, currentNation: null,
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
  // 7 unit types army (含女弓骑兵)
  army: {
    infantry: 10, cavalry: 0, archerCav: 0, camel: 0,
    femaleInfantry: 0, femaleCavalry: 0, femaleArcherCav: 0,
    morale: 70,
  },
  // ===== SLAVE SYSTEM (奴隶系统 - 6 types) =====
  slaves: {
    total: 0,
    inventory: {
      femaleLaborer: 0, maleLaborer: 0, dancer: 0,
      warrior: 0, concubine: 0, artisan: 0,
    },
    // 奴隶专属工作（伐木/采矿/农业只能由奴隶承担）
    assigned: {
      labor_farm: 0, labor_mine: 0, labor_wood: 0,
      entertainment: 0, sacrifice: 0,
    },
    training: [],
  },
  // ===== CITIZEN SYSTEM (公民系统) =====
  // 公民承担：征兵、商业、工匠、繁衍
  // 公民只能从奴隶培训转化而来
  citizens: {
    total: 0,
    inventory: {
      maleCitizen: 0,      // 男公民 - 可征男兵/经商/繁衍
      femaleCitizen: 0,    // 女公民 - 可征女兵/经商/繁衍
      femaleMerchant: 0,   // 女商人(舞女转化) - 商业+30%加成
      craftsman: 0,        // 工匠(匠奴转化) - 科技/建造
    },
    // 公民职业分配
    assigned: {
      soldier: 0,    // 征兵入伍
      merchant: 0,   // 经商贸易
      craftsman: 0,  // 工匠科技
      builder: 0,    // 建筑建造
      breeding: 0,   // 繁衍后代
    },
  },
  // ===== GENERAL SYSTEM (武将系统 - 参考三国志) =====
  // 武将可带兵攻城掠地，攻城必须有武将
  generals: [],  // Array of general objects
  // General names pool
  _generalNames: {
    male: ['赵破奴', '甘延寿', '陈汤', '班超', '班勇', '耿恭', '窦固', '窦宪',
           '张骞', '卫青', '霍去病', '李广', '公孙敖', '苏建', '李陵', '赵充国'],
    female: ['花木兰', '妇好', '吕母', '冼夫人', '平阳公主', '秦良玉',
             '梁红玉', '樊梨花', '穆桂英', '阿史那', '细君公主', '解忧公主'],
  },
  _nameIdx: 0,

  // Hired characters
  hiredGenerals: [], hiredOfficials: [], hiredMerchants: [], hiredSpies: [],
  // ===== NATION LEVEL SYSTEM (城邦/部落等级) =====
  nationLevel: 1,           // 当前国家等级 (城邦1-5, 部落1-3)
  nationType: 'city',       // 'city' or 'tribe'
  difficulty: null,         // 当前难度 { level, bonus, desc }
  unlockedAbilities: [],    // 已解锁能力

  // Tribe relations
  tribeRelations: {},
  controlledCities: new Set(),
  controlledTribes: new Set(),
  controlledSince: {},
  alliances: [], tradeRoutes: [], ownedTerritories: new Set(),
  activeQuests: [], completedQuests: [], currentMainQuest: 'main_001',
  unlockedCG: new Set(),
  // 6 Major Power Relations
  majorPowerRelations: { han: 50, xiongnu: 30, kushan: 40, parthia: 35, rome: 20, sassanid: 25 },

  get totalArmy() {
    const a = this.army;
    return a.infantry + a.cavalry + a.archerCav + a.camel + a.femaleInfantry + a.femaleCavalry + a.femaleArcherCav;
  },

  // 当前等级数据
  get levelData() {
    return getLevelData(this.player.currentNation || 'loulan', this.nationLevel);
  },

  // 每回合基础产出（受等级影响）
  get levelProduction() {
    const ld = this.levelData;
    return ld ? ld.production : { gold: 10, food: 15, resource: 5, recruit: 5 };
  },

  get totalSlaves() { return this.slaves.total; },
  get totalCitizens() { return this.citizens.total; },
  get unassignedSlaves() {
    return this.slaves.total - Object.values(this.slaves.assigned).reduce((a, b) => a + b, 0);
  },
  get unassignedCitizens() {
    return this.citizens.total - Object.values(this.citizens.assigned).reduce((a, b) => a + b, 0);
  },

  // ===== DEVELOPMENT BALANCE CHECK =====
  // 检查奴隶/公民平衡，不平衡会影响城邦发展
  get developmentBalance() {
    const slaves = this.slaves.total;
    const citizens = this.citizens.total;
    const total = slaves + citizens;
    if (total === 0) return { score: 0, desc: '无人口', penalty: 0 };

    // 理想比例：奴隶60% 公民40%（奴隶做苦力，公民做高级工作）
    const slaveRatio = slaves / total;
    let score = 100;
    let penalty = 0;
    let issues = [];

    // 奴隶太少 → 资源产出不足
    if (slaveRatio < 0.3) {
      score -= 30;
      penalty = 0.5;
      issues.push('奴隶不足，资源产出严重下降！');
    } else if (slaveRatio < 0.5) {
      score -= 10;
      penalty = 0.2;
      issues.push('奴隶偏少，资源产出受限');
    }

    // 公民太少 → 无法征兵/经商
    if (citizens < 5) {
      score -= 30;
      penalty += 0.5;
      issues.push('公民不足，无法有效征兵和经商！');
    }

    // 公民职业分配检查
    const ca = this.citizens.assigned;
    if (ca.soldier === 0 && this.totalArmy < 20) {
      score -= 10;
      issues.push('无公民参军，军力薄弱');
    }
    if (ca.merchant === 0) {
      score -= 10;
      issues.push('无公民经商，商业收入为零');
    }

    return {
      score: Math.max(0, score),
      desc: score >= 80 ? '发展均衡' : score >= 50 ? '发展失衡' : '严重失衡',
      penalty: Math.min(1, penalty),
      issues,
    };
  },

  getNationRelation(a, b) { return 50 + Math.floor(Math.random() * 20 - 10); },
  movePlayer(x, y) { this.player.location.x = x; this.player.location.y = y; },
  addGold(n) { this.player.gold += n; },
  addExp(n) { this.player.exp += n; },

  // ===== SELECT NATION (选择国家) =====
  // Pass NATIONS object from scene to avoid require() in ES module
  selectNation(nationId, nationsData) {
    this.player.currentNation = nationId;
    this.nationType = getNationType(nationId);
    this.nationLevel = 1;
    this.difficulty = getDifficulty(nationId);

    // Set starting position to nation capital
    if (nationsData && nationsData[nationId]) {
      const nation = nationsData[nationId];
      if (nation.capital) {
        this.player.location = { ...nation.capital };
      }
    }

    // Apply difficulty bonus
    if (this.difficulty.bonus) {
      this.player.gold += this.difficulty.bonus.gold || 0;
      this.resources.food += this.difficulty.bonus.food || 0;
      this.army.infantry += this.difficulty.bonus.startingTroops || 0;
    }

    return this.difficulty;
  },

  // ===== UPGRADE NATION LEVEL (升级城邦/部落) =====
  upgradeNationLevel() {
    const maxLvl = getMaxLevel(this.player.currentNation);
    if (this.nationLevel >= maxLvl) return { success: false, msg: '已达最高等级！' };

    const nextLevel = this.nationLevel + 1;
    const type = this.nationType;
    const costs = LEVEL_UPGRADE_COST[type]?.[nextLevel];
    if (!costs) return { success: false, msg: '无法升级！' };

    // Check resources
    for (const [res, amt] of Object.entries(costs)) {
      if (res === 'gold') {
        if (this.player.gold < amt) return { success: false, msg: `金币不足（需要${amt}）` };
      } else if (this.resources[res] !== undefined) {
        if (this.resources[res] < amt) return { success: false, msg: `${res}不足（需要${amt}）` };
      }
    }

    // Deduct costs
    for (const [res, amt] of Object.entries(costs)) {
      if (res === 'gold') this.player.gold -= amt;
      else if (this.resources[res] !== undefined) this.resources[res] -= amt;
    }

    this.nationLevel = nextLevel;
    const ld = this.levelData;
    return { success: true, level: nextLevel, data: ld, msg: `升级至${ld.name}！` };
  },

  // ===== WAR DAMAGE (战争降级) =====
  applyWarDamage(severity) {
    const damage = WAR_DAMAGE[severity];
    if (!damage) return null;

    const result = { severity, downgraded: false, resourceLoss: 0 };

    // Resource loss
    const lossRate = damage.resourceLoss;
    result.resourceLoss = Math.floor(this.player.gold * lossRate);
    this.player.gold = Math.floor(this.player.gold * (1 - lossRate));
    this.resources.food = Math.floor(this.resources.food * (1 - lossRate));

    // Level downgrade check
    if (Math.random() < damage.downgradeChance && this.nationLevel > 1) {
      const loss = Math.min(damage.levelLoss, this.nationLevel - 1);
      this.nationLevel -= loss;
      result.downgraded = true;
      result.newLevel = this.nationLevel;
    }

    this.battleCount = (this.battleCount || 0) + 1;
    return result;
  },

  // ===== CHECK & TRIGGER EVENTS (检查触发事件) =====
  checkAndTriggerEvents() {
    const events = checkEvents(this);
    const results = [];
    events.forEach(event => {
      // Apply rewards
      if (event.reward.gold) this.player.gold += event.reward.gold;
      if (event.reward.food) this.resources.food += event.reward.food;
      if (event.reward.moraleBonus) this.army.morale = Math.min(100, this.army.morale + event.reward.moraleBonus);
      if (event.reward.exp) this.player.exp += event.reward.exp;
      if (event.reward.unlock && !this.unlockedAbilities.includes(event.reward.unlock)) {
        this.unlockedAbilities.push(event.reward.unlock);
      }
      this.completedQuests.push(event.id);
      results.push(event);
    });
    return results;
  },

  // ===== NEXT TURN =====
  nextTurn() {
    this.turn++;
    const balance = this.developmentBalance;
    const penaltyMult = 1 - balance.penalty;

    // Level-based production (城邦/部落等级产出)
    const lp = this.levelProduction;
    this.player.gold += Math.floor(lp.gold * penaltyMult);
    this.resources.food += Math.floor(lp.food * penaltyMult);

    // Additional production from buildings
    this.resources.food += Math.floor(this.tribe.agriculture.output * penaltyMult);
    this.player.gold += Math.floor(this.tribe.commerce.income * penaltyMult);
    this.tradeRoutes.forEach(t => this.player.gold += Math.floor(t.income * penaltyMult));

    // === SLAVE LABOR (奴隶劳力 - 伐木/采矿/农业) ===
    const s = this.slaves;
    if (s.assigned.labor_farm > 0) this.resources.food += Math.floor(s.assigned.labor_farm * 2 * penaltyMult);
    if (s.assigned.labor_mine > 0) this.resources.ore += Math.floor(s.assigned.labor_mine * 1 * penaltyMult);
    if (s.assigned.labor_wood > 0) this.resources.wood += Math.floor(s.assigned.labor_wood * 1 * penaltyMult);
    if (s.assigned.entertainment > 0) this.player.gold += Math.floor(s.assigned.entertainment * 5 * penaltyMult);
    if (s.assigned.sacrifice > 0) this.army.morale = Math.min(100, this.army.morale + Math.floor(s.assigned.sacrifice * 0.5));

    // === CITIZEN PRODUCTION (公民产出 - 征兵/商业/科技/建造) ===
    const ca = this.citizens.assigned;
    // 经商贸易 - 基础10金/商人/回合
    if (ca.merchant > 0) {
      let merchantIncome = ca.merchant * 10;
      // 女商人加成
      const femaleMerchantCount = this.citizens.inventory.femaleMerchant || 0;
      if (femaleMerchantCount > 0) merchantIncome = Math.floor(merchantIncome * 1.3);
      this.player.gold += Math.floor(merchantIncome * penaltyMult);
      this.tribe.commerce.income = Math.floor(merchantIncome * 0.3);
    }
    // 工匠科技 - 提升科技等级
    if (ca.craftsman > 0) {
      this.tribe.techLevel = Math.min(10, this.tribe.techLevel + ca.craftsman * 0.01);
    }
    // 建筑建造 - 加速建造
    if (ca.builder > 0) {
      this.resources.stone += Math.floor(ca.builder * 2);
    }
    // 繁衍后代 - 增加人口
    if (ca.breeding > 0) {
      this.tribe.population += Math.floor(ca.breeding * 2);
    }

    // Process slave→citizen/general training
    this.slaves.training = this.slaves.training.filter(t => {
      t.turnsLeft--;
      if (t.turnsLeft <= 0) {
        const cat = t.resultCategory;
        if (cat === 'citizens') {
          this.citizens.inventory[t.result] = (this.citizens.inventory[t.result] || 0) + 1;
          this.citizens.total++;
        } else if (cat === 'generals') {
          // Create a new general
          const gender = t.result === 'femaleGeneral' ? 'female' : 'male';
          const name = this._getNextGeneralName(gender);
          const general = GENERAL_SYSTEM.createGeneral(name, gender, 'slave_training');
          this.generals.push(general);
        } else if (cat === 'army') {
          // Direct to army
          if (t.result === 'eliteSoldier') {
            this.army.infantry += 10; // Elite soldiers
          }
        }
        return false;
      }
      return true;
    });

    // Controlled tribe income
    this.controlledTribes.forEach(tid => {
      this.resources.food += 5;
      this.player.gold += 3;
    });

    // General EXP gain
    this.generals.forEach(g => {
      g.exp += 10;
      // Level up check
      const expNeeded = g.level * 100;
      if (g.exp >= expNeeded) {
        g.level++;
        g.exp -= expNeeded;
        // Update rank
        const ranks = GENERAL_SYSTEM.ranks;
        for (let i = ranks.length - 1; i >= 0; i--) {
          if (g.level >= ranks[i].minLevel) { g.rank = ranks[i]; break; }
        }
        // Random stat increase
        const statKeys = Object.keys(g.stats);
        g.stats[statKeys[Math.floor(Math.random() * statKeys.length)]] += 2;
      }
    });

    // Check for triggered events
    const triggeredEvents = this.checkAndTriggerEvents();
    const eventText = triggeredEvents.length > 0
      ? ` | 触发${triggeredEvents.length}个事件！`
      : '';

    return { text: `第${this.turn}回合开始 | 发展指数:${balance.score} | 等级:${this.nationLevel}${eventText}`, balance, triggeredEvents };
  },

  _getNextGeneralName(gender) {
    const pool = this._generalNames[gender] || this._generalNames.male;
    const name = pool[this._nameIdx % pool.length];
    this._nameIdx++;
    return name;
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

  // ===== CITIZEN RECRUITMENT (公民征兵 - 需要公民) =====
  // 征兵只能由公民承担，消耗公民
  recruitFromCitizens(unitType, count) {
    const femaleUnits = ['femaleInfantry', 'femaleCavalry', 'femaleArcherCav'];
    const citizenType = femaleUnits.includes(unitType) ? 'femaleCitizen' : 'maleCitizen';
    const available = this.citizens.inventory[citizenType] || 0;
    const canRecruit = Math.min(count, available);
    if (canRecruit <= 0) return { success: false, msg: `没有足够的${citizenType === 'femaleCitizen' ? '女' : '男'}公民可征召！` };

    this.citizens.inventory[citizenType] -= canRecruit;
    this.citizens.total -= canRecruit;
    if (this.army[unitType] !== undefined) {
      this.army[unitType] += canRecruit;
    }
    return { success: true, count: canRecruit, unitType };
  },

  // Recruit from tribe (basic, no citizen needed)
  recruitTribeSoldiers(unitType, count) {
    if (this.resources.food >= count * 5 && this.player.gold >= count * 15) {
      this.resources.food -= count * 5;
      this.player.gold -= count * 15;
      if (this.army[unitType] !== undefined) this.army[unitType] += count;
      return true;
    }
    return false;
  },

  hireMercenary(mercType, cost) {
    if (this.player.gold >= cost) { this.player.gold -= cost; return true; }
    return false;
  },

  // ===== SLAVE MANAGEMENT =====
  assignSlave(role, count) {
    const available = this.unassignedSlaves;
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
  buySlaves(slaveType, count, cost) {
    if (this.player.gold < cost) return 0;
    this.player.gold -= cost;
    this.slaves.total += count;
    if (this.slaves.inventory[slaveType] !== undefined) this.slaves.inventory[slaveType] += count;
    return count;
  },
  sellSlaves(slaveType, count, pricePerUnit) {
    const available = this.slaves.inventory[slaveType] || 0;
    const canSell = Math.min(count, available);
    if (canSell <= 0) return 0;
    this.slaves.inventory[slaveType] -= canSell;
    this.slaves.total -= canSell;
    this.player.gold += Math.floor(canSell * pricePerUnit);
    return canSell;
  },

  // ===== PLUNDER (掠夺 - 把他国公民变成奴隶) =====
  plunderSlaves(tribe, getPlunderYield) {
    const goldYield = Math.floor(Math.random() * 80) + 20;
    const yield_ = getPlunderYield(tribe);
    let totalSlaves = 0;
    Object.entries(yield_).forEach(([type, count]) => {
      if (count > 0 && this.slaves.inventory[type] !== undefined) {
        this.slaves.inventory[type] += count;
        totalSlaves += count;
      }
    });
    this.slaves.total += totalSlaves;
    this.player.gold += goldYield;
    this.tribeRelations[tribe.id] = (this.tribeRelations[tribe.id] || 50) - 30;
    // 掠夺降低他国实力（减少部落人口和兵力）
    tribe.pop = Math.max(0, tribe.pop - totalSlaves * 2);
    tribe.troops = Math.max(0, tribe.troops - Math.floor(totalSlaves * 0.5));
    return { typed: yield_, total: totalSlaves, gold: goldYield };
  },

  // ===== SLAVE TRIBUTE (赠送奴隶增强他国) =====
  sendSlaveTribute(targetId, slaveType, count, isMajorPower, calcGiftEffect) {
    const available = this.slaves.inventory[slaveType] || 0;
    const canSend = Math.min(count, available);
    if (canSend <= 0) return null;
    this.slaves.inventory[slaveType] -= canSend;
    this.slaves.total -= canSend;
    const effect = calcGiftEffect(targetId, slaveType, canSend, isMajorPower);
    if (isMajorPower) {
      this.majorPowerRelations[targetId] = Math.min(100, (this.majorPowerRelations[targetId] || 50) + effect.relationGain);
    } else {
      this.tribeRelations[targetId] = (this.tribeRelations[targetId] || 50) + effect.relationGain;
    }
    this.player.gold += effect.goldGain;
    // 赠送奴隶增强他国实力
    return effect;
  },

  // ===== SLAVE → CITIZEN/GENERAL TRAINING =====
  trainSlave(trainingType) {
    const fromType = trainingType.fromType;
    const available = this.slaves.inventory[fromType] || 0;
    if (available <= 0) return false;
    this.slaves.inventory[fromType]--;
    this.slaves.total--;
    this.slaves.training.push({
      slaveId: Date.now(),
      type: trainingType.id,
      fromType: fromType,
      turnsLeft: trainingType.turns,
      result: trainingType.result,
      resultCategory: trainingType.resultCategory,
    });
    return true;
  },

  // ===== CITIZEN JOB ASSIGNMENT =====
  assignCitizen(job, count) {
    const available = this.unassignedCitizens;
    const canAssign = Math.min(count, available);
    if (canAssign > 0 && this.citizens.assigned[job] !== undefined) {
      this.citizens.assigned[job] += canAssign;
      return canAssign;
    }
    return 0;
  },
  unassignCitizen(job, count) {
    if (this.citizens.assigned[job] >= count) {
      this.citizens.assigned[job] -= count;
      return count;
    }
    return 0;
  },

  // ===== GENERAL MANAGEMENT =====
  // Assign troops to general (武将带兵)
  assignTroopsToGeneral(generalId, unitType, count) {
    const general = this.generals.find(g => g.id === generalId);
    if (!general) return false;
    const maxTroops = general.rank.maxTroops;
    const currentTroops = Object.values(general.troops).reduce((a, b) => a + b, 0);
    if (currentTroops + count > maxTroops) return false;
    if (this.army[unitType] < count) return false;
    this.army[unitType] -= count;
    general.troops[unitType] = (general.troops[unitType] || 0) + count;
    return true;
  },
  // Remove troops from general
  removeTroopsFromGeneral(generalId, unitType, count) {
    const general = this.generals.find(g => g.id === generalId);
    if (!general) return false;
    const available = general.troops[unitType] || 0;
    const canRemove = Math.min(count, available);
    general.troops[unitType] -= canRemove;
    this.army[unitType] += canRemove;
    return canRemove;
  },
  // Check if can attack (need at least one general with troops)
  canAttack() {
    return this.generals.some(g => Object.values(g.troops).reduce((a, b) => a + b, 0) > 0);
  },
  // Get general total troops
  getGeneralTroops(generalId) {
    const general = this.generals.find(g => g.id === generalId);
    if (!general) return 0;
    return Object.values(general.troops).reduce((a, b) => a + b, 0);
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

  // ===== PROGRESSION SYSTEM METHODS =====

  // Complete a quest and apply rewards
  completeQuest(quest) {
    if (this.completedQuests.includes(quest.id)) return false;
    this.completedQuests.push(quest.id);
    // Remove from active
    this.activeQuests = this.activeQuests.filter(q => q !== quest.id);

    const r = quest.rewards || {};
    // Apply gold reward
    if (r.gold) this.player.gold += r.gold;
    if (r.food) this.resources.food += r.food;
    // Apply relation
    if (r.relation) { /* tracked via tribeRelations */ }
    // Apply resources
    if (r.resources) {
      Object.entries(r.resources).forEach(([k, v]) => {
        if (this.resources[k] !== undefined) this.resources[k] += v;
      });
    }
    // Unlock abilities
    if (r.unlockAbility && !this.unlockedAbilities.includes(r.unlockAbility)) {
      this.unlockedAbilities.push(r.unlockAbility);
    }
    if (r.unlockAbility2 && !this.unlockedAbilities.includes(r.unlockAbility2)) {
      this.unlockedAbilities.push(r.unlockAbility2);
    }
    // Grant citizens
    if (r.citizens) {
      Object.entries(r.citizens).forEach(([k, v]) => {
        if (this.citizens.inventory[k] !== undefined) {
          this.citizens.inventory[k] += v;
          this.citizens.total += v;
        }
      });
    }
    // Grant slaves
    if (r.slaves) {
      Object.entries(r.slaves).forEach(([k, v]) => {
        if (this.slaves.inventory[k] !== undefined) {
          this.slaves.inventory[k] += v;
          this.slaves.total += v;
        }
      });
    }
    // Control tribe
    if (r.controlTribe && quest.tribeId) {
      this.controlledTribes.add(quest.tribeId);
      this.controlledSince[quest.tribeId] = this.turn;
    }
    // Update game phase
    this.gamePhase = getCurrentPhase(this);
    return true;
  },

  // Check if quest objectives are met
  checkQuestCompletion(quest) {
    const objectives = quest.objectives || [];
    for (const obj of objectives) {
      if (obj.type === 'pay_gold' && this.player.gold < obj.amount) return false;
      if (obj.type === 'pay_food' && this.resources.food < obj.amount) return false;
      if (obj.type === 'pay_resource' && (this.resources[obj.resource] || 0) < obj.amount) return false;
      if (obj.type === 'military_strength' && this.totalArmy < obj.minTroops) return false;
    }
    return true;
  },

  // Pay quest costs and complete
  payAndCompleteQuest(quest) {
    if (!this.checkQuestCompletion(quest)) return { success: false, msg: '条件不满足！' };
    const objectives = quest.objectives || [];
    for (const obj of objectives) {
      if (obj.type === 'pay_gold') this.player.gold -= obj.amount;
      if (obj.type === 'pay_food') this.resources.food -= obj.amount;
      if (obj.type === 'pay_resource') this.resources[obj.resource] -= obj.amount;
    }
    this.completeQuest(quest);
    return { success: true, msg: `完成任务：${quest.name}` };
  },

  // ===== CITY DEVELOPMENT =====
  // Build a city project
  buildProject(projectId) {
    const project = CITY_DEVELOPMENT.projects[projectId];
    if (!project) return { success: false, msg: '项目不存在！' };
    if (this.cityProjects[projectId]) return { success: false, msg: '已建造！' };
    if (project.requireAbility && !hasAbility(this, project.requireAbility)) {
      return { success: false, msg: `需要解锁「${ABILITIES[project.requireAbility]?.name}」能力` };
    }
    if (project.requireCityLevel > this.nationLevel) {
      return { success: false, msg: `需要城市等级${project.requireCityLevel}` };
    }
    // Check cost
    const cost = project.cost;
    if (cost.gold && this.player.gold < cost.gold) return { success: false, msg: '金币不足' };
    if (cost.wood && this.resources.wood < cost.wood) return { success: false, msg: '木材不足' };
    if (cost.stone && this.resources.stone < cost.stone) return { success: false, msg: '石材不足' };
    if (cost.iron && this.resources.iron < cost.iron) return { success: false, msg: '铁矿不足' };
    if (cost.silk && this.resources.silk < cost.silk) return { success: false, msg: '丝绸不足' };
    if (cost.labor && this.unassignedSlaves < cost.labor) return { success: false, msg: '劳动力不足（需要空闲奴隶）' };

    // Deduct cost
    if (cost.gold) this.player.gold -= cost.gold;
    if (cost.wood) this.resources.wood -= cost.wood;
    if (cost.stone) this.resources.stone -= cost.stone;
    if (cost.iron) this.resources.iron -= cost.iron;
    if (cost.silk) this.resources.silk -= cost.silk;
    if (cost.labor) this.assignSlave('labor_wood', cost.labor); // use slaves as labor

    // Apply effect
    this.cityProjects[projectId] = true;
    const effect = project.effect;
    Object.entries(effect).forEach(([k, v]) => {
      if (this.cityStats[k] !== undefined) this.cityStats[k] += v;
    });

    return { success: true, msg: `建造完成：${project.name}`, effect };
  },

  // ===== RECRUIT WITH COSTS (征兵消耗资源) =====
  recruitUnit(unitType, count) {
    const costDef = RECRUITMENT_COSTS[unitType];
    if (!costDef) return { success: false, msg: '未知兵种' };
    if (!hasAbility(this, costDef.requireAbility)) {
      return { success: false, msg: `需要解锁「${ABILITIES[costDef.requireAbility]?.name}」能力` };
    }
    if (costDef.requireProject && !this.cityProjects[costDef.requireProject]) {
      return { success: false, msg: '需要先建造对应军事设施' };
    }
    const cost = costDef.cost;
    const citizenType = cost.maleCitizen ? 'maleCitizen' : 'femaleCitizen';
    const available = this.citizens.inventory[citizenType] || 0;
    const canRecruit = Math.min(count, available);
    if (canRecruit <= 0) return { success: false, msg: `没有足够的${citizenType === 'femaleCitizen' ? '女' : '男'}公民` };

    // Check resources
    const totalGold = (cost.gold || 0) * canRecruit;
    const totalFood = (cost.food || 0) * canRecruit;
    const totalHorse = (cost.horse || 0) * canRecruit;
    const totalIron = (cost.iron || 0) * canRecruit;
    const totalCamel = (cost.camel || 0) * canRecruit;
    if (this.player.gold < totalGold) return { success: false, msg: '金币不足' };
    if (this.resources.food < totalFood) return { success: false, msg: '粮食不足' };
    if (this.resources.horse < totalHorse) return { success: false, msg: '马匹不足' };
    if (this.resources.iron < totalIron) return { success: false, msg: '铁矿不足' };
    if (this.resources.camel < totalCamel) return { success: false, msg: '骆驼不足' };

    // Deduct
    this.citizens.inventory[citizenType] -= canRecruit;
    this.citizens.total -= canRecruit;
    this.player.gold -= totalGold;
    this.resources.food -= totalFood;
    this.resources.horse -= totalHorse;
    this.resources.iron -= totalIron;
    this.resources.camel -= totalCamel;
    this.army[unitType] += canRecruit;

    return { success: true, count: canRecruit, unitType, msg: `征召${canRecruit}名${costDef.name}` };
  },

  // ===== CHECK ACTION PERMISSION =====
  canDo(action) {
    return canPerformAction(this, action);
  },
};
