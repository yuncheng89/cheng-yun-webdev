(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, UserService) {
        var vm = this;

        var userId = $routeParams.uid;

        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        function init() {
            UserService
                .findUserById(userId)
                .success(function(user) {
                    if (user != '0') {
                        vm.user = user;
                    }
                })
                .error(function() {

                });
        }
        init();

        function updateUser() {
            UserService
                .updateUser(vm.user)
                .success(function() {

                });
        }

        function deleteUser() {
            UserService
                .deleteUser(vm.user._id)
                .success(function() {
                    $location.url("/login");
                })
                .error(function() {

                });
        }
    }
})();
