GameClient = function() {
	var self = this;
	this.gameLogic = new ClientGameLogic();
	this.characterManager = new CharacterManager();
	this.gfx = null;
	
	/*temp bullshit*/
	this.charId = null;
	
	var GameLoop = function() {
		self.gameLogic.update();
	}
	
	var movementCallback = function(X, Y) {
		Meteor.call('handlePlayerInput', 'cromnow', X, Y );
	}
	
	this.setup = function() {
		this.gfx = new Gfx(movementCallback);
		/* Since only one level exists atm we load that shit like this. */
		this.gfx.setup(new LevelHandler(new OfficeMap()), this.characterManager);
	}
	
	this.updateCharacterManager = function(characterData) {
		this.characterManager.buildFromDataSet(characterData);
		this.gameLogic.updateCharManager(this.characterManager);
		this.gfx.updateCharacterSprites();
	}
	
	this.run = function() {
		setInterval(GameLoop, 60 / 1000);
	}
}