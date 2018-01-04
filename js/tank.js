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
	document.body.append(this.$el);
	this.lastDelta={};
}

Tank.prototype.Move = function(direction){
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
  	for(let i=tankPositions.length-1;i>=1;i--){//colision with tank
  		if((this.position.Y+76-this.deltaY>=tankPositions[i].Y)&&(this.position.Y-this.deltaY<=tankPositions[i].Y+76)&&
  			(this.position.X+76+this.deltaX>tankPositions[i].X)&&(this.position.X+this.deltaX<=tankPositions[i].X+76)){
  			return;
  	}
  }
  var self=this;
  if(self.position.Y>=30&&self.position.Y<=window.innerHeight-120){
  	self.position.Y-=(self.deltaY);
  } 
  else self.position.Y = self.position.Y<=30?30:window.innerHeight-120;

  if(self.position.X>=40&&self.position.X<=window.innerWidth-120) self.position.X+=self.deltaX;
  else self.position.X=self.position.X<=40?40:window.innerWidth-120;

  self.$el.style.top = self.position.Y+'px';
  self.$el.style.left = self.position.X+'px';
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
  		if((this.position.Y+76+this.deltaY>=tankPositions[i].Y)&&(this.position.Y+this.deltaY<=tankPositions[i].Y+76)&&
  			(this.position.X+76-this.deltaX>tankPositions[i].X)&&(this.position.X-this.deltaX<=tankPositions[i].X+76)){
  			return;
  	}
  }

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
	soundPlay('mp3/shut.mp3');
	var self = this;
	var timer = setInterval(function () {
		var timePassed = Date.now() - start;
		if(bullet.isFindTank(timePassed)){
			clearInterval(timer);
		} 		
 		if(timePassed>4000){//liftime of bullet is 4s
 			clearInterval(timer);
 			return;
 		}
 	}, 5);
};
Tank.prototype.Destroy = function(){
	
};
