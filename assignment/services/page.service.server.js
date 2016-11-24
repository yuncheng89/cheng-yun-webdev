/**
 * Created by macbook on 10/31/16.
 */
module.exports = function(app, model) {
    console.log("Hello from page services on server");

    /*
    var pages = [
        { "_id": 321, "name": "Post 1", "websiteId": 456, "description": "Lorem" },
        { "_id": 432, "name": "Post 2", "websiteId": 456, "description": "Lorem" },
        { "_id": 543, "name": "Post 3", "websiteId": 456, "description": "Lorem" }
    ];
    */

    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/page/:pageId', findPageById);
    app.delete('/api/page/:pageId', deletePage);
    app.put('/api/page/:pageId', updatePage);


    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;

        model.pageModel
            .findAllPagesForWebsite(websiteId)
            .then(function(pages) {
                res.json(pages);
            });
    }

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page = req.body;
        model.pageModel
            .createPage(websiteId, page)
            .then(function (page) {
                console.log(page);
                res.json(page);
            });
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        model.pageModel
            .findPageById(pageId)
            .then(function(page) {
                res.json(page)
            });
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        model
            .pageModel
            .deletePage(pageId)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updatePage(req, res) {
        var page = req.body; //Get from payload
        var pageId = req.params.pageId;

        model.pageModel
            .updatePage(pageId, page)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }



};