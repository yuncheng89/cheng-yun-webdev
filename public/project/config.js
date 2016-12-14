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
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"

            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/admin", {
                templateUrl: "views/admin/user-list.view.client.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {
                    checkAdmin: checkAdmin
                }
            })
            .when("/user/:uid", { //For regular login
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })

            .when("/user/:uid/playlist", {
                templateUrl: "views/playlist/playlist-list.view.client.html",
                controller: "PlaylistListController",
                controllerAs: "model"
            })
            .when("/user/:uid/playlist/new", {
                templateUrl: "views/playlist/playlist-new.view.client.html",
                controller: "PlaylistNewController",
                controllerAs: "model"
            })
            .when("/user/:uid/playlist/:pid", {
                templateUrl: "views/playlist/playlist-edit.view.client.html",
                controller: "PlaylistEditController",
                controllerAs: "model"
            })
            .when("/user/:uid/playlist/:pid/track", {
                templateUrl: "views/track/track-list.view.client.html",
                controller: "TrackListController",
                controllerAs: "model"
            })
            .when("/user/:uid/playlist/:pid/track/new", {
                templateUrl: "views/search.view.html",
                controller: "TrackSearchController",
                controllerAs: "model"
            })
            .when("/user/:uid/playlist/:pid/track/:tid", {
                templateUrl: "views/track/track-edit.view.client.html",
                controller: "TrackEditController",
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


        function checkLogin($q, UserService, $location) {
            var deferred = $q.defer();
            UserService
                .checkLogin()
                .success(function(user) {
                    if (user != '0') {
                        deferred.resolve();
                    } else {
                        deferred.reject();
                        $location.url("/login"); //If you're not logged in, go back to login screen
                    }
                });
            return deferred.promise;
        }

        function checkAdmin($q, UserService, $location) {
            var deferred = $q.defer();
            UserService
                .checkLogin()
                .success(function(user) {
                    if (user != '0') {
                        deferred.resolve();
                    } else {
                        deferred.reject();
                        $location.url("/login"); //If you're not logged in, go back to login screen
                    }
                });
            return deferred.promise;
        }

    }
})();