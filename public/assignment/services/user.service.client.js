(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {_id: 123, username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: 234, username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: 345, username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: 456, username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        function createUser(user) {
            users.push(user);

            console.log(users);
        }

        function findUserById(userId) {
            for(var u in users) {
                user = users[u];
                if(user._id === userId) {
                    return user;
                }
            }

            console.log(user.username);

            return null;
        }

        function findUserByUsername(username) {
            for(var u in users) {
                user = users[u];
                if(user.username === username) {
                    return user;
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                user = users[u];
                if(    user.username === username
                    && user.password === password) {
                    return user;
                }
            }
            return null;
        }

        function updateUser(userId, user) {
            console.log(users);

            for(var u in users) {
                userToReplace = users[u];
                if(userToReplace._id === userId) {
                    var start_index = u;
                    var number_of_elements_to_remove = 1;
                    users.splice(start_index, number_of_elements_to_remove, user);
                }
            }

            console.log(users);
            return null;
        }

        function deleteUser(userId) {
            console.log(users);

            for(var u in users) {
                userToReplace = users[u];
                if(userToReplace._id === userId) {
                    var start_index = u;
                    var number_of_elements_to_remove = 1;
                    users.splice(start_index, number_of_elements_to_remove);
                }
            }

            console.log(users);
            return null;
        }

    }
})();