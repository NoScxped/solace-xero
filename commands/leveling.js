const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageActionRow, MessageButton, Message, Discord, MessageEmbed, MessageSelectMenu, UserFlags } = require('discord.js');
const { Permissions } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
    .setName('leveling')
	.setDescription('Leveling Settings')
	.addBooleanOption(option => option.setName('levelup').setDescription('Send Level Up Messages in this server').setRequired(true))
    .toJSON(),

    async execute(interaction, data, client, Discord, splashtext) {
        if(interaction.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR]) || interaction.member.permissions.has([Permissions.FLAGS.MANAGE_CHANNELS])){

            if(interaction.options.getBoolean(`levelup`) === true){
                data.write(`./data/guild/${interaction.guild.id}.json`, 'levelMessages', 'true')
                interaction.reply(`<:checkmark:994105025292943390> *Xero will now send Level-Up messages in this server!* <:checkmark:994105025292943390>`)
            }
            if(interaction.options.getBoolean(`levelup`) === false){
                data.write(`./data/guild/${interaction.guild.id}.json`, 'levelMessages', 'false')
                interaction.reply(`<:checkmark:994105025292943390> *Xero will no longer send Level-Up messages in this server!* <:checkmark:994105025292943390>`)
            }

        } else {
            return interaction.reply(`<:xmark:994105062353817682> *You do not have permission to make this change!* <:xmark:994105062353817682>`)
        }
    }
}