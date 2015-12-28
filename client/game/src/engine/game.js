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
		this.setupCommunicator();
		this.gfx = new Gfx();
		this.gameLogic = new GameLogic(CharManager, this.level, this.gfx);
	}

	this.setupCommunicator = function() {
		this.communicator = new Communicator();
	}

	this.render = function() {
		this.gfx.setup(this.level, CharManager, this.gameLogic);
	}
	
	this.run = function() {
		setInterval(GameLoop, 60 / 1000);
	}
}