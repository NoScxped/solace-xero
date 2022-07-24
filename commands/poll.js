const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { Permissions } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
    .setName('poll')
	.setDescription('Run a poll!')
	.addStringOption(option => option.setName('title').setDescription('Enter a title:').setRequired(true))
    .addStringOption(option => option.setName('description').setDescription('Enter poll description:').setRequired(true))
    .addChannelOption(option => option.setName('channel').setDescription('Select a Channel'))
    .addMentionableOption(option => option.setName('ping').setDescription('Add a Ping'))
    .toJSON(),

    async execute(interaction, data, client, Discord, splashtext) {
        if(interaction.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR]) || interaction.member.permissions.has([Permissions.FLAGS.MANAGE_CHANNELS])){

        var embed = new MessageEmbed()
        .setTitle(interaction.options.getString('title'))
        .setColor("RANDOM")
        .setDescription("» " + interaction.options.getString('description'))
        .setAuthor({ name: 'Created by ' + interaction.user.username, iconURL: interaction.user.avatarURL(), url: interaction.user.avatarURL() })
        .setFooter({ text: splashtext, iconURL: client.user.avatarURL() });

        var channel = interaction.channel

        if(interaction.options.getChannel(`channel`)){
            channel = interaction.options.getChannel(`channel`)
        }
        

            try {
                if(interaction.options.getMentionable(`ping`)){
                    client.channels.cache.get(channel.id.toString()).send({content: interaction.options.getMentionable(`ping`).toString()})
                }
                const sent = client.channels.cache.get(channel.id.toString()).send({embeds: [embed]})
            .then(function (message) {

                message.react("<:checkmark:994105025292943390>")
                message.react("<:xmark:994105062353817682>")

                interaction.reply({content: "Poll Created!", ephemeral: true})
    
            })
            } catch{
                interaction.reply({content: `<:xmark:994105062353817682> *Failed to send poll! Either this channel has been deleted **or** Xero doesnt not have the permissions to message it.* <:xmark:994105062353817682>`, ephemeral: true})
            }
        
        
    } else {
        interaction.reply({content: `You do not have either of the following permissions: Admin, Manage Channels`, ephemeral: true})
    } }
}