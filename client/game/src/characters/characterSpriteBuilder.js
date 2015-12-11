CharacterSpriteBuilder = function() {
	this.build = function(name) {
		var data = {
			images: ["/characters/"+name+"/sprites.png"],
			frames: {width:105, height:195},
			framerate: 6,
			animations: {
				walk:[12,14],
				idle:[0, 11]
			}
		};
		var spriteSheet = new createjs.SpriteSheet(data);
		return new createjs.Sprite(spriteSheet, "idle");
	}
}