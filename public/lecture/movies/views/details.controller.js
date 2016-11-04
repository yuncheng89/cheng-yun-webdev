/**
 * Created by macbook on 11/3/16.
 */
(function() {
    angular
        .module("MovieApp")
        .controller("MovieDetailsController", MovieDetailsController);

    function MovieDetailsController($routeParams, MovieService) {
        var vm = this;
        console.log("Hello from MovieDetailsController");
        var imdbID = $routeParams.imdbID;

        function init() {
            MovieService
                .searchMovieByImdbID(imdbID)
                .success(function(response) {
                    vm.movie = response;
                });
        }
        init();


    }

})();
