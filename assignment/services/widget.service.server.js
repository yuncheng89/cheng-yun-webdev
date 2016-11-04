/**
 * Created by macbook on 10/31/16.
 */
module.exports = function(app) {
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


    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    app.post ("/api/upload", upload.single('myFile'), uploadImage);


    function createWidget(req, res) {
        var widget = req.body;
        widgets.push(widget);
        console.log(widgets);
        res.send(widgets);
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        var result = [];
        for(var w in widgets) {
            if(widgets[w].pageId == pageId) {
                result.push(widgets[w]);
            }
        }
        res.json(result);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        for(var w in widgets) {
            if(widgets[w]._id == widgetId) {
                res.send(widgets[w]);
            }
        }
    }

    function updateWidget(req, res) {
        var widget = req.body; //Get from payload
        var widgetId = req.params.widgetId;

        for(var w in widgets) {
            if (widgets[w]._id == widgetId) {
                widgets[w] = widget;
                res.send(200);
            }
        }
        console.log(widgets);
    }


    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for (var w in widgets) {
            if (widgets[w]._id == widgetId) {
                widgets.splice(w, 1);
                res.send(200);
            }
        }
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
                res.redirect("/assignment/#/user/"+developerId+"/website/"+websiteId+"/page/"+pageId+"/widget");
            }
        }

        //res.redirect("/assignment/index.html#/user/"+developerId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
        res.redirect("/assignment/#/user/"+developerId+"/website/"+websiteId+"/page/"+pageId+"/widget");
    }

};