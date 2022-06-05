const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: 'disconnect',
	description: 'Disconnects the bot from the active voice channel.',
	usage: '',

	permissions: ['Move members'],
	ownerOnly: false,
	guildOnly: true,

	data: new SlashCommandBuilder()
		.setName('disconnect')
		.setDescription('Disconnects the bot from the active voice channel.'),

	error: false,
	execute: ({ interaction, client }) => {
        if(!interaction.guild.me.voice.channel) return interaction.followUp("I'm not currently in a voice channel.");
		const queue = client.player.getQueue(interaction.guildId)
        queue.destroy()
        
        interaction.followUp('Disconnected :thumbsup:');

	},
};