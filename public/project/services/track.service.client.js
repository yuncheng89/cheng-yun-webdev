/**
 * Created by macbook on 11/3/16.
 */
(function () {
    angular
        .module("MixtapeNetwork")
        .factory("TrackService", TrackService);

    function TrackService($http) {
        var api = {
            searchTrackByTitle: searchTrackByTitle,
            searchTrackBySID: searchTrackBySID,
            createTrack: createTrack,
            findAllTracksForPlaylist: findAllTracksForPlaylist,
            findTrackById: findTrackById,
            updateTrack: updateTrack,
            deleteTrack: deleteTrack,
            sort: sort
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


        function createTrack(playlistId, newTrack) {
            var url = "/projapi/playlist/"+playlistId+"/track";
            return $http.post(url, newTrack);
        }

        function findAllTracksForPlaylist(playlistId) {
            var url = "/projapi/playlist/"+playlistId+"/track";
            return $http.get(url);
        }

        function findTrackById(trackId) {
            var url = "/projapi/track/"+trackId;
            return $http.get(url);
        }

        function updateTrack(track) {
            var url = "/projapi/track/"+track._id;
            return $http.put(url, track);
        }

        function deleteTrack(trackId) {
            var url = "/projapi/track/"+trackId;
            return $http.delete(url);
        }
        function sort(playlistId, start, end) {
            var url = "/projapi/playlist/"+playlistId+"/track?initial=index1&final=index2";
            url = url
                .replace("index1", start)
                .replace("index2", end);
            return $http.put(url);
        }
    }
})();