const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
	name: 'pause',
	description: 'Pauses the currently playing song',
	usage: '',

	permissions: [],
	ownerOnly: false,
	guildOnly: true,

	data: new SlashCommandBuilder().setName("pause").setDescription("Pauses the music currently playing."),
	execute: async ({ client, interaction }) => {
		const queue = await player.nodes.create(interaction.guild)

		if (!queue) return await interaction.deferReply("There are no songs in the queue")

		queue.setPaused(true)
        await interaction.followUp("Paused! :pause_button:")
	},
}