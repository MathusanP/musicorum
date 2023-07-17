const { EmbedBuilder, SlashCommandBuilder } = require("discord.js")

module.exports = {
	name: 'skip',
	description: 'Skips the currently playing song to the next in queue',
	usage: '',

	permissions: [],
	ownerOnly: false,
	guildOnly: true,

    error: true,
    
    data: new SlashCommandBuilder().setName("skip").setDescription("Skips the current song"),
    execute: async ({ client, interaction }) => {
        const queue = await player.nodes.create(interaction.guild)
    
        if (!queue) return await interaction.followUp("There are no songs in the queue")
    
        const currentSong = queue.current
    
        queue.skip()
        await interaction.followUp({
            embeds: [
                new EmbedBuilder().setDescription(`${currentSong.title} has been skipped!`).setThumbnail(currentSong.thumbnail)
            ]
        })
    },
}