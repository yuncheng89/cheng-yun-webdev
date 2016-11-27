module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server")();
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);
    var api = {
        createWebsite: createWebsite,
        findWebsitesForUser: findWebsitesForUser,
        findWebsiteById: findWebsiteById,
        findAllPagesForWebsite: findAllPagesForWebsite,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        setModel: setModel
    };
    return api;
    function setModel(_model) {
        model = _model;
    }

    function deleteWebsite(websiteId) {
        return WebsiteModel
            .remove({_id: websiteId});
    }

    function updateWebsite(websiteId, website) {
        return WebsiteModel //return promise
            .update(
                {
                    _id: websiteId
                },
                {
                    name: website.name,
                    description: website.description
                }
            );
    }

    function findWebsitesForUser(userId) {
        return model.userModel.findWebsitesForUser(userId);
    }

    function findAllPagesForWebsite(websiteId) { //returns website object with pages
        return WebsiteModel
            .findById(websiteId)
            .populate("pages", "name") //just want names of pages from db
            .exec();
    }

    function findWebsiteById(websiteId) {
        return WebsiteModel.findById(websiteId);
    }

    function createWebsite(userId, website) {
        return WebsiteModel
            .create(website)
            .then(function(websiteObj){
                model.userModel
                    .findUserById(userId)
                    .then(function(userObj){
                        websiteObj._user = userObj._id;
                        websiteObj.save();

                        console.log("Newly created website on model server: ", websiteObj._id);

                        userObj.websites.push(websiteObj);
                        return userObj.save(); //return undefined

                    }, function(error){
                        console.log(error);
                    });
            });
    }
};