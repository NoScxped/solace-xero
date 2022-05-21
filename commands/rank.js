const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Message, Discord, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rank')
		.setDescription('Rank'),
	async execute(interaction, data) {

            var embed = new MessageEmbed()
                .setTitle(`Info for ` + interaction.user.username)
                .setColor(`RANDOM`)
                .addField(`Credits`, data(`read`, `user`, interaction.user.id, `credits`))
                .addField(`Level`, data(`read`, `user`, interaction.user.id, `level`))
                .addField(`XP`, data(`read`, `user`, interaction.user.id, `xp`))
                .addField(`XP needed for level up`, data(`read`, `user`, interaction.user.id, `pointsNeeded`))
            interaction.reply({embeds: [embed]})
        }
}