const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Message, Discord, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rank')
		.setDescription('User statistics')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('User')
                .setRequired(false)
        ),
	async execute(interaction, data, client) {

        if(interaction.options.getUser(`user`)){

            interaction.user = interaction.options.getUser(`user`)

            if(interaction.user.bot){

                interaction.reply(`You cannot get information on a bot!`)
                return
                
            }
        }

        if(data(`exists`, `user`, interaction.user.id)){

            var embed = new MessageEmbed()
                .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL(), url: interaction.user.avatarURL() })
                .setColor(`RANDOM`)
                .setThumbnail(interaction.user.avatarURL())
                .addField(`Credits`, data(`read`, `user`, interaction.user.id, `credits`), true)
                .addField(`Level`, data(`read`, `user`, interaction.user.id, `level`), true)
                .addField(`XP`, data(`read`, `user`, interaction.user.id, `xp`), true)
                .addField(`XP needed for level up`, data(`read`, `user`, interaction.user.id, `pointsNeeded`), true)
                .setFooter({ text: 'Xero', iconURL: client.user.avatarURL() });

            interaction.reply({embeds: [embed]})

        }  else {

            interaction.reply(`There is no information for this user!`)

        }
    }
} 