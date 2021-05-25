     const { Discord, login, client, ready, db, ms } = require('../discord/main.js')

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("**"+message.author.username + "**, you can't use that.");

          if (!args[0] || isNaN(args[0])) return message.channel.send('please enter a users id to unban!').then(m => m.delete({ timeout: 5000 }));

 let member;

}
module.exports.help = {
    name: "unban",
    alias: "pardon"
}