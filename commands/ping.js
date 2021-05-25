     const { Discord, login, client, ready, db } = require('../discord/main.js')
     module.exports.run = async (bot, message, args) => {
message.channel.send('Pinging...').then(msg => {
    msg.edit(client.ws.ping + ' Druggy rewritten')
    db.set(`ping_id-${msg.guild.id}`, )
})
     }

module.exports.main = {
    name: "ping",
    alias: "pong"
}