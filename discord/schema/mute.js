const mongoose = require('mongoose');

const MuteSchema = new mongoose.Schema({


    guildID: String,
    memberID: String,
    length: Date,
    memberRoles: Array,

});

const MessageModel = module.exports = mongoose.model('mute', MuteSchema);