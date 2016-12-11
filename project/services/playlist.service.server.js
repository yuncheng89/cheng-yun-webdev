/**
 * Created by macbook on 12/11/16.
 */
module.exports = function(app, model) {
    console.log("Hello from PROJECT playlist services on server");

    app.get('/api/user/:uid/playlist', findAllPlaylistsForUser);
    app.post('/api/user/:uid/playlist', createPlaylist);
    app.get('/api/playlist/:playlistId', findPlaylistById);
    app.delete('/api/playlist/:playlistId', deletePlaylist);
    app.put('/api/playlist/:playlistId', updatePlaylist);


    function createPlaylist(req, res) {
        //var playlist = req.body;
        var uid = req.params.uid;

        model.playlistModel
            .createPlaylist(uid, req.body)
            .then(function (playlist) {
                console.log("Newly created playlist on model server: ", playlist._id);
                res.json(playlist);
            });

    }

    function findAllPlaylistsForUser(req, res) {
        var uid = req.params.uid;

        model.playlistModel
            .findPlaylistsForUser(uid)
            .then(function(user) { //Gets a USER object in return
                res.json(user);
            });

    }

    function findPlaylistById(req, res) {
        var playlistId = req.params.playlistId;

        model.playlistModel
            .findPlaylistById(playlistId)
            .then(function(playlist) {
                res.json(playlist)
            });
    }

    function deletePlaylist(req, res) {
        var playlistId = req.params.playlistId;
        model
            .playlistModel
            .deletePlaylist(playlistId)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updatePlaylist(req, res) {
        var playlist = req.body; //Get from payload
        var playlistId = req.params.playlistId;

        model.playlistModel
            .updatePlaylist(playlistId, playlist)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

};