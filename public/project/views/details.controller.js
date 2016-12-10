/**
 * Created by macbook on 11/3/16.
 */
(function() {
    angular
        .module("MixtapeNetwork")
        .controller("TrackDetailsController", TrackDetailsController);

    function TrackDetailsController($routeParams, TrackService) {
        var vm = this;
        console.log("Hello from TrackDetailsController");
        var sID = $routeParams.sID;

        function init() {
            TrackService
                .searchTrackBySID(sID)
                .success(function(response) {
                    vm.track = response;
                });
        }
        init();


    }

})();
