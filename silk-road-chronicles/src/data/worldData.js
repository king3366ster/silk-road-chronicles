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
  // 东女国 (5 tribes - all female)
  { id:'t_109', name:'织锦女族', x:68, y:52, nation:'dongnv', pop:700, res:{silk:25,herb:15}, troops:35, type:'settled', female:true },
  { id:'t_110', name:'药草女族', x:72, y:58, nation:'dongnv', pop:600, res:{herb:30,silk:10}, troops:25, type:'settled', female:true },
  { id:'t_111', name:'女王卫族', x:70, y:55, nation:'dongnv', pop:800, res:{iron:15,silk:20}, troops:60, type:'settled', female:true },
  { id:'t_112', name:'高原女族', x:66, y:56, nation:'dongnv', pop:500, res:{herb:20,food:15}, troops:20, type:'nomadic', female:true },
  { id:'t_113', name:'织女族',   x:74, y:54, nation:'dongnv', pop:650, res:{silk:30,dye:15}, troops:30, type:'settled', female:true },
  // 温宿 (3 tribes)
  { id:'t_114', name:'铁山部落', x:33, y:22, nation:'wensu', pop:600, res:{iron:25,ore:15}, troops:50, type:'settled' },
  { id:'t_115', name:'马场部落', x:37, y:24, nation:'wensu', pop:500, res:{horse:20,iron:10}, troops:40, type:'nomadic' },
  { id:'t_116', name:'矿谷部落', x:31, y:26, nation:'wensu', pop:400, res:{iron:20,stone:10}, troops:30, type:'settled' },
  // 尉犁 (3 tribes)
  { id:'t_117', name:'渔港部落', x:48, y:38, nation:'weili', pop:500, res:{fish:25,food:15}, troops:20, type:'settled' },
  { id:'t_118', name:'灌溉部落', x:52, y:42, nation:'weili', pop:450, res:{food:20,water:20}, troops:15, type:'settled' },
  { id:'t_119', name:'河畔部落', x:46, y:42, nation:'weili', pop:400, res:{fish:15,food:20}, troops:15, type:'settled' },
  // 于阗西 (3 tribes)
  { id:'t_120', name:'玉雕部落', x:16, y:60, nation:'yutian', pop:500, res:{jade:30,gold:10}, troops:20, type:'settled' },
  { id:'t_121', name:'河畔部落', x:20, y:64, nation:'yutian', pop:400, res:{food:15,horse:10}, troops:15, type:'settled' },
  { id:'t_122', name:'矿工部落', x:14, y:64, nation:'yutian', pop:350, res:{jade:20,ore:10}, troops:10, type:'settled' },
  // 疏勒西 (3 tribes)
  { id:'t_123', name:'山口部落', x:6, y:36, nation:'shule', pop:500, res:{spice:15,silk:15}, troops:35, type:'settled' },
  { id:'t_124', name:'驿站部落', x:10, y:40, nation:'shule', pop:400, res:{food:15,camel:10}, troops:25, type:'settled' },
  { id:'t_125', name:'商队部落', x:4, y:40, nation:'shule', pop:450, res:{silk:20,spice:20}, troops:20, type:'nomadic' },
  // 补充部落 (3 tribes to reach 128)
  { id:'t_126', name:'沙漠游骑', x:62, y:42, nation:'shanshan', pop:350, res:{food:10,camel:10}, troops:30, type:'nomadic' },
  { id:'t_127', name:'雪山部落', x:48, y:8, nation:'wusun', pop:400, res:{fur:25,iron:10}, troops:60, type:'nomadic' },
  { id:'t_128', name:'绿洲隐族', x:38, y:48, nation:'bugur', pop:300, res:{food:15,herb:10}, troops:15, type:'settled' },
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

// ===== 7 UNIT TYPES WITH COUNTER SYSTEM =====
// 克制关系: 弓骑→步兵, 步兵→骆驼, 骆驼→骑兵, 骑兵→弓骑
// 女兵克制同类型男兵（士气优势）
// 女弓骑兵：骑射精锐，克制步兵和骆驼，被骑兵和骆驼克制
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
    counteredBy: ['archerCav', 'femaleArcherCav'],
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
  femaleArcherCav: {
    id: 'femaleArcherCav', name: '女弓骑兵', icon: '🏹‍♀️', color: 0xE91E63,
    desc: '阿玛宗/西梁骑射精锐，百步穿杨，克制步兵与骆驼',
    atk: 11, def: 5, spd: 10, range: 3,
    cost: { gold: 30, food: 7, horse: 1 },
    counters: ['infantry', 'camel', 'femaleInfantry'],
    counteredBy: ['cavalry', 'femaleCavalry'],
    recruitFrom: 'tribe',
    femaleOnly: true,
    moraleBonus: 12,
  },
};

// 克制关系表 (attacker → defender → damage multiplier)
export const COUNTER_TABLE = {
  infantry:        { infantry: 1.0, cavalry: 0.8, archerCav: 0.7, camel: 1.4, femaleInfantry: 0.7, femaleCavalry: 0.7, femaleArcherCav: 0.6 },
  cavalry:         { infantry: 1.2, cavalry: 1.0, archerCav: 1.4, camel: 0.6, femaleInfantry: 0.8, femaleCavalry: 0.7, femaleArcherCav: 1.3 },
  archerCav:       { infantry: 1.4, cavalry: 0.6, archerCav: 1.0, camel: 0.8, femaleInfantry: 1.2, femaleCavalry: 0.8, femaleArcherCav: 0.9 },
  camel:           { infantry: 0.7, cavalry: 1.5, archerCav: 1.0, camel: 1.0, femaleInfantry: 0.6, femaleCavalry: 1.3, femaleArcherCav: 1.2 },
  femaleInfantry:  { infantry: 1.3, cavalry: 0.8, archerCav: 0.7, camel: 1.4, femaleInfantry: 1.0, femaleCavalry: 1.0, femaleArcherCav: 0.8 },
  femaleCavalry:   { infantry: 1.2, cavalry: 1.3, archerCav: 1.3, camel: 0.7, femaleInfantry: 1.0, femaleCavalry: 1.0, femaleArcherCav: 1.1 },
  femaleArcherCav: { infantry: 1.4, cavalry: 0.7, archerCav: 1.2, camel: 1.3, femaleInfantry: 1.3, femaleCavalry: 0.8, femaleArcherCav: 1.0 },
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

// ===== 6 SLAVE TYPES (六大奴隶类型) =====
// 每种奴隶有不同的用途、价值和培养路径
export const SLAVE_TYPES = {
  femaleLaborer: {
    id: 'femaleLaborer', name: '女劳奴', icon: '👩‍🌾', gender: 'female',
    desc: '女性劳力奴隶，擅长纺织、采集、家务',
    basePrice: 80, tier: 1,
    bestRoles: ['labor_farm', 'labor_craft', 'entertainment'],
    trainTo: ['dancer', 'concubine', 'craftswoman'],
    color: 0xFFB6C1,
  },
  maleLaborer: {
    id: 'maleLaborer', name: '男劳奴', icon: '👨‍🌾', gender: 'male',
    desc: '男性劳力奴隶，擅长采矿、伐木、建筑',
    basePrice: 60, tier: 1,
    bestRoles: ['labor_farm', 'labor_mine', 'labor_wood'],
    trainTo: ['craftsman', 'soldier', 'farmer'],
    color: 0xDEB887,
  },
  dancer: {
    id: 'dancer', name: '舞女', icon: '💃', gender: 'female',
    desc: '擅长歌舞的才艺奴隶，价值高昂',
    basePrice: 200, tier: 2,
    bestRoles: ['entertainment'],
    trainTo: ['courtesan', 'musician'],
    color: 0xFF69B4,
  },
  warrior: {
    id: 'warrior', name: '战奴', icon: '⚔️', gender: 'any',
    desc: '有战斗经验的奴隶，可训练为士兵',
    basePrice: 150, tier: 2,
    bestRoles: ['sacrifice', 'training_soldier'],
    trainTo: ['elite_soldier', 'gladiator'],
    color: 0xE74C3C,
  },
  concubine: {
    id: 'concubine', name: '侍妾', icon: '👸', gender: 'female',
    desc: '容貌出众的女性奴隶，用于繁衍或外交赠礼',
    basePrice: 300, tier: 3,
    bestRoles: ['breeding', 'entertainment'],
    trainTo: ['noble_consort'],
    color: 0xDA70D6,
  },
  artisan: {
    id: 'artisan', name: '匠奴', icon: '🔨', gender: 'any',
    desc: '拥有手艺技能的奴隶，价值不菲',
    basePrice: 180, tier: 2,
    bestRoles: ['labor_craft'],
    trainTo: ['master_craftsman', 'merchant'],
    color: 0xDAA520,
  },
};

// 奴隶用途（分配角色）
export const SLAVE_ROLES = {
  labor_farm:    { id: 'labor_farm',    name: '农业劳力', icon: '🌾', output: 'food',  perSlave: 2,  desc: '奴隶耕种，每奴隶产出2粮食/回合', acceptTypes: ['femaleLaborer', 'maleLaborer', 'artisan'] },
  labor_mine:    { id: 'labor_mine',    name: '采矿劳力', icon: '⛏️', output: 'ore',   perSlave: 1,  desc: '奴隶采矿，每奴隶产出1矿石/回合', acceptTypes: ['maleLaborer', 'warrior'] },
  labor_wood:    { id: 'labor_wood',    name: '伐木劳力', icon: '🪵', output: 'wood',  perSlave: 1,  desc: '奴隶伐木，每奴隶产出1木材/回合', acceptTypes: ['maleLaborer', 'artisan'] },
  labor_craft:   { id: 'labor_craft',   name: '工匠劳力', icon: '🔨', output: 'gold',  perSlave: 3,  desc: '奴隶手工业，每奴隶产出3金/回合', acceptTypes: ['artisan', 'femaleLaborer'] },
  breeding:      { id: 'breeding',      name: '生育繁衍', icon: '👶', output: 'pop',   perSlave: 0.1, desc: '奴隶生育，增加人口', acceptTypes: ['femaleLaborer', 'concubine'] },
  entertainment: { id: 'entertainment', name: '舞女乐师', icon: '💃', output: 'gold',  perSlave: 5,  desc: '奴隶表演，增加收入和声望', acceptTypes: ['dancer', 'concubine'] },
  sacrifice:     { id: 'sacrifice',     name: '祭祀牺牲', icon: '🔥', output: 'faith', perSlave: 10, desc: '祭祀用，提升信仰和士气', acceptTypes: ['warrior', 'maleLaborer'] },
};

// ===== SLAVE → CITIZEN CONVERSION PATHS (奴隶→公民转换) =====
// 奴隶通过培训成为公民，公民承担征兵、商业、工匠等职责
// 伐木/采矿/农业只能由奴隶承担；征兵/商业/工匠只能由公民承担
export const SLAVE_TRAINING = {
  // === 男劳奴 → 男公民 ===
  toMaleCitizen:    { id: 'toMaleCitizen',    name: '解放为男公民', fromType: 'maleLaborer', cost: { gold: 80, food: 30 },  turns: 5,  result: 'maleCitizen',    resultCategory: 'citizens', desc: '男劳奴→男公民，可征兵/经商/工匠' },
  // === 女劳奴 → 女公民 ===
  toFemaleCitizen:  { id: 'toFemaleCitizen',  name: '解放为女公民', fromType: 'femaleLaborer', cost: { gold: 80, food: 30 },  turns: 5,  result: 'femaleCitizen',  resultCategory: 'citizens', desc: '女劳奴→女公民，可征兵/经商' },
  // === 男战奴 → 男公民(军事) ===
  toMaleWarrior:    { id: 'toMaleWarrior',    name: '编入男兵籍', fromType: 'warrior', cost: { gold: 150, food: 60 },  turns: 10, result: 'maleCitizen',    resultCategory: 'citizens', desc: '战奴→男公民(军事)，擅长征兵' },
  // === 女战奴 → 女公民(军事) ===
  toFemaleWarrior:  { id: 'toFemaleWarrior',  name: '编入女兵籍', fromType: 'warrior', cost: { gold: 150, food: 60 },  turns: 10, result: 'femaleCitizen',  resultCategory: 'citizens', desc: '女战奴→女公民(军事)，可征女兵' },
  // === 舞女 → 女商人(有加成) ===
  toFemaleMerchant: { id: 'toFemaleMerchant', name: '培养女商人', fromType: 'dancer', cost: { gold: 200, food: 50 },  turns: 12, result: 'femaleMerchant', resultCategory: 'citizens', desc: '舞女→女商人，商业收入+30%加成' },
  // === 侍妾 → 女武将 ===
  toFemaleGeneral:  { id: 'toFemaleGeneral',  name: '培养女武将', fromType: 'concubine', cost: { gold: 500, food: 100 }, turns: 30, result: 'femaleGeneral',  resultCategory: 'generals', desc: '侍妾→女武将，进入武将系统，可带兵攻城' },
  // === 匠奴 → 工匠(科技/建造) ===
  toCraftsman:      { id: 'toCraftsman',      name: '培养工匠', fromType: 'artisan', cost: { gold: 120, food: 40 },  turns: 10, result: 'craftsman',      resultCategory: 'citizens', desc: '匠奴→工匠，负责科技研发和建造' },
  // === 匠奴 → 男女武将系统 ===
  toMaleGeneral:    { id: 'toMaleGeneral',    name: '培养男武将', fromType: 'artisan', cost: { gold: 400, food: 100 }, turns: 25, result: 'maleGeneral',    resultCategory: 'generals', desc: '匠奴→男武将，进入武将系统，可带兵攻城' },
  // === 高级路径 ===
  toEliteSoldier:   { id: 'toEliteSoldier',   name: '精锐训练', fromType: 'warrior', cost: { gold: 350, food: 120 }, turns: 20, result: 'eliteSoldier',   resultCategory: 'army', desc: '战奴→精锐兵，直接编入军队' },
};

// ===== CITIZEN SYSTEM (公民系统) =====
// 公民承担：征兵、商业（税收/贸易）、工匠（科技/建造）
// 公民只能从奴隶培训转化而来
export const CITIZEN_TYPES = {
  maleCitizen: {
    id: 'maleCitizen', name: '男公民', icon: '👨', gender: 'male',
    desc: '男性公民，可征兵(男性兵种)、经商、繁衍',
    canRecruit: ['infantry', 'cavalry', 'archerCav', 'camel'],  // 可征召的兵种
    canWork: ['soldier', 'merchant', 'official'],               // 可从事的职业
    breedingRate: 0.05,  // 繁衍率
  },
  femaleCitizen: {
    id: 'femaleCitizen', name: '女公民', icon: '👩', gender: 'female',
    desc: '女性公民，可征兵(女兵种)、经商、工匠',
    canRecruit: ['femaleInfantry', 'femaleCavalry', 'femaleArcherCav'],  // 可征召的女兵种（含女弓骑兵）
    canWork: ['soldier', 'merchant', 'craftsman', 'builder'],            // 女性可从事所有职业
    breedingRate: 0.08,
  },
  femaleMerchant: {
    id: 'femaleMerchant', name: '女商人', icon: '💃', gender: 'female',
    desc: '由舞女培养的女商人，商业收入+30%加成',
    canRecruit: [],
    canWork: ['merchant'],
    commerceBonus: 1.3,  // 30%商业加成
  },
  craftsman: {
    id: 'craftsman', name: '工匠', icon: '🔨', gender: 'any',
    desc: '工匠公民，负责科技研发和建造',
    canRecruit: [],
    canWork: ['craftsman', 'builder'],
    techBonus: 1.2,
    buildBonus: 1.3,
  },
};

// ===== GENERAL SYSTEM (武将系统 - 参考三国志) =====
// 武将可带兵攻城掠地，有统率/武力/智力/政治/魅力五维属性
// 攻城必须有武将带兵
export const GENERAL_SYSTEM = {
  // 武将来源
  sources: {
    slaveConcubine: { from: 'concubine', result: 'femaleGeneral', desc: '侍妾→女武将' },
    slaveArtisan:   { from: 'artisan', result: 'maleGeneral', desc: '匠奴→男武将' },
    cityHire:       { cost: { gold: 500 }, desc: '城邦招聘武将' },
    questReward:    { desc: '任务奖励武将' },
  },
  // 武将属性范围
  baseStats: {
    leadership: { min: 30, max: 100, name: '统率', desc: '影响带兵数量和军队士气' },
    force:      { min: 20, max: 100, name: '武力', desc: '影响单挑和近战伤害' },
    strategy:   { min: 20, max: 100, name: '智力', desc: '影响计策成功率和防御' },
    politics:   { min: 10, max: 100, name: '政治', desc: '影响内政和外交' },
    charisma:   { min: 10, max: 100, name: '魅力', desc: '影响招募和忠诚度' },
  },
  // 武将等级
  ranks: [
    { name: '伍长',   minLevel: 1,  maxTroops: 500,  bonus: 0 },
    { name: '什长',   minLevel: 3,  maxTroops: 1000, bonus: 0.05 },
    { name: '百夫长', minLevel: 5,  maxTroops: 2000, bonus: 0.1 },
    { name: '千夫长', minLevel: 8,  maxTroops: 5000, bonus: 0.15 },
    { name: '万夫长', minLevel: 12, maxTroops: 10000, bonus: 0.2 },
    { name: '将军',   minLevel: 15, maxTroops: 20000, bonus: 0.3 },
    { name: '大将军', minLevel: 20, maxTroops: 50000, bonus: 0.4 },
  ],
  // 生成随机武将
  createGeneral: function(name, gender, source) {
    const stats = {};
    Object.entries(this.baseStats).forEach(([key, range]) => {
      stats[key] = Math.floor(Math.random() * (range.max - range.min)) + range.min;
    });
    return {
      id: `gen_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      name, gender, source,
      level: 1, exp: 0,
      stats,
      loyalty: 70 + Math.floor(Math.random() * 20),
      troops: {},  // { infantry: 100, cavalry: 50, ... }
      rank: this.ranks[0],
    };
  },
};

// ===== CITIZEN JOB SYSTEM (公民职业系统) =====
// 公民可分配的职业（奴隶不能承担这些职业）
export const CITIZEN_JOBS = {
  soldier:   { id: 'soldier',   name: '征兵入伍', icon: '⚔️', desc: '公民参军，增加可征召兵力', require: ['maleCitizen', 'femaleCitizen'], output: 'military' },
  merchant:  { id: 'merchant',  name: '经商贸易', icon: '💰', desc: '公民经商，增加税收和贸易收入', require: ['maleCitizen', 'femaleCitizen', 'femaleMerchant'], output: 'gold', bonus: { femaleMerchant: 1.3 } },
  craftsman: { id: 'craftsman', name: '工匠科技', icon: '🔬', desc: '工匠负责科技研发和建筑建造', require: ['craftsman'], output: 'tech' },
  builder:   { id: 'builder',   name: '建筑建造', icon: '🏗️', desc: '工匠负责建造农场/市场/兵营', require: ['craftsman'], output: 'build' },
  breeding:  { id: 'breeding',  name: '繁衍后代', icon: '👶', desc: '公民繁衍，增加人口', require: ['maleCitizen', 'femaleCitizen'], output: 'population' },
};

// ===== SLAVE-ONLY JOBS (奴隶专属职业) =====
// 伐木、采矿、农业等只能由奴隶承担
export const SLAVE_ONLY_JOBS = {
  labor_farm:    { id: 'labor_farm',    name: '农业劳力', icon: '🌾', output: 'food',  perSlave: 2,  desc: '奴隶耕种（公民不可承担）' },
  labor_mine:    { id: 'labor_mine',    name: '采矿劳力', icon: '⛏️', output: 'ore',   perSlave: 1,  desc: '奴隶采矿（公民不可承担）' },
  labor_wood:    { id: 'labor_wood',    name: '伐木劳力', icon: '🪵', output: 'wood',  perSlave: 1,  desc: '奴隶伐木（公民不可承担）' },
  entertainment: { id: 'entertainment', name: '舞女表演', icon: '💃', output: 'gold',  perSlave: 5,  desc: '舞女表演增加收入' },
  sacrifice:     { id: 'sacrifice',     name: '祭祀牺牲', icon: '🔥', output: 'faith', perSlave: 10, desc: '祭祀提升士气' },
};

// 城邦/国家对奴隶类型的喜好
export const SLAVE_PREFERENCES = {
  // 女性国家 - 喜欢男奴隶（繁衍+体力劳动）
  amazons:  { prefer: ['maleLaborer', 'warrior'],  dislike: ['concubine'], desc: '阿玛宗需要男奴繁衍后代和体力劳动', buyPremium: 1.5 },
  xiliang:  { prefer: ['maleLaborer', 'warrior'],  dislike: ['dancer'],    desc: '西梁女国需要男奴繁衍后代', buyPremium: 1.4 },
  // 文明城邦 - 喜欢舞女和匠奴
  kucha:    { prefer: ['dancer', 'artisan'],       dislike: ['warrior'],   desc: '龟兹乐舞之都，喜爱舞女和匠人', buyPremium: 1.3 },
  kashgar:  { prefer: ['artisan', 'dancer'],       dislike: [],            desc: '疏勒商贸中心，偏好匠奴', buyPremium: 1.2 },
  khotan:   { prefer: ['femaleLaborer', 'artisan'], dislike: ['warrior'],  desc: '于阗玉石之城，偏好女工和匠人', buyPremium: 1.2 },
  loulan:   { prefer: ['femaleLaborer', 'dancer'],  dislike: [],            desc: '楼兰偏好女奴和舞女', buyPremium: 1.1 },
  // 游牧国家 - 喜欢战奴和劳奴
  wusun:    { prefer: ['warrior', 'maleLaborer'],   dislike: ['dancer'],   desc: '乌孙尚武，偏好战奴', buyPremium: 1.3 },
  kangju:   { prefer: ['warrior', 'maleLaborer'],   dislike: ['concubine'], desc: '康居尚武，偏好战奴和劳奴', buyPremium: 1.2 },
  tokuz:    { prefer: ['warrior', 'maleLaborer'],   dislike: ['dancer'],   desc: '突骑施尚武，偏好战奴', buyPremium: 1.3 },
  dayuan:   { prefer: ['maleLaborer', 'artisan'],   dislike: [],            desc: '大宛偏好劳奴和匠奴', buyPremium: 1.1 },
  // 商贸城邦 - 喜欢匠奴
  soche:    { prefer: ['artisan', 'dancer'],        dislike: ['warrior'],   desc: '粟特商人偏好匠奴和舞女', buyPremium: 1.4 },
  // 六大帝国偏好
  han:      { prefer: ['dancer', 'concubine', 'artisan'], dislike: ['warrior'], desc: '大汉偏好舞女、侍妾和匠奴', buyPremium: 2.0 },
  xiongnu:  { prefer: ['warrior', 'maleLaborer'],   dislike: ['dancer'],    desc: '匈奴偏好战奴和劳奴', buyPremium: 1.8 },
  kushan:   { prefer: ['dancer', 'artisan'],        dislike: [],             desc: '贵霜偏好舞女和匠奴', buyPremium: 1.6 },
  parthia:  { prefer: ['concubine', 'dancer'],       dislike: ['maleLaborer'], desc: '安息偏好侍妾和舞女', buyPremium: 1.7 },
  rome:     { prefer: ['warrior', 'dancer'],         dislike: [],             desc: '罗马偏好角斗士和舞女', buyPremium: 2.5 },
  sassanid: { prefer: ['concubine', 'artisan'],      dislike: ['warrior'],    desc: '萨珊偏好侍妾和匠奴', buyPremium: 1.5 },
};

// 奴隶市场（买卖交易）- 每个市场有不同的奴隶类型供应
export const SLAVE_MARKETS = {
  kashgar:  { name: '疏勒奴隶市场', capacity: 200, supply: { maleLaborer: 50, femaleLaborer: 30, artisan: 20, dancer: 10, warrior: 15, concubine: 5 } },
  khotan:   { name: '于阗奴隶市场', capacity: 100, supply: { maleLaborer: 20, femaleLaborer: 40, artisan: 15, dancer: 10, warrior: 5, concubine: 10 } },
  loulan:   { name: '楼兰奴隶市场', capacity: 80,  supply: { maleLaborer: 15, femaleLaborer: 25, artisan: 10, dancer: 15, warrior: 5, concubine: 10 } },
  kangju:   { name: '康居奴隶市场', capacity: 150, supply: { maleLaborer: 50, femaleLaborer: 20, artisan: 10, dancer: 5, warrior: 40, concubine: 5 } },
  soche:    { name: '粟特奴隶市场', capacity: 250, supply: { maleLaborer: 60, femaleLaborer: 40, artisan: 50, dancer: 30, warrior: 20, concubine: 20 } },
  amazons:  { name: '阿玛宗奴市',   capacity: 60,  supply: { maleLaborer: 30, warrior: 20, artisan: 5, femaleLaborer: 0, dancer: 0, concubine: 0 } },
  xiliang:  { name: '西梁奴市',     capacity: 50,  supply: { maleLaborer: 25, warrior: 15, artisan: 5, femaleLaborer: 0, dancer: 0, concubine: 0 } },
  wusun:    { name: '乌孙奴市',     capacity: 100, supply: { maleLaborer: 30, femaleLaborer: 15, warrior: 25, artisan: 10, dancer: 5, concubine: 5 } },
};

// 掠夺规则：同盟/归降/占领30天以上不可掠夺
// 掠夺不同城邦/部落获得的奴隶类型不同
export const PLUNDER_RULES = {
  canPlunder: (tribe, state) => {
    if (state.alliances.includes(tribe.nation)) return false;
    if (state.controlledTribes.has(tribe.id)) {
      const days = state.controlledSince?.[tribe.id] || 0;
      if (state.turn - days >= 30) return false;
    }
    return true;
  },
  // 掠夺奴隶产出 - 根据部落所属城邦决定奴隶类型分布
  getPlunderYield: (tribe) => {
    const nation = tribe.nation;
    const base = { maleLaborer: 0, femaleLaborer: 0, dancer: 0, warrior: 0, concubine: 0, artisan: 0 };
    const total = Math.floor(Math.random() * 20) + 5;

    // 阿玛宗 - 掠夺获得基本都是女奴隶
    if (nation === 'amazons') {
      base.femaleLaborer = Math.floor(total * 0.4);
      base.warrior = Math.floor(total * 0.3); // 女战士
      base.dancer = Math.floor(total * 0.15);
      base.concubine = Math.floor(total * 0.15);
    }
    // 西梁女国 - 掠夺获得基本都是女奴隶
    else if (nation === 'xiliang') {
      base.femaleLaborer = Math.floor(total * 0.5);
      base.dancer = Math.floor(total * 0.2);
      base.concubine = Math.floor(total * 0.15);
      base.artisan = Math.floor(total * 0.15);
    }
    // 游牧国家 - 多战奴和男劳奴
    else if (['wusun', 'kangju', 'tokuz', 'dayuan'].includes(nation)) {
      base.maleLaborer = Math.floor(total * 0.4);
      base.warrior = Math.floor(total * 0.35);
      base.femaleLaborer = Math.floor(total * 0.15);
      base.artisan = Math.floor(total * 0.1);
    }
    // 文明城邦 - 多匠奴和舞女
    else if (['kucha', 'kashgar', 'khotan', 'soche'].includes(nation)) {
      base.femaleLaborer = Math.floor(total * 0.25);
      base.maleLaborer = Math.floor(total * 0.2);
      base.artisan = Math.floor(total * 0.2);
      base.dancer = Math.floor(total * 0.2);
      base.concubine = Math.floor(total * 0.1);
      base.warrior = Math.floor(total * 0.05);
    }
    // 其他城邦 - 混合
    else {
      base.maleLaborer = Math.floor(total * 0.35);
      base.femaleLaborer = Math.floor(total * 0.25);
      base.warrior = Math.floor(total * 0.15);
      base.artisan = Math.floor(total * 0.1);
      base.dancer = Math.floor(total * 0.1);
      base.concubine = Math.floor(total * 0.05);
    }
    return base;
  },
  plunderYield: { min: 5, max: 30, goldMin: 20, goldMax: 100 },
};

// 奴隶贡品/赠礼效果
export const SLAVE_TRIBUTE = {
  // 赠送给六大帝国的效果
  majorPower: {
    han:      { bestGift: ['dancer', 'concubine'], relationBonus: 15, goldBonus: 0, desc: '大汉喜爱舞女和侍妾' },
    xiongnu:  { bestGift: ['warrior', 'maleLaborer'], relationBonus: 12, goldBonus: 0, desc: '匈奴喜爱战奴和劳奴' },
    kushan:   { bestGift: ['dancer', 'artisan'], relationBonus: 10, goldBonus: 50, desc: '贵霜喜爱舞女和匠奴' },
    parthia:  { bestGift: ['concubine', 'dancer'], relationBonus: 12, goldBonus: 30, desc: '安息喜爱侍妾和舞女' },
    rome:     { bestGift: ['warrior', 'dancer'], relationBonus: 8, goldBonus: 100, desc: '罗马喜爱角斗士和舞女' },
    sassanid: { bestGift: ['concubine', 'artisan'], relationBonus: 10, goldBonus: 40, desc: '萨珊喜爱侍妾和匠奴' },
  },
  // 赠送给城邦的效果
  cityState: {
    amazons:  { bestGift: ['maleLaborer', 'warrior'], relationBonus: 20, desc: '阿玛宗急需男奴繁衍' },
    xiliang:  { bestGift: ['maleLaborer', 'warrior'], relationBonus: 18, desc: '西梁女国需要男奴' },
    kucha:    { bestGift: ['dancer', 'artisan'], relationBonus: 12, desc: '龟兹喜爱舞女' },
    kashgar:  { bestGift: ['artisan', 'dancer'], relationBonus: 10, desc: '疏勒偏好匠奴' },
    default:  { bestGift: ['femaleLaborer', 'maleLaborer'], relationBonus: 8, desc: '通用赠礼' },
  },
  // 计算赠礼效果
  calcGiftEffect: function(targetId, slaveType, count, isMajorPower) {
    const table = isMajorPower ? this.majorPower : this.cityState;
    const entry = table[targetId] || table.default;
    const isBest = entry.bestGift.includes(slaveType);
    const baseRelation = isBest ? entry.relationBonus : Math.floor(entry.relationBonus / 3);
    const relationGain = baseRelation * Math.min(count, 10);
    const goldGain = (entry.goldBonus || 0) * Math.min(count, 5);
    return { relationGain, goldGain, isBest, desc: entry.desc };
  },
};

// ===== ALL-FEMALE NATION RULES (全女性国家规则) =====
// 西梁女国和阿玛宗：市民全为女性，女性覆盖所有业务能力
// 不允许培养男奴，但女奴隶培训成本低于其他城邦
export const ALL_FEMALE_NATIONS = {
  amazons: {
    id: 'amazons', name: '阿玛宗女战士部落',
    desc: '全女性国家，所有市民均为女性',
    rules: {
      noMaleSlaveTraining: true,    // 禁止培养男奴
      femaleSlaveCostDiscount: 0.6, // 女奴隶培训成本6折
      femaleOnlyArmy: true,         // 只能征召女兵
      femaleBusinessBonus: 1.2,     // 女性经商加成20%
      femaleCraftBonus: 1.15,       // 女性工匠加成15%
    },
    // 可征召兵种（全女兵）
    availableUnits: ['femaleInfantry', 'femaleCavalry', 'femaleArcherCav'],
    // 可从事职业（女性覆盖全部）
    availableJobs: ['soldier', 'merchant', 'craftsman', 'builder', 'breeding'],
    // 女性专属角色名称
    femaleRoles: {
      merchant: '女商人', artisan: '女匠人', soldier: '女战士',
      cavalry: '女骑兵', archerCav: '女弓骑兵', infantry: '女步兵',
    },
  },
  xiliang: {
    id: 'xiliang', name: '西梁女国',
    desc: '全女性国家（西游记西梁女国），所有市民均为女性',
    rules: {
      noMaleSlaveTraining: true,    // 禁止培养男奴
      femaleSlaveCostDiscount: 0.5, // 女奴隶培训成本5折（更低）
      femaleOnlyArmy: true,         // 只能征召女兵
      femaleBusinessBonus: 1.3,     // 女性经商加成30%（丝绸之利）
      femaleCraftBonus: 1.25,       // 女性工匠加成25%（织锦之利）
    },
    availableUnits: ['femaleInfantry', 'femaleCavalry', 'femaleArcherCav'],
    availableJobs: ['soldier', 'merchant', 'craftsman', 'builder', 'breeding'],
    femaleRoles: {
      merchant: '女商人', artisan: '女匠人', soldier: '女战士',
      cavalry: '女骑兵', archerCav: '女弓骑兵', infantry: '女步兵',
    },
  },
};

// 检查是否为全女性国家
export function isAllFemaleNation(nationId) {
  return ALL_FEMALE_NATIONS[nationId] !== undefined;
}

// 获取全女性国家的培训成本折扣
export function getFemaleTrainingDiscount(nationId) {
  const nation = ALL_FEMALE_NATIONS[nationId];
  return nation ? nation.rules.femaleSlaveCostDiscount : 1.0;
}

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

// ===== CITY/TRIBE LEVEL SYSTEM (城邦/部落等级系统) =====
// 城邦(city-state)最高5级，部落(tribe)最高3级
// 等级影响每周期产出的金钱、资源、粮食、兵源
// 战争会根据惨烈程度降级
export const CITY_LEVELS = {
  1: { name: '村落', icon: '🏘️', maxLevel: 5, type: 'city',
    production: { gold: 10, food: 15, resource: 5, recruit: 5 },
    defense: 10, population: 2000, desc: '小型聚落，基础产出' },
  2: { name: '镇集', icon: '🏘️', maxLevel: 5, type: 'city',
    production: { gold: 25, food: 30, resource: 12, recruit: 12 },
    defense: 20, population: 5000, desc: '发展中的集镇' },
  3: { name: '城邦', icon: '🏰', maxLevel: 5, type: 'city',
    production: { gold: 50, food: 55, resource: 25, recruit: 25 },
    defense: 35, population: 10000, desc: '成熟的城邦国家' },
  4: { name: '大都', icon: '🏯', maxLevel: 5, type: 'city',
    production: { gold: 90, food: 90, resource: 45, recruit: 45 },
    defense: 55, population: 18000, desc: '繁荣的大城市' },
  5: { name: '王都', icon: '👑', maxLevel: 5, type: 'city',
    production: { gold: 150, food: 140, resource: 70, recruit: 70 },
    defense: 80, population: 30000, desc: '西域最强盛的王都' },
};

export const TRIBE_LEVELS = {
  1: { name: '小部落', icon: '⛺', maxLevel: 3, type: 'tribe',
    production: { gold: 3, food: 8, resource: 2, recruit: 3 },
    defense: 5, population: 500, desc: '小型游牧部落' },
  2: { name: '大部族', icon: '🏕️', maxLevel: 3, type: 'tribe',
    production: { gold: 8, food: 20, resource: 6, recruit: 8 },
    defense: 15, population: 1500, desc: '发展壮大的部族' },
  3: { name: '部落联盟', icon: '🏴', maxLevel: 3, type: 'tribe',
    production: { gold: 18, food: 40, resource: 15, recruit: 18 },
    defense: 30, population: 4000, desc: '强大的部落联盟' },
};

// 升级所需资源
export const LEVEL_UPGRADE_COST = {
  city: {
    2: { gold: 500, food: 300, wood: 100, stone: 80 },
    3: { gold: 1500, food: 800, wood: 300, stone: 200, iron: 50 },
    4: { gold: 4000, food: 2000, wood: 800, stone: 500, iron: 150, jade: 20 },
    5: { gold: 10000, food: 5000, wood: 2000, stone: 1200, iron: 400, jade: 50, silk: 30 },
  },
  tribe: {
    2: { gold: 200, food: 150, wood: 50 },
    3: { gold: 800, food: 500, wood: 200, stone: 100 },
  },
};

// 战争降级规则
export const WAR_DAMAGE = {
  // 战争惨烈程度 → 降级概率
  light:   { downgradeChance: 0.1, levelLoss: 1, desc: '轻微损失', resourceLoss: 0.05 },
  medium:  { downgradeChance: 0.3, levelLoss: 1, desc: '中等损失', resourceLoss: 0.15 },
  heavy:   { downgradeChance: 0.6, levelLoss: 1, desc: '惨重损失', resourceLoss: 0.3 },
  devastating: { downgradeChance: 0.9, levelLoss: 2, desc: '毁灭性打击', resourceLoss: 0.5 },
};

// 国家类型判定（城邦 vs 部落）
export function getNationType(nationId) {
  const tribeNations = ['wusun', 'kangju', 'tokuz', 'qarqan', 'wucha', 'chumi', 'chumukun', 'amazons'];
  return tribeNations.includes(nationId) ? 'tribe' : 'city';
}

export function getMaxLevel(nationId) {
  return getNationType(nationId) === 'tribe' ? 3 : 5;
}

export function getLevelData(nationId, level) {
  const type = getNationType(nationId);
  const table = type === 'tribe' ? TRIBE_LEVELS : CITY_LEVELS;
  return table[level] || table[1];
}

// ===== DIFFICULTY SYSTEM (难度系统) =====
// 根据所选国家决定游戏难度
export const NATION_DIFFICULTY = {
  // 简单 - 大国富国，初始资源丰富
  easy: {
    nations: ['kucha', 'khotan', 'kashgar', 'soche', 'xiliang', 'loulan', 'aksu'],
    bonus: { gold: 500, food: 300, startingTroops: 50 },
    desc: '大国富邦，资源丰富，适合新手',
  },
  // 普通 - 中等国家
  medium: {
    nations: ['loulan', 'shanshan', 'karashahr', 'yarkand', 'bugur', 'karakhoja',
              'beshbaliq', 'dayuan', 'tashkurgan', 'gaochang', 'yanqi', 'niya'],
    bonus: { gold: 300, food: 200, startingTroops: 30 },
    desc: '中等国家，需要策略发展',
  },
  // 困难 - 小国或游牧
  hard: {
    nations: ['wusun', 'kangju', 'tokuz', 'amazons', 'qarqan', 'wucha',
              'jumi', 'charklik', 'pishan', 'keriya', 'charchan', 'chumi',
              'chumukun', 'kroran', 'jieshi', 'karghalik'],
    bonus: { gold: 150, food: 100, startingTroops: 15 },
    desc: '小国寡民或强敌环伺，极具挑战',
  },
};

export function getDifficulty(nationId) {
  for (const [diff, data] of Object.entries(NATION_DIFFICULTY)) {
    if (data.nations.includes(nationId)) return { level: diff, ...data };
  }
  return { level: 'medium', ...NATION_DIFFICULTY.medium };
}

// ===== EVENT/QUEST SYSTEM (事件任务系统) =====
// 随商业、战争等触发事件任务（解锁能力）
export const GAME_EVENTS = {
  // === 商业事件 ===
  trade_boom: {
    id: 'trade_boom', name: '商贸繁荣', type: 'commerce', icon: '💰',
    trigger: { minGold: 1000, minTradeRoutes: 2 },
    reward: { gold: 500, unlock: 'caravan_upgrade' },
    desc: '你的商路日益繁荣，商人们带来了丰厚的利润！解锁：高级商队',
  },
  silk_road_monopoly: {
    id: 'silk_road_monopoly', name: '丝路垄断', type: 'commerce', icon: '🧵',
    trigger: { minGold: 5000, minTradeRoutes: 5, controlledCities: 3 },
    reward: { gold: 2000, unlock: 'trade_embargo', relationBonus: 10 },
    desc: '你控制了丝绸之路的关键节点！解锁：贸易禁运能力',
  },
  slave_market_expansion: {
    id: 'slave_market_expansion', name: '奴隶市场扩张', type: 'commerce', icon: '⛓️',
    trigger: { minSlaves: 50 },
    reward: { unlock: 'slave_market_2', gold: 300 },
    desc: '奴隶贸易规模扩大！解锁：高级奴隶市场',
  },
  // === 军事事件 ===
  first_conquest: {
    id: 'first_conquest', name: '初战告捷', type: 'military', icon: '⚔️',
    trigger: { minBattles: 1 },
    reward: { unlock: 'military_doctrine', exp: 100 },
    desc: '你的第一场胜利！解锁：军事学说选择',
  },
  warrior_queen: {
    id: 'warrior_queen', name: '女武神崛起', type: 'military', icon: '👸⚔️',
    trigger: { minFemaleGenerals: 2, minBattles: 5 },
    reward: { unlock: 'female_elite_units', moraleBonus: 10 },
    desc: '女武将们展现了非凡的统帅才能！解锁：精锐女兵种',
  },
  desert_dominion: {
    id: 'desert_dominion', name: '沙漠霸主', type: 'military', icon: '🏜️',
    trigger: { controlledCities: 5, minArmy: 500 },
    reward: { unlock: 'desert_fortress', gold: 1000 },
    desc: '你征服了沙漠中的五座城邦！解锁：沙漠要塞建造',
  },
  unification_war: {
    id: 'unification_war', name: '统一战争', type: 'military', icon: '👑',
    trigger: { controlledCities: 15 },
    reward: { unlock: 'emperor_title', allStatsBonus: 10 },
    desc: '你已控制半数西域城邦！解锁：称王称号',
  },
  // === 外交事件 ===
  alliance_network: {
    id: 'alliance_network', name: '联盟网络', type: 'diplomacy', icon: '🤝',
    trigger: { minAlliances: 3 },
    reward: { unlock: 'trade_league', relationBonus: 15 },
    desc: '你的外交网络初具规模！解锁：贸易联盟',
  },
  marriage_alliance: {
    id: 'marriage_alliance', name: '联姻结盟', type: 'diplomacy', icon: '💒',
    trigger: { minAlliances: 1, minFemaleCitizens: 10 },
    reward: { unlock: 'royal_marriage', relationBonus: 25 },
    desc: '通过联姻巩固了盟约！解锁：王室联姻',
  },
  // === 发展事件 ===
  city_growth: {
    id: 'city_growth', name: '城邦兴盛', type: 'development', icon: '🏙️',
    trigger: { minCityLevel: 3 },
    reward: { unlock: 'advanced_building', gold: 500 },
    desc: '城邦发展到了新的高度！解锁：高级建筑',
  },
  population_boom: {
    id: 'population_boom', name: '人口爆炸', type: 'development', icon: '👶',
    trigger: { minPopulation: 5000 },
    reward: { unlock: 'mass_recruitment', food: 200 },
    desc: '人口大幅增长！解锁：大规模征兵',
  },
  tech_breakthrough: {
    id: 'tech_breakthrough', name: '科技突破', type: 'development', icon: '🔬',
    trigger: { minTechLevel: 5 },
    reward: { unlock: 'advanced_weapons', resourceBonus: 0.1 },
    desc: '科技研发取得重大突破！解锁：高级武器',
  },
  // === 特殊事件（全女性国家）===
  amazon_tradition: {
    id: 'amazon_tradition', name: '阿玛宗传统', type: 'special', icon: '⚔️♀️',
    trigger: { nation: 'amazons', minTurn: 10 },
    reward: { unlock: 'amazon_elite', moraleBonus: 20 },
    desc: '阿玛宗战士传统发扬光大！解锁：阿玛宗精锐卫队',
  },
  xiliang_prosperity: {
    id: 'xiliang_prosperity', name: '西梁盛世', type: 'special', icon: '🌸',
    trigger: { nation: 'xiliang', minCityLevel: 3 },
    reward: { unlock: 'silk_mastery', gold: 1000 },
    desc: '西梁女国进入盛世！解锁：丝绸大师级工艺',
  },
};

// 检查事件是否可触发
export function checkEvents(state) {
  const triggered = [];
  for (const [id, event] of Object.entries(GAME_EVENTS)) {
    if (state.completedQuests.includes(id)) continue;
    const t = event.trigger;
    let canTrigger = true;
    if (t.minGold && state.player.gold < t.minGold) canTrigger = false;
    if (t.minTradeRoutes && state.tradeRoutes.length < t.minTradeRoutes) canTrigger = false;
    if (t.controlledCities && state.controlledCities.size < t.controlledCities) canTrigger = false;
    if (t.minSlaves && state.slaves.total < t.minSlaves) canTrigger = false;
    if (t.minBattles && (state.battleCount || 0) < t.minBattles) canTrigger = false;
    if (t.minFemaleGenerals && state.generals.filter(g => g.gender === 'female').length < t.minFemaleGenerals) canTrigger = false;
    if (t.minArmy && state.totalArmy < t.minArmy) canTrigger = false;
    if (t.minAlliances && state.alliances.length < t.minAlliances) canTrigger = false;
    if (t.minFemaleCitizens && (state.citizens.inventory.femaleCitizen || 0) < t.minFemaleCitizens) canTrigger = false;
    if (t.minCityLevel && (state.nationLevel || 1) < t.minCityLevel) canTrigger = false;
    if (t.minPopulation && state.tribe.population < t.minPopulation) canTrigger = false;
    if (t.minTechLevel && state.tribe.techLevel < t.minTechLevel) canTrigger = false;
    if (t.minTurn && state.turn < t.minTurn) canTrigger = false;
    if (t.nation && state.player.currentNation !== t.nation) canTrigger = false;
    if (canTrigger) triggered.push(event);
  }
  return triggered;
}

// ===== 72 PASSES & PORTS (关隘+港口) =====
export const PASSES_PORTS = {
  // === 关隘 (48 passes) ===
  passes: [
    { id:'p_01', name:'玉门关', x:68, y:38, type:'pass', nation:'shanshan', troops:500, desc:'丝路东端第一关' },
    { id:'p_02', name:'阳关', x:65, y:42, type:'pass', nation:'shanshan', troops:400, desc:'西出阳关无故人' },
    { id:'p_03', name:'铁门关', x:42, y:32, type:'pass', nation:'karashahr', troops:300, desc:'天山南麓铁门天险' },
    { id:'p_04', name:'葱岭关', x:10, y:35, type:'pass', nation:'kashgar', troops:250, desc:'帕米尔高原要隘' },
    { id:'p_05', name:'天山隘口', x:50, y:18, type:'pass', nation:'wusun', troops:200, desc:'天山南北通道' },
    { id:'p_06', name:'昆仑隘口', x:30, y:65, type:'pass', nation:'khotan', troops:150, desc:'昆仑山北麓要道' },
    { id:'p_07', name:'阿玛宗山口', x:72, y:22, type:'pass', nation:'amazons', troops:300, desc:'阿玛宗领地入口' },
    { id:'p_08', name:'火焰口', x:54, y:28, type:'pass', nation:'karakhoja', troops:200, desc:'火焰山隘口' },
    { id:'p_09', name:'白龙堆', x:58, y:45, type:'pass', nation:'loulan', troops:180, desc:'白龙堆沙漠险道' },
    { id:'p_10', name:'孔雀河口', x:48, y:42, type:'pass', nation:'weili', troops:120, desc:'孔雀河入湖口' },
    { id:'p_11', name:'塔里木渡', x:38, y:45, type:'pass', nation:'bugur', troops:150, desc:'塔里木河渡口' },
    { id:'p_12', name:'疏勒西口', x:5, y:35, type:'pass', nation:'shule', troops:200, desc:'疏勒西出要道' },
    { id:'p_13', name:'于阗南口', x:22, y:65, type:'pass', nation:'khotan', troops:130, desc:'于阗南通昆仑' },
    { id:'p_14', name:'龟兹北口', x:35, y:28, type:'pass', nation:'kucha', troops:180, desc:'龟兹北上天山' },
    { id:'p_15', name:'焉耆西口', x:38, y:30, type:'pass', nation:'karashahr', troops:160, desc:'焉耆西行要道' },
    { id:'p_16', name:'姑墨南口', x:28, y:45, type:'pass', nation:'aksu', troops:100, desc:'姑墨南通莎车' },
    { id:'p_17', name:'莎车北口', x:18, y:48, type:'pass', nation:'yarkand', troops:140, desc:'莎车北上要道' },
    { id:'p_18', name:'精绝隘', x:38, y:58, type:'pass', nation:'niya', troops:80, desc:'精绝古国隘口' },
    { id:'p_19', name:'且末隘', x:44, y:54, type:'pass', nation:'charklik', troops:90, desc:'且末绿洲隘口' },
    { id:'p_20', name:'若羌山口', x:66, y:52, type:'pass', nation:'qarqan', troops:110, desc:'阿尔金山口' },
    { id:'p_21', name:'皮山隘', x:22, y:48, type:'pass', nation:'pishan', troops:70, desc:'皮山小隘' },
    { id:'p_22', name:'竭石关', x:12, y:48, type:'pass', nation:'jieshi', troops:160, desc:'宝石山关隘' },
    { id:'p_23', name:'石头城关', x:8, y:38, type:'pass', nation:'tashkurgan', troops:250, desc:'塔什库尔干石城' },
    { id:'p_24', name:'叶尔羌口', x:18, y:44, type:'pass', nation:'karghalik', troops:100, desc:'叶尔羌河隘口' },
    { id:'p_25', name:'克里雅隘', x:34, y:60, type:'pass', nation:'keriya', troops:60, desc:'克里雅河隘口' },
    { id:'p_26', name:'乌恰山口', x:22, y:22, type:'pass', nation:'wucha', troops:130, desc:'乌恰天山隘口' },
    { id:'p_27', name:'北庭关', x:52, y:18, type:'pass', nation:'beshbaliq', troops:300, desc:'北庭都护关隘' },
    { id:'p_28', name:'高昌隘', x:48, y:32, type:'pass', nation:'gaochang', troops:200, desc:'交河城隘口' },
    { id:'p_29', name:'温宿山口', x:33, y:22, type:'pass', nation:'wensu', troops:140, desc:'温宿铁矿隘口' },
    { id:'p_30', name:'东女国关', x:68, y:52, type:'pass', nation:'dongnv', troops:200, desc:'东女国入口关隘' },
    { id:'p_31', name:'西梁谷口', x:12, y:38, type:'pass', nation:'xiliang', troops:180, desc:'西梁女国谷口' },
    { id:'p_32', name:'大宛西口', x:2, y:44, type:'pass', nation:'dayuan', troops:220, desc:'大宛国西端' },
    { id:'p_33', name:'康居北口', x:4, y:10, type:'pass', nation:'kangju', troops:250, desc:'康居北部关隘' },
    { id:'p_34', name:'粟特东口', x:10, y:28, type:'pass', nation:'soche', troops:180, desc:'粟特东境关隘' },
    { id:'p_35', name:'突骑施北口', x:62, y:4, type:'pass', nation:'tokuz', troops:200, desc:'突骑施北境' },
    { id:'p_36', name:'处密隘', x:62, y:32, type:'pass', nation:'chumi', troops:100, desc:'处密部隘口' },
    { id:'p_37', name:'处木昆口', x:42, y:6, type:'pass', nation:'chumukun', troops:110, desc:'伊犁河谷隘口' },
    { id:'p_38', name:'于阗西口', x:14, y:60, type:'pass', nation:'yutian', troops:90, desc:'于阗西境隘口' },
    { id:'p_39', name:'焉耆南口', x:44, y:34, type:'pass', nation:'yanqi', troops:120, desc:'焉耆南境' },
    { id:'p_40', name:'危须渡口', x:44, y:32, type:'pass', nation:'kroran', troops:80, desc:'博斯腾湖渡口' },
    { id:'p_41', name:'扜弥隘', x:28, y:54, type:'pass', nation:'jumi', troops:60, desc:'扜弥小国隘口' },
    { id:'p_42', name:'且末南口', x:48, y:58, type:'pass', nation:'charchan', troops:70, desc:'且末南境隘口' },
    { id:'p_43', name:'楼兰东口', x:60, y:45, type:'pass', nation:'loulan', troops:200, desc:'楼兰东境关隘' },
    { id:'p_44', name:'龟兹南口', x:36, y:42, type:'pass', nation:'kucha', troops:150, desc:'龟兹南下要道' },
    { id:'p_45', name:'疏勒南口', x:14, y:38, type:'pass', nation:'kashgar', troops:170, desc:'疏勒南通要道' },
    { id:'p_46', name:'乌孙东口', x:56, y:12, type:'pass', nation:'wusun', troops:230, desc:'乌孙东境' },
    { id:'p_47', name:'轮台北口', x:40, y:34, type:'pass', nation:'bugur', troops:130, desc:'轮台北境' },
    { id:'p_48', name:'鄯善南口', x:62, y:55, type:'pass', nation:'shanshan', troops:100, desc:'鄯善南境' },
  ],
  // === 港口 (24 ports) ===
  ports: [
    { id:'pt_01', name:'楼兰港', x:54, y:46, type:'port', nation:'loulan', troops:200, desc:'罗布泊水运枢纽' },
    { id:'pt_02', name:'危须渔港', x:44, y:32, type:'port', nation:'kroran', troops:100, desc:'博斯腾湖渔港' },
    { id:'pt_03', name:'焉耆港', x:46, y:30, type:'port', nation:'yanqi', troops:150, desc:'焉耆湖水港' },
    { id:'pt_04', name:'于阗港', x:26, y:60, type:'port', nation:'khotan', troops:180, desc:'于阗河港' },
    { id:'pt_05', name:'莎车渡口', x:20, y:56, type:'port', nation:'yarkand', troops:120, desc:'叶尔羌河渡口' },
    { id:'pt_06', name:'西梁渡口', x:16, y:42, type:'port', nation:'xiliang', troops:100, desc:'西梁女国渡口' },
    { id:'pt_07', name:'龟兹码头', x:36, y:36, type:'port', nation:'kucha', troops:130, desc:'龟兹河运码头' },
    { id:'pt_08', name:'疏勒商港', x:16, y:34, type:'port', nation:'kashgar', troops:160, desc:'疏勒商贸港口' },
    { id:'pt_09', name:'姑墨渡口', x:30, y:42, type:'port', nation:'aksu', troops:90, desc:'姑墨河渡' },
    { id:'pt_10', name:'轮台渡口', x:40, y:40, type:'port', nation:'bugur', troops:110, desc:'轮台河渡' },
    { id:'pt_11', name:'尉犁渔港', x:50, y:40, type:'port', nation:'weili', troops:80, desc:'孔雀河渔港' },
    { id:'pt_12', name:'精绝古渡', x:38, y:60, type:'port', nation:'niya', troops:60, desc:'尼雅河古渡' },
    { id:'pt_13', name:'且末码头', x:44, y:54, type:'port', nation:'charklik', troops:70, desc:'且末河码头' },
    { id:'pt_14', name:'粟特商港', x:6, y:30, type:'port', nation:'soche', troops:140, desc:'粟特河商港' },
    { id:'pt_15', name:'大宛渡口', x:6, y:44, type:'port', nation:'dayuan', troops:100, desc:'费尔干纳渡口' },
    { id:'pt_16', name:'竭石港', x:12, y:50, type:'port', nation:'jieshi', troops:80, desc:'宝石山河港' },
    { id:'pt_17', name:'叶尔羌港', x:18, y:44, type:'port', nation:'karghalik', troops:90, desc:'叶尔羌河港' },
    { id:'pt_18', name:'高昌码头', x:50, y:34, type:'port', nation:'gaochang', troops:100, desc:'交河码头' },
    { id:'pt_19', name:'北庭港', x:54, y:20, type:'port', nation:'beshbaliq', troops:120, desc:'北庭水运' },
    { id:'pt_20', name:'东女国港', x:70, y:56, type:'port', nation:'dongnv', troops:90, desc:'东女国河港' },
    { id:'pt_21', name:'于阗西港', x:16, y:62, type:'port', nation:'yutian', troops:70, desc:'于阗西境河港' },
    { id:'pt_22', name:'疏勒西港', x:6, y:38, type:'port', nation:'shule', troops:80, desc:'疏勒西境港' },
    { id:'pt_23', name:'温宿渡口', x:34, y:24, type:'port', nation:'wensu', troops:60, desc:'温宿河渡' },
    { id:'pt_24', name:'扜弥渡口', x:30, y:54, type:'port', nation:'jumi', troops:50, desc:'扜弥河渡' },
  ],
};

// ===== 39 NATION STORY EVENTS (每个国家3-5个独特剧本事件) =====
// 当玩家扩张到对应国家附近时触发
export const NATION_STORY_EVENTS = {
  // === 楼兰 ===
  loulan: [
    { id:'ns_loulan_1', name:'沙海迷城', trigger:{ nearNation:'loulan', minTurn:5 },
      desc:'你在沙漠中发现了一座被遗忘的楼兰古城遗迹...', choices:[
        { text:'探索遗迹', reward:{ gold:300, relic:1 }, risk:'ambush' },
        { text:'报告楼兰王', reward:{ relation:20, gold:100 }, risk:'none' }],
      lore:'楼兰古城下埋藏着无数秘密...' },
    { id:'ns_loulan_2', name:'罗布泊之谜', trigger:{ nearNation:'loulan', minTurn:15 },
      desc:'罗布泊的水位正在下降，楼兰人面临生存危机...', choices:[
        { text:'帮助修建水渠', cost:{ gold:200, wood:100 }, reward:{ relation:30, unlock:'irrigation_master' } },
        { text:'趁机进攻', reward:{ plunder:500 }, risk:'war' }],
      lore:'罗布泊是楼兰的生命之源...' },
    { id:'ns_loulan_3', name:'丝路关税之争', trigger:{ nearNation:'loulan', minTurn:20, controlledCities:2 },
      desc:'楼兰商队经过你的领地，是否征收高额关税？', choices:[
        { text:'合理征税', reward:{ gold:200, relation:-5 } },
        { text:'免税通行', reward:{ relation:15, tradeRoute:'loulan_silk' } },
        { text:'扣押商队', reward:{ gold:500, silk:20 }, risk:'war' }] },
  ],
  // === 龟兹 ===
  kucha: [
    { id:'ns_kucha_1', name:'龟兹乐舞', trigger:{ nearNation:'kucha', minTurn:3 },
      desc:'龟兹乐师前来献艺，美妙的音乐令人陶醉...', choices:[
        { text:'重赏乐师', cost:{ gold:100 }, reward:{ culture:20, unlock:'kucha_music' } },
        { text:'邀请留任', cost:{ gold:200 }, reward:{ culture:40, dancer:5 } }] },
    { id:'ns_kucha_2', name:'千佛洞秘宝', trigger:{ nearNation:'kucha', minTurn:20 },
      desc:'龟兹千佛洞中发现了古代经卷和宝物...', choices:[
        { text:'保护文物', reward:{ culture:30, relation:20 } },
        { text:'取走宝物', reward:{ gold:500, relic:3 }, risk:'relation_-30' }] },
    { id:'ns_kucha_3', name:'佛教东传', trigger:{ nearNation:'kucha', minTurn:30 },
      desc:'龟兹高僧希望借道传播佛法...', choices:[
        { text:'支持传教', reward:{ culture:50, unlock:'buddhism_spread' } },
        { text:'收取过境费', reward:{ gold:300 } }] },
  ],
  // === 于阗 ===
  khotan: [
    { id:'ns_khotan_1', name:'美玉之争', trigger:{ nearNation:'khotan', minTurn:8 },
      desc:'于阗玉矿发现了罕见的巨型玉石，各方势力虎视眈眈...', choices:[
        { text:'协助护送', reward:{ jade:30, relation:25 } },
        { text:'半路截取', reward:{ jade:50 }, risk:'war' }] },
    { id:'ns_khotan_2', name:'于阗织女', trigger:{ nearNation:'khotan', minTurn:15 },
      desc:'于阗最出色的织女愿意加入你的领地...', choices:[
        { text:'欢迎接纳', cost:{ gold:200 }, reward:{ silk_production:30, femaleCitizen:5 } },
        { text:'送回于阗', reward:{ relation:20 } }] },
    { id:'ns_khotan_3', name:'玉石之路', trigger:{ nearNation:'khotan', minTurn:25, controlledCities:3 },
      desc:'于阗希望开辟新的玉石贸易路线...', choices:[
        { text:'合作共赢', reward:{ tradeRoute:'jade_road', gold:400 } },
        { text:'独占贸易', reward:{ gold:200 }, risk:'relation_-20' }] },
  ],
  // === 阿玛宗 ===
  amazons: [
    { id:'ns_amazons_1', name:'女战士的挑战', trigger:{ nearNation:'amazons', minTurn:10 },
      desc:'阿玛宗女战士向你发出了武斗挑战！', choices:[
        { text:'应战', reward:{ relation:30, exp:200 }, risk:'injury' },
        { text:'婉拒', reward:{ relation:-10 } }] },
    { id:'ns_amazons_2', name:'猎豹之盟', trigger:{ nearNation:'amazons', minTurn:20 },
      desc:'阿玛宗驯养的猎豹可以帮助你侦察敌情...', choices:[
        { text:'结盟交换', cost:{ horse:20 }, reward:{ unlock:'falcon_scout', relation:25 } },
        { text:'购买猎豹', cost:{ gold:500 }, reward:{ falcon:5 } }] },
    { id:'ns_amazons_3', name:'阿玛宗女王', trigger:{ nearNation:'amazons', minTurn:35 },
      desc:'阿玛宗女王希望与你面谈联盟事宜...', choices:[
        { text:'亲自前往', reward:{ alliance:'amazons', femaleGeneral:1 } },
        { text:'派使者', reward:{ relation:15 } }] },
  ],
  // === 西梁女国 ===
  xiliang: [
    { id:'ns_xiliang_1', name:'子母河之水', trigger:{ nearNation:'xiliang', minTurn:5 },
      desc:'你发现了传说中的子母河，河水有神奇力量...', choices:[
        { text:'取水饮用', reward:{ population:50, unlock:'spring_water' } },
        { text:'献给西梁', reward:{ relation:30, silk:20 } }] },
    { id:'ns_xiliang_2', name:'天衣无缝', trigger:{ nearNation:'xiliang', minTurn:18 },
      desc:'西梁织女织出了传说中的"天衣"...', choices:[
        { text:'购买天衣', cost:{ gold:1000 }, reward:{ silk:100, unlock:'heavenly_silk' } },
        { text:'请求学艺', cost:{ gold:300 }, reward:{ unlock:'weaving_tech' } }] },
    { id:'ns_xiliang_3', name:'女王招亲', trigger:{ nearNation:'xiliang', minTurn:30 },
      desc:'西梁女王公开招亲，各国使者云集...', choices:[
        { text:'参加招亲', reward:{ alliance:'xiliang', femaleGeneral:1, relation:50 } },
        { text:'送礼祝贺', cost:{ gold:500 }, reward:{ relation:20 } }] },
  ],
  // === 乌孙 ===
  wusun: [
    { id:'ns_wusun_1', name:'天马传说', trigger:{ nearNation:'wusun', minTurn:8 },
      desc:'乌孙人声称拥有汗血宝马的后代...', choices:[
        { text:'购买宝马', cost:{ gold:800 }, reward:{ horse:50, unlock:'heavenly_horse' } },
        { text:'以物易物', cost:{ silk:30 }, reward:{ horse:30 } }] },
    { id:'ns_wusun_2', name:'草原风暴', trigger:{ nearNation:'wusun', minTurn:20 },
      desc:'乌孙草原上出现了大规模马匪...', choices:[
        { text:'协助剿匪', reward:{ relation:25, horse:20, exp:150 } },
        { text:'置之不理', risk:'raid' }] },
    { id:'ns_wusun_3', name:'和亲之议', trigger:{ nearNation:'wusun', minTurn:30 },
      desc:'乌孙王提议和亲，以巩固两国关系...', choices:[
        { text:'同意和亲', reward:{ alliance:'wusun', relation:40, horse:100 } },
        { text:'婉言拒绝', reward:{ relation:-15 } }] },
  ],
  // === 疏勒 ===
  kashgar: [
    { id:'ns_kashgar_1', name:'巴扎盛会', trigger:{ nearNation:'kashgar', minTurn:5 },
      desc:'疏勒大巴扎正在举办年度商贸盛会...', choices:[
        { text:'参加商贸', cost:{ gold:200 }, reward:{ spice:30, silk:20, relation:10 } },
        { text:'设摊售卖', reward:{ gold:400 } }] },
    { id:'ns_kashgar_2', name:'东西交汇', trigger:{ nearNation:'kashgar', minTurn:15 },
      desc:'疏勒成为了东西方文化交汇的中心...', choices:[
        { text:'建设学堂', cost:{ gold:500 }, reward:{ culture:30, unlock:'academy' } },
        { text:'招募翻译', cost:{ gold:200 }, reward:{ unlock:'translator', diplomacy:15 } }] },
  ],
  // === 粟特 ===
  soche: [
    { id:'ns_soche_1', name:'粟特商路', trigger:{ nearNation:'soche', minTurn:3 },
      desc:'粟特商人提议合作开辟新的商路...', choices:[
        { text:'合作', cost:{ gold:300 }, reward:{ tradeRoute:'sogdian_road', gold_per_turn:50 } },
        { text:'拒绝', reward:{ relation:-5 } }] },
    { id:'ns_soche_2', name:'银币之谜', trigger:{ nearNation:'soche', minTurn:20 },
      desc:'粟特银币在西域流通广泛，是否发行自己的货币？', choices:[
        { text:'发行货币', cost:{ gold:1000, silver:50 }, reward:{ unlock:'currency', economy:30 } },
        { text:'使用粟特银币', reward:{ relation:15 } }] },
  ],
  // === 康居 ===
  kangju: [
    { id:'ns_kangju_1', name:'铁骑南下', trigger:{ nearNation:'kangju', minTurn:10 },
      desc:'康居铁骑正在集结，似乎准备南下...', choices:[
        { text:'加强防御', cost:{ gold:200, stone:50 }, reward:{ defense:20 } },
        { text:'外交斡旋', cost:{ gold:300 }, reward:{ relation:15 } },
        { text:'先发制人', risk:'war', reward:{ exp:200 } }] },
    { id:'ns_kangju_2', name:'草原盟约', trigger:{ nearNation:'kangju', minTurn:25 },
      desc:'康居王提议签订草原互不侵犯条约...', choices:[
        { text:'签订条约', reward:{ relation:30, peace:20 } },
        { text:'拒绝', risk:'war' }] },
  ],
  // === 大宛 ===
  dayuan: [
    { id:'ns_dayuan_1', name:'汗血宝马', trigger:{ nearNation:'dayuan', minTurn:8 },
      desc:'大宛国愿意出售汗血宝马，但价格不菲...', choices:[
        { text:'重金购买', cost:{ gold:1500 }, reward:{ horse:100, unlock:'ferghana_horse' } },
        { text:'以粮换马', cost:{ food:500 }, reward:{ horse:40 } }] },
    { id:'ns_dayuan_2', name:'费尔干纳谷地', trigger:{ nearNation:'dayuan', minTurn:22 },
      desc:'费尔干纳谷地物产丰富，是理想的屯田之地...', choices:[
        { text:'请求租借', cost:{ gold:500 }, reward:{ food_per_turn:30, relation:10 } },
        { text:'武力夺取', risk:'war', reward:{ territory:1 } }] },
  ],
  // === 东女国 ===
  dongnv: [
    { id:'ns_dongnv_1', name:'女王使者', trigger:{ nearNation:'dongnv', minTurn:8 },
      desc:'东女国女王派来使者，希望建立贸易关系...', choices:[
        { text:'欢迎使者', reward:{ relation:20, silk:15 } },
        { text:'扣押使者', reward:{ intel:20 }, risk:'war' }] },
    { id:'ns_dongnv_2', name:'高原药草', trigger:{ nearNation:'dongnv', minTurn:18 },
      desc:'东女国的药草师拥有神奇的医术...', choices:[
        { text:'邀请药草师', cost:{ gold:300 }, reward:{ unlock:'herb_mastery', herb:30 } },
        { text:'交换药草', cost:{ silk:20 }, reward:{ herb:50 } }] },
    { id:'ns_dongnv_3', name:'女王继承', trigger:{ nearNation:'dongnv', minTurn:35 },
      desc:'东女国女王驾崩，两位公主争夺王位...', choices:[
        { text:'支持大公主', reward:{ relation:30, alliance_chance:0.5 }, risk:'civil_war' },
        { text:'保持中立', reward:{ relation:5 } }] },
  ],
  // 通用小国事件模板 (覆盖其余国家)
  _default: [
    { id:'ns_default_1', name:'边境冲突', trigger:{ minTurn:10 },
      desc:'边境部落发生了冲突，需要你出面调停...', choices:[
        { text:'调停', cost:{ gold:100 }, reward:{ relation:15, exp:50 } },
        { text:'坐视不管', risk:'relation_-10' }] },
    { id:'ns_default_2', name:'商队遇袭', trigger:{ minTurn:15 },
      desc:'一支商队在你的领地附近被马匪袭击...', choices:[
        { text:'出兵救援', reward:{ gold:200, relation:10, exp:100 } },
        { text:'收取过路费后放行', reward:{ gold:100 } }] },
    { id:'ns_default_3', name:'流民涌入', trigger:{ minTurn:20 },
      desc:'大量流民从邻国涌入你的领地...', choices:[
        { text:'接纳安置', cost:{ food:200, gold:100 }, reward:{ population:100, relation:10 } },
        { text:'关闭边境', reward:{ relation:-15 } }] },
  ],
};

// 获取国家的剧本事件
export function getNationStoryEvents(nationId) {
  return NATION_STORY_EVENTS[nationId] || NATION_STORY_EVENTS._default;
}

// 检查玩家是否在某国附近（简化版：基于领地距离）
export function isNearNation(playerLocation, nationId, nations) {
  if (!nations || !nations[nationId]) return false;
  const nation = nations[nationId];
  const cap = nation.capital;
  if (!cap) return false;
  const dx = Math.abs(playerLocation.x - cap.x);
  const dy = Math.abs(playerLocation.y - cap.y);
  return (dx + dy) <= 20; // 曼哈顿距离<=20视为"附近"
}

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
