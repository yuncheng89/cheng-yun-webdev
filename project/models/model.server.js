module.exports = function (mongoose) {

    var model = {
        userModel: require("./user/user.model.server")(mongoose),
        playlistModel: require("./playlist/playlist.model.server")(mongoose)
    };

    return model;
};