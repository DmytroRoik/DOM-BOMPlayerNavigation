
function Bullet(startPositionX,startPositionY,delta,angle,$parent){
	this.startPositionX=startPositionX;
	this.startPositionY=startPositionY;
	this.curPositionX;
	this.curPositionY;
	this.angle=angle;
	this.deltaX=delta['X'];
	this.deltaY=delta['Y'];
	this.isFindEnemyTank=false;
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
	if(this.isFindEnemyTank){ return true; }
};

Bullet.prototype.SeekTank = function(bullet){
	for(let i=0;i<tankPositions.length;i++){
		if(bullet.curPositionX>=tankPositions[i].X&&bullet.curPositionX<=tankPositions[i].X+76&&
 			bullet.curPositionY>=tankPositions[i].Y&&bullet.curPositionY<=tankPositions[i].Y+76){
 				bullet.isFindEnemyTank=true;

 			soundPlay('mp3/boom.mp3');
 			enemys[i].Destroy();
 			bullet.Destroy();
 			break;
 		}
 	}
};
Bullet.prototype.Destroy = function(){
	//play boom http://www.clker.com/cliparts/B/z/q/W/b/y/comic-explosion-hi.png
	//alert('boom');
	this.$bullet.setAttribute('src', 'http://www.clker.com/cliparts/B/z/q/W/b/y/comic-explosion-hi.png');
	this.$bullet.classList.add('bullet_boom');
}
