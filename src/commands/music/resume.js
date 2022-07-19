const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
	name: 'resume',
	description: 'Resumes the paused song.',
	usage: '',

	permissions: [],
	ownerOnly: false,
	guildOnly: true,
	
    data: new SlashCommandBuilder().setName("resume").setDescription("Resumes the music"),
	    execute: async ({ client, interaction }) => {
		    const queue = client.player.getQueue(interaction.guildId)

		    if (!queue) return await interaction.followUp("There are no songs in the queue")

		    queue.setPaused(false)
            await interaction.followUp("Music has been resumed!")
	    },
}