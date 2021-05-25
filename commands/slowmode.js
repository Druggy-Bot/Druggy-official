const { Discord, login, client, ready, MessageEmbed, ms, db } = require('../discord/main.js')
module.exports.run = async (bot, message, args) => { 
  if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("**"+message.author.username + "**, you can't use that.");

  if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Well i can't do this please allow me to manage channels.");

        if (!args[0]) return message.channel.send('You did not specify a time!')

        const currentCooldown = message.channel.rateLimitPerUser;

        const embed = new MessageEmbed()
            .setFooter(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }));

        if (args[0] === "off") {
            if (currentCooldown === 0) return message.channel.send('Channel cooldown is already off')

          const embed2 = new MessageEmbed()
            embed2.setThumbnail(message.author.displayAvatarURL())
            embed2.setTitle('Slowmode Disabled')
               embed2.setColor('#00ff00')
                   .setFooter(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }));
            message.channel.setRateLimitPerUser(0)

           return message.channel.send(embed2).then(msg => {
            db.set(`slow_id-${msg.guild.id}`, msg.id)
        })

        }

        const time = ms(args[0]) / 1000;

        if (isNaN(time)) return message.channel.send('not a valid time, please try again!')

        if (time >= 21600) return message.channel.send('That slowmode limit is too high, please enter anything lower than 6 hours.')

        if (currentCooldown === time) return message.channel.send(`Slowmode is already set to ${args[0]}`);

        embed.setTitle('Slowmode Enabled')
         .setThumbnail(message.author.displayAvatarURL())
            .addField('Slowmode: ', args[0])
            .setColor('RANDOM');

        message.channel.setRateLimitPerUser(time).then(m => m.send(embed)).then(msg => {
            db.set(`slow_id-${msg.guild.id}`, msg.id)
        })

    }

    module.exports.main = {
    name: "slowmode"
}