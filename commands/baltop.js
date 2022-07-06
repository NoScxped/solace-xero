const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Message, Discord, MessageEmbed } = require('discord.js');
const fs = require('fs')
const path = require('path')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('baltop')
		.setDescription('Credits Balance Top'),
	async execute(interaction, data, client, Discord, splashtext) {
        var str = []
        var files = fs.readdirSync(path.resolve('./data/user'))
        for(const i of files){
            var credits = parseInt(data('read', 'user', i.slice(0, -5), 'credits'))
            var id = i.slice(0, -5)
            if(!Number.isNaN(credits)){
                str.push({"credits": credits, "id": id})
            }
            
        }
        str.sort((a, b) => {
            if (a.credits < b.credits) {
              return -1;
            }
            if (a.credits > b.credits) {
              return 1;
            }
            return 0;
          }).reverse()
        var msg = ''
        var num = 0
        for(var i in str){
            var name = ''
            try {
                name = client.users.cache.get(str[i].id).tag
            }
            catch {
                name = `<@!${str[i].id}>`
            }

            if(num <= 9){
              num = num + 1
              msg = msg + `${num}. » *${name}* › ${str[i].credits} ⌬\n\n`
            }
            
        }
        var embed = new MessageEmbed()
        .setTitle('『 Baltop 』')
        .setColor("RANDOM")
        .setDescription(msg)
        .setFooter({ text: splashtext, iconURL: client.user.avatarURL() });
        
    await interaction.reply({embeds:[embed]})
    }
}