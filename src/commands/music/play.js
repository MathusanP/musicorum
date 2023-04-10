const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const { QueryType, useMasterPlayer } = require("discord-player")

module.exports = {
    name: 'play',
	description: 'Plays a song',
	usage: '',

	permissions: [],
	ownerOnly: false,
	guildOnly: true,
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("loads songs from youtube")
		.addSubcommand((subcommand) =>
			subcommand
				.setName("song")
				.setDescription("Loads a single song from a url")
				.addStringOption((option) => option.setName("url").setDescription("the song's url").setRequired(true))
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("playlist")
				.setDescription("Loads a playlist of songs from a url")
				.addStringOption((option) => option.setName("url").setDescription("the playlist's url").setRequired(true))
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("search")
				.setDescription("Uses your search query to find a song.")
				.addStringOption((option) =>
					option.setName("query").setDescription("Enter your serach query").setRequired(true)
				)
		),
	execute: async ({ client, interaction }) => {
        if (!interaction.member.voice.channel) return await interaction.followUp("You need to be in a VC to use this command")
		const player = useMasterPlayer()
        const queue = await player.nodes.create(interaction.guild)
		if (!queue.connection) await queue.connect(interaction.member.voice.channel)

		let embed = new EmbedBuilder()

		if (interaction.options.getSubcommand() === "song") {
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_VIDEO
            })
            if (result.tracks.length === 0)
                return await interaction.editReply("I couldn't find that song, please make sure the url you have provided is correct.")
            
            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Duration: ${song.duration}`})

		} else if (interaction.options.getSubcommand() === "playlist") {
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_PLAYLIST
            })

            if (result.tracks.length === 0)
                return await interaction.editReply("I could not find that playlist, please ensure that you have provided the correct url.")
            
            const playlist = result.playlist
            await queue.addTracks(result.tracks)
            embed
                .setDescription(`**${result.tracks.length} songs from [${playlist.title}](${playlist.url})** have been added to the Queue`)
                .setThumbnail(playlist.thumbnail)
		} else if (interaction.options.getSubcommand() === "search") {
            let url = interaction.options.getString("query")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })

            if (result.tracks.length === 0)
                return await interaction.editReply("No results, please ensure that you have provided the correct key words in your query.")
            
            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
                .setColor(`#830691`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Duration: ${song.duration}`})
		}
        if (!queue.playing) await queue.node.play()
        await interaction.followUp({
            embeds: [embed]
        })
	},
}