PlayerInput = function(name, canvas) {
	var tileWidth = 50;
	var tileHeight = 50;
	
	var characterName = name;
	var handler = function(input) {};
	
	var handleClick = function(event) {
		console.log(event);
		console.log(Math.floor(event.x / tileWidth));
		console.log(Math.floor(event.y / tileHeight));
		handler({
			name: characterName,
			x: Math.floor(event.x / tileWidth),
			y: Math.floor(event.y / tileHeight),
			type: 'walk'
		});
	};
	canvas.addEventListener('click', handleClick);
	
	this.setHandler = function(callback) {
		handler = callback;
	}
}