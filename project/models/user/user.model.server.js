module.exports = function (mongoose) {

    var UserSchema = require("./user.schema.server")(mongoose);
    var ProjectUserModel  = mongoose.model("ProjectUserModel", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findWebsitesForUser: findWebsitesForUser,
        updateUser: updateUser,
        removeUser: removeUser
    };
    return api;


    function findWebsitesForUser(userId) { //returns user object with websites
        return ProjectUserModel
            .findById(userId)
            .populate("websites", "name") //just want names of websites from db
            .exec();
    }

    function removeUser(userId) {
        return ProjectUserModel
            .remove({_id: userId});
    }


    function findUserByCredentials(username, password) {
        return ProjectUserModel.findOne({
            username: username,
            password: password
        });
     }

    function findUserByUsername(username) {
        return ProjectUserModel.findOne({
            username: username
        });
    }

    function updateUser(userId, user) {
        return ProjectUserModel //return promise
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
        // userModel.find({_id: userId}) --> returns an array
        return ProjectUserModel.findById(userId); //returns a promise
    }

    function createUser(user) {
        return ProjectUserModel.create(user); //returns a promise
    }
};