var player;
var tankPositions=[];
var enemys=[];
var audio=null;
var walls=[];
var wallsPosition=[];

player = new Tank(100,100);

enemys.push(player);
enemys.push(new Tank(310,200));
enemys.push(new Tank(560,550));
enemys.push(new Tank(790,430));
enemys.push(new Tank(1050,650));
enemys.push(new Tank(810,100));


for(let i=0;i<enemys.length;i++){
  tankPositions.push(enemys[i].position);
  if(i!=0)enemys[i].moveWithAI();
}

walls.push(new Wall(150,200,100,350));//y,x,width,height
walls.push(new Wall(150,450,100,350));

walls.push(new Wall(150,700,100,250));
walls.push(new Wall(230,700,250,100));
walls.push(new Wall(150,900,100,250));

walls.push(new Wall(150,1150,100,350));
walls.push(new Wall(150,1350,100,350));
///
walls.push(new Wall(650,200,100,300));//down
walls.push(new Wall(650,450,100,300));

walls.push(new Wall(550,700,300,250));//square

walls.push(new Wall(650,1150,100,300));
walls.push(new Wall(650,1350,100,300));

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
