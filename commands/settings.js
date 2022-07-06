const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Message, Discord, MessageEmbed } = require('discord.js');
const { Permissions } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
    .setName('settings')
	.setDescription('settings')
    .addChannelOption(option => option.setName('poll').setDescription('Polls channel (Requires Admin)'))
    .addBooleanOption(option => option.setName('levelup').setDescription('Set level up messages (Requires Admin)'))
	.addChannelOption(option => option.setName('counting').setDescription('Counting channel (Requires Admin)'))
    .addChannelOption(option => option.setName('gbcounting').setDescription('Global Counting channel (Requires Admin)'))
    .toJSON(),

    async execute(interaction, data, client) {
        try {
            if(interaction.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR]) || interaction.member.permissions.has([Permissions.FLAGS.MANAGE_CHANNELS])){

        if(interaction.options.getChannel(`poll`)){

            data(`write`, `guild`, interaction.guild.id, `pollChannel`, interaction.options.getChannel(`poll`).id.toString())
            client.channels.cache.get(interaction.options.getChannel(`poll`).id.toString()).send(`This channel is now polls channel!`)

        }
        if(interaction.options.getChannel(`gbcounting`)){
            var arr = data(`read`, `global`, "gbcounting", `channels`).split(',')
            if(arr.includes(interaction.channel.id)){
                return interaction.reply('This channel is already set!')
            }
            arr.push(interaction.options.getChannel(`gbcounting`).id.toString())

            data(`write`, `global`, "gbcounting", `channels`, arr.toString())
            try {
                client.channels.cache.get(interaction.options.getChannel(`gbcounting`).id.toString()).send(`This channel is now the ***Global* Counting Channel**!`)
            } catch {
                console.log(`Error in trying to send setting update message`)
            }
            

        }
            if(interaction.options.getBoolean(`levelup`) === true){
                data('write', 'guild', interaction.guild.id, 'levelMessages', 'true')
            }
            if(interaction.options.getBoolean(`levelup`) === false){
                data('write', 'guild', interaction.guild.id, 'levelMessages', 'false')
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

            client.channels.cache.get(interaction.options.getChannel(`counting`).id.toString()).send(`This channel is now the ***Server* Counting Channel**! the next number is: **` + val + `**`)
            interaction.channel.send('❗Be aware that the old version of counting will soon be removed in favor of GLobal Counting❗')
        } } else {

            return interaction.reply(`You do not have admin!`)

        }

        interaction.reply(`Settings updated!`)

    } catch(err) {

        console.log(err)
        interaction.reply(`There was an error updating the settings!`)
        
    }
    }
}