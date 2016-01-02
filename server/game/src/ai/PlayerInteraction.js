PlayerInteraction = function() {
    this.characterCacheJSON = null;
    this.characterRange = 1;

    this.getCharactersCloseToEachOther = function() {
        var characters = CharManager.getCharacters();
        var charactersCloseToEachOther = {};
        for(var characterId in characters) {
            var charPosition = CharManager.getCharacterPosition(characterId);
            for(var otherCharacterId in characters) {
                if (characterId != otherCharacterId) {
                    var otherCharPosition = CharManager.getCharacterPosition(otherCharacterId);
                    if (this.characterIsCloseBy(charPosition, otherCharPosition)) {
                        if (charactersCloseToEachOther[characterId] === undefined) {
                            charactersCloseToEachOther[characterId] = [];
                        }

                        charactersCloseToEachOther[characterId].push(otherCharacterId);
                    }
                }
            }
        }

        var characterCacheJSON = JSON.stringify(charactersCloseToEachOther);
        if (characterCacheJSON === this.characterCacheJSON) {
            return {};
        }

        this.characterCacheJSON = characterCacheJSON;
        return charactersCloseToEachOther;
    };

    this.characterIsCloseBy = function(charPosition, otherCharPosition) {
        return charPosition.X + this.characterRange >= otherCharPosition.X &&
            charPosition.X - this.characterRange <= otherCharPosition.X &&
            charPosition.Y + this.characterRange >= otherCharPosition.Y &&
            charPosition.Y - this.characterRange <= otherCharPosition.Y;
    }
};