/**
 * Created by macbook on 11/14/16.
 */

module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var UserModel  = mongoose.model("UserModel", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
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
            .populate("websites", "name")
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

    function updateUser(userId, user) {
        return UserModel
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