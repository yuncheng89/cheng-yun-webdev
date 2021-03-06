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
        vm.playSound = playSound;

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

        function playSound(url) {
            console.log("Play sound clicked");
            var a = new Audio(url);
            a.play();
        }

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

            //If not logged in, go log in!
            if (!vm.uid) {
                $location.url("/login");
            }

            else {
                console.log(sTrack.id);
                console.log(sTrack.name);
                console.log(sTrack.artists[0].name);
                console.log(sTrack.album.name);
                console.log(sTrack.duration_ms);
                console.log(sTrack.album.images[0].url);

                var track = {
                    sID: sTrack.id,
                    name: sTrack.name,
                    artist: sTrack.artists[0].name,
                    album: sTrack.album.name,
                    album_image: sTrack.album.images[0].url,
                    duration: sTrack.duration_ms,
                    preview_url: sTrack.preview_url
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
    }


})();
