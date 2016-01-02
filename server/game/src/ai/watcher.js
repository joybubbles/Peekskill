Watcher = function() {
    this.playerInteraction = new PlayerInteraction();
    var self = this;

    this.watch = function() {
        var charactersCloseToEachOther = self.playerInteraction.getCharactersCloseToEachOther();
        if (Object.keys(charactersCloseToEachOther).length) {
            for(var characterId in charactersCloseToEachOther) {
                for(var otherCharacterKey in charactersCloseToEachOther[characterId]) {
                    var otherCharacterId = charactersCloseToEachOther[characterId][otherCharacterKey];
                    var message = 'Godmorgon ' + capitalizeFirstLetter(otherCharacterId) + '!';
                    ServerCommunicator.speak(characterId, message);
                }
            }
        }
    };

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    Meteor.setInterval(this.watch, 100);
}