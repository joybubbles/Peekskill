GameServer = function () {
	var self = this;
	this.charManager = null;
	this.level = null;
	this.gameLogic = null;
			
	this.setup = function(charData, level) {
		this.charManager = new CharacterManager();
		this.charManager.buildFromDataSet(charData);
		this.level = level;
		this.gameLogic = new ServerGameLogic(this.charManager, this.level);
	}
	
	this.getCharacters = function() {
		return this.gameLogic.charManager.getCharacters();
	}
	
	var GameLoop = function() {
		self.gameLogic.update();
	}
	
	this.run = function() {
		setInterval(GameLoop, 1000 / 5);
	}
}