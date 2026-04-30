/**
 * 西域36国数据 - Enhanced with special skills, difficulty, and major powers
 */

export const NATIONS = {
  // ======== 全女性国家 (All-Female Nations) - POWERFUL ========
  
  amazons: {
    id: 'amazons', name: '阿玛宗', nameEn: 'Amazon Warriors',
    description: '传说中的女战士之国。族中皆为女性，以勇武善战著称，骑射之术冠绝西域。',
    color: '#DC143C', emblem: '⚔️', terrain: 'mountain', isAllFemale: true,
    resources: { jade: 1, silk: 0, spice: 0, horse: 5, iron: 3, gold: 1 },
    military: 95, economy: 40, diplomacy: 30, culture: 60, population: 8000,
    ruler: 'char_amazon_001',
    capital: { x: 75, y: 25 },
    territory: [
      { x: 70, y: 20 }, { x: 75, y: 20 }, { x: 80, y: 20 },
      { x: 70, y: 25 }, { x: 75, y: 25 }, { x: 80, y: 25 },
      { x: 70, y: 30 }, { x: 75, y: 30 }
    ],
    speciality: '骑兵训练',
    skills: {
      military: { name: '战神之女', desc: '骑兵攻击+30%，训练速度x2', icon: '⚔️' },
      economy: { name: '以战养战', desc: '每场胜仗获得战利品翻倍', icon: '💰' },
      agriculture: { name: '游牧采集', desc: '山地食物产出+20%', icon: '🌿' },
      diplomacy: { name: '武斗招亲', desc: '可通过比武招亲联姻', icon: '💘' },
      population: { name: '收养制度', desc: '收养女婴增加人口', icon: '👶' }
    },
    lore: '阿玛宗族是西域最神秘的女战士部落。传说她们的祖先是一位被流放的女将军，带领追随者在天山深处建立了这个全女性的国度。她们通过与外族通婚或收养女婴来延续血脉，族中女子自幼习武，个个骁勇善战。',
    difficulty: 'hard', // 靠近会被征讨
    attitude: 'aggressive'
  },

  xiliang: {
    id: 'xiliang', name: '西梁女国', nameEn: 'Kingdom of Women',
    description: '西游记中记载的西梁女国。国中上至君王下至庶民皆为女子，子母河之水可令女子孕育。',
    color: '#FF69B4', emblem: '🌸', terrain: 'valley', isAllFemale: true,
    resources: { jade: 2, silk: 4, spice: 3, horse: 1, iron: 0, gold: 2 },
    military: 45, economy: 90, diplomacy: 85, culture: 95, population: 12000,
    ruler: 'char_xiliang_001',
    capital: { x: 15, y: 40 },
    territory: [
      { x: 10, y: 35 }, { x: 15, y: 35 }, { x: 20, y: 35 },
      { x: 10, y: 40 }, { x: 15, y: 40 }, { x: 20, y: 40 },
      { x: 10, y: 45 }, { x: 15, y: 45 }
    ],
    speciality: '纺织医术',
    skills: {
      military: { name: '女儿卫队', desc: '防御时士气+40', icon: '🛡️' },
      economy: { name: '天衣无缝', desc: '丝绸产出+50%，品质极高', icon: '🧵' },
      agriculture: { name: '百花种植', desc: '药草和花卉产出+40%', icon: '🌺' },
      diplomacy: { name: '以柔克刚', desc: '外交好感度获取x2', icon: '💕' },
      population: { name: '子母河', desc: '人口增长速度x3', icon: '🌊' }
    },
    lore: '西梁女国坐落在葱岭以西的隐秘山谷中，四周群山环绕，只有一条密道可通外界。国中子母河的水有神奇力量，饮之可令女子受孕。西梁女子擅长纺织，其丝绸被誉为"天衣"。',
    difficulty: 'easy', // 友善，会馈赠
    attitude: 'friendly'
  },

  // ======== 主要大国 ========
  
  loulan: {
    id: 'loulan', name: '楼兰', nameEn: 'Loulan',
    description: '丝路明珠，罗布泊畔的神秘古国。控制着东西方贸易的要冲。',
    color: '#C8A850', emblem: '🏜️', terrain: 'desert',
    resources: { jade: 3, silk: 2, spice: 2, horse: 1, iron: 1, gold: 2 },
    military: 65, economy: 80, diplomacy: 70, culture: 75, population: 15000,
    ruler: 'char_loulan_001',
    capital: { x: 55, y: 45 },
    territory: [
      { x: 50, y: 40 }, { x: 55, y: 40 }, { x: 60, y: 40 },
      { x: 50, y: 45 }, { x: 55, y: 45 }, { x: 60, y: 45 },
      { x: 50, y: 50 }, { x: 55, y: 50 }
    ],
    speciality: '玉石贸易',
    skills: {
      military: { name: '沙漠之盾', desc: '沙漠地形防御+25%', icon: '🛡️' },
      economy: { name: '丝路关税', desc: '商路过境收入+30%', icon: '💰' },
      agriculture: { name: '绿洲灌溉', desc: '绿洲农业产出+20%', icon: '💧' },
      diplomacy: { name: '四方来朝', desc: '与所有国家初始关系+10', icon: '🤝' },
      population: { name: '商贸移民', desc: '商路吸引人口+15%', icon: '🏘️' }
    },
    lore: '楼兰古城坐落在罗布泊西北岸，是丝绸之路南道的必经之地。',
    difficulty: 'medium', attitude: 'neutral'
  },

  kucha: {
    id: 'kucha', name: '龟兹', nameEn: 'Kucha',
    description: '西域乐舞之都，佛教艺术中心。龟兹乐舞名扬天下。',
    color: '#4A90D9', emblem: '🎵', terrain: 'oasis',
    resources: { jade: 1, silk: 3, spice: 1, horse: 2, iron: 2, gold: 1 },
    military: 70, economy: 75, diplomacy: 80, culture: 95, population: 20000,
    ruler: 'char_kucha_001',
    capital: { x: 35, y: 35 },
    territory: [
      { x: 30, y: 30 }, { x: 35, y: 30 }, { x: 40, y: 30 },
      { x: 30, y: 35 }, { x: 35, y: 35 }, { x: 40, y: 35 },
      { x: 30, y: 40 }, { x: 35, y: 40 }
    ],
    speciality: '乐舞艺术',
    skills: {
      military: { name: '战鼓舞', desc: '战斗中士气恢复+20', icon: '🥁' },
      economy: { name: '艺苑经济', desc: '文化转化为经济收入', icon: '🎭' },
      agriculture: { name: '佛寺农庄', desc: '寺庙周边农田+25%', icon: '🏛️' },
      diplomacy: { name: '乐舞外交', desc: '文化交流外交+30', icon: '💃' },
      population: { name: '文化吸引', desc: '高文化吸引移民', icon: '📚' }
    },
    lore: '龟兹是西域最大的绿洲城邦之一，以音乐和舞蹈闻名于世。',
    difficulty: 'easy', attitude: 'friendly'
  },

  khotan: {
    id: 'khotan', name: '于阗', nameEn: 'Khotan',
    description: '美玉之国，丝绸南道重镇。以盛产美玉闻名天下。',
    color: '#50C878', emblem: '💎', terrain: 'oasis',
    resources: { jade: 5, silk: 2, spice: 1, horse: 1, iron: 1, gold: 3 },
    military: 60, economy: 85, diplomacy: 75, culture: 80, population: 18000,
    ruler: 'char_khotan_001',
    capital: { x: 25, y: 60 },
    territory: [
      { x: 20, y: 55 }, { x: 25, y: 55 }, { x: 30, y: 55 },
      { x: 20, y: 60 }, { x: 25, y: 60 }, { x: 30, y: 60 },
      { x: 20, y: 65 }, { x: 25, y: 65 }
    ],
    speciality: '玉石开采',
    skills: {
      military: { name: '玉甲兵', desc: '精良装备防御+15%', icon: '🛡️' },
      economy: { name: '玉石之路', desc: '玉石贸易利润+50%', icon: '💎' },
      agriculture: { name: '河畔农耕', desc: '河流旁农田+30%', icon: '🌾' },
      diplomacy: { name: '玉帛之交', desc: '赠送玉石外交+20', icon: '🎁' },
      population: { name: '矿工家族', desc: '矿业人口稳定增长', icon: '⛏️' }
    },
    lore: '于阗国盛产美玉，自古便是中原王朝最重要的玉石来源地。',
    difficulty: 'medium', attitude: 'neutral'
  },

  shanshan: {
    id: 'shanshan', name: '鄯善', nameEn: 'Shanshan',
    description: '楼兰的继承者，丝路南道门户。',
    color: '#D4A853', emblem: '🏰', terrain: 'desert',
    resources: { jade: 2, silk: 2, spice: 2, horse: 1, iron: 1, gold: 1 },
    military: 55, economy: 70, diplomacy: 65, culture: 60, population: 10000,
    ruler: 'char_shanshan_001',
    capital: { x: 60, y: 50 },
    territory: [{ x: 55, y: 45 }, { x: 60, y: 45 }, { x: 65, y: 45 }, { x: 55, y: 50 }, { x: 60, y: 50 }, { x: 65, y: 50 }, { x: 60, y: 55 }],
    speciality: '商队护卫',
    skills: {
      military: { name: '商队护卫', desc: '护卫部队战斗力+20%', icon: '🗡️' },
      economy: { name: '中转贸易', desc: '商路中转收入+25%', icon: '🐫' },
      agriculture: { name: '坎儿井', desc: '地下水渠灌溉+20%', icon: '💧' },
      diplomacy: { name: '驿站外交', desc: '使者速度+50%', icon: '🏇' },
      population: { name: '商旅定居', desc: '商人定居率+20%', icon: '🏠' }
    },
    lore: '鄯善国原为楼兰国更名而来，是丝绸之路南道的重要中转站。',
    difficulty: 'medium', attitude: 'neutral'
  },

  // ======== 中等国家 ========
  
  karashahr: {
    id: 'karashahr', name: '焉耆', nameEn: 'Karashahr',
    description: '天山南麓的绿洲城邦，以冶金和铁器制造闻名。',
    color: '#8B4513', emblem: '⚒️', terrain: 'oasis',
    resources: { jade: 1, silk: 1, spice: 1, horse: 2, iron: 5, gold: 1 },
    military: 70, economy: 65, diplomacy: 55, culture: 55, population: 12000,
    ruler: 'char_karashahr_001',
    capital: { x: 40, y: 30 },
    territory: [{ x: 35, y: 25 }, { x: 40, y: 25 }, { x: 45, y: 25 }, { x: 35, y: 30 }, { x: 40, y: 30 }, { x: 45, y: 30 }, { x: 40, y: 35 }],
    speciality: '铁器锻造',
    skills: {
      military: { name: '精铁兵器', desc: '武器攻击+25%', icon: '⚔️' },
      economy: { name: '铁器出口', desc: '铁器贸易利润+40%', icon: '⚒️' },
      agriculture: { name: '铁具农耕', desc: '农具效率+30%', icon: '🔨' },
      diplomacy: { name: '兵器外交', desc: '赠送兵器获好感', icon: '🗡️' },
      population: { name: '工匠世家', desc: '工匠人口+20%', icon: '👨‍🔧' }
    },
    lore: '焉耆国以出产精良铁器闻名，其锻造的刀剑锋利无比。',
    difficulty: 'medium', attitude: 'neutral'
  },

  aksu: {
    id: 'aksu', name: '姑墨', nameEn: 'Aksu',
    description: '白水之城，农业发达的绿洲国度。以酿造美酒闻名。',
    color: '#9B59B6', emblem: '🍇', terrain: 'oasis',
    resources: { jade: 1, silk: 1, spice: 3, horse: 2, iron: 1, gold: 1 },
    military: 55, economy: 70, diplomacy: 60, culture: 65, population: 9000,
    ruler: 'char_aksu_001',
    capital: { x: 30, y: 40 },
    territory: [{ x: 25, y: 35 }, { x: 30, y: 35 }, { x: 35, y: 35 }, { x: 25, y: 40 }, { x: 30, y: 40 }, { x: 35, y: 40 }, { x: 30, y: 45 }],
    speciality: '美酒酿造',
    skills: {
      military: { name: '酒壮英雄胆', desc: '战前饮酒士气+15', icon: '🍷' },
      economy: { name: '葡萄美酒', desc: '酒类贸易利润+50%', icon: '🍇' },
      agriculture: { name: '葡萄种植', desc: '果园产出+40%', icon: '🌿' },
      diplomacy: { name: '美酒外交', desc: '宴请使节好感+25', icon: '🥂' },
      population: { name: '酒庄家族', desc: '酿酒师世代传承', icon: '👨‍🌾' }
    },
    lore: '姑墨国盛产葡萄和美酒，其酿造的葡萄酒甘甜醇厚。',
    difficulty: 'easy', attitude: 'friendly'
  },

  kashgar: {
    id: 'kashgar', name: '疏勒', nameEn: 'Kashgar',
    description: '丝路西端重镇，东西方文化交汇之地。',
    color: '#2ECC71', emblem: '🕌', terrain: 'oasis',
    resources: { jade: 2, silk: 3, spice: 3, horse: 2, iron: 2, gold: 2 },
    military: 75, economy: 80, diplomacy: 70, culture: 70, population: 16000,
    ruler: 'char_kashgar_001',
    capital: { x: 15, y: 35 },
    territory: [{ x: 10, y: 30 }, { x: 15, y: 30 }, { x: 20, y: 30 }, { x: 10, y: 35 }, { x: 15, y: 35 }, { x: 20, y: 35 }, { x: 15, y: 40 }],
    speciality: '商贸枢纽',
    skills: {
      military: { name: '雇佣兵', desc: '可雇佣各国战士', icon: '🗡️' },
      economy: { name: '东西交汇', desc: '所有贸易利润+20%', icon: '💰' },
      agriculture: { name: '集市农业', desc: '农产品售价+30%', icon: '🏪' },
      diplomacy: { name: '多语通译', desc: '外交效率+25%', icon: '🗣️' },
      population: { name: '万国来客', desc: '各国移民+25%', icon: '🌍' }
    },
    lore: '疏勒是丝绸之路西出葱岭的最后一站。',
    difficulty: 'medium', attitude: 'neutral'
  },

  yarkand: {
    id: 'yarkand', name: '莎车', nameEn: 'Yarkand',
    description: '丝路南道大国，以歌舞和手工艺品闻名。',
    color: '#E67E22', emblem: '🗡️', terrain: 'oasis',
    resources: { jade: 2, silk: 2, spice: 2, horse: 2, iron: 3, gold: 1 },
    military: 65, economy: 70, diplomacy: 65, culture: 70, population: 11000,
    ruler: 'char_yarkand_001',
    capital: { x: 20, y: 55 },
    territory: [{ x: 15, y: 50 }, { x: 20, y: 50 }, { x: 25, y: 50 }, { x: 15, y: 55 }, { x: 20, y: 55 }, { x: 25, y: 55 }, { x: 20, y: 60 }],
    speciality: '刀剑工艺',
    skills: {
      military: { name: '莎车利刃', desc: '近战攻击+20%', icon: '🔪' },
      economy: { name: '刀剑贸易', desc: '武器出口利润+35%', icon: '⚔️' },
      agriculture: { name: '绿洲果园', desc: '果树种植+20%', icon: '🌳' },
      diplomacy: { name: '歌舞外交', desc: '歌舞表演好感+20', icon: '💃' },
      population: { name: '匠人传承', desc: '手工业人口+15%', icon: '👨‍🎨' }
    },
    lore: '莎车国以出产精美刀剑闻名。',
    difficulty: 'medium', attitude: 'neutral'
  },

  wusun: {
    id: 'wusun', name: '乌孙', nameEn: 'Wusun',
    description: '天山以北的游牧大国，以骑兵闻名。乌孙马被誉为天马。',
    color: '#3498DB', emblem: '🐎', terrain: 'steppe',
    resources: { jade: 1, silk: 1, spice: 0, horse: 5, iron: 2, gold: 1 },
    military: 90, economy: 50, diplomacy: 45, culture: 40, population: 25000,
    ruler: 'char_wusun_001',
    capital: { x: 50, y: 15 },
    territory: [{ x: 45, y: 10 }, { x: 50, y: 10 }, { x: 55, y: 10 }, { x: 45, y: 15 }, { x: 50, y: 15 }, { x: 55, y: 15 }, { x: 45, y: 20 }, { x: 50, y: 20 }],
    speciality: '良马繁育',
    skills: {
      military: { name: '天马骑兵', desc: '骑兵速度+30%，攻击+20%', icon: '🐎' },
      economy: { name: '马匹贸易', desc: '马匹售价+50%', icon: '💰' },
      agriculture: { name: '游牧畜牧', desc: '畜牧产出+30%', icon: '🐄' },
      diplomacy: { name: '和亲政策', desc: '联姻外交效果x2', icon: '💒' },
      population: { name: '部落联盟', desc: '部落人口增长+20%', icon: '⛺' }
    },
    lore: '乌孙人是天生的骑手，他们的马匹被称为"天马"。',
    difficulty: 'hard', attitude: 'aggressive'
  },

  // ======== 小国 ========
  
  jumi: {
    id: 'jumi', name: '扜弥', nameEn: 'Jumi',
    description: '于阗以东的小国，以种植葡萄和酿造美酒闻名。',
    color: '#8E44AD', emblem: '🍷', terrain: 'oasis',
    resources: { jade: 1, silk: 1, spice: 2, horse: 1, iron: 0, gold: 1 },
    military: 30, economy: 55, diplomacy: 50, culture: 50, population: 3000,
    ruler: 'char_jumi_001',
    capital: { x: 30, y: 55 },
    territory: [{ x: 25, y: 50 }, { x: 30, y: 50 }, { x: 25, y: 55 }, { x: 30, y: 55 }],
    speciality: '葡萄种植',
    skills: {
      military: { name: '民兵', desc: '守卫部队防御+10%', icon: '🛡️' },
      economy: { name: '佳酿', desc: '葡萄酒利润+40%', icon: '🍷' },
      agriculture: { name: '葡萄园', desc: '葡萄产出+50%', icon: '🍇' },
      diplomacy: { name: '小国寡民', desc: '不引人注目，被攻击概率低', icon: '🕊️' },
      population: { name: '安居乐业', desc: '人口稳定增长', icon: '🏡' }
    },
    lore: '扜弥虽小，但其葡萄园产出的葡萄甘甜如蜜。',
    difficulty: 'easy', attitude: 'friendly'
  },

  charklik: {
    id: 'charklik', name: '且末', nameEn: 'Charklik',
    description: '丝路南道小国，以出产美玉和编织地毯闻名。',
    color: '#1ABC9C', emblem: '🧶', terrain: 'desert',
    resources: { jade: 3, silk: 1, spice: 1, horse: 0, iron: 0, gold: 1 },
    military: 25, economy: 50, diplomacy: 55, culture: 45, population: 2500,
    ruler: 'char_charklik_001',
    capital: { x: 45, y: 55 },
    territory: [{ x: 40, y: 50 }, { x: 45, y: 50 }, { x: 40, y: 55 }, { x: 45, y: 55 }],
    speciality: '地毯编织',
    skills: {
      military: { name: '城防', desc: '城墙防御+15%', icon: '🏰' },
      economy: { name: '地毯贸易', desc: '地毯售价+45%', icon: '🧶' },
      agriculture: { name: '绿洲耕作', desc: '有限农业+10%', icon: '🌱' },
      diplomacy: { name: '贡品外交', desc: '进贡获好感+30%', icon: '🎁' },
      population: { name: '织工家族', desc: '手工业者+20%', icon: '🧵' }
    },
    lore: '且末的地毯编织技艺代代相传，织出的地毯色彩斑斓。',
    difficulty: 'easy', attitude: 'friendly'
  },

  niya: {
    id: 'niya', name: '精绝', nameEn: 'Niya',
    description: '尼雅河畔的神秘小国，传说中埋藏着无数宝藏。',
    color: '#F39C12', emblem: '🏺', terrain: 'desert',
    resources: { jade: 2, silk: 2, spice: 1, horse: 0, iron: 1, gold: 3 },
    military: 20, economy: 45, diplomacy: 40, culture: 55, population: 2000,
    ruler: 'char_niya_001',
    capital: { x: 40, y: 60 },
    territory: [{ x: 35, y: 55 }, { x: 40, y: 55 }, { x: 35, y: 60 }, { x: 40, y: 60 }],
    speciality: '古物发掘',
    skills: {
      military: { name: '古墓守卫', desc: '遗迹战斗加成', icon: '⚱️' },
      economy: { name: '宝藏发掘', desc: '随机获得珍贵古物', icon: '💎' },
      agriculture: { name: '古渠修复', desc: '修复古渠灌溉+15%', icon: '🏛️' },
      diplomacy: { name: '古物外交', desc: '赠送古物好感+40', icon: '🏺' },
      population: { name: '考古学者', desc: '吸引学者定居', icon: '📜' }
    },
    lore: '精绝国是西域最神秘的古国之一，传说一夜之间被沙暴掩埋。',
    difficulty: 'medium', attitude: 'neutral'
  },

  kroran: {
    id: 'kroran', name: '危须', nameEn: 'Kroran',
    description: '博斯腾湖畔的小国，以渔业和盐业为生。',
    color: '#16A085', emblem: '🐟', terrain: 'lake',
    resources: { jade: 0, silk: 1, spice: 1, horse: 1, iron: 1, gold: 1 },
    military: 30, economy: 50, diplomacy: 55, culture: 40, population: 3500,
    ruler: 'char_kroran_001',
    capital: { x: 45, y: 35 },
    territory: [{ x: 40, y: 30 }, { x: 45, y: 30 }, { x: 40, y: 35 }, { x: 45, y: 35 }],
    speciality: '渔业盐业',
    skills: {
      military: { name: '水军', desc: '水域战斗+30%', icon: '⚓' },
      economy: { name: '鱼盐之利', desc: '渔业盐业收入+40%', icon: '🐟' },
      agriculture: { name: '湖畔农耕', desc: '湖边农田+25%', icon: '🌾' },
      diplomacy: { name: '鱼盐外交', desc: '赠送鱼盐好感+15', icon: '🧂' },
      population: { name: '渔村繁衍', desc: '渔民人口+20%', icon: '🎣' }
    },
    lore: '危须国依博斯腾湖而建，湖中鱼虾丰富。',
    difficulty: 'easy', attitude: 'friendly'
  },

  bugur: {
    id: 'bugur', name: '轮台', nameEn: 'Bugur',
    description: '汉朝屯田之地，农业发达。',
    color: '#27AE60', emblem: '🌾', terrain: 'plains',
    resources: { jade: 0, silk: 2, spice: 1, horse: 2, iron: 2, gold: 0 },
    military: 60, economy: 60, diplomacy: 65, culture: 50, population: 8000,
    ruler: 'char_bugur_001',
    capital: { x: 40, y: 40 },
    territory: [{ x: 35, y: 35 }, { x: 40, y: 35 }, { x: 35, y: 40 }, { x: 40, y: 40 }, { x: 35, y: 45 }],
    speciality: '屯田农业',
    skills: {
      military: { name: '屯田兵', desc: '兵农合一，后勤+30%', icon: '🌾' },
      economy: { name: '汉式农耕', desc: '农业产出+35%', icon: '🚜' },
      agriculture: { name: '灌溉系统', desc: '水利工程+40%', icon: '💧' },
      diplomacy: { name: '汉朝联系', desc: '与汉朝关系+20', icon: '🏯' },
      population: { name: '屯田移民', desc: '农业移民+25%', icon: '👨‍🌾' }
    },
    lore: '轮台是汉朝在西域设立的第一处屯田之所。',
    difficulty: 'medium', attitude: 'neutral'
  },

  qarqan: {
    id: 'qarqan', name: '若羌', nameEn: 'Qarqan',
    description: '阿尔金山脚下的游牧小国。',
    color: '#D35400', emblem: '🏹', terrain: 'mountain',
    resources: { jade: 1, silk: 0, spice: 0, horse: 3, iron: 1, gold: 1 },
    military: 45, economy: 35, diplomacy: 35, culture: 30, population: 4000,
    ruler: 'char_qarqan_001',
    capital: { x: 65, y: 55 },
    territory: [{ x: 60, y: 50 }, { x: 65, y: 50 }, { x: 60, y: 55 }, { x: 65, y: 55 }, { x: 65, y: 60 }],
    speciality: '山地狩猎',
    skills: {
      military: { name: '山地游击', desc: '山地战斗+25%', icon: '🏔️' },
      economy: { name: '猎物贸易', desc: '皮毛售价+30%', icon: '🦌' },
      agriculture: { name: '山地放牧', desc: '山地畜牧+15%', icon: '🐐' },
      diplomacy: { name: '孤立主义', desc: '外交范围有限', icon: '🏔️' },
      population: { name: '部落繁衍', desc: '自然增长', icon: '🏕️' }
    },
    lore: '若羌人世代在阿尔金山中狩猎。',
    difficulty: 'hard', attitude: 'aggressive'
  },

  pishan: {
    id: 'pishan', name: '皮山', nameEn: 'Pishan',
    description: '丝路南道小国，以种植瓜果闻名。',
    color: '#C0392B', emblem: '🍈', terrain: 'oasis',
    resources: { jade: 1, silk: 1, spice: 2, horse: 1, iron: 0, gold: 1 },
    military: 25, economy: 50, diplomacy: 55, culture: 45, population: 2800,
    ruler: 'char_pishan_001',
    capital: { x: 25, y: 50 },
    territory: [{ x: 20, y: 45 }, { x: 25, y: 45 }, { x: 20, y: 50 }, { x: 25, y: 50 }],
    speciality: '瓜果种植',
    skills: {
      military: { name: '果农民兵', desc: '守卫能力+10%', icon: '🛡️' },
      economy: { name: '瓜果飘香', desc: '水果贸易+35%', icon: '🍈' },
      agriculture: { name: '果园管理', desc: '果树产出+40%', icon: '🌳' },
      diplomacy: { name: '瓜果外交', desc: '赠送瓜果好感+20', icon: '🎁' },
      population: { name: '果农家族', desc: '农业人口+15%', icon: '👨‍🌾' }
    },
    lore: '皮山国的瓜果甘甜多汁，尤其是哈密瓜和石榴。',
    difficulty: 'easy', attitude: 'friendly'
  },

  soche: {
    id: 'soche', name: '粟特', nameEn: 'Sogdiana',
    description: '中亚商贸民族，以经商天赋闻名。',
    color: '#2980B9', emblem: '💰', terrain: 'plains',
    resources: { jade: 2, silk: 4, spice: 4, horse: 1, iron: 1, gold: 3 },
    military: 40, economy: 95, diplomacy: 85, culture: 70, population: 14000,
    ruler: 'char_soche_001',
    capital: { x: 5, y: 30 },
    territory: [{ x: 0, y: 25 }, { x: 5, y: 25 }, { x: 10, y: 25 }, { x: 0, y: 30 }, { x: 5, y: 30 }, { x: 10, y: 30 }, { x: 5, y: 35 }],
    speciality: '商贸网络',
    skills: {
      military: { name: '雇佣军', desc: '可用金钱雇佣强兵', icon: '💰' },
      economy: { name: '商路霸主', desc: '所有贸易+30%', icon: '💹' },
      agriculture: { name: '商品农业', desc: '农产品商业化+25%', icon: '🏪' },
      diplomacy: { name: '商业外交', desc: '贸易协定好感+35', icon: '🤝' },
      population: { name: '商路移民', desc: '商人定居+30%', icon: '🐫' }
    },
    lore: '粟特人是丝绸之路上最精明的商人。',
    difficulty: 'easy', attitude: 'friendly'
  },

  kangju: {
    id: 'kangju', name: '康居', nameEn: 'Kangju',
    description: '中亚游牧大国，以骑兵和畜牧闻名。',
    color: '#7F8C8D', emblem: '🐂', terrain: 'steppe',
    resources: { jade: 0, silk: 1, spice: 1, horse: 4, iron: 2, gold: 1 },
    military: 80, economy: 45, diplomacy: 40, culture: 35, population: 20000,
    ruler: 'char_kangju_001',
    capital: { x: 5, y: 15 },
    territory: [{ x: 0, y: 10 }, { x: 5, y: 10 }, { x: 10, y: 10 }, { x: 0, y: 15 }, { x: 5, y: 15 }, { x: 10, y: 15 }, { x: 0, y: 20 }, { x: 5, y: 20 }],
    speciality: '畜牧养殖',
    skills: {
      military: { name: '铁骑', desc: '重骑兵攻击+25%', icon: '🐎' },
      economy: { name: '畜牧贸易', desc: '牲畜贸易+30%', icon: '🐂' },
      agriculture: { name: '草原放牧', desc: '草原产出+35%', icon: '🌾' },
      diplomacy: { name: '部落联盟', desc: '游牧国家好感+20', icon: '🤝' },
      population: { name: '游牧繁衍', desc: '人口增长+15%', icon: '⛺' }
    },
    lore: '康居是中亚草原上的游牧大国。',
    difficulty: 'hard', attitude: 'aggressive'
  },

  dayuan: {
    id: 'dayuan', name: '大宛', nameEn: 'Ferghana',
    description: '汗血宝马的故乡，以出产天下最优良的马匹闻名于世。',
    color: '#E74C3C', emblem: '🏇', terrain: 'valley',
    resources: { jade: 0, silk: 1, spice: 1, horse: 5, iron: 2, gold: 2 },
    military: 75, economy: 60, diplomacy: 55, culture: 50, population: 13000,
    ruler: 'char_dayuan_001',
    capital: { x: 5, y: 45 },
    territory: [{ x: 0, y: 40 }, { x: 5, y: 40 }, { x: 10, y: 40 }, { x: 0, y: 45 }, { x: 5, y: 45 }, { x: 10, y: 45 }, { x: 5, y: 50 }],
    speciality: '汗血宝马',
    skills: {
      military: { name: '汗血骑兵', desc: '骑兵综合+30%', icon: '🏇' },
      economy: { name: '天马贸易', desc: '宝马售价极高', icon: '💰' },
      agriculture: { name: '谷地牧场', desc: '山谷牧场+25%', icon: '🏔️' },
      diplomacy: { name: '宝马外交', desc: '赠马好感+40', icon: '🐎' },
      population: { name: '马场家族', desc: '牧马人+20%', icon: '👨‍🌾' }
    },
    lore: '大宛国出产的汗血宝马是天下最优良的马种。',
    difficulty: 'medium', attitude: 'neutral'
  },

  // ======== 更多小国 ========
  jieshi: {
    id: 'jieshi', name: '竭石', nameEn: 'Jieshi',
    description: '帕米尔高原上的山国，以开采宝石闻名。',
    color: '#5B2C6F', emblem: '💠', terrain: 'mountain',
    resources: { jade: 3, silk: 0, spice: 0, horse: 1, iron: 3, gold: 4 },
    military: 35, economy: 55, diplomacy: 40, culture: 35, population: 3000,
    ruler: 'char_jieshi_001', capital: { x: 10, y: 50 },
    territory: [{ x: 5, y: 45 }, { x: 10, y: 45 }, { x: 5, y: 50 }, { x: 10, y: 50 }, { x: 10, y: 55 }],
    speciality: '宝石开采', skills: {
      military: { name: '山城防御', desc: '山地防御+30%', icon: '🏔️' },
      economy: { name: '宝石贸易', desc: '宝石利润+50%', icon: '💠' },
      agriculture: { name: '梯田', desc: '山地农业+15%', icon: '🌿' },
      diplomacy: { name: '宝石外交', desc: '赠宝石好感+35', icon: '💎' },
      population: { name: '矿工家族', desc: '矿工+20%', icon: '⛏️' }
    },
    lore: '竭石国山中蕴藏着丰富的宝石矿藏。', difficulty: 'medium', attitude: 'neutral'
  },

  tashkurgan: {
    id: 'tashkurgan', name: '塔什库尔干', nameEn: 'Tashkurgan',
    description: '石头城，扼守葱岭要道的战略要地。',
    color: '#6C3483', emblem: '🏔️', terrain: 'mountain',
    resources: { jade: 1, silk: 1, spice: 1, horse: 1, iron: 2, gold: 1 },
    military: 50, economy: 40, diplomacy: 50, culture: 40, population: 4000,
    ruler: 'char_tash_001', capital: { x: 10, y: 40 },
    territory: [{ x: 5, y: 35 }, { x: 10, y: 35 }, { x: 5, y: 40 }, { x: 10, y: 40 }],
    speciality: '关隘守卫', skills: {
      military: { name: '一夫当关', desc: '关隘防御+50%', icon: '🏰' },
      economy: { name: '过路费', desc: '关隘通行收入+30%', icon: '💰' },
      agriculture: { name: '高山放牧', desc: '高原畜牧+10%', icon: '🐐' },
      diplomacy: { name: '中立堡垒', desc: '不易被攻击', icon: '🛡️' },
      population: { name: '守军家属', desc: '军属人口+15%', icon: '👨‍👩‍👧' }
    },
    lore: '塔什库尔干意为"石头城"。', difficulty: 'hard', attitude: 'neutral'
  },

  karghalik: {
    id: 'karghalik', name: '叶尔羌', nameEn: 'Karghalik',
    description: '丝路南道绿洲城邦，以纺织和染色工艺闻名。',
    color: '#A569BD', emblem: '🧵', terrain: 'oasis',
    resources: { jade: 1, silk: 3, spice: 1, horse: 1, iron: 0, gold: 1 },
    military: 30, economy: 60, diplomacy: 55, culture: 55, population: 5000,
    ruler: 'char_karghalik_001', capital: { x: 20, y: 45 },
    territory: [{ x: 15, y: 40 }, { x: 20, y: 40 }, { x: 15, y: 45 }, { x: 20, y: 45 }],
    speciality: '纺织染色', skills: {
      military: { name: '织甲', desc: '布甲防御+10%', icon: '🛡️' },
      economy: { name: '彩绸贸易', desc: '丝绸利润+40%', icon: '🧵' },
      agriculture: { name: '染料种植', desc: '染料产出+35%', icon: '🌺' },
      diplomacy: { name: '丝绸外交', desc: '赠丝绸好感+25', icon: '🎁' },
      population: { name: '织工家族', desc: '纺织工+25%', icon: '👩‍🎨' }
    },
    lore: '叶尔羌的纺织和染色工艺精湛。', difficulty: 'easy', attitude: 'friendly'
  },

  keriya: {
    id: 'keriya', name: '克里雅', nameEn: 'Keriya',
    description: '于阗以东的小绿洲，以出产美玉和香料闻名。',
    color: '#D4AC0D', emblem: '✨', terrain: 'desert',
    resources: { jade: 3, silk: 1, spice: 2, horse: 0, iron: 0, gold: 1 },
    military: 20, economy: 45, diplomacy: 45, culture: 40, population: 2000,
    ruler: 'char_keriya_001', capital: { x: 35, y: 60 },
    territory: [{ x: 30, y: 55 }, { x: 35, y: 55 }, { x: 30, y: 60 }, { x: 35, y: 60 }],
    speciality: '香料贸易', skills: {
      military: { name: '沙暴掩护', desc: '沙漠战斗+15%', icon: '🌪️' },
      economy: { name: '香料之路', desc: '香料利润+40%', icon: '✨' },
      agriculture: { name: '香料种植', desc: '香料产出+30%', icon: '🌿' },
      diplomacy: { name: '香料外交', desc: '赠香料好感+20', icon: '🎁' },
      population: { name: '商队定居', desc: '商人定居+10%', icon: '🐫' }
    },
    lore: '克里雅出产的香料品质上乘。', difficulty: 'easy', attitude: 'friendly'
  },

  charchan: {
    id: 'charchan', name: '且末南', nameEn: 'Charchan',
    description: '阿尔金山北麓的小国，以放牧和采盐为生。',
    color: '#7DCEA0', emblem: '🧂', terrain: 'desert',
    resources: { jade: 1, silk: 0, spice: 1, horse: 2, iron: 0, gold: 1 },
    military: 25, economy: 40, diplomacy: 40, culture: 30, population: 2500,
    ruler: 'char_charchan_001', capital: { x: 50, y: 60 },
    territory: [{ x: 45, y: 55 }, { x: 50, y: 55 }, { x: 45, y: 60 }, { x: 50, y: 60 }],
    speciality: '湖盐开采', skills: {
      military: { name: '盐碱防御', desc: '盐碱地防御+15%', icon: '🛡️' },
      economy: { name: '湖盐贸易', desc: '盐利润+35%', icon: '🧂' },
      agriculture: { name: '盐碱改良', desc: '改良土地+10%', icon: '🌱' },
      diplomacy: { name: '盐外交', desc: '赠盐好感+15', icon: '🎁' },
      population: { name: '盐工家族', desc: '盐工+15%', icon: '👨‍🔧' }
    },
    lore: '且末南国的盐湖出产纯净的湖盐。', difficulty: 'medium', attitude: 'neutral'
  },

  wucha: {
    id: 'wucha', name: '乌恰', nameEn: 'Wucha',
    description: '天山脚下的牧业小国，以放牧和猎鹰闻名。',
    color: '#85C1E9', emblem: '🦅', terrain: 'mountain',
    resources: { jade: 0, silk: 0, spice: 0, horse: 3, iron: 1, gold: 0 },
    military: 40, economy: 30, diplomacy: 35, culture: 25, population: 3000,
    ruler: 'char_wucha_001', capital: { x: 25, y: 25 },
    territory: [{ x: 20, y: 20 }, { x: 25, y: 20 }, { x: 20, y: 25 }, { x: 25, y: 25 }],
    speciality: '猎鹰驯养', skills: {
      military: { name: '猎鹰侦察', desc: '侦察范围+50%', icon: '🦅' },
      economy: { name: '猎鹰贸易', desc: '猎鹰售价极高', icon: '💰' },
      agriculture: { name: '山地放牧', desc: '山地畜牧+20%', icon: '🐐' },
      diplomacy: { name: '猎鹰外交', desc: '赠猎鹰好感+30', icon: '🦅' },
      population: { name: '驯鹰家族', desc: '驯鹰人+15%', icon: '👨‍🌾' }
    },
    lore: '乌恰人擅长驯养猎鹰。', difficulty: 'hard', attitude: 'aggressive'
  },

  tokuz: {
    id: 'tokuz', name: '突骑施', nameEn: 'Tokuz Oguz',
    description: '天山以北的游牧部落联盟，以骑兵突袭闻名。',
    color: '#AEB6BF', emblem: '🐺', terrain: 'steppe',
    resources: { jade: 0, silk: 1, spice: 0, horse: 4, iron: 2, gold: 0 },
    military: 85, economy: 35, diplomacy: 30, culture: 30, population: 18000,
    ruler: 'char_tokuz_001', capital: { x: 60, y: 10 },
    territory: [{ x: 55, y: 5 }, { x: 60, y: 5 }, { x: 65, y: 5 }, { x: 55, y: 10 }, { x: 60, y: 10 }, { x: 65, y: 10 }, { x: 60, y: 15 }],
    speciality: '骑兵突袭', skills: {
      military: { name: '狼群战术', desc: '突袭伤害+35%', icon: '🐺' },
      economy: { name: '掠夺经济', desc: '战利品+40%', icon: '💰' },
      agriculture: { name: '草原游牧', desc: '草原产出+25%', icon: '🌾' },
      diplomacy: { name: '恐吓', desc: '弱小国家易屈服', icon: '😤' },
      population: { name: '部落征兵', desc: '兵源+20%', icon: '⚔️' }
    },
    lore: '突骑施是草原上最凶猛的骑兵部落。', difficulty: 'hard', attitude: 'aggressive'
  },

  karakhoja: {
    id: 'karakhoja', name: '高昌', nameEn: 'Karakhoja',
    description: '火焰山下的古城，佛教文化中心。',
    color: '#E59866', emblem: '🔥', terrain: 'desert',
    resources: { jade: 1, silk: 2, spice: 1, horse: 1, iron: 2, gold: 2 },
    military: 60, economy: 70, diplomacy: 70, culture: 80, population: 11000,
    ruler: 'char_karakhoja_001', capital: { x: 55, y: 30 },
    territory: [{ x: 50, y: 25 }, { x: 55, y: 25 }, { x: 60, y: 25 }, { x: 50, y: 30 }, { x: 55, y: 30 }, { x: 60, y: 30 }, { x: 55, y: 35 }],
    speciality: '佛教文化', skills: {
      military: { name: '僧兵', desc: '僧侣部队士气+25', icon: '🙏' },
      economy: { name: '香火经济', desc: '寺庙收入+30%', icon: '🏛️' },
      agriculture: { name: '寺院农庄', desc: '寺庙农业+25%', icon: '🌾' },
      diplomacy: { name: '佛法外交', desc: '文化交流+30', icon: '📿' },
      population: { name: '信众聚集', desc: '信徒定居+20%', icon: '🙏' }
    },
    lore: '高昌国坐落在火焰山下，是西域佛教文化的重要中心。', difficulty: 'medium', attitude: 'neutral'
  },

  beshbaliq: {
    id: 'beshbaliq', name: '北庭', nameEn: 'Beshbaliq',
    description: '天山北麓的重镇，北庭都护府所在地。',
    color: '#5D6D7E', emblem: '🏯', terrain: 'plains',
    resources: { jade: 0, silk: 2, spice: 0, horse: 3, iron: 3, gold: 1 },
    military: 75, economy: 60, diplomacy: 65, culture: 55, population: 10000,
    ruler: 'char_beshbaliq_001', capital: { x: 55, y: 20 },
    territory: [{ x: 50, y: 15 }, { x: 55, y: 15 }, { x: 60, y: 15 }, { x: 50, y: 20 }, { x: 55, y: 20 }, { x: 60, y: 20 }],
    speciality: '军事要塞', skills: {
      military: { name: '都护府兵', desc: '正规军战斗力+20%', icon: '⚔️' },
      economy: { name: '军镇经济', desc: '驻军消费收入+25%', icon: '💰' },
      agriculture: { name: '军屯', desc: '军屯产出+30%', icon: '🌾' },
      diplomacy: { name: '都护权威', desc: '外交威望+20', icon: '🏯' },
      population: { name: '军户', desc: '军户人口+20%', icon: '👨‍✈️' }
    },
    lore: '北庭是中原王朝在天山以北设立的军事重镇。', difficulty: 'medium', attitude: 'neutral'
  },

  yanqi: {
    id: 'yanqi', name: '焉耆南', nameEn: 'Yanqi',
    description: '博斯腾湖畔的富庶之国，水草丰美。',
    color: '#48C9B0', emblem: '🌊', terrain: 'lake',
    resources: { jade: 1, silk: 2, spice: 1, horse: 2, iron: 1, gold: 1 },
    military: 50, economy: 65, diplomacy: 60, culture: 55, population: 7000,
    ruler: 'char_yanqi_001', capital: { x: 45, y: 30 },
    territory: [{ x: 40, y: 25 }, { x: 45, y: 25 }, { x: 40, y: 30 }, { x: 45, y: 30 }, { x: 40, y: 35 }],
    speciality: '渔业农业', skills: {
      military: { name: '水军', desc: '水域战斗+25%', icon: '⚓' },
      economy: { name: '鱼米之乡', desc: '渔业农业+30%', icon: '🐟' },
      agriculture: { name: '灌溉农业', desc: '灌溉+35%', icon: '💧' },
      diplomacy: { name: '湖畔交流', desc: '邻国好感+15', icon: '🤝' },
      population: { name: '渔农家族', desc: '渔农+20%', icon: '🎣' }
    },
    lore: '焉耆国依傍博斯腾湖，是西域少有的鱼米之乡。', difficulty: 'easy', attitude: 'friendly'
  },

  chumi: {
    id: 'chumi', name: '处密', nameEn: 'Chumi',
    description: '天山南麓的游牧部落，以放牧骆驼闻名。',
    color: '#D5DBDB', emblem: '🐫', terrain: 'steppe',
    resources: { jade: 0, silk: 0, spice: 0, horse: 2, iron: 1, gold: 0 },
    military: 35, economy: 30, diplomacy: 30, culture: 20, population: 2500,
    ruler: 'char_chumi_001', capital: { x: 65, y: 35 },
    territory: [{ x: 60, y: 30 }, { x: 65, y: 30 }, { x: 60, y: 35 }, { x: 65, y: 35 }],
    speciality: '骆驼养殖', skills: {
      military: { name: '骆驼骑兵', desc: '沙漠骑乘+20%', icon: '🐫' },
      economy: { name: '骆驼商队', desc: '商队载重+30%', icon: '💰' },
      agriculture: { name: '沙漠放牧', desc: '沙漠畜牧+15%', icon: '🌿' },
      diplomacy: { name: '骆驼外交', desc: '赠骆驼好感+20', icon: '🐫' },
      population: { name: '牧民家族', desc: '牧民+15%', icon: '⛺' }
    },
    lore: '处密人擅长养殖骆驼。', difficulty: 'medium', attitude: 'neutral'
  },

  chumukun: {
    id: 'chumukun', name: '处木昆', nameEn: 'Chumukun',
    description: '伊犁河谷的游牧部落，以放牧牛羊为生。',
    color: '#A9CCE3', emblem: '🐑', terrain: 'steppe',
    resources: { jade: 0, silk: 0, spice: 0, horse: 3, iron: 1, gold: 0 },
    military: 40, economy: 35, diplomacy: 35, culture: 25, population: 3000,
    ruler: 'char_chumukun_001', capital: { x: 45, y: 10 },
    territory: [{ x: 40, y: 5 }, { x: 45, y: 5 }, { x: 40, y: 10 }, { x: 45, y: 10 }],
    speciality: '畜牧放牧', skills: {
      military: { name: '牧民骑兵', desc: '轻骑兵+15%', icon: '🐎' },
      economy: { name: '羊毛贸易', desc: '羊毛利润+25%', icon: '🐑' },
      agriculture: { name: '河谷牧场', desc: '河谷畜牧+25%', icon: '🌾' },
      diplomacy: { name: '部落交流', desc: '游牧国家好感+10', icon: '🤝' },
      population: { name: '牧民繁衍', desc: '自然增长+10%', icon: '⛺' }
    },
    lore: '处木昆人在伊犁河谷放牧牛羊。', difficulty: 'medium', attitude: 'neutral'
  },

  gaochang: {
    id: 'gaochang', name: '交河', nameEn: 'Yarkhoto',
    description: '两河交汇处的古城，军事要塞。',
    color: '#BA4A00', emblem: '⚔', terrain: 'desert',
    resources: { jade: 1, silk: 1, spice: 0, horse: 2, iron: 3, gold: 1 },
    military: 65, economy: 55, diplomacy: 55, culture: 50, population: 6000,
    ruler: 'char_gaochang_001', capital: { x: 50, y: 35 },
    territory: [{ x: 45, y: 30 }, { x: 50, y: 30 }, { x: 45, y: 35 }, { x: 50, y: 35 }],
    speciality: '军事防御', skills: {
      military: { name: '天险', desc: '城防+40%', icon: '🏰' },
      economy: { name: '关市', desc: '关市收入+20%', icon: '💰' },
      agriculture: { name: '河畔田', desc: '河畔农业+20%', icon: '🌾' },
      diplomacy: { name: '要塞外交', desc: '军事威慑+15', icon: '⚔️' },
      population: { name: '军户', desc: '军人家庭+15%', icon: '👨‍✈️' }
    },
    lore: '交河城建在两河交汇的悬崖之上，易守难攻。', difficulty: 'medium', attitude: 'neutral'
  }
};

// ======== 四大帝国 (Major Powers - External Influences) ========
export const MAJOR_POWERS = {
  han: {
    id: 'han', name: '汉朝', nameEn: 'Han Empire',
    description: '东方的强大帝国，丝绸之路的东方起点。汉武帝开辟西域，设都护府统辖西域诸国。',
    color: '#FF0000', emblem: '🐉',
    influence: 90, military: 95, economy: 98, diplomacy: 80, culture: 95,
    specialSkill: { name: '天朝上国', desc: '朝贡体系，属国进贡，提供军事保护' },
    historicalFigures: [
      { name: '张骞', title: '博望侯', desc: '凿空西域，开辟丝绸之路', gender: 'male', stats: { military: 40, economy: 70, diplomacy: 95, culture: 80, charisma: 85 } },
      { name: '班超', title: '定远侯', desc: '投笔从戎，经营西域三十载', gender: 'male', stats: { military: 85, economy: 60, diplomacy: 90, culture: 70, charisma: 80 } },
      { name: '班昭', title: '曹大家', desc: '才女，续写汉书，精通文史', gender: 'female', stats: { military: 20, economy: 50, diplomacy: 80, culture: 98, charisma: 90 } },
      { name: '细君公主', title: '和亲公主', desc: '远嫁乌孙的和亲公主', gender: 'female', stats: { military: 15, economy: 40, diplomacy: 90, culture: 85, charisma: 95 } },
      { name: '解忧公主', title: '乌孙王后', desc: '三代乌孙王后，稳固汉乌联盟', gender: 'female', stats: { military: 30, economy: 55, diplomacy: 95, culture: 80, charisma: 90 } },
      { name: '冯嫽', title: '女外交家', desc: '中国历史上第一位女外交家', gender: 'female', stats: { military: 25, economy: 60, diplomacy: 98, culture: 85, charisma: 88 } }
    ],
    attitude: 'expansionist'
  },
  xiongnu: {
    id: 'xiongnu', name: '匈奴', nameEn: 'Xiongnu Empire',
    description: '北方草原的霸主，骑兵天下无双。常与汉朝争夺西域控制权。',
    color: '#8B0000', emblem: '🦅',
    influence: 85, military: 98, economy: 50, diplomacy: 30, culture: 35,
    specialSkill: { name: '草原风暴', desc: '骑兵突袭，掠夺资源，降服小国' },
    historicalFigures: [
      { name: '冒顿单于', title: '天骄', desc: '统一草原，建立匈奴帝国', gender: 'male', stats: { military: 98, economy: 50, diplomacy: 40, culture: 30, charisma: 85 } },
      { name: '呼韩邪单于', title: '归义侯', desc: '与汉朝和亲，昭君出塞', gender: 'male', stats: { military: 75, economy: 55, diplomacy: 80, culture: 50, charisma: 70 } },
      { name: '王昭君', title: '宁胡阏氏', desc: '昭君出塞，千古佳话', gender: 'female', stats: { military: 10, economy: 45, diplomacy: 95, culture: 90, charisma: 98 } },
      { name: '阿提拉', title: '上帝之鞭', desc: '令西方闻风丧胆的匈奴王', gender: 'male', stats: { military: 99, economy: 40, diplomacy: 25, culture: 20, charisma: 75 } }
    ],
    attitude: 'aggressive'
  },
  persia: {
    id: 'persia', name: '波斯', nameEn: 'Persian Empire',
    description: '西方的古老帝国，文化灿烂，商贸发达。波斯商人是丝路上的重要角色。',
    color: '#4B0082', emblem: '🦁',
    influence: 80, military: 80, economy: 90, diplomacy: 75, culture: 90,
    specialSkill: { name: '万王之王', desc: '文化输出，贸易垄断，宗教传播' },
    historicalFigures: [
      { name: '大流士', title: '万王之王', desc: '波斯帝国的伟大统治者', gender: 'male', stats: { military: 85, economy: 90, diplomacy: 80, culture: 85, charisma: 80 } },
      { name: '罗兰娜', title: '丝路玫瑰', desc: '波斯女商人，掌控丝路西段贸易', gender: 'female', stats: { military: 30, economy: 95, diplomacy: 85, culture: 80, charisma: 92 } },
      { name: '萨珊公主', title: '翡翠之眼', desc: '波斯公主，精通宝石鉴定', gender: 'female', stats: { military: 25, economy: 80, diplomacy: 90, culture: 92, charisma: 95 } },
      { name: '琐罗亚斯德', title: '先知', desc: '拜火教创始人', gender: 'male', stats: { military: 10, economy: 50, diplomacy: 70, culture: 99, charisma: 85 } }
    ],
    attitude: 'commercial'
  },
  rome: {
    id: 'rome', name: '罗马', nameEn: 'Roman Empire',
    description: '地中海的霸主，军事实力强大。对东方的丝绸和香料有着巨大需求。',
    color: '#9B2335', emblem: '🦅',
    influence: 75, military: 92, economy: 88, diplomacy: 65, culture: 85,
    specialSkill: { name: '罗马和平', desc: '军事征服，道路建设，法律输出' },
    historicalFigures: [
      { name: '凯撒', title: '独裁者', desc: '罗马共和国末期的独裁者', gender: 'male', stats: { military: 95, economy: 80, diplomacy: 75, culture: 80, charisma: 90 } },
      { name: '克娄巴特拉', title: '埃及艳后', desc: '托勒密王朝末代女法老', gender: 'female', stats: { military: 40, economy: 85, diplomacy: 98, culture: 90, charisma: 99 } },
      { name: '莉薇娅', title: '奥古斯都之妻', desc: '罗马帝国第一夫人', gender: 'female', stats: { military: 30, economy: 75, diplomacy: 90, culture: 85, charisma: 88 } }
    ],
    attitude: 'expansionist'
  }
};

// ======== 绿洲选择点 (Oasis Selection Points) ========
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

export const NATION_LIST = Object.values(NATIONS);
export const NATION_COUNT = NATION_LIST.length;
export const ALL_FEMALE_NATIONS = NATION_LIST.filter(n => n.isAllFemale);
