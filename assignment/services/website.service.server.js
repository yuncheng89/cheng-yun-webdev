/**
 * Created by macbook on 10/31/16.
 */
module.exports = function(app, model) {
    console.log("Hello from ASSIGNMENT website services on server");
    /*
    var websites = [
        { "_id": 123, "name": "Facebook",    "developerId": 456, "description": "Lorem" },
        { "_id": 234, "name": "Tweeter",     "developerId": 456, "description": "Lorem" },
        { "_id": 456, "name": "Gizmodo",     "developerId": 456, "description": "Lorem" },
        { "_id": 567, "name": "Tic Tac Toe", "developerId": 123, "description": "Lorem" },
        { "_id": 678, "name": "Checkers",    "developerId": 123, "description": "Lorem" },
        { "_id": 789, "name": "Chess",       "developerId": 234, "description": "Lorem" }
    ];
    */
    app.get('/api/user/:uid/website', findAllWebsitesForUser);
    app.post('/api/user/:uid/website', createWebsite);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.delete('/api/website/:websiteId', deleteWebsite);
    app.put('/api/website/:websiteId', updateWebsite);


    function createWebsite(req, res) {
        //var website = req.body;
        var uid = req.params.uid;

        model.websiteModel
            .createWebsite(uid, req.body)
            .then(function (website) {
                console.log("Newly created website on model server: ", website._id);
                res.json(website);
            });

    }

    function findAllWebsitesForUser(req, res) {
        var uid = req.params.uid;

        model.websiteModel
            .findWebsitesForUser(uid)
            .then(function(user) { //Gets a USER object in return
                res.json(user);
            });

    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;

        model.websiteModel
            .findWebsiteById(websiteId)
            .then(function(website) {
                res.json(website)
            });
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        model
            .websiteModel
            .deleteWebsite(websiteId)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updateWebsite(req, res) {
        var website = req.body; //Get from payload
        var websiteId = req.params.websiteId;

        model.websiteModel
            .updateWebsite(websiteId, website)
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