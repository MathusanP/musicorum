const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'loop',
    description: 'Loops the queue.',
    usage: '',

    permissions: [],
    ownerOnly: false,
    guildOnly: false,

    data: new SlashCommandBuilder()
        .setName('loop')
        .setDescription('Loops the current queue.')
        .addStringOption(option => option
            .setName('mode')
            .setRequired(true)
            .addChoices({ name: 'On', value: 'on' })
            .setDescription('Turn loop on')
            .addChoices({ name: 'Off', value: 'off' })
            .setDescription('Turn loop off')
        ),


    execute: async ({ guild, client, interaction }) => {
        let mode = false
        const queue = await player.nodes.create(interaction.guild)

        if (!queue) {
            await interaction.editReply("There is nothing playing in the queue...")
        }
        else {
            switch (interaction.options.getString("mode")) {
                case 'off':
                    mode = 0
                    setting = "off"
                    break
                case 'on':
                    mode = 1
                    setting = "on"
                    break
            }
            mode = queue.setRepeatMode(mode)
            mode = mode == 1 ? 'on' : 'off'
            await interaction.editReply(`Loop is set to **${setting}**. :infinity: `)
        }
    }
}
