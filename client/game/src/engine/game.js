CharManager = null;
EasyAStar = null;

Game = function() {
	
	var self = this;
	this.level = null;
	this.gameLogic = null;
	this.gfx = null;
	this.communicator = null;
	
	var GameLoop = function() {
		self.gameLogic.update();
		//self.gfx.render();
	}
	
	this.bullshit = function() {
		CharManager.createCharacter('cromnow');
        CharManager.createCharacter('hannes');
        CharManager.setCharacterDestination('hannes', 3, 2);
	}
	
	this.setUp = function() {
		CharManager = new CharacterManager();
        this.level = new LevelHandler(new OfficeMap());
        var pathFindingAlgorithms = new PathFindingAlgorithms(this.level);
        EasyAStar = pathFindingAlgorithms.getEasyAstar();
		this.bullshit();
		this.gfx = new Gfx();
		this.gameLogic = new GameLogic(CharManager, this.level, this.gfx);
	}

	this.setupCommunicator = function(charGFXManager) {
		this.communicator = new Communicator(charGFXManager);
	}

	this.render = function() {
		this.gfx.setup(this.level, this.gameLogic);
		this.setupCommunicator(this.gfx.getCharGFXManager());
	}
	
	this.run = function() {
		setInterval(GameLoop, 60 / 1000);
	}
}