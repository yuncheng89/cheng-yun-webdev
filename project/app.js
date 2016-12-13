module.exports = function(app, db, sec) {

    var model = db.mnModels();

    require("./services/user.service.server.js")(app, model, sec);
    require("./services/playlist.service.server.js")(app, model);
    require("./services/track.service.server.js")(app, model);
};