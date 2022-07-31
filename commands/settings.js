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
            .setName('counting')
            .setDescription('Set the Counting Channel')
            .addChannelOption(option => option.setName('channel').setDescription('Counting Channel').setRequired(true)))
    .toJSON(),

    async execute(interaction, data, client, Discord, splashtext) {
        
        if(interaction.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR]) || interaction.member.permissions.has([Permissions.FLAGS.MANAGE_CHANNELS])){

        if(interaction.options.getSubcommand() === 'challenges'){

            if(interaction.options.getBoolean(`challenges`) === true){

                data.write(`./data/guild/${interaction.guild.id}.json`, 'challengeMessages', 'true')
                interaction.reply(`<:checkmark:1000737491621523488> *Solace will now send Challenge messages in this server!* <:checkmark:1000737491621523488>`)

            }

            if (interaction.options.getBoolean(`challenges`) === false){

                data.write(`./data/guild/${interaction.guild.id}.json`, 'challengeMessages', 'false')
                interaction.reply(`<:checkmark:1000737491621523488> *Solace will no longer send Challenge messages in this server!* <:checkmark:1000737491621523488>`)

            }
        }

        if(interaction.options.getSubcommand() === 'levelup'){

            if(interaction.options.getBoolean(`levelup`) === true){

                data.write(`./data/guild/${interaction.guild.id}.json`, 'levelMessages', 'true')
                interaction.reply(`<:checkmark:1000737491621523488> *Solace will now send Level-Up messages in this server!* <:checkmark:1000737491621523488>`)

            }
            if (interaction.options.getBoolean(`levelup`) === false){

                data.write(`./data/guild/${interaction.guild.id}.json`, 'levelMessages', 'false')
                interaction.reply(`<:checkmark:1000737491621523488> *Solace will no longer send Level-Up messages in this server!* <:checkmark:1000737491621523488>`)

            }
        }

        if(interaction.options.getSubcommand() === 'counting'){


                data.write(`./data/guild/${interaction.guild.id}.json`, 'countingChannel', interaction.options.getChannel('channel').id.toString())
                data.write(`./data/guild/${interaction.guild.id}.json`, 'countingNumber', `0`)
                data.delete(`./data/guild/${interaction.guild.id}.json`, 'lastCountingId')
                
                interaction.reply(`<:checkmark:1000737491621523488> *Counting Channel updated to ${interaction.options.getChannel('channel')}! The next number is **1**!* <:checkmark:1000737491621523488>`)

        }


        } else {
            return interaction.reply(`<:xmark:994105062353817682> *You do not have permission to make this change!* <:xmark:994105062353817682>`)
        }
    }
}