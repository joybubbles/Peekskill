Sync = function() {
    this.lastTarget = [];

    this.updateCharacter = function(characterId, characterData) {
        this.setCharacterDestination(characterId, characterData);
    };

    this.setCharacterDestination = function(characterId, characterData) {
        if (this.targetIsUnchanged() || this.stopClientFromUpdatingThemselves(characterId)) {
                return false;
        }

        if (this.hasTarget(characterData)) {
            var character = CharManager.getCharacter(characterData.characterId);
            if (character) {
                if (Meteor.isClient) {
                    character.setPosition(characterData.x, characterData.y);
                }

                CharManager.setCharacterDestination(characterId, characterData.targetX, characterData.targetY);
            }
        }
    };

    this.targetIsUnchanged = function(characterId, characterData) {
        if (this.lastTarget[characterId]) {
            var oldTarget = this.lastTarget[characterId];
            if (oldTarget.x == characterData.targetX && oldTarget.y == characterData.targetY) {
                return true;
            }
        }
        return false;
    };

    this.stopClientFromUpdatingThemselves = function(characterId) {
        return Meteor.isClient && Session.get('currentCharacterId')==characterId;
    };

    this.hasTarget = function(characterData) {
        return characterData.targetX && characterData.targetY;
    };
};

Sync = new Sync();