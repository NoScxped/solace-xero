const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Message, Discord, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('Invite the bot to your server!'),
	async execute(interaction, data, client, discord, splashtext) {

		const row = new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setLabel(`Invite me!`)
				.setStyle('LINK')
                .setURL("https://discord.com/api/oauth2/authorize?client_id=840252158317297734&permissions=8&scope=bot%20applications.commands")
				.setFooter({ text: splashtext, iconURL: client.user.avatarURL() })
                
		)
        var embed = new MessageEmbed()
        .setTitle('Invite')
        .setDescription('Invite the bot [by clicking here!](https://discord.com/api/oauth2/authorize?client_id=840252158317297734&permissions=8&scope=bot%20applications.commands)')
		await interaction.reply({components: [row], embeds: [embed]})
	}
}