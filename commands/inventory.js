const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Message, Discord, MessageEmbed } = require('discord.js');
//idk why this is a function i wrote this at midnight i couldve just done command.name.charAt(0).toUpperCase() + command.name.slice(1) but itll be ok trust the process
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
module.exports = {
	data: new SlashCommandBuilder()
		.setName('inventory')
		.setDescription('View what items you have'),
	async execute(interaction, data, client, Discord, splashtext) {
        var saves = "None"
        if(data(`read`, `user`, interaction.user.id, `save`) != false || data(`read`, `user`, interaction.user.id, `save`) != "NaN"){
            if(parseInt(data(`read`, `user`, interaction.user.id, `save`)) != 0){
                var saves = data(`read`, `user`, interaction.user.id, `save`)
            }
        }
            var embed = new MessageEmbed()
        .setTitle("Inventory")
        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL(), url: interaction.user.avatarURL() })
        .setColor("RANDOM")
        .addField(`Saves`, saves.toString())
        .setFooter({ text: splashtext, iconURL: client.user.avatarURL() });
        
        interaction.reply({embeds: [embed]})
        
        
    }
}