const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
    .setName('invite')
    .setDescription('Invite Xero to your server!')
    .toJSON(),

    async execute(interaction, data, client, Discord, splashtext) {
       var embed = new MessageEmbed()
        .setAuthor({name: "『 Xero Discord Bot 』"})
        .setDescription(`[*Join the Discord Server*](https://discord.gg/2hFhuTq9M2) or [*Read the documentation*](http://xerocord.ml)`)
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