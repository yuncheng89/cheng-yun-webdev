module.exports = function(app)
{
    app.get("/api/test", findAllMessages);
    app.post("/api/test", createMessage);
    app.delete("/api/test/:id", deleteMessage);


    //var connectionString = 'mongodb://127.0.0.1:27017/test';
    var connectionString = 'mongodb://yuncheng:g0bletoffire@ds049446.mlab.com:49446/cs5610';

    //Check if local environment variables exist
    if(process.env.MLAB_USERNAME) {

        var username = process.env.MLAB_USERNAME;
        var password = process.env.MLAB_PASSWORD;

        connectionString = 'mongodb://'+
            username +':'+
            password +
            '@ds049446.mlab.com:49446/cs5610';
    }

    console.log(connectionString);

    var mongoose = require("mongoose");
    mongoose.connect(connectionString);

    var TestSchema = mongoose.Schema({
        message: String
    });

    var TestModel = mongoose.model("TestModel", TestSchema);

    function findAllMessages(req, res) {
        TestModel
            .find()
            .then(
                function(tests) {
                    res.json(tests);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function createMessage(req, res) {
        TestModel
            .create(req.body)
            .then(
                function(test) {
                    res.json(test);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteMessage(req, res) {
        TestModel
            .remove({_id: req.params.id})
            .then(
                function(result) {
                    res.json(result);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }
};