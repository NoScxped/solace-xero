const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Message, Discord, MessageEmbed } = require('discord.js');
const { Permissions } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
    .setName('poll')
	.setDescription('Run a poll!')
	.addStringOption(option => option.setName('title').setDescription('Enter a title:').setRequired(true))
    .addStringOption(option => option.setName('description').setDescription('Enter poll description:').setRequired(true))
    .toJSON(),

    async execute(interaction, data, client, Discord, splashtext) {
        if(interaction.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR]) || interaction.member.permissions.has([Permissions.FLAGS.MANAGE_CHANNELS])){
        var embed = new MessageEmbed()
        .setTitle("『 " + interaction.options.getString('title') + " 』")
        .setColor("RANDOM")
        .setDescription("» " + interaction.options.getString('description'))
        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL(), url: interaction.user.avatarURL() })
        .setFooter({ text: splashtext, iconURL: client.user.avatarURL() });

        if(data(`read`, `guild`, interaction.guild.id, `pollChannel`) != "0"){

        const sent = client.channels.cache.get(data(`read`, `guild`, interaction.guild.id, `pollChannel`)).send({embeds: [embed]})
        .then(function (message) {
            message.react("👍")
            message.react("👎")
            interaction.reply({content: "Poll Created!", ephemeral: true})

        }

        )} else {

            interaction.reply({content: `Please set a polls channel in settings!`, ephemeral: true})
            
        }
    } else {
        interaction.reply({content: `You do not have either of the following permissions: Admin, Manage Channels`, ephemeral: true})
    } }
}