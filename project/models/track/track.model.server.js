/**
 * Created by macbook on 12/11/16.
 */
module.exports = function (mongoose) {
    var model = {};

    var TrackSchema = require("./track.schema.server")();
    var TrackModel = mongoose.model("TrackModel", TrackSchema);

    var api = {
        createTrack: createTrack,
        findAllTracksForPlaylist: findAllTracksForPlaylist,
        findTrackById: findTrackById,
        updateTrack: updateTrack,
        deleteTrack: deleteTrack,
        reorderTrack: reorderTrack,
        setModel: setModel
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createTrack(playlistId, newTrack) {
        return model.playlistModel
            .findPlaylistById(playlistId)
            .then(
                function(playlistObj){

                    var order = 0;
                    if (playlistObj.tracks.length>0) {
                        var maxOrder = 0;
                        for (var i = 0; i < playlistObj.tracks.length; i++) {
                            if (playlistObj.tracks[i].order>maxOrder) {
                                maxOrder = playlistObj.tracks[i].order;
                            }
                        }

                        order = maxOrder + 1;
                    } //The default order of the new track is after the last track on playlist

                    console.log("playlistObj.tracks.length", playlistObj.tracks.length);

                    var trackObj = new TrackModel();
                    trackObj._playlist = playlistId;
                    trackObj.order = order;
                    trackObj.sID = newTrack.sID;
                    trackObj.name = newTrack.name;
                    trackObj.artist = newTrack.artist;
                    trackObj.album = newTrack.album;
                    trackObj.album_image = newTrack.album_image;
                    trackObj.duration = newTrack.duration;
                    trackObj.preview_url = newTrack.preview_url;

                    playlistObj.tracks.push(trackObj);
                    playlistObj.save();

                    return trackObj.save();
                },
                function(error){
                    console.log("error: "+error);
                });

    }

    function findAllTracksForPlaylist(playlistId) {
        return model.playlistModel.findAllTracksForPlaylist(playlistId);
    }

    function findTrackById(trackId) {
        return TrackModel.findById(trackId);
    }

    function updateTrack(trackId, newTrack) {

        return TrackModel
            .findById(trackId)
            .then(
                function(track) {
                    track.sID = newTrack.sID;
                    track.name = newTrack.name;
                    track.text = newTrack.text;
                    track.artist = newTrack.artist;
                    track.duration = newTrack.duration;
                    track.album_image = newTrack.album_image;
                    track.order = newTrack.order;
                    return track.save();
                }
            );

    }

    function deleteTrack(trackId) {
        return TrackModel
            .remove({_id: trackId});
    }
    function reorderTrack(playlistId, start, end) {

        console.log("start %s end %s", start, end);

        start = parseInt(start);
        end = parseInt(end);
        return TrackModel
            .find({_playlist: playlistId}) //find all tracks with this playlistId
            .then(
                function(tracks) {
                    tracks
                        .forEach(
                            function(track){ //for each track, increase or decrease its index based on start & finish

                                console.log("current track's position: "+track.order);

                                if(start < end) { //move down
                                    if(track.order < start) {
                                        //this track is not affected
                                    } else if(track.order === start) {
                                        track.order = end;
                                        track.save(function(err,doc){});
                                    } else if(track.order > start && track.order <= end) {
                                        track.order--;
                                        track.save(function(err,doc){});
                                    } else if(track.order > end) {

                                    }
                                } else { //move up
                                    if(track.order < end) {
                                        //this track is not affected
                                    } else if(track.order === start) {
                                        track.order = end;
                                        track.save(function(err,doc){});
                                    } else if(track.order < start && track.order >= end) {
                                        track.order++;
                                        track.save(function(err,doc){});
                                    } else if(track.order > start) {

                                    }
                                }
                            }
                        );
                },
                function(err) {

                }
            );
    }
};

