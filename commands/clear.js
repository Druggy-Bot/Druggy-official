const { Discord, login, client, ready, db } = require('../discord/main.js')
module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("**"+message.author.username + "**, you can't use that.");
        if (!args[0]) {
            return message.channel.send(`Please enter a amount 1 to 100`)
        }

        let deleteAmount;

        if (parseInt(args[0]) > 100 ) {
            deleteAmount = 100;
                    } else {
            deleteAmount = parseInt(args[0]);
               if(deleteAmount == '1'){
                message.delete()
                return
            }
        }

        message.channel.bulkDelete(deleteAmount);

        const embed = new Discord.MessageEmbed()
            .setTitle(`${message.author.username}`)
            .setThumbnail(message.author.displayAvatarURL())
            .setDescription(`successfully deleted ${deleteAmount}`)
            .setFooter(message.author.username, message.author.displayAvatarURL())
            .setColor('#f2f2f2')
        await message.channel.send(embed).then(msg => {
            msg.delete()
        })
}

module.exports.main = {
    name: "clear",
    purge: "purge"
}