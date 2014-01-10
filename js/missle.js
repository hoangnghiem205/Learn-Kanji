function Missle(gameWidth, gameHeight, data) {
    this.xpos = Math.round(Math.random() * (gameWidth - 26));
    this.ypos = -Math.round(Math.random() * 250);
    this.v = 0.5;
    this.avaiable = true;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.key = data["key"];
    this.value = data["value"];
    this.img = new Image();
    this.img.src = "img/missle.png";
}

Missle.prototype.draw = function(context) {
    if (this.avaiable) {

        context.save();
        context.drawImage(this.img, this.xpos, this.ypos);

        context.fillStyle = "white";
        context.font = "bold 12px Arial";
        context.fillText(this.key, this.xpos - 5 , this.ypos + 35);

        context.restore();
    }
};

Missle.prototype.update = function() {
    this.ypos = this.ypos + this.v;

    if (this.ypos > this.gameHeight) {
        this.avaiable = false;
    }
};

Missle.prototype.collide = function(p) {
    if (!this.avaiable) {
        return false;
    }
    if ((Math.abs(p.ypos - (this.ypos + 13)) < 10) && (Math.abs(p.xpos - (this.xpos + 13)) < 10)) {
        return true;
    }
    return false;
};
