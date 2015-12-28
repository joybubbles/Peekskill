GameClient = function() {
	var self = this;
	this.gameLogic = new ClientGameLogic();
	this.characterManager = new CharacterManager();
	this.gfx = null;
	
	/*temp bullshit*/
	this.charId = null;
	
	var internalBullshit = 0;
	var GameLoop = function() {
		self.gameLogic.update();
		if (internalBullshit > 100) {
			Meteor.call('getPlayerData', function(error, returnData) {
				var c = self.characterManager.getCharacter('cromnow');
				if (c) {
					console.log('X: '+returnData.Xfinal+' Y: '+returnData.Yfinal);
					console.log('X: '+c.Xfinal+' Y: '+c.Yfinal);
					if (c.Xfinal !== returnData.Xfinal || c.Yfinal !== returnData.Yfinal) {
						//if new final destination then sync.
						self.characterManager.updateCharacter('cromnow', returnData);
					}
				}
			});
			internalBullshit = 0;
		}
		internalBullshit++;
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