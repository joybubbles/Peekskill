CharacterManager = function() {
	var characters = [];
	
	this.buildFromDataSet = function(dataSet) {
		var self = this;
		dataSet.forEach(function(character) {
			self.createCharacter(character);
		});
	}
	
	this.createCharacter = function(charData) {
		console.log(charData);
		characters[charData.name] = new Character(charData);
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
	
	this.getCharacters = function() {
		return characters;
	}
	
	this.update = function(delta) {
		for(var character in characters) {
			characters[character].update(delta);
		}
	}
}