const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Message, Discord, MessageEmbed } = require('discord.js');
//idk why this is a function i wrote this at midnight i couldve just done command.name.charAt(0).toUpperCase() + command.name.slice(1) but itll be ok trust the process
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Get help with all things Xero'),
	async execute(interaction, data) {
        const fs = require('node:fs');
        const commands = [];
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`../commands/${file}`);
            commands.push(command.data);
        }
        var send = ''
        commands.forEach(command => {
            send = send + `**${capitalizeFirstLetter(command.name)}** - *${command.description}*\n`
        })
        var embed = new MessageEmbed()
        .setTitle("Help")
        .setColor("RANDOM")
        .setDescription(send)
        .addField(`Usage`, 'Slash commands ( **/** ) work *|* The old prefix ( **+** ) DOES NOT work anymore!')
        .setFooter({ text: 'Xero', iconURL: client.user.avatarURL() });
        
        interaction.reply({embeds: [embed]})
    }
}