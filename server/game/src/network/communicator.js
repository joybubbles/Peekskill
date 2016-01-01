Communicator = function() {
    var lastTarget = [];

    Meteor.methods({
        'updateCharacter': function(characterId, data) {
            data.characterId = characterId;
            Characters.update({
                characterId: characterId
            }, {
                $set: data
            }, {
                upsert: true
            });

            if (lastTarget[characterId]) {
                var oldTarget = lastTarget[characterId];
                if (oldTarget.x == data.targetX && oldTarget.y == data.targetY) {
                    return false;
                }
            }

            if (data.targetX && data.targetY) {
                CharManager.setCharacterDestination(characterId, data.targetX, data.targetY);
            }
        }
    });

    Meteor.publish('characters', function() {
        return Characters.find();
    });

    this.changeEmotionalState = function(state) {
        var chars = CharManager.getCharacters();
        for(var char in chars) {
            Characters.update({
                characterId: char
            }, {
                $set: {emotionalState: state}
            }, {
                upsert: true
            });
        }
    }
};

ServerCommunicator = new Communicator();