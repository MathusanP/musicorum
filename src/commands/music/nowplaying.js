const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'nowplaying',
	description: 'Shows the song that is currently playing',
	usage: '',

	permissions: [],
	ownerOnly: false,
	guildOnly: true,

        data: new SlashCommandBuilder().setName("nowplaying").setDescription("Shows info about the song currently playing"),
        execute: async ({ client, interaction }) => {
            const queue = await player.nodes.create(interaction.guild)
    
            if (!queue) return await interaction.followUp("There are no songs in the queue")
    
            let bar = queue.createProgressBar({
                queue: false,
                length: 19,
            })
    
            const song = queue.current
    
            await interaction.followUp({
                embeds: [new MessageEmbed()
                .setThumbnail(song.thumbnail)
                .setDescription(`Currently Playing [${song.title}](${song.url})\n\n` + bar)
                .setColor(`#830691`)    
            ],
            })
        },
    }