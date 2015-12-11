CharacterManager = function() {
	var characters = [];
	
	this.createCharacter = function(name) {
		characters[name] = new Character(name);
	}
	
	this.setCharacterPath = function(name, path) {
		characters[name].setPath(path);
	}
	
	this.getCharacterPosition = function(name) {
		return characters[name].getPossition();
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