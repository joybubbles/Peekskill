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
		this.gameLogic.addInputSource(
			new PlayerInput('cromnow', document.getElementById("canvas"))
		)
	}
	
	this.setUp = function() {
		this.charManager = new CharacterManager();
		this.level = new LevelHandler(new OfficeMap());
		this.gameLogic = new GameLogic(this.charManager, this.level);
		this.gfx = new Gfx();	
		this.bullshit();
	}
	
	this.render = function() {
		this.gfx.setup(this.level, this.charManager);
	}
	
	this.run = function() {
		setInterval(GameLoop, 60 / 1000);
	}
}