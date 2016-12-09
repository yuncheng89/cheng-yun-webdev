module.exports = function () {
    var mongoose = require('mongoose');

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

    mongoose.connect(connectionString);

    var userModel = require("./user/user.model.server")();
    var websiteModel = require("./website/website.model.server")();
    var pageModel = require("./page/page.model.server")();
    var widgetModel = require("./widget/widget.model.server")();

    var model = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    };

    userModel.setModel(model);
    websiteModel.setModel(model);
    pageModel.setModel(model);
    widgetModel.setModel(model);

    return model;
};