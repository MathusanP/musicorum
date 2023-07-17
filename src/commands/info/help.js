const { EmbedBuilder, SlashCommandBuilder, ButtonBuilder, ButtonStyle,  ActionRowBuilder } = require('discord.js');
const { readdirSync } = require('fs');

module.exports = {
	name: 'help',
	description: 'Provides a list of all my commands!',
	usage: '[command]',

	permissions: [],
	ownerOnly: false,
	guildOnly: false,

	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Provides a list of all my commands!')
		.addStringOption(option => option
			.setName('command')
			.setDescription('Shows details about how to use a command')
			.setRequired(false),
		),

	error: false,
	execute: async ({ interaction, client }) => {

		const cmdName = interaction.options.getString('command');
		const cmd = client.commands.get(cmdName);

		if (cmd) {

			const embed = new EmbedBuilder()
				.setColor('#830691')
				.setTitle(cmd.name.charAt(0).toUpperCase() + cmd.name.slice(1) + ' Command')
				.setURL('https://discord.com/api/oauth2/authorize?client_id=815216273294229504&permissions=8&scope=bot+applications.commands')
				.setDescription(cmd.description)
				.setTimestamp();

			embed.addFields({name: '__Usage:__', value: '/' + cmd.name + (cmd.usage ? ' ' + cmd.usage : ''), inline: false});

			if (cmd.permissions[0] && cmd.ownerOnly == false) {
				embed.addFields({name: '__Permissions:__', value: '`' + cmd.permissions.join('` `') + '`', inline: false});
			}
			if (!cmd.permissions[0] && cmd.ownerOnly == true) {
				embed.addFields({name: '__Permissions:__', value: '**Server Owner Only**', inline: false});
			}
			if (cmd.error == true) {
				embed.addField({name: '__Error:__', value: 'This command is currently unavailable, please try again later.', inline: false});
			}

			interaction.followUp({ embeds: [embed], ephemeral: false });

		}
		else {

			const embed = new EmbedBuilder()
				.setColor('#830691')
				.setTitle(client.user.username + ' Commands')
				.setURL('https://discord.com/api/oauth2/authorize?client_id=815216273294229504&permissions=8&scope=bot+applications.commands')
				.setDescription('To view the information about a certain command\ndo `/help <command>`.')
				.setThumbnail(client.user.displayAvatarURL())
				.setTimestamp();

			for (const category of ['music', 'info', 'test', 'support']) {
				let description = '';

				const commandFiles = readdirSync(__dirname + '/../../commands/' + category).filter(file => file.endsWith('.js'));
				for (const file of commandFiles) {
					const command = require(`${__dirname}/../../commands/${category}/${file}`);
					description += `/${command.name}${command.usage ? ` ${command.usage}` : ''}\n`;
				}

				embed.addFields({ name: `__${category.charAt(0).toUpperCase() + category.slice(1)}__`, value: description, inline: false});
			}

			const row = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setStyle(ButtonStyle.Link).setLabel('Support Server').setURL('https://discord.gg/GX4Sz9RZew'),
					new ButtonBuilder()
						.setStyle(ButtonStyle.Link).setLabel('Invite').setURL('https://discord.com/api/oauth2/authorize?client_id=815216273294229504&permissions=8&scope=bot+applications.commands'),
		
				);

			interaction.followUp({ embeds: [embed], components: [row], ephemeral: false });

		}

	},
};
