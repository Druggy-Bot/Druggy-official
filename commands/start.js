     const { Discord, login, client, ready, db, ms } = require('../discord/main.js')
     module.exports.run = async (bot, message, args) => {
message.channel.send('Soon').then(msg => {
            db.set(`start_id-${msg.guild.id}`, msg.id)
        })
     }

module.exports.main = {
    name: "start"
}