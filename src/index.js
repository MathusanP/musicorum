const Discord = require('discord.js');
const { Player } = require("discord-player")
const client = new Discord.Client({
	intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_WEBHOOKS', 'GUILD_VOICE_STATES'],
});


const fs = require('fs');
const eventFiles = fs.readdirSync(`${__dirname}/events`).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`${__dirname}/events/${file}`);

	if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
	else client.on(event.name, (...args) => event.execute(...args, client));
}

client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
})
/*
require('dotenv').config();
client.login(process.env['Token']);
*/

client.login('NzM2NTQ3Mjc5MzIxNjk0MjA5.XxwZGw.Jkj4zjaFEeRjQXQyfZttMMWv5VU')