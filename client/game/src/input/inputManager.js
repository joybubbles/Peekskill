InputManager = function() {
	var sources = [];
	var newInputs = [];
	
	inputCallback = function(input) {
		newInputs.push(input);
	}
	
	this.addSource = function(newSource) {
		newSource.setHandler(inputCallback)
		sources.push(newSource);
	}
	
	this.getNewInputs = function() {
		var inputs = newInputs;
		newInputs = [];
		return inputs;
	}
}