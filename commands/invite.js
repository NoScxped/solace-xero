const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
    .setName('invite')
    .setDescription('Invite Solace to your server!')
    .toJSON(),

    async execute(interaction, data, client, Discord, splashtext) {
       var embed = new MessageEmbed()
        .setAuthor({name: "『 Solace Discord Bot 』"})
        .setDescription(`[*Join the Discord Server*](https://discord.gg/THZqsK3HTM) or [*Read the documentation*](http://xerocord.ml)`)
        .addField(`» Economy`, `› Jobs, Gambling, and more!`, true)
        .addField(`» Level-Up`, `› Earn XP to level up!`, true)
        .addField(`» Counting`, `› Count globally with other servers!`, true)
        .addField(`» Misc`, `› Have fun with Solace's miscellaneous commands!`, true)
        .setColor('RANDOM')
        const row = new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setLabel(`Invite Solace to your Server!`)
				.setStyle('LINK')
                .setURL("https://discord.com/oauth2/authorize?client_id=756552050397020350&scope=bot&permissions=2147484680")
                
		)
        await interaction.reply({components: [row], embeds: [embed]})
    }
}