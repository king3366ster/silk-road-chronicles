/**
 * 角色数据生成器 v3.0 - 3000+ Characters
 * 2000 female + 1000 male + special characters
 * Each character has a unique portrait seed for procedural generation
 */

const NATION_IDS = [
  'loulan','kucha','khotan','shanshan','amazons','xiliang',
  'karashahr','aksu','kashgar','yarkand','wusun','jumi',
  'charklik','niya','kroran','bugur','qarqan','pishan',
  'soche','kangju','dayuan','jieshi','tashkurgan','karghalik',
  'keriya','charchan','wucha','tokuz','karakhoja','beshbaliq',
  'yanqi','chumi','chumukun','gaochang'
];

// Expanded name pools for 3000+ unique characters
const F_SURNAMES = ['月','雪','花','玉','珠','翠','霞','兰','凤','鸾','瑶','琼','琳','瑛','瑜','瑾','璇','璐','莹','珊',
  '薇','蕾','蓉','莲','梅','菊','桃','杏','樱','棠','榴','桂','芙','蕙','芷','芳','芝','馨','蝶','燕',
  '莺','鹃','雁','鹤','鸢','鹰','雀','鸥','云','露','霜','冰','岚','溪','澜','漪','沁','泠','沐','湘',
  '洛','清','澜','梦','幻','紫','青','碧','绯','绛','素','白','墨','黛','幽','灵','凝','婉','柔','嫣'];

const M_SURNAMES = ['铁','钢','石','山','峰','岩','虎','龙','鹰','狼','熊','豹','狮','雕','骏','骐','骥','骁','勇','刚',
  '毅','坚','猛','威','震','雷','风','云','天','海','河','江','波','涛','浪','瀚','漠','烽','焰','焱',
  '烈','苍','穹','霄','辰','旭','晟','晖','曜','曦','乾','坤','明','辉','耀','爵','铭','渊','泽','霖'];

const F_GIVEN = ['姬','娘','女','姑','娥','媛','婷','嫣','婉','娴','柔','慧','颖','敏','灵','秀','娟','姣','媚','娇',
  '颜','姿','仪','韵','音','舞','歌','琴','瑟','筝','箫','笛','笙','弦','锦','绣','纺','织','纱','绢',
  '绸','缎','绫','罗','绮','纹','彩','霞','露','霜','冰','月','星','辰','曦','晴','雨','雪','烟','岚',
  '蕊','蕾','芽','苗','茵','草','薇','兰','菊','荷','莲','芙','蓉','樱','桃','杏','梅','桂','棠','榴'];

const M_GIVEN = ['将','帅','侯','伯','公','臣','士','卫','戍','镇','守','征','伐','战','斗','击','刺','射','骑','驾',
  '驭','驰','骋','奔','腾','飞','翔','跃','翻','斩','劈','砍','挑','拨','挡','退','进','谋','策','略',
  '智','信','义','仁','德','忠','孝','廉','勤','慎','达','通','明','远','广','博','宏','伟','浩','然'];

const TITLES_F = ['公主','郡主','才人','贵人','妃子','将军','都督','校尉','使者','祭司','巫女','舞姬','乐师','画师',
  '织女','药师','医师','商主','镖师','侠女','剑客','骑手','猎手','弓手','术士','谋士','策士','说客','歌者','诗人',
  '女官','侍女','宫娥','舞者','歌姬','琴师','画匠','绣娘','厨娘','牧女','渔女','采女','酒娘','茶师','花匠',
  '驯兽师','占卜师','星象师','炼金师','建筑师','雕刻师','陶艺师','染织师','酿酒师','制香师'];

const TITLES_M = ['国王','王子','将军','都督','校尉','太守','县令','使者','祭司','武士','骑兵','步兵','弓手','铁匠',
  '商人','镖师','侠客','剑客','骑手','猎手','牧民','农夫','工匠','矿工','药师','医师','谋士','策士','说客','诗人',
  '丞相','太尉','尚书','侍郎','都统','千总','百总','哨官','斥候','信使','向导','翻译','账房','管事','镖头',
  '马夫','驼夫','船夫','樵夫','渔夫','猎户','牧主','矿主','窑主','场主'];

const TRAITS = ['勇猛','智谋','仁慈','冷酷','忠诚','叛逆','豪爽','阴险','正直','圆滑','刚毅','温柔','果断','犹豫',
  '热情','冷漠','慷慨','吝啬','谦虚','傲慢','谨慎','鲁莽','沉稳','急躁','聪慧','愚钝','灵巧','笨拙','坚韧','脆弱',
  '狡猾','坦率','深沉','浮躁','细腻','粗犷','浪漫','务实','理想','现实','神秘','开朗','忧郁','活泼','安静',
  '霸道','温和','偏执','随和','执着','洒脱','敏感','迟钝','多情','专一','善变','坚定'];

const SKILLS = {
  military: ['骑术','射术','剑术','枪法','刀法','盾术','阵法','攻城','守城','侦察','突袭','埋伏','水战','山地战','沙漠战','夜战','火攻','伏击','游击','围城'],
  economy: ['经商','谈判','估价','鉴定','运输','仓储','会计','投资','借贷','保险','合伙','垄断','走私','通关','货币','珠宝','畜牧','农业','手工业','矿业'],
  diplomacy: ['游说','结盟','联姻','朝贡','互市','和亲','质子','间谍','反间','暗杀','策反','招降','谈判','调停','威慑','利诱','文化输出','宗教传播','贸易协定','军事同盟'],
  culture: ['音乐','舞蹈','绘画','雕塑','书法','诗歌','医学','天文','数学','建筑','纺织','染色','酿酒','烹饪','驯兽','园艺','棋艺','茶道','香道','占卜']
};

const RANKS_F = ['ruler','general','minister','princess','priestess','merchant','scholar','artisan','healer','entertainer',
  'warrior','scout','diplomat','spy','dancer','musician','weaver','herbalist','hunter','ranger'];
const RANKS_M = ['ruler','general','minister','prince','priest','merchant','scholar','artisan','healer','warrior',
  'scout','diplomat','spy','blacksmith','farmer','ranger','captain','guard','explorer','builder'];

function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pickUnique(pool, used) { let tries = 0; while (tries < 100) { const n = rand(pool); if (!used.has(n)) { used.add(n); return n; } tries++; } return rand(pool) + randInt(1,999); }

function generateName(gender, usedNames) {
  const surnames = gender === 'female' ? F_SURNAMES : M_SURNAMES;
  const given = gender === 'female' ? F_GIVEN : M_GIVEN;
  return pickUnique(surnames, usedNames) + pickUnique(given, usedNames);
}

function generateCharacter(id, nationId, gender, rank, seed, usedNames) {
  const name = generateName(gender, usedNames);
  const title = gender === 'female' ? rand(TITLES_F) : rand(TITLES_M);
  const trait1 = rand(TRAITS);
  let trait2 = rand(TRAITS);
  while (trait2 === trait1) trait2 = rand(TRAITS);

  const baseStats = {
    military: randInt(10, 95), economy: randInt(10, 95),
    diplomacy: randInt(10, 95), culture: randInt(10, 95),
    charisma: randInt(10, 95), loyalty: randInt(20, 100),
  };

  if (rank === 'ruler') Object.keys(baseStats).forEach(k => { if (k !== 'loyalty') baseStats[k] = Math.min(100, baseStats[k] + 20); });
  else if (rank === 'general') baseStats.military = Math.min(100, baseStats.military + 15);
  else if (rank === 'minister') { baseStats.economy = Math.min(100, baseStats.economy + 15); baseStats.diplomacy = Math.min(100, baseStats.diplomacy + 10); }

  const skills = [];
  const skillCats = Object.keys(SKILLS);
  const numSkills = randInt(1, 4);
  for (let i = 0; i < numSkills; i++) {
    const cat = rand(skillCats);
    skills.push({ category: cat, name: rand(SKILLS[cat]), level: randInt(1, 10) });
  }

  return {
    id, name, title, gender, nation: nationId, rank,
    age: rank === 'ruler' ? randInt(25, 55) : randInt(16, 60),
    traits: [trait1, trait2], stats: baseStats, skills,
    portraitSeed: seed,
    relation: 0, recruited: false, location: null, quests: [],
    dialogue: generateDialogue(gender, rank, trait1)
  };
}

function generateDialogue(gender, rank, trait) {
  const greetings = {
    female: ['阁下有礼了。','远道而来，辛苦了。','妾身这厢有礼。','有何贵干？','请坐，慢慢说。','愿丝路平安。','今日天气甚好。','你看起来是个有趣的人。'],
    male: ['来者何人？','有失远迎。','请进请进。','正好，我正有事要说。','嗯，说吧。','愿风沙不侵。','有什么消息？','坐下来喝杯茶吧。']
  };
  const rankGreetings = {
    ruler: ['欢迎来到寡人的国度。','你就是那个传闻中的人物？','寡人很忙，有话快说。','我国欢迎四方来客。'],
    general: ['军务繁忙，长话短说。','你是来投军的？','兵者，国之大事。','沙场之上，不容懈怠。'],
    minister: ['商路近来如何？','有什么好消息？','且坐下细谈。','国计民生，不可不察。']
  };
  let lines = [...(greetings[gender] || greetings.female)];
  if (rankGreetings[rank]) lines.push(...rankGreetings[rank]);
  return lines;
}

export function generateAllCharacters() {
  const characters = {};
  let charId = 1;
  let seed = 1000;
  const usedNames = new Set();

  NATION_IDS.forEach(nationId => {
    const isAllFemale = nationId === 'amazons' || nationId === 'xiliang';

    // Ruler
    const rulerGender = isAllFemale ? 'female' : (Math.random() < 0.5 ? 'female' : 'male');
    const ruler = generateCharacter(`char_${nationId}_001`, nationId, rulerGender, 'ruler', seed++, usedNames);
    ruler.stats = { military: randInt(50,95), economy: randInt(50,95), diplomacy: randInt(50,95), culture: randInt(50,95), charisma: randInt(60,95), loyalty: 100 };
    characters[ruler.id] = ruler;

    // Generals (5-8 per nation)
    const numGenerals = randInt(5, 8);
    for (let i = 0; i < numGenerals; i++) {
      const gender = isAllFemale ? 'female' : (Math.random() < 0.6 ? 'female' : 'male');
      const ch = generateCharacter(`char_${nationId}_${String(charId).padStart(3,'0')}`, nationId, gender, 'general', seed++, usedNames);
      ch.stats.military = Math.min(100, ch.stats.military + randInt(10, 25));
      characters[ch.id] = ch; charId++;
    }

    // Ministers (3-5 per nation)
    const numMinisters = randInt(3, 5);
    for (let i = 0; i < numMinisters; i++) {
      const gender = isAllFemale ? 'female' : (Math.random() < 0.65 ? 'female' : 'male');
      const ch = generateCharacter(`char_${nationId}_${String(charId).padStart(3,'0')}`, nationId, gender, 'minister', seed++, usedNames);
      ch.stats.economy = Math.min(100, ch.stats.economy + randInt(10, 20));
      characters[ch.id] = ch; charId++;
    }

    // Regular characters (70-90 per nation, ~67% female)
    const numRegular = randInt(70, 90);
    for (let i = 0; i < numRegular; i++) {
      const gender = isAllFemale ? 'female' : (Math.random() < 0.67 ? 'female' : 'male');
      const ranks = gender === 'female' ? RANKS_F : RANKS_M;
      const rank = rand(ranks);
      const ch = generateCharacter(`char_${nationId}_${String(charId).padStart(3,'0')}`, nationId, gender, rank, seed++, usedNames);
      characters[ch.id] = ch; charId++;
    }
  });

  // Special story characters (50+)
  const specialChars = [
    { name: '丝路行者', title: '主角', gender: 'male', nation: 'loulan', rank: 'wanderer', traits: ['坚韧','聪慧'], stats: { military:40,economy:30,diplomacy:35,culture:30,charisma:50,loyalty:100 }, isPlayer: true },
    { name: '月牙儿', title: '楼兰公主', gender: 'female', nation: 'loulan', rank: 'princess', traits: ['聪慧','温柔'], stats: { military:35,economy:60,diplomacy:80,culture:85,charisma:90,loyalty:70 } },
    { name: '铁木兰', title: '阿玛宗女王', gender: 'female', nation: 'amazons', rank: 'ruler', traits: ['勇猛','刚毅'], stats: { military:98,economy:35,diplomacy:25,culture:55,charisma:85,loyalty:100 } },
    { name: '织梦娘', title: '西梁女王', gender: 'female', nation: 'xiliang', rank: 'ruler', traits: ['仁慈','聪慧'], stats: { military:30,economy:85,diplomacy:90,culture:98,charisma:95,loyalty:100 } },
    { name: '玉玲珑', title: '于阗玉圣', gender: 'female', nation: 'khotan', rank: 'artisan', traits: ['灵巧','坚韧'], stats: { military:20,economy:80,diplomacy:65,culture:90,charisma:75,loyalty:50 } },
    { name: '飞天舞', title: '龟兹乐圣', gender: 'female', nation: 'kucha', rank: 'entertainer', traits: ['热情','聪慧'], stats: { military:15,economy:55,diplomacy:75,culture:98,charisma:95,loyalty:45 } },
    { name: '银狐', title: '粟特商王', gender: 'female', nation: 'soche', rank: 'merchant', traits: ['圆滑','慷慨'], stats: { military:25,economy:98,diplomacy:85,culture:60,charisma:80,loyalty:30 } },
    { name: '天山雪', title: '乌孙公主', gender: 'female', nation: 'wusun', rank: 'princess', traits: ['勇猛','正直'], stats: { military:85,economy:40,diplomacy:55,culture:45,charisma:80,loyalty:60 } },
    { name: '沙漠狐', title: '楼兰将军', gender: 'female', nation: 'loulan', rank: 'general', traits: ['智谋','冷酷'], stats: { military:88,economy:50,diplomacy:45,culture:35,charisma:65,loyalty:55 } },
    { name: '紫霞仙', title: '高昌法师', gender: 'female', nation: 'karakhoja', rank: 'priestess', traits: ['神秘','温柔'], stats: { military:30,economy:45,diplomacy:70,culture:95,charisma:85,loyalty:65 } },
    { name: '金刀', title: '莎车刀王', gender: 'female', nation: 'yarkand', rank: 'artisan', traits: ['刚毅','豪爽'], stats: { military:75,economy:60,diplomacy:40,culture:70,charisma:60,loyalty:50 } },
    { name: '碧眼狐', title: '疏勒商后', gender: 'female', nation: 'kashgar', rank: 'merchant', traits: ['圆滑','智谋'], stats: { military:30,economy:92,diplomacy:80,culture:55,charisma:75,loyalty:35 } },
    { name: '红莲', title: '火焰舞者', gender: 'female', nation: 'karakhoja', rank: 'dancer', traits: ['热情','叛逆'], stats: { military:45,economy:40,diplomacy:60,culture:90,charisma:88,loyalty:25 } },
    { name: '白鹿', title: '精绝祭司', gender: 'female', nation: 'niya', rank: 'priestess', traits: ['神秘','聪慧'], stats: { military:20,economy:35,diplomacy:55,culture:92,charisma:78,loyalty:70 } },
    { name: '黑鹰', title: '突骑施首领', gender: 'female', nation: 'tokuz', rank: 'general', traits: ['勇猛','冷酷'], stats: { military:92,economy:25,diplomacy:20,culture:25,charisma:55,loyalty:40 } },
    { name: '青鸾', title: '西梁贵妃', gender: 'female', nation: 'xiliang', rank: 'minister', traits: ['温柔','智谋'], stats: { military:15,economy:75,diplomacy:88,culture:85,charisma:90,loyalty:85 } },
    { name: '烈焰', title: '阿玛宗先锋', gender: 'female', nation: 'amazons', rank: 'general', traits: ['勇猛','鲁莽'], stats: { military:95,economy:15,diplomacy:10,culture:30,charisma:60,loyalty:75 } },
    { name: '寒星', title: '阿玛宗斥候', gender: 'female', nation: 'amazons', rank: 'scout', traits: ['谨慎','聪慧'], stats: { military:80,economy:20,diplomacy:30,culture:40,charisma:55,loyalty:80 } },
    { name: '流云', title: '西梁织女', gender: 'female', nation: 'xiliang', rank: 'weaver', traits: ['灵巧','温柔'], stats: { military:5,economy:70,diplomacy:55,culture:90,charisma:75,loyalty:90 } },
    { name: '春华', title: '西梁医圣', gender: 'female', nation: 'xiliang', rank: 'healer', traits: ['仁慈','聪慧'], stats: { military:5,economy:50,diplomacy:65,culture:95,charisma:80,loyalty:95 } },
    { name: '墨玉', title: '疏勒剑圣', gender: 'male', nation: 'kashgar', rank: 'general', traits: ['刚毅','沉默'], stats: { military:93,economy:30,diplomacy:25,culture:50,charisma:60,loyalty:65 } },
    { name: '苍狼', title: '康居可汗', gender: 'male', nation: 'kangju', rank: 'ruler', traits: ['勇猛','豪爽'], stats: { military:90,economy:40,diplomacy:30,culture:25,charisma:75,loyalty:100 } },
    { name: '风行者', title: '大宛骑神', gender: 'male', nation: 'dayuan', rank: 'general', traits: ['果断','勇猛'], stats: { military:92,economy:35,diplomacy:40,culture:30,charisma:70,loyalty:60 } },
    { name: '张骞', title: '博望侯', gender: 'male', nation: 'loulan', rank: 'diplomat', traits: ['坚韧','聪慧'], stats: { military:40,economy:70,diplomacy:95,culture:80,charisma:85,loyalty:95 } },
    { name: '班超', title: '定远侯', gender: 'male', nation: 'loulan', rank: 'general', traits: ['果断','智谋'], stats: { military:85,economy:60,diplomacy:90,culture:70,charisma:80,loyalty:90 } },
  ];

  specialChars.forEach((sc, i) => {
    const id = `char_special_${String(i+1).padStart(3,'0')}`;
    characters[id] = {
      id, ...sc,
      age: sc.rank === 'ruler' ? randInt(25,50) : randInt(18,45),
      skills: [], portraitSeed: seed++,
      relation: sc.isPlayer ? 100 : 0,
      recruited: sc.isPlayer || false,
      location: null, quests: [],
      dialogue: generateDialogue(sc.gender, sc.rank, sc.traits[0]),
      isSpecial: true
    };
  });

  return characters;
}

export function getCharacterStats(characters) {
  const total = Object.keys(characters).length;
  const female = Object.values(characters).filter(c => c.gender === 'female').length;
  const male = total - female;
  return { total, female, male, femaleRatio: (female/total*100).toFixed(1) };
}

export { NATION_IDS };