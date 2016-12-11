(function(){
    angular
        .module("MixtapeNetwork")
        .controller("PlaylistListController", PlaylistListController);

    function PlaylistListController($routeParams, PlaylistService) {
        var vm = this;

        vm.uid = $routeParams['uid'];

        function init() {
            PlaylistService
                .findPlaylistsForUser(vm.uid)
                .success(function(user){ //Gets USER object in return
                    vm.playlists = user.playlists;
                });
        }
        init();
    }
})();