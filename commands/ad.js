const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Message, Discord, MessageEmbed } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
    .setName('ad')
    .setDescription('Advertise Xero')
    .toJSON(),

    async execute(interaction, data, client, Discord, splashtext) {
       var embed = new MessageEmbed()
        .setTitle(`『 Xero Discord Bot 』`)
        .setDescription(`***FEATURES***`)
        .addField(`» Economy`, `› Jobs, Gambling, and more!`, true)
        .addField(`» Level-Up`, `› Earn XP to level up!`, true)
        .addField(`» Counting`, `› Count globally with other servers!`, true)
        .addField(`» Misc`, `› Have fun with Xero's miscellaneous commands!`, true)
        .setColor('RANDOM')
        const row = new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setLabel(`Invite Xero to your Server!`)
				.setStyle('LINK')
                .setURL("https://discord.com/api/oauth2/authorize?client_id=840252158317297734&permissions=8&scope=bot%20applications.commands")
                
		)
        await interaction.reply({components: [row], embeds: [embed]})
    }
}