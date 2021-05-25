const { Discord, login, client, ready, MessageEmbed, ms, db } = require('../discord/main.js')
const colors = require('../discord/c/colors.json')
const prefix = require('../discord/schema/prefix.js')
const muteModel = require('../discord/schema/mute.js')
module.exports.run = async (bot, message, args) => {
         const data = await prefix.findOne({
        GuildID: message.guild.id
    });
    let pre3;

        if(data) {
        const prefix = data.Prefix;
        pre3 = prefix
        } else if(!data){
        const prefix = "&";
          pre3 = prefix
        }

    const mentionedMember = message.mentions.members.first()
        || message.guild.members.cache.get(args[0])

    const msRegex = RegExp(/(\d+(s|m|h|w))/)


if (!message.member.hasPermission('MANAGE_ROLES')) {
return message.channel.send("**"+message.author.username + "**, you can't use that.")
}

if(!message.guild.me.hasPermission(['MANAGE_ROLES', 'MANAGE_CHANNELS'])) return message.channel.send("Well i can't do this please allow me to manage channels.");

 let muteRole = message.guild.roles.cache.find(r => r.name.toLowerCase().includes('muted'))

     if (!muteRole) {
        muteRole = await message.guild.roles.create({
            data: {
                name: 'Muted',
                color: 'BLACK',
            }
        }).catch(err => console.log(err))
    }

                            let embed = new MessageEmbed()
.setTitle('Invalid usage.')
.setColor(colors.red)
.setDescription(`Invalid command usage, try using it like: \n \`${pre3}mute [member] [time] (optional reason)\` \n \n Arguments: \n \`member\`: User mention (@User) \n \`time\`: Mute time \n \`reason\`: Text (may include spaces)`)

  if (!mentionedMember) return message.channel.send(embed).then(msg => {
            db.set(`mute_id-${msg.guild.id}`, msg.id)
        })

let error = new MessageEmbed()
.setDescription(`You can't ban this user. \n Their roles are higher then yours.`)
let error2 = new MessageEmbed()
.setDescription(`I can't ban this user. \n Their roles are higher then mine.`)

if(message.mentions.members.first().roles.highest.position > message.guild.me.roles.highest.position)
    return message.channel.send(error2);
   if(message.mentions.members.first().roles.highest.position > message.member.roles.highest.position || message.mentions.members.first().roles.highest.position === message.member.roles.highest.position)
    return message.channel.send(error);

  if (!msRegex.test(args[1])) return message.channel.send('That is not a valid amount of time to mute member.')
if (ms(msRegex.exec(args[1])[1]) > 2592000000) return message.reply('Can not mute a user over a month!')

    const isMuted = await muteModel.findOne({
        guildID: message.guild.id,
        memberID: mentionedMember.id,
    })

        if (isMuted) {
            message.channel.send('User is already muted.')
        }

    const noEveryone = mentionedMember.roles.cache.filter(r => r.name !== '@everyone')


   await mentionedMember.roles.add(muteRole.id).catch(err => console.log(err))

    for (const role of noEveryone) {
        await mentionedMember.roles.remove(role[0]).catch(err => console.log(err))
    }

    const muteDoc = new muteModel({
        guildID: message.guild.id,
        memberID: mentionedMember.id,
        length: Date.now() + ms(msRegex.exec(args[1])[1]),
        memberRoles: noEveryone.map(r => r),
    })

 await muteDoc.save().catch(err => console.log(err))

    const reason = args.slice(2).join(' ') || 'No reason provided'

message.channel.send(new MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.avatarURL())
        .addField("**Member**", `${mentionedMember}`)
        .addField("**Action**", "Mute")
        .addField("**Reason**", `${reason ? `${reason}` : ''}`)
        .addField("**Length**", `${msRegex.exec(args[1])[1]}`)
        .setThumbnail(mentionedMember.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp(message.createdAt)
        .setFooter("Druggy-commands")
        .setColor(colors.mute))

  }

module.exports.main = {
  name: "mute"
}