Camera = function(container, tileSize) {
    this.container = container;
    this.containerBounds = this.container.getBounds();
    this.containerWidth = this.containerBounds.width;
    this.containerHeight = this.containerBounds.height;
    this.tileSize = tileSize;
    this.characterToFollow = false;

    this.lookAt = function(x, y) {
        this.setPosition(x, y);
    };

    this.move = function(xOffset, yOffset) {
        this.container.x -= xOffset;
        this.container.y -= yOffset;
    };

    this.followCharacter = function(character) {
        this.characterToFollow = character;
    };

    this.setFixed = function() {
        this.characterToFollow = false;
    };

    this.setPosition = function(x, y) {
        this.container.x = -x;
        this.container.y = -y;
    };

    this.zoom = function(scale) {
        this.container.scaleX = scale;
        this.container.scaleY = scale;
        this.updateBounds();
    };

    this.updateBounds = function() {
        this.containerBounds = this.container.getBounds();
        this.containerWidth = this.containerBounds.width;
        this.containerHeight = this.containerBounds.height;
    };

    this.update = function() {
        if (this.characterToFollow) {
            var characterPosition = this.characterToFollow.getPosition();
            this.setPosition(
                characterPosition.X * this.tileSize - this.containerWidth / 2,
                characterPosition.Y * this.tileSize - this.containerHeight / 2
            );
        }
    }
};