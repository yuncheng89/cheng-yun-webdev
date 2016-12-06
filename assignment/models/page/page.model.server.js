module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server")();
    var PageModel = mongoose.model("PageModel", PageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        findAllWidgetsForPage: findAllWidgetsForPage,
        updatePage: updatePage,
        deletePage: deletePage,
        setModel: setModel
    };
    return api;

    function setModel(_model) {
        model = _model;
    }


    function createPage(websiteId, page) {
        return model.websiteModel
            .findWebsiteById(websiteId)
            .then(
                function (websiteObj) {
                    var pageObj = new PageModel();
                    pageObj._website = websiteObj._id;
                    pageObj.name = page.name;
                    pageObj.description = page.description;
                    websiteObj.pages.push(pageObj);
                    websiteObj.save();
                    return pageObj.save();
                },
                function (error) {
                    console.log("error: " + error);
                });
    }
    function findAllPagesForWebsite(websiteId) {
        return model.websiteModel.findAllPagesForWebsite(websiteId);
    }

    function findAllWidgetsForPage(pageId) { //returns page object with widgets
        return PageModel
            .findById(pageId)
            .populate("widgets")
            .exec();
    }

    function findPageById(pageId) {
        return PageModel.findById(pageId);
    }
    function updatePage(pageId, page) {
        return PageModel //return promise
            .update(
                {
                    _id: pageId
                },
                {
                    name: page.name,
                    description: page.description
                }
            );
    }
    function deletePage(pageId) {
        return PageModel
            .remove({_id: pageId});
    }

};

