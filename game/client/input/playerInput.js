PlayerInput = function(name, canvas) {
	var characterName = name;
	this.handler = function(input) {};
	
	var handleClick = function(event) {
		console.log(event.stageX);
		console.log(event.stageY);
	};
	var handleMove = function() {
		console.log(characterName+' MOVED!');	
	};
	canvas.addEventListener('click', handleClick);
	canvas.addEventListener('onmousemove', handleMove);
	
	this.setHandler = function(callback) {
		this.handler = callback;
	}
}