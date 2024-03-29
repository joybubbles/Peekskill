GameLogic = function(characterManager, level, gfx) {

	this.pathAlg = new EasyStarjs();
	this.pathAlg.setGrid(level.getLayout());
	this.pathAlg.setAcceptableTiles([0]);
	this.charManager = characterManager;
	this.inputManager = new InputManager();
	this.level = level;
    this.gfx = gfx;
	
	var delta = 0;
	this.then = null;
	
	this.setDelta = function() {
    	var now = Date.now();
		if (!this.then) {
			this.then = now;
		}
    	delta = (now - this.then) / 1000; // seconds since last frame
    	this.then = now;
  	};
	
	this.update = function() {
		this.setDelta();
		this.handleInputs();
		this.gfx.updateCamera();
		this.charManager.update(delta);
	};

	this.addInputSource = function(source) {
		this.inputManager.addSource(source);
	};
	
	/*
	 TODO: move to own handler
	*/
	this.handleInputs = function() {
		var inputs = this.inputManager.getNewInputs();
		for(var input in inputs) {
			switch (input.type) {
				case 'walk':
					this.setCharacterDestination(input.charName, input.x, input.y);
			}
		}
	};
	
	this.setCharacterDestination = function(charName, X, Y) {
		var currentPos = this.charManager.getCharacterPosition(charName);
		this.findCharacterPath(currentPos.X, currentPos.Y, X, Y, charName);
		this.pathAlg.calculate();
	};
	
	this.findCharacterPath = function(startX, startY, endX, endY, characterName) {
		var self = this;
		var name = characterName;
		this.pathAlg.findPath(startX, startY, endX, endY, function(path) {
			self.charManager.setCharacterPath(name, path);	
		});
	}	
};