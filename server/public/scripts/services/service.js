app.service('GameService', ['$http', function ($http) {
    let self = this;
    console.log('in service');
    
    self.gamesArray = {list: []};
    self.newGame = {};

    self.getGames = function () {
        $http({
            method:'GET',
            url:'/games'
        }).then(function (response) {
            console.log( response.data );
            self.gamesArray.list = response.data;
        }).catch(function (error) {
            console.log('error on get: ', error );
        })
    }

    self.sendGame = function (newGame) {
        console.log(newGame);
        $http({
            method: 'POST',
            url:'/games',
            data: newGame
        }).then(function (response) {
            self.getGames();
            console.log('sent new games');
        }).catch(function (error) {
            console.log('error on post: ', error);
        })
    }
}])