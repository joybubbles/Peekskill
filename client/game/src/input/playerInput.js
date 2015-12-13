PlayerInput = function(name, canvas) {
	var tileWidth = 100;
	var tileHeight = 100;
	
	var characterName = name;
	var handler = function(input) {};
	
	var handleClick = function(event) {
		console.log('X: '+Math.floor(event.x / tileWidth));
		console.log('Y: '+Math.floor(event.y / tileHeight));
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