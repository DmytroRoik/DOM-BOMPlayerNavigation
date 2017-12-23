document.getElementById('player').style.top = '50px';
document.getElementById('player').style.left = '50px';

var player={
  positionX: 50,
  positionY: 50,
  angle: 0,
  trackPositionL: 0,
  trackPositionR: 0,
  hp:100,
  bullets:20,
}

var el = document.getElementById('player');
var $elTrackLeft=el.getElementsByClassName("track")[0];
var $elTrackRight=el.getElementsByClassName('track')[1];

function Bullet(positionX,positionY,angle){
  this.positionX=positionX;
  this.positionY=positionY;
  this.angle=angle;
}
function sleepFor( sleepDuration ){
  var now = new Date().getTime();
while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}
document.body.onkeydown = function (e) {
  var KEYCODE_LEFT = 37;
  var KEYCODE_RIGHT = 39;
  var KEYCODE_UP=38;
  var KEYCODE_DOWN=40;
  var KEYCODE_SPACE=32;

  if (e.keyCode == KEYCODE_LEFT) {
    player.angle-=45;
    el.style.transform = 'rotateZ('+player.angle+'deg)';
  }
  else if (e.keyCode == KEYCODE_RIGHT) {
    player.angle+=45;
    el.style.transform = 'rotateZ('+player.angle+'deg)';
  }

  var deltaX=0,deltaY=0;//vectors of direction
  deltaY+=(parseInt (20*(Math.cos(player.angle/57.324840)).toFixed(1)));
  deltaX+=(parseInt (20*(Math.sin(player.angle/57.324840)).toFixed(1)));

  if(e.keyCode==KEYCODE_UP){
   setTimeout(function (argument) {
   if(player.positionY>=30&&player.positionY<=window.innerHeight-120) player.positionY-=(deltaY);// deltaY;
   else player.positionY = player.positionY<=30?30:window.innerHeight-120;

   if(player.positionX>=40&&player.positionX<=window.innerWidth-120) player.positionX+=deltaX;// deltaY;
   else player.positionX=player.positionX<=40?40:window.innerWidth-120;

   el.style.top= player.positionY+'px';
   el.style.left= player.positionX+'px';
 },3);
//move track
player.trackPositionL= player.trackPositionR-=Math.abs(deltaX)+Math.abs(deltaY);
}
else if(e.keyCode==KEYCODE_DOWN){
    if(player.positionY>=30&&player.positionY<=window.innerHeight-120) player.positionY+=(deltaY);// deltaY;
    else player.positionY = player.positionY<=30?30:window.innerHeight-120;

   if(player.positionX>=40&&player.positionX<=window.innerWidth-120) player.positionX-=deltaX;// deltaY;
   else player.positionX=player.positionX<=40?40:window.innerWidth-120;

   el.style.top= player.positionY+'px';
   el.style.left= player.positionX+'px';
   //move track
   console.log(deltaX,deltaY);
 player.trackPositionL= player.trackPositionR-=Math.abs(deltaX)+Math.abs(deltaY);
 }
 else if(e.keyCode==KEYCODE_SPACE){//fire

  var bullet=document.createElement('img');
  bullet.setAttribute("src", "img/bullet.png");
  bullet.classList.add('bullet');
  bullet.style.top=player.positionY+28+'px';
  bullet.style.left=player.positionX+32+'px';
  bullet.style.transform = 'rotateZ('+player.angle+'deg)';
  document.body.insertBefore(bullet, el);

  var start = Date.now();

  var timer = setInterval(function () {
    var timePassed = Date.now() - start;
    console.log(deltaX,deltaY);
    var curBulletPosX=player.positionX+32+deltaX*timePassed/20;
    var curBulletPosY=player.positionY+28-deltaY*timePassed/20;

    bullet.style.left=curBulletPosX+'px';
    bullet.style.top=curBulletPosY+'px';
<<<<<<< b298049b2b06c2cad21163e30b9f885eaba24b64
    if(timePassed>10000)
      clearInterval(timer);
    return;
=======
    if(timePassed>10000){
        clearInterval(timer);
        bullet.remove();
        return;
      }
>>>>>>> added tank track
  }, 10);
}
$elTrackRight.style.backgroundPosition = '0px '+player.trackPositionR+'px';
$elTrackLeft.style.backgroundPosition = '0px '+player.trackPositionL+'px';
}