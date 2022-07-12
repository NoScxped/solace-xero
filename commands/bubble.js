const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('bubble')
		.setDescription('Play with bubble wrap!'),
	async execute(interaction, data, client, Discord, splashtext) {
        var embed = new MessageEmbed()
        .setTitle('『 Bubbles! 』')
        .setColor("RANDOM")
        .setDescription('||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||\n||o||||o||||o||||o||||o||||e||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||\n||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||n||||o||||o||||o||||o||||o||||o||||o||\n||o||||o||||o||||o||||o||||o||||a||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||\n||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||\n||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||\n||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||\n||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||\n||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||\n||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||||o||')
        .setFooter({ text: splashtext, iconURL: client.user.avatarURL() });
    await interaction.reply({embeds:[embed]})
    }
}