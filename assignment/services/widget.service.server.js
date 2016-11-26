/**
 * Created by macbook on 10/31/16.
 */
module.exports = function(app, model) {
    console.log("Hello from widget services on server");

    var multer = require('multer'); // npm install multer --save
    var mime = require('mime');

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname+'/../../public/assignment/uploads')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype));
        }
    });
    var upload = multer({ storage: storage });

    //var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

    /*
    var widgets = [
        { "_id": 123, "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": 234, "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": 345, "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": 456, "widgetType": "HTML", "pageId": "321", "text": '<p>Watchmaker <a href="http://gizmodo.com/tag/mbf" rel="nofollow">MB&amp;F</a> isn’t as well-known as  Rolex or Timex, but that’s because the company’s unique creations—like a <a href="http://gizmodo.com/listen-to-an-18-000-tie-fighter-music-box-play-the-sta-1717444112" rel="nofollow">TIE Fighter-shaped music box</a> that plays the <em>Star Wars</em> theme—are made for die-hard collectors. Its latest creation is a <a href="https://www.mbandf.com/en/machines/co-creations/astrograph" target="_blank" rel="noopener">rocket-shaped pen inspired by the moon landing</a>, and I’m desperately trying to justify…<span class="read-more-placeholder"></span><span class="readmore-core-decorated"></span></p>'},
        { "_id": 567, "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": 678, "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": 789, "widgetType": "HTML", "pageId": "321", "text": "<p><i>Lorem ipsum</p>"}
    ];
    */

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.put("/api/page/:pageId/widget", sortWidgets);


    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var newWidget = req.body;
        model.widgetModel
            .createWidget(pageId, newWidget)
            .then(
                function (widgetObj) { //get WIDGET object in return
                    res.send(widgetObj);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;

        model.widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function(widgets) {
                res.json(widgets);
            });
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        model.widgetModel
            .findWidgetById(widgetId)
            .then(function(widget) {
                res.json(widget)
            });
    }

    function updateWidget(req, res) {
        var widget = req.body; //Get from payload
        var widgetId = req.params.widgetId;

        model.widgetModel
            .updateWidget(widgetId, widget)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }


    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        model
            .widgetModel
            .deleteWidget(widgetId)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }


    function uploadImage(req, res) {

        var myFile        = req.file;
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var developerId   = req.body.developerId;
        var websiteId     = req.body.websiteId;
        var pageId        = req.body.pageId;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in uploads folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        //res.send(myFile);

        var url = "/assignment/uploads/"+myFile.filename;

        console.log("widgetId ", widgetId);
        console.log("withExt ", url);

        for(var w in widgets) {
            if (widgets[w]._id == widgetId) {
                widgets[w].width = width;
                widgets[w].url = url;
                res.redirect("/assignment/index.html#/user/"+developerId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
                return;
            }
        }

        res.redirect("/assignment/#/user/"+developerId+"/website/"+websiteId+"/page/"+pageId+"/widget");
    }


    function sortWidgets(req, res) {
        var pageId = req.params.pageId;
        var widgetsForPage = [];

        var i = widgets.length;
        while (i--) {
            if(widgets[i].pageId == pageId) {
                widgetsForPage.push(widgets[i]); //add to widgets for page array
                widgets.splice(i, 1); //remove from main widgets array
            }
        }

        widgetsForPage.reverse();

        console.log(widgetsForPage);

        var start = req.query.initial;
        var end = req.query.final;

        console.log([start, end]);
        console.log("=====================================================================================");

        widgetsForPage.splice(end, 0, widgetsForPage.splice(start, 1)[0]);

        var concatenated = widgets.concat(widgetsForPage);
        widgets = concatenated;

        //widgets.push(widgetsForPage); //push back to main widgets array

        console.log(widgets);
    }
};