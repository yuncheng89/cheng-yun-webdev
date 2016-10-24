(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(username, password) {

            var user = {username: username, password: password};
            UserService
                .createUser(user)
                .success(function(user) {
                    $location.url("/user/" + user._id);
                    vm.user = user;
                    console.log(user);
                })
                .error(function(error) {

                })
        }
    }
})();