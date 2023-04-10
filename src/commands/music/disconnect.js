const { SlashCommandBuilder } = require('@discordjs/builders');
const { voice } = require('@discordjs/voice')
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

	error: true,
	execute: async ({ interaction, client }) => {
        if(!interaction.guild.me.voice.channel) return interaction.editReply("I'm not currently in a voice channel.");
		const queue = await player.nodes.create(interaction.guild)
        queue.destroy()
        
       await interaction.editReply('Disconnected :thumbsup:');

	},
};
