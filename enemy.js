function Tank(positionX,positionY,angle)
{
	this.position={X: positionX,Y: positionY};
	this.angle=angle;
	this.trackPositionL=0;
	this.trackPositionR=0;
	this.bullets=20;
	this.deltaX=0;
	this.deltaY=0;
	this.$el=document.createElement('div');
		this.$el.classList.add('tank');
		this.$el.innerHTML='<div class="track"></div>'+
								 '<div class="track"></div>';
		 this.$el.classList.add('tank');
	this.$trackL=this.$el.getElementsByClassName('track')[0];
	this.$trackR=this.$el.getElementsByClassName('track')[1];
	 
		 this.$el.style.top=this.position.Y+'px';
		 this.$el.style.left=this.position.X+'px';	
	document.body.append(this.$el);
}

Tank.prototype.Move = function(direction){
	if (direction=="LEFT") {
		this.angle-=45;
		this.$el.style.transform = 'rotateZ('+this.angle+'deg)';
	}
	else if (direction=="RIGHT") {
		this.angle+=45;
		this.$el.style.transform = 'rotateZ('+this.angle+'deg)';
	}

  //vectors of direction
  this.deltaY=(parseInt (20*(Math.cos(this.angle/57.324840)).toFixed(1)));
  this.deltaX=(parseInt (20*(Math.sin(this.angle/57.324840)).toFixed(1)));

  if(direction=="UP"){
	var self=this;
  	setTimeout(function () {
  		   if(self.position.Y>=30&&self.position.Y<=window.innerHeight-120) self.position.Y-=(self.deltaY);// deltaY;
		   else self.position.Y = self.position.Y<=30?30:window.innerHeight-120;

		   if(self.position.X>=40&&self.position.X<=window.innerWidth-120) self.position.X+=self.deltaX;// deltaY;
		   else self.position.X=self.position.X<=40?40:window.innerWidth-120;

		   self.$el.style.top = self.position.Y+'px';
		   self.$el.style.left = self.position.X+'px';
		},3);
		//move track
		this.trackPositionL= this.trackPositionR-=Math.abs(this.deltaX)+Math.abs(this.deltaY);
	}
	else if(direction=="DOWN"){
	    if(this.position.Y>=30&&this.position.Y<=window.innerHeight-120) this.position.Y+=(this.deltaY);// deltaY;
	    else this.position.Y = this.position.Y<=30?30:window.innerHeight-120;

	   if(this.position.X>=40&&this.position.X<=window.innerWidth-120) this.position.X-=this.deltaX;// deltaY;
	   else this.position.X=this.position.X<=40?40:window.innerWidth-120;

	   this.$el.style.top= this.position.Y+'px';
	   this.$el.style.left= this.position.X+'px';
	   //move track
	   
	   this.trackPositionL= this.trackPositionR-=Math.abs(this.deltaX)+Math.abs(this.deltaY);
	}
	 this.$trackR.style.backgroundPosition = '0px '+this.trackPositionR+'px';
	 this.$trackL.style.backgroundPosition = '0px '+this.trackPositionL+'px';
};

Tank.prototype.Fire = function(){

	var bullet=new Bullet(this.position.X,this.position.Y,{'X': this.deltaX,'Y': this.deltaY },this.angle,this.$el);
	
 	var start = Date.now();

   var self = this;
 	var timer = setInterval(function () {
 		var timePassed = Date.now() - start;
 		if(bullet.isFindTank(timePassed)){
 			clearInterval(timer);
 		} 		

 		if(timePassed>4000){
 			
 			//bullet.remove();
 			return;
 		}
 	}, 5);
};
Tank.prototype.Destroy = function(){
	
};
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
	var self=this;
		var isfound=false;
		setTimeout(this.SeekTank, 100,this);
		if(this.isFindEnemyTank)return true;
 	
	//}, 10);
	

};
Bullet.prototype.SeekTank = function(bullet){
	for(let i=0;i<tankPositions.length;i++){
		if(bullet.curPositionX>=tankPositions[i].X&&bullet.curPositionX<=tankPositions[i].X+76&&
 			bullet.curPositionY>=tankPositions[i].Y&&bullet.curPositionY<=tankPositions[i].Y+76){
 				bullet.isFindEnemyTank=true;
 			enemys[i].Destroy();
 		}}
};
Bullet.prototype.Destroy = function(argument){
	
};
