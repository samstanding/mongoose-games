const appController = app.controller('AppController', ['GameService', function (GameService) {
    let self = this;
    self.getGames = GameService.getGames;
    self.getGames();
    
    console.log(GameService.list);
    
    self.gamesArray = GameService.gamesArray;
    console.log(self.gamesArray);
    
}]);