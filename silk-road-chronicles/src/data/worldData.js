/**
 * World Data - 5 Major Powers, 36 City-States, 108 Tribes
 * Resources: wood, ore, slaves, recruitment, garrisons
 */

// ===== 108 TRIBES (3-5 per city-state) =====
export const TRIBES_FULL = [
  // 楼兰 (4 tribes)
  { id:'t_001', name:'盐泽部落', x:52, y:42, nation:'loulan', pop:800, res:{food:20,salt:15}, troops:50, type:'settled' },
  { id:'t_002', name:'流沙部落', x:58, y:48, nation:'loulan', pop:600, res:{food:10,sand_pearl:10}, troops:30, type:'nomadic' },
  { id:'t_003', name:'罗布部落', x:50, y:50, nation:'loulan', pop:900, res:{fish:25,salt:20}, troops:60, type:'settled' },
  { id:'t_004', name:'玉门部落', x:56, y:44, nation:'loulan', pop:500, res:{jade:10,food:10}, troops:40, type:'settled' },
  // 龟兹 (5 tribes)
  { id:'t_005', name:'千佛部落', x:32, y:32, nation:'kucha', pop:1200, res:{incense:20,cotton:15}, troops:80, type:'settled' },
  { id:'t_006', name:'乐舞部落', x:38, y:38, nation:'kucha', pop:1000, res:{silk:15,food:20}, troops:50, type:'settled' },
  { id:'t_007', name:'石窟部落', x:33, y:37, nation:'kucha', pop:700, res:{stone:25,ore:10}, troops:40, type:'settled' },
  { id:'t_008', name:'铁器部落', x:36, y:33, nation:'kucha', pop:600, res:{iron:20,coal:15}, troops:70, type:'settled' },
  { id:'t_009', name:'葡萄部落', x:37, y:36, nation:'kucha', pop:800, res:{wine:25,food:15}, troops:30, type:'settled' },
  // 于阗 (4 tribes)
  { id:'t_010', name:'玉石部落', x:22, y:58, nation:'khotan', pop:1100, res:{jade:30,gold:10}, troops:60, type:'settled' },
  { id:'t_011', name:'河畔部落', x:28, y:62, nation:'khotan', pop:900, res:{food:25,cotton:15}, troops:50, type:'settled' },
  { id:'t_012', name:'织锦部落', x:27, y:56, nation:'khotan', pop:800, res:{silk:20,dye:15}, troops:40, type:'settled' },
  { id:'t_013', name:'矿工部落', x:24, y:60, nation:'khotan', pop:600, res:{jade:15,ore:20}, troops:50, type:'settled' },
  // 鄯善 (3 tribes)
  { id:'t_014', name:'沙暴部落', x:62, y:52, nation:'shanshan', pop:700, res:{food:15,horse:10}, troops:60, type:'nomadic' },
  { id:'t_015', name:'驿站部落', x:60, y:48, nation:'shanshan', pop:500, res:{food:10,camel:15}, troops:30, type:'settled' },
  { id:'t_016', name:'烽火部落', x:64, y:50, nation:'shanshan', pop:400, res:{wood:10,stone:10}, troops:50, type:'settled' },
  // 乌孙 (5 tribes)
  { id:'t_017', name:'天马部落', x:48, y:12, nation:'wusun', pop:2000, res:{horse:40,leather:20}, troops:200, type:'nomadic' },
  { id:'t_018', name:'草原部落', x:53, y:18, nation:'wusun', pop:1500, res:{horse:30,food:15}, troops:150, type:'nomadic' },
  { id:'t_019', name:'猎鹰部落', x:47, y:18, nation:'wusun', pop:800, res:{fur:20,horse:15}, troops:100, type:'nomadic' },
  { id:'t_020', name:'狼群部落', x:52, y:14, nation:'wusun', pop:1200, res:{horse:25,leather:15}, troops:180, type:'nomadic' },
  { id:'t_021', name:'雪原部落', x:50, y:10, nation:'wusun', pop:600, res:{fur:25,iron:10}, troops:80, type:'nomadic' },
  // 焉耆 (4 tribes)
  { id:'t_022', name:'铁山部落', x:42, y:28, nation:'karashahr', pop:900, res:{iron:30,coal:20}, troops:80, type:'settled' },
  { id:'t_023', name:'锻造部落', x:38, y:32, nation:'karashahr', pop:700, res:{iron:20,wood:15}, troops:60, type:'settled' },
  { id:'t_024', name:'矿脉部落', x:44, y:30, nation:'karashahr', pop:600, res:{ore:25,gold:5}, troops:50, type:'settled' },
  { id:'t_025', name:'铁匠部落', x:40, y:34, nation:'karashahr', pop:500, res:{iron:15,tools:20}, troops:40, type:'settled' },
  // 姑墨 (3 tribes)
  { id:'t_026', name:'葡萄部落', x:28, y:38, nation:'aksu', pop:800, res:{wine:30,food:15}, troops:30, type:'settled' },
  { id:'t_027', name:'酿酒部落', x:32, y:42, nation:'aksu', pop:600, res:{wine:25,water:20}, troops:20, type:'settled' },
  { id:'t_028', name:'果园部落', x:30, y:40, nation:'aksu', pop:700, res:{fruit:25,food:15}, troops:25, type:'settled' },
  // 疏勒 (4 tribes)
  { id:'t_029', name:'巴扎部落', x:18, y:33, nation:'kashgar', pop:1200, res:{silk:20,spice:20}, troops:60, type:'settled' },
  { id:'t_030', name:'织毯部落', x:12, y:38, nation:'kashgar', pop:800, res:{cotton:20,dye:15}, troops:40, type:'settled' },
  { id:'t_031', name:'商队部落', x:16, y:36, nation:'kashgar', pop:1000, res:{silk:15,spice:15}, troops:50, type:'nomadic' },
  { id:'t_032', name:'工匠部落', x:14, y:32, nation:'kashgar', pop:600, res:{tools:20,wood:10}, troops:30, type:'settled' },
  // 莎车 (3 tribes)
  { id:'t_033', name:'刀匠部落', x:18, y:52, nation:'yarkand', pop:700, res:{iron:20,steel:15}, troops:60, type:'settled' },
  { id:'t_034', name:'歌舞部落', x:22, y:58, nation:'yarkand', pop:600, res:{silk:15,food:15}, troops:30, type:'settled' },
  { id:'t_035', name:'铁矿部落', x:20, y:54, nation:'yarkand', pop:500, res:{iron:25,ore:15}, troops:50, type:'settled' },
  // 阿玛宗 (5 tribes - all female)
  { id:'t_036', name:'猎豹女族', x:72, y:22, nation:'amazons', pop:600, res:{horse:20,fur:15}, troops:120, type:'nomadic', female:true },
  { id:'t_037', name:'鹰翼女族', x:78, y:28, nation:'amazons', pop:500, res:{horse:15,iron:10}, troops:100, type:'nomadic', female:true },
  { id:'t_038', name:'烈焰女族', x:73, y:28, nation:'amazons', pop:700, res:{iron:15,horse:20}, troops:150, type:'nomadic', female:true },
  { id:'t_039', name:'月影女族', x:77, y:24, nation:'amazons', pop:400, res:{fur:20,gold:5}, troops:80, type:'nomadic', female:true },
  { id:'t_040', name:'战矛女族', x:75, y:26, nation:'amazons', pop:550, res:{iron:20,leather:15}, troops:130, type:'nomadic', female:true },
  // 西梁女国 (5 tribes - all female)
  { id:'t_041', name:'百花女族', x:12, y:38, nation:'xiliang', pop:800, res:{herb:25,silk:15}, troops:40, type:'settled', female:true },
  { id:'t_042', name:'织云女族', x:18, y:42, nation:'xiliang', pop:700, res:{silk:25,dye:15}, troops:30, type:'settled', female:true },
  { id:'t_043', name:'月泉女族', x:13, y:43, nation:'xiliang', pop:600, res:{herb:20,water:25}, troops:25, type:'settled', female:true },
  { id:'t_044', name:'丝语女族', x:17, y:38, nation:'xiliang', pop:750, res:{silk:20,cotton:15}, troops:35, type:'settled', female:true },
  { id:'t_045', name:'子母女族', x:15, y:44, nation:'xiliang', pop:900, res:{food:25,herb:20}, troops:30, type:'settled', female:true },
  // 扜弥 (3 tribes)
  { id:'t_046', name:'玉石部落', x:28, y:52, nation:'jumi', pop:500, res:{jade:20,food:10}, troops:20, type:'settled' },
  { id:'t_047', name:'葡萄部落', x:30, y:54, nation:'jumi', pop:400, res:{wine:20,food:10}, troops:15, type:'settled' },
  { id:'t_048', name:'织工部落', x:26, y:53, nation:'jumi', pop:350, res:{cotton:15,silk:10}, troops:10, type:'settled' },
  // 且末 (3 tribes)
  { id:'t_049', name:'织毯部落', x:42, y:52, nation:'charklik', pop:450, res:{cotton:15,dye:10}, troops:15, type:'settled' },
  { id:'t_050', name:'盐池部落', x:44, y:54, nation:'charklik', pop:350, res:{salt:20,food:10}, troops:10, type:'settled' },
  { id:'t_051', name:'玉工部落', x:40, y:53, nation:'charklik', pop:300, res:{jade:15,stone:10}, troops:10, type:'settled' },
  // 精绝 (3 tribes)
  { id:'t_052', name:'古墓部落', x:38, y:58, nation:'niya', pop:400, res:{relic:15,gold:10}, troops:20, type:'settled' },
  { id:'t_053', name:'沙海部落', x:36, y:60, nation:'niya', pop:300, res:{food:10,spice:10}, troops:10, type:'nomadic' },
  { id:'t_054', name:'遗迹部落', x:40, y:56, nation:'niya', pop:350, res:{relic:10,stone:15}, troops:15, type:'settled' },
  // 危须 (3 tribes)
  { id:'t_055', name:'渔盐部落', x:47, y:33, nation:'kroran', pop:500, res:{fish:25,salt:15}, troops:20, type:'settled' },
  { id:'t_056', name:'湖畔部落', x:45, y:35, nation:'kroran', pop:400, res:{fish:20,reed:15}, troops:15, type:'settled' },
  { id:'t_057', name:'水草部落', x:43, y:34, nation:'kroran', pop:350, res:{fish:15,food:10}, troops:10, type:'settled' },
  // 轮台 (3 tribes)
  { id:'t_058', name:'屯田部落', x:42, y:38, nation:'bugur', pop:800, res:{food:30,wood:10}, troops:50, type:'settled' },
  { id:'t_059', name:'灌溉部落', x:38, y:40, nation:'bugur', pop:600, res:{food:25,cotton:10}, troops:40, type:'settled' },
  { id:'t_060', name:'军屯部落', x:40, y:42, nation:'bugur', pop:700, res:{food:20,horse:10}, troops:60, type:'settled' },
  // 若羌 (3 tribes)
  { id:'t_061', name:'猎户部落', x:68, y:52, nation:'qarqan', pop:500, res:{fur:20,food:10}, troops:40, type:'nomadic' },
  { id:'t_062', name:'山岩部落', x:66, y:54, nation:'qarqan', pop:400, res:{stone:15,ore:10}, troops:30, type:'settled' },
  { id:'t_063', name:'金雕部落', x:70, y:50, nation:'qarqan', pop:350, res:{fur:15,gold:5}, troops:35, type:'nomadic' },
  // 皮山 (3 tribes)
  { id:'t_064', name:'果园部落', x:22, y:48, nation:'pishan', pop:450, res:{fruit:25,food:10}, troops:15, type:'settled' },
  { id:'t_065', name:'瓜农部落', x:24, y:50, nation:'pishan', pop:400, res:{fruit:20,food:15}, troops:10, type:'settled' },
  { id:'t_066', name:'花农部落', x:20, y:49, nation:'pishan', pop:350, res:{herb:15,dye:10}, troops:10, type:'settled' },
  // 粟特 (4 tribes)
  { id:'t_067', name:'商队部落', x:8, y:28, nation:'soche', pop:1500, res:{silk:25,spice:25}, troops:40, type:'nomadic' },
  { id:'t_068', name:'钱庄部落', x:6, y:32, nation:'soche', pop:800, res:{gold:20,silk:15}, troops:30, type:'settled' },
  { id:'t_069', name:'驿站部落', x:10, y:30, nation:'soche', pop:600, res:{food:15,camel:15}, troops:20, type:'settled' },
  { id:'t_070', name:'翻译部落', x:4, y:34, nation:'soche', pop:500, res:{silk:10,book:10}, troops:15, type:'settled' },
  // 康居 (4 tribes)
  { id:'t_071', name:'牧场部落', x:8, y:12, nation:'kangju', pop:1800, res:{horse:35,leather:20}, troops:160, type:'nomadic' },
  { id:'t_072', name:'铁骑部落', x:6, y:16, nation:'kangju', pop:1200, res:{horse:25,iron:15}, troops:140, type:'nomadic' },
  { id:'t_073', name:'草原部落', x:10, y:14, nation:'kangju', pop:1000, res:{horse:20,food:15}, troops:120, type:'nomadic' },
  { id:'t_074', name:'狼旗部落', x:4, y:18, nation:'kangju', pop:800, res:{fur:20,horse:15}, troops:100, type:'nomadic' },
  // 大宛 (4 tribes)
  { id:'t_075', name:'马场部落', x:8, y:42, nation:'dayuan', pop:1400, res:{horse:40,leather:15}, troops:130, type:'nomadic' },
  { id:'t_076', name:'汗血部落', x:6, y:46, nation:'dayuan', pop:1000, res:{horse:35,food:10}, troops:120, type:'nomadic' },
  { id:'t_077', name:'谷地部落', x:10, y:44, nation:'dayuan', pop:800, res:{food:20,horse:20}, troops:80, type:'settled' },
  { id:'t_078', name:'天马部落', x:4, y:48, nation:'dayuan', pop:600, res:{horse:30,gold:5}, troops:100, type:'nomadic' },
  // 竭石 (3 tribes)
  { id:'t_079', name:'宝石部落', x:12, y:48, nation:'jieshi', pop:500, res:{gem:25,gold:10}, troops:20, type:'settled' },
  { id:'t_080', name:'矿工部落', x:10, y:50, nation:'jieshi', pop:400, res:{ore:20,gem:15}, troops:25, type:'settled' },
  { id:'t_081', name:'石匠部落', x:14, y:46, nation:'jieshi', pop:350, res:{stone:20,ore:10}, troops:15, type:'settled' },
  // 塔什库尔干 (3 tribes)
  { id:'t_082', name:'石城部落', x:8, y:38, nation:'tashkurgan', pop:500, res:{stone:25,iron:10}, troops:40, type:'settled' },
  { id:'t_083', name:'关隘部落', x:6, y:40, nation:'tashkurgan', pop:400, res:{stone:15,food:10}, troops:35, type:'settled' },
  { id:'t_084', name:'高原部落', x:10, y:36, nation:'tashkurgan', pop:300, res:{fur:15,herb:10}, troops:25, type:'nomadic' },
  // 叶尔羌 (3 tribes)
  { id:'t_085', name:'染坊部落', x:18, y:43, nation:'karghalik', pop:600, res:{dye:25,silk:15}, troops:20, type:'settled' },
  { id:'t_086', name:'织女部落', x:16, y:45, nation:'karghalik', pop:500, res:{silk:20,cotton:15}, troops:15, type:'settled' },
  { id:'t_087', name:'花田部落', x:20, y:41, nation:'karghalik', pop:450, res:{dye:20,herb:10}, troops:10, type:'settled' },
  // 克里雅 (3 tribes)
  { id:'t_088', name:'香料部落', x:33, y:58, nation:'keriya', pop:400, res:{spice:25,food:10}, troops:10, type:'settled' },
  { id:'t_089', name:'沙金部落', x:35, y:56, nation:'keriya', pop:350, res:{gold:15,jade:10}, troops:10, type:'settled' },
  { id:'t_090', name:'绿洲部落', x:31, y:60, nation:'keriya', pop:300, res:{food:15,spice:10}, troops:8, type:'settled' },
  // 且末南 (3 tribes)
  { id:'t_091', name:'盐湖部落', x:48, y:58, nation:'charchan', pop:400, res:{salt:25,food:10}, troops:15, type:'settled' },
  { id:'t_092', name:'碱地部落', x:50, y:60, nation:'charchan', pop:300, res:{salt:15,stone:10}, troops:10, type:'settled' },
  { id:'t_093', name:'牧羊部落', x:46, y:56, nation:'charchan', pop:350, res:{food:10,leather:10}, troops:12, type:'nomadic' },
  // 乌恰 (3 tribes)
  { id:'t_094', name:'猎鹰部落', x:22, y:22, nation:'wucha', pop:450, res:{fur:20,falcon:10}, troops:35, type:'nomadic' },
  { id:'t_095', name:'山鹰部落', x:24, y:24, nation:'wucha', pop:350, res:{fur:15,iron:10}, troops:30, type:'nomadic' },
  { id:'t_096', name:'雪岭部落', x:20, y:20, nation:'wucha', pop:300, res:{fur:15,herb:10}, troops:25, type:'nomadic' },
  // 突骑施 (4 tribes)
  { id:'t_097', name:'狼群部落', x:62, y:8, nation:'tokuz', pop:1500, res:{horse:30,leather:20}, troops:180, type:'nomadic' },
  { id:'t_098', name:'铁蹄部落', x:58, y:10, nation:'tokuz', pop:1200, res:{horse:25,iron:15}, troops:160, type:'nomadic' },
  { id:'t_099', name:'风暴部落', x:64, y:12, nation:'tokuz', pop:800, res:{horse:20,fur:15}, troops:140, type:'nomadic' },
  { id:'t_100', name:'黑旗部落', x:60, y:6, nation:'tokuz', pop:600, res:{horse:15,leather:10}, troops:120, type:'nomadic' },
  // 高昌 (3 tribes)
  { id:'t_101', name:'僧院部落', x:52, y:28, nation:'karakhoja', pop:700, res:{incense:20,food:15}, troops:40, type:'settled' },
  { id:'t_102', name:'佛窟部落', x:54, y:30, nation:'karakhoja', pop:500, res:{incense:15,stone:10}, troops:30, type:'settled' },
  { id:'t_103', name:'火焰部落', x:56, y:32, nation:'karakhoja', pop:600, res:{food:15,iron:10}, troops:35, type:'settled' },
  // 北庭 (3 tribes)
  { id:'t_104', name:'军镇部落', x:52, y:22, nation:'beshbaliq', pop:800, res:{iron:20,horse:15}, troops:70, type:'settled' },
  { id:'t_105', name:'屯军部落', x:54, y:18, nation:'beshbaliq', pop:600, res:{food:20,wood:10}, troops:60, type:'settled' },
  { id:'t_106', name:'铁壁部落', x:50, y:20, nation:'beshbaliq', pop:500, res:{iron:15,stone:15}, troops:50, type:'settled' },
  // 焉耆南 (3 tribes)
  { id:'t_107', name:'湖畔部落', x:47, y:28, nation:'yanqi', pop:600, res:{fish:20,food:15}, troops:25, type:'settled' },
  { id:'t_108', name:'水田部落', x:45, y:32, nation:'yanqi', pop:500, res:{food:25,reed:10}, troops:20, type:'settled' },
];

// ===== GARRISONS =====
export const GARRISONS = {
  // City garrisons (城邦守兵)
  cities: {
    loulan: { troops: 500, type: 'mixed', morale: 70, commander: 'char_loulan_001' },
    kucha: { troops: 800, type: 'infantry', morale: 75, commander: 'char_kucha_001' },
    khotan: { troops: 600, type: 'mixed', morale: 72, commander: 'char_khotan_001' },
    shanshan: { troops: 400, type: 'cavalry', morale: 65, commander: 'char_shanshan_001' },
    wusun: { troops: 1200, type: 'cavalry', morale: 80, commander: 'char_wusun_001' },
    karashahr: { troops: 700, type: 'infantry', morale: 75, commander: 'char_karashahr_001' },
    aksu: { troops: 350, type: 'infantry', morale: 60, commander: 'char_aksu_001' },
    kashgar: { troops: 900, type: 'mixed', morale: 78, commander: 'char_kashgar_001' },
    yarkand: { troops: 650, type: 'infantry', morale: 70, commander: 'char_yarkand_001' },
    amazons: { troops: 1000, type: 'cavalry', morale: 90, commander: 'char_amazon_001' },
    xiliang: { troops: 300, type: 'infantry', morale: 65, commander: 'char_xiliang_001' },
    jumi: { troops: 200, type: 'infantry', morale: 55, commander: 'char_jumi_001' },
    charklik: { troops: 150, type: 'infantry', morale: 50, commander: 'char_charklik_001' },
    niya: { troops: 100, type: 'infantry', morale: 45, commander: 'char_niya_001' },
    kroran: { troops: 250, type: 'naval', morale: 55, commander: 'char_kroran_001' },
    bugur: { troops: 500, type: 'infantry', morale: 70, commander: 'char_bugur_001' },
    qarqan: { troops: 300, type: 'cavalry', morale: 60, commander: 'char_qarqan_001' },
    pishan: { troops: 150, type: 'infantry', morale: 50, commander: 'char_pishan_001' },
    soche: { troops: 400, type: 'mercenary', morale: 65, commander: 'char_soche_001' },
    kangju: { troops: 1100, type: 'cavalry', morale: 78, commander: 'char_kangju_001' },
    dayuan: { troops: 800, type: 'cavalry', morale: 75, commander: 'char_dayuan_001' },
    jieshi: { troops: 250, type: 'infantry', morale: 60, commander: 'char_jieshi_001' },
    tashkurgan: { troops: 400, type: 'infantry', morale: 75, commander: 'char_tash_001' },
    karghalik: { troops: 300, type: 'infantry', morale: 60, commander: 'char_karghalik_001' },
    keriya: { troops: 120, type: 'infantry', morale: 45, commander: 'char_keriya_001' },
    charchan: { troops: 180, type: 'infantry', morale: 50, commander: 'char_charchan_001' },
    wucha: { troops: 350, type: 'cavalry', morale: 65, commander: 'char_wucha_001' },
    tokuz: { troops: 1000, type: 'cavalry', morale: 80, commander: 'char_tokuz_001' },
    karakhoja: { troops: 600, type: 'mixed', morale: 72, commander: 'char_karakhoja_001' },
    beshbaliq: { troops: 700, type: 'infantry', morale: 75, commander: 'char_beshbaliq_001' },
    yanqi: { troops: 400, type: 'mixed', morale: 65, commander: 'char_yanqi_001' },
    chumi: { troops: 250, type: 'cavalry', morale: 55, commander: 'char_chumi_001' },
    chumukun: { troops: 300, type: 'cavalry', morale: 55, commander: 'char_chumukun_001' },
    gaochang: { troops: 550, type: 'infantry', morale: 72, commander: 'char_gaochang_001' },
  },
  // Pass garrisons (关隘守兵)
  passes: {
    '铁门关': { troops: 300, type: 'infantry', morale: 80 },
    '葱岭关': { troops: 250, type: 'infantry', morale: 75 },
    '玉门关': { troops: 500, type: 'mixed', morale: 85 },
    '阳关': { troops: 400, type: 'mixed', morale: 80 },
    '天山隘口': { troops: 200, type: 'cavalry', morale: 70 },
    '昆仑隘口': { troops: 150, type: 'infantry', morale: 65 },
    '阿玛宗山口': { troops: 300, type: 'cavalry', morale: 85 },
    '火焰口': { troops: 200, type: 'infantry', morale: 70 },
  },
  // Ferry garrisons (渡口守兵)
  ferries: {
    '楼兰港': { troops: 200, type: 'naval', morale: 65 },
    '危须渔港': { troops: 100, type: 'naval', morale: 55 },
    '焉耆港': { troops: 150, type: 'naval', morale: 60 },
    '于阗港': { troops: 180, type: 'naval', morale: 65 },
    '莎车渡口': { troops: 120, type: 'infantry', morale: 60 },
    '西梁渡口': { troops: 100, type: 'infantry', morale: 55 },
  }
};

// ===== RESOURCES =====
export const RESOURCE_TYPES = {
  // Basic resources
  food: { name: '粮食', icon: '🌾', category: 'basic' },
  wood: { name: '木材', icon: '🪵', category: 'basic' },
  stone: { name: '石材', icon: '🪨', category: 'basic' },
  iron: { name: '铁矿', icon: '⛏️', category: 'basic' },
  gold: { name: '黄金', icon: '🪙', category: 'precious' },
  jade: { name: '玉石', icon: '💎', category: 'precious' },
  gem: { name: '宝石', icon: '💠', category: 'precious' },
  // Trade goods
  silk: { name: '丝绸', icon: '🧵', category: 'trade' },
  spice: { name: '香料', icon: '✨', category: 'trade' },
  cotton: { name: '棉花', icon: '☁️', category: 'trade' },
  dye: { name: '染料', icon: '🎨', category: 'trade' },
  wine: { name: '美酒', icon: '🍷', category: 'trade' },
  incense: { name: '香料', icon: '🪔', category: 'trade' },
  herb: { name: '药草', icon: '🌿', category: 'trade' },
  fruit: { name: '瓜果', icon: '🍈', category: 'trade' },
  salt: { name: '盐', icon: '🧂', category: 'trade' },
  // Animal & military
  horse: { name: '马匹', icon: '🐎', category: 'military' },
  camel: { name: '骆驼', icon: '🐫', category: 'military' },
  leather: { name: '皮革', icon: '🛡️', category: 'military' },
  fur: { name: '皮毛', icon: '🦊', category: 'trade' },
  steel: { name: '精钢', icon: '⚔️', category: 'military' },
  tools: { name: '工具', icon: '🔨', category: 'basic' },
  coal: { name: '煤炭', icon: 'ite', category: 'basic' },
  ore: { name: '矿石', icon: '🪨', category: 'basic' },
  water: { name: '水源', icon: '💧', category: 'basic' },
  fish: { name: '鱼类', icon: '🐟', category: 'trade' },
  reed: { name: '芦苇', icon: '🌾', category: 'basic' },
  relic: { name: '古物', icon: '🏺', category: 'precious' },
  book: { name: '书籍', icon: '📜', category: 'trade' },
  falcon: { name: '猎鹰', icon: '🦅', category: 'military' },
  sand_pearl: { name: '沙珠', icon: '🫧', category: 'precious' },
  // Special: Labor
  slave: { name: '奴隶', icon: '⛓️', category: 'labor', desc: '劳动力来源，可从部落购买' },
  labor: { name: '劳动力', icon: '👷', category: 'labor', desc: '用于建设和生产' },
};

// ===== 6 UNIT TYPES WITH COUNTER SYSTEM =====
// 克制关系: 弓骑→步兵, 步兵→骆驼, 骆驼→骑兵, 骑兵→弓骑
// 女兵克制同类型男兵（士气优势）
export const UNIT_TYPES = {
  infantry: {
    id: 'infantry', name: '步兵', icon: '⚔️', color: 0x3498DB,
    desc: '西域步兵，持盾执矛，擅长正面推进',
    atk: 8, def: 10, spd: 3, range: 1,
    cost: { gold: 15, food: 5 },
    counters: ['camel'],       // 克制骆驼兵
    counteredBy: ['archerCav'], // 被弓骑克制
    recruitFrom: 'tribe',      // 部落征召
  },
  cavalry: {
    id: 'cavalry', name: '骑兵', icon: '🐎', color: 0xE74C3C,
    desc: '草原铁骑，来去如风，冲击力强',
    atk: 12, def: 6, spd: 8, range: 1,
    cost: { gold: 30, food: 8, horse: 1 },
    counters: ['archerCav'],
    counteredBy: ['camel'],
    recruitFrom: 'tribe',
  },
  archerCav: {
    id: 'archerCav', name: '弓骑兵', icon: '🏹', color: 0x27AE60,
    desc: '西域弓骑，骑射无双，骚扰游击',
    atk: 10, def: 4, spd: 9, range: 3,
    cost: { gold: 25, food: 6, horse: 1 },
    counters: ['infantry'],
    counteredBy: ['cavalry'],
    recruitFrom: 'tribe',
  },
  camel: {
    id: 'camel', name: '骆驼兵', icon: '🐫', color: 0xD4A853,
    desc: '沙漠之舟，骆驼兵在沙地战力倍增，克制骑兵',
    atk: 9, def: 12, spd: 4, range: 1,
    cost: { gold: 25, food: 6, camel: 1 },
    counters: ['cavalry'],
    counteredBy: ['infantry'],
    recruitFrom: 'tribe',
    desertBonus: 1.5, // 沙漠地形加成50%
  },
  femaleInfantry: {
    id: 'femaleInfantry', name: '女步兵', icon: '🗡️', color: 0xFF69B4,
    desc: '阿玛宗/西梁女战士，纪律严明，克制同类型男兵',
    atk: 9, def: 11, spd: 4, range: 1,
    cost: { gold: 18, food: 5 },
    counters: ['infantry', 'camel'],
    counteredBy: ['archerCav'],
    recruitFrom: 'tribe',
    femaleOnly: true,
    moraleBonus: 10, // 士气加成
  },
  femaleCavalry: {
    id: 'femaleCavalry', name: '女骑兵', icon: '🏇', color: 0xFF1493,
    desc: '阿玛宗女骑兵，骁勇善战，速度与力量兼备',
    atk: 13, def: 7, spd: 9, range: 1,
    cost: { gold: 35, food: 8, horse: 1 },
    counters: ['cavalry', 'archerCav'],
    counteredBy: ['camel'],
    recruitFrom: 'tribe',
    femaleOnly: true,
    moraleBonus: 15,
  },
};

// 克制关系表 (attacker → defender → damage multiplier)
export const COUNTER_TABLE = {
  infantry:   { infantry: 1.0, cavalry: 0.8, archerCav: 0.7, camel: 1.4, femaleInfantry: 0.7, femaleCavalry: 0.7 },
  cavalry:    { infantry: 1.2, cavalry: 1.0, archerCav: 1.4, camel: 0.6, femaleInfantry: 0.8, femaleCavalry: 0.7 },
  archerCav:  { infantry: 1.4, cavalry: 0.6, archerCav: 1.0, camel: 0.8, femaleInfantry: 1.2, femaleCavalry: 0.8 },
  camel:      { infantry: 0.7, cavalry: 1.5, archerCav: 1.0, camel: 1.0, femaleInfantry: 0.6, femaleCavalry: 1.3 },
  femaleInfantry: { infantry: 1.3, cavalry: 0.8, archerCav: 0.7, camel: 1.4, femaleInfantry: 1.0, femaleCavalry: 1.0 },
  femaleCavalry:  { infantry: 1.2, cavalry: 1.3, archerCav: 1.3, camel: 0.7, femaleInfantry: 1.0, femaleCavalry: 1.0 },
};

// ===== MERCENARY SYSTEM (雇佣兵) =====
export const MERCENARY_TYPES = {
  sogdianGuard: { name: '粟特卫队', type: 'infantry', cost: 50, atk: 10, def: 12, desc: '粟特商人雇佣的精锐护卫' },
  kangjuLancer: { name: '康居枪骑', type: 'cavalry', cost: 80, atk: 14, def: 8, desc: '康居重装枪骑兵' },
  kushanArcher: { name: '贵霜弓手', type: 'archerCav', cost: 70, atk: 12, def: 5, desc: '贵霜精锐弓骑兵' },
  desertScout: { name: '沙漠斥候', type: 'camel', cost: 60, atk: 8, def: 10, desc: '沙漠向导与侦察兵' },
  amazonHuntress: { name: '阿玛宗猎手', type: 'femaleInfantry', cost: 90, atk: 12, def: 13, desc: '阿玛宗精锐女猎手' },
  amazonRider: { name: '阿玛宗骑手', type: 'femaleCavalry', cost: 120, atk: 16, def: 9, desc: '阿玛宗精英女骑兵' },
};

// ===== SLAVE SYSTEM (奴隶系统) =====
// 奴隶用途：劳动力、生育、娱乐、祭祀、培训改造
export const SLAVE_ROLES = {
  labor_farm:    { id: 'labor_farm',    name: '农业劳力', icon: '🌾', output: 'food',  perSlave: 2,  desc: '奴隶耕种，每奴隶产出2粮食/回合' },
  labor_mine:    { id: 'labor_mine',    name: '采矿劳力', icon: '⛏️', output: 'ore',   perSlave: 1,  desc: '奴隶采矿，每奴隶产出1矿石/回合' },
  labor_wood:    { id: 'labor_wood',    name: '伐木劳力', icon: '🪵', output: 'wood',  perSlave: 1,  desc: '奴隶伐木，每奴隶产出1木材/回合' },
  labor_craft:   { id: 'labor_craft',   name: '工匠劳力', icon: '🔨', output: 'gold',  perSlave: 3,  desc: '奴隶手工业，每奴隶产出3金/回合' },
  breeding:      { id: 'breeding',      name: '生育繁衍', icon: '👶', output: 'pop',   perSlave: 0.1, desc: '奴隶生育，增加人口（阿玛宗等女国特色）' },
  entertainment: { id: 'entertainment', name: '舞女乐师', icon: '💃', output: 'gold',  perSlave: 5,  desc: '奴隶表演，增加收入和声望' },
  sacrifice:     { id: 'sacrifice',     name: '祭祀牺牲', icon: '🔥', output: 'faith', perSlave: 10, desc: '祭祀用，提升信仰和士气' },
};

// 奴隶培训改造路径
export const SLAVE_TRAINING = {
  toCraftsman:  { id: 'toCraftsman',  name: '培训工匠', cost: { gold: 100, food: 50 },  turns: 10, result: 'craftsman',  desc: '奴隶→工匠，产出翻倍' },
  toMerchant:   { id: 'toMerchant',   name: '培训商人', cost: { gold: 150, food: 30 },  turns: 15, result: 'merchant',   desc: '奴隶→商人，增加商业收入' },
  toFarmer:     { id: 'toFarmer',     name: '培训农夫', cost: { gold: 50, food: 30 },   turns: 5,  result: 'farmer',     desc: '奴隶→农夫，粮食产出+50%' },
  toSoldier:    { id: 'toSoldier',    name: '训练兵员', cost: { gold: 200, food: 80 },  turns: 20, result: 'soldier',    desc: '奴隶→士兵，需兵营' },
  toGeneral:    { id: 'toGeneral',    name: '培养将领', cost: { gold: 500, food: 200 }, turns: 60, result: 'general',    desc: '奴隶→将领，极稀有，需高资质' },
};

// 奴隶市场（买卖交易）
export const SLAVE_MARKETS = {
  kashgar:  { name: '疏勒奴隶市场', capacity: 200, price: { low: 50, high: 150 }, supply: 'high' },
  khotan:   { name: '于阗奴隶市场', capacity: 100, price: { low: 60, high: 180 }, supply: 'medium' },
  loulan:   { name: '楼兰奴隶市场', capacity: 80,  price: { low: 70, high: 200 }, supply: 'low' },
  kangju:   { name: '康居奴隶市场', capacity: 150, price: { low: 40, high: 120 }, supply: 'high' },
  soche:    { name: '粟特奴隶市场', capacity: 250, price: { low: 30, high: 100 }, supply: 'very_high' },
  amazons:  { name: '阿玛宗奴市',   capacity: 60,  price: { low: 80, high: 250 }, supply: 'rare', femaleOnly: true },
  xiliang:  { name: '西梁奴市',     capacity: 50,  price: { low: 90, high: 300 }, supply: 'rare', femaleOnly: true },
};

// 掠夺规则：同盟/归降/占领30天以上不可掠夺
export const PLUNDER_RULES = {
  canPlunder: (tribe, state) => {
    if (state.alliances.includes(tribe.nation)) return false;
    if (state.controlledTribes.has(tribe.id)) {
      const days = state.controlledSince?.[tribe.id] || 0;
      if (state.turn - days >= 30) return false;
    }
    return true;
  },
  plunderYield: { min: 5, max: 30, goldMin: 20, goldMax: 100 },
};

// ===== RECRUITMENT (from tribes only - 部落征召) =====
export const RECRUIT_RULES = {
  tribeConscription: {
    desc: '部落征召兵',
    cost: { gold: 10, food: 5 },
    yield: { min: 5, max: 30 },
    loyaltyLoss: 10,
    cooldown: 30,
    types: ['infantry', 'cavalry', 'archerCav', 'camel'],
  },
  tribeVolunteer: {
    desc: '部落志愿兵',
    cost: { gold: 20, food: 10 },
    yield: { min: 2, max: 15 },
    loyaltyGain: 5,
    cooldown: 15,
    types: ['infantry', 'cavalry'],
  },
  femaleTribeConscript: {
    desc: '女族征召（阿玛宗/西梁）',
    cost: { gold: 15, food: 5 },
    yield: { min: 3, max: 20 },
    loyaltyLoss: 5,
    cooldown: 20,
    types: ['femaleInfantry', 'femaleCavalry'],
    femaleOnly: true,
  },
};

// ===== CITY HIRING (武将/文官) =====
export const HIRING_RULES = {
  general: {
    desc: '招聘武将',
    location: 'city',
    cost: { gold: 200, silk: 5 },
    stats: ['leadership', 'force', 'strategy'],
    pool: 'military',
  },
  official: {
    desc: '招聘文官',
    location: 'city',
    cost: { gold: 150, jade: 3 },
    stats: ['politics', 'intelligence', 'charisma'],
    pool: 'civil',
  },
  merchant: {
    desc: '招聘商人',
    location: 'city',
    cost: { gold: 100, spice: 5 },
    stats: ['commerce', 'negotiation', 'logistics'],
    pool: 'commerce',
  },
  spy: {
    desc: '招聘密探',
    location: 'city',
    cost: { gold: 300 },
    stats: ['stealth', 'intelligence', 'assassination'],
    pool: 'spy',
  },
};

// ===== 6 MAJOR POWER INFLUENCE ZONES =====
export const INFLUENCE_ZONES = {
  han: {
    name: '大汉帝国', influence: 70,
    zones: ['beshbaliq', 'bugur', 'gaochang', 'karakhoja'],
    bonus: { diplomacy: 10, trade: 15 },
    troops: 2000, garrison: '玉门关',
  },
  xiongnu: {
    name: '匈奴帝国', influence: 65,
    zones: ['tokuz', 'chumukun', 'kangju'],
    bonus: { military: 15, cavalry: 20 },
    troops: 3000, garrison: '草原以北',
  },
  kushan: {
    name: '贵霜帝国', influence: 55,
    zones: ['soche', 'dayuan', 'kashgar'],
    bonus: { trade: 20, culture: 10 },
    troops: 1500, garrison: '葱岭以西',
  },
  parthia: {
    name: '安息帝国', influence: 40,
    zones: ['jieshi', 'tashkurgan'],
    bonus: { trade: 15, military: 5 },
    troops: 1000, garrison: '波斯边境',
  },
  rome: {
    name: '罗马帝国', influence: 20,
    zones: [],
    bonus: { trade: 10 },
    troops: 0, garrison: '极西之地',
  },
  sassanid: {
    name: '萨珊波斯', influence: 35,
    zones: ['karghalik', 'keriya'],
    bonus: { military: 10, culture: 8 },
    troops: 800, garrison: '波斯高原',
  },
};
