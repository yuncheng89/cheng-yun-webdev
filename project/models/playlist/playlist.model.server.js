module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var PlaylistSchema = require("./playlist.schema.server")();
    var PlaylistModel = mongoose.model("PlaylistModel", PlaylistSchema);
    var api = {
        createPlaylist: createPlaylist,
        findPlaylistsForuser: findPlaylistsForuser,
        findPlaylistById: findPlaylistById,
        findAllTracksForPlaylist: findAllTracksForPlaylist,
        updatePlaylist: updatePlaylist,
        deletePlaylist: deletePlaylist,
        setModel: setModel
    };
    return api;
    function setModel(_model) {
        model = _model;
    }

    function deletePlaylist(playlistId) {
        return PlaylistModel
            .remove({_id: playlistId});
    }

    function updatePlaylist(playlistId, playlist) {
        return PlaylistModel //return promise
            .update(
                {
                    _id: playlistId
                },
                {
                    name: playlist.name,
                    description: playlist.description
                }
            );
    }

    function findPlaylistsForuser(userId) {
        return model.userModel.findPlaylistsForuser(userId);
    }

    function findAllTracksForPlaylist(playlistId) { //returns playlist object with tracks
        return PlaylistModel
            .findById(playlistId)
            .populate("tracks", "name") //just want names of tracks from db
            .exec();
    }

    function findPlaylistById(playlistId) {
        return PlaylistModel.findById(playlistId);
    }

    function createPlaylist(userId, playlist) {

        return model.userModel
            .finduserById(userId)
            .then(
                function (userObj) {
                    var playlistObj = new PlaylistModel();
                    playlistObj._user = userObj._id;
                    playlistObj.name = playlist.name;
                    playlistObj.description = playlist.description;
                    userObj.playlists.push(playlistObj);
                    userObj.save();
                    return playlistObj.save();
                },
                function (error) {
                    console.log("error: " + error);
                });

    }
};