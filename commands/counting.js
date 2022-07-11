const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
    .setName('counting')
	.setDescription('Set a Counting Channel')
	.addSubcommand(subcommand =>
		subcommand
			.setName('channel')
			.setDescription('Set a counting Channel')
			.addChannelOption(option => option.setName('schannel').setDescription('Select a channel').setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
            .setName('remove')
            .setDescription('Remove Counting from your server')
            .addChannelOption(option => option.setName('rchannel').setDescription('Select a channel').setRequired(true)))
    .toJSON(),

    async execute(interaction, data, client, Discord, splashtext) {
        if(interaction.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR]) || interaction.member.permissions.has([Permissions.FLAGS.MANAGE_CHANNELS])){

        

        if(interaction.options.getSubcommand() === 'channel'){

            var channels = data.read(`./data/global/gbcounting.json`, `channels`).split(',')
            var servers = data.read(`./data/global/gbcounting.json`, `servers`).split(',')

            if(servers.includes(interaction.guild.id)){

                return interaction.reply('<:xmark:994105062353817682> *This server already has a Counting Channel!* <:xmark:994105062353817682>')

            }

            channels.push(interaction.options.getChannel(`schannel`).id.toString())
            servers.push(interaction.guild.id)

            data.write(`./data/global/gbcounting.json`, `channels`, channels.toString())
            data.write(`./data/global/gbcounting.json`, `servers`, servers.toString())

            await interaction.reply('<:checkmark:994105025292943390> *Updated Counting Channel!* <:checkmark:994105025292943390>')

            try {
                client.channels.cache.get(interaction.options.getChannel(`schannel`).id.toString()).send(`<:checkmark:994105025292943390> *This channel is now the Global Counting Channel!* <:checkmark:994105025292943390>`)

            } catch {

                console.log(`Error in trying to send setting update message`)

            }
        }

        if(interaction.options.getSubcommand() === 'remove'){

            var channels = data.read(`./data/global/gbcounting.json`, `channels`).split(',')
            var servers = data.read(`./data/global/gbcounting.json`, `servers`).split(',')

            if(!channels.includes(interaction.options.getChannel(`rchannel`).id)){

                return interaction.reply('<:xmark:994105062353817682> *This channel is not in Global Counting!* <:xmark:994105062353817682>')

            }

            servers = servers.filter(e => e !== interaction.guild.id);
            channels = channels.filter(e => e !== interaction.options.getChannel(`rchannel`).id);

            data.write(`./data/global/gbcounting.json`, `channels`, channels.toString())
            data.write(`./data/global/gbcounting.json`, `servers`, servers.toString())

            await interaction.reply('<:checkmark:994105025292943390> *Removed Global Counting from this Channel!* <:checkmark:994105025292943390>')

            try {
                client.channels.cache.get(interaction.options.getChannel(`rchannel`).id.toString()).send(`<:xmark:994105062353817682> *This channel is no longer the Global Counting Channel!* <:xmark:994105062353817682>`)

            } catch {

                console.log(`Error in trying to send setting update message`)

            }

        }
    } else {
        
        return interaction.reply(`<:xmark:994105062353817682> *You do not have permission to make this change!* <:xmark:994105062353817682>`)

    }
}
}