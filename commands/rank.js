const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Message, Discord, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rank')
		.setDescription('Rank')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('User')
                .setRequired(false)
        ),
	async execute(interaction, data) {

        if(interaction.options.getUser(`user`)){

            interaction.user = interaction.options.getUser(`user`)

            if(interaction.user.bot){

                interaction.reply(`You cannot get information on a bot!`)
                return
                
            }
        }

        if(data(`exists`, `user`, interaction.user.id)){

            var embed = new MessageEmbed()
                .setTitle(`Info for ` + interaction.user.username)
                .setColor(`RANDOM`)
                .addField(`Credits`, data(`read`, `user`, interaction.user.id, `credits`))
                .addField(`Level`, data(`read`, `user`, interaction.user.id, `level`))
                .addField(`XP`, data(`read`, `user`, interaction.user.id, `xp`))
                .addField(`XP needed for level up`, data(`read`, `user`, interaction.user.id, `pointsNeeded`))

            interaction.reply({embeds: [embed]})

        }  else {

            interaction.reply(`There is no information for this user!`)

        }
    }
} 