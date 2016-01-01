PlayerInteraction = function() {
    this.getCharactersCloseToEachOther = function() {
        var characters = CharManager.getCharacters();
        var charactersCloseToEachOther = {};
        for(var characterId in characters) {
            var charPosition = CharManager.getCharacterPosition(characterId);
            for(var otherCharacterId in characters) {
                if (characterId != otherCharacterId) {
                    var otherCharPosition = CharManager.getCharacterPosition(otherCharacterId);
                    if (charPosition.X == otherCharPosition.X && charPosition.Y == otherCharPosition.Y) {
                        if (charactersCloseToEachOther[characterId] === undefined) {
                            charactersCloseToEachOther[characterId] = [];
                        }

                        charactersCloseToEachOther[characterId].push(otherCharacterId);
                    }
                }
            }
        }

        return charactersCloseToEachOther;
    };

    this.speak = function() {

    }
};