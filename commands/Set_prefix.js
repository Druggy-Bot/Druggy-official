const { Discord, login, client, ready, db } = require('../discord/main.js')
const prefixModel = require('../discord/schema/prefix.js')
module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("**"+message.author.username + "**, you can't use that.");
 const data = await prefixModel.findOne({
        GuildID: message.guild.id
    });

    if (!args[0]) return message.channel.send('You must provide a **new prefix**!');

    if (args[0].length > 5) return message.channel.send('Your new prefix must be under \`5\` characters!')

    if (data) {
        await prefixModel.findOneAndRemove({
            GuildID: message.guild.id
        })
        
        message.channel.send(`The new prefix is now **\`${args[0]}\`**`).then(msg => {
            db.set(`prefix_id-${msg.guild.id}`, msg.id)
        })

        let newData = new prefixModel({
            Prefix: args[0],
            GuildID: message.guild.id
        })
        newData.save();
    } else if (!data) {
        message.channel.send(`The new prefix is now **\`${args[0]}\`**`).then(msg => {
            db.set(`prefix_id-${msg.guild.id}`, msg.id)
        })

        let newData = new prefixModel({
            Prefix: args[0],
            GuildID: message.guild.id
        })
        newData.save();
    }
    }
    module.exports.main = {
    name: "prefix",
    alias: "set-prefix"
}