module.exports = function() {
    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        first: String,
        last: String,
        websites: [{type: mongoose.Schema.Types.ObjectId, ref:'WebsiteModel'}]

    }, {collection: "user"});
    return UserSchema;
};
