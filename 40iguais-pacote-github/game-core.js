/* Shared deterministic game rules, usable by the page and verification. */
(function(root){
class TennisGame{
 constructor(random=Math.random){this.random=random;this.reset();}
 reset(){this.advantage=0;this.winner=null;this.player=210;this.ai=210;this.hits=0;this.serve();}
 serve(){this.ball={x:400,y:130+this.random()*160,vx:(this.random()>.5?1:-1)*270,vy:(this.random()-.5)*230};this.wait=.8;}
 point(side){this.advantage+=side==='a'?1:-1;this.winner=Math.abs(this.advantage)>=2?(this.advantage>0?'a':'b'):null;this.hits=0;if(!this.winner)this.serve();return side;}
 tick(dt,target){if(this.winner)return null;dt=Math.min(dt,.035);const clamp=v=>Math.max(45,Math.min(375,v));this.player=clamp(target);this.ai=clamp(this.ai+Math.max(-165*dt,Math.min(165*dt,this.ball.y-this.ai)));if(this.wait>0){this.wait-=dt;return null;}const b=this.ball;b.x+=b.vx*dt;b.y+=b.vy*dt;if(b.y<9){b.y=9;b.vy=Math.abs(b.vy);}if(b.y>411){b.y=411;b.vy=-Math.abs(b.vy);}const left=b.vx<0&&b.x<=44&&b.x>=23&&Math.abs(b.y-this.player)<=53;const right=b.vx>0&&b.x>=756&&b.x<=777&&Math.abs(b.y-this.ai)<=53;if(left||right){b.x=left?44:756;const offset=(b.y-(left?this.player:this.ai))/53;const speed=Math.min(540,Math.hypot(b.vx,b.vy)+18);b.vx=(left?1:-1)*speed*Math.cos(offset*.85);b.vy=speed*Math.sin(offset*.85);this.hits++;}if(b.x<0)return this.point('b');if(b.x>800)return this.point('a');return null;}
}
if(typeof module!=='undefined'&&module.exports)module.exports=TennisGame;else root.TennisGame=TennisGame;
})(typeof window!=='undefined'?window:globalThis);
