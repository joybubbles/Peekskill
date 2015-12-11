Character = function(name) {
	this.name = name;
	this.speed = 0.7;
	this.Xpos = 1;
	this.Ypos = 1;
	this.Xtarget = 0;
	this.Ytarget = 0;
	
	this.path = [];
	
	this.setPath = function(path) {
		this.path = path;
		var newPos = this.path.shift(); //removes first since its current;
		newPos = this.path.shift();
		this.Xtarget = newPos.x;
		this.Ytarget = newPos.y;
	}
	
	this.getState = function() {
		if (this.Xtarget == this.Xpos && this.Ytarget == this.Ypos) {
			return 'idle';
		} else {
			return 'walk';
		}
	}
	
	this.update = function(delta) {
		this.updatePostion(delta);
	}
	
	this.updatePostion = function(delta) {
		var changeDirection = false;
		
		if (this.Xtarget > this.Xpos) {
			this.Xpos += this.speed * delta;
			changeDirection = (this.Xtarget <= this.Xpos);
		} else if (this.Xtarget < this.Xpos) {
			this.Xpos -= this.speed * delta;
			changeDirection = (this.Xtarget >= this.Xpos);
		} else 	if (this.Ytarget > this.Ypos) {
			this.Ypos += this.speed * delta;
			changeDirection = (this.Ytarget <= this.Ypos);
		} else if (this.Ytarget < this.Ypos) {
			this.Ypos -= this.speed * delta;
			changeDirection = (this.Ytarget >= this.Ypos);
		}
		
		if (changeDirection) {
			this.Xpos = this.Xtarget;
			this.Ypos = this.Ytarget;
			
			if (this.path.length) {
				var newPos = this.path.shift();
				this.Xtarget = newPos.x;
				this.Ytarget = newPos.y;
			}
		}
	}
	
	this.getPossition = function() {
		return {X: this.Xpos, Y: this.Ypos};
	}
}