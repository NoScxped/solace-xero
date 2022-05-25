const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Message, Discord, MessageEmbed } = require('discord.js');
//idk why this is a function i wrote this at midnight i couldve just done obj[key].name.charAt(0).toUpperCase() + obj[key].name.slice(1) but itll be ok trust the process
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
module.exports = {
	data: new SlashCommandBuilder()
		.setName('shop')
		.setDescription('View the Xero Shop'),
	async execute(interaction, data, client, Discord, splashtext) {
        const fs = require('node:fs');
        var send = ''
        var obj = JSON.parse(fs.readFileSync(`./data/global/items.json`, `utf-8`))
            Object.keys(obj).forEach((key) => {
                send = send + `**C** *${capitalizeFirstLetter(obj[key].price)}* - **${capitalizeFirstLetter(obj[key].name)}** - *${obj[key].description}*\n/buy **${obj[key].id}\n**`
            })
        var embed = new MessageEmbed()
        .setTitle("Shop")
        .setColor("RANDOM")
        .setDescription(send)
        .setFooter({ text: splashtext, iconURL: client.user.avatarURL() });
        
        interaction.reply({embeds: [embed]})
    }
}