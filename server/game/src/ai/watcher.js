Watcher = function() {
    this.playerInteraction = new PlayerInteraction();
    var self = this;

    this.watch = function() {
        var charactersCloseToEachOther = self.playerInteraction.getCharactersCloseToEachOther();
        if (Object.keys(charactersCloseToEachOther).length) {
            for(var characterId in charactersCloseToEachOther) {
                for(var otherCharacterKey in charactersCloseToEachOther[characterId]) {
                    var characterId = charactersCloseToEachOther[characterId][otherCharacterKey];
                    ServerCommunicator.changeEmotionalStateForCharacter(characterId, 'mlg');
                }
            }
        }
    };

    Meteor.setInterval(this.watch, 100);
}