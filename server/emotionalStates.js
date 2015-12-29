EmotionalStates = function() {
    this.states = ['fire', 'mlg', 'idea', 'sad', 'codereview'];
    this.getRandom = function() {
        return this.states[this.randomIntFromInterval(0, this.states.length)];
    }

    this.randomIntFromInterval = function(min,max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
}

EmotionalStates = new EmotionalStates();