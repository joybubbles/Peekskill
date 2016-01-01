Characters = new Meteor.Collection('characters');

if (Meteor.isServer) {
	Characters.remove({});
	var g = new Game();
	g.setUp();
	g.run();
}

if (Meteor.isClient) {
	Session.set('currentCharacterId', 'default');

	Template.game.onRendered(function () {
	var g = new Game();
		g.setUp();
		g.run();
		g.render();
	});
}