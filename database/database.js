/**
 * Created by macbook on 12/11/16.
 */
module.exports = function (mongoose) {
    var connectionString = 'mongodb://127.0.0.1:27017/wam-fall-2016';


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

    //One time connection in entire repo
    mongoose.connect(connectionString);

    var assignmentModels = require('../assignment/models/model.server.js')(mongoose);
    var projectModels = require('../project/models/model.server.js')(mongoose);

    var api = {
        wamModels: wamModels,
        mnModels: mnModels
    };
    return api;

    function wamModels() {
        return assignmentModels;
    }

    function mnModels() {
        return projectModels;
    }


};