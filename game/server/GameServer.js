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
	
	var GameLoop = function() {
		self.gameLogic.update();
	}
	
	this.run = function() {
		setInterval(GameLoop, 60 / 1000);
	}
}