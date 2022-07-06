const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Message, Discord, MessageEmbed } = require('discord.js');
const fs = require('fs');
const { waitForDebugger } = require('inspector');
const path = require('path')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('baltop')
		.setDescription('Credits Balance Top'),
	async execute(interaction, data, client, Discord, splashtext) {
      const message = await interaction.reply({content: 'Xero is thinking...', fetchReply: true})
        var str = []
        var files = fs.readdirSync(path.resolve('./data/user'))
        for(const i of files){
            var credits = parseInt(data('read', 'user', i.slice(0, -5), 'credits'))
            var id = i.slice(0, -5)
            if(!Number.isNaN(credits) && credits != false){
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
            if(num <= 9){
              try {
                var user = await client.users.fetch(str[i].id.toString()).catch(console.error)
                  name = "**" + user.username + "**#" + user.discriminator
              }
              catch {
                  name = `<@!${str[i].id}>`
              }
              num = num + 1
              msg = msg + `${num}. » *${name}* › ${str[i].credits} ⌬\n\n`
            }
            
        }
        var embed = new MessageEmbed()
        .setTitle('『 Baltop 』')
        .setColor("RANDOM")
        .setDescription(msg)
        .setFooter({ text: splashtext, iconURL: client.user.avatarURL() });
        message.edit({content: '_ _', embeds:[embed]})
    
    }
}