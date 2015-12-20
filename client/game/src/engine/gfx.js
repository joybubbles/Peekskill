Gfx = function() {
	var tileWidth = 40;
	var tileHeight = 40;
	var stage, christian = null;
	
	var self = this;
	this.mapLayout = [];
	this.charManager = null;
	this.charGfxManager = null;
    this.gameLogic = null;
    this.mainContainer = null;
    this.camera = null;
    var _this = this;


	this.setup = function(level, characterManager, gameLogic) {
		this.mapLayout = level.getLayout();
		this.charManager = characterManager;
        this.gameLogic = gameLogic;

		var background = new createjs.Bitmap("map.png");
		stage = new createjs.Stage("canvas");
        this.mainContainer = new createjs.Container();
        stage.addChild(this.mainContainer);
		this.mainContainer.addChild(background);
		createjs.Ticker.setFPS(60);
		setupBackground(this.mapLayout);
		this.charGfxManager = new CharacterGFXManager(this.charManager);
		this.charGfxManager.loadCharacterAnimations(this.mainContainer);
		
		createjs.Ticker.addEventListener("tick", function(event) {
			self.charGfxManager.setCharacterAnimations(tileWidth, tileHeight);
            stage.update(event);
        });

        stage.addEventListener('click', this.handleClick);
        document.onkeydown = this.handleKeyDown;

        this.camera = new Camera(this.mainContainer, tileWidth);
        this.camera.followCharacter(characterManager.getCharacter('cromnow'));
	};

    this.updateCamera = function () {
        this.camera.update();
    };

    this.handleKeyDown = function(event) {
        var keyCode = event.keyCode;
        console.log(keyCode);

        var speed = 20;

        /* W */
        if (keyCode==87) {
            _this.camera.move(0, -10);
           //  _this.mainContainer.y -= speed;
        }

        /* S */
        if (keyCode==83) {
           // _this.mainContainer.y += speed;
        }

        /* A */
        if (keyCode==65) {
           // _this.mainContainer.x -= speed;
        }

        /* D */
        if (keyCode==68) {
          //  _this.mainContainer.x += speed;
        }
    };

    this.handleClick = function(event) {
        console.log(_this.mainContainer.x);
        var tileX = parseInt((event.stageX - 52 - _this.mainContainer.x) / tileWidth);
        var tileY = parseInt((event.stageY - 160 - _this.mainContainer.y) / tileHeight);
        console.log(tileX + ' ' + tileY);
        _this.gameLogic.setCharacterDestination('cromnow', tileX, tileY);
    };
	
	var setupBackground = function (layout) {
		for(var x = 0; x < layout.length; x++) {
			for (var y = 0; y < layout.length; y++) {
				
			}
		}
	}
};