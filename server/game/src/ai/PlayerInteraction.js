PlayerInteraction = function() {
    this.hasPlayersNearby = function() {
        var chars = CharManager.getCharacters();
        for(var char in chars) {
            var charPosition = CharManager.getCharacterPosition(char);
            var otherChars = CharManager.getCharacters();
            for(var otherChar in otherChars) {
                if (char != otherChar) {
                    var otherCharPosition = CharManager.getCharacterPosition(otherChar);

                    if (charPosition.X == otherCharPosition.X && charPosition.Y == otherCharPosition.Y) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    this.getPlayersNearby = function() {

    }

    this.speak = function() {

    }
}