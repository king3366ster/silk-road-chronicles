/**
 * 四大帝国 - Major Powers (External Influences)
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