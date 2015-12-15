PlayerInput = function(name, canvas) {
	var tileWidth = 100;
	var tileHeight = 100;
	
	var characterName = name;
	var handler = function(input) {};
	
	this.handleClick = function(event) {
		console.log(event);
		console.log('X: '+Math.floor(event.rawX / tileWidth));
		console.log('Y: '+Math.floor(event.rawY / tileHeight));
		handler({
			name: characterName,
			x: Math.floor(event.rawX / tileWidth),
			y: Math.floor(event.rawY / tileHeight),
			type: 'walk'
		});
	};
	
	this.setHandler = function(callback) {
		handler = callback;
	}
}