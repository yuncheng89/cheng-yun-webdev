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

            //Can't get .then statements to work serially
/*
            UserService
                .createUser(username, password)
                .then(
                    function (user) {
                        return UserService.login(user.username, user.password);
                    },
                    function (error) {
                        vm.error = error;
                    })
                .then(
                    function(user) {
                        console.log(user);
                        console.log("_id: ",user._id);
                        console.log("username: ", user.username);
                        if(user === '0') {
                            vm.error = "No such user";
                        } else {
                            $location.url("/user/" + user._id);
                        }
                    },
                    function (error) {
                        vm.error = error;
                    });
*/


            UserService
                .createUser(username, password)
                .success(function(user) {
                    var username = user.username;
                    var password = user.password;
                    var promise = UserService.login(username, password);
                    promise
                        .success(function(user) {
                            console.log(user);
                            console.log("_id: ",user._id);
                            console.log("username: ", user.username);
                            if(user === '0') {
                                vm.error = "No such user";
                            } else {
                                $location.url("/user/" + user._id);
                            }
                        })
                        .error(function(bbbb) {
                            console.log(bbbb);
                        });
                })
                .error(function(error) {

                });

        }
    }
})();