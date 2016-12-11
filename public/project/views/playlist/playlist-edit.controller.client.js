/**
 * Created by macbook on 10/17/16.
 */

(function() {
    angular
        .module("MixtapeNetwork")
        .controller("PlaylistEditController", PlaylistEditController);

    function PlaylistEditController($routeParams, $location, PlaylistService) {
        var vm = this;
        vm.uid = $routeParams['uid'];
        vm.wid = $routeParams['wid'];
        console.log("playlistId:", vm.wid);

        vm.deletePlaylist  = deletePlaylist;
        vm.updatePlaylist = updatePlaylist;

        function init() {

            PlaylistService
                .findPlaylistsForUser(vm.uid)
                .success(function(user){
                    vm.playlists = user.playlists;
                });

            PlaylistService
                .findPlaylistById(vm.wid)
                .success(function (playlist) {
                    vm.playlist = playlist;
                });
        }
        init();

        function deletePlaylist() {
            console.log("Delete playlist "+vm.wid);
            PlaylistService
                .deletePlaylist(vm.wid)
                .success(function() {
                    $location.url("/user/"+vm.uid+"/playlist");
                });
        }

        function updatePlaylist() {

            if (!vm.playlist.name) {
                vm.error = "Name is required"
            }

            else {
                PlaylistService
                    .updatePlaylist(vm.playlist)
                    .success(function () {
                        $location.url("/user/" + vm.uid + "/playlist");
                    });
            }
        }
    }

})();
