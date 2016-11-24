module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var UserModel  = mongoose.model("UserModel", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findWebsitesForUser: findWebsitesForUser,
        updateUser: updateUser,
        removeUser: removeUser,
        setModel: setModel
    };
    return api;
    function setModel(_model) {
        model = _model;
    }

    function findWebsitesForUser(userId) {
        return UserModel
            .findById(userId)
            .populate("websites", "name") //just want names of websites from db
            .exec();
    }

    function removeUser(userId) {
        return UserModel
            .remove({_id: userId});
    }


    function findUserByCredentials(username, password) {
        return UserModel.find({
                    username: username,
                    password: password
                });
    }

    function findUserByUsername(username) {
        return UserModel.find({
            username: username
        });
    }

    function updateUser(userId, user) {
        return UserModel //return promise
            .update(
                {
                    _id: userId
                },
                {
                    first: user.first,
                    last: user.last
                }
            );
    }

    function findUserById(userId) {
        // UserModel.find({_id: userId}) --> returns an array
        return UserModel.findById(userId); //returns a promise
    }

    function createUser(user) {
        return UserModel.create(user); //returns a promise
    }
};