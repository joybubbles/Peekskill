/* TODO Add character to a container and move that instead */
CharacterGFXManager = function (mainContainer) {
	var spriteBuilder = new CharacterSpriteBuilder();
	this.mainContainer = mainContainer;
	this.charSprites = [];
	this.emotionalStateSprites = [];
	this.speechBubbles = [];
	var self = this;

	this.addSpeechBubble = function(characterId, message) {
		var character = CharManager.getCharacter(characterId);
		var rect = new createjs.Shape();
		var characterPosition = character.getPosition();
		rect.graphics.beginFill("#fff").drawRoundRect(10, 10, message.length * 10, 30, 3);

		var text = new createjs.Text(message, "16px Arial", "#000");
		text.x = 20;
		text.y = 30;
		text.textBaseline = "alphabetic";
		var textBox = new createjs.Container();
		textBox.addChild(rect);
		textBox.addChild(text);
		this.speechBubbles[characterId] = textBox;
        this.mainContainer.removeChild(this.speechBubbles[characterId]);
        var tileSize = 40;
        this.speechBubbles[characterId].x = (characterPosition.X * tileSize) + 75;
        this.speechBubbles[characterId].y = (characterPosition.Y * tileSize) - 25;
		this.mainContainer.addChild(this.speechBubbles[characterId]);
	};

	this.loadCharacterAnimations = function(stage) {
		var chars = CharManager.getCharacters();
		for(var char in chars) {
			this.charSprites[char] = spriteBuilder.build(char);
			stage.addChild(this.charSprites[char]);
		}
	}

	this.changeEmotionalState = function(characterId) {
		if (this.emotionalStateSprites[characterId]) {
			this.mainContainer.removeChild(this.emotionalStateSprites[characterId]);
		}

		var character = CharManager.getCharacter(characterId);
		console.log(character.getEmotionalState());
		this.emotionalStateSprites[characterId] = new createjs.Bitmap('/emotional-states/' + character.getEmotionalState() + '.png');
		this.emotionalStateSprites[characterId].setTransform(0, 0, 1.2, 1.2);
		this.updateEmotionalStateSprite(characterId, CharManager.getCharacterPosition(characterId), 40, 40);
		this.mainContainer.addChild(this.emotionalStateSprites[characterId]);
	}

	this.updateEmotionalStateSprite = function(characterId, characterPos, tileWidth, tileHeight) {
		if (this.emotionalStateSprites[characterId]) {
			this.emotionalStateSprites[characterId].x = (characterPos.X * tileWidth) + 31;
			this.emotionalStateSprites[characterId].y = (characterPos.Y * tileHeight) - 20;
		}
	}

	this.updateSpeechBubble = function(characterId, characterPos, tileWidth, tileHeight) {
		if (this.speechBubbles[characterId]) {
			this.speechBubbles[characterId].x = (characterPos.X * tileWidth) + 75;
			this.speechBubbles[characterId].y = (characterPos.Y * tileHeight) - 25;
		}
	}

	var characterWalk = function(characterSprite, currentPos ,tileWidth, tileHeight, characterId) {
		characterSprite.x = currentPos.X * tileWidth;
		characterSprite.y = currentPos.Y * tileHeight;
		characterSprite.framerate = 6;
		self.updateEmotionalStateSprite(characterId, currentPos, tileWidth, tileHeight);
		self.updateSpeechBubble(characterId, currentPos, tileWidth, tileHeight);
	}
	
	this.setCharacterAnimations = function(stage, tileWidth, tileHeight) {
		var chars = CharManager.getCharacters();
		for(var char in chars) {
			var currentState = chars[char].getState();
			var currentSprite = this.charSprites[char];
			if (currentSprite && currentSprite.currentAnimation != currentState) {
				currentSprite.gotoAndPlay(currentState);
			}

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
					characterWalk(currentSprite, CharManager.getCharacterPosition(char), tileWidth, tileHeight, char);
					break;
				case 'idle':
					currentSprite.framerate = 2;
					break;
			}
		}
	}
}