const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Message, Discord, MessageEmbed } = require('discord.js');
//idk why this is a function i wrote this at midnight i couldve just done command.name.charAt(0).toUpperCase() + command.name.slice(1) but itll be ok trust the process
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
module.exports = {
	data: new SlashCommandBuilder()
		.setName('math')
		.setDescription('Solve an equation')
        .addStringOption(option=> option.setName(`equation`).setDescription(`Enter an equation`).setRequired(true)),
	async execute(interaction, data, client, Discord, splashtext) {
        const math = require('mathjs')
        var output = ""
        try{
            output = math.evaluate(interaction.options.getString(`equation`))
        } catch {
            output = "*⚠️Unable to process this equation⚠️*"
        }
        var embed = new MessageEmbed()
        .setTitle("『 Math 』")
        .setColor("RANDOM")
        .addField("» " + interaction.options.getString(`equation`), output.toString())
        .setFooter({ text: splashtext.toString(), iconURL: client.user.avatarURL() });
        
        interaction.reply({embeds: [embed]})
    }
}