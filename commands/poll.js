     const { Discord, login, client, ready, db } = require('../discord/main.js')
     module.exports.run = async (bot, message, args) => {
         if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("**"+message.author.username + "**, you can't use that.");
 let args1 = args.join(" ").toString();
 if(!args1){
        return message.channel.send('Add a description')
    }
    let embed = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    .setTitle('Poll')
    .setDescription(args1)
    .setFooter('Druggy-commands')
    message.channel.send(embed).then(msg => {
        msg.react('✅')
        msg.react('❌')

            db.set(`poll_id-${msg.guild.id}`, msg.id)
    
    })
     }

module.exports.main = {
    name: "poll"
}