/**
 * Created by macbook on 10/3/16.
 */

angular
    .module('WebAppMaker', ['ngRoute'])
    .config(Config);



function Config($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'login.view.client.html'
        })
        .when('/register', {
            templateUrl: 'register.view.client.html'
        })

}