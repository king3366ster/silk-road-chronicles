/**
 * 六大帝国 - Major Powers (External Influences)
 * Unified with worldData INFLUENCE_ZONES
 */
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
  kushan: {
    id: 'kushan', name: '贵霜', nameEn: 'Kushan Empire',
    description: '中亚的贸易帝国，控制丝路中段。佛教东传的重要媒介，文化多元包容。',
    color: '#DAA520', emblem: '🐘',
    influence: 75, military: 75, economy: 85, diplomacy: 80, culture: 88,
    specialSkill: { name: '丝路商道', desc: '贸易垄断，文化输出，宗教传播' },
    historicalFigures: [
      { name: '迦腻色伽一世', title: '转轮圣王', desc: '贵霜帝国最伟大的君主', gender: 'male', stats: { military: 80, economy: 85, diplomacy: 85, culture: 90, charisma: 82 } },
      { name: '摩诃罗阇', title: '商王', desc: '掌控丝路中段贸易的贵霜商人王', gender: 'male', stats: { military: 55, economy: 95, diplomacy: 80, culture: 70, charisma: 75 } },
      { name: '须跋陀罗', title: '佛商', desc: '传播佛教的女商人', gender: 'female', stats: { military: 20, economy: 88, diplomacy: 85, culture: 92, charisma: 88 } },
      { name: '提婆菩萨', title: '女学者', desc: '贵霜著名女学者，精通梵文', gender: 'female', stats: { military: 15, economy: 60, diplomacy: 75, culture: 98, charisma: 85 } }
    ],
    attitude: 'commercial'
  },
  parthia: {
    id: 'parthia', name: '安息', nameEn: 'Parthian Empire',
    description: '波斯的继承者，丝路西段的控制者。以骑兵和贸易闻名，与罗马争雄。',
    color: '#4B0082', emblem: '🦁',
    influence: 70, military: 82, economy: 80, diplomacy: 70, culture: 82,
    specialSkill: { name: '万王之王', desc: '文化输出，贸易垄断，骑兵冲锋' },
    historicalFigures: [
      { name: '米特里达梯二世', title: '大王', desc: '安息帝国的中兴之主', gender: 'male', stats: { military: 88, economy: 80, diplomacy: 75, culture: 78, charisma: 80 } },
      { name: '罗兰娜', title: '丝路玫瑰', desc: '波斯女商人，掌控丝路西段贸易', gender: 'female', stats: { military: 30, economy: 95, diplomacy: 85, culture: 80, charisma: 92 } },
      { name: '萨珊公主', title: '翡翠之眼', desc: '波斯公主，精通宝石鉴定', gender: 'female', stats: { military: 25, economy: 80, diplomacy: 90, culture: 92, charisma: 95 } },
      { name: '琐罗亚斯德', title: '先知', desc: '拜火教创始人', gender: 'male', stats: { military: 10, economy: 50, diplomacy: 70, culture: 99, charisma: 85 } }
    ],
    attitude: 'commercial'
  },
  rome: {
    id: 'rome', name: '罗马', nameEn: 'Roman Empire',
    description: '地中海的霸主，军事实力强大。对东方的丝绸和香料有着巨大需求。',
    color: '#9B2335', emblem: '🏛️',
    influence: 60, military: 92, economy: 88, diplomacy: 65, culture: 85,
    specialSkill: { name: '罗马和平', desc: '军事征服，道路建设，法律输出' },
    historicalFigures: [
      { name: '凯撒', title: '独裁者', desc: '罗马共和国末期的独裁者', gender: 'male', stats: { military: 95, economy: 80, diplomacy: 75, culture: 80, charisma: 90 } },
      { name: '克娄巴特拉', title: '埃及艳后', desc: '托勒密王朝末代女法老', gender: 'female', stats: { military: 40, economy: 85, diplomacy: 98, culture: 90, charisma: 99 } },
      { name: '莉薇娅', title: '奥古斯都之妻', desc: '罗马帝国第一夫人', gender: 'female', stats: { military: 30, economy: 75, diplomacy: 90, culture: 85, charisma: 88 } }
    ],
    attitude: 'expansionist'
  },
  sassanid: {
    id: 'sassanid', name: '萨珊波斯', nameEn: 'Sassanid Empire',
    description: '继安息而起的新波斯帝国，拜火教为国教。与罗马帝国争雄数百年，控制丝路西端。',
    color: '#8B008B', emblem: '🔥',
    influence: 65, military: 85, economy: 82, diplomacy: 60, culture: 88,
    specialSkill: { name: '圣火不灭', desc: '拜火教信仰加成，重装骑兵冲锋' },
    historicalFigures: [
      { name: '沙普尔一世', title: '万王之王', desc: '击败罗马皇帝的波斯雄主', gender: 'male', stats: { military: 92, economy: 78, diplomacy: 65, culture: 80, charisma: 82 } },
      { name: '阿扎尔', title: '圣火女祭司', desc: '拜火教最高女祭司', gender: 'female', stats: { military: 35, economy: 60, diplomacy: 80, culture: 95, charisma: 90 } },
      { name: '法拉', title: '丝路明珠', desc: '萨珊著名女商人', gender: 'female', stats: { military: 20, economy: 92, diplomacy: 88, culture: 78, charisma: 93 } },
      { name: '巴赫拉姆', title: '猎狮王', desc: '以猎狮闻名的波斯勇士', gender: 'male', stats: { military: 90, economy: 55, diplomacy: 50, culture: 65, charisma: 78 } }
    ],
    attitude: 'aggressive'
  }
};