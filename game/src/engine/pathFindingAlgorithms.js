PathFindingAlgorithms = function(level) {
    this.easyAstar = new EasyStarjs();
    this.easyAstar.setGrid(level.getLayout());
    this.easyAstar.setAcceptableTiles([0]);

    this.getEasyAstar = function() {
        return this.easyAstar;
    }
}