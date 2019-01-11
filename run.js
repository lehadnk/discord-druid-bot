require('dotenv').config();
const Discord = require("discord.js");

let client = new Discord.Client();
client.login(process.env.BOT_TOKEN);

let last_tenor_time = 0;
let span = 1800 * 1000;

client.on('message', function(msg) {
    if (msg.content.match(/tenor.com.*$/)) {
        if (Date.now() - last_tenor_time < span) {
            msg.delete();
        } else {
            last_tenor_time = Date.now();
        }
    }
});