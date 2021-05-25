const { Discord, login, client, ready, db } = require('../discord/main.js')
const prefix = require('../discord/schema/prefix.js')
    module.exports.run = async (bot, message, args) => {
         	if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("**"+message.author.username + "**, you can't use that.");
             if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('Sorry ' + message.author + ' but i can not ban this user!')
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
let error = new Discord.MessageEmbed()
.setDescription(`You can't ban this user. \n Their roles are higher then yours.`)
let error2 = new Discord.MessageEmbed()
.setDescription(`I can't ban this user. \n Their roles are higher then mine.`)



        const member = message.mentions.members.first() 
let reason = args.slice(1).join(' ')
if(!reason){
    reason = 'No reason provided'
}

        let embed = new Discord.MessageEmbed()
.setTitle('Invalid usage.')
.setColor('RED')
.setDescription(`Invalid command usage, try using it like: \n \`${pre3}ban [member] (optional reason)\` \n \n Arguments: \n \`member\`: User mention (@User) \n \`reason\`: Text (may include spaces)`)

        if(!member) return message.channel.send(embed).then(msg => {
            db.set(`ban_id-${msg.guild.id}`, msg.id)
        })

if(message.mentions.members.first().roles.highest.position > message.guild.me.roles.highest.position)
    return message.channel.send(error2).then(msg => {
            db.set(`ban_id-${msg.guild.id}`, msg.id)
        })
   if(message.mentions.members.first().roles.highest.position > message.member.roles.highest.position || message.mentions.members.first().roles.highest.position === message.member.roles.highest.position)
    return message.channel.send(error).then(msg => {
            db.set(`ban_id-${msg.guild.id}`, msg.id)
        })


if(member.id == message.author.id) return message.reply('Sorry but you can\'t ban yourself.')

if(member.id == client_id()) return message.channel.send('You can\'t kick me!')

member.ban({reason})

let succ = new Discord.MessageEmbed()
.setAuthor(`${member.user.tag} has been banned`)
.setDescription('Reason: ' + reason)
.setFooter('Druggy-commands')
message.channel.send(succ)


    }
    module.exports.main = {
        name: "ban"
    }