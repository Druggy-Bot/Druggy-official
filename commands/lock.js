     const { Discord, login, client, ready, db } = require('../discord/main.js')
     module.exports.run = async (bot, message, args) => {
         if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("**"+message.author.username + "**, you can't use that.");
if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("**"+message.author.username + "**, you can't use that.");

channel = message.mentions.channels.first();

let reason = args.slice(1).join(' ')
if(!reason){
    reason = 'No reason provided'
}

if(!channel){
message.channel.overwritePermissions([
	{
		id: message.guild.id, 
		deny: ['SEND_MESSAGES'],
	},
]);
message.channel.send(`**:lock: ${message.channel} has been locked. \n Reason: ${reason}**`).then(msg => {
            db.set(`lock_id-${msg.guild.id}`, msg.id)
        })
} else if(channel){
    
    channel.overwritePermissions([
	{
		id: message.guild.id, 
		deny: ['SEND_MESSAGES'],
	},
    ]);
message.channel.send(`**:lock: ${channel} has been locked. \n Reason: ${reason}**`).then(msg => {
            db.set(`lock_id-${msg.guild.id}`, msg.id)
        })
}


     }

module.exports.main = {
    name: "lock"
}