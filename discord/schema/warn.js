const mongoose = require('mongoose');

const WarnSchema = new mongoose.Schema({

     guildID: String,
    memberID: String,
    warnings: Array,
    moderator: Array,
    date: Array,
});

const MessageModel = module.exports = mongoose.model('warn', WarnSchema);