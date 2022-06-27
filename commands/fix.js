const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Message, Discord, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fix')
		.setDescription('Fix data for a user (Apollo Only)')
        .addUserOption(option=> option.setName(`user`).setDescription(`User to fix`).setRequired(true)),
	async execute(interaction, data, client, discord, splashtext) {

		
        if(interaction.user.id === '579483193665781770'){
            data('write', 'user', interaction.options.getUser('user').id, "xp", "0")
            data('write', 'user', interaction.options.getUser('user').id, "credits", "100")
            data('write', 'user', interaction.options.getUser('user').id, "pointsNeeded", "35")
            data('write', 'user', interaction.options.getUser('user').id, "level", "0")
            return interaction.reply(`Fixed data for ` + interaction.options.getUser('user').username)
        } else {
            return interaction.reply('You are not Apollo get good loser')
        }
	}
}