GameLogic = function(characterManager, level) {

	this.pathAlg = new EasyStarjs();
	this.pathAlg.setGrid(level.getLayout());
	this.pathAlg.setAcceptableTiles([0]);
	this.charManager = characterManager;
	this.inputManager = new InputManager();
	this.level = level;
	
	var delta = 0;
	this.then = null;
	
	this.setDelta = function() {
    	var now = Date.now();
		if (!this.then) {
			this.then = now;
		}
    	delta = (now - this.then) / 1000; // seconds since last frame
    	this.then = now;
  	}
	
	this.update = function() {
		this.setDelta();
		this.handleInputs();
		this.charManager.update(delta);
	}
	
	this.addInputSource = function(source) {
		this.inputManager.addSource(source);
	}
	
	
	
	
	/*
	 TODO: move to own handler
	*/
	this.handleInputs = function() {
		var inputs = this.inputManager.getNewInputs();
		for(var input in inputs) {
			var i = inputs[input];
			switch (i.type) {
				case 'walk':
					this.setCharacterDestination(i.name, i.x, i.y);
			}
		}
	}
	
	this.setCharacterDestination = function(charName, X, Y) {
		var currentPos = this.charManager.getCharacterPosition(charName);
		this.findCharacterPath(currentPos.X, currentPos.Y, X, Y, charName);
		this.pathAlg.calculate();
	}
	
	this.findCharacterPath = function(startX, startY, endX, endY, characterName) {
		var self = this;
		var name = characterName;
		this.pathAlg.findPath(startX, startY, endX, endY, function(path) {
			self.charManager.setCharacterPath(name, path);	
		});
	}	
}