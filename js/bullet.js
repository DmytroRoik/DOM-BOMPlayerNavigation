
function Bullet(startPositionX,startPositionY,delta,angle,$parent){
	this.startPositionX=startPositionX;
	this.startPositionY=startPositionY;
	this.curPositionX;
	this.curPositionY;
	this.angle=angle;
	this.deltaX=delta['X'];
	this.deltaY=delta['Y'];
	this.isFindEnemyTank=false;
	this.isFindWall=false;
	this.$bullet=document.createElement('img');
		this.$bullet.setAttribute("src", "img/bullet.png");
 		this.$bullet.classList.add('bullet');
 		this.$bullet.style.top=this.startPositionY+28+'px';
 		this.$bullet.style.left=this.startPositionX+30+'px';
 		this.$bullet.style.transform = 'rotateZ('+this.angle+'deg)';
 	document.body.insertBefore(this.$bullet, $parent);
 }

 Bullet.prototype.isFindTank = function(timePassed){
	this.curPositionX=this.startPositionX+32+this.deltaX*timePassed/20;
	this.$bullet.style.left=this.curPositionX+'px';
	this.curPositionY=this.startPositionY+28-this.deltaY*timePassed/20;
	this.$bullet.style.top=this.curPositionY+'px';

	var timer=setTimeout(this.SeekTank, 100,this);
	if(this.isFindEnemyTank||this.isFindWall){ return true; }
};

Bullet.prototype.SeekTank = function(bullet){
	for(let i=0;i<tankPositions.length;i++){
		if(bullet.curPositionX>=tankPositions[i].X&&bullet.curPositionX<=tankPositions[i].X+76&&//76-tank width and height
 			bullet.curPositionY>=tankPositions[i].Y&&bullet.curPositionY<=tankPositions[i].Y+76){
 				bullet.isFindEnemyTank=true;

 			soundPlay('mp3/boom.mp3');
 			enemys[i].Destroy();
 			return;
 		}
 	}
 	for(let i=wallsPosition.length-1;i>=0;i--){//find wall
			if((bullet.curPositionY+20+bullet.deltaY>=wallsPosition[i].position.Y)&&(bullet.curPositionY+bullet.deltaY<=wallsPosition[i].position.Y+wallsPosition[i].height)&&
				(bullet.curPositionX+20-bullet.deltaX>wallsPosition[i].position.X)&&(bullet.curPositionX-bullet.deltaX<=wallsPosition[i].position.X+wallsPosition[i].width)){
				bullet.isFindWall=true;
				bullet.Destroy();
				soundPlay('mp3/boom.mp3');
				return;
			}
		}
};
Bullet.prototype.Destroy = function(){

  this.$bullet.setAttribute('src', 'http://www.clker.com/cliparts/B/z/q/W/b/y/comic-explosion-hi.png');
	this.$bullet.classList.add('bullet_boom');
  setTimeout(function ($bullet) {
  document.body.removeChild($bullet);
}, 2000, this.$bullet);


}
