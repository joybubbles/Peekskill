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

    function randomizeEmotionalState() {
        Characters.update({
            characterId: 'hannes'
        }, {
            $set: { emotionalState :  EmotionalStates.getRandom()}
        }, {
            upsert: true
        });

        Characters.update({
            characterId: 'cromnow'
        }, {
            $set: { emotionalState :  EmotionalStates.getRandom()}
        }, {
            upsert: true
        });
    }
};

communicator = new Communicator();