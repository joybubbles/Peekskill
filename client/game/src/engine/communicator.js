Communicator = function(charGFXManager) {
    /* Store time of last update? */
    this.charGFXManager = charGFXManager;
    var self = this;
    Meteor.subscribe('characters');

    Tracker.autorun(function () {
        var characters = Characters.find({ characterId: {$ne:Session.get('currentCharacterId')}});

        characters.forEach(function (characterData) {
            if (characterData.characterId) {
                self.updateCharacterDestination(characterData);
                self.updateClientEmotionalState(characterData);
            }
        });
    });

    this.updateCharacterDestination = function(characterData) {
        var char = CharManager.getCharacter(characterData.characterId);

        console.log(characterData.characterId + ' - ' + char.Xtarget + ' - ' + characterData.targetX)

        if (characterData.targetX && characterData.targetY && (char.Xtarget != characterData.targetX || char.Ytarget != characterData.targetY)) {
            char.Xpos = characterData.x;
            char.Ypos = characterData.y;
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