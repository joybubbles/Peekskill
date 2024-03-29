Game = function() {
	
	var self = this;
	this.charManager = null;
	this.level = null;
	this.gameLogic = null;
	this.gfx = null;
	
	var GameLoop = function() {
		self.gameLogic.update();
		//self.gfx.render();
	}
	
	this.bullshit = function() {
		this.charManager.createCharacter('cromnow');
		// this.gameLogic.setCharacterDestination('cromnow', 7, 1);
	}
	
	this.setUp = function() {
		this.charManager = new CharacterManager();
		this.level = new LevelHandler(new OfficeMap());
		this.gfx = new Gfx();
		this.gameLogic = new GameLogic(this.charManager, this.level, this.gfx);
		this.bullshit();
	}
	
	this.render = function() {
		this.gfx.setup(this.level, this.charManager, this.gameLogic);
	}
	
	this.run = function() {
		setInterval(GameLoop, 60 / 1000);
	}
}