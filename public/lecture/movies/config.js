/**
 * Created by macbook on 11/3/16.
 */
(function() {
    angular
        .module("MovieApp")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/search.view.html",
                controller: "MovieSearchController",
                controllerAs: "model"
            })
            .when("/search", {
                templateUrl: "views/search.view.html",
                controller: "MovieSearchController",
                controllerAs: "model"
            })
            .when("/search/:title", {
                templateUrl: "views/search.view.html",
                controller: "MovieSearchController",
                controllerAs: "model"
            })
            .when("/details/:imdbID/:title", {
                templateUrl: "views/details.view.html",
                controller: "MovieDetailsController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/"
            });;
    }
})();
