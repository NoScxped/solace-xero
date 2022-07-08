const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Message, Discord, MessageEmbed } = require('discord.js');
const fs = require('fs');
const { waitForDebugger } = require('inspector');
const path = require('path')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('View Leaderboards')
    .addSubcommand(subcommand =>
      subcommand
        .setName('credits')
        .setDescription('View the Credits leaderboard'))
    .addSubcommand(subcommand =>
        subcommand
          .setName('faction')
          .setDescription('View the Faction Leaderboard'))
    .addSubcommand(subcommand =>
        subcommand
          .setName('counting')
          .setDescription('View the counting leaderboard'))
    .addSubcommand(subcommand =>
        subcommand
          .setName('leveling')
          .setDescription('View the leveling leaderboard')),

	async execute(interaction, data, client, Discord, splashtext) {

      const message = await interaction.reply({content: '<a:typing:994063591340773466> *Xero is thinking* <a:typing:994063591340773466>', fetchReply: true})
        var ico = ''
        var str = []
        var files = fs.readdirSync(path.resolve('./data/user'))

        if(interaction.options.getSubcommand() === 'credits'){

          ico = '⌬'
          for(const i of files){
            var credits = parseInt(data.read(`./data/user/` +  i, 'credits'))
            var id = i.slice(0, -5)
            if(!Number.isNaN(credits) && credits){
                str.push({"credits": credits, "id": id})
            }
            
        }
        }

        if(interaction.options.getSubcommand() === 'counting'){

          ico = '#'
          for(const i of files){
            var credits = parseInt(data.read(`./data/user/` +  i, 'counted'))
            var id = i.slice(0, -5)
            if(!Number.isNaN(credits) && credits){
                str.push({"credits": credits, "id": id})
            }
            
        }
        }
        if(interaction.options.getSubcommand() === 'faction'){

          ico = 'Faction Members'
          files = fs.readdirSync(path.resolve('./data/faction'))
          for(const i of files){
            var credits = parseInt(data.read(`./data/faction/` +  i, 'members').split(',').length)
            var id = data.read(`./data/faction/` +  i, 'owner')
            if(!Number.isNaN(credits) && credits){
                str.push({"credits": credits, "id": id})
            }
            
        }
        }
        if(interaction.options.getSubcommand() === 'leveling'){

          ico = `LvL`
          for(const i of files){
            var credits = parseInt(data.read(`./data/user/` +  i, 'level'))
            var id = i.slice(0, -5)
            if(!Number.isNaN(credits) && credits){
                str.push({"credits": credits, "id": id})
            }
            
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
                if(data.exists(`./data/user/${user.id}.json`)){if(data.read(`./data/user/${user.id}.json`, 'token')){name = "*[ OG ]* " + name}}
              }
              catch {

                  name = `<@!${str[i].id}>`

              }

              num = num + 1
              msg = msg + `${num}. » ${name} › *${str[i].credits}* **${ico}**\n\n`

            }
            
        }

        var embed = new MessageEmbed()
        .setTitle(`『 ${interaction.options.getSubcommand().charAt(0).toUpperCase() + interaction.options.getSubcommand().slice(1)} Leaderboard 』`)
        .setColor("RANDOM")
        .setDescription(msg)
        .setFooter({ text: splashtext, iconURL: client.user.avatarURL() });
        message.edit({content: '_ _', embeds:[embed]})
    
    }
}