const { Discord, login, client, ready, MessageEmbed, ms, db } = require('../discord/main.js')
const colors = require('../discord/c/colors.json')
const prefix = require('../discord/schema/prefix.js')
const muteModel = require('../discord/schema/mute.js')
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

 const mentionedMember = message.mentions.members.first()
        || message.guild.members.cache.get(args[0])

message.reply('SOON').then(msg => {
            db.set(`unmute_id-${msg.guild.id}`, msg.id)
        })
  }

module.exports.main = {
  name: "unmute"
}