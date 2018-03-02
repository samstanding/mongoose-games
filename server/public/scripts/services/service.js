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

    self.addVote = function (voteCount, id) {
        let vote = voteCount + 1;
        $http({
            method:'PUT',
            url: `/games/${id}`,
            data: {voteCount: vote}
        }).then(function (response) {
            console.log('sent vote to db');
            self.getGames();
        }).catch(function (error) {
            console.log('error on vote: ', error);
        })
    }

    self.deleteGame = function (id) {
        $http({
            method: 'DELETE', 
            url:`/games/${id}`,
        }).then(function (response) {
            console.log('sent vote to db');
            self.getGames();
        }).catch(function (error) {
            console.log('error on vote: ', error);
        })
    }
}])