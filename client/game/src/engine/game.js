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
	
	var bullshit = function() {
		self.charManager.createCharacter('christian');
		self.gameLogic.setCharacterDestination('christian', 7, 1);
	}
	
	this.setUp = function() {
		this.charManager = new CharacterManager();
		this.level = new LevelHandler(new OfficeMap());
		this.gameLogic = new GameLogic(this.charManager, this.level);
		this.gfx = new Gfx();	
		bullshit();
		
	}
	
	this.render = function() {
		this.gfx.setup(this.level, this.charManager);
	}
	
	this.run = function() {
		setInterval(GameLoop, 60 / 1000);
	}
}