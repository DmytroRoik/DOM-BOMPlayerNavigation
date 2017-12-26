var player;
var tankPositions=[];
var enemys=[];
var audio=null;
player = new Tank(50,50,0);

enemys.push(player);
enemys.push(new Tank(100,500,0));

tankPositions.push(enemys[0].position);
tankPositions.push(enemys[1].position);

document.body.onkeydown = function (e) {
  var KEYCODE_LEFT = 37;
  var KEYCODE_RIGHT = 39;
  var KEYCODE_UP=38;
  var KEYCODE_DOWN=40;
  var KEYCODE_SPACE=32;

  if (e.keyCode == KEYCODE_LEFT) {
    player.Move("LEFT");
  }
  else if (e.keyCode == KEYCODE_RIGHT) {
    player.Move("RIGHT"); 
  }

  if(e.keyCode==KEYCODE_UP){
    player.Move("UP");
  }
  else if(e.keyCode==KEYCODE_DOWN){
    player.Move("DOWN");
  }
  else if(e.keyCode==KEYCODE_SPACE){//fire
    player.Fire();
  }
}

function soundPlay(urlSound) {
    if(audio!=null&&!audio.paused)audio.pause();//stop prev sound
    audio = new Audio(); // new audio el
    audio.src = urlSound; //sound path
    audio.play();
  }
