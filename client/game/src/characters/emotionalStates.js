EmotionalStates = function() {
    this.states = ['neutral', 'happy', 'love', 'mlg'];
    this.getRandom = function() {
        var randomIndex = Math.floor(Math.random() * (this.states.length - 1));
        return this.states[randomIndex];
    }
}