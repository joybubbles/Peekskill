
var Characters = new Meteor.Collection("characters");

if (Meteor.isClient) {
	Meteor.subscribe("characters");
	
	Template.game.onRendered(function () {
		var g = new GameClient();
    	g.setup();
		g.updateCharacterManager(Characters.find({}));

		Tracker.autorun(function () {
			var users = Characters.find({});
			g.updateCharacterManager(users);
		});
	});
}

if (Meteor.isServer) {
	
	var levelHandler = new LevelHandler(new OfficeMap());
	var ServerManager = new GameServer();
	
	Characters.remove({});
	Characters.insert({
		name: 'cromnow',
		speed: 4,
		Xpos: 0,
		Ypos: 0,
		Xtarget: 0,
		Ytarget: 0,
		path: []
	});
	
	ServerManager.setup(Characters.find({}), levelHandler);
    
	Meteor.publish("characters", function() {
        return Characters.find({});
    });
	
	Meteor.methods({
		/*only supports walking, maybe clients make the destinction*/
    	handlePlayerInput: function(name, x, y) {
			ServerManager.gameLogic.inputManager.addNewCharacterDestination(name, x, y);
		},
		updatePlayer: function(updateCharacter) {
			Characters.update(updateCharacter._id, { $set: updateCharacter.getMongoDTO() })
		}
	});
	
	ServerManager.run();
}
