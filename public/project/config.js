/**
 * Created by macbook on 12/10/16.
 */
(function() {
    angular
        .module("MixtapeNetwork")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/search.view.html",
                controller: "TrackSearchController",
                controllerAs: "model"
            })
            .when("/search", {
                templateUrl: "views/search.view.html",
                controller: "TrackSearchController",
                controllerAs: "model"
            })
            .when("/search/:title", {
                templateUrl: "views/search.view.html",
                controller: "TrackSearchController",
                controllerAs: "model"
            })
            .when("/details/:sID/:title", {
                templateUrl: "views/details.view.html",
                controller: "TrackDetailsController",
                controllerAs: "model"
            })

            .otherwise({
                redirectTo: "/"
            });

    }
})();