const path = require('path')
const fs = require ('fs')
const Discord = require("discord.js")
const bot = new Discord.Client()
const {prefix,token} = require("./botconfig.json")
bot.commands = new Discord.Collection();
const command = require('./Commands')

bot.on("ready", () => {
    console.log(`musicorum has started, with ${bot.users.cache.size} users, in ${bot.channels.cache.size} channels of ${bot.guilds.cache.size} guilds.`);
    bot.user.setActivity(`Version: Beta | £help`);
  });


bot.login(token)

	partials: ['MESSAGE', 'CHANNEL', 'REACTION']

const config = require('./botconfig.json');
const { loadCommands } = require('./utils/loadCommands');
const DisTube = require('distube')

bot.distube = new DisTube(bot, { searchSongs: false, emitNewSongOnly: true });
bot.distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`
	))
	.on("addSong", (message, queue, song) => message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))

require('./utils/loadEvents')(bot);

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

loadCommands(bot);

bot.login(token)

command(bot, 'help', (message) => {

    const embed = new Discord.MessageEmbed()
      .setTitle('Here are the list of current commands!')
      .setFooter('This bot is in beta more commands are yet to be added!')
      .setColor('#eb8d71')
      .addFields(
        {
          name: '£helpmusic',
          value: 'Displays the list of music commands',
          inline: true,
        },
    
      )
    message.channel.send(embed)
  })


bot.login(token)



command(bot, 'helpmusic', (message) => {

    const embed = new Discord.MessageEmbed()
      .setTitle('Here are the list of current music commands!')
      .setFooter('Music brought to you by distube!')
      .setColor('#e60742')
      .addFields(
        {
          name: '£play (or"£p")',
          value: 'Plays a requested song',
          inline: true,
        },
     {
         name: '£disconnect',
         value: 'Stops and disconnects the bot',
         inline: true,
     
     },
      
      {
          name: '£skip',
          value: 'Skips the current song, if no song is playing the bot will choose a similar song from the last played song to play',
          inline: true
      }     
          )
    message.channel.send(embed)
  })


bot.login(token)


bot.login(token)




bot.on("guildDelete", guild => {

  bot.users.fetch('315393628891512832').then((user) => {
    user.send(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});
})

bot.login(token)

bot.on("guildCreate", guild => {
  bot.users.fetch('315393628891512832').then((user) => {
    user.send(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
})
})



bot.on('message', async msg => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  const args = msg.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();

 
  if (command === "ping") {
      const pingEmbed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle('Pong!')
      .addField('Latency', (`${Date.now() - msg.createdTimestamp}ms`), true)
      .addField('API Latency', (`${Math.round(bot.ws.ping)}ms`), true)
  
      msg.channel.send(pingEmbed);
  process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));
  }})
bot.login(token)