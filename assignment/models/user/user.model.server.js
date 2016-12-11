module.exports = function (mongoose) {

    var UserSchema = require("./user.schema.server")(mongoose);
    var AssignmentUserModel  = mongoose.model("AssignmentUserModel", UserSchema);

    var api = {
        createUser: createUser,
        findUserByGoogleId: findUserByGoogleId,
        findUserByFacebookId: findUserByFacebookId,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findWebsitesForUser: findWebsitesForUser,
        updateUser: updateUser,
        removeUser: removeUser
    };
    return api;

    function findUserByGoogleId(googleId) {
        return AssignmentUserModel
            .findOne({"google.id": googleId})
    }

    function findUserByFacebookId(facebookId) {
        return AssignmentUserModel
            .findOne({'facebook.id': facebookId});
    }

    function findWebsitesForUser(userId) { //returns user object with websites
        return AssignmentUserModel
            .findById(userId)
            .populate("websites", "name") //just want names of websites from db
            .exec();
    }

    function removeUser(userId) {
        return AssignmentUserModel
            .remove({_id: userId});
    }


    function findUserByCredentials(username, password) {
        return AssignmentUserModel.findOne({
            username: username,
            password: password
        });
     }

    function findUserByUsername(username) {
        return AssignmentUserModel.findOne({
            username: username
        });
    }

    function updateUser(userId, user) {
        return AssignmentUserModel //return promise
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
        return AssignmentUserModel.findById(userId); //returns a promise
    }

    function createUser(user) {
        return AssignmentUserModel.create(user); //returns a promise
    }
};