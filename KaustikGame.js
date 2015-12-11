if (Meteor.isClient) {
	Template.game.onRendered(function () {
	var g = new Game();
	g.setUp();
	g.run();
	g.render();
	});
}

if (Meteor.isServer) {

}
