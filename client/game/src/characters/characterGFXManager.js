CharacterGFXManager = function (characterManager) {
	var spriteBuilder = new CharacterSpriteBuilder();
	this.charManager = characterManager;
	this.charSprites = [];
	this.emotionalStateSprites = [];
	var self = this;

	this.loadCharacterAnimations = function(stage) {
		var chars = this.charManager.getCharacters();
		for(var char in chars) {
			this.charSprites[char] = spriteBuilder.build(char);
			stage.addChild(this.charSprites[char]);
		}
	}

	this.updateEmotionalStateSprite = function(characterId, characterPos, tileWidth, tileHeight) {
		this.emotionalStateSprites[characterId].x = (characterPos.X * tileWidth) + 30;
		this.emotionalStateSprites[characterId].y = (characterPos.Y * tileHeight) - 30;
	}

	var characterWalk = function(characterSprite, currentPos ,tileWidth, tileHeight, characterId) {
		characterSprite.x = currentPos.X * tileWidth;
		characterSprite.y = currentPos.Y * tileHeight;
		characterSprite.framerate = 6;
		self.updateEmotionalStateSprite(characterId, currentPos, tileWidth, tileHeight);
	}

	this.createEmotionalStateSprite = function(stage, characterId, tileWidth, tileHeight) {
		if (!this.emotionalStateSprites[characterId]) {
			var character = CharManager.getCharacter(characterId);
			this.emotionalStateSprites[characterId] = new createjs.Bitmap('/emotional-states/' + character.getEmotionalState() + '.png');
			this.emotionalStateSprites[characterId].setTransform(0, 0, 0.1, 0.1);
			this.updateEmotionalStateSprite(characterId, CharManager.getCharacterPosition(characterId), tileWidth, tileHeight);
			stage.addChild(this.emotionalStateSprites[characterId]);
		}
	}
	
	this.setCharacterAnimations = function(stage, tileWidth, tileHeight) {
		var chars = this.charManager.getCharacters();
		for(var char in chars) {
			var currentState = chars[char].getState();
			var currentSprite = this.charSprites[char];
			if (currentSprite && currentSprite.currentAnimation != currentState) {
				currentSprite.gotoAndPlay(currentState);
			}

			this.createEmotionalStateSprite(stage, char, tileWidth, tileHeight);

			var correctFacing = chars[char].correctFacing();
			switch(correctFacing) {
				case 'left':
					currentSprite.scaleX = -1;
					var spriteBounds = currentSprite.getBounds();
					currentSprite.regX = spriteBounds.width;
					break;
				case 'right':
					currentSprite.scaleX = 1;
					currentSprite.regX = 0;
					break;
			}

			switch(currentState) {
				case 'walk':
					characterWalk(currentSprite, this.charManager.getCharacterPosition(char), tileWidth, tileHeight, char);
					break;
				case 'idle':
					currentSprite.framerate = 2;
					break;
			}
		}
	}
}