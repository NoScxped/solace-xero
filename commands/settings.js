const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Message, Discord, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
    .setName('settings')
	.setDescription('settings')
    .addChannelOption(option => option.setName('poll').setDescription('Channel where polls go'))
	.addChannelOption(option => option.setName('counting').setDescription('Channel for counting'))
    .addChannelOption(option => option.setName('level-up').setDescription('Channel where level-ups are announced'))
    .toJSON(),

    async execute(interaction, data, client) {
        try {
        if(interaction.options.getChannel(`poll`)){
            data(`write`, `guild`, interaction.guild.id, `pollChannel`, interaction.options.getChannel(`poll`).id.toString())
            client.channels.cache.get(interaction.options.getChannel(`poll`).id.toString()).send(`This channel is now polls channel!`)
        }
        if(interaction.options.getChannel(`level-up`)){
            data(`write`, `guild`, interaction.guild.id, `levelChannel`, interaction.options.getChannel(`level-up`).id.toString())
            client.channels.cache.get(interaction.options.getChannel(`level-up`).id.toString()).send(`This channel is now the level-up channel!`)
        }
        if(interaction.options.getChannel(`counting`)){

            var counting = data(`read`, `guild`, interaction.guild.id, `countingChannel`).toString()
            data(`write`, `guild`, interaction.guild.id, `countingChannel`, interaction.options.getChannel(`counting`).id.toString())

            client.channels.cache.get(counting).send(`This channel is no longer the counting channel, the new one is <#${interaction.options.getChannel(`counting`).id}>`)
            var val = parseInt(data(`read`, `guild`, interaction.guild.id, `countingNumber`)) + 1
            client.channels.cache.get(interaction.options.getChannel(`counting`).id.toString()).send(`This channel is now the counting channel! the next number is: **` + val + `**`)
        }
        interaction.reply(`Settings updated!`)
    } catch(err) {
        console.log(err)
        interaction.reply(`There was an error updating the settings!`)
    }
    }
}