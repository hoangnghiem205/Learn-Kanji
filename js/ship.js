function Ship(gameWidth, gameHeight) {

    this.xpos = gameWidth/2;
    this.ypos = 600;
    this.v = 2;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.img = new Image();
    this.img.src = "img/ship.png";
    this.angle = 0;
    this.isDied = false;
    this.curFrame = 0;
    this.lastTick = 0;
    this.interval = 60;
    this.isShoot = false;
}

Ship.prototype.draw = function(context) {
    if (!this.isDied) {
        context.save();
        context.translate(this.xpos, this.ypos);
        context.rotate(this.angle * Math.PI / 180);
        context.drawImage(this.img, this.curFrame * 24, 0, 24, 24, -12, -12, 24, 24);
        context.restore();
    }
    
};

Ship.prototype.update = function() {
    //this.xpos = this.xpos + dx * this.v;
    //this.ypos = this.ypos + dy * this.v;
    if (this.isShoot) {
        var newTick = (new Date()).getTime();
        if(newTick-this.lastTick>=this.interval)
        {
            this.curFrame = this.curFrame + 1;
            console.log(this.curFrame);
            if (this.curFrame > 3) {
                this.curFrame = 0;
                this.isShoot = false;
            }

        this.lastTick = newTick;
        }
    }
};

Ship.prototype.collide = function(missle) {
    if (!missle.avaiable) {
        return false;
    }
    if (((this.ypos - (missle.ypos + 26)) < 12) && (Math.abs(missle.xpos - this.xpos + 12) < 10)) {
        return true;
    }
    return false;
};

Ship.prototype.shot = function() {
    this.isShoot = true;
};