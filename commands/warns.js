const { Discord, login, client, ready, err, client_id, db} = require('../discord/main.js')
const warnModel = require('../discord/schema/warn.js')
    module.exports.run = async (bot, message, args) => {
        const mentionedMember = message.mentions.members.first() || message.member || message.guild.members.cache.get(args[0])

          const warnDoc = await warnModel.findOne({
        guildID: message.guild.id,
        memberID: mentionedMember.id,
    }).catch(err => console.log(err))

    if (!warnDoc || !warnDoc.warnings.length) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('Error 403', mentionedMember.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`${mentionedMember} doesn't have any warnings.`)).then(msg => {
            db.set(`warns_id-${msg.guild.id}`, msg.id)
            })
    }

    const data = []

    for (let i = 0; warnDoc.warnings.length > i; i++) {
        data.push(`**Warning:** ${i + 1}`)
        data.push(`**Reason:** ${warnDoc.warnings[i]}`)
        data.push(`**Moderator:** ${await message.client.users.fetch(warnDoc.moderator[i]).catch(() => 'Deleted User')}`)
        data.push(`**Date:** ${new Date(warnDoc.date[i]).toLocaleDateString()}\n`)
    }

    const embed = {
        color: "BLUE",
        author: {
         name: mentionedMember.user.username
        },
        thumbnail: {
            url: mentionedMember.user.displayAvatarURL({ dynamic: true })
        },
        description: data.join('\n'),
    }
        
    message.channel.send({ embed: embed })
    }
        module.exports.main = {
        name: "warnings",
        alias: "warns"
    }