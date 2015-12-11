CharacterGFXManager = function (characterManager) {
	this.charManager = characterManager;
	this.charSprites = [];
	
	this.loadCharacterAnimations = function(stage) {
		var chars = this.charManager.getCharacters();
		for(var char in chars) {
			var data = {
				images: ["/characters/cromnow/sprites.png"],
				frames: {width:105, height:195},
				framerate: 6,
				animations: {
					walk:[12,14],
					idle:[0, 11]
				}
			};
        	var spriteSheet = new createjs.SpriteSheet(data);
        	christian = new createjs.Sprite(spriteSheet, "walk");
			this.charSprites[char] = christian;
        	stage.addChild(christian);
		}
	}
	
	this.setCharacterAnimations = function(tileWidth, tileHeight) {
		var chars = this.charManager.getCharacters();
		for(var char in chars) {
			var currentState = chars[char].getState();
			if (this.charSprites[char].currentAnimation != currentState) {
				this.charSprites[char].gotoAndPlay(currentState);
			}
			switch(currentState) {
				case 'walk':
					var currentPos = this.charManager.getCharacterPosition(char);
					this.charSprites[char].x = currentPos.X * tileWidth;
					this.charSprites[char].y = currentPos.Y * tileHeight;
					this.charSprites[char].framerate = 6;
					break;
				case 'idle':
					this.charSprites[char].framerate = 2;
					break;
			}
		}
	}
}