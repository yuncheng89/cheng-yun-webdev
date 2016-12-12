/**
 * Created by macbook on 12/11/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var TrackSchema = mongoose.Schema({
        _playlist: {type: mongoose.Schema.Types.ObjectId, ref:"PlaylistModel"},
        name: String,
        artist: String,
        album: String,
        duration: Number,
        album_image: String,
        dateCreated: {type: Date, default: Date.now},
        order: {type: Number, default: 0 }
    });
    return TrackSchema;
};