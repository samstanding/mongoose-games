const sendController = app.controller('SendController', ['GameService', function (GameService) {
    let self = this;
    
    self.newGame = GameService.newGame;
    
    self.sendGame = GameService.sendGame;


}]);