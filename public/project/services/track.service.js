/**
 * Created by macbook on 11/3/16.
 */
(function () {
    angular
        .module("MixtapeNetwork")
        .factory("TrackService", TrackService);

    function TrackService($http) {
        var api = {
            "searchTrackByTitle": searchTrackByTitle,
            "searchTrackBySID": searchTrackBySID
        };
        return api;

        function searchTrackByTitle(title) {
            var url = "https://api.spotify.com/v1/search?q="+title+"&type=track";
            return $http.get(url);
        }

        function searchTrackBySID(sID) {
            var url = "https://api.spotify.com/v1/tracks/" +sID;
            return $http.get(url);
        }

    }
})();