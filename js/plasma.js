function Plasma(gameWidth, gameHeight) {
    this.xpos = 0;
    this.ypos = 0;
    this.direction = -1;
    this.v = 10;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.avaiable = 1;
    this.img = new Image();
    this.img.src = "img/plasma.png";
    this.angle = 0;
    
}

Plasma.prototype.show = function(context, xpos, ypos) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.draw(context);
};

Plasma.prototype.draw = function(context) {
    if (this.avaiable === 1) {
        context.save();
        
        context.translate(this.xpos, this.ypos);
        context.rotate(this.angle * Math.PI / 180);
        
        context.drawImage(this.img, -48, -48);
        
        context.restore();
    }
};

Plasma.prototype.update = function() {
    this.ypos = this.ypos + this.direction * this.v * Math.cos(this.angle * Math.PI / 180);
    this.xpos = this.xpos - this.direction * this.v * Math.sin(this.angle * Math.PI / 180);
    if (this.ypos < 0) this.avaiable = 0;
};
