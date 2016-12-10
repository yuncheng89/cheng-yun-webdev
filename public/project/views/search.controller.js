/**
 * Created by macbook on 11/3/16.
 */
(function() {
    angular
        .module("MixtapeNetwork")
        .controller("TrackSearchController", TrackSearchController);

    function TrackSearchController(TrackService, $routeParams, $location) {

        console.log("Hello from TrackSearchController");

        var vm = this;
        vm.searchTrackByTitle = searchTrackByTitle;
        vm.title = $routeParams.title;

        function init() {
            if (vm.title) {
                $location.url("/search/"+vm.title)
                searchTrackByTitle(vm.title);
            }
        }
        init();

        function searchTrackByTitle (title) {
            console.log(title);
            TrackService
                .searchTrackByTitle(title)
                .success(function(result) {
                    console.log(result);
                    vm.tracks = result.tracks.items;
                })
        }
    }

})();
