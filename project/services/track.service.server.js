/**
 * Created by macbook on 12/11/16.
 */
module.exports = function(app, model) {
    console.log("Hello from PROJECT track services on server");

    app.post("/projapi/page/:pageId/track", createTrack);
    app.get("/projapi/page/:pageId/track", findAllTracksForPage);
    app.get("/projapi/track/:trackId", findTrackById);
    app.put("/projapi/track/:trackId", updateTrack);
    app.delete("/projapi/track/:trackId", deleteTrack);

    app.put("/projapi/page/:pageId/track", sortTracks);


    function createTrack(req, res) {
        var pageId = req.params.pageId;
        var newTrack = req.body;
        model.trackModel
            .createTrack(pageId, newTrack)
            .then(
                function (trackObj) { //get WIDGET object in return
                    res.send(trackObj);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllTracksForPage(req, res) {
        var pageId = req.params.pageId;

        model.trackModel
            .findAllTracksForPage(pageId)
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
        var pageId = req.params.pageId;
        var startIndex = req.query.initial;
        var endIndex = req.query.final;

        model.trackModel
            .reorderTrack(pageId, startIndex, endIndex)
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