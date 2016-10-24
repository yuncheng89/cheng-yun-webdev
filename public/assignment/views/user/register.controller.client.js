(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(username, password) {

            var user = {username: username, password: password};
            UserService.createUser(user);

            vm.user = user;
            console.log(user);

            $location.url("/user/" + user._id);
        }
    }
})();