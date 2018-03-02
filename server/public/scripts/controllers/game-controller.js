const appController = app.controller('AppController', ['GameService', function (GameService) {
    let self = this;
    self.getGames = GameService.getGames;
    self.getGames();
    
    self.gamesArray = GameService.gamesArray;

    self.addVote = GameService.addVote;

    self.deleteGame = GameService.deleteGame;
    
    
}]);