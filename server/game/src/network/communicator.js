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

            Sync.updateCharacter(characterId, data);
        }
    });

    Meteor.publish('characters', function() {
        return Characters.find();
    });

    this.changeEmotionalStateForCharacter = function(characterId, state) {
        Characters.update({
            characterId: characterId
        }, {
            $set: {emotionalState: state}
        }, {
            upsert: true
        });
    };

    this.changeEmotionalStateForAllCharacters = function(state) {
        var characters = CharManager.getCharacters();
        for(var characterId in characters) {
            this.changeEmotionalStateForCharacter(characterId, state);
        }
    }
};

ServerCommunicator = new Communicator();