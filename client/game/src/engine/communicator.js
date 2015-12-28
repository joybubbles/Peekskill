Communicator = function() {
    Meteor.subscribe('characters');
};

communicator = new Communicator();