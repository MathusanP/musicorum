const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'shuffle',
    description: 'Shuffles the queue',
    usage: '',

    permissions: [],
    ownerOnly: false,
    guildOnly: true,

    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('Shuffles the queue.'),

    error: false,
    execute: async ({ client, interaction }) => {
        const queue = await player.nodes.create(interaction.guild)

        if (!queue) return await interaction.editReply("There are no songs in the queue")

        queue.shuffle()
        await interaction.editReply(`The queue has been shuffled!`)

    }
}