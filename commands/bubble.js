const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Message, Discord, MessageEmbed } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('bubble')
		.setDescription('Play with bubble wrap!'),
	async execute(interaction, data) {
        var embed = new MessageEmbed()
        .setTitle('Bubble wrap!')
        .setColor("RANDOM")
        .setDescription('||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||\n||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||\n||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||\n||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||\n||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||\n||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||\n||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||\n||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||\n||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||\n||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||')
        .setFooter({ text: 'Xero', iconURL: client.user.avatarURL() });
    await interaction.reply({embeds:[embed]})
    }
}