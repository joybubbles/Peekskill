
var Characters = new Meteor.Collection("characters");

if (Meteor.isClient) {
	Template.game.onRendered(function () {
		var g = new GameClient();
    	g.setup();
		g.updateCharacterManager(Characters.find({}));
		
		Tracker.autorun(function () {
			var users = Characters.find({});
			g.updateCharacterManager(users);
		});
		
		g.run();
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
		Xfinal: 0,
		Yfinal: 0,
		path: []
	});
	
	ServerManager.setup(Characters.find({}), levelHandler);
    
	Meteor.methods({
		/*only supports walking, maybe clients make the destinction*/
    	handlePlayerInput: function(name, x, y) {
			ServerManager.gameLogic.inputManager.addNewCharacterDestination(name, x, y);
		},
		updatePlayer: function(updateCharacter) {
			Characters.update(updateCharacter._id, { $set: updateCharacter.getMongoDTO() })
		},
		getPlayerData: function() {
			//try json.stringify to send more or find out why the !#&"!&" meteor cant send arrays.
			return ServerManager.getCharacters()['cromnow'];
		}
	});
	
	ServerManager.run();
}
