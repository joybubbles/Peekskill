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

    this.changeEmotionalStateForAllCharacters = function(state) {
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