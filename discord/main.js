const Discord = require("discord.js");
const client = new Discord.Client()
const { MessageEmbed } = require('discord.js')
const mongoose = require('mongoose');
const DisTube = require('distube')
const Database = require("@replit/database")
const db = new Database()
const ms = require('ms')
const Levels = require('hive-xp');
const { time } = require('console');
const { GiveawayCreator  } = require('discord-giveaways');




 const ms2 = require('parse-ms');


function Shell(Command, Find){
console.log(Command + " " + Find)
}


function client_id(){
    return client.user.id
}


function mongodb_connect(db_url){
    mongoose.connect(db_url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    findOneAndDelete: false,
    findOneAndUpdate: false
})
}


function login(token){
client.login(process.env.token)
}


function err(error){
    throw new Error(error)
}

function ready(msg, name, type, bott){
    client.on('ready', () => {

     db.get("restart").then(value => {
      if (value) {
        var mssg = value.msg
        if (!mssg) return
        var tago = (Date.now() - value.ts) / 1000
        client.channels.fetch(mssg.channelID)
          .then(channel => {
            if (channel) {
              channel.messages.fetch(mssg.id)
                .then(msg => {
                    var emoji = client.emojis.cache.get('805539352179638292')
                  msg.edit(`${bott} ${emoji} (${tago} seconds)`)
                  db.delete("restart").then(() => {});
                })
            }
          })
      }
    });

        let msg3 = ''
        if(msg.includes('${bot-tag}')){
            let msg5 = msg.replace("${guilds-size}", client.user.tag)
            let msg2 = msg.replace("${bot-tag}", client.user.tag)
            let msg3 = msg2.replace("${guilds-size}", client.guilds.cache.size)
            console.log(msg3)
        } else {
    console.log(msg)
        }


   client.user.setPresence({
    activity: {
        name: name,
        type: type,
    }
})
})
}

function reply(msg, message){
    message.reply(msg)
}

module.exports = {
    Discord,
    client,
    login,
    ready,
    err,
    Shell,
    mongodb_connect,
    DisTube,
    client_id,
    MessageEmbed,
    ms,
    time,
    reply,
    db,
    ms2
}