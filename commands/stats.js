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
        const sent = await interaction.reply({ content: '<a:typing:1000730579542736927> *Solace is thinking* <a:typing:1000730579542736927>', fetchReply: true});
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
        .setAuthor({name: 'Solace-Xero',icon: `https://discord.gg/THZqsK3HTM`, iconURL: `https://cdn.discordapp.com/attachments/752366102683582646/1000916536598474793/logo.png`})
        .addFields([
            {name: '__Total Servers__', value: client.guilds.cache.size.toString()},
            {name: '__Users in Storage__', value: getAllFiles('./data/user/').length.toString()},
            {name: '__Servers in Storage__', value: getAllFiles('./data/guild/').length.toString()},
            {name: '__Factions in Storage__', value: getAllFiles('./data/faction/').length.toString()}
        ])
        .setDescription(`*Ping:* ***${sent.createdTimestamp - interaction.createdTimestamp}ms***`)
        .setColor(`a6dced`)
        .setFooter({ text: `Solace Xero v` + info.version, iconURL: client.user.avatarURL() });
        await sent.edit({content: "_ _",embeds: [embed]})
        
        
    }
}