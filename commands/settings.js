const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Message, Discord, MessageEmbed } = require('discord.js');
const { Permissions } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
    .setName('settings')
	.setDescription('settings')
    .addChannelOption(option => option.setName('poll').setDescription('Polls channel (Requires Admin)'))
	.addChannelOption(option => option.setName('counting').setDescription('Counting channel (Requires Admin)'))
    .addChannelOption(option => option.setName('level-up').setDescription('Level-Up channel (Requires Admin)'))
    .toJSON(),

    async execute(interaction, data, client) {
        try {
            if(interaction.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR]) || interaction.member.permissions.has([Permissions.FLAGS.MANAGE_CHANNELS])){
        if(interaction.options.getChannel(`poll`)){
            data(`write`, `guild`, interaction.guild.id, `pollChannel`, interaction.options.getChannel(`poll`).id.toString())
            client.channels.cache.get(interaction.options.getChannel(`poll`).id.toString()).send(`This channel is now polls channel!`)
        }
        if(interaction.options.getChannel(`level-up`)){
            data(`write`, `guild`, interaction.guild.id, `levelChannel`, interaction.options.getChannel(`level-up`).id.toString())
            client.channels.cache.get(interaction.options.getChannel(`level-up`).id.toString()).send(`This channel is now the level-up channel!`)
        }
        if(interaction.options.getChannel(`counting`)){
            var counting = ""
            if(data(`read`, `guild`, interaction.guild.id, `countingChannel`) != false && data(`read`, `guild`, interaction.guild.id, `countingChannel`) != `NaN`){
            counting = data(`read`, `guild`, interaction.guild.id, `countingChannel`).toString()
            }
            data(`write`, `guild`, interaction.guild.id, `countingChannel`, interaction.options.getChannel(`counting`).id.toString())
            data(`write`, `guild`, interaction.guild.id, `countingNumber`, '0')
            try {
            client.channels.cache.get(counting).send(`This channel is no longer the counting channel, the new one is <#${interaction.options.getChannel(`counting`).id}>`)
            } catch{
                
            }
            var val = parseInt(data(`read`, `guild`, interaction.guild.id, `countingNumber`)) + 1
            client.channels.cache.get(interaction.options.getChannel(`counting`).id.toString()).send(`This channel is now the counting channel! the next number is: **` + val + `**`)
        } } else {
            interaction.reply(`You do not have admin!`)
        }
        interaction.reply(`Settings updated!`)
    } catch(err) {
        console.log(err)
        interaction.reply(`There was an error updating the settings!`)
    }
    }
}