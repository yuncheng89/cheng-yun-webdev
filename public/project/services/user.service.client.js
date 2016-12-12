(function(){
    angular
        .module("MixtapeNetwork")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findCurrentUser: findCurrentUser,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            unregisterUser: unregisterUser,
            login: login,
            logout: logout,
            checkLogin: checkLogin,
            checkAdmin: checkAdmin
        };
        return api;


        function logout() {
            return $http.post("/projapi/logout");
        }

        function checkLogin() {
            return $http.post("/projapi/checkLogin");
        }

        function checkAdmin() {
            return $http.post("/projapi/checkAdmin");
        }

        function login(username, password) {
            var user = {
                username: username,
                password: password
            };

            return $http.post("/projapi/login", user);
        }

        function createUser(username, password) {
            var user = {
                username: username,
                password: password
            };

            return $http.post("/projapi/user", user);
        }

        function findCurrentUser() {
            var url = "/projapi/user/";
            return $http.get(url);
        }

        function findUserById(userId) {
            var url = "/projapi/user/"+userId;
            return $http.get(url);

        }

        function findUserByUsername(username) {
            var url = '/projapi/user?username='+username;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = '/projapi/user?username='+username+'&password='+password;
            return $http.get(url);

        }

        function updateUser(user) {
            var url = "/projapi/user/" + user._id;
            return $http.put(url, user);
        }

        function unregisterUser(userId) {
            var url = "/projapi/user/" + userId;
            return $http.delete(url);
        }

    }
})();