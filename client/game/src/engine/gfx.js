Gfx = function() {
	var tileWidth = 50;
	var tileHeight = 50;
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
            stage.update(event);
        });
	}
	
	var setupBackground = function (layout) {
		for(var x = 0; x < layout.length; x++) {
			for (var y = 0; y < layout.length; y++) {
				
			}
		}
	}
}