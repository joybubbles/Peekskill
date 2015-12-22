InputManager = function() {
	var sources = [];
	var newInputs = [];
	
	this.addNewCharacterDestination = function(charName, X, Y) {
		newInputs.push({
			charName: charName,
			type: 'walk',
			x: X,
			y: Y
		});
	}
	
	this.getNewInputs = function() {
		var inputs = newInputs;
		newInputs = [];
		return inputs;
	}
}