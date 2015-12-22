ClientGameLogic = function() {	
	var delta = 0;
	this.then = null;
	this.charManager = null;
	
	this.updateCharManager = function(charManager) {
		this.charManager = charManager;
	}
	
	this.setDelta = function() {
    	var now = Date.now();
		if (!this.then) {
			this.then = now;
		}
    	delta = (now - this.then) / 1000; // seconds since last frame
    	this.then = now;
  	};
	
	this.update = function() {
		if (this.charManager) {
			this.setDelta();
			this.charManager.update(delta);
		}
	};
};