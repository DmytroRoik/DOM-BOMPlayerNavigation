function Tank(positionX, positionY) {
    this.position = { X: positionX, Y: positionY };
    this.angle = 0;
    this.trackPositionL = 0;
    this.trackPositionR = 0;
    this.bullets = 20;
    this.deltaX = 0;
    this.deltaY = 0;
    this.$el = document.createElement('div');
    this.$el.classList.add('tank');
    this.$el.innerHTML = '<div class="track"></div>' +
        '<div class="track"></div>';
    this.$el.classList.add('tank');
    this.$trackL = this.$el.getElementsByClassName('track')[0];
    this.$trackR = this.$el.getElementsByClassName('track')[1];

    this.$el.style.top = this.position.Y + 'px';
    this.$el.style.left = this.position.X + 'px';
    this.isDead = false;
    this.canShoot = true;
    document.body.append(this.$el);
}
var WIDTH_TANK_IMAGE = 76;

Tank.prototype.Move = function(direction) {
    if (this.isDead) return;
    if (direction == "LEFT") {
        this.angle -= 90;
        this.$el.style.transform = 'rotateZ(' + this.angle + 'deg)';
        this.deltaY = (parseInt(20 * (Math.cos(this.angle / 57.324840)).toFixed(1)));
        this.deltaX = (parseInt(20 * (Math.sin(this.angle / 57.324840)).toFixed(1)));
        return;
    } else if (direction == "RIGHT") {
        this.angle += 90;
        this.$el.style.transform = 'rotateZ(' + this.angle + 'deg)';
        this.deltaY = (parseInt(20 * (Math.cos(this.angle / 57.324840)).toFixed(1)));
        this.deltaX = (parseInt(20 * (Math.sin(this.angle / 57.324840)).toFixed(1)));
        return;
    }

    var directionIndex = 1;
    if (direction == "UP") {
        directionIndex = 1;
    } else if (direction == "DOWN") {
        directionIndex = -1;
    }
    for (let i = wallsPosition.length - 1; i >= 0; i--) { //colision with wall
        if ((this.position.Y + WIDTH_TANK_IMAGE - this.deltaY * directionIndex >= wallsPosition[i].position.Y) && (this.position.Y - this.deltaY * directionIndex <= wallsPosition[i].position.Y + wallsPosition[i].height) &&
            (this.position.X + WIDTH_TANK_IMAGE + this.deltaX * directionIndex > wallsPosition[i].position.X) && (this.position.X + this.deltaX * directionIndex <= wallsPosition[i].position.X + wallsPosition[i].width)) {
            return;
        }
    }

    for (let i = tankPositions.length - 1; i >= 0; i--) { //colision with tank
        if (this.position == tankPositions[i]) continue;
        if ((this.position.Y + WIDTH_TANK_IMAGE - this.deltaY * directionIndex >= tankPositions[i].Y) && (this.position.Y - this.deltaY * directionIndex <= tankPositions[i].Y + WIDTH_TANK_IMAGE) &&
            (this.position.X + WIDTH_TANK_IMAGE + this.deltaX * directionIndex > tankPositions[i].X) && (this.position.X + this.deltaX * directionIndex <= tankPositions[i].X + WIDTH_TANK_IMAGE)) {
            return;
        }
    }
    var curPositionYMoreThan0 = this.position.Y - this.deltaY * directionIndex >= 0;
    var curPositionYLessThanMaxWindowHeight = this.position.Y - this.deltaY * directionIndex + WIDTH_TANK_IMAGE <= window.innerHeight;
    var curPositionXMoreThan0 = this.position.X + this.deltaX * directionIndex >= 0;
    var curPositionXLessThanMaxWindowWidth = this.position.X + this.deltaX * directionIndex + WIDTH_TANK_IMAGE <= window.innerWidth;

    if (curPositionYMoreThan0 && curPositionYLessThanMaxWindowHeight)
        this.position.Y -= (this.deltaY) * directionIndex;
    if (curPositionXMoreThan0 && curPositionXLessThanMaxWindowWidth)
        this.position.X += this.deltaX * directionIndex;

    this.$el.style.top = this.position.Y + 'px';
    this.$el.style.left = this.position.X + 'px';
    this.trackPositionL = this.trackPositionR -= Math.abs(this.deltaX) + Math.abs(this.deltaY);
    this.$trackR.style.backgroundPosition = '0px ' + this.trackPositionR + 'px';
    this.$trackL.style.backgroundPosition = '0px ' + this.trackPositionL + 'px';
};

Tank.prototype.Fire = function() {
    if (this.isDead || !this.canShoot) return;
    this.canShoot = false;
    var timerToAcceptShoot = setTimeout(function(tank) {
        tank.canShoot = true;
    }, 1000, this);
    var bullet = new Bullet(this.position.X, this.position.Y, { 'X': this.deltaX, 'Y': this.deltaY }, this.angle, this.$el);
    var start = Date.now();
    soundPlay('mp3/shut.mp3');
    var timer = setInterval(function() {
        var timePassed = Date.now() - start;
        if (bullet.isFindTank(timePassed) || timePassed > 4000) {
            bullet.Destroy();
            clearInterval(timer);
        }
    }, 5);
};

Tank.prototype.moveWithAI = function() {
    var randDirrection = null;
    var self = this;
    var timer = setInterval(function() {

        randDirrection = Math.random();

        if (self.isDead) clearInterval(timer);
        if (randDirrection >= 0.4) {
            self.Move("UP");
        } else if (randDirrection > 0.25 && randDirrection < 0.4) {
            self.Move("LEFT");
        } else if (randDirrection > 0.1 && randDirrection < 0.25) {
            self.Move("RIGHT");
        }
    }, 100);

};

Tank.prototype.Destroy = function() {
    this.isDead = true;
    setTimeout(function(tank) {
        document.body.removeChild(tank.$el);
        var index = enemys.indexOf(tank);
        tankPositions.splice(index, 1);
        enemys.splice(index, 1);
    }, 2000, this)
};