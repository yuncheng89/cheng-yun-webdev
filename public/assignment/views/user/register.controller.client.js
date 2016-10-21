(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(username, password) {
            var id = Math.random() * 1000;
            while (UserService.findUserById(id)!=null) {
                id = Math.random() * 1000;;
            }

            var user = {_id: id, username: username, password: password};
            UserService.createUser(user);

            vm.user = user;
            console.log(user);

            $location.url("/user/" + user._id);
        }
    }
})();