PlayerInput = function(name, canvas) {
	var characterName = name;
	var handler = function(input) {};
	
	var handleClick = function() {
		console.log(characterName+' CLICKED!');	
	};
	var handleMove = function() {
		console.log(characterName+' MOVED!');	
	};
	canvas.addEventListener('click', handleClick);
	canvas.addEventListener('onmousemove', handleMove);
	
	this.setHandler = function(callback) {
		handler = callback;
	}
}