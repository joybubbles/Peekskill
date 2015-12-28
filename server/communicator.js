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
};

communicator = new Communicator();