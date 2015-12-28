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

    /*
    function randomizeEmotionalState() {
        var charIds = CharManager.getCharacters();
        for(var charId in charIds) {
            Characters.update({
                characterId: charId
            }, {
                $set: { emotionalState :  CharacterManager.getCharacter(charId).getEmotionalState()}
            }, {
                upsert: true
            });
        }
    }
    */
};

communicator = new Communicator();