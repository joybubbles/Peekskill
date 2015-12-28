Characters = new Meteor.Collection('characters');

if (Meteor.isServer) {
	Characters.remove({});
}

if (Meteor.isClient) {
	Session.get('currentCharacterId', 'default');

	Tracker.autorun(function () {
		var characters = Characters.find({ characterId: {$ne:Session.get('currentCharacterId')}});

		characters.forEach(function (characterData) {
			console.log('Updating ' + characterData.characterId);
			updateCharacterDestination(characterData);
		});
	});

	Template.game.onRendered(function () {
	var g = new Game();
	g.setUp();
	g.run();
	updateClient();
	g.render();
	});
}

function updateCharacterDestination(characterData) {
	var char = CharManager.getCharacter(characterData.characterId);
	char.Xpos = characterData.x;
	char.Ypos = characterData.y;
	CharManager.setCharacterDestination(characterData.characterId, characterData.targetX, characterData.targetY);
}

function updateClient() {
	var characters = Characters.find({ characterId: {$ne:Session.get('currentCharacterId')}});

	characters.forEach(function (characterData) {
		updateCharacterDestination(characterData);
	});
}