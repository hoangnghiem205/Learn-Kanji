function Enemy(gameWidth, gameHeight, data, xpos, ypos) {
	//this.xpos = (xpos == "undefined") ? (Math.round(Math.random() * (gameWidth - 26))) : xpos;
	this.xpos = (typeof xpos !== "undefined") ? xpos : (Math.round(Math.random() * (gameWidth - 26)));
    this.ypos = (typeof ypos !== "undefined") ? ypos : (-Math.round(Math.random() * 250));
    this.v = 0.5;
    this.avaiable = true;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.key = data["key"];
    this.value = data["value"];
    this.img = new Image();
    this.img.src = data["src"];	
    this.startTime = 0;
    this.isShooting = false;
};

Enemy.prototype = {
	draw: function(context) {
		if (this.avaiable) {

        context.save();
        context.drawImage(this.img, this.xpos, this.ypos);

        context.fillStyle = "white";
        context.font = "bold 12px Arial";
        context.fillText(this.key, this.xpos , this.ypos + this.img.height + 10);

        context.restore();
    	}
	},
	update: function() {
		this.ypos = this.ypos + this.v;

	    if (this.ypos > this.gameHeight) {
	        this.avaiable = false;
	    }


	    if (this.img.src.indexOf("destroyer")!= -1 && this.avaiable && this.ypos > 0) {
	    	if (this.startTime == 0) this.startTime = (new Date()).getTime();		
	    	var tick = (new Date()).getTime();
	    	if (tick - this.startTime > 8000) {
	    		//console.log('vao day');
	    		this.isShooting = true;
	    		this.startTime = tick;
	    	}
	    }
	},
	collide: function(p) {
	    if (!this.avaiable) {
	        return false;
	    }
	    if ((Math.abs(p.ypos - (this.ypos + (this.img.height / 2))) < 10) && (Math.abs(p.xpos - (this.xpos + (this.img.width / 2))) < 10)) {
	        return true;
	    }
	    return false;
	}
};




/**
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
**/
