/**
 * Created by macbook on 10/24/16.
 */
module.exports = function(app) {
    console.log("Hello from user services");

    var users = [
        {_id: 123, username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: 234, username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: 345, username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: 456, username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.get('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);

    function createUser(req, res) {
        var user = req.body;
        user._id = (new Date()).getTime();
        users.push(user);
        res.send(user);
    }

    function findUser(req, res) {
        var params = req.params;
        var query = req.query;
        console.log(params);
        console.log(query);

        if (query.password && query.username) {
            findUserByCredentials(req, res);
        } else if (query.username) {
            findUserByUsername(req, res);
        }

        //res.send(users);
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

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        for (var u in users) {

            if (users[u].username === username &&
                users[u].password === password) {

                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }


    function findUserById(req, res) {
        var userId = parseInt(req.params.uid);
        for (var u in users) {
            if (users[u].username === userId) {
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }

};
