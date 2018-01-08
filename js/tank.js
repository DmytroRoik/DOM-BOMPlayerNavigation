function Tank(positionX,positionY,angle){
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
  this.isDead=false;
	document.body.append(this.$el);
}

Tank.prototype.Move = function(direction){
  if(this.isDead)return;
	if (direction=="LEFT") {
		this.angle-=90;
		this.$el.style.transform = 'rotateZ('+this.angle+'deg)';
	}
	else if (direction=="RIGHT") {
		this.angle+=90;
		this.$el.style.transform = 'rotateZ('+this.angle+'deg)';
	}

  //vectors of direction
  this.deltaY=(parseInt (20*(Math.cos(this.angle/57.324840)).toFixed(1)));
  this.deltaX=(parseInt (20*(Math.sin(this.angle/57.324840)).toFixed(1)));

  if(direction=="UP"){

  	for(let i=wallsPosition.length-1;i>=0;i--){//colision with wall
  		if((this.position.Y+76-this.deltaY>=wallsPosition[i].position.Y)&&(this.position.Y-this.deltaY<=wallsPosition[i].position.Y+wallsPosition[i].height)&&
  			(this.position.X+76+this.deltaX>wallsPosition[i].position.X)&&(this.position.X+this.deltaX<=wallsPosition[i].position.X+wallsPosition[i].width)){
  			return;
  	}
  }
  	for(let i=tankPositions.length-1;i>=0;i--){//colision with tank
  		if(this.position ==tankPositions[i])continue;
  		if((this.position.Y+76-this.deltaY>=tankPositions[i].Y)&&(this.position.Y-this.deltaY<=tankPositions[i].Y+76)&&
  			(this.position.X+76+this.deltaX>tankPositions[i].X)&&(this.position.X+this.deltaX<=tankPositions[i].X+76)){
  			return;
  	}
  }

  if(this.position.Y>=30&&this.position.Y<=window.innerHeight-120){
  	this.position.Y-=(this.deltaY);
  }
  else this.position.Y = this.position.Y<=30?30:window.innerHeight-120;

  if(this.position.X>=40&&this.position.X<=window.innerWidth-120) this.position.X+=this.deltaX;
  else this.position.X=this.position.X<=40?40:window.innerWidth-120;

  this.$el.style.top = this.position.Y+'px';
  this.$el.style.left = this.position.X+'px';


  this.trackPositionL= this.trackPositionR-=Math.abs(this.deltaX)+Math.abs(this.deltaY);
		//move track
	}
	else if(direction=="DOWN"){
		for(let i=wallsPosition.length-1;i>=0;i--){//colision with wall
			if((this.position.Y+76+this.deltaY>=wallsPosition[i].position.Y)&&(this.position.Y+this.deltaY<=wallsPosition[i].position.Y+wallsPosition[i].height)&&
				(this.position.X+76-this.deltaX>wallsPosition[i].position.X)&&(this.position.X-this.deltaX<=wallsPosition[i].position.X+wallsPosition[i].width)){
				return;
		}
	}
	for(let i=tankPositions.length-1;i>=1;i--){//colision with tank
		if(this.position ==tankPositions[i])continue;
		if((this.position.Y+76+this.deltaY>=tankPositions[i].Y)&&(this.position.Y+this.deltaY<=tankPositions[i].Y+76)&&
			(this.position.X+76-this.deltaX>tankPositions[i].X)&&(this.position.X-this.deltaX<=tankPositions[i].X+76)){
			return;
	}
}
if(this.position.Y>=30&&this.position.Y<=window.innerHeight-120) this.position.Y+=(this.deltaY);
else this.position.Y = this.position.Y<=30?30:window.innerHeight-120;

if(this.position.X>=40&&this.position.X<=window.innerWidth-120) this.position.X-=this.deltaX;
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
  if(this.isDead)return;
	var bullet=new Bullet(this.position.X,this.position.Y,{'X': this.deltaX,'Y': this.deltaY },this.angle,this.$el);
	var start = Date.now();
	soundPlay('mp3/shut.mp3');
	var timer = setInterval(function () {
		var timePassed = Date.now() - start;
		if(bullet.isFindTank(timePassed)||timePassed>4000){
      bullet.Destroy();
      clearInterval(timer);
		}
 	}, 5);
};

Tank.prototype.moveWithAI = function(){//пародія на інтелект
	var randDirrection=null;

	var self=this;
	var timer=setInterval(function(){
    randDirrection=Math.random();

    if(this.isDead) clearInterval(timer);
    if(randDirrection>=0.4&&randDirrection<=0.95){
      self.Move("UP");
    }
    else if(randDirrection>0.95){
      self.Move("DOWN");
    }
    else if(randDirrection>0.2&&randDirrection<0.4){
     self.Move("LEFT");
   }
   else if(randDirrection>0.1&&randDirrection<0.2){
     self.Move("RIGHT");
   }
   //if(randDirrection<=0.05)self.Fire();//don`t fire
 }, 250);

};

Tank.prototype.Destroy = function(){
  this.isDead=true;
  setTimeout(function (tank) {
  document.body.removeChild(tank.$el);
  var index=enemys.indexOf(tank);
  tankPositions.splice(index, 1);
  enemys.splice(index, 1);
}, 2000, this)};
