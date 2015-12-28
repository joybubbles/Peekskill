CharacterManager = function() {
	var characters = [];

	this.createCharacter = function(name) {
		characters[name] = new Character(name);
	}
	
	this.setCharacterPath = function(name, path) {
		characters[name].setPath(path);
	}

	this.getCharacter = function(name) {
		return characters[name];
	}

	this.getCharacterPosition = function(name) {
		return characters[name].getPosition();
	}
	
	this.characterIsInPossition = function(X, Y) {
		for(var character in characters) {
			var position = this.getCharacterPosition(character);
			if (position.X == X && position.Y == Y) {
				return true;
			} else {
				return false;
			}
		}
	}

	this.setCharacterDestination = function(charName, X, Y) {
		var currentPos = this.getCharacterPosition(charName);
		this.findCharacterPath(currentPos.X, currentPos.Y, X, Y, charName);
		EasyAStar.calculate();
	};

	this.findCharacterPath = function(startX, startY, endX, endY, characterName) {
		var self = this;
		var name = characterName;
		EasyAStar.findPath(startX, startY, endX, endY, function(path) {
			self.setCharacterPath(name, path, true);
		});
	}

	this.getCharacters = function() {
		return characters;
	}
	
	this.update = function(delta) {
		for(var character in characters) {
			characters[character].update(delta);
		}
	}
}