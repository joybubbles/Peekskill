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

    this.speak = function(characterId, message) {
        var randomId = Math.random().toString(12) + (new Date()).getTime()
        Characters.update({
            characterId: characterId
        }, {
            $set: {characterId: characterId, message: { text: message, id:  randomId}}
        }, {
            upsert: true
        });
    };

    this.changeEmotionalStateForCharacter = function(characterId, state) {
        Characters.update({
            characterId: characterId
        }, {
            $set: {characterId: characterId, emotionalState: state}
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