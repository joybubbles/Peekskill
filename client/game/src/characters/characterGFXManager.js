CharacterGFXManager = function (characterManager) {
	var spriteBuilder = new CharacterSpriteBuilder();
	this.charManager = characterManager;
	this.charSprites = [];
	
	this.loadCharacterAnimations = function(stage) {
		var chars = this.charManager.getCharacters();
		for(var char in chars) {
			this.charSprites[char] = spriteBuilder.build(char);
        	stage.addChild(this.charSprites[char]);
		}
	}
	
	var characterWalk = function(characterSprite, currentPos ,tileWidth, tileHeight) {
		characterSprite.x = currentPos.X * tileWidth;
		characterSprite.y = currentPos.Y * tileHeight - tileHeight;
		characterSprite.framerate = 6;
	}
	
	this.setCharacterAnimations = function(tileWidth, tileHeight) {
		var chars = this.charManager.getCharacters();
		for(var char in chars) {
			var currentState = chars[char].getState();
			var currentSprite = this.charSprites[char];
			if (currentSprite && currentSprite.currentAnimation != currentState) {
				currentSprite.gotoAndPlay(currentState);
			}
			switch(currentState) {
				case 'walk':
					characterWalk(currentSprite, this.charManager.getCharacterPosition(char), tileWidth, tileHeight)
					break;
				case 'idle':
					currentSprite.framerate = 2;
					break;
			}
		}
	}
}