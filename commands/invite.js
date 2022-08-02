const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
    .setName('invite')
    .setDescription('Invite Solace to your server!')
    .toJSON(),

    async execute(interaction, data, client, Discord, splashtext) {
       var embed = new MessageEmbed()
        .setAuthor({name: "Solace Discord Bot"})
        .setDescription(`[*Join the Discord Server*](https://discord.gg/THZqsK3HTM) or [*Read the documentation*](http://xerocord.ml)`)
        .addFields([
            {name: `__Economy__`, value: `*Jobs, Gambling, and more!*`, inline: true},
            {name: `__Level-Up__`, value: `*Earn XP to level up!*`, inline: true},
            {name: `__Counting__`, value: `*Count with your friends!*`, inline: true},
            {name: `__Misc__`, value: `*Have fun with Solace's miscellaneous commands!*`, inline: true}
        ])
        .setColor('RANDOM')
        const row = new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setLabel(`Invite Solace to your Server!`)
				.setStyle('LINK')
                .setURL("https://discord.com/api/oauth2/authorize?client_id=756552050397020350&permissions=2147757120&scope=bot%20applications.commands")
                
		)
        await interaction.reply({components: [row], embeds: [embed]})
    }
}