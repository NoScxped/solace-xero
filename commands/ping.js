const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Message } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Basic ping command'),
	async execute(interaction, data, client, Discord) {
		const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
		sent.edit(`**Ping: *${sent.createdTimestamp - interaction.createdTimestamp}ms***`);
	}
}