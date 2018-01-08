var player;
var tankPositions=[];
var enemys=[];
var audio=null;
var walls=[];
var wallsPosition=[];

player = new Tank(100,100,0);

enemys.push(player);
enemys.push(new Tank(250,200,0));
enemys.push(new Tank(450,670,0));
enemys.push(new Tank(550,450,0));
enemys.push(new Tank(650,400,0));
enemys.push(new Tank(770,200,90));
enemys.push(new Tank(850,300,0));
enemys.push(new Tank(950,400,0));

for(let i=0;i<enemys.length;i++){
  tankPositions.push(enemys[i].position);
  if(i!=0)enemys[i].moveWithAI();
}

walls.push(new Wall(600,200,150,300));
walls.push(new Wall(100,600,150,300));
walls.push(new Wall(600,600,150,300));

walls.push(new Wall(100,1000,150,300));
walls.push(new Wall(600,1000,150,300));

walls.push(new Wall(100,1300,150,300));
walls.push(new Wall(600,1300,150,300));

for(let i=0;i<walls.length;i++){          //build walls
  document.body.append(walls[i].$wall);
  wallsPosition.push({
    position: walls[i].position,
    width: walls[i].width,
    height: walls[i].height
  });
}
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
    audio = new Audio();
    audio.src = urlSound;
    audio.play();
}

function Wall(y,x,width,height){
  this.position={X: x,Y: y};
  this.width=width;
  this.height=height;

  this.$wall=document.createElement('div');
    this.$wall.classList.add('wall');
    this.$wall.style.top=y+'px';
    this.$wall.style.left=x+'px';
    this.$wall.style.width=width+'px';
    this.$wall.style.height=height+'px';

}
