module.exports = function(app, model, sec) {

    console.log("Hello from PROJECT user services on server");

    var bcrypt = sec.getBCrypt();
    var passport = sec.getPassport();

    app.post('/projapi/login', passport.authenticate('mn'), login);
    app.post('/projapi/logout', logout);
    app.post('/projapi/checkLogin', checkLogin);
    app.post('/projapi/checkAdmin', checkAdmin);

    app.post('/projapi/user', createUser);
    //app.get('/projapi/admin/user', loggedInAsAdmin, findAllUser);
    app.get('/projapi/user', findUser);
    app.get('/projapi/user/:uid', findUserById);
    app.put('/projapi/user/:uid', loggedInAndSelf, updateUser); //Only the currently logged in person can change their own info
    app.delete('/projapi/user/:uid', loggedInAndSelf, unregisterUser);



    function loggedInAndSelf(req, res, next) {
        var loggedIn = req.isAuthenticated(); //from passport
        var userId = req.params.uid;
        var self = userId == req.user._id;
        if (self && loggedIn) {
            next();
        } else {
            res.sendStatus(400).send("You are not the same person");
        }

    }


    function logout(req, res) {
        req.logout(); //passport api function
        res.sendStatus(200);
    }

    function checkAdmin(req, res) {
        var loggedIn = req.isAuthenticated();
        var isAdmin = req.user.role == "ADMIN";

        if (loggedIn && isAdmin) {
            res.json(req.user);
        } else {
            res.send('0');
        }

    }


    function checkLogin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }


    function login (req, res) {
        var user3 = req.user;
        res.json(user3);
    }


    function unregisterUser(req, res) {
        var uid = req.params.uid;
        model
            .userModel
            .removeuser(uid)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
        // for(var u in users) {
        //     if(users[u]._id == uid) {
        //         users.splice(u, 1);
        //     }
        // }
        // res.send(200);
    }

    function updateUser(req, res) {
        var user = req.body;
        var uid = req.params.uid;
        model
            .userModel
            .updateUser(uid, user)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
        // for(var u in users) {
        //     if(users[u]._id == uid) {
        //         users[u] = user;
        //     }
        // }
        // res.send(200);
    }

    function createUser(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);

        model
            .userModel
            .createUser(user)
            .then(
                function(newUser) {
                    if(newUser){
                        req.login(newUser, function(err) { //After create user, log in as that user
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(newUser);
                            }
                        });
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findUser(req, res) {
        var query = req.query;
        if(query.password && query.username) {
            findUserByCredentials(req, res);
        } else if(query.username) {
            findUserByUsername(req, res);
        } else { //interpret as the currently logged in user (e.g. for google sign in)
            res.json(req.user); //passport made user available on the request
        }
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        model
            .userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    if(!user) { //did not find user
                        res.send('0');
                    }
                    res.json(user);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        model
            .userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(!user) { //did not find user
                        res.send('0');
                    }
                    res.json(user);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }
    function findUserById(req, res) {
        var userId = req.params.uid;
        model
            .userModel
            .findUserById(userId)
            .then(
                function (user) {
                    if(user) {
                        res.send(user);
                    } else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }
};