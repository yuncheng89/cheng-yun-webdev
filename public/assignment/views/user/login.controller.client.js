(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(username, password) {
            var promise = UserService.findUserByCredentials(username, password);
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


        }
    }
})();