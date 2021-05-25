     const { Discord, login, client, ready, db } = require('../discord/main.js')
     module.exports.run = async (bot, message, args) => {
         if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("**"+message.author.username + "**, you can't use that.");
if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Well i can't do this please allow me to manage channels.");

let channel = message.mentions.channels.first();

if(!channel){
message.channel.overwritePermissions([
	{
		id: message.guild.id, 
		allow: ['SEND_MESSAGES'],
	},
]);
message.channel.send(`**:unlock: ${message.channel} has been unlocked.**`).then(msg => {
            db.set(`unlock_id-${msg.guild.id}`, msg.id)
        })
} else if(channel){
    channel.overwritePermissions([
	{
		id: message.guild.id, 
		allow: ['SEND_MESSAGES'],
	},
]);
message.channel.send(`**:unlock: ${channel} has been unlocked.**`).then(msg => {
            db.set(`unlock_id-${msg.guild.id}`, msg.id)
        })
}


     }

module.exports.main = {
    name: "unlock"
}