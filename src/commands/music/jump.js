const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'jump',
	description: 'Jump to a specific song in the queue',
	usage: '<song_number>',

	permissions: [],
	ownerOnly: false,
	guildOnly: true,

	data: new SlashCommandBuilder()
		.setName('jump')
		.setDescription('Jump to a specific song in the queue')
		.addNumberOption((option) => option 
		.setName('tracknumber')
		.setDescription('The song you want to skip to')
		.setMinValue(1)
		.setRequired(true)),

	error: false,
	execute: async ({ guild, interaction, client }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("There are no songs in the queue.")

        const trackNum = interaction.options.getNumber("tracknumber")
        if (trackNum > queue.tracks.length)
            return await interaction.editReply("I couldn't find that track number in the queue, please make sure you've typed in the correct number.")
		queue.skipTo(trackNum - 1)

        await interaction.editReply(`Skipped ahead to track number **${trackNum}**.`)
	},
}