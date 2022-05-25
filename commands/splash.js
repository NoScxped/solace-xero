const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Message, Discord, MessageEmbed } = require('discord.js');
//idk why this is a function i wrote this at midnight i couldve just done command.name.charAt(0).toUpperCase() + command.name.slice(1) but itll be ok trust the process
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
module.exports = {
	data: new SlashCommandBuilder()
		.setName('splash')
		.setDescription('Get a random splash text'),
	async execute(interaction, data, client, Discord, splashtext) {
        var embed = new MessageEmbed()
        .setColor("RANDOM")
        .setFooter({ text: splashtext.toString(), iconURL: client.user.avatarURL() });
        
        interaction.reply({embeds: [embed]})
    }
}