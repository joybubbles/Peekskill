Communicator = function(charGFXManager) {
    /* Store time of last update? */
    this.charGFXManager = charGFXManager;
    var self = this;
    Meteor.subscribe('characters');

    this.lastTarget = [];

    Tracker.autorun(function () {
        var characters = Characters.find();

        characters.forEach(function (characterData) {
            if (characterData.characterId) {
                self.updateCharacterDestination(characterData);
                self.updateClientEmotionalState(characterData);
            }
        });
    });

    this.updateCharacterDestination = function(characterData) {
        if (Session.get('currentCharacterId')==characterData.characterId) {
            return false;
        }

        var char = CharManager.getCharacter(characterData.characterId);

        if (characterData.targetX && characterData.targetY) {

            if (this.lastTarget[characterData.characterId]) {
                var oldTarget = this.lastTarget[characterData.characterId];
                if (oldTarget.x == characterData.targetX && oldTarget.y == characterData.targetY) {
                    return false;
                }
            }

            char.Xpos = characterData.x;
            char.Ypos = characterData.y;
            this.lastTarget[characterData.characterId] = {x:characterData.targetX, y:characterData.targetY};
            CharManager.setCharacterDestination(characterData.characterId, characterData.targetX, characterData.targetY);
        }
    }

    this.updateClient = function() {
        var characters = Characters.find();

        characters.forEach(function (characterData) {
            self.updateCharacterDestination(characterData);
            self.updateClientEmotionalState(characterData);
        });
    }

    this.updateClientEmotionalState = function(characterData) {
        if (characterData.emotionalState) {
            var char = CharManager.getCharacter(characterData.characterId);
            char.setEmotionalState(characterData.emotionalState);
            this.charGFXManager.changeEmotionalState(characterData.characterId);
        }
    }

    this.updateClient();
};