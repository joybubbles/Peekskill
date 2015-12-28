Character = function(name) {
	this.name = name;
	this.speed = 4.5;
	this.Xpos = 0;
	this.Ypos = 0;
	this.Xtarget = 0;
	this.Ytarget = 0;
	
	this.path = [];

	this.setPath = function(path, emit) {
        if (emit) {
            Meteor.call('updateCharacter', Session.get('currentCharacterId'), { path: path });
        }

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

	this.correctFacing = function() {
        if (this.getState() == 'walk') {
            if (this.Xtarget < this.Xpos) {
				return 'left';
            } else if (this.Xtarget > this.Xpos) {
				return 'right';
            }
        }

		return false;
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
	
	this.getPosition = function() {
		return {X: this.Xpos, Y: this.Ypos};
	}
}