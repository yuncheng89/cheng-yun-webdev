/**
 * Created by macbook on 10/31/16.
 */
module.exports = function(app, model) {
    console.log("Hello from website services on server");

    var websites = [
        { "_id": 123, "name": "Facebook",    "developerId": 456, "description": "Lorem" },
        { "_id": 234, "name": "Tweeter",     "developerId": 456, "description": "Lorem" },
        { "_id": 456, "name": "Gizmodo",     "developerId": 456, "description": "Lorem" },
        { "_id": 567, "name": "Tic Tac Toe", "developerId": 123, "description": "Lorem" },
        { "_id": 678, "name": "Checkers",    "developerId": 123, "description": "Lorem" },
        { "_id": 789, "name": "Chess",       "developerId": 234, "description": "Lorem" }
    ];

    app.get('/api/user/:uid/website', findAllWebsitesForUser);
    app.post('/api/user/:uid/website', createWebsite);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.delete('/api/website/:websiteId', deleteWebsite);
    app.put('/api/website/:websiteId', updateWebsite);


    function createWebsite(req, res) {
        var website = req.body;
        var uid = req.params.uid;
        // websites.push(website);
        // console.log(websites);
        // res.send(websites);

        model.websiteModel
            .createWebsite(uid, website)
            .then(function (website) {
                console.log(website);
                res.json(website);
            });

    }

    function findAllWebsitesForUser(req, res) {
        var uid = req.params.uid;

        model.websiteModel
            .findWebsitesForUser(uid)
            .then(function(websites) {
                res.json(websites);
            });

    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        for(var w in websites) {
            if(websites[w]._id == websiteId) {
                res.json(websites[w]);
            }
        }
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        for (var w in websites) {
            if (websites[w]._id == websiteId) {
                websites.splice(w, 1);
                res.send(200);
            }
        }
    }

    function updateWebsite(req, res) {
        var website = req.body; //Get from payload
        var websiteId = req.params.websiteId;
        for(var w in websites) {
            if (websites[w]._id == websiteId) {
                websites[w] = website;
                res.send(200);
            }
        }
    }

};