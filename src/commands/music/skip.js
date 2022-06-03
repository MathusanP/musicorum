const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require("discord.js")

module.exports = {
	name: 'skip',
	description: 'Skips the currently playing song to the next in queue',
	usage: '',

	permissions: [],
	ownerOnly: false,
	guildOnly: true,

    data: new SlashCommandBuilder().setName("skip").setDescription("Skips the current song"),
    execute: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId)
    
        if (!queue) return await interaction.editReply("There are no songs in the queue")
    
        const currentSong = queue.current
    
        queue.skip()
        await interaction.editReply({
            embeds: [
                new MessageEmbed().setDescription(`${currentSong.title} has been skipped!`).setThumbnail(currentSong.thumbnail)
            ]
        })
    },
}