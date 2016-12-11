/**
 * Created by macbook on 12/11/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var PlaylistSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref:"userModel"},
        name: String,
        description: String,
        tracks: [{type: mongoose.Schema.Types.ObjectId, ref:'TrackModel'}],
        dateCreated: {type:Date, default: Date.now}
    });
    return PlaylistSchema;
};