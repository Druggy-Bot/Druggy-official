const { Discord, login, client, ready, db } = require('../discord/main.js')
    module.exports.run = async (bot, message, args) => {
    let user = message.mentions.members.first()
    if(!user){
        const embed2 = new Discord.MessageEmbed()

    .setAuthor(message.author.tag, message.author.displayAvatarURL({format: "png", size: 2048, dynamic: true}))
    .setTitle("Avatar")
    .setColor('RANDOM')
    .setImage(message.author.displayAvatarURL({format: "png", size: 2048, dynamic: true}))
    message.channel.send(embed2).then(msg => {
            db.set(`av_id-${msg.guild.id}`, msg.id)
        })
    } else {
    const embed = new Discord.MessageEmbed()

    .setAuthor(user.user.tag, user.user.displayAvatarURL({format: "png", size: 2048, dynamic: true}))
    .setTitle("Avatar")
    .setColor('RANDOM')
    .setImage(user.user.displayAvatarURL({format: "png", size: 2048, dynamic: true}))
    message.channel.send(embed).then(msg => {
            db.set(`av_id-${msg.guild.id}`, msg.id)
        })
    }
    }
        module.exports.main = {
        name: "av",
        alias: "avatar"
    }