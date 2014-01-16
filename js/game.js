//file://localhost/Users/MacBookPro/NetBeansProjects/SpaceShipGame/public_html/index.html

var FPS = 60;
var _canvas;
var _context;
var _ship;
var _currentIndex = -1;
var _timer;
var _p = [];
var _m = [];
var tempValue;
var _animated;
var finished;
var endgame;
var curLevel = 0;

function clear() {
    _context.clearRect(0, 0, _canvas.width, _canvas.height);
}

function init() {
    _canvas = document.getElementById("mycanvas");
    _context = _canvas.getContext("2d");
    _canvas.onkeydown = canvas_keyDown;
    $("#text").html("");

    // Khoi tao thong tin moi cho game
    _ship = new Ship(_canvas.width, _canvas.height);
    _p = [];
    tempValue = "";
    _m = [];
    _currentIndex = -1
    finished = false;
    endgame = false;
    
    // Khoi tao quan thu
    for (var i = 0; i < level[curLevel%level.length].length; i++) {
        var e = new Enemy(_canvas.width, _canvas.height, level[curLevel][i]);
        _m.push(e);
    }

    // Khoi tao chay no
    _animated = new Animated({
        mapWidth: _canvas.width,
        mapHeight: _canvas.height,
        image: "img/explosion_2.png",
        frameWidth: 64,
        frameHeight: 64,
        interval: 50,
        isLooping: false

    });
    _animated.addSprite({
        name: "test",
        startFrame: 0,
        framesCount: 25,
        framesPerRow: 5
    });


    draw();
    _timer = window.setInterval(update, 1000 / FPS);
}

function draw() {
    clear();

    if (!finished) {
        _ship.draw(_context);
            
        for (var i = 0; i < _p.length; i++)
        {
            _p[i].draw(_context);
        }

        for (var i = 0; i < _m.length; i++)
        {
            _m[i].draw(_context);
        }

        _animated.draw(_context);
    }
}


function update() {


    var flag;
    //Kiem tra ket thuc, khi tat ca cac ke thu da het
    for (var i = 0; i < _m.length; i++) {
        if (_m[i].ypos > _canvas.height) {curLevel = 100; flag = false;break;}
        flag |= _m[i].avaiable;
    }
    if (_ship.isDied) {
        flag = false;
    }
    finished = !flag;   

	_ship.update();

    //  Tinh goc quay cho phi thuyen, de ban' trung' ke thu`
	if (_currentIndex !== -1) {
	    var tan = (_ship.ypos - _m[_currentIndex].ypos - (_m[_currentIndex].img.height / 2)) / (_ship.xpos - _m[_currentIndex].xpos - (_m[_currentIndex].img.width / 2));
	    _ship.angle = Math.round((Math.atan(tan) * 180 / Math.PI));

	    if (_ship.angle > 0) {
	        _ship.angle -= 90;
	    } else {
	        _ship.angle += 90;
		}
    }

    // Kiem tra va cham phi thuyen
    for (var i = 0; i < _m.length; i++)
    {
        if (_m[i].isShooting) {
            var e = new Enemy(_canvas.width, _canvas.height, missleData[Math.round((Math.random() * 10) % (missleData.length - 1) )], _m[i].xpos, _m[i].ypos);
            e.v = 0.7;
            
            _m.push(e);    
            _m[i].isShooting = false;
        }
    	if (_ship.collide(_m[i])) {
    		_m[i].avaiable = false;
    		_ship.isDied = true;
    		_animated.setPostion(_ship.xpos, _ship.ypos, true);
            _animated.show();
    	}
        _m[i].update();
    }

    for (var i = 0; i < _p.length; i++)
    {
        if (_p[i].avaiable === 1) {
            _p[i].angle = _ship.angle;
            if (_currentIndex !== -1) {	
                var check = _m[_currentIndex].collide(_p[i]);

                if (check) {
                    _animated.setPostion(_m[_currentIndex].xpos + (_m[_currentIndex].img.width / 2), _m[_currentIndex].ypos + (_m[_currentIndex].img.height / 2), true);
                    _animated.show();
                    _p[i].avaiable = 0;

					_m[_currentIndex].value = _m[_currentIndex].value.substring(1, _m[_currentIndex].value.length);
					if (_m[_currentIndex].value === "") {
						_m[_currentIndex].avaiable = false;
            			_currentIndex = -1;
                        $("#text").html("");
        			}            
                    
                }
            }
            _p[i].update();
        }
        else {
            _p.splice(i, 1);
        }
    }

    // No
    if (_animated) {
        _animated.update();
    }
    draw();

    // Kiem tra ket thuc
    if (finished) {
        finished = false;

        // Neu level chua phai la cuoi cung
        if (((curLevel + 1) < level.length) && !_ship.isDied) {
            $('.gamelayer').hide();
            $('#levelclear .title').text("LEVEL " + (curLevel+1) + " CLEAR");
            $('#levelclear').fadeIn("slow");
            $('#levelclear').animate({
                opacity: 0,
                top: "+=200"
            }, 2000, function(){
                    curLevel++;
                    $('.gamelayer').hide();
                    $('#mycanvas').show();
                    $('#levelclear').removeAttr("style");
                    init();
            });
            // Neu level cuoi cung thi -> end game
        } else {
            console.log("Game over");
            $('.gamelayer').hide();
            $('#endgame').fadeIn("slow");
            curLevel = 0;
        }
        clearInterval(_timer);
        
    }
    
}

function canvas_keyDown(e) {

    var key = String.fromCharCode(e.keyCode).toLowerCase();

    if (_currentIndex !== -1) {
        if (_m[_currentIndex].value.indexOf(key) === 0 || tempValue.indexOf(key) === 0) {
            var item = new Plasma(_canvas.width, _canvas.height);
            item.show(_context, _ship.xpos, _ship.ypos);
            _p.push(item);
            tempValue = tempValue.substring(1,tempValue.length);
            _ship.shot();
            $("#text").append(key);
        }
    } else {
        for (var i = 0; i < _m.length; i++)
        {
        	if (_m[i].ypos < 0) continue;
            if (_m[i].value.indexOf(key) === 0) {
                _currentIndex = i;
                tempValue = _m[_currentIndex].value;
                tempValue = tempValue.substring(1,tempValue.length);
                var item = new Plasma(_canvas.width, _canvas.height);
                item.show(_context, _ship.xpos, _ship.ypos);
                _p.push(item);
                _ship.shot();
                $("#text").append(key);
                break;
            }
        }
    }
}

