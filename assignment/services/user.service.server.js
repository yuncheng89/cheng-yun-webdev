/**
 * Created by macbook on 10/24/16.
 */
module.exports = function(app) {
    console.log("Hello from user services on server");

    var users = [
        {_id: 123, username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: 234, username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: 345, username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: 456, username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);

    function createUser(req, res) {
        var user = req.body;
        user._id = (new Date()).getTime();
        console.log("Create new user: ", user._id);
        users.push(user);
        res.send(user);
    }

    function findUser(req, res) {
        var params = req.params; //part of path, e.g. uid
        var query = req.query; //part of query, e.g. ?username=alice

        if (query.password && query.username) {
            findUserByCredentials(req, res);
        } else if (query.username) {
            findUserByUsername(req, res);
        }

    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        for (var u in users) {

            console.log("users[u].username: ", users[u].username);
            console.log("users[u].password: ", users[u].password);

            if (users[u].username === username &&
                users[u].password === password) {

                console.log("found user by credentials: ", users[u]);

                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        for (var u in users) {
            if (users[u].username === username) {
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }


    function findUserById(req, res) {
        var userId = parseInt(req.params.uid);
        for (var u in users) {
            if (users[u]._id == userId) {
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }


    function updateUser(req, res) {
        var user = req.body; //Get from payload
        var uid = req.params.uid;
        for(var u in users) {
            if(users[u]._id == uid) {
                users[u] = user;
            }
        }
        res.send(200);
    }

    function deleteUser(req, res) {
        var uid = req.params.uid;
        for(var u in users) {
            if(users[u]._id == uid) {
                users.splice(u, 1);
            }
        }
        res.send(200);
    }

};
