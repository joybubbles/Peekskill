/*
 *
 * TODO Store time of last update?
 *
 */
Communicator = function(charGFXManager) {
    this.charGFXManager = charGFXManager;
    var self = this;
    this.lastMessage = [];

    Meteor.subscribe('characters');
    Tracker.autorun(function () {
        var characters = Characters.find();

        characters.forEach(function (characterData) {
            if (characterData.characterId) {
                Sync.updateCharacter(characterData.characterId, characterData);
                self.updateClientEmotionalState(characterData);
                self.updateTextBubbles(characterData);
            }
        });
    });

    this.updateTextBubbles = function(characterData) {
        var characterId = characterData.characterId;
        if (characterData.message) {
            var messageId = characterData.message.id;
            if (this.lastMessage[characterId] === undefined && this.lastMessage[characterId] != messageId) {
                this.lastMessage[characterId] = messageId;
                this.charGFXManager.addSpeechBubble(characterId, characterData.message.text);
            }
        }
    };

    this.updateClient = function() {
        var characters = Characters.find();

        characters.forEach(function (characterData) {
            Sync.updateCharacter(characterData);
            self.updateClientEmotionalState(characterData);
            self.updateTextBubbles(characterData);
        });
    };

    this.updateClientEmotionalState = function(characterData) {
        if (characterData.emotionalState) {
            var char = CharManager.getCharacter(characterData.characterId);
            char.setEmotionalState(characterData.emotionalState);
            this.charGFXManager.changeEmotionalState(characterData.characterId);
        }
    }

    this.updateClient();
};