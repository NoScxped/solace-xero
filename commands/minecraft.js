const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Message, Discord, MessageEmbed } = require('discord.js');
const { Permissions } = require('discord.js');
var minecraftServerPing = require("minecraft-server-ping")
module.exports = {
	data: new SlashCommandBuilder()
    .setName('minecraft')
	.setDescription('Ping a Minecraft Server')
	.addStringOption(option => option.setName('ip').setDescription('Enter Server IP').setRequired(true))
    .toJSON(),

    async execute(interaction, data, client, Discord, splashtext) {
        var url = interaction.options.getString('ip')
        var title = url
        var description = "❌ This server is offline."
        var ping = "0"
        var onlinePlayers = "0/0"
        var output = ""
        try{
         output = await minecraftServerPing.ping(url);   
        } catch(err){
            return interaction.reply('❌ This server could not be found!')
        }
        ping = output.ping
        description = output.description
        if(output.description.text === ''){
            description = output.description.extra[0].text
        }
        if(output.description.text != '' && typeof output.description != "string"){
            description = output.description.text
        }
        onlinePlayers = output.players.online + "/" + output.players.max
        var embed = new MessageEmbed()
        .setTitle("『 " + title +  " 』")
        .setColor("RANDOM")
        .setDescription("» "  + description)
        .addField("» Ping", "› " + ping + "ms", true)
        .addField("» Players", "› " + onlinePlayers, true)
        .setFooter({ text: splashtext, iconURL: client.user.avatarURL() });
        interaction.reply({embeds: [embed]})
    }
}

    