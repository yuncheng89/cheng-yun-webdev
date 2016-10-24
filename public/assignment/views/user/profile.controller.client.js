(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;

        vm.uid = parseInt($routeParams.uid);

        vm.user = UserService.findUserById(vm.uid);

        vm.updateUser = updateUser;

        if(user != null) {
            vm.user = user;
        }

        function updateUser(username, password, first, last) {

            var updated = {username: username, password: password, firstName: first, lastName: last};
            UserService.updateUser(vm.uid, updated);

            vm.user = user;
            console.log(user);

            $location.url("/user/" + user._id);

        }
    }
})();
