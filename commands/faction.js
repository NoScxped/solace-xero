const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Message, Discord, MessageEmbed } = require('discord.js');
const { Permissions } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
    .setName('faction')
	.setDescription('Xero Factions')
	.addSubcommand(subcommand =>
		subcommand
			.setName('create')
			.setDescription('Create a faction')
			.addStringOption(option => option.setName('name').setDescription('Faction Name')))
    .addSubcommand(subcommand =>
        subcommand
            .setName('delete')
            .setDescription('Delete your faction'))
    .addSubcommand(subcommand =>
        subcommand
            .setName('invite')
            .setDescription('Invite a user to your faction')
            .addUserOption(option => option.setName('user').setDescription('User')))
    .toJSON(),

    async execute(interaction, data, client, Discord, splashtext) {
        
    }
}