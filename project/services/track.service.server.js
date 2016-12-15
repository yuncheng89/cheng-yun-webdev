/**
 * Created by macbook on 12/11/16.
 */
module.exports = function(app, model) {

    console.log("Hello from PROJECT track services on server");

    app.post("/projapi/playlist/:playlistId/track", createTrack);
    app.get("/projapi/playlist/:playlistId/track", findAllTracksForPlaylist);
    app.get("/projapi/track/:trackId", findTrackById);
    app.put("/projapi/track/:trackId", updateTrack);
    app.delete("/projapi/track/:trackId", deleteTrack);

    app.put("/projapi/playlist/:playlistId/track", sortTracks);


    function createTrack(req, res) {
        var playlistId = req.params.playlistId;
        var newTrack = req.body;
        model.trackModel
            .createTrack(playlistId, newTrack)
            .then(
                function (trackObj) {
                    res.send(trackObj);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllTracksForPlaylist(req, res) {
        var playlistId = req.params.playlistId;

        model.trackModel
            .findAllTracksForPlaylist(playlistId)
            .then(function(tracks) {
                res.json(tracks);
            });
    }

    function findTrackById(req, res) {
        var trackId = req.params.trackId;
        model.trackModel
            .findTrackById(trackId)
            .then(function(track) {
                res.json(track)
            });
    }

    function updateTrack(req, res) {
        var track = req.body; //Get from payload
        var trackId = req.params.trackId;

        model.trackModel
            .updateTrack(trackId, track)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }


    function deleteTrack(req, res) {
        var trackId = req.params.trackId;
        model
            .trackModel
            .deleteTrack(trackId)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }



    function sortTracks(req, res) {
        var playlistId = req.params.playlistId;
        var startIndex = req.query.initial;
        var endIndex = req.query.final;

        model.trackModel
            .reorderTrack(playlistId, startIndex, endIndex)
            .then(
                function (status) {
                    return res.json(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );


    }
};