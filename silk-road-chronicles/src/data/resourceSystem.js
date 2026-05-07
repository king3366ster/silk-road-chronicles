/**
 * Resource System v1 - 完整资源-系统闭环
 * 核心循环: 农业→商业→人口→军事→工业→资源→农业
 * 6大奴隶市场 + 9大贸易市场 + 距离定价 + 月度结算
 */

// ===== 6 SLAVE MARKETS (六大奴隶市场) =====
export const SLAVE_MARKETS_V2 = {
  kashgar: {
    id: 'kashgar', name: '疏勒奴隶大市', icon: '⛓️',
    desc: '西域最大的奴隶集散市场，各色奴隶应有尽有',
    location: { x: 16, y: 34 }, nation: 'kashgar',
    supply: {
      maleLaborer:   { base: 40, price: 55,  desc: '西域各族男劳奴' },
      femaleLaborer: { base: 30, price: 75,  desc: '各族女劳奴' },
      artisan:       { base: 15, price: 170, desc: '各族匠奴' },
      dancer:        { base: 10, price: 190, desc: '龟兹/疏勒舞女' },
      warrior:       { base: 12, price: 140, desc: '各族战奴' },
      concubine:     { base: 5,  price: 280, desc: '各族侍妾' },
    },
    specialty: ['artisan', 'dancer'], femaleRatio: 0.35,
  },
  soche: {
    id: 'soche', name: '粟特商人奴市', icon: '💰',
    desc: '粟特商人经营的奴隶市场，以匠奴和舞女闻名',
    location: { x: 8, y: 30 }, nation: 'soche',
    supply: {
      maleLaborer:   { base: 50, price: 50,  desc: '中亚男劳奴' },
      femaleLaborer: { base: 35, price: 70,  desc: '中亚女劳奴' },
      artisan:       { base: 40, price: 160, desc: '粟特匠奴（手艺精湛）' },
      dancer:        { base: 25, price: 180, desc: '粟特/波斯舞女' },
      warrior:       { base: 15, price: 135, desc: '中亚战奴' },
      concubine:     { base: 15, price: 260, desc: '波斯/粟特侍妾' },
    },
    specialty: ['artisan', 'concubine'], femaleRatio: 0.40,
  },
  kangju: {
    id: 'kangju', name: '康居战奴市场', icon: '⚔️',
    desc: '草原民族的战奴市场，以强壮的战奴和劳奴为主',
    location: { x: 8, y: 14 }, nation: 'kangju',
    supply: {
      maleLaborer:   { base: 45, price: 45,  desc: '草原男劳奴（体格强壮）' },
      femaleLaborer: { base: 15, price: 65,  desc: '草原女劳奴' },
      artisan:       { base: 8,  price: 175, desc: '草原匠奴' },
      dancer:        { base: 3,  price: 200, desc: '少量舞女' },
      warrior:       { base: 35, price: 120, desc: '草原战奴（战斗力强）' },
      concubine:     { base: 2,  price: 300, desc: '少量侍妾' },
    },
    specialty: ['warrior', 'maleLaborer'], femaleRatio: 0.15,
  },
  amazons: {
    id: 'amazons', name: '阿玛宗男奴市场', icon: '♀⛓️',
    desc: '阿玛宗女战士部落专营男奴市场，捕获的男性战俘和劳力',
    location: { x: 75, y: 25 }, nation: 'amazons',
    supply: {
      maleLaborer:   { base: 35, price: 60,  desc: '捕获的男劳奴' },
      warrior:       { base: 25, price: 130, desc: '男性战俘（战奴）' },
      artisan:       { base: 5,  price: 180, desc: '少数匠奴' },
      femaleLaborer: { base: 0,  price: 0,   desc: '不售卖女奴' },
      dancer:        { base: 0,  price: 0,   desc: '不售卖女奴' },
      concubine:     { base: 0,  price: 0,   desc: '不售卖女奴' },
    },
    specialty: ['warrior', 'maleLaborer'], femaleRatio: 0.0, maleOnly: true,
  },
  khotan: {
    id: 'khotan', name: '于阗女奴市场', icon: '👸',
    desc: '于阗以女奴贸易闻名，女工、织女、舞女供应充足',
    location: { x: 25, y: 59 }, nation: 'khotan',
    supply: {
      maleLaborer:   { base: 15, price: 65,  desc: '少量男劳奴' },
      femaleLaborer: { base: 40, price: 70,  desc: '于阗女工（擅长纺织）' },
      artisan:       { base: 12, price: 165, desc: '于阗匠奴' },
      dancer:        { base: 15, price: 185, desc: '于阗舞女（能歌善舞）' },
      warrior:       { base: 3,  price: 150, desc: '少量战奴' },
      concubine:     { base: 12, price: 270, desc: '于阗侍妾（貌美）' },
    },
    specialty: ['femaleLaborer', 'concubine', 'dancer'], femaleRatio: 0.65,
  },
  wusun: {
    id: 'wusun', name: '乌孙草原奴市', icon: '🐎',
    desc: '乌孙草原上的奴隶市场，战奴和马匹并重',
    location: { x: 50, y: 14 }, nation: 'wusun',
    supply: {
      maleLaborer:   { base: 30, price: 50,  desc: '草原男劳奴' },
      femaleLaborer: { base: 12, price: 70,  desc: '草原女劳奴' },
      artisan:       { base: 5,  price: 180, desc: '少量匠奴' },
      dancer:        { base: 3,  price: 210, desc: '少量舞女' },
      warrior:       { base: 30, price: 125, desc: '乌孙战奴（骑术精湛）' },
      concubine:     { base: 3,  price: 290, desc: '少量侍妾' },
    },
    specialty: ['warrior', 'maleLaborer'], femaleRatio: 0.18,
  },
};

// ===== 9 TRADE MARKETS (九大贸易市场) =====
export const TRADE_MARKETS = {
  kashgar_bazaar: {
    id: 'kashgar_bazaar', name: '疏勒大巴扎', icon: '🏪',
    desc: '西域最大的商贸集市，丝绸与香料的交汇点',
    location: { x: 16, y: 34 }, nation: 'kashgar',
    goods: {
      silk: { basePrice: 28, supply: 50 }, spice: { basePrice: 22, supply: 45 },
      cotton: { basePrice: 12, supply: 30 }, dye: { basePrice: 18, supply: 20 },
      wine: { basePrice: 15, supply: 15 },
    },
    demand: ['iron', 'horse', 'jade'],
  },
  khotan_jade: {
    id: 'khotan_jade', name: '于阗玉市', icon: '💎',
    desc: '于阗玉石交易市场，昆仑美玉的集散地',
    location: { x: 25, y: 59 }, nation: 'khotan',
    goods: {
      jade: { basePrice: 45, supply: 40 }, silk: { basePrice: 30, supply: 25 },
      cotton: { basePrice: 14, supply: 20 }, herb: { basePrice: 20, supply: 15 },
    },
    demand: ['iron', 'spice', 'wine'],
  },
  kucha_market: {
    id: 'kucha_market', name: '龟兹集市', icon: '🎵',
    desc: '龟兹商贸集市，以美酒和棉花闻名',
    location: { x: 35, y: 35 }, nation: 'kucha',
    goods: {
      wine: { basePrice: 14, supply: 40 }, cotton: { basePrice: 13, supply: 30 },
      iron: { basePrice: 18, supply: 20 },
    },
    demand: ['silk', 'jade', 'horse'],
  },
  loulan_market: {
    id: 'loulan_market', name: '楼兰集市', icon: '🧂',
    desc: '楼兰商贸集市，盐和鱼类贸易为主',
    location: { x: 52, y: 46 }, nation: 'loulan',
    goods: {
      salt: { basePrice: 8, supply: 50 }, jade: { basePrice: 48, supply: 10 },
      camel: { basePrice: 30, supply: 15 },
    },
    demand: ['silk', 'wine', 'iron'],
  },
  sogdian_port: {
    id: 'sogdian_port', name: '粟特商港', icon: '⛵',
    desc: '粟特人的商贸港口，连接东西方的贸易枢纽',
    location: { x: 8, y: 30 }, nation: 'soche',
    goods: {
      silk: { basePrice: 25, supply: 60 }, spice: { basePrice: 20, supply: 50 },
      gem: { basePrice: 70, supply: 15 },
    },
    demand: ['horse', 'jade', 'fur'],
  },
  dayuan_horse: {
    id: 'dayuan_horse', name: '大宛马市', icon: '🐎',
    desc: '大宛马匹交易市场，汗血宝马的故乡',
    location: { x: 8, y: 44 }, nation: 'dayuan',
    goods: {
      horse: { basePrice: 35, supply: 50 }, leather: { basePrice: 10, supply: 30 },
      fur: { basePrice: 12, supply: 20 },
    },
    demand: ['silk', 'spice', 'iron', 'wine'],
  },
  karashahr_iron: {
    id: 'karashahr_iron', name: '焉耆铁市', icon: '⛏️',
    desc: '焉耆铁矿交易市场，西域重要的金属产地',
    location: { x: 42, y: 30 }, nation: 'karashahr',
    goods: {
      iron: { basePrice: 16, supply: 45 }, coal: { basePrice: 8, supply: 35 },
      ore: { basePrice: 6, supply: 40 }, steel: { basePrice: 30, supply: 10 },
    },
    demand: ['food', 'silk', 'wine'],
  },
  xiliang_silk: {
    id: 'xiliang_silk', name: '西梁丝市', icon: '🧵',
    desc: '西梁女国的丝绸市场，天衣无缝的织锦工艺',
    location: { x: 15, y: 41 }, nation: 'xiliang',
    goods: {
      silk: { basePrice: 26, supply: 45 }, herb: { basePrice: 18, supply: 30 },
      dye: { basePrice: 16, supply: 25 }, cotton: { basePrice: 12, supply: 20 },
    },
    demand: ['iron', 'horse', 'salt'],
  },
  wusun_market: {
    id: 'wusun_market', name: '乌孙马市', icon: '🏇',
    desc: '乌孙草原马匹交易市场，天马的故乡',
    location: { x: 50, y: 14 }, nation: 'wusun',
    goods: {
      horse: { basePrice: 32, supply: 55 }, fur: { basePrice: 11, supply: 25 },
      leather: { basePrice: 9, supply: 20 }, iron: { basePrice: 20, supply: 10 },
    },
    demand: ['silk', 'spice', 'wine', 'salt'],
  },
};

// ===== NATION SPECIALTIES (城邦特产) =====
export const NATION_SPECIALTIES = {
  kashgar: ['silk', 'spice', 'cotton'], khotan: ['jade', 'silk', 'cotton'],
  kucha: ['wine', 'cotton', 'iron'], loulan: ['salt', 'jade'],
  soche: ['silk', 'spice', 'gem'], dayuan: ['horse', 'leather'],
  karashahr: ['iron', 'coal', 'ore', 'steel'], xiliang: ['silk', 'herb', 'dye'],
  wusun: ['horse', 'fur', 'leather'], shanshan: ['camel', 'horse'],
  kangju: ['horse', 'fur'], amazons: ['horse', 'fur', 'iron'],
  beshbaliq: ['iron', 'horse'], yarkand: ['iron', 'steel', 'silk'],
};

// ===== DISTANCE-BASED PRICING =====
export function calculateMarketPrice(market, goodId, basePrice, playerLocation) {
  if (!market.location || !playerLocation) return basePrice;
  const dist = Math.abs(market.location.x - playerLocation.x) + Math.abs(market.location.y - playerLocation.y);
  let mult;
  if (dist <= 10) mult = 0.7;
  else if (dist <= 20) mult = 0.85;
  else if (dist <= 30) mult = 1.0;
  else if (dist <= 40) mult = 1.15;
  else mult = 1.3;
  const spec = NATION_SPECIALTIES[market.nation];
  if (spec && spec.includes(goodId)) mult *= 0.8;
  return Math.floor(basePrice * mult);
}

// ===== TURN SYSTEM (月度回合制) =====
export const TURN_SYSTEM = {
  months: ['正月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
  seasons: ['春','春','春','夏','夏','夏','秋','秋','秋','冬','冬','冬'],
  seasonEffects: {
    '春': { foodBonus: 1.3, desc: '春耕时节，粮食+30%' },
    '夏': { foodBonus: 1.0, tradeBonus: 1.1, desc: '商贸旺季，商业+10%' },
    '秋': { foodBonus: 1.5, desc: '秋收时节，粮食+50%' },
    '冬': { foodBonus: 0.6, militaryBonus: 0.8, desc: '寒冬，粮食-40%，军耗+20%' },
  },
  getMonthInfo(turn) {
    const year = Math.floor((turn - 1) / 12) + 1;
    const month = (turn - 1) % 12;
    const season = this.seasons[month];
    return { turn, year, month, monthName: this.months[month], season, effect: this.seasonEffects[season] };
  },
  refreshMarketSupply(market) {
    const r = {};
    Object.entries(market.supply).forEach(([g, d]) => {
      r[g] = { ...d, current: d.base <= 0 ? 0 : Math.floor(d.base * (0.7 + Math.random() * 0.6)) };
    });
    return r;
  },
};

// ===== PRODUCTION CHAIN =====
export const PRODUCTION_CHAIN = {
  agriculture: {
    levelBonus: { 1: 1.0, 2: 1.3, 3: 1.6, 4: 2.0, 5: 2.5 },
  },
  commerce: {
    levelBonus: { 1: 1.0, 2: 1.3, 3: 1.6, 4: 2.0, 5: 2.5 },
  },
  population: {
    growthRate: { 1: 0.005, 2: 0.008, 3: 0.012, 4: 0.015, 5: 0.020 },
    maxPopulation: { 1: 500, 2: 2000, 3: 5000, 4: 15000, 5: 30000 },
  },
  military: {
    foodConsumption: 0.1,
    goldConsumption: 0.05,
  },
};

// ===== OFFICIAL SYSTEM (文官系统) =====
export const OFFICIAL_SYSTEM = {
  stats: {
    administration: { name: '行政', icon: '📜' },
    economy:        { name: '经济', icon: '💰' },
    agriculture:    { name: '农学', icon: '🌾' },
    diplomacy:      { name: '外交', icon: '🤝' },
    intelligence:   { name: '智谋', icon: '🧠' },
  },
  ranks: [
    { name: '小吏', minLevel: 1, bonus: 0, maxProjects: 1 },
    { name: '书吏', minLevel: 3, bonus: 0.05, maxProjects: 2 },
    { name: '主簿', minLevel: 5, bonus: 0.10, maxProjects: 3 },
    { name: '长史', minLevel: 8, bonus: 0.15, maxProjects: 4 },
    { name: '别驾', minLevel: 12, bonus: 0.20, maxProjects: 5 },
    { name: '军师', minLevel: 15, bonus: 0.30, maxProjects: 6 },
    { name: '丞相', minLevel: 20, bonus: 0.40, maxProjects: 8 },
  ],
  createOfficial(name, gender, source) {
    const stats = {};
    Object.keys(this.stats).forEach(key => {
      stats[key] = Math.floor(Math.random() * 70) + 30;
    });
    return {
      id: `off_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      name, gender, source, type: 'official',
      level: 1, exp: 0, stats,
      loyalty: 70 + Math.floor(Math.random() * 20),
      rank: this.ranks[0], assignedTask: null,
    };
  },
};

// ===== GENERAL RECRUITMENT =====
export const GENERAL_RECRUITMENT = {
  cityHire: { cost: { gold: 500 }, cooldown: 3 },
  slaveTraining: {
    fromConcubine: { cost: { gold: 500, food: 100 }, turns: 30, result: 'femaleGeneral' },
    fromArtisan:   { cost: { gold: 400, food: 100 }, turns: 25, result: 'maleGeneral' },
    fromWarrior:   { cost: { gold: 350, food: 80 },  turns: 20, result: 'maleGeneral' },
  },
  captureSurrender: { chance: 0.3, loyaltyBase: 40 },
};

// ===== MONTHLY SETTLEMENT =====
export const MONTHLY_SETTLEMENT = {
  execute(state) {
    const info = TURN_SYSTEM.getMonthInfo(state.turn);
    const se = info.effect;
    const res = { turnInfo: info, production: {}, consumption: {}, events: [], population: {} };

    // 1. Agriculture
    const farmSlaves = state.slaves.assigned.labor_farm || 0;
    let foodProd = farmSlaves * 2 + (state.cityStats.food_production || 0);
    foodProd = Math.floor(foodProd * (se.foodBonus || 1.0) * (PRODUCTION_CHAIN.agriculture.levelBonus[state.nationLevel] || 1.0));
    state.resources.food += foodProd;
    res.production.food = foodProd;

    // 2. Industry
    const mineSlaves = state.slaves.assigned.labor_mine || 0;
    const woodSlaves = state.slaves.assigned.labor_wood || 0;
    state.resources.ore += mineSlaves;
    state.resources.wood += woodSlaves;
    res.production.ore = mineSlaves;
    res.production.wood = woodSlaves;

    // Forge: ore → iron
    if (state.cityProjects.forge_1) {
      const conv = Math.min(state.resources.ore, 4);
      state.resources.ore -= conv;
      state.resources.iron += Math.floor(conv / 2);
      res.production.iron = Math.floor(conv / 2);
    }

    // 3. Commerce
    const merchants = state.citizens.assigned.merchant || 0;
    let goldProd = merchants * 10 + (state.cityStats.gold_production || 0);
    const tradeBonus = se.tradeBonus || 1.0;
    const commBonus = PRODUCTION_CHAIN.commerce.levelBonus[state.nationLevel] || 1.0;
    goldProd = Math.floor(goldProd * tradeBonus * commBonus);
    if ((state.citizens.inventory.femaleMerchant || 0) > 0) goldProd = Math.floor(goldProd * 1.3);
    // Official economy bonus
    (state.officials || []).forEach(o => {
      if (o.assignedTask === 'commerce') goldProd = Math.floor(goldProd * (1 + (o.stats.economy || 0) * 0.005));
    });
    state.player.gold += goldProd;
    res.production.gold = goldProd;

    // 4. Military consumption
    const army = state.totalArmy;
    const winterPen = se.militaryBonus ? (2 - se.militaryBonus) : 1.0;
    const foodCost = Math.floor(army * PRODUCTION_CHAIN.military.foodConsumption * winterPen);
    const goldCost = Math.floor(army * PRODUCTION_CHAIN.military.goldConsumption * winterPen);
    state.resources.food -= foodCost;
    state.player.gold -= goldCost;
    res.consumption.food = foodCost;
    res.consumption.gold = goldCost;

    // 5. Population growth
    const gr = PRODUCTION_CHAIN.population.growthRate[state.nationLevel] || 0.005;
    const maxPop = PRODUCTION_CHAIN.population.maxPopulation[state.nationLevel] || 500;
    if (state.tribe.population < maxPop && state.resources.food > 50) {
      const growth = Math.floor(state.tribe.population * gr);
      state.tribe.population = Math.min(maxPop, state.tribe.population + growth);
      res.population.growth = growth;
    }

    // 6. Entertainment
    const ent = state.slaves.assigned.entertainment || 0;
    if (ent > 0) {
      const entGold = ent * 5;
      state.player.gold += entGold;
      res.production.entertainmentGold = entGold;
    }

    // 7. Tax
    if (state.unlockedAbilities.includes('taxation')) {
      const tax = Math.floor(state.tribe.population * 0.1);
      state.player.gold += tax;
      res.production.tax = tax;
    }

    // 8. Controlled tribes income
    state.controlledTribes.forEach(() => { state.resources.food += 5; state.player.gold += 3; });

    // 9. Trade routes
    const trBonus = commBonus;
    state.tradeRoutes.forEach(t => { state.player.gold += Math.floor((t.income || 10) * trBonus); });

    // 10. General EXP
    (state.generals || []).forEach(g => {
      g.exp += 10;
      const needed = g.level * 100;
      if (g.exp >= needed) {
        g.level++; g.exp -= needed;
        const ranks = [
          { name: '伍长', minLevel: 1, maxTroops: 200 },
          { name: '什长', minLevel: 3, maxTroops: 500 },
          { name: '百夫长', minLevel: 5, maxTroops: 1000 },
          { name: '千夫长', minLevel: 8, maxTroops: 2000 },
          { name: '将军', minLevel: 12, maxTroops: 5000 },
          { name: '大将军', minLevel: 18, maxTroops: 10000 },
        ];
        for (let i = ranks.length - 1; i >= 0; i--) {
          if (g.level >= ranks[i].minLevel) { g.rank = ranks[i]; break; }
        }
        const sk = Object.keys(g.stats);
        g.stats[sk[Math.floor(Math.random() * sk.length)]] += 2;
      }
    });

    // 11. Official EXP
    (state.officials || []).forEach(o => {
      o.exp += 8;
      const needed = o.level * 80;
      if (o.exp >= needed) {
        o.level++; o.exp -= needed;
        for (let i = OFFICIAL_SYSTEM.ranks.length - 1; i >= 0; i--) {
          if (o.level >= OFFICIAL_SYSTEM.ranks[i].minLevel) { o.rank = OFFICIAL_SYSTEM.ranks[i]; break; }
        }
        const sk = Object.keys(o.stats);
        o.stats[sk[Math.floor(Math.random() * sk.length)]] += 2;
      }
    });

    // 12. Slave training completion
    state.slaves.training = (state.slaves.training || []).filter(t => {
      t.turnsLeft--;
      if (t.turnsLeft <= 0) {
        if (t.resultCategory === 'citizens') {
          state.citizens.inventory[t.result] = (state.citizens.inventory[t.result] || 0) + 1;
          state.citizens.total++;
        } else if (t.resultCategory === 'army') {
          if (t.result === 'eliteSoldier') state.army.infantry += 10;
        }
        return false;
      }
      return true;
    });

    // 13. Triggered events
    if (state.checkAndTriggerEvents) {
      res.events = state.checkAndTriggerEvents();
    }

    return res;
  },
};