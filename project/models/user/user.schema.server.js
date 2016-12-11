module.exports = function(mongoose) {

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        first: String,
        last: String,
        email: String,
        role: {type: String, default: 'MIXER', enum: ['ADMIN', 'MIXER']},
        playlists: [{type: mongoose.Schema.Types.ObjectId, ref:'PlaylistModel'}],
        type: {type: String, default: 'mn'}

    }, {collection: "userMN"});
    return UserSchema;
};
