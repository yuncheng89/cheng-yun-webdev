module.exports = function(app, db, sec) {

    var model = db.wamModels();

    require("./services/user.service.server.js")(app, model, sec);
    require("./services/website.service.server.js")(app, model);
    require("./services/page.service.server.js")(app, model);
    require("./services/widget.service.server.js")(app, model);
};