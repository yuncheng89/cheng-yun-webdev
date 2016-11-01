/**
 * Created by macbook on 10/31/16.
 */
module.exports = function(app) {
    console.log("Hello from page services on server");

    var pages = [
        { "_id": 321, "name": "Post 1", "websiteId": 456, "description": "Lorem" },
        { "_id": 432, "name": "Post 2", "websiteId": 456, "description": "Lorem" },
        { "_id": 543, "name": "Post 3", "websiteId": 456, "description": "Lorem" }
    ];

    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/page/:pageId', findPageById);
    app.delete('/api/page/:pageId', deletePage);
    app.put('/api/page/:pageId', updatePage);


    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var result = [];
        for(var p in pages) {
            if(pages[p].websiteId == websiteId) {
                result.push(pages[p]);
            }
        }
        res.json(result);
    }

    function createPage(req, res) {
        var page = req.body;
        pages.push(page);
        console.log(pages);
        res.send(pages);
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        for(var p in pages) {
            if(pages[p]._id == pageId) {
                res.send(pages[p]);
            }
        }
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        for (var p in pages) {
            if (pages[p]._id == pageId) {
                pages.splice(p, 1);
                res.send(200);
            }
        }
    }

    function updatePage(req, res) {
        var page = req.body; //Get from payload
        var pageId = req.params.pageId;

        for(var p in pages) {
            if (pages[p]._id == pageId) {
                pages[p] = page;
                res.send(200);
            }
        }
        console.log(pages);
    }



};