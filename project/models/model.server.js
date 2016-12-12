module.exports = function (mongoose) {
    var userModel = require("./user/user.model.server")(mongoose);
    var playlistModel = require("./playlist/playlist.model.server")(mongoose);

    var model = {
        userModel: userModel,
        playlistModel: playlistModel
    };

    playlistModel.setModel(model);

    return model;
};