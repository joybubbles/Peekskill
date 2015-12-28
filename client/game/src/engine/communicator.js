Communicator = function() {
    Meteor.subscribe('characters');

    Tracker.autorun(function () {
        var characters = Characters.find({ characterId: {$ne:Session.get('currentCharacterId')}});

        characters.forEach(function (characterData) {
            console.log('Updating ' + characterData.characterId);
            updateCharacterDestination(characterData);
        });
    });

    function updateCharacterDestination(characterData) {
        var char = CharManager.getCharacter(characterData.characterId);
        char.Xpos = characterData.x;
        char.Ypos = characterData.y;
        CharManager.setCharacterDestination(characterData.characterId, characterData.targetX, characterData.targetY);
    }

    function updateClient() {
        var characters = Characters.find({ characterId: {$ne:Session.get('currentCharacterId')}});

        characters.forEach(function (characterData) {
            updateCharacterDestination(characterData);
        });
    }

    updateClient();
};