/**
 * Created by macbook on 10/17/16.
 */
(function() {
    angular
        .module("MixtapeNetwork")
        .controller("PlaylistNewController", PlaylistNewController);

    function PlaylistNewController($routeParams, PlaylistService, $location) {
        var vm = this;

        vm.uid = $routeParams['uid'];

        vm.createPlaylist = createPlaylist;

        function init() {
            PlaylistService
                .findPlaylistsForUser(vm.uid)
                .success(function(user){
                    vm.playlists = user.playlists;
                });

            console.log(vm.playlists);
        }

        init();

        function createPlaylist(playlist) {

            if (!playlist.name) {
                vm.error = "Name is required"
            }

            else {
                PlaylistService
                    .createPlaylist(vm.uid, playlist)
                    .success(function () {
                        $location.url("/user/"+vm.uid+"/playlist");
                    });
            }
        }
    }
})();
