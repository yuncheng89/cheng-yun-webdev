/**
 * Created by macbook on 12/13/16.
 */
(function () {
    angular
        .module("MixtapeNetwork")
        .controller("TrackEditController", TrackEditController);

    function TrackEditController($routeParams, $location,
                                 TrackService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.pid = $routeParams.pid;
        vm.tid = $routeParams.tid;

        vm.deleteTrack  = deleteTrack;
        vm.updateTrack = updateTrack;
        vm.playSound = playSound;

        function init() {
            TrackService
                .findAllTracksForPlaylist(vm.pid)
                .success(function(playlist) {
                    vm.tracks = playlist.tracks.sort(sortByOrder); //Get tracks sorted by order

                });

            TrackService
                .findTrackById(vm.tid)
                .success(function (track) {
                    vm.track = track;
                });
        }
        init();

        function playSound(url) {
            console.log("Play sound clicked");
            var a = new Audio(url);
            a.play();
        }

        function deleteTrack() {
            console.log("Delete track "+vm.tid);
            TrackService
                .deleteTrack(vm.tid)
                .success(function() {
                    $location.url("/user/"+vm.uid+"/playlist/"+vm.pid+"/track/");
                });
        }

        function updateTrack() {

            if (!vm.track.name) {
                vm.error = "Name is required"
            }

            else {
                TrackService
                    .updateTrack(vm.track)
                    .success(function () {
                        $location.url("/user/"+vm.uid+"/playlist/"+vm.pid+"/track");
                    });
            }
        }
        
        function sortByOrder(a,b) {
            if (a.order < b.order)
                return -1;
            if (a.order > b.order)
                return 1;
            return 0;
        }


    }

})();