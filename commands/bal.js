const { Discord, login, client, ready, reply, MessageEmbed, db } = require('../discord/main.js')
    module.exports.run = async (bot, message, args) => {
        let user = message.mentions.members.first()
        
        if(user){
                if(user.user.bot) return message.reply('The user can\'t be a bot.')
        } else {
            
    

        let money;
        if(user){
money = await db.get(`money-${message.guild.id}-${user.id}`)
        } else {
            money = await db.get(`money-${message.guild.id}-${message.author.id}`)
        }

let username;
let icon;
if(!user){
    icon = message.author.displayAvatarURL({ dynamic: true })
    username = message.author.username
} else if(user) {
    username = user.user.username
    icon = user.user.displayAvatarURL({ dynamic: true })
}

if(money == null){
    money = 0
}
let net = money

let embed = new MessageEmbed()
.setAuthor(username + '\'s balance', icon)
.setColor('BLUE')
.addField(`Money: `, `${money} 💵`, true)
.addField(`Net Worth: `, `${net} 💳`, true)
message.channel.send(embed).then(msg => {
            db.set(`bal_id-${msg.guild.id}`, msg.id)
        })
        }
    }  
        module.exports.main = {
        name: "bal",
        alias: "balance"
    }