/**
 * Asset Manager v4.0 - ROTK/Sengoku Rance Style
 * High-quality procedural portraits with detailed anime-style rendering
 * Realistic Silk Road terrain map with roads, rivers, mountains
 */

const F_HAIR=['long_straight','long_wavy','twin_tails','high_bun','side_swept','braided','flowing','ornate','ponytail','half_up','hime_cut','sidetail','drill','curly','bob'];
const M_HAIR=['short','medium','long_tied','warrior','braided','topknot','flowing','spiked','shaved','wild','samurai','ponytail'];
const FACES=['oval','round','heart','diamond','square','elongated'];
const EYES=['almond','round','cat','gentle','fierce','mysterious','bright','deep','tsurime','tareme'];
const SKIN=['#FFE8D0','#F5DCC8','#EBC8A8','#D4A574','#C4956A','#F0D5B8','#FFF2E5','#E0C8A8','#F5E0C8','#FFE0C0'];
const HCF=['#1a1a2e','#2C1810','#4a2c2a','#8B4513','#D2691E','#800020','#2d1b14','#0a0a14','#3d2b1f','#5c3a21','#C0392B','#6B3FA0'];
const HCM=['#1a1a1a','#2C1810','#3d2b1f','#0a0a14','#4a3728','#2d1b14','#1a1a2e','#333','#555','#6B3FA0'];
const ACCS=['tiara','hairpin','earrings','flower_crown','veil','ribbon','jade_pendant','gold_chain','phoenix_pin','none','none'];
const EXPRS=['smile','serious','gentle','fierce','mysterious','playful','noble','shy','confident','melancholy','smirk','pout'];
const BGSC=['desert_oasis','palace','mountain','silk_road','temple','garden','battlefield','market','river','forest','sunset','night','cherry','throne','moonlight','lake'];
const IRISC=['#4A3728','#2C5F2D','#1E3A5F','#5B3A29','#3D2B1F','#2E4057','#6B3FA0','#1a6b5a'];

const NOUF={
  amazons:{p:'#DC143C',s:'#8B0000',a:'#FFD700',type:'armor'},
  xiliang:{p:'#FF69B4',s:'#FF1493',a:'#FFD700',type:'silk'},
  loulan:{p:'#DAA520',s:'#B8860B',a:'#F0E68C',type:'noble'},
  kucha:{p:'#4169E1',s:'#1E90FF',a:'#87CEEB',type:'dancer'},
  khotan:{p:'#2E8B57',s:'#3CB371',a:'#98FB98',type:'jade'},
  wusun:{p:'#4682B4',s:'#5F9EA0',a:'#B0E0E6',type:'cavalry'},
  default:{p:'#8B7355',s:'#6B5B45',a:'#D4A853',type:'standard'}
};

// Realistic Silk Road geography
const GEO={
  mountains:[
    ...Array.from({length:70},(_,i)=>({x:i,y:8+Math.floor(Math.sin(i*0.15)*2)})),
    ...Array.from({length:70},(_,i)=>({x:i,y:9+Math.floor(Math.sin(i*0.15)*2)})),
    ...Array.from({length:70},(_,i)=>({x:i,y:62+Math.floor(Math.sin(i*0.1))})),
    ...Array.from({length:70},(_,i)=>({x:i,y:63})),
    ...Array.from({length:30},(_,i)=>({x:2+Math.floor(Math.sin(i*0.2)),y:15+i})),
    ...Array.from({length:30},(_,i)=>({x:3+Math.floor(Math.sin(i*0.2)),y:15+i})),
    ...Array.from({length:25},(_,i)=>({x:55+i,y:55+Math.floor(Math.sin(i*0.2))})),
  ],
  rivers:[
    {path:[{x:10,y:38},{x:15,y:37},{x:20,y:38},{x:25,y:39},{x:30,y:38},{x:35,y:37},{x:40,y:38},{x:45,y:39},{x:50,y:40},{x:55,y:42},{x:60,y:44},{x:65,y:46}],w:3,name:'塔里木河'},
    {path:[{x:38,y:12},{x:38,y:18},{x:39,y:24},{x:39,y:30},{x:38,y:36}],w:2,name:'孔雀河'},
    {path:[{x:25,y:58},{x:25,y:55},{x:26,y:50},{x:26,y:45},{x:25,y:40}],w:2,name:'于阗河'},
    {path:[{x:18,y:52},{x:19,y:48},{x:20,y:44},{x:20,y:40},{x:19,y:38}],w:2,name:'叶尔羌河'},
    {path:[{x:12,y:32},{x:15,y:34},{x:18,y:36},{x:20,y:38}],w:1,name:'疏勒河'},
    {path:[{x:42,y:5},{x:45,y:8},{x:48,y:10},{x:52,y:12},{x:55,y:14}],w:2,name:'伊犁河'},
    {path:[{x:15,y:42},{x:15,y:38},{x:14,y:35}],w:1,name:'子母河'},
  ],
  roads:[
    {path:[{x:3,y:30},{x:8,y:30},{x:13,y:32},{x:18,y:33},{x:23,y:33},{x:28,y:33},{x:33,y:34},{x:38,y:35},{x:43,y:35},{x:48,y:35},{x:53,y:33},{x:58,y:30},{x:63,y:28},{x:68,y:26},{x:73,y:24},{x:78,y:22}],w:2,name:'丝路北道'},
    {path:[{x:3,y:42},{x:8,y:42},{x:13,y:43},{x:18,y:44},{x:23,y:45},{x:28,y:45},{x:33,y:44},{x:38,y:45},{x:43,y:47},{x:48,y:49},{x:53,y:50},{x:58,y:52},{x:63,y:54}],w:2,name:'丝路南道'},
    {path:[{x:38,y:12},{x:43,y:13},{x:48,y:14},{x:53,y:15},{x:58,y:16},{x:63,y:17},{x:68,y:18},{x:73,y:19}],w:1,name:'天山北道'},
    {path:[{x:35,y:35},{x:35,y:38},{x:35,y:42}],w:1,name:'龟兹-于阗道'},
    {path:[{x:55,y:35},{x:55,y:40},{x:55,y:45}],w:1,name:'高昌-楼兰道'},
    {path:[{x:15,y:32},{x:15,y:38},{x:15,y:42}],w:1,name:'疏勒-西梁道'},
    {path:[{x:50,y:15},{x:50,y:20},{x:50,y:25},{x:50,y:30}],w:1,name:'乌孙-高昌道'},
    {path:[{x:25,y:45},{x:25,y:50},{x:25,y:55}],w:1,name:'于阗南道'},
  ],
  lakes:[
    {x:39,y:33,rx:3,ry:2,name:'博斯腾湖'},
    {x:55,y:45,rx:2,ry:2,name:'罗布泊'},
    {x:15,y:40,rx:2,ry:1.5,name:'子母湖'},
  ],
  desert:Array.from({length:200},(_,i)=>({x:15+Math.floor((i*37)%50),y:30+Math.floor((i*53)%25)}))
};

export class AssetManager {
  constructor(){this.portraitCache=new Map();this.tileCache=new Map();this.mapCanvas=null;}
  _rng(s){return()=>{s=(s*16807)%2147483647;return(s-1)/2147483646;};}
  _l(h,a){if(!h||h.length<7)return'#888888';let r=parseInt(h.slice(1,3),16),g=parseInt(h.slice(3,5),16),b=parseInt(h.slice(5,7),16);if(isNaN(r)||isNaN(g)||isNaN(b))return'#888888';return'#'+[r,g,b].map(c=>Math.min(255,Math.max(0,c+a)).toString(16).padStart(2,'0')).join('');}
  _d(h,a){return this._l(h,-a);}

  generatePortrait(seed,gender,nationId,rank){
    const key=`${seed}_${gender}_${nationId}_${rank}`;
    if(this.portraitCache.has(key))return this.portraitCache.get(key);
    const rng=this._rng(seed),S=320,cv=document.createElement('canvas');
    cv.width=S;cv.height=S;const c=cv.getContext('2d');
    const outfit={...NOUF.default,...(NOUF[nationId]||{})};
    const skin=SKIN[Math.floor(rng()*SKIN.length)];
    const bg=BGSC[Math.floor(rng()*BGSC.length)];
    this._drawBg(c,S,bg,rng);
    if(gender==='female')this._drawFemale(c,S,rng,skin,outfit,rank);
    else this._drawMale(c,S,rng,skin,outfit,rank);
    this._drawFrame(c,S,outfit.p);
    const url=cv.toDataURL('image/jpeg',0.92);
    this.portraitCache.set(key,url);return url;
  }

  _drawBg(c,S,scene,rng){
    const g=c.createLinearGradient(0,0,S,S);
    const P={desert_oasis:['#87CEEB','#F4E4BC','#DEB887'],palace:['#2d1810','#4a2c1a','#1a0e05'],mountain:['#4A708B','#6B8E9B','#B0C4DE'],silk_road:['#DAA520','#D4A853','#C8A040'],temple:['#4B0082','#2d1040','#1a0820'],garden:['#228B22','#3CB371','#90EE90'],battlefield:['#8B0000','#4a1010','#2a0505'],market:['#B8860B','#DAA520','#F0E68C'],river:['#4FC3F7','#29B6F6','#81D4FA'],forest:['#1B5E20','#2E7D32','#4CAF50'],sunset:['#FF6347','#FF8C00','#DAA520'],night:['#0a0a2e','#1a1a4e','#0a0a1e'],cherry:['#FFB7C5','#FF69B4','#FFC0CB'],throne:['#8B6914','#DAA520','#FFD700'],moonlight:['#1a1a3e','#2d2d5e','#0a0a2e'],lake:['#4FC3F7','#81D4FA','#B3E5FC']};
    const p=P[scene]||P.palace;g.addColorStop(0,p[0]);g.addColorStop(0.5,p[1]);g.addColorStop(1,p[2]);
    c.fillStyle=g;c.fillRect(0,0,S,S);
    c.save();
    if(scene==='desert_oasis'||scene==='silk_road'){
      c.fillStyle='rgba(222,184,135,0.3)';
      for(let i=0;i<3;i++){c.beginPath();c.moveTo(0,S*0.7+i*30);c.quadraticCurveTo(S*0.3,S*0.6+i*30,S*0.6,S*0.7+i*30);c.quadraticCurveTo(S*0.8,S*0.75+i*30,S,S*0.65+i*30);c.lineTo(S,S);c.lineTo(0,S);c.fill();}
      if(scene==='desert_oasis'){c.fillStyle='#5D4037';c.fillRect(S*0.1,S*0.4,4,S*0.3);c.fillStyle='#2E7D32';c.beginPath();c.arc(S*0.1,S*0.38,25,0,Math.PI*2);c.fill();}
    }
    if(scene==='palace'||scene==='throne'){c.fillStyle='rgba(139,105,20,0.3)';c.fillRect(S*0.05,S*0.1,15,S*0.8);c.fillRect(S*0.9,S*0.1,15,S*0.8);c.fillStyle='rgba(139,0,0,0.15)';c.fillRect(0,0,S*0.15,S);c.fillRect(S*0.85,0,S*0.15,S);}
    if(scene==='moonlight'||scene==='night'){c.fillStyle='rgba(255,255,220,0.8)';c.beginPath();c.arc(S*0.8,S*0.15,30,0,Math.PI*2);c.fill();c.fillStyle='rgba(255,255,220,0.2)';c.beginPath();c.arc(S*0.8,S*0.15,50,0,Math.PI*2);c.fill();for(let i=0;i<20;i++){c.fillStyle=`rgba(255,255,255,${rng()*0.5+0.3})`;c.beginPath();c.arc(rng()*S,rng()*S*0.5,rng()*2+0.5,0,Math.PI*2);c.fill();}}
    if(scene==='cherry'){for(let i=0;i<15;i++){c.fillStyle=`rgba(255,182,193,${rng()*0.4+0.2})`;c.beginPath();c.ellipse(rng()*S,rng()*S,4,6,rng()*Math.PI,0,Math.PI*2);c.fill();}}
    for(let i=0;i<8;i++){c.fillStyle=`rgba(255,255,200,${rng()*0.08})`;c.beginPath();c.arc(rng()*S,rng()*S,rng()*4+2,0,Math.PI*2);c.fill();}
    c.restore();
  }

  _drawFemale(c,S,rng,skin,outfit,rank){
    const cx=S/2,cy=S*0.40;
    const hair=F_HAIR[Math.floor(rng()*F_HAIR.length)];
    const hc=HCF[Math.floor(rng()*HCF.length)];
    const face=FACES[Math.floor(rng()*FACES.length)];
    const eye=EYES[Math.floor(rng()*EYES.length)];
    const expr=EXPRS[Math.floor(rng()*EXPRS.length)];
    const acc=ACCS[Math.floor(rng()*ACCS.length)];
    const fw=face==='round'?42:face==='heart'?38:face==='elongated'?35:face==='square'?40:39;
    const fh=face==='elongated'?52:face==='round'?46:48;
    c.save();
    // Hair back
    const hg=c.createLinearGradient(cx-60,cy-60,cx+60,cy+80);
    hg.addColorStop(0,hc);hg.addColorStop(0.3,this._l(hc,15));hg.addColorStop(0.7,hc);hg.addColorStop(1,this._d(hc,20));
    c.fillStyle=hg;
    if(['long_straight','long_wavy','flowing','braided','side_swept','sidetail','drill','curly'].includes(hair)){
      c.beginPath();c.moveTo(cx-fw-12,cy-10);c.quadraticCurveTo(cx-fw-18,cy+40,cx-fw-10+rng()*5,cy+90+rng()*20);c.lineTo(cx+fw+10-rng()*5,cy+90+rng()*20);c.quadraticCurveTo(cx+fw+18,cy+40,cx+fw+12,cy-10);c.fill();
      c.strokeStyle=this._l(hc,40)+'40';c.lineWidth=2;c.beginPath();c.moveTo(cx-fw-5,cy);c.quadraticCurveTo(cx-fw-8,cy+50,cx-fw-3,cy+80);c.stroke();
    }
    // Body
    const by=S*0.58;const bg=c.createLinearGradient(cx-70,by,cx+70,S);
    bg.addColorStop(0,outfit.p+'E8');bg.addColorStop(0.5,outfit.s+'D0');bg.addColorStop(1,this._d(outfit.s,30)+'C0');
    c.fillStyle=bg;c.beginPath();c.moveTo(cx-75,S);c.quadraticCurveTo(cx-70,by+30,cx-30,by-5);c.quadraticCurveTo(cx-15,by+rng()*S*0.15,cx,by+5);c.quadraticCurveTo(cx+15,by+rng()*S*0.15,cx+30,by-5);c.quadraticCurveTo(cx+70,by+30,cx+75,S);c.closePath();c.fill();
    // Outfit details
    if(outfit.type==='armor'){c.strokeStyle=outfit.a+'C0';c.lineWidth=2;c.beginPath();c.moveTo(cx-25,by);c.lineTo(cx,by+20);c.lineTo(cx+25,by);c.stroke();c.fillStyle=outfit.a+'40';c.beginPath();c.ellipse(cx-35,by+10,20,12,-0.2,0,Math.PI*2);c.fill();c.beginPath();c.ellipse(cx+35,by+10,20,12,0.2,0,Math.PI*2);c.fill();}
    else if(outfit.type==='silk'){c.strokeStyle=outfit.a+'60';c.lineWidth=1;for(let i=0;i<6;i++){c.beginPath();c.moveTo(cx-50+i*20,by+10);c.quadraticCurveTo(cx-50+i*20+5,by+40,cx-50+i*20,by+70);c.stroke();}c.fillStyle=outfit.a+'80';c.beginPath();c.ellipse(cx,by+5,30,6,0,0,Math.PI*2);c.fill();}
    else if(outfit.type==='dancer'){c.strokeStyle=outfit.a;c.lineWidth=3;c.beginPath();c.ellipse(cx,by+8,35,8,0,0,Math.PI);c.stroke();c.fillStyle=outfit.a;for(let i=0;i<7;i++){c.beginPath();c.arc(cx-25+i*8,by+15,3,0,Math.PI*2);c.fill();}}
    else{c.strokeStyle=outfit.a+'80';c.lineWidth=1.5;c.beginPath();c.moveTo(cx-15,by-2);c.lineTo(cx,by+15);c.lineTo(cx+15,by-2);c.stroke();}
    // Necklace
    if(rank!=='commoner'){c.strokeStyle='#FFD700';c.lineWidth=2;c.beginPath();c.arc(cx,by-2,22,0.15*Math.PI,0.85*Math.PI);c.stroke();c.fillStyle='#FFD700';c.beginPath();c.arc(cx,by+8,5,0,Math.PI*2);c.fill();c.fillStyle=outfit.p;c.beginPath();c.arc(cx,by+8,3,0,Math.PI*2);c.fill();}
    // Neck
    c.fillStyle=skin;c.fillRect(cx-11,S*0.52,22,S*0.08);c.fillStyle='rgba(0,0,0,0.08)';c.fillRect(cx-11,S*0.55,22,5);
    // Face
    c.fillStyle=skin;c.beginPath();c.ellipse(cx,cy,fw,fh,0,0,Math.PI*2);c.fill();
    const fs=c.createRadialGradient(cx,cy-15,0,cx,cy,fh);fs.addColorStop(0,'rgba(255,255,255,0.12)');fs.addColorStop(0.5,'rgba(0,0,0,0)');fs.addColorStop(1,'rgba(0,0,0,0.12)');c.fillStyle=fs;c.beginPath();c.ellipse(cx,cy,fw,fh,0,0,Math.PI*2);c.fill();
    // Blush
    c.fillStyle='rgba(255,130,130,0.12)';c.beginPath();c.ellipse(cx-24,cy+10,14,8,-0.1,0,Math.PI*2);c.fill();c.beginPath();c.ellipse(cx+24,cy+10,14,8,0.1,0,Math.PI*2);c.fill();
    // Eyes
    this._drawEyes(c,cx,cy-6,eye,rng,true);
    // Brows
    c.strokeStyle=this._d(hc,10);c.lineWidth=2.5;c.beginPath();c.moveTo(cx-30,cy-20);c.quadraticCurveTo(cx-18,cy-28,cx-8,cy-20);c.stroke();c.beginPath();c.moveTo(cx+8,cy-20);c.quadraticCurveTo(cx+18,cy-28,cx+30,cy-20);c.stroke();
    // Nose
    c.strokeStyle='rgba(0,0,0,0.12)';c.lineWidth=1.5;c.beginPath();c.moveTo(cx-1,cy-4);c.lineTo(cx-3,cy+8);c.quadraticCurveTo(cx,cy+11,cx+3,cy+8);c.stroke();c.fillStyle='rgba(255,255,255,0.15)';c.beginPath();c.ellipse(cx+2,cy,2,5,0,0,Math.PI*2);c.fill();
    // Mouth
    this._drawMouth(c,cx,cy+18,expr,true);
    // Ears + earrings
    c.fillStyle=skin;c.beginPath();c.ellipse(cx-fw+3,cy,6,10,-0.2,0,Math.PI*2);c.fill();c.beginPath();c.ellipse(cx+fw-3,cy,6,10,0.2,0,Math.PI*2);c.fill();
    if(acc==='earrings'||rank!=='commoner'){c.fillStyle='#FFD700';c.beginPath();c.arc(cx-fw+3,cy+12,4,0,Math.PI*2);c.fill();c.beginPath();c.arc(cx+fw-3,cy+12,4,0,Math.PI*2);c.fill();c.fillStyle=outfit.p;c.beginPath();c.arc(cx-fw+3,cy+12,2,0,Math.PI*2);c.fill();c.beginPath();c.arc(cx+fw-3,cy+12,2,0,Math.PI*2);c.fill();}
    // Hair front
    this._drawFHair(c,cx,cy,hair,hc,fw,fh,rng);
    // Accessory
    this._drawAcc(c,cx,cy,acc,outfit);
    // Rank badge
    const badges={ruler:'👑',general:'⚔️',minister:'📜',advisor:'🔮',merchant:'💰',warrior:'🗡️',dancer:'💃',commoner:'·'};
    c.font='24px serif';c.textAlign='right';c.textBaseline='top';c.fillText(badges[rank]||'·',S-15,10);
    c.restore();
  }

  _drawMale(c,S,rng,skin,outfit,rank){
    const cx=S/2,cy=S*0.40;
    const hair=M_HAIR[Math.floor(rng()*M_HAIR.length)];
    const hc=HCM[Math.floor(rng()*HCM.length)];
    const eye=EYES[Math.floor(rng()*EYES.length)];
    const expr=EXPRS[Math.floor(rng()*EXPRS.length)];
    const fw=42;
    c.save();
    const by=S*0.56;const bg=c.createLinearGradient(cx-80,by,cx+80,S);
    bg.addColorStop(0,outfit.p+'E8');bg.addColorStop(0.5,outfit.s+'D0');bg.addColorStop(1,this._d(outfit.s,30)+'C0');
    c.fillStyle=bg;c.beginPath();c.moveTo(cx-85,S);c.quadraticCurveTo(cx-75,by+20,cx-35,by-8);c.lineTo(cx+35,by-8);c.quadraticCurveTo(cx+75,by+20,cx+85,S);c.closePath();c.fill();
    if(['general','ruler','warrior'].includes(rank)||outfit.type==='armor'){c.fillStyle=outfit.a+'70';c.beginPath();c.ellipse(cx-45,by,22,12,-0.3,0,Math.PI*2);c.fill();c.beginPath();c.ellipse(cx+45,by,22,12,0.3,0,Math.PI*2);c.fill();c.strokeStyle=outfit.a;c.lineWidth=2;c.beginPath();c.moveTo(cx-20,by-5);c.lineTo(cx,by+18);c.lineTo(cx+20,by-5);c.stroke();}
    c.fillStyle=skin;c.fillRect(cx-13,S*0.50,26,S*0.08);c.fillStyle='rgba(0,0,0,0.06)';c.fillRect(cx-13,S*0.53,26,5);
    c.fillStyle=skin;c.beginPath();c.ellipse(cx,cy,fw,48,0,0,Math.PI*2);c.fill();
    c.fillStyle=skin;c.beginPath();c.moveTo(cx-fw,cy+12);c.lineTo(cx-fw+6,cy+44);c.quadraticCurveTo(cx,cy+56,cx+fw-6,cy+44);c.lineTo(cx+fw,cy+12);c.fill();
    const fsh=c.createRadialGradient(cx,cy-10,0,cx,cy,50);fsh.addColorStop(0,'rgba(255,255,255,0.08)');fsh.addColorStop(0.6,'rgba(0,0,0,0)');fsh.addColorStop(1,'rgba(0,0,0,0.1)');c.fillStyle=fsh;c.beginPath();c.ellipse(cx,cy,fw,48,0,0,Math.PI*2);c.fill();
    if(rng()>0.5){c.fillStyle='rgba(0,0,0,0.04)';c.beginPath();c.ellipse(cx,cy+22,28,18,0,0,Math.PI);c.fill();}
    this._drawEyes(c,cx,cy-4,eye,rng,false);
    c.strokeStyle=this._d(hc,10);c.lineWidth=3.5;c.beginPath();c.moveTo(cx-32,cy-20);c.quadraticCurveTo(cx-18,cy-30,cx-6,cy-20);c.stroke();c.beginPath();c.moveTo(cx+6,cy-20);c.quadraticCurveTo(cx+18,cy-30,cx+32,cy-20);c.stroke();
    c.strokeStyle='rgba(0,0,0,0.18)';c.lineWidth=2;c.beginPath();c.moveTo(cx-1,cy-5);c.lineTo(cx-5,cy+9);c.quadraticCurveTo(cx,cy+12,cx+5,cy+9);c.stroke();
    this._drawMouth(c,cx,cy+20,expr,false);
    // Male hair
    const hg=c.createLinearGradient(cx-40,cy-50,cx+40,cy);hg.addColorStop(0,this._l(hc,15));hg.addColorStop(1,hc);c.fillStyle=hg;
    c.beginPath();c.ellipse(cx,cy-20,fw+10,35,0,Math.PI,Math.PI*2);c.fill();
    if(hair==='topknot'||hair==='samurai'){c.fillStyle=hc;c.beginPath();c.moveTo(cx,cy-55);c.lineTo(cx-8,cy-30);c.lineTo(cx+8,cy-30);c.fill();c.fillStyle='#DAA520';c.beginPath();c.ellipse(cx,cy-35,10,4,0,0,Math.PI*2);c.fill();}
    else if(hair==='warrior'||hair==='spiked'){c.fillStyle=hc;for(let i=0;i<5;i++){c.beginPath();c.moveTo(cx-25+i*12,cy-30);c.lineTo(cx-20+i*12,cy-50-rng()*10);c.lineTo(cx-15+i*12,cy-30);c.fill();}}
    else{c.beginPath();c.moveTo(cx-fw-5,cy-10);c.quadraticCurveTo(cx-fw,cy-40,cx,cy-45);c.quadraticCurveTo(cx+fw,cy-40,cx+fw+5,cy-10);c.fill();}
    const badges={ruler:'👑',general:'⚔️',minister:'📜',advisor:'🔮',merchant:'💰',warrior:'🗡️',dancer:'💃',commoner:'·'};
    c.font='24px serif';c.textAlign='right';c.textBaseline='top';c.fillText(badges[rank]||'·',S-15,10);
    c.restore();
  }

  _drawEyes(c,cx,ey,style,rng,isF){
    for(const side of[-1,1]){
      const ex=cx+side*20,ew=isF?13:11,eh=isF?8:6;
      c.fillStyle='#FFFAF0';c.beginPath();c.ellipse(ex,ey,ew,eh,0,0,Math.PI*2);c.fill();
      const ic=IRISC[Math.floor(rng()*IRISC.length)];
      const ig=c.createRadialGradient(ex,ey,0,ex,ey,ew*0.7);ig.addColorStop(0,this._l(ic,30));ig.addColorStop(0.5,ic);ig.addColorStop(1,this._d(ic,20));
      c.fillStyle=ig;c.beginPath();c.arc(ex,ey+1,ew*0.65,0,Math.PI*2);c.fill();
      c.fillStyle='#0a0a0a';c.beginPath();c.arc(ex,ey+1,ew*0.3,0,Math.PI*2);c.fill();
      c.fillStyle='#fff';c.beginPath();c.arc(ex-3,ey-2,3,0,Math.PI*2);c.fill();
      c.fillStyle='rgba(255,255,255,0.6)';c.beginPath();c.arc(ex+3,ey+2,1.5,0,Math.PI*2);c.fill();
      c.strokeStyle='#1a1a1a';c.lineWidth=isF?2:2.5;c.beginPath();c.moveTo(ex-ew,ey-1);c.quadraticCurveTo(ex,ey-eh-2,ex+ew,ey-1);c.stroke();
      if(isF){c.strokeStyle='#1a1a1a';c.lineWidth=1.5;c.beginPath();c.moveTo(ex+ew-2,ey-2);c.lineTo(ex+ew+3,ey-5);c.stroke();c.beginPath();c.moveTo(ex-ew+2,ey-2);c.lineTo(ex-ew-3,ey-5);c.stroke();}
    }
  }

  _drawMouth(c,cx,my,expr,isF){
    const lc=isF?'#E07070':'#B06050';
    if(expr==='smile'||expr==='playful'||expr==='confident'){c.fillStyle=lc+'D0';c.beginPath();c.moveTo(cx-12,my);c.quadraticCurveTo(cx-6,my-5,cx,my-3);c.quadraticCurveTo(cx+6,my-5,cx+12,my);c.quadraticCurveTo(cx,my+8,cx-12,my);c.fill();c.fillStyle='rgba(255,255,255,0.2)';c.beginPath();c.ellipse(cx-3,my-1,4,2,0,0,Math.PI*2);c.fill();}
    else if(expr==='fierce'||expr==='serious'){c.strokeStyle=lc;c.lineWidth=2;c.beginPath();c.moveTo(cx-10,my);c.lineTo(cx+10,my);c.stroke();}
    else{c.fillStyle=lc+'A0';c.beginPath();c.ellipse(cx,my,10,4,0,0,Math.PI*2);c.fill();}
  }

  _drawFHair(c,cx,cy,style,hc,fw,fh,rng){
    const hg=c.createLinearGradient(cx-50,cy-50,cx+50,cy+30);hg.addColorStop(0,this._l(hc,20));hg.addColorStop(0.5,hc);hg.addColorStop(1,this._d(hc,15));
    c.fillStyle=hg;
    c.beginPath();c.ellipse(cx,cy-fh*0.3,fw+8,fh*0.55,0,Math.PI,Math.PI*2);c.fill();
    c.beginPath();c.moveTo(cx-fw-5,cy-15);c.quadraticCurveTo(cx-fw+5,cy-35,cx-15,cy-10);c.quadraticCurveTo(cx-5,cy-25,cx+5,cy-10);c.quadraticCurveTo(cx+15,cy-25,cx+fw-5,cy-15);c.quadraticCurveTo(cx+fw+5,cy-35,cx+fw+5,cy-15);c.lineTo(cx+fw+8,cy-30);c.quadraticCurveTo(cx,cy-fh-15,cx-fw-8,cy-30);c.closePath();c.fill();
    c.strokeStyle=this._l(hc,50)+'50';c.lineWidth=2;c.beginPath();c.moveTo(cx-20,cy-35);c.quadraticCurveTo(cx,cy-40,cx+20,cy-35);c.stroke();
    if(['long_straight','long_wavy','flowing','hime_cut','side_swept'].includes(style)){c.fillStyle=hc+'C0';c.beginPath();c.moveTo(cx-fw-3,cy-10);c.quadraticCurveTo(cx-fw-10,cy+20,cx-fw-5,cy+60);c.lineTo(cx-fw+5,cy+55);c.quadraticCurveTo(cx-fw,cy+15,cx-fw+3,cy-5);c.fill();c.beginPath();c.moveTo(cx+fw+3,cy-10);c.quadraticCurveTo(cx+fw+10,cy+20,cx+fw+5,cy+60);c.lineTo(cx+fw-5,cy+55);c.quadraticCurveTo(cx+fw,cy+15,cx+fw-3,cy-5);c.fill();}
    if(style==='twin_tails'){c.fillStyle=hc;c.beginPath();c.moveTo(cx-30,cy-20);c.quadraticCurveTo(cx-55,cy,cx-50,cy+70);c.quadraticCurveTo(cx-45,cy+75,cx-35,cy+60);c.quadraticCurveTo(cx-30,cy+10,cx-25,cy-15);c.fill();c.beginPath();c.moveTo(cx+30,cy-20);c.quadraticCurveTo(cx+55,cy,cx+50,cy+70);c.quadraticCurveTo(cx+45,cy+75,cx+35,cy+60);c.quadraticCurveTo(cx+30,cy+10,cx+25,cy-15);c.fill();c.fillStyle='#FFD700';c.beginPath();c.arc(cx-30,cy-15,5,0,Math.PI*2);c.fill();c.beginPath();c.arc(cx+30,cy-15,5,0,Math.PI*2);c.fill();}
  }

  _drawAcc(c,cx,cy,acc,outfit){
    if(acc==='tiara'){c.fillStyle='#FFD700';c.beginPath();c.moveTo(cx-25,cy-38);c.lineTo(cx-15,cy-48);c.lineTo(cx,cy-42);c.lineTo(cx+15,cy-48);c.lineTo(cx+25,cy-38);c.closePath();c.fill();c.fillStyle=outfit.p;c.beginPath();c.arc(cx,cy-43,4,0,Math.PI*2);c.fill();}
    else if(acc==='hairpin'){c.fillStyle='#FFD700';c.fillRect(cx+20,cy-40,3,30);c.beginPath();c.arc(cx+21,cy-42,8,0,Math.PI*2);c.fill();c.fillStyle=outfit.p;c.beginPath();c.arc(cx+21,cy-42,5,0,Math.PI*2);c.fill();}
    else if(acc==='flower_crown'){const cols=['#FF69B4','#FF6347','#FFD700','#87CEEB','#DDA0DD'];for(let i=0;i<8;i++){c.fillStyle=cols[i%cols.length];c.beginPath();c.arc(cx-28+i*8,cy-38+Math.sin(i)*3,5,0,Math.PI*2);c.fill();}}
    else if(acc==='phoenix_pin'){c.fillStyle='#FFD700';c.beginPath();c.moveTo(cx,cy-65);c.lineTo(cx-10,cy-50);c.lineTo(cx,cy-35);c.lineTo(cx+10,cy-50);c.closePath();c.fill();}
  }

  _drawFrame(c,S,color){
    c.save();c.strokeStyle=color+'80';c.lineWidth=4;c.strokeRect(3,3,S-6,S-6);
    c.strokeStyle=color+'40';c.lineWidth=2;c.strokeRect(8,8,S-16,S-16);
    const cs=20;[[0,0],[S,0],[0,S],[S,S]].forEach(([x,y])=>{c.fillStyle=color+'60';c.beginPath();c.arc(x,y,cs,0,Math.PI*2);c.fill();});
    c.restore();
  }

  // ==================== MAP GENERATION ====================
  generateMap(cols,rows){
    const T=64,cv=document.createElement('canvas');cv.width=cols*T;cv.height=rows*T;
    const c=cv.getContext('2d');
    this._drawTerrain(c,cols,rows,T);this._drawRivers(c,T);this._drawRoads(c,T);this._drawLakes(c,T);this._drawPeaks(c,T);
    this.mapCanvas=cv;return cv;
  }

  _getTerrain(c,r){
    if(GEO.mountains.some(m=>Math.abs(m.x-c)<=1&&Math.abs(m.y-r)<=1))return'mountain';
    if(GEO.lakes.some(l=>((c-l.x)**2/(l.rx+1)**2+(r-l.y)**2/(l.ry+1)**2)<1))return'lake';
    for(const rv of GEO.rivers){for(let i=0;i<rv.path.length-1;i++){const p1=rv.path[i],p2=rv.path[i+1];const t=Math.max(0,Math.min(1,((c-p1.x)*(p2.x-p1.x)+(r-p1.y)*(p2.y-p1.y))/((p2.x-p1.x)**2+(p2.y-p1.y)**2+0.01)));const px=p1.x+t*(p2.x-p1.x),py=p1.y+t*(p2.y-p1.y);if(Math.sqrt((c-px)**2+(r-py)**2)<rv.w+0.5)return'river';}}
    if(r<8)return'steppe';if(r>63)return'mountain';if(c<5)return'mountain';if(r>55&&c>55)return'mountain';
    if(r>15&&r<55&&c>8&&c<68){for(const rv of GEO.rivers){for(const p of rv.path){if(Math.abs(c-p.x)<3&&Math.abs(r-p.y)<3)return'oasis';}}return'desert';}
    return'steppe';
  }

  _drawTerrain(c,cols,rows,T){
    const CL={desert:['#D4B896','#C8AD8A','#DCC4A0','#C4A882'],oasis:['#7CB342','#8BC34A','#689F38','#6B8E23'],mountain:['#8D6E63','#795548','#6D4C41','#5D4037'],steppe:['#A5D6A7','#81C784','#9CCC65','#8BC34A'],lake:['#4FC3F7','#29B6F6','#03A9F4'],river:['#4FC3F7','#29B6F6','#039BE5'],plains:['#C5E1A5','#AED581','#9CCC65'],valley:['#AED581','#8BC34A','#7CB342']};
    for(let r=0;r<rows;r++){for(let cc=0;cc<cols;cc++){
      const t=this._getTerrain(cc,r);const cs=CL[t]||CL.desert;
      c.fillStyle=cs[(cc*7+r*13)%cs.length];c.fillRect(cc*T,r*T,T,T);
      if(t==='desert'){c.fillStyle='rgba(0,0,0,0.03)';for(let d=0;d<3;d++)c.fillRect(cc*T+((cc*17+r*31+d*13)%T),r*T+((r*23+cc*41+d*7)%T),2,1);}
      if(t==='mountain'){c.fillStyle='rgba(255,255,255,0.08)';c.beginPath();c.moveTo(cc*T+T/2,r*T+5);c.lineTo(cc*T+T-5,r*T+T-5);c.lineTo(cc*T+5,r*T+T-5);c.fill();c.fillStyle='rgba(255,255,255,0.15)';c.beginPath();c.moveTo(cc*T+T/2,r*T+5);c.lineTo(cc*T+T/2+8,r*T+18);c.lineTo(cc*T+T/2-8,r*T+18);c.fill();}
      if(t==='oasis'){c.fillStyle='rgba(0,100,0,0.1)';c.beginPath();c.arc(cc*T+T/2,r*T+T/2,T*0.3,0,Math.PI*2);c.fill();}
    }}
  }

  _drawRivers(c,T){
    GEO.rivers.forEach(rv=>{c.save();c.strokeStyle='#29B6F6';c.lineWidth=rv.w*4+2;c.lineCap='round';c.lineJoin='round';
      c.beginPath();c.moveTo(rv.path[0].x*T+T/2,rv.path[0].y*T+T/2);
      for(let i=1;i<rv.path.length;i++){const p=rv.path[i],pp=rv.path[i-1];c.quadraticCurveTo(pp.x*T+T/2,pp.y*T+T/2,(pp.x+p.x)/2*T+T/2,(pp.y+p.y)/2*T+T/2);}
      const last=rv.path[rv.path.length-1];c.lineTo(last.x*T+T/2,last.y*T+T/2);c.stroke();
      c.strokeStyle='rgba(255,255,255,0.2)';c.lineWidth=rv.w*2;c.beginPath();c.moveTo(rv.path[0].x*T+T/2,rv.path[0].y*T+T/2-1);
      for(let i=1;i<rv.path.length;i++)c.lineTo(rv.path[i].x*T+T/2,rv.path[i].y*T+T/2-1);c.stroke();
      const mid=rv.path[Math.floor(rv.path.length/2)];c.font='10px "Microsoft YaHei",serif';c.fillStyle='#0277BD';c.textAlign='center';c.fillText(rv.name,mid.x*T+T/2,mid.y*T+T/2-8);
      c.restore();
    });
  }

  _drawRoads(c,T){
    GEO.roads.forEach(rd=>{c.save();c.strokeStyle='rgba(139,119,101,0.5)';c.lineWidth=rd.w*5+4;c.lineCap='round';c.lineJoin='round';
      c.beginPath();c.moveTo(rd.path[0].x*T+T/2,rd.path[0].y*T+T/2);for(let i=1;i<rd.path.length;i++)c.lineTo(rd.path[i].x*T+T/2,rd.path[i].y*T+T/2);c.stroke();
      c.strokeStyle='#C4A882';c.lineWidth=rd.w*4+2;c.setLineDash([8,4]);
      c.beginPath();c.moveTo(rd.path[0].x*T+T/2,rd.path[0].y*T+T/2);for(let i=1;i<rd.path.length;i++)c.lineTo(rd.path[i].x*T+T/2,rd.path[i].y*T+T/2);c.stroke();
      const mid=rd.path[Math.floor(rd.path.length/2)];c.setLineDash([]);c.font='9px "Microsoft YaHei",serif';c.fillStyle='#8B7355';c.textAlign='center';c.fillText(rd.name,mid.x*T+T/2,mid.y*T+T/2+12);
      c.restore();
    });
  }

  _drawLakes(c,T){
    GEO.lakes.forEach(lk=>{c.save();const cx=lk.x*T+T/2,cy=lk.y*T+T/2;
      const g=c.createRadialGradient(cx,cy,0,cx,cy,Math.max(lk.rx,lk.ry)*T);g.addColorStop(0,'#29B6F6');g.addColorStop(0.7,'#4FC3F7');g.addColorStop(1,'#81D4FA');
      c.fillStyle=g;c.beginPath();c.ellipse(cx,cy,lk.rx*T,lk.ry*T,0,0,Math.PI*2);c.fill();
      c.strokeStyle='#0288D1';c.lineWidth=2;c.beginPath();c.ellipse(cx,cy,lk.rx*T,lk.ry*T,0,0,Math.PI*2);c.stroke();
      c.font='11px "Microsoft YaHei",serif';c.fillStyle='#01579B';c.textAlign='center';c.fillText(lk.name,cx,cy+5);
      c.restore();
    });
  }

  _drawPeaks(c,T){
    const done=new Set();
    GEO.mountains.forEach(m=>{const key=`${Math.floor(m.x/3)}_${Math.floor(m.y/3)}`;if(done.has(key))return;done.add(key);
      const px=m.x*T+T/2,py=m.y*T+T/2,h=15+(m.x*7+m.y*13)%10;
      c.fillStyle='#5D4037';c.beginPath();c.moveTo(px,py-h);c.lineTo(px+h*0.8,py+h*0.4);c.lineTo(px-h*0.8,py+h*0.4);c.fill();
      c.fillStyle='#795548';c.beginPath();c.moveTo(px,py-h);c.lineTo(px+h*0.4,py-h*0.2);c.lineTo(px-h*0.4,py-h*0.2);c.fill();
      c.fillStyle='rgba(255,255,255,0.6)';c.beginPath();c.moveTo(px,py-h);c.lineTo(px+4,py-h+6);c.lineTo(px-4,py-h+6);c.fill();
    });
  }

  preload(cb){if(cb)cb(1);}
}
