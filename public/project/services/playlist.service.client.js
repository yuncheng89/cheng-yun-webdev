/**
 * Created by macbook on 12/11/16.
 */
(function(){
    angular
        .module("MixtapeNetwork")
        .factory("PlaylistService", PlaylistService);

    function PlaylistService($http) {


        var api = {
            findPlaylistsForUser: findPlaylistsForUser,
            findPlaylistById: findPlaylistById,
            createPlaylist: createPlaylist,
            updatePlaylist: updatePlaylist,
            deletePlaylist: deletePlaylist
        };
        return api;

        function createPlaylist(uid, playlist) {
            var url = "/projapi/user/"+uid+"/playlist";
            return $http.post(url, playlist);
        }

        function findPlaylistsForUser(uid) {
            var url = "/projapi/user/"+uid+"/playlist";
            return $http.get(url);
        }

        function findPlaylistById(playlistId) {
            var url = "/projapi/playlist/"+playlistId;
            return $http.get(url);
        }

        function updatePlaylist(playlist) {
            var url = "/projapi/playlist/"+playlist._id;
            return $http.put(url, playlist);
        }

        function deletePlaylist(playlistId) {
            var url = "/projapi/playlist/"+playlistId;
            return $http.delete(url);
        }

    }
})();