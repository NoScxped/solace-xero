const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const info = JSON.parse(fs.readFileSync(`./package-lock.json`))
module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('View Solace Statistics'),
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

        var embed = new MessageEmbed()
        .setTitle('Solace Stats')
        .addField('Servers', client.guilds.cache.size.toString(), true)
        .setThumbnail(client.user.avatarURL())
        .addField('Users in Storage', getAllFiles('./data/user/').length.toString())
        .addField('Servers in Storage', getAllFiles('./data/guild/').length.toString())
        .addField('Factions in Storage', getAllFiles('./data/faction/').length.toString())
        .setColor("RANDOM")
        .setFooter({ text: `Solace Xero v` + info.version, iconURL: client.user.avatarURL() });
        await interaction.reply({embeds: [embed]})
        
        
    }
}