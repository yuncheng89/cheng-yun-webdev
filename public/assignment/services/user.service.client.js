(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            unregisterUser: unregisterUser,
            login: login
        };
        return api;


        function login(username, password) {
            var user = {
                username: username,
                password: password
            };

            return $http.post("/api/login", user);
        }

        function createUser(username, password) {
            var user = {
                username: username,
                password: password
            };

            return $http.post("/api/user", user);
        }

        function findUserById(userId) {
            var url = "/api/user/"+userId;
            return $http.get(url);

        }

        function findUserByUsername(username) {
            var url = '/api/user?username='+username;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = '/api/user?username='+username+'&password='+password;
            return $http.get(url);

        }

        function updateUser(user) {
            var url = "/api/user/" + user._id;
            return $http.put(url, user);
        }

        function unregisterUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url);
        }

    }
})();