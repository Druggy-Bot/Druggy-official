const { Discord, login, client, ready, err, client_id, MessageEmbed, db} = require('../discord/main.js')
const prefix = require('../discord/schema/prefix.js')
const warnModel = require('../discord/schema/warn.js')
const colors = require('../discord/c/colors.json')
    module.exports.run = async (bot, message, args) => {
         	if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("**"+message.author.username + "**, you can't use that.");
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

                    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

                            let embed = new Discord.MessageEmbed()
.setTitle('Invalid usage.')
.setColor(colors.red)
.setDescription(`Invalid command usage, try using it like: \n \`${pre3}warn [member] (optional reason)\` \n \n Arguments: \n \`member\`: User mention (@User) \n \`reason\`: Text (may include spaces)`)

        if(!member) return message.channel.send(embed).then(msg => {
            db.set(`warn_id-${msg.guild.id}`, msg.id)
        })
        
    let warnDoc = await warnModel.findOne({
        guildID: message.guild.id,
        memberID: member.id,
    })




let reason = args.slice(1).join(' ')
if(!reason){
    reason = 'No reason provided'
}



if(member.id == message.author.id) return message.reply('Sorry but you can\'t warn yourself.')

if(member.id == client_id()) return message.channel.send('You can\'t warn me!')


    if (!warnDoc) {
        warnDoc = new warnModel({
            guildID: message.guild.id,
            memberID: member.id,
            warnings: [reason],
            moderator: [message.member.id],
            date: [Date.now()],
        })

        await warnDoc.save().catch(err => console.log(err))
    }
    else {
        if (warnDoc.warnings.length >= 3) {
            return message.channel.send(new Discord.MessageEmbed()
                .setAuthor('Error 403', message.author.avatarURL())
                .setDescription('You can\'t warn this member as they already have 3 warnings.')
                .setColor(colors.red))
        }


        warnDoc.warnings.push(reason)
        warnDoc.moderator.push(message.member.id)
        warnDoc.date.push(Date.now())

        await warnDoc.save().catch(err => console.log(err))
    }

message.channel.send(new MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.avatarURL())
        .addField("**Member**", `${member}`)
        .addField("**Action**", "Warn")
        .addField("**Reason**", `${reason ? `${reason}` : ''}`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp(message.createdAt)
        .setFooter("Druggy-commands")
        .setColor(colors.warn))

    }
    module.exports.main = {
        name: "warning",
        alias: "warn"
    }