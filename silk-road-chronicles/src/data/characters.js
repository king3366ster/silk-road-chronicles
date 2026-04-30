/**
 * 角色数据生成器 - Character Data Generator
 * Generates 1000+ characters with 2/3+ being female
 * Uses procedural generation for efficiency
 */

const NATION_IDS = [
  'loulan','kucha','khotan','shanshan','amazons','xiliang',
  'karashahr','aksu','kashgar','yarkand','wusun','jumi',
  'charklik','niya','kroran','bugur','qarqan','pishan',
  'soche','kangju','dayuan','jieshi','tashkurgan','karghalik',
  'keriya','charchan','wucha','tokuz','karakhoja','beshbaliq',
  'yanqi','chumi','chumukun','gaochang'
];

const FEMALE_SURNAMES = ['月','雪','花','玉','珠','翠','霞','兰','凤','鸾','瑶','琼','琳','瑛','瑜','瑾','璇','璐','莹','珊','薇','蕾','薇','蓉','莲','梅','兰','菊','桃','杏','樱','棠','榴','桂','芙','蕙','芷','芳','芝','馨','蝶','燕','莺','鹃','雁','鹤','鸢','鹰','雀','鸥'];

const MALE_SURNAMES = ['铁','钢','石','山','峰','岩','虎','龙','鹰','狼','熊','豹','狮','雕','骏','骐','骥','骁','勇','刚','毅','坚','猛','威','震','雷','风','云','天','海','河','江','波','涛','浪','瀚','漠','烽','焰','焱'];

const FEMALE_GIVEN = ['姬','娘','女','姑','娥','媛','婷','嫣','婉','娴','柔','慧','颖','敏','灵','秀','娟','姣','媚','娇','颜','姿','仪','韵','音','舞','歌','琴','瑟','筝','箫','笛','笙','弦','锦','绣','纺','织','纱','绢','绸','缎','绫','罗','绮','纹','彩','霞'];

const MALE_GIVEN = ['将','帅','侯','伯','公','臣','士','卒','卫','戍','镇','守','征','伐','战','斗','击','刺','射','骑','驾','驭','驰','骋','奔','腾','飞','翔','跃','翻','斩','劈','砍','劈','刺','挑','拨','挡','退','进'];

const TITLES_F = ['公主','郡主','才人','贵人','妃子','将军','都督','校尉','使者','祭司','巫女','舞姬','乐师','画师','织女','药师','医师','商主','镖师','侠女','剑客','骑手','猎手','弓手','术士','谋士','策士','说客','歌者','诗人'];
const TITLES_M = ['国王','王子','将军','都督','校尉','太守','县令','使者','祭司','武士','骑兵','步兵','弓手','铁匠','商人','镖师','侠客','剑客','骑手','猎手','牧民','农夫','工匠','矿工','药师','医师','谋士','策士','说客','诗人'];

const TRAITS = ['勇猛','智谋','仁慈','冷酷','忠诚','叛逆','豪爽','阴险','正直','圆滑','刚毅','温柔','果断','犹豫','热情','冷漠','慷慨','吝啬','谦虚','傲慢','谨慎','鲁莽','沉稳','急躁','聪慧','愚钝','灵巧','笨拙','坚韧','脆弱'];

const SKILLS = {
  military: ['骑术','射术','剑术','枪法','刀法','盾术','阵法','攻城','守城','侦察','突袭','埋伏','水战','山地战','沙漠战','夜战'],
  economy: ['经商','谈判','估价','鉴定','运输','仓储','会计','投资','借贷','保险','合伙','垄断','走私','通关','货币','珠宝'],
  diplomacy: ['游说','结盟','联姻','朝贡','互市','和亲','质子','间谍','反间','暗杀','策反','招降','谈判','调停','威慑','利诱'],
  culture: ['音乐','舞蹈','绘画','雕塑','书法','诗歌','医学','天文','数学','建筑','纺织','染色','酿酒','烹饪','驯兽','园艺']
};

function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function generateName(gender, nationId) {
  const isAllFemale = nationId === 'amazons' || nationId === 'xiliang';
  if (gender === 'female' || isAllFemale) {
    return rand(FEMALE_SURNAMES) + rand(FEMALE_GIVEN);
  }
  return rand(MALE_SURNAMES) + rand(MALE_GIVEN);
}

function generateCharacter(id, nationId, gender, rank) {
  const name = generateName(gender, nationId);
  const title = gender === 'female' ? rand(TITLES_F) : rand(TITLES_M);
  const trait1 = rand(TRAITS);
  let trait2 = rand(TRAITS);
  while (trait2 === trait1) trait2 = rand(TRAITS);
  
  const baseStats = {
    military: randInt(10, 95),
    economy: randInt(10, 95),
    diplomacy: randInt(10, 95),
    culture: randInt(10, 95),
    charisma: randInt(10, 95),
    loyalty: randInt(20, 100),
  };

  // Rank bonuses
  if (rank === 'ruler') {
    Object.keys(baseStats).forEach(k => { if (k !== 'loyalty') baseStats[k] = Math.min(100, baseStats[k] + 20); });
  } else if (rank === 'general') {
    baseStats.military = Math.min(100, baseStats.military + 15);
  } else if (rank === 'minister') {
    baseStats.economy = Math.min(100, baseStats.economy + 15);
    baseStats.diplomacy = Math.min(100, baseStats.diplomacy + 10);
  }

  const skills = [];
  const skillCategories = Object.keys(SKILLS);
  const numSkills = randInt(1, 4);
  for (let i = 0; i < numSkills; i++) {
    const cat = rand(skillCategories);
    skills.push({ category: cat, name: rand(SKILLS[cat]), level: randInt(1, 10) });
  }

  return {
    id,
    name,
    title,
    gender,
    nation: nationId,
    rank,
    age: rank === 'ruler' ? randInt(25, 55) : randInt(16, 60),
    traits: [trait1, trait2],
    stats: baseStats,
    skills,
    portrait: `${gender}_${nationId}_${randInt(1, 5)}`,
    relation: 0, // -100 to 100
    recruited: false,
    location: null,
    quests: [],
    dialogue: generateDialogue(gender, rank, trait1)
  };
}

function generateDialogue(gender, rank, trait) {
  const greetings = {
    female: ['阁下有礼了。', '远道而来，辛苦了。', '妾身这厢有礼。', '有何贵干？', '请坐，慢慢说。'],
    male: ['来者何人？', '有失远迎。', '请进请进。', '正好，我正有事要说。', '嗯，说吧。']
  };
  const rankGreetings = {
    ruler: ['欢迎来到寡人的国度。', '你就是那个传闻中的人物？', '寡人很忙，有话快说。'],
    general: ['军务繁忙，长话短说。', '你是来投军的？', '兵者，国之大事。'],
    minister: ['商路近来如何？', '有什么好消息？', '且坐下细谈。']
  };
  
  let lines = [...(greetings[gender] || greetings.female)];
  if (rankGreetings[rank]) lines.push(...rankGreetings[rank]);
  return lines;
}

/**
 * Generate all characters for the game
 * Returns an object with character IDs as keys
 */
export function generateAllCharacters() {
  const characters = {};
  let charId = 1;

  // For each nation, generate characters
  // Distribution: ~30 per nation = ~1020 total
  // Female ratio: 2/3+ overall
  NATION_IDS.forEach(nationId => {
    const isAllFemale = nationId === 'amazons' || nationId === 'xiliang';
    
    // Ruler (1 per nation)
    const rulerGender = isAllFemale ? 'female' : (Math.random() < 0.5 ? 'female' : 'male');
    const ruler = generateCharacter(`char_${nationId}_001`, nationId, rulerGender, 'ruler');
    ruler.stats = {
      military: randInt(50, 95),
      economy: randInt(50, 95),
      diplomacy: randInt(50, 95),
      culture: randInt(50, 95),
      charisma: randInt(60, 95),
      loyalty: 100
    };
    characters[ruler.id] = ruler;
    charId++;

    // Generals (3-5 per nation)
    const numGenerals = randInt(3, 5);
    for (let i = 0; i < numGenerals; i++) {
      const gender = isAllFemale ? 'female' : (Math.random() < 0.6 ? 'female' : 'male');
      const ch = generateCharacter(`char_${nationId}_${String(charId).padStart(3,'0')}`, nationId, gender, 'general');
      ch.stats.military = Math.min(100, ch.stats.military + randInt(10, 25));
      characters[ch.id] = ch;
      charId++;
    }

    // Ministers (2-4 per nation)
    const numMinisters = randInt(2, 4);
    for (let i = 0; i < numMinisters; i++) {
      const gender = isAllFemale ? 'female' : (Math.random() < 0.65 ? 'female' : 'male');
      const ch = generateCharacter(`char_${nationId}_${String(charId).padStart(3,'0')}`, nationId, gender, 'minister');
      ch.stats.economy = Math.min(100, ch.stats.economy + randInt(10, 20));
      ch.stats.diplomacy = Math.min(100, ch.stats.diplomacy + randInt(5, 15));
      characters[ch.id] = ch;
      charId++;
    }

    // Regular characters (20-25 per nation, 70%+ female)
    const numRegular = randInt(20, 25);
    for (let i = 0; i < numRegular; i++) {
      const gender = isAllFemale ? 'female' : (Math.random() < 0.72 ? 'female' : 'male');
      const rank = rand(['warrior','merchant','scholar','artisan','priest','spy','diplomat','scout','healer','entertainer']);
      const ch = generateCharacter(`char_${nationId}_${String(charId).padStart(3,'0')}`, nationId, gender, rank);
      characters[ch.id] = ch;
      charId++;
    }
  });

  // Special story characters (player companions, rivals, etc.)
  const specialChars = [
    { name: '丝路行者', title: '主角', gender: 'male', nation: 'loulan', rank: 'wanderer',
      traits: ['坚韧', '聪慧'], stats: { military: 40, economy: 30, diplomacy: 35, culture: 30, charisma: 50, loyalty: 100 },
      isPlayer: true },
    { name: '月牙儿', title: '楼兰公主', gender: 'female', nation: 'loulan', rank: 'princess',
      traits: ['聪慧', '温柔'], stats: { military: 35, economy: 60, diplomacy: 80, culture: 85, charisma: 90, loyalty: 70 } },
    { name: '铁木兰', title: '阿玛宗女王', gender: 'female', nation: 'amazons', rank: 'ruler',
      traits: ['勇猛', '刚毅'], stats: { military: 98, economy: 35, diplomacy: 25, culture: 55, charisma: 85, loyalty: 100 } },
    { name: '织梦娘', title: '西梁女王', gender: 'female', nation: 'xiliang', rank: 'ruler',
      traits: ['仁慈', '聪慧'], stats: { military: 30, economy: 85, diplomacy: 90, culture: 98, charisma: 95, loyalty: 100 } },
    { name: '玉玲珑', title: '于阗玉圣', gender: 'female', nation: 'khotan', rank: 'artisan',
      traits: ['灵巧', '坚韧'], stats: { military: 20, economy: 80, diplomacy: 65, culture: 90, charisma: 75, loyalty: 50 } },
    { name: '飞天舞', title: '龟兹乐圣', gender: 'female', nation: 'kucha', rank: 'entertainer',
      traits: ['热情', '聪慧'], stats: { military: 15, economy: 55, diplomacy: 75, culture: 98, charisma: 95, loyalty: 45 } },
    { name: '银狐', title: '粟特商王', gender: 'female', nation: 'soche', rank: 'merchant',
      traits: ['圆滑', '慷慨'], stats: { military: 25, economy: 98, diplomacy: 85, culture: 60, charisma: 80, loyalty: 30 } },
    { name: '天山雪', title: '乌孙公主', gender: 'female', nation: 'wusun', rank: 'princess',
      traits: ['勇猛', '正直'], stats: { military: 85, economy: 40, diplomacy: 55, culture: 45, charisma: 80, loyalty: 60 } },
    { name: '沙漠狐', title: '楼兰将军', gender: 'female', nation: 'loulan', rank: 'general',
      traits: ['智谋', '冷酷'], stats: { military: 88, economy: 50, diplomacy: 45, culture: 35, charisma: 65, loyalty: 55 } },
    { name: '紫霞仙', title: '高昌法师', gender: 'female', nation: 'karakhoja', rank: 'priest',
      traits: ['神秘', '温柔'], stats: { military: 30, economy: 45, diplomacy: 70, culture: 95, charisma: 85, loyalty: 65 } },
    { name: '金刀', title: '莎车刀王', gender: 'female', nation: 'yarkand', rank: 'artisan',
      traits: ['刚毅', '豪爽'], stats: { military: 75, economy: 60, diplomacy: 40, culture: 70, charisma: 60, loyalty: 50 } },
    { name: '碧眼狐', title: '疏勒商后', gender: 'female', nation: 'kashgar', rank: 'merchant',
      traits: ['圆滑', '智谋'], stats: { military: 30, economy: 92, diplomacy: 80, culture: 55, charisma: 75, loyalty: 35 } },
    { name: '红莲', title: '火焰舞者', gender: 'female', nation: 'karakhoja', rank: 'entertainer',
      traits: ['热情', '叛逆'], stats: { military: 45, economy: 40, diplomacy: 60, culture: 90, charisma: 88, loyalty: 25 } },
    { name: '白鹿', title: '精绝祭司', gender: 'female', nation: 'niya', rank: 'priest',
      traits: ['神秘', '聪慧'], stats: { military: 20, economy: 35, diplomacy: 55, culture: 92, charisma: 78, loyalty: 70 } },
    { name: '黑鹰', title: '突骑施首领', gender: 'female', nation: 'tokuz', rank: 'general',
      traits: ['勇猛', '冷酷'], stats: { military: 92, economy: 25, diplomacy: 20, culture: 25, charisma: 55, loyalty: 40 } },
    { name: '青鸾', title: '西梁贵妃', gender: 'female', nation: 'xiliang', rank: 'minister',
      traits: ['温柔', '智谋'], stats: { military: 15, economy: 75, diplomacy: 88, culture: 85, charisma: 90, loyalty: 85 } },
    { name: '烈焰', title: '阿玛宗先锋', gender: 'female', nation: 'amazons', rank: 'general',
      traits: ['勇猛', '鲁莽'], stats: { military: 95, economy: 15, diplomacy: 10, culture: 30, charisma: 60, loyalty: 75 } },
    { name: '寒星', title: '阿玛宗斥候', gender: 'female', nation: 'amazons', rank: 'scout',
      traits: ['谨慎', '聪慧'], stats: { military: 80, economy: 20, diplomacy: 30, culture: 40, charisma: 55, loyalty: 80 } },
    { name: '流云', title: '西梁织女', gender: 'female', nation: 'xiliang', rank: 'artisan',
      traits: ['灵巧', '温柔'], stats: { military: 5, economy: 70, diplomacy: 55, culture: 90, charisma: 75, loyalty: 90 } },
    { name: '春华', title: '西梁医圣', gender: 'female', nation: 'xiliang', rank: 'healer',
      traits: ['仁慈', '聪慧'], stats: { military: 5, economy: 50, diplomacy: 65, culture: 95, charisma: 80, loyalty: 95 } },
  ];

  specialChars.forEach((sc, i) => {
    const id = `char_special_${String(i+1).padStart(3,'0')}`;
    characters[id] = {
      id,
      ...sc,
      age: sc.rank === 'ruler' ? randInt(25, 50) : randInt(18, 45),
      skills: [],
      portrait: `${sc.gender}_${sc.nation}_${randInt(1,5)}`,
      relation: sc.isPlayer ? 100 : 0,
      recruited: sc.isPlayer || false,
      location: null,
      quests: [],
      dialogue: generateDialogue(sc.gender, sc.rank, sc.traits[0]),
      isSpecial: true
    };
  });

  return characters;
}

/**
 * Get character count stats
 */
export function getCharacterStats(characters) {
  const total = Object.keys(characters).length;
  const female = Object.values(characters).filter(c => c.gender === 'female').length;
  const male = total - female;
  return { total, female, male, femaleRatio: (female/total*100).toFixed(1) };
}

export { NATION_IDS };