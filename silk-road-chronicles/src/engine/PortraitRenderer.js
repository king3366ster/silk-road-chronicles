/**
 * Portrait Renderer v5.0 - PixiJS WebGL
 * Multi-layer anime-style portrait with glow, bloom, and animation
 */
import * as PIXI from 'pixi.js';

const S = 400;
const SKIN = ['#FFE8D0','#F5DCC8','#EBC8A8','#D4A574','#C4956A','#F0D5B8','#FFF2E5','#E0C8A8'];
const F_HAIR = ['#1a1a2e','#2C1810','#4a2c2a','#8B4513','#D2691E','#800020','#2d1b14','#0a0a14','#3d2b1f','#5c3a21','#C0392B','#6B3FA0','#E8B4B8'];
const M_HAIR = ['#1a1a1a','#2C1810','#3d2b1f','#0a0a14','#4a3728','#2d1b14','#1a1a2e','#333','#555'];
const IRIS = ['#4A3728','#2C5F2D','#1E3A5F','#5B3A29','#3D2B1F','#2E4057','#6B3FA0','#1a6b5a','#8B0000','#DAA520'];
const OUTFITS = {
  amazons:{p:'#DC143C',s:'#8B0000',a:'#FFD700',type:'armor'},
  xiliang:{p:'#FF69B4',s:'#FF1493',a:'#FFD700',type:'silk'},
  loulan:{p:'#DAA520',s:'#B8860B',a:'#F0E68C',type:'noble'},
  kucha:{p:'#4169E1',s:'#1E90FF',a:'#87CEEB',type:'dancer'},
  khotan:{p:'#2E8B57',s:'#3CB371',a:'#98FB98',type:'jade'},
  wusun:{p:'#4682B4',s:'#5F9EA0',a:'#B0E0E6',type:'cavalry'},
  shanshan:{p:'#CD853F',s:'#A0522D',a:'#DEB887',type:'nomad'},
  yarkand:{p:'#DA70D6',s:'#BA55D3',a:'#DDA0DD',type:'merchant'},
  kashgar:{p:'#B22222',s:'#8B0000',a:'#FF6347',type:'fortress'},
  yanqi:{p:'#20B2AA',s:'#008B8B',a:'#40E0D0',type:'temple'},
  default:{p:'#8B7355',s:'#6B5B45',a:'#D4A853',type:'standard'}
};
const BGS = [
  {c:['#87CEEB','#F4E4BC','#DEB887'],t:'oasis'},
  {c:['#2d1810','#4a2c1a','#1a0e05'],t:'palace'},
  {c:['#4A708B','#6B8E9B','#B0C4DE'],t:'mountain'},
  {c:['#DAA520','#D4A853','#C8A040'],t:'silk'},
  {c:['#4B0082','#2d1040','#1a0820'],t:'temple'},
  {c:['#228B22','#3CB371','#90EE90'],t:'garden'},
  {c:['#FF6347','#FF8C00','#DAA520'],t:'sunset'},
  {c:['#0a0a2e','#1a1a4e','#0a0a1e'],t:'night'},
  {c:['#FFB7C5','#FF69B4','#FFC0CB'],t:'cherry'},
  {c:['#1a1a3e','#2d2d5e','#0a0a2e'],t:'moon'},
  {c:['#4FC3F7','#81D4FA','#B3E5FC'],t:'lake'},
  {c:['#8B0000','#4a1010','#2a0505'],t:'battle'}
];

export class PortraitRenderer {
  constructor() { this.cache = new Map(); }
  _rng(s) { return () => { s=(s*16807)%2147483647; return(s-1)/2147483646; }; }
  _l(h,a) {
    if(!h||h.length<7)return'#888888';
    let r=parseInt(h.slice(1,3),16),g=parseInt(h.slice(3,5),16),b=parseInt(h.slice(5,7),16);
    if(isNaN(r)||isNaN(g)||isNaN(b))return'#888888';
    return'#'+[r,g,b].map(v=>Math.min(255,Math.max(0,v+a)).toString(16).padStart(2,'0')).join('');
  }
  _d(h,a) { return this._l(h,-a); }

  generate(seed, gender, nationId, rank) {
    const key = `${seed}_${gender}_${nationId}_${rank}`;
    if (this.cache.has(key)) return this.cache.get(key);
    const rng = this._rng(seed);
    const o = {...OUTFITS.default,...(OUTFITS[nationId]||{})};
    const skin = SKIN[Math.floor(rng()*SKIN.length)];
    const bg = BGS[Math.floor(rng()*BGS.length)];
    const hc = gender==='female'?F_HAIR[Math.floor(rng()*F_HAIR.length)]:M_HAIR[Math.floor(rng()*M_HAIR.length)];
    const ic = IRIS[Math.floor(rng()*IRIS.length)];
    const cv = document.createElement('canvas'); cv.width=S; cv.height=S;
    const c = cv.getContext('2d');
    const cx=S/2, cy=S*0.38, fw=44+rng()*6, fh=50+rng()*6;
    const isF = gender==='female';

    // BG
    const grd=c.createLinearGradient(0,0,S,S);
    grd.addColorStop(0,bg.c[0]);grd.addColorStop(0.5,bg.c[1]);grd.addColorStop(1,bg.c[2]);
    c.fillStyle=grd;c.fillRect(0,0,S,S);
    // Bokeh
    for(let i=0;i<12;i++){
      const x=rng()*S,y=rng()*S,r=rng()*30+10;
      const pg=c.createRadialGradient(x,y,0,x,y,r);
      pg.addColorStop(0,`rgba(255,255,220,${rng()*0.12+0.03})`);
      pg.addColorStop(1,'rgba(255,255,220,0)');
      c.fillStyle=pg;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();
    }
    // Moon/stars for night scenes
    if(bg.t==='moon'||bg.t==='night'){
      c.fillStyle='rgba(255,255,220,0.9)';c.beginPath();c.arc(S*0.82,S*0.12,28,0,Math.PI*2);c.fill();
      c.fillStyle='rgba(255,255,220,0.15)';c.beginPath();c.arc(S*0.82,S*0.12,55,0,Math.PI*2);c.fill();
      for(let i=0;i<30;i++){c.fillStyle=`rgba(255,255,255,${rng()*0.6+0.3})`;c.beginPath();c.arc(rng()*S,rng()*S*0.5,rng()*1.5+0.5,0,Math.PI*2);c.fill();}
    }
    // Cherry petals
    if(bg.t==='cherry'){for(let i=0;i<25;i++){c.fillStyle=`rgba(255,182,193,${rng()*0.5+0.2})`;c.beginPath();c.ellipse(rng()*S,rng()*S,3+rng()*4,5+rng()*4,rng()*Math.PI,0,Math.PI*2);c.fill();}}
    // Desert dunes
    if(bg.t==='oasis'){
      c.fillStyle='rgba(222,184,135,0.25)';
      for(let i=0;i<3;i++){c.beginPath();c.moveTo(0,S*0.72+i*25);c.quadraticCurveTo(S*0.3,S*0.62+i*25,S*0.6,S*0.72+i*25);c.quadraticCurveTo(S*0.8,S*0.77+i*25,S,S*0.67+i*25);c.lineTo(S,S);c.lineTo(0,S);c.fill();}
      c.fillStyle='#5D4037';c.fillRect(S*0.08,S*0.35,5,S*0.35);
      c.fillStyle='#2E7D32';for(let a=0;a<5;a++){c.beginPath();c.ellipse(S*0.08+Math.cos(a*1.2)*20,S*0.33+Math.sin(a*1.2)*8,22,6,a*0.6,0,Math.PI*2);c.fill();}
    }

    // Body
    const by=S*0.58;
    if(isF){
      const bg2=c.createLinearGradient(cx-80,by,cx+80,S);
      bg2.addColorStop(0,o.p+'E8');bg2.addColorStop(0.4,o.s+'D0');bg2.addColorStop(1,this._d(o.s,30)+'C0');
      c.fillStyle=bg2;c.beginPath();c.moveTo(cx-80,S);
      c.bezierCurveTo(cx-75,by+50,cx-45,by+5,cx-28,by-8);
      c.quadraticCurveTo(cx-12,by-15+rng()*8,cx,by-5);
      c.quadraticCurveTo(cx+12,by-15+rng()*8,cx+28,by-8);
      c.bezierCurveTo(cx+45,by+5,cx+75,by+50,cx+80,S);c.closePath();c.fill();
      // Outfit details
      if(o.type==='armor'){
        c.fillStyle=o.a+'50';for(let r=0;r<5;r++)for(let cl=0;cl<6;cl++){c.beginPath();c.arc(cx-30+cl*12+(r%2)*6,by+r*14,6,0,Math.PI,true);c.fill();}
        c.fillStyle=o.a+'80';c.beginPath();c.ellipse(cx-38,by+2,24,14,-0.2,0,Math.PI*2);c.fill();c.beginPath();c.ellipse(cx+38,by+2,24,14,0.2,0,Math.PI*2);c.fill();
      } else if(o.type==='silk'){
        c.save();c.globalAlpha=0.3;c.strokeStyle=o.a;c.lineWidth=1.5;
        for(let i=0;i<8;i++){c.beginPath();c.moveTo(cx-55+i*15,by+8);c.bezierCurveTo(cx-55+i*15+3,by+35,cx-55+i*15-3,by+60,cx-55+i*15,by+90);c.stroke();}
        c.restore();
        c.fillStyle=o.a+'90';c.beginPath();c.ellipse(cx,by+5,35,7,0,0,Math.PI*2);c.fill();
      } else if(o.type==='dancer'){
        c.fillStyle=o.a;for(let i=0;i<9;i++){c.beginPath();c.arc(cx-32+i*8,by+12,3,0,Math.PI*2);c.fill();}
      }
      // Necklace
      if(rank!=='commoner'){c.strokeStyle='#FFD700';c.lineWidth=2;c.beginPath();c.arc(cx,by-4,25,0.15*Math.PI,0.85*Math.PI);c.stroke();c.fillStyle='#FFD700';c.beginPath();c.arc(cx,by+10,5,0,Math.PI*2);c.fill();c.fillStyle=o.p;c.beginPath();c.arc(cx,by+10,3,0,Math.PI*2);c.fill();}
    } else {
      const bg2=c.createLinearGradient(cx-90,by,cx+90,S);
      bg2.addColorStop(0,o.p+'E8');bg2.addColorStop(0.5,o.s+'D0');bg2.addColorStop(1,this._d(o.s,30)+'C0');
      c.fillStyle=bg2;c.beginPath();c.moveTo(cx-90,S);
      c.bezierCurveTo(cx-80,by+30,cx-50,by-5,cx-35,by-10);c.lineTo(cx+35,by-10);
      c.bezierCurveTo(cx+50,by-5,cx+80,by+30,cx+90,S);c.closePath();c.fill();
      if(['general','ruler','warrior'].includes(rank)||o.type==='armor'){
        c.fillStyle=o.a+'60';c.beginPath();c.ellipse(cx-48,by,25,14,-0.3,0,Math.PI*2);c.fill();c.beginPath();c.ellipse(cx+48,by,25,14,0.3,0,Math.PI*2);c.fill();
        c.strokeStyle=o.a;c.lineWidth=2.5;c.beginPath();c.moveTo(cx-22,by-6);c.lineTo(cx,by+20);c.lineTo(cx+22,by-6);c.stroke();
      }
      c.strokeStyle=o.a+'90';c.lineWidth=2;c.beginPath();c.moveTo(cx-20,by-8);c.lineTo(cx,by+5);c.lineTo(cx+20,by-8);c.stroke();
    }

    // Neck
    c.fillStyle=skin;c.fillRect(cx-12,cy+fh*0.7,24,S*0.12);
    c.fillStyle='rgba(0,0,0,0.06)';c.fillRect(cx-12,cy+fh*0.8,24,6);

    // Face
    const fg=c.createRadialGradient(cx,cy-10,0,cx,cy,fh);
    fg.addColorStop(0,this._l(skin,10));fg.addColorStop(0.7,skin);fg.addColorStop(1,this._d(skin,15));
    c.fillStyle=fg;c.beginPath();c.ellipse(cx,cy,fw,fh,0,0,Math.PI*2);c.fill();
    c.save();c.globalAlpha=0.08;c.fillStyle='#000';c.beginPath();c.ellipse(cx,cy+5,fw+2,fh+2,0,0,Math.PI*2);c.fill();c.restore();

    // Eyes
    for(const side of[-1,1]){
      const ex=cx+side*22,ew=isF?14:12,eh=isF?10:7;
      c.fillStyle='#FFFAF0';c.beginPath();c.ellipse(ex,cy-8,ew,eh,0,0,Math.PI*2);c.fill();
      const ig=c.createRadialGradient(ex,cy-7,0,ex,cy-7,ew*0.75);
      ig.addColorStop(0,this._l(ic,40));ig.addColorStop(0.3,this._l(ic,15));ig.addColorStop(0.7,ic);ig.addColorStop(1,this._d(ic,25));
      c.fillStyle=ig;c.beginPath();c.arc(ex,cy-7,ew*0.7,0,Math.PI*2);c.fill();
      c.fillStyle='#0a0a0a';c.beginPath();c.arc(ex,cy-7,ew*0.32,0,Math.PI*2);c.fill();
      c.fillStyle='rgba(255,255,255,0.95)';c.beginPath();c.arc(ex-4,cy-11,4,0,Math.PI*2);c.fill();
      c.fillStyle='rgba(255,255,255,0.7)';c.beginPath();c.arc(ex+3,cy-5,2,0,Math.PI*2);c.fill();
      c.fillStyle='rgba(255,255,255,0.4)';c.beginPath();c.arc(ex-2,cy-4,1.5,0,Math.PI*2);c.fill();
      c.strokeStyle='#1a1a1a';c.lineWidth=isF?2.5:3;
      c.beginPath();c.moveTo(ex-ew-1,cy-9);c.quadraticCurveTo(ex,cy-8-eh-3,ex+ew+1,cy-9);c.stroke();
      if(isF){
        c.strokeStyle='#1a1a1a';c.lineWidth=1.5;
        c.beginPath();c.moveTo(ex+ew-1,cy-10);c.lineTo(ex+ew+4,cy-14);c.stroke();
        c.beginPath();c.moveTo(ex-ew+1,cy-10);c.lineTo(ex-ew-4,cy-14);c.stroke();
        c.save();c.globalAlpha=0.08;c.fillStyle=ic;c.beginPath();c.ellipse(ex,cy-8-eh-1,ew+2,4,0,0,Math.PI*2);c.fill();c.restore();
      }
    }

    // Nose
    c.strokeStyle='rgba(0,0,0,0.1)';c.lineWidth=1.5;
    c.beginPath();c.moveTo(cx,cy-2);c.lineTo(cx-2,cy+10);c.quadraticCurveTo(cx,cy+13,cx+2,cy+10);c.stroke();
    c.fillStyle='rgba(255,255,255,0.2)';c.beginPath();c.ellipse(cx+2,cy+3,2,6,0,0,Math.PI*2);c.fill();

    // Lips
    if(isF){
      const lg=c.createRadialGradient(cx,cy+20,0,cx,cy+20,12);
      lg.addColorStop(0,'#F08080');lg.addColorStop(1,'#E07070');
      c.fillStyle=lg;c.beginPath();c.moveTo(cx-13,cy+20);c.quadraticCurveTo(cx-6,cy+15,cx,cy+17);c.quadraticCurveTo(cx+6,cy+15,cx+13,cy+20);c.fill();
      c.fillStyle='#E88080';c.beginPath();c.moveTo(cx-12,cy+20);c.quadraticCurveTo(cx,cy+30,cx+12,cy+20);c.fill();
      c.fillStyle='rgba(255,255,255,0.25)';c.beginPath();c.ellipse(cx-3,cy+19,5,2,0,0,Math.PI*2);c.fill();
    } else {
      c.strokeStyle='#B06050';c.lineWidth=2;c.beginPath();c.moveTo(cx-10,cy+20);c.lineTo(cx+10,cy+20);c.stroke();
    }

    // Blush
    if(isF){
      c.save();c.globalAlpha=0.15;
      const bg1=c.createRadialGradient(cx-28,cy+10,0,cx-28,cy+10,16);
      bg1.addColorStop(0,'#FF8888');bg1.addColorStop(1,'rgba(255,136,136,0)');
      c.fillStyle=bg1;c.fillRect(cx-50,cy-5,40,30);
      const bg2=c.createRadialGradient(cx+28,cy+10,0,cx+28,cy+10,16);
      bg2.addColorStop(0,'#FF8888');bg2.addColorStop(1,'rgba(255,136,136,0)');
      c.fillStyle=bg2;c.fillRect(cx+10,cy-5,40,30);
      c.restore();
    }

    // Eyebrows
    c.strokeStyle=this._d(hc,10);c.lineWidth=isF?2.5:3.5;
    c.beginPath();c.moveTo(cx-32,cy-30);c.quadraticCurveTo(cx-18,cy-40,cx-6,cy-30);c.stroke();
    c.beginPath();c.moveTo(cx+6,cy-30);c.quadraticCurveTo(cx+18,cy-40,cx+32,cy-30);c.stroke();

    // Hair
    const hg=c.createLinearGradient(cx-60,cy-60,cx+60,cy+80);
    hg.addColorStop(0,this._l(hc,20));hg.addColorStop(0.3,hc);hg.addColorStop(0.7,this._d(hc,10));hg.addColorStop(1,this._d(hc,25));
    // Back hair
    c.fillStyle=this._d(hc,15);
    c.beginPath();c.moveTo(cx-fw-14,cy-5);c.bezierCurveTo(cx-fw-20,cy+40,cx-fw-12,cy+80,cx-fw-8,cy+120);
    c.lineTo(cx+fw+8,cy+120);c.bezierCurveTo(cx+fw+12,cy+80,cx+fw+20,cy+40,cx+fw+14,cy-5);c.closePath();c.fill();
    // Shine streak
    c.save();c.globalAlpha=0.15;c.fillStyle='#fff';
    c.beginPath();c.moveTo(cx-fw-5,cy+10);c.bezierCurveTo(cx-fw,cy+50,cx-fw-3,cy+80,cx-fw-5,cy+100);
    c.lineTo(cx-fw+3,cy+100);c.bezierCurveTo(cx-fw,cy+70,cx-fw+3,cy+40,cx-fw+3,cy+10);c.fill();c.restore();
    // Top of head
    c.fillStyle=hg;c.beginPath();c.ellipse(cx,cy-fh*0.3,fw+10,fh*0.55,0,Math.PI,Math.PI*2);c.fill();
    // Bangs
    c.beginPath();c.moveTo(cx-fw-8,cy-10);
    c.quadraticCurveTo(cx-fw+5,cy-35,cx-15,cy-8);c.quadraticCurveTo(cx-5,cy-28,cx+5,cy-8);
    c.quadraticCurveTo(cx+15,cy-28,cx+fw-5,cy-10);c.quadraticCurveTo(cx+fw+5,cy-35,cx+fw+8,cy-10);
    c.lineTo(cx+fw+10,cy-30);c.quadraticCurveTo(cx,cy-fh-18,cx-fw-10,cy-30);c.closePath();c.fill();
    // Hair shine
    c.save();c.globalAlpha=0.2;c.strokeStyle=this._l(hc,60);c.lineWidth=3;
    c.beginPath();c.moveTo(cx-20,cy-38);c.quadraticCurveTo(cx,cy-42,cx+20,cy-38);c.stroke();c.restore();
    // Side strands
    c.fillStyle=hc+'C0';
    c.beginPath();c.moveTo(cx-fw-3,cy-8);c.bezierCurveTo(cx-fw-12,cy+25,cx-fw-8,cy+60,cx-fw-5,cy+90);c.lineTo(cx-fw+5,cy+90);c.bezierCurveTo(cx-fw+2,cy+55,cx-fw-2,cy+20,cx-fw+5,cy-5);c.closePath();c.fill();
    c.beginPath();c.moveTo(cx+fw+3,cy-8);c.bezierCurveTo(cx+fw+12,cy+25,cx+fw+8,cy+60,cx+fw+5,cy+90);c.lineTo(cx+fw-5,cy+90);c.bezierCurveTo(cx+fw-2,cy+55,cx+fw+2,cy+20,cx+fw-5,cy-5);c.closePath();c.fill();

    // Accessories
    if(['ruler','queen','princess','general'].includes(rank)){
      c.fillStyle='#FFD700';
      c.beginPath();c.moveTo(cx-25,cy-fh*0.5);c.lineTo(cx-18,cy-fh*0.7);c.lineTo(cx-10,cy-fh*0.5);c.lineTo(cx,cy-fh*0.75);c.lineTo(cx+10,cy-fh*0.5);c.lineTo(cx+18,cy-fh*0.7);c.lineTo(cx+25,cy-fh*0.5);c.closePath();c.fill();
      c.fillStyle=o.p;c.beginPath();c.arc(cx,cy-fh*0.6,4,0,Math.PI*2);c.fill();
    }
    // Earrings
    if(isF){
      c.fillStyle='#FFD700';
      c.beginPath();c.arc(cx-fw+5,cy+5,4,0,Math.PI*2);c.fill();
      c.beginPath();c.arc(cx+fw-5,cy+5,4,0,Math.PI*2);c.fill();
      c.fillStyle=o.p;
      c.beginPath();c.arc(cx-fw+5,cy+5,2,0,Math.PI*2);c.fill();
      c.beginPath();c.arc(cx+fw-5,cy+5,2,0,Math.PI*2);c.fill();
    }

    // Atmosphere overlay
    c.save();c.globalAlpha=0.08;
    for(let i=0;i<8;i++){
      const x=rng()*S,y=rng()*S,r=rng()*40+20;
      const ag=c.createRadialGradient(x,y,0,x,y,r);
      ag.addColorStop(0,'rgba(255,255,255,0.3)');ag.addColorStop(1,'rgba(255,255,255,0)');
      c.fillStyle=ag;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();
    }
    c.restore();

    // Ornate frame
    c.strokeStyle=o.p+'80';c.lineWidth=4;
    c.strokeRect(4,4,S-8,S-8);
    c.strokeStyle=o.a+'60';c.lineWidth=2;
    c.strokeRect(8,8,S-16,S-16);
    // Corner ornaments
    const cs=20;
    c.strokeStyle=o.a;c.lineWidth=2;
    [[0,0],[S-cs,0],[0,S-cs],[S-cs,S-cs]].forEach(([x,y])=>{
      c.beginPath();c.moveTo(x+cs/2,y);c.lineTo(x+cs,y+cs/2);c.moveTo(x+cs/2,y+cs);c.lineTo(x,y+cs/2);c.stroke();
      c.fillStyle=o.a;c.beginPath();c.arc(x+cs/2,y+cs/2,3,0,Math.PI*2);c.fill();
    });

    const texture = PIXI.Texture.from(cv);
    this.cache.set(key, texture);
    return texture;
  }

  generateSprite(seed, gender, nationId, rank, width = 200, height = 200) {
    const tex = this.generate(seed, gender, nationId, rank);
    const sprite = new PIXI.Sprite(tex);
    sprite.width = width;
    sprite.height = height;
    sprite.anchor.set(0.5);
    return sprite;
  }

  clearCache() {
    this.cache.forEach(tex => tex.destroy(true));
    this.cache.clear();
  }
}