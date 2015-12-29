Communicator = function() {
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

    Meteor.setInterval(randomizeEmotionalState, 3000);
};

communicator = new Communicator();