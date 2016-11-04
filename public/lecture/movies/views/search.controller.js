/**
 * Created by macbook on 11/3/16.
 */
(function() {
    angular
        .module("MovieApp")
        .controller("MovieSearchController", MovieSearchController);

    function MovieSearchController(MovieService, $routeParams, $location) {

        console.log("Hello from MovieSearchController");

        var vm = this;
        vm.searchMovieByTitle = searchMovieByTitle;
        vm.title = $routeParams.title;

        function init() {
            if (vm.title) {
                $location.url("/search/"+vm.title)
                searchMovieByTitle(vm.title);
            }
        }
        init();

        function searchMovieByTitle (title) {
            console.log(title);
            MovieService
                .searchMovieByTitle(title)
                .success(function(result) {
                    vm.movies = result.Search;
                })
        }
    }

})();
