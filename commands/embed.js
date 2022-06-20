const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Message, Discord, MessageEmbed } = require('discord.js');
const { Permissions } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
    .setName('embed')
	.setDescription('Create a message embed')
	.addStringOption(option => option.setName('title').setDescription('Enter a title:').setRequired(true))
    .addStringOption(option => option.setName('description').setDescription('Enter poll description:').setRequired(true))
    .addStringOption(option => option.setName('footer').setDescription('footer').setRequired(true))
    .toJSON(),

    async execute(interaction, data, client, Discord, splashtext) {
        var footer = splashtext
        var title = "_ _"
        var description = "_ _"
        if(interaction.options.getString(`title`)){
            title = interaction.options.getString(`title`)
        }
        if(interaction.options.getString(`description`)){
            description = interaction.options.getString(`description`)
        }
        if(interaction.options.getString(`footer`)){
            footer = interaction.options.getString(`footer`)
        }
        var embed = new MessageEmbed()
        .setTitle(`『 **${title}** 』`)
        .setDescription("» " + description)
        .setFooter({ text: footer, iconURL: client.user.avatarURL() })
        .setColor(`RANDOM`)
        interaction.channel.send({embeds: [embed]})
        interaction.reply({content: "Embed Created!", ephemeral: true})
    }
}