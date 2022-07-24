const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Basic ping command'),
	async execute(interaction, data, client, Discord) {
		const sent = await interaction.reply({ content: '<a:typing:1000730579542736927> *Solace is thinking* <a:typing:1000730579542736927>', fetchReply: true});
		sent.edit(`**Ping: *${sent.createdTimestamp - interaction.createdTimestamp}ms***`);
	}
}