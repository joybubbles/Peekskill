Characters = new Meteor.Collection('characters');

if (Meteor.isServer) {
	Characters.remove({});
}

if (Meteor.isClient) {
	Session.get('currentCharacterId', 'default');

	Tracker.autorun(function () {
		var characters = Characters.find({ characterId: {$ne:Session.get('currentCharacterId')}});

		characters.forEach(function (characterData) {
			CharManager.setCharacterPath(characterData.characterId, characterData.path, false);
		});
	});

	Template.game.onRendered(function () {
	var g = new Game();
	g.setUp();
	g.run();
	g.render();
	});
}