const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const axios = require("axios")

module.exports = {
    name: 'lyrics',
    description: 'Shows the lyrics to the song that is currently playing',
    usage: '',

    permissions: [],
    ownerOnly: false,
    guildOnly: true,

    error: true,
    data: new SlashCommandBuilder().setName("lyrics").setDescription("Shows the lyrics to the song that is currently playing."),
    execute: async ({ client, interaction }) => {
        function substring(length, value) {
            const replaced = value.replace(/\n/g, "--")
            const regex = `.{1,${length}}`
            const lines = replaced
                .match(new RegExp(regex, "g"))
                .map(line => line.replace('--', "\n"));
            return lines
        }

        const queue = client.player.getQueue(interaction.guildId)

        if (!queue) return await interaction.followUp("There are no songs in the queue")

        let bar = queue.createProgressBar({
            queue: false,
            length: 19,
        })

        const song = queue.current
        const url = new URL('https://some-random-api.ml/lyrics')
        url.searchParams.append('title', song.title)
        console.log(url);

        try {
            const { data } = await axios.get(url.href);
            const embeds = substring(4000, data.lyrics).map((value, index) => {
                const isFirst = index === 0;

                return new MessageEmbed({
                    title: isFirst ? `${data.title} - ${data.author}` : null,
                    thumbnail: isFirst ? data.thumbnail.genius : null,
                    description: value,
                })

            })
            return interaction.followUp({ embeds })
        } catch (err) {
            interaction.followUp({ content: 'I was unable to find the lyrics for that song.'})
        }
    }
}