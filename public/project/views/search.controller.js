/**
 * Created by macbook on 11/3/16.
 */
(function () {
    angular
        .module("MixtapeNetwork")
        .controller("TrackSearchController", TrackSearchController);

    function TrackSearchController(TrackService, $routeParams, $location) {

        console.log("Hello from TrackSearchController");

        var vm = this;
        vm.searchTrackByTitle = searchTrackByTitle;
        vm.addTrack = addTrack;
        vm.title = $routeParams.title;
        vm.uid = $routeParams.uid;
        vm.pid = $routeParams.pid;

        console.log(vm.title);
        console.log(vm.uid);
        console.log(vm.pid);

        function init() {
            if (vm.title) {
                $location.url("/search/" + vm.title)
                searchTrackByTitle(vm.title);
            }
        }

        init();

        function searchTrackByTitle(title) {
            console.log(title);
            TrackService
                .searchTrackByTitle(title)
                .success(function (result) {
                    console.log(result);
                    vm.tracks = result.tracks.items;
                })
        }

        function addTrack(sTrack) {

            console.log(sTrack.name);
            console.log(sTrack.artists[0].name);
            console.log(sTrack.album.name);
            console.log(sTrack.duration_ms);
            console.log(sTrack.album.images[0].url);

            var track = {
                name: sTrack.name,
                artist: sTrack.artists[0].name,
                album: sTrack.album.name,
                duration: sTrack.duration_ms,
                album_image: sTrack.album.images[0].url
            };

            TrackService
                .createTrack(vm.pid, track)
                .success(function (result) {
                    console.log(result);
                    console.log("/user/"+vm.uid+"/playlist/"+vm.pid+"/track");
                    $location.url("/user/"+vm.uid+"/playlist/"+vm.pid+"/track");
                });
        }
    }


})();
