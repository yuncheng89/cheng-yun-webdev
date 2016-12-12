/**
 * Created by macbook on 12/11/16.
 */
(function () {
    angular
        .module("MixtapeNetwork")
        .controller("TrackListController", TrackListController);

    function TrackListController($routeParams,
                                  TrackService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.pid = $routeParams.pid;
        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;

        function init() {
            TrackService
                .findAllTracksForPlaylist(vm.pid)
                .success(function(playlist) {
                    vm.tracks = playlist.tracks.sort(sortByOrder); //Get tracks sorted by order

                });
        }
        init();


        function sortByOrder(a,b) {
            if (a.order < b.order)
                return -1;
            if (a.order > b.order)
                return 1;
            return 0;
        }
        

    }

})();