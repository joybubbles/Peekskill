Character = function(data) {
	this._id = data._id;
	this.name = data.name;
	this.speed = data.speed;
	
	this.Xpos = data.Xpos;
	this.Ypos = data.Ypos;
	this.Xtarget = data.Xtarget;
	this.Ytarget = data.Ytarget;
	this.Xfinal = data.Xfinal;
	this.Yfinal = data.Yfinal;
	
	this.path = data.path;
	
	this.setPath = function(path) {
		if (!path) {
			this.path = [];
			return;
		} else {
			console.log(path);
		}
		this.path = path;
		var newPos = this.path.shift(); //removes first since its current;
		newPos = this.path.shift();
		this.Xtarget = newPos.x;
		this.Ytarget = newPos.y;
		
		//final is used to sync with server. to reduse stuttering.
		this.Xfinal = this.path[(this.path.length - 1)].x;
		this.Yfinal = this.path[(this.path.length - 1)].y;
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
	
	this.updateFromData = function(data) {
		this.speed = data.speed;
		this.Xpos = data.Xpos;
		this.Ypos = data.Ypos;
		this.Xtarget = data.Xtarget;
		this.Ytarget = data.Ytarget;
		this.Xfinal = data.Xfinal;
		this.Yfinal = data.Yfinal;
		this.path = data.path;
	}
	
	this.getMongoDTO = function() {
		return 	{
			name: this.name,
			speed: this.speed,
			Xpos: this.Xpos,
			Ypox: this.Ypos,
			Xtarget: this.Xtarget,
			Ytarget: this.Ytarget,
			Xfinal: this.Xfinal,
			Yfinal: this.Yfinal,
			path: this.path
		};
	}
}