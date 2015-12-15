Gfx = function(playerInput) {
	var pInput = playerInput;
	var tileWidth = 100;
	var tileHeight = 100;
	var stage = null;
	
	var self = this;
	var tileMap = [];
	this.mapLayout = [];
	this.charManager = null;
	this.charGfxManager = null;
	
	
		
	this.setup = function(level, characterManager) {
		this.mapLayout = level.getLayout();
		this.mapXLength = level.getXLength();
		this.mapYHeigth = level.getYHeigth();
		this.charManager = characterManager;
		
		stage = new createjs.Stage("canvas");
		createjs.Ticker.setFPS(60);
		setupBackground(this.mapLayout, this.mapXLength, this.mapYHeigth);
		this.charGfxManager = new CharacterGFXManager(this.charManager);
		this.charGfxManager.loadCharacterAnimations(stage);
		
		createjs.Ticker.addEventListener("tick", function(event) {
			self.charGfxManager.setCharacterAnimations(tileWidth, tileHeight);
            stage.update(event);
        });
	}
	
	
	/*
		TODO: Move
	*/
	
	this.renderbackground = function() {
		
	}
	
	var setupBackground = function (layout, xLength, yHeight) {
		var container = new createjs.Container();
		var img = new Image;
		img.src = '/environment/office-tile-map.png';
		img.onload = function() {
	    	var mapSpriteSheet = new createjs.SpriteSheet({
	        	images: [img],
	        	frames: { width: 100, height: 100 },
	   		});
			for(var x = 0; x < xLength + 1; x++) {
				for (var y = 0; y < yHeight; y++) {
					var sprite = new createjs.Sprite(mapSpriteSheet);
	        		sprite.x = x * tileWidth;
	        		sprite.y = y * tileHeight;
					sprite.width = 100;
					sprite.height = 100;
	        		sprite.gotoAndStop(layout[x][y]);
					sprite.addEventListener("click", function(event) {
						GlobalInput.handleClick(event);
					});
				
					container.addChild(sprite);
				}
			}
			stage.addChild(container);
			stage.setChildIndex(container, 0);
		}
	}
}