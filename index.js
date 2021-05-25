const { Discord, login, client, ready, err, mongodb_connect, Shell, db, eco_connect } = require('./discord/main.js')
const alive = require('./discord/server.js')
const Levels = require('hive-xp');
 const fs = require("fs");
 const config = require('./config.json')

client.commands = new Discord.Collection()
client.alias = new Discord.Collection()

//connecting stuff
Levels.setURL(process.env.url);

mongodb_connect(process.env.url)

//Server
alive(3000, 'Working and started the server', 'Cummy')
//ready event

        const prefix = require('./discord/schema/prefix.js');

Shell('~/Druggy-rewritten$', 'Node .')
ready(
'Logged in as ${bot-tag}, and i am in ${guilds-size} servers', 
'Discontinued', 
"PLAYING",
"Bot done restarting"
)

//commands

let files = fs.readdirSync(__dirname+"/commands/");
let jsfile = files.filter(f => f.endsWith(".js"));
if(jsfile < 1) console.log("Commands not found.");
client.commands = [];
client.alias = [];
jsfile.forEach(f =>{
  let props = require(__dirname+`/commands/${f}`);
  client.commands.push(props);
  if(!client.alias){
      return;
  } else {
  client.alias.push(props);
  }

});




function cmd(pre, message){
    if(!pre) return;
    let commands = client.commands;
    let alias = client.alias;
    if(!alias){
        err('E')
        return;
    }
            let mycmd = message.content.startsWith(pre) ? message.content.replace(pre,"").split(" ")[0] : ""

          if(mycmd  && config.blacklisted.includes(message.author.id)){
    return message.reply('Your blacklisted if you think this is a mistake join https://discord.gg/MynKf9VsTt for support.')
    }
   

    let myargs = message.content.startsWith(pre) ? message.content.replace(pre+mycmd,"").replace(" ","").split(" ") : [];


     if(alias.some(i=> i.main.alias === mycmd.toLowerCase())) {
       
      alias.filter(i=> i.main.alias === mycmd.toLowerCase())[0].run(client,message,myargs);

    }
    if(commands.some(i=> i.main.name === mycmd.toLowerCase())) {

      commands.filter(i=> i.main.name === mycmd.toLowerCase())[0].run(client,message,myargs);
    }
    }




//.then(msg => {
          //  db.set(`av_id-${msg.guild.id}`, msg.id)
      //  })

//message
    client.on('message', async message => {
        if(message.author.bot) return;


    const data = await prefix.findOne({
        GuildID: message.guild.id
    });
    


let pre;
        if(data) {
        const prefix = data.Prefix;
        pre = prefix
cmd(prefix, message)
        } else if(!data){
        const prefix = "&";
        pre = prefix
cmd(prefix, message)
        }

if(message.content.startsWith('<@766719437092945981>')){
    message.reply('My prefix is: `' + pre + '`')
}
if(message.content.startsWith('<@!766719437092945981>')){
    message.reply('My prefix is: `' + pre + '`')
}

    })


function create(action){
client.on("emojiCreate", async function(emoji){
        let logs = emoji.guild.channels.cache.find((channel) => channel.name.includes('modlogs'))
        if(!logs) return;
    let embed = new Discord.MessageEmbed()
     .setTitle('Emoji added')
     .setColor('RANDOM')
     .addField('Emoji:', `${emoji.name}, ${emoji}`)
    logs.send(embed)
})
}
function delet(action){
client.on("emojiDelete", async function(emoji){
    let logs = emoji.guild.channels.cache.find((channel) => channel.name.includes('modlogs'))
    if(!logs) return;
    let embed = new Discord.MessageEmbed()
     .setTitle('Emoji Deleted')
     .setColor('RANDOM')
     .addField('Emoji:',` ${emoji.name}, ${emoji}`)
    logs.send(embed)
})
}
client.on('messageUpdate', async (oldMessage, newMessage) => {
    const data = await prefix.findOne({
        GuildID: oldMessage.guild.id
    });
    
    let pre;
        if(data) {
        const prefix = data.Prefix;
        pre = prefix
         cmd(pre, newMessage) 
                      let commands3 = ["av", "avatar", "bal", "balance", "ban", "kick", "lock", "mute", "ping", "pong", "poll", "set-prefix","prefix", "slowmode", "start", "unlock", "unmute", "warn", "warning", "warns", "warnings"]
         let random = Math.floor(Math.random() * commands3.length);
if(oldMessage == commands3[random]){

    console.log(commands3[random])
}
        } else if(!data){
        const prefix = "&";
        pre = prefix
         cmd(pre, newMessage) 
             let commands3 = ["av", "avatar", "bal", "balance", "ban", "kick", "lock", "mute", "ping", "pong", "poll", "set-prefix","prefix", "slowmode", "start", "unlock", "unmute", "warn", "warning", "warns", "warnings"]
         let random = Math.floor(Math.random() * commands3.length);
if(oldMessage == commands3[random]){

    console.log(commands3[random])
}
        }
})
//Modlogs
create()
delet()
login()