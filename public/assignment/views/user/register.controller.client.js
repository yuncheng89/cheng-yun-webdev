(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(username, password, verify) {

            if (!username || !password || !verify) {
                vm.error = "Fields cannot be left blank"
            }

            else if (password != verify) {
                vm.error = "Passwords must match"
            }

            else {

                console.log([username, password]);

                //Check if username is already taken, else register
                // UserService
                //     .findUserByUsername(username)
                //     .then(function (user) {
                //         if (user=='0') {
                            //Username not already taken - can register
                            UserService
                                .createUser(username, password)
                                .success(function (user) {
                                    $location.url("/user/" + user._id);
                                    vm.user = user;
                                    console.log(user);
                                })
                                .error(function (error) {
                                    vm.error = error;
                                });

                    //     } else {
                    //         vm.error = "Username already taken"
                    //     }
                    //
                    // }, function (error) {
                    //     vm.error = error;
                    //
                    // });

            }
        }
    }
})();