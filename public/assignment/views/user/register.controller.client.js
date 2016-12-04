(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(username, password) {

            console.log([username, password]);

            //TODO: check if username is already taken

            UserService
                .createUser(username, password)
                .success(function(user) {
                    $location.url("/user/" + user._id);
                    vm.user = user;
                    console.log(user);
                })
                .error(function(error) {

                });
        }
    }
})();