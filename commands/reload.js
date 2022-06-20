const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Message, Discord, MessageEmbed } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Reload Commands (Dev only)'),
	async execute(interaction, data, client, Discord, splashtext, loadCommands) {
        if(interaction.user.id === "711952161088471061" || interaction.user.id === "579483193665781770"){
            try {
                loadCommands()
                interaction.reply({content: "Reloaded commands", ephemeral: true})
            } catch(err){
                interaction.reply({content: "Failed to reload commands!", ephemeral: true})
            }
        } else {
            interaction.reply({content: "Your are not a developer, therefore you cannot reload commands!", ephemeral: true})
        }
    }
}