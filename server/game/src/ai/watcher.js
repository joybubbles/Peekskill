Watcher = function() {

    this.playerInteraction = new PlayerInteraction();
    var self = this;

    this.watch = function() {
        if (self.playerInteraction.hasPlayersNearby()) {
            console.log('So we meet again...');
        }
    };

    Meteor.setInterval(this.watch, 100);
}