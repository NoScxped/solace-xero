const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
    .setName('settings')
	.setDescription('Change Settings')
	.addSubcommand(subcommand =>
		subcommand
			.setName('challenges')
			.setDescription('Toggle Challenge Messages')
			.addBooleanOption(option => option.setName('challenges').setDescription('Challenge Messages').setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
            .setName('levelup')
            .setDescription('Toggle Level-Up Messages')
            .addBooleanOption(option => option.setName('levelup').setDescription('Level Up Messages').setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
            .setName('tips')
            .setDescription('Toggle Tip Messages')
            .addBooleanOption(option => option.setName('tips').setDescription('Tip Messages').setRequired(true)))
    .toJSON(),

    async execute(interaction, data, client, Discord, splashtext) {
        
        if(interaction.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR]) || interaction.member.permissions.has([Permissions.FLAGS.MANAGE_CHANNELS])){

        if(interaction.options.getSubcommand() === 'challenges'){

            if(interaction.options.getBoolean(`challenges`) === true){

                data.write(`./data/guild/${interaction.guild.id}.json`, 'challengeMessages', 'true')
                interaction.reply(`<:checkmark:994105025292943390> *Xero will now send Challenge messages in this server!* <:checkmark:994105025292943390>`)

            }

            if (interaction.options.getBoolean(`challenges`) === false){

                data.write(`./data/guild/${interaction.guild.id}.json`, 'challengeMessages', 'false')
                interaction.reply(`<:checkmark:994105025292943390> *Xero will no longer send Challenge messages in this server!* <:checkmark:994105025292943390>`)

            }
        }

        if(interaction.options.getSubcommand() === 'levelup'){

            if(interaction.options.getBoolean(`levelup`) === true){

                data.write(`./data/guild/${interaction.guild.id}.json`, 'levelMessages', 'true')
                interaction.reply(`<:checkmark:994105025292943390> *Xero will now send Level-Up messages in this server!* <:checkmark:994105025292943390>`)

            }
            if (interaction.options.getBoolean(`levelup`) === false){

                data.write(`./data/guild/${interaction.guild.id}.json`, 'levelMessages', 'false')
                interaction.reply(`<:checkmark:994105025292943390> *Xero will no longer send Level-Up messages in this server!* <:checkmark:994105025292943390>`)

            }
        }

        if(interaction.options.getSubcommand() === 'tips'){

            if(interaction.options.getBoolean(`tips`) === true){

                data.write(`./data/guild/${interaction.guild.id}.json`, 'tipMessages', 'true')
                interaction.reply(`<:checkmark:994105025292943390> *Xero will now send Tips in this server!* <:checkmark:994105025292943390>`)

            }
            if (interaction.options.getBoolean(`tips`) === false){

                data.write(`./data/guild/${interaction.guild.id}.json`, 'tipMessages', 'false')
                interaction.reply(`<:checkmark:994105025292943390> *Xero will no longer send Tips in this server!* <:checkmark:994105025292943390>`)

            }

        }


        } else {
            return interaction.reply(`<:xmark:994105062353817682> *You do not have permission to make this change!* <:xmark:994105062353817682>`)
        }
    }
}