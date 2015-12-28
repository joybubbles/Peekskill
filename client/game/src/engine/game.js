CharManager = null;

Game = function() {
	
	var self = this;
	this.level = null;
	this.gameLogic = null;
	this.gfx = null;
	
	var GameLoop = function() {
		self.gameLogic.update();
		//self.gfx.render();
	}
	
	this.bullshit = function() {
		CharManager.createCharacter('cromnow');
		// this.gameLogic.setCharacterDestination('cromnow', 7, 1);
	}
	
	this.setUp = function() {
		CharManager = new CharacterManager();
		this.level = new LevelHandler(new OfficeMap());
		this.gfx = new Gfx();
		this.gameLogic = new GameLogic(CharManager, this.level, this.gfx);
		this.bullshit();
	}

	this.render = function() {
		this.gfx.setup(this.level, CharManager, this.gameLogic);
	}
	
	this.run = function() {
		setInterval(GameLoop, 60 / 1000);
	}
}