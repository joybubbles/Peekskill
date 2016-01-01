Watcher = function() {

    this.playerInteraction = new PlayerInteraction();
    var self = this;

    this.watch = function() {
        if (self.playerInteraction.hasPlayersNearby()) {
            ServerCommunicator.changeEmotionalState('mlg');
        }
    };

    Meteor.setInterval(this.watch, 100);
}