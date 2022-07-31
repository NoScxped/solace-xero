const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Message, Discord, MessageEmbed } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('splash')
		.setDescription('Get a random splash text'),
	async execute(interaction, data, client, Discord, splashtext) {
        var embed = new MessageEmbed()
        .setColor("a6dced")
        .setFooter({ text: splashtext.toString(), iconURL: client.user.avatarURL() });
        
        interaction.reply({embeds: [embed]})
    }
}