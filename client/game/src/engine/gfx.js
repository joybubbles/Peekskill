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

    this.getCharGFXManager = function() {
        return this.charGfxManager;
    }
    
	this.setup = function(level, gameLogic) {
		this.mapLayout = level.getLayout();
        this.gameLogic = gameLogic;

		var background = new createjs.Bitmap("map.png");
		stage = new createjs.Stage("canvas");
        this.mainContainer = new createjs.Container();
        stage.addChild(this.mainContainer);
		this.mainContainer.addChild(background);
		createjs.Ticker.setFPS(60);
		setupBackground(this.mapLayout);
		this.charGfxManager = new CharacterGFXManager(this.mainContainer);
        this.charGfxManager.loadCharacterAnimations(this.mainContainer);

		createjs.Ticker.addEventListener("tick", function(event) {
			self.charGfxManager.setCharacterAnimations(stage, tileWidth, tileHeight);
            stage.update(event);
        });

        //this.camera = new Camera(this.mainContainer, tileWidth);
        //this.camera.followCharacter(characterManager.getCharacter('cromnow'));
        stage.addEventListener('click', this.handleClick);
        document.onkeydown = this.handleKeyDown;
    };

    this.updateCamera = function () {
        // this.camera.update();
    };

    this.handleKeyDown = function(event) {
        var keyCode = event.keyCode;
        console.log(keyCode);

        var speed = 20;

        /* W */
        if (keyCode==87) {
            self.camera.move(0, -10);
           //  self.mainContainer.y -= speed;
        }

        /* S */
        if (keyCode==83) {
           // self.mainContainer.y += speed;
        }

        /* A */
        if (keyCode==65) {
           // self.mainContainer.x -= speed;
        }

        /* D */
        if (keyCode==68) {
          //  self.mainContainer.x += speed;
        }
    };

    this.handleClick = function(event) {
        var tileX = parseInt((event.stageX - 52 - self.mainContainer.x) / tileWidth);
        var tileY = parseInt((event.stageY - 160 - self.mainContainer.y) / tileHeight);

        var currentCharacterId = Session.get('currentCharacterId');
        if (currentCharacterId != 'default') {
            CharManager.setCharacterDestination(currentCharacterId, tileX, tileY);
            var character = CharManager.getCharacter(currentCharacterId);
            Meteor.call('updateCharacter', currentCharacterId, { x: character.Xpos, y: character.Ypos, targetX: tileX, targetY: tileY});
        }
    };
	
	var setupBackground = function (layout) {
		for(var x = 0; x < layout.length; x++) {
			for (var y = 0; y < layout.length; y++) {
				
			}
		}
	}
};