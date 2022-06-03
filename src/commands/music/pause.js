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
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("There are no songs in the queue")

		queue.setPaused(true)
        await interaction.editReply("Paused! :pause_button:")
	},
}