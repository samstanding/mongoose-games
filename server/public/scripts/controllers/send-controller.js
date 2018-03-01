const sendController = app.controller('SendController', ['GameService', function (GameService) {
    let self = this;
    console.log('you up?');
    
    self.newGame = GameService.newGame;
    console.log(self.newGame);
    

    self.sendGame = GameService.sendGame;

}]);