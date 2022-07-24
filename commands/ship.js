const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
    .setName('ship')
	.setDescription(`Ship two users!`)
	.addUserOption(option => option.setName('user1').setDescription('Select a User').setRequired(true))
    .addUserOption(option => option.setName('user2').setDescription('Select a User'))
    .toJSON(),

    async execute(interaction, data, client, Discord, splashtext) {
        var url = interaction.user.avatarURL()
        var ign = interaction.user.username
        if(interaction.options.getUser(`user2`)){
            interaction.user = interaction.options.getUser(`user2`)
        }
        
        var perc = Math.floor(Math.random() * 100)
        if(interaction.user.id === '914006698853822464' || interaction.options.getUser(`user1`).id === '914006698853822464'){ perc = 12589710232387563278156}
        var heart = '💖'
        if(perc >= 100){ heart = '❤️‍🔥'}
        if(perc < 75){ heart = '❤️'}
        if(perc < 50){ heart = '❤️‍🩹'}
        if(perc < 25){ heart = '💔'}

        var amt = interaction.user.username.length
        var name = interaction.user.username.slice(0, amt * 0.5)
        amt = interaction.options.getUser(`user1`).username.length
        name = name + interaction.options.getUser(`user1`).username.slice(amt * 0.5)
        

        var embed = new MessageEmbed()
        .setAuthor({name: `${ign} shipped ${interaction.options.getUser(`user1`).username} and ${interaction.user.username}!`, iconURL: url})
        .setTitle(`💞 ${name} 💞`)
        .setDescription(`» ${heart} ***${interaction.options.getUser(`user1`).username}** and **${interaction.user.username}** are **${perc}%** matched!* ${heart}`)
        .setColor(`RANDOM`)
        await interaction.reply({embeds: [embed]})
    }
}