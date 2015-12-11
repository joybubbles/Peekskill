Gfx = function() {
	var tileWidth = 100;
	var tileHeight = 100;
	var stage, christian = null;
	
	var self = this;
	this.mapLayout = [];
	this.charManager = null;
	this.charGfxManager = null;
	
		
	this.setup = function(level, characterManager) {
		this.mapLayout = level.getLayout();
		this.charManager = characterManager;
		
		stage = new createjs.Stage("canvas");
		createjs.Ticker.setFPS(60);
		setupBackground(this.mapLayout);
		this.charGfxManager = new CharacterGFXManager(this.charManager);
		this.charGfxManager.loadCharacterAnimations(stage);
		
		createjs.Ticker.addEventListener("tick", function(event) {
			self.charGfxManager.setCharacterAnimations(tileWidth, tileHeight);
			self.renderbackground();
            stage.update(event);
        });
	}
	
	
	/*
		TODO: Move
	*/
	
	this.renderbackground = function() {

	}
	
	var setupBackground = function (layout) {
		//stage.addChild(shape);
		for(var x = 0; x < layout.length; x++) {
			for (var y = 0; y < layout.length; y++) {
				var posX = x * 50;
				var posY = y * 50;
				var shape = new createjs.Shape();
				shape.graphics.beginFill('red').drawRect(posX + 2, posY + 2, posX + 50, posY + 50);
				shape.snapToPixel = true;
				stage.addChild(shape);
			}
		}
 		//shape.graphics.beginFill("#ff0000").drawRect(0, 0, 50, 50);
	}
}