module.exports = function (mongoose) {
    var userModel = require("./user/user.model.server")(mongoose);
    var playlistModel = require("./playlist/playlist.model.server")(mongoose);
    var trackModel = require("./track/track.model.server")(mongoose);

    var model = {
        userModel: userModel,
        playlistModel: playlistModel,
        trackModel: trackModel
    };

    //userModel does not need the model object because user is the top level object
    playlistModel.setModel(model);
    trackModel.setModel(model);

    return model;
};