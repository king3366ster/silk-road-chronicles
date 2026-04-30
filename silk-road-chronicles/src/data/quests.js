/**
 * 任务/剧情数据 - Quest & Story Data
 * Main storyline + side quests across all 36 nations
 */

export const QUEST_TYPES = {
  MAIN: 'main',       // 主线任务
  SIDE: 'side',       // 支线任务
  NATION: 'nation',   // 国家任务
  TRADE: 'trade',     // 商业任务
  MILITARY: 'military', // 军事任务
  DIPLOMACY: 'diplomacy', // 外交任务
  CULTURE: 'culture',  // 文化任务
  ROMANCE: 'romance'   // 情缘任务
};

export const MAIN_STORY = [
  {
    id: 'main_001',
    title: '丝路初行',
    description: '你是一个出身卑微的年轻人，在楼兰城外的商队中做杂役。一次偶然的机会，你发现了一块刻有古文的玉佩，从此踏上了改变命运的旅程。',
    chapter: 1,
    phase: 'politics',
    objectives: [
      { id: 'obj_1', text: '在楼兰城找到玉佩的主人', type: 'talk', target: 'char_special_002' },
      { id: 'obj_2', text: '完成一次商队护送任务', type: 'mission', target: 'escort_001' },
      { id: 'obj_3', text: '获得楼兰公主的信任', type: 'relation', target: 'char_special_002', value: 30 }
    ],
    rewards: { gold: 100, exp: 50, items: ['ancient_jade'] },
    nextQuest: 'main_002',
    cg: 'cg_chapter1_intro'
  },
  {
    id: 'main_002',
    title: '楼兰密谋',
    description: '楼兰朝堂之上暗流涌动，一场针对公主的阴谋正在酝酿。你必须帮助月牙儿公主揭露这个阴谋，赢得楼兰的信任。',
    chapter: 1,
    phase: 'politics',
    objectives: [
      { id: 'obj_1', text: '调查楼兰城中的可疑人物', type: 'investigate', target: 'loulan_city' },
      { id: 'obj_2', text: '收集三份密信证据', type: 'collect', target: 'secret_letters', value: 3 },
      { id: 'obj_3', text: '在朝堂上揭露阴谋', type: 'dialogue_choice', target: 'court_scene' }
    ],
    choices: [
      { text: '公开揭露阴谋，正面对抗', effect: { diplomacy: 10, military: -5 }, alignment: 'righteous' },
      { text: '暗中瓦解阴谋，不惊动他人', effect: { diplomacy: -5, economy: 10 }, alignment: 'cunning' }
    ],
    rewards: { gold: 200, exp: 100, title: '楼兰信使' },
    nextQuest: 'main_003',
    cg: 'cg_chapter1_court'
  },
  {
    id: 'main_003',
    title: '商路风云',
    description: '丝绸之路上的商队频频遭到袭击，你需要组建自己的商队，打通楼兰到龟兹的商路。',
    chapter: 2,
    phase: 'commerce',
    objectives: [
      { id: 'obj_1', text: '招募5名商队成员', type: 'recruit', value: 5 },
      { id: 'obj_2', text: '购买商队物资', type: 'purchase', target: 'trade_goods', value: 500 },
      { id: 'obj_3', text: '护送商队安全抵达龟兹', type: 'mission', target: 'trade_route_001' }
    ],
    rewards: { gold: 500, exp: 150, unlock: 'trade_system' },
    nextQuest: 'main_004',
    cg: 'cg_chapter2_trade'
  },
  {
    id: 'main_004',
    title: '龟兹乐章',
    description: '龟兹国正在举办盛大的乐舞大会，各国使者齐聚。这是一个建立人脉的绝佳机会，但也有人想借此机会制造混乱。',
    chapter: 2,
    phase: 'diplomacy',
    objectives: [
      { id: 'obj_1', text: '参加龟兹乐舞大会', type: 'event', target: 'kucha_festival' },
      { id: 'obj_2', text: '与三位以上国家使者建立关系', type: 'relation', value: 20, count: 3 },
      { id: 'obj_3', text: '阻止乐舞大会上的暗杀行动', type: 'mission', target: 'assassination_prevent' }
    ],
    choices: [
      { text: '以武力阻止暗杀', effect: { military: 15, diplomacy: -10 }, alignment: 'military' },
      { text: '以智谋化解危机', effect: { diplomacy: 15, culture: 5 }, alignment: 'diplomatic' }
    ],
    rewards: { gold: 300, exp: 200, title: '丝路使者' },
    nextQuest: 'main_005',
    cg: 'cg_chapter2_festival'
  },
  {
    id: 'main_005',
    title: '女战士的考验',
    description: '阿玛宗女战士部落向所有周边国家发出了挑战。你需要前往阿玛宗领地，通过她们的考验，赢得这个强大盟友。',
    chapter: 3,
    phase: 'military',
    objectives: [
      { id: 'obj_1', text: '前往阿玛宗领地', type: 'travel', target: 'amazons' },
      { id: 'obj_2', text: '通过骑射考验', type: 'mission', target: 'archery_test' },
      { id: 'obj_3', text: '在格斗中击败阿玛宗先锋', type: 'combat', target: 'char_special_017' },
      { id: 'obj_4', text: '获得阿玛宗女王的认可', type: 'relation', target: 'char_special_003', value: 50 }
    ],
    rewards: { gold: 200, exp: 300, unlock: 'amazon_alliance', troops: 500 },
    nextQuest: 'main_006',
    cg: 'cg_chapter3_amazon'
  },
  {
    id: 'main_006',
    title: '西梁奇遇',
    description: '误入西梁女国，你发现这个神秘的国度正面临着前所未有的危机。子母河的水源正在枯竭，你需要帮助西梁女王找到解决办法。',
    chapter: 3,
    phase: 'diplomacy',
    objectives: [
      { id: 'obj_1', text: '进入西梁女国', type: 'travel', target: 'xiliang' },
      { id: 'obj_2', text: '调查子母河枯竭的原因', type: 'investigate', target: 'zimu_river' },
      { id: 'obj_3', text: '寻找传说中的水源宝石', type: 'mission', target: 'water_gem' },
      { id: 'obj_4', text: '恢复子母河的水源', type: 'complete', target: 'restore_river' }
    ],
    rewards: { gold: 500, exp: 250, unlock: 'xiliang_alliance', items: ['water_gem'] },
    nextQuest: 'main_007',
    cg: 'cg_chapter3_xiliang'
  },
  {
    id: 'main_007',
    title: '玉石之战',
    description: '于阗国的玉石矿脉引发了各国争夺，一场大战一触即发。你必须在各方势力之间斡旋，或者选择一方支持。',
    chapter: 4,
    phase: 'military',
    objectives: [
      { id: 'obj_1', text: '了解各方对于阗玉石的诉求', type: 'investigate', target: 'jite_conflict' },
      { id: 'obj_2', text: '组建自己的军队（至少1000人）', type: 'recruit', value: 1000 },
      { id: 'obj_3', text: '选择阵营并参战', type: 'choice', target: 'faction_choice' }
    ],
    choices: [
      { text: '支持于阗，保卫玉石矿脉', effect: { military: 20, diplomacy: -10 }, alignment: 'defender' },
      { text: '联合多方，共同开发玉石', effect: { economy: 20, diplomacy: 10 }, alignment: 'negotiator' },
      { text: '趁机夺取玉石矿脉', effect: { economy: 30, diplomacy: -20 }, alignment: 'conqueror' }
    ],
    rewards: { gold: 1000, exp: 400, title: '玉石将军' },
    nextQuest: 'main_008',
    cg: 'cg_chapter4_jade_war'
  },
  {
    id: 'main_008',
    title: '精绝古城',
    description: '一张古老的地图指向了传说中的精绝古城遗址。据说那里埋藏着统一西域的关键秘密。',
    chapter: 5,
    phase: 'exploration',
    objectives: [
      { id: 'obj_1', text: '收集精绝古城的地图碎片', type: 'collect', target: 'map_fragments', value: 5 },
      { id: 'obj_2', text: '组建探险队', type: 'recruit', value: 10 },
      { id: 'obj_3', text: '穿越沙漠找到精绝古城', type: 'mission', target: 'niya_expedition' },
      { id: 'obj_4', text: '在古城中找到远古秘密', type: 'investigate', target: 'niya_ruins' }
    ],
    rewards: { gold: 2000, exp: 500, items: ['ancient_scepter', 'silk_road_map'], unlock: 'unification' },
    nextQuest: 'main_009',
    cg: 'cg_chapter5_niya'
  },
  {
    id: 'main_009',
    title: '群雄逐鹿',
    description: '西域各国之间的矛盾日益激化，是时候选择你的道路了——以武力统一，还是以外交联合？',
    chapter: 6,
    phase: 'unification',
    objectives: [
      { id: 'obj_1', text: '控制至少10个西域国家', type: 'control', value: 10 },
      { id: 'obj_2', text: '建立自己的势力', type: 'build', target: 'faction' },
      { id: 'obj_3', text: '击败三个敌对势力', type: 'combat', value: 3 }
    ],
    choices: [
      { text: '以武力征服天下', effect: { military: 30 }, alignment: 'conqueror', ending: 'military' },
      { text: '以商贸联合诸国', effect: { economy: 30 }, alignment: 'merchant', ending: 'trade' },
      { text: '以外交建立联盟', effect: { diplomacy: 30 }, alignment: 'diplomat', ending: 'alliance' }
    ],
    rewards: { exp: 1000, title: '西域之主' },
    nextQuest: 'main_010',
    cg: 'cg_chapter6_war'
  },
  {
    id: 'main_010',
    title: '丝路一统',
    description: '最终的决战来临。你将面对最强大的对手，决定西域的未来命运。',
    chapter: 7,
    phase: 'final',
    objectives: [
      { id: 'obj_1', text: '统一西域三十六国', type: 'control', value: 36 },
      { id: 'obj_2', text: '建立新的秩序', type: 'build', target: 'new_order' }
    ],
    rewards: { title: '丝路之王', ending: true },
    cg: 'cg_ending'
  }
];

export const SIDE_QUESTS = [
  {
    id: 'side_001', title: '失落的商队', type: 'trade',
    description: '一支粟特商队在沙漠中失踪了，帮助他们找到回家的路。',
    nation: 'soche', difficulty: 1,
    objectives: [{ text: '在沙漠中找到失踪的商队', type: 'mission' }],
    rewards: { gold: 200, relation: { soche: 10 } }
  },
  {
    id: 'side_002', title: '龟兹乐谱', type: 'culture',
    description: '帮助龟兹乐师找回失传的古乐谱。',
    nation: 'kucha', difficulty: 2,
    objectives: [{ text: '在石窟中寻找古乐谱', type: 'investigate' }],
    rewards: { exp: 100, items: ['ancient_score'], relation: { kucha: 15 } }
  },
  {
    id: 'side_003', title: '于阗玉雕大赛', type: 'culture',
    description: '参加于阗的玉雕大赛，展示你的才华。',
    nation: 'khotan', difficulty: 2,
    objectives: [{ text: '获得玉雕大赛冠军', type: 'mission' }],
    rewards: { gold: 500, items: ['master_jade'], relation: { khotan: 20 } }
  },
  {
    id: 'side_004', title: '汗血宝马', type: 'military',
    description: '帮助大宛国驯服一匹野生的汗血宝马。',
    nation: 'dayuan', difficulty: 3,
    objectives: [{ text: '驯服汗血宝马', type: 'mission' }],
    rewards: { items: ['heavenly_horse'], relation: { dayuan: 15 } }
  },
  {
    id: 'side_005', title: '女战士的挑战', type: 'military',
    description: '接受阿玛宗女战士的单挑挑战。',
    nation: 'amazons', difficulty: 4,
    objectives: [{ text: '击败阿玛宗挑战者', type: 'combat' }],
    rewards: { exp: 200, relation: { amazons: 25 } }
  },
  {
    id: 'side_006', title: '子母河的秘密', type: 'culture',
    description: '研究子母河水的神奇力量。',
    nation: 'xiliang', difficulty: 3,
    objectives: [{ text: '收集子母河水样', type: 'collect' }],
    rewards: { items: ['sacred_water'], relation: { xiliang: 20 } }
  },
  {
    id: 'side_007', title: '丝路护卫', type: 'trade',
    description: '护送一支重要商队从楼兰到疏勒。',
    nation: 'loulan', difficulty: 2,
    objectives: [{ text: '安全护送商队', type: 'mission' }],
    rewards: { gold: 300, exp: 100 }
  },
  {
    id: 'side_008', title: '沙漠盗匪', type: 'military',
    description: '清剿骚扰丝路商队的沙漠盗匪。',
    nation: 'shanshan', difficulty: 3,
    objectives: [{ text: '消灭盗匪窝点', type: 'combat' }],
    rewards: { gold: 400, relation: { shanshan: 15, loulan: 10 } }
  },
  {
    id: 'side_009', title: '乌孙和亲', type: 'diplomacy',
    description: '帮助安排乌孙与邻国的和亲之事。',
    nation: 'wusun', difficulty: 3,
    objectives: [{ text: '成功促成和亲', type: 'diplomacy' }],
    rewards: { exp: 200, relation: { wusun: 25 } }
  },
  {
    id: 'side_010', title: '精绝宝藏', type: 'exploration',
    description: '探索精绝古城的地下宫殿。',
    nation: 'niya', difficulty: 5,
    objectives: [{ text: '找到地下宫殿入口', type: 'investigate' }, { text: '获取宝藏', type: 'collect' }],
    rewards: { gold: 2000, items: ['ancient_crown'] }
  }
];

export const CG_DATA = {
  cg_chapter1_intro: { title: '丝路初行', description: '夕阳下的楼兰古城，商队缓缓驶入城门。', type: 'scene' },
  cg_chapter1_court: { title: '楼兰密谋', description: '金碧辉煌的楼兰王宫，朝堂上剑拔弩张。', type: 'scene' },
  cg_chapter2_trade: { title: '商路风云', description: '浩浩荡荡的商队穿越大漠。', type: 'scene' },
  cg_chapter2_festival: { title: '龟兹乐章', description: '龟兹乐舞大会，飞天舞者翩翩起舞。', type: 'scene' },
  cg_chapter3_amazon: { title: '女战士的考验', description: '阿玛宗女战士在天山草原上驰骋。', type: 'scene' },
  cg_chapter3_xiliang: { title: '西梁奇遇', description: '西梁女国的桃花林中，子母河静静流淌。', type: 'scene' },
  cg_chapter4_jade_war: { title: '玉石之战', description: '于阗玉矿前的激烈战斗。', type: 'battle' },
  cg_chapter5_niya: { title: '精绝古城', description: '黄沙掩埋的古城在月光下重现。', type: 'scene' },
  cg_chapter6_war: { title: '群雄逐鹿', description: '西域大战，万马奔腾。', type: 'battle' },
  cg_ending: { title: '丝路一统', description: '统一的西域，繁荣的丝绸之路。', type: 'scene' },
  cg_amazon_battle: { title: '阿玛宗之战', description: '女战士们冲锋陷阵。', type: 'battle' },
  cg_xiliang_palace: { title: '西梁王宫', description: '西梁女王的宫殿，珠帘绣幕。', type: 'scene' },
  cg_desert_sunset: { title: '大漠落日', description: '丝路上的壮美日落。', type: 'scene' },
  cg_oasis: { title: '绿洲月夜', description: '沙漠绿洲中的宁静月夜。', type: 'scene' },
  cg_market: { title: '丝路集市', description: '繁忙的东西方贸易集市。', type: 'scene' },
  cg_palace: { title: '王宫盛宴', description: '西域王宫中的盛大宴会。', type: 'scene' },
  cg_romance_1: { title: '月下之约', description: '月光下的秘密约会。', type: 'romance' },
  cg_romance_2: { title: '桃花林', description: '西梁女国的桃花林中。', type: 'romance' },
  cg_romance_3: { title: '战场重逢', description: '战场上的意外重逢。', type: 'romance' },
  cg_victory: { title: '凯旋', description: '胜利归来的盛大欢迎。', type: 'scene' }
};