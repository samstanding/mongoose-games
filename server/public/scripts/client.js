const app = angular.module('myApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider.when('/showGames', {
        templateUrl:'/views/showGames.html',
        controller:'AppController as ac'
    }).when('/sendGames', {
        templateUrl:'/views/sendGames.html',
        controller:'SendController as sc'
    }).otherwise({template: '<h1>404 Page Not Found</h1>'});
})





