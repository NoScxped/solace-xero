const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Message, Discord, MessageEmbed } = require('discord.js');
const fs = require('fs');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('View Xero Statistics'),
	async execute(interaction, data, client, Discord, splashtext) {
        const path = require("path")

        const getAllFiles = function(dirPath, fileArray) {
        files = fs.readdirSync(dirPath)

        fileArray = fileArray || []

        files.forEach(function(file) {
            if (fs.statSync(dirPath + "/" + file).isDirectory()) {
                fileArray = getAllFiles(dirPath + "/" + file, fileArray)
            } else {
                fileArray.push(path.join(__dirname, dirPath, file))
            }
        })

        return fileArray
        }
        var arr = data('read', 'global', 'gbcounting', 'channels').split(',')

        var embed = new MessageEmbed()
        .setTitle('『 Xero Stats 』')
        .addField('Servers', client.guilds.cache.size.toString(), true)
        .setThumbnail(client.user.avatarURL())
        .addField('Users in Storage', getAllFiles('./data/user/').length.toString())
        .addField('Servers in Storage', getAllFiles('./data/guild/').length.toString())
        .addField('Factions in Storage', getAllFiles('./data/faction/').length.toString())
        .addField('Guilds in GlobalCount', arr.length.toString())
        .setColor("RANDOM")
        .setFooter({ text: splashtext.toString(), iconURL: client.user.avatarURL() });
        await interaction.reply({embeds: [embed]})
        
        
    }
}