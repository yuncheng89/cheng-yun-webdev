module.exports = function (mongoose) {

    var model = {
        userModel: require("./user/user.model.server")(mongoose),
        websiteModel: require("./website/website.model.server")(mongoose),
        pageModel: require("./page/page.model.server")(mongoose),
        widgetModel: require("./widget/widget.model.server")(mongoose)
    };

    return model;
};