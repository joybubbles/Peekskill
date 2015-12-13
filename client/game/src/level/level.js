LevelHandler = function(map) {
	this.map = map;
	
	this.getLayout = function() {
		return this.map.layout;
	}
	
	this.getXLength = function() {
		return this.map.xLength;
	};
	
	this.getYHeigth = function() {
		return this.map.yHeight;
	};
}