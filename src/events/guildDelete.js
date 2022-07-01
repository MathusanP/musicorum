module.exports = {
	name: 'guildDelete',
	once: false,
	execute: async (guild, client) => {

		client.channels.cache.get('935977503363858442').send({ content: `Left server: ${guild.name} (id: ${guild.id}). This server had ${guild.memberCount} members!)` });
	},
};