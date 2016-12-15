/**
 * Created by macbook on 11/3/16.
 */
(function() {
    angular
        .module("MixtapeNetwork")
        .controller("TrackDetailsController", TrackDetailsController);

    function TrackDetailsController($routeParams, TrackService, $sce) {
        var vm = this;
        console.log("Hello from TrackDetailsController");
        var sID = $routeParams.sID;
        vm.playSound = playSound;
        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeAudioUrl = checkSafeAudioUrl;
        vm.getDuration = getDuration;

        function init() {
            TrackService
                .searchTrackBySID(sID)
                .success(function(response) {
                    vm.track = response;
                });
        }
        init();

        function playSound(url) {
            console.log("Play sound clicked");
            var a = new Audio(url);
            a.play();
        }

        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function checkSafeAudioUrl(url) {
            return $sce.trustAsResourceUrl(url);
        }

        function getDuration(ms) {
            var
                min = (ms/1000/60) << 0,
                sec = parseInt((ms/1000) % 60);

            return min + ':' + sec;
        }
    }

})();
