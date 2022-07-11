const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageActionRow, MessageButton, Message, Discord, MessageEmbed, MessageSelectMenu, UserFlags } = require('discord.js');
const { Permissions } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
    .setName('challenges')
	.setDescription('Challenge Settings')
	.addBooleanOption(option => option.setName('challenge').setDescription('Send Challenge Completion Messages in this server').setRequired(true))
    .toJSON(),

    async execute(interaction, data, client, Discord, splashtext) {
        if(interaction.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR]) || interaction.member.permissions.has([Permissions.FLAGS.MANAGE_CHANNELS])){

            if(interaction.options.getBoolean(`challenge`) === true){
                data.write(`./data/guild/${interaction.guild.id}.json`, 'challengeMessages', 'true')
                interaction.reply(`<:checkmark:994105025292943390> *Xero will now send Challenge messages in this server!* <:checkmark:994105025292943390>`)
            }
            if(interaction.options.getBoolean(`challenge`) === false){
                data.write(`./data/guild/${interaction.guild.id}.json`, 'challengeMessages', 'false')
                interaction.reply(`<:checkmark:994105025292943390> *Xero will no longer send Challenge messages in this server!* <:checkmark:994105025292943390>`)
            }

        } else {
            return interaction.reply(`<:xmark:994105062353817682> *You do not have permission to make this change!* <:xmark:994105062353817682>`)
        }
    }
}