/**
 * Quest & Progression System v1 - 任务与进度系统
 * 
 * 游戏流程:
 * 1. 选择城邦 → 触发城邦基础事件 → 获取管理权
 * 2. 触发周边部落事件 → 完成解锁能力（奴隶买卖、农业、商业、税收等）
 * 3. 城市发展 → 触发事件解锁外交、战争等能力
 * 4. 攻城略地：先完成敌对势力50%+部落任务 → 触发敌对城邦事件 → 攻占/掠夺/外交
 */

// ===== ABILITY SYSTEM (能力解锁系统) =====
// 玩家初始没有任何能力，必须通过完成任务逐步解锁
export const ABILITIES = {
  // === 基础能力（城邦基础事件解锁）===
  city_management: {
    id: 'city_management', name: '城邦管理', icon: '🏰',
    desc: '获得城邦管理权，可查看城邦信息',
    phase: 'capital', category: 'basic',
  },
  basic_resources: {
    id: 'basic_resources', name: '资源采集', icon: '⛏️',
    desc: '可采集基础资源（木材、矿石）',
    phase: 'capital', category: 'basic',
  },
  population_management: {
    id: 'population_management', name: '人口管理', icon: '👥',
    desc: '可管理人口和劳动力',
    phase: 'capital', category: 'basic',
  },

  // === 部落事件解锁的能力 ===
  slave_trade: {
    id: 'slave_trade', name: '奴隶买卖', icon: '⛓️',
    desc: '可在奴隶市场买卖奴隶',
    phase: 'tribe', category: 'economy',
    requiredTribeQuests: 1,
  },
  slave_labor: {
    id: 'slave_labor', name: '奴隶劳作', icon: '🔨',
    desc: '可分配奴隶进行农业、采矿、伐木',
    phase: 'tribe', category: 'economy',
    requiredTribeQuests: 1,
  },
  agriculture: {
    id: 'agriculture', name: '农业生产', icon: '🌾',
    desc: '可建设农场，生产粮食',
    phase: 'tribe', category: 'economy',
    requiredTribeQuests: 2,
  },
  commerce: {
    id: 'commerce', name: '商业贸易', icon: '💰',
    desc: '可建设市场，进行贸易',
    phase: 'tribe', category: 'economy',
    requiredTribeQuests: 2,
  },
  taxation: {
    id: 'taxation', name: '税收系统', icon: '📜',
    desc: '可向领地征税，获得稳定收入',
    phase: 'tribe', category: 'economy',
    requiredTribeQuests: 3,
  },
  slave_training: {
    id: 'slave_training', name: '奴隶培训', icon: '📚',
    desc: '可将奴隶培训为公民或武将',
    phase: 'tribe', category: 'economy',
    requiredTribeQuests: 3,
  },
  horse_ranch: {
    id: 'horse_ranch', name: '马场建设', icon: '🐎',
    desc: '可建设马场，饲养马匹和骆驼',
    phase: 'tribe', category: 'military',
    requiredTribeQuests: 2,
  },
  weapon_forge: {
    id: 'weapon_forge', name: '兵器锻造', icon: '⚔️',
    desc: '可锻造刀剑、弓箭等兵器',
    phase: 'tribe', category: 'military',
    requiredTribeQuests: 3,
  },

  // === 城市发展解锁的能力 ===
  diplomacy: {
    id: 'diplomacy', name: '外交系统', icon: '🤝',
    desc: '可与他国进行外交（结盟、联姻、赠礼）',
    phase: 'development', category: 'diplomacy',
    requiredCityLevel: 2,
  },
  war_declaration: {
    id: 'war_declaration', name: '宣战能力', icon: '⚔️',
    desc: '可向他国宣战',
    phase: 'development', category: 'military',
    requiredCityLevel: 3,
  },
  recruit_soldiers: {
    id: 'recruit_soldiers', name: '征兵系统', icon: '🗡️',
    desc: '可从公民中征召士兵',
    phase: 'development', category: 'military',
    requiredCityLevel: 2,
  },
  city_upgrade: {
    id: 'city_upgrade', name: '城市升级', icon: '📈',
    desc: '可将城市升级至更高等级',
    phase: 'development', category: 'development',
    requiredCityLevel: 1,
  },
  tech_research: {
    id: 'tech_research', name: '科技研发', icon: '🔬',
    desc: '可研发科技，提升兵器、农业、商业',
    phase: 'development', category: 'development',
    requiredCityLevel: 2,
  },
  trade_routes: {
    id: 'trade_routes', name: '商路开辟', icon: '🐫',
    desc: '可开辟远程商路，获得高额利润',
    phase: 'development', category: 'economy',
    requiredCityLevel: 3,
  },
  spy_network: {
    id: 'spy_network', name: '谍报系统', icon: '🕵️',
    desc: '可派遣密探刺探情报',
    phase: 'development', category: 'military',
    requiredCityLevel: 3,
  },
};

// ===== GAME PHASES (游戏阶段) =====
export const GAME_PHASES = {
  nation_select: {
    id: 'nation_select', name: '选择城邦', icon: '🗺️',
    desc: '选择你的起始城邦国家',
    order: 0,
  },
  capital_quest: {
    id: 'capital_quest', name: '城邦初立', icon: '🏰',
    desc: '完成城邦基础事件，获取管理权',
    order: 1,
    unlocksOn: 'nation_select',
  },
  tribe_quests: {
    id: 'tribe_quests', name: '部落征途', icon: '⛺',
    desc: '完成周边部落事件，解锁各种能力',
    order: 2,
    unlocksOn: 'capital_quest',
  },
  city_development: {
    id: 'city_development', name: '城市发展', icon: '📈',
    desc: '发展城市，提升等级，解锁高级能力',
    order: 3,
    unlocksOn: 'tribe_quests',
  },
  expansion: {
    id: 'expansion', name: '扩张征伐', icon: '⚔️',
    desc: '攻城略地，统一西域',
    order: 4,
    unlocksOn: 'city_development',
  },
};

// ===== TRIBE QUEST DEFINITIONS (部落任务定义) =====
// 每个部落有1-2个独特任务，完成后解锁能力
export function generateTribeQuests(tribe) {
  const nation = tribe.nation;
  const isFemale = tribe.female;
  const quests = [];

  // 基础任务1：资源获取任务
  quests.push({
    id: `tq_${tribe.id}_1`,
    tribeId: tribe.id,
    name: `${tribe.name}的考验`,
    desc: `完成${tribe.name}的考验任务，获得他们的信任和资源。`,
    type: 'tribe_basic',
    nation: nation,
    difficulty: tribe.troops > 100 ? 'hard' : tribe.troops > 50 ? 'medium' : 'easy',
    requirements: {
      minTurn: 3,
      nearTribe: true,
    },
    objectives: [
      { type: 'pay_gold', amount: Math.floor(50 + tribe.pop * 0.1), desc: '支付金币' },
      { type: 'pay_food', amount: Math.floor(20 + tribe.pop * 0.05), desc: '提供粮食' },
    ],
    rewards: {
      relation: 20,
      resources: tribe.res,
      unlockAbility: _getTribeQuest1Ability(tribe),
    },
    lore: `${tribe.name}是${nation}势力范围内的${isFemale ? '女性' : ''}部落，控制着丰富的资源。`,
  });

  // 进阶任务2：深度合作任务
  if (tribe.troops >= 30) {
    quests.push({
      id: `tq_${tribe.id}_2`,
      tribeId: tribe.id,
      name: `${tribe.name}的盟约`,
      desc: `与${tribe.name}建立深度合作关系，解锁更多能力。`,
      type: 'tribe_advanced',
      nation: nation,
      difficulty: 'medium',
      requirements: {
        minTurn: 10,
        completedQuest: `tq_${tribe.id}_1`,
        nearTribe: true,
      },
      objectives: [
        { type: 'pay_gold', amount: Math.floor(100 + tribe.pop * 0.15), desc: '支付金币' },
        { type: 'pay_resource', resource: _getPreferredResource(tribe), amount: 10, desc: '提供资源' },
        { type: 'military_strength', minTroops: 20, desc: '展示军力' },
      ],
      rewards: {
        relation: 30,
        slaves: isFemale
          ? { femaleLaborer: 3, dancer: 1 }
          : { maleLaborer: 3, warrior: 1 },
        unlockAbility: _getTribeQuest2Ability(tribe),
        controlTribe: true,
      },
      lore: `与${tribe.name}的深度合作将带来丰厚的回报。`,
    });
  }

  return quests;
}

// 根据部落特征决定任务1解锁的能力
function _getTribeQuest1Ability(tribe) {
  const resKeys = Object.keys(tribe.res);
  if (resKeys.includes('iron') || resKeys.includes('ore')) return 'basic_resources';
  if (resKeys.includes('food') || resKeys.includes('fish')) return 'agriculture';
  if (resKeys.includes('silk') || resKeys.includes('spice')) return 'commerce';
  if (resKeys.includes('horse')) return 'horse_ranch';
  return 'slave_trade';
}

// 根据部落特征决定任务2解锁的能力
function _getTribeQuest2Ability(tribe) {
  const resKeys = Object.keys(tribe.res);
  if (resKeys.includes('horse')) return 'weapon_forge';
  if (resKeys.includes('iron') || resKeys.includes('ore')) return 'slave_training';
  if (resKeys.includes('silk') || resKeys.includes('gold')) return 'taxation';
  return 'slave_labor';
}

function _getPreferredResource(tribe) {
  const resKeys = Object.keys(tribe.res);
  if (resKeys.includes('iron')) return 'iron';
  if (resKeys.includes('horse')) return 'horse';
  if (resKeys.includes('jade')) return 'jade';
  if (resKeys.includes('silk')) return 'silk';
  return resKeys[0] || 'food';
}

// ===== CAPITAL QUEST DEFINITIONS (城邦基础事件) =====
// 选择城邦后触发的初始任务链
export function generateCapitalQuests(nationId, nation) {
  return [
    {
      id: `cq_${nationId}_1`,
      nationId: nationId,
      name: `${nation.name}的召唤`,
      desc: `你来到了${nation.name}，城邦长老向你提出了考验...`,
      type: 'capital_basic',
      phase: 'capital_quest',
      requirements: { minTurn: 1 },
      objectives: [
        { type: 'pay_gold', amount: 100, desc: '向城邦进贡100金' },
      ],
      rewards: {
        unlockAbility: 'city_management',
        relation: 10,
        gold: 50,
        food: 100,
      },
      lore: nation.lore,
      choices: [
        {
          text: '接受考验',
          outcome: 'accept',
          desc: '向城邦长老展示你的诚意',
        },
        {
          text: '提出条件',
          outcome: 'negotiate',
          desc: '与城邦长老讨价还价',
          requireStat: { charisma: 12 },
          bonusReward: { gold: 100 },
        },
      ],
    },
    {
      id: `cq_${nationId}_2`,
      nationId: nationId,
      name: `${nation.name}的管理权`,
      desc: `通过考验后，城邦长老授予你初步管理权。你需要证明自己的能力。`,
      type: 'capital_advanced',
      phase: 'capital_quest',
      requirements: {
        minTurn: 3,
        completedQuest: `cq_${nationId}_1`,
      },
      objectives: [
        { type: 'pay_gold', amount: 200, desc: '投资城邦建设' },
        { type: 'pay_food', amount: 100, desc: '储备粮食' },
      ],
      rewards: {
        unlockAbility: 'basic_resources',
        unlockAbility2: 'population_management',
        relation: 20,
        citizens: { maleCitizen: 5, femaleCitizen: 5 },
        slaves: { maleLaborer: 5, femaleLaborer: 5 },
      },
      lore: `获得${nation.name}的管理权后，你开始了真正的征程。`,
      onComplete: 'unlock_tribe_quests', // 解锁部落任务阶段
    },
  ];
}

// ===== ENEMY NATION QUEST PREREQUISITES (攻城前置条件) =====
// 攻击一个城邦前必须完成其50%以上的部落任务
export function canAttackNation(nationId, state, tribes) {
  // 获取该城邦的所有部落
  const nationTribes = tribes.filter(t => t.nation === nationId);
  if (nationTribes.length === 0) return { canAttack: true, reason: '无附属部落' };

  // 计算已完成的部落任务数
  const totalTribeQuests = nationTribes.length;
  const completedCount = nationTribes.filter(t =>
    state.completedQuests.includes(`tq_${t.id}_1`)
  ).length;

  const required = Math.ceil(totalTribeQuests * 0.5);
  const canAttack = completedCount >= required;

  return {
    canAttack,
    completed: completedCount,
    required,
    total: totalTribeQuests,
    reason: canAttack
      ? `已完成${completedCount}/${totalTribeQuests}个部落任务，可以进攻！`
      : `需完成至少${required}个部落任务（当前${completedCount}/${totalTribeQuests}）`,
  };
}

// ===== CITY DEVELOPMENT SYSTEM (城市发展系统) =====
// 城市发展需要特定资源，影响人口/科技/农业/商业
export const CITY_DEVELOPMENT = {
  // 发展项目定义
  projects: {
    // === 农业项目 ===
    farm_1: {
      id: 'farm_1', name: '基础农田', icon: '🌾', category: 'agriculture',
      desc: '开垦基础农田，增加粮食产量',
      cost: { gold: 100, wood: 30, labor: 5 },
      effect: { food_production: 20 },
      requireAbility: 'agriculture',
      requireCityLevel: 1,
    },
    farm_2: {
      id: 'farm_2', name: '灌溉水渠', icon: '💧', category: 'agriculture',
      desc: '修建灌溉水渠，大幅提升粮食产量',
      cost: { gold: 300, wood: 50, stone: 30, labor: 10 },
      effect: { food_production: 50 },
      requireAbility: 'agriculture',
      requireCityLevel: 2,
    },
    farm_3: {
      id: 'farm_3', name: '精耕细作', icon: '🌿', category: 'agriculture',
      desc: '引入先进农耕技术',
      cost: { gold: 500, stone: 50, labor: 15 },
      effect: { food_production: 80, tech_bonus: 5 },
      requireAbility: 'tech_research',
      requireCityLevel: 3,
    },
    // === 商业项目 ===
    market_1: {
      id: 'market_1', name: '集市', icon: '🏪', category: 'commerce',
      desc: '建设集市，增加商业收入',
      cost: { gold: 150, wood: 20, labor: 5 },
      effect: { gold_production: 30 },
      requireAbility: 'commerce',
      requireCityLevel: 1,
    },
    market_2: {
      id: 'market_2', name: '商队驿站', icon: '🐫', category: 'commerce',
      desc: '建设商队驿站，吸引远方商人',
      cost: { gold: 400, wood: 40, stone: 20, labor: 10 },
      effect: { gold_production: 60, trade_bonus: 10 },
      requireAbility: 'commerce',
      requireCityLevel: 2,
    },
    market_3: {
      id: 'market_3', name: '丝路商站', icon: '💰', category: 'commerce',
      desc: '建设丝绸之路商站，获得高额利润',
      cost: { gold: 800, stone: 50, silk: 20, labor: 15 },
      effect: { gold_production: 120, trade_bonus: 25 },
      requireAbility: 'trade_routes',
      requireCityLevel: 3,
    },
    // === 军事项目 ===
    barracks_1: {
      id: 'barracks_1', name: '民兵营', icon: '⚔️', category: 'military',
      desc: '建设民兵训练营',
      cost: { gold: 200, wood: 40, stone: 20, labor: 8 },
      effect: { recruit_capacity: 20 },
      requireAbility: 'recruit_soldiers',
      requireCityLevel: 2,
    },
    barracks_2: {
      id: 'barracks_2', name: '精锐兵营', icon: '🗡️', category: 'military',
      desc: '建设精锐士兵训练营',
      cost: { gold: 500, stone: 60, iron: 30, labor: 15 },
      effect: { recruit_capacity: 50, troop_quality: 10 },
      requireAbility: 'weapon_forge',
      requireCityLevel: 3,
    },
    stable_1: {
      id: 'stable_1', name: '马场', icon: '🐎', category: 'military',
      desc: '建设马场，可训练骑兵',
      cost: { gold: 300, wood: 30, labor: 8 },
      effect: { cavalry_capacity: 20 },
      requireAbility: 'horse_ranch',
      requireCityLevel: 2,
    },
    stable_2: {
      id: 'stable_2', name: '骆驼厩', icon: '🐫', category: 'military',
      desc: '建设骆驼厩，可训练骆驼兵',
      cost: { gold: 250, wood: 25, labor: 5 },
      effect: { camel_capacity: 15 },
      requireAbility: 'horse_ranch',
      requireCityLevel: 2,
    },
    forge_1: {
      id: 'forge_1', name: '铁匠铺', icon: '⚒️', category: 'military',
      desc: '建设铁匠铺，锻造兵器',
      cost: { gold: 200, stone: 30, iron: 20, labor: 8 },
      effect: { weapon_production: 10 },
      requireAbility: 'weapon_forge',
      requireCityLevel: 2,
    },
    forge_2: {
      id: 'forge_2', name: '兵器坊', icon: '⚔️', category: 'military',
      desc: '建设高级兵器坊',
      cost: { gold: 600, stone: 50, iron: 50, labor: 15 },
      effect: { weapon_production: 25, tech_bonus: 10 },
      requireAbility: 'weapon_forge',
      requireCityLevel: 3,
    },
    // === 科技项目 ===
    academy_1: {
      id: 'academy_1', name: '学堂', icon: '📚', category: 'tech',
      desc: '建设学堂，研发科技',
      cost: { gold: 300, wood: 30, stone: 20, labor: 10 },
      effect: { tech_production: 10 },
      requireAbility: 'tech_research',
      requireCityLevel: 2,
    },
    academy_2: {
      id: 'academy_2', name: '研究院', icon: '🔬', category: 'tech',
      desc: '建设研究院，加速科技研发',
      cost: { gold: 800, stone: 60, labor: 20 },
      effect: { tech_production: 25 },
      requireAbility: 'tech_research',
      requireCityLevel: 3,
    },
    // === 人口项目 ===
    housing_1: {
      id: 'housing_1', name: '民居', icon: '🏠', category: 'population',
      desc: '建设民居，增加人口容量',
      cost: { gold: 100, wood: 30, labor: 5 },
      effect: { max_population: 100 },
      requireAbility: 'population_management',
      requireCityLevel: 1,
    },
    housing_2: {
      id: 'housing_2', name: '坊市', icon: '🏘️', category: 'population',
      desc: '建设坊市，大幅增加人口容量',
      cost: { gold: 300, wood: 50, stone: 30, labor: 10 },
      effect: { max_population: 300 },
      requireAbility: 'population_management',
      requireCityLevel: 2,
    },
  },

  // 城市等级对各项指标的影响
  cityLevelEffects: {
    1: {
      name: '村落', maxPopulation: 500,
      agriculture: 1.0, commerce: 1.0, tech: 1.0, military: 1.0,
      desc: '小型聚落，基础功能',
    },
    2: {
      name: '镇集', maxPopulation: 2000,
      agriculture: 1.3, commerce: 1.3, tech: 1.2, military: 1.2,
      desc: '发展中的集镇，解锁外交和征兵',
    },
    3: {
      name: '城邦', maxPopulation: 5000,
      agriculture: 1.6, commerce: 1.6, tech: 1.5, military: 1.5,
      desc: '成熟城邦，解锁宣战和商路',
    },
    4: {
      name: '大都', maxPopulation: 15000,
      agriculture: 2.0, commerce: 2.0, tech: 2.0, military: 2.0,
      desc: '繁荣大城，全面加成',
    },
    5: {
      name: '王都', maxPopulation: 30000,
      agriculture: 2.5, commerce: 2.5, tech: 2.5, military: 2.5,
      desc: '西域最强盛的王都',
    },
  },
};

// ===== RECRUITMENT COSTS (征兵消耗) =====
// 人口 + 对应兵装 → 特定兵种
export const RECRUITMENT_COSTS = {
  infantry: {
    id: 'infantry', name: '步兵', icon: '⚔️',
    cost: { maleCitizen: 1, gold: 15, food: 5, iron: 2 },
    desc: '1男公民 + 金币 + 粮食 + 铁矿 → 步兵',
    requireAbility: 'recruit_soldiers',
    requireProject: 'barracks_1',
  },
  cavalry: {
    id: 'cavalry', name: '骑兵', icon: '🐎',
    cost: { maleCitizen: 1, gold: 30, food: 8, horse: 1 },
    desc: '1男公民 + 金币 + 粮食 + 马匹 → 骑兵',
    requireAbility: 'recruit_soldiers',
    requireProject: 'stable_1',
  },
  archerCav: {
    id: 'archerCav', name: '弓骑兵', icon: '🏹',
    cost: { maleCitizen: 1, gold: 25, food: 6, horse: 1, iron: 3 },
    desc: '1男公民 + 金币 + 粮食 + 马匹 + 铁矿 → 弓骑兵',
    requireAbility: 'recruit_soldiers',
    requireProject: 'stable_1',
  },
  camel: {
    id: 'camel', name: '骆驼兵', icon: '🐫',
    cost: { maleCitizen: 1, gold: 25, food: 6, camel: 1 },
    desc: '1男公民 + 金币 + 粮食 + 骆驼 → 骆驼兵',
    requireAbility: 'recruit_soldiers',
    requireProject: 'stable_2',
  },
  femaleInfantry: {
    id: 'femaleInfantry', name: '女步兵', icon: '🗡️',
    cost: { femaleCitizen: 1, gold: 18, food: 5, iron: 2 },
    desc: '1女公民 + 金币 + 粮食 + 铁矿 → 女步兵',
    requireAbility: 'recruit_soldiers',
    requireProject: 'barracks_1',
  },
  femaleCavalry: {
    id: 'femaleCavalry', name: '女骑兵', icon: '🏇',
    cost: { femaleCitizen: 1, gold: 35, food: 8, horse: 1 },
    desc: '1女公民 + 金币 + 粮食 + 马匹 → 女骑兵',
    requireAbility: 'recruit_soldiers',
    requireProject: 'stable_1',
  },
  femaleArcherCav: {
    id: 'femaleArcherCav', name: '女弓骑兵', icon: '🏹‍♀️',
    cost: { femaleCitizen: 1, gold: 30, food: 7, horse: 1, iron: 3 },
    desc: '1女公民 + 金币 + 粮食 + 马匹 + 铁矿 → 女弓骑兵',
    requireAbility: 'recruit_soldiers',
    requireProject: 'stable_1',
  },
};

// ===== HELPER FUNCTIONS =====

// 获取当前可用的任务列表
export function getAvailableQuests(state, tribes) {
  const available = [];
  const phase = state.gamePhase;

  // 城邦任务
  if (phase === 'capital_quest' && state.player.currentNation) {
    const nationId = state.player.currentNation;
    const nation = state.nationsData?.[nationId];
    if (nation) {
      const capQuests = generateCapitalQuests(nationId, nation);
      capQuests.forEach(q => {
        if (!state.completedQuests.includes(q.id) && !state.activeQuests.includes(q.id)) {
          if (_checkRequirements(q.requirements, state)) {
            available.push(q);
          }
        }
      });
    }
  }

  // 部落任务
  if (phase === 'tribe_quests' || phase === 'city_development' || phase === 'expansion') {
    // 获取玩家势力范围内的部落
    const nearbyTribes = _getNearbyTribes(state, tribes);
    nearbyTribes.forEach(tribe => {
      const tribeQuests = generateTribeQuests(tribe);
      tribeQuests.forEach(q => {
        if (!state.completedQuests.includes(q.id) && !state.activeQuests.includes(q.id)) {
          if (_checkRequirements(q.requirements, state)) {
            available.push(q);
          }
        }
      });
    });
  }

  return available;
}

// 检查任务需求
function _checkRequirements(requirements, state) {
  if (!requirements) return true;
  if (requirements.minTurn && state.turn < requirements.minTurn) return false;
  if (requirements.completedQuest && !state.completedQuests.includes(requirements.completedQuest)) return false;
  if (requirements.nearTribe && !state.unlockedAbilities.includes('city_management')) return false;
  return true;
}

// 获取玩家附近的部落
function _getNearbyTribes(state, tribes) {
  if (!tribes) return [];
  const px = state.player.location.x;
  const py = state.player.location.y;
  const range = 15 + state.nationLevel * 5; // 势力范围随等级扩大
  return tribes.filter(t => {
    const dx = Math.abs(t.x - px);
    const dy = Math.abs(t.y - py);
    return (dx + dy) <= range;
  });
}

// 检查能力是否已解锁
export function hasAbility(state, abilityId) {
  return state.unlockedAbilities.includes(abilityId);
}

// 检查是否可以执行某个操作
export function canPerformAction(state, action) {
  const abilityMap = {
    'buy_slaves': 'slave_trade',
    'sell_slaves': 'slave_trade',
    'assign_slaves': 'slave_labor',
    'build_farm': 'agriculture',
    'build_market': 'commerce',
    'collect_tax': 'taxation',
    'train_slave': 'slave_training',
    'build_stable': 'horse_ranch',
    'build_forge': 'weapon_forge',
    'diplomacy': 'diplomacy',
    'declare_war': 'war_declaration',
    'recruit': 'recruit_soldiers',
    'upgrade_city': 'city_upgrade',
    'research_tech': 'tech_research',
    'trade_route': 'trade_routes',
    'spy': 'spy_network',
    'plunder': 'war_declaration',
    'attack_city': 'war_declaration',
  };

  const requiredAbility = abilityMap[action];
  if (!requiredAbility) return { canDo: true };
  if (!hasAbility(state, requiredAbility)) {
    return {
      canDo: false,
      reason: `需要先解锁「${ABILITIES[requiredAbility]?.name || requiredAbility}」能力`,
      requiredAbility,
    };
  }
  return { canDo: true };
}

// 获取当前游戏阶段
export function getCurrentPhase(state) {
  if (!state.player.currentNation) return 'nation_select';
  if (!state.completedQuests.some(q => q.startsWith('cq_'))) return 'capital_quest';

  const completedTribeQuests = state.completedQuests.filter(q => q.startsWith('tq_')).length;
  if (completedTribeQuests < 3) return 'tribe_quests';

  if (state.nationLevel < 2) return 'city_development';

  return 'expansion';
}

// 获取下一个建议任务
export function getNextObjective(state, tribes) {
  const phase = getCurrentPhase(state);

  switch (phase) {
    case 'nation_select':
      return { text: '请选择一个城邦国家开始游戏', icon: '🗺️' };
    case 'capital_quest':
      return { text: '完成城邦基础事件，获取管理权', icon: '🏰' };
    case 'tribe_quests': {
      const completed = state.completedQuests.filter(q => q.startsWith('tq_')).length;
      return { text: `完成周边部落事件（已完成${completed}个）`, icon: '⛺' };
    }
    case 'city_development':
      return { text: `发展城市至2级以解锁更多能力（当前${state.nationLevel}级）`, icon: '📈' };
    case 'expansion':
      return { text: '攻城略地，统一西域！', icon: '⚔️' };
    default:
      return { text: '探索西域世界', icon: '🌍' };
  }
}