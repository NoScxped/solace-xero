const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const path = require('path')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('View Leaderboards')
    .addStringOption(option=> 
      option.setName(`leaderboard`)
      .setDescription(`View the Leaderboard`)
      .setRequired(true)
      .addChoices(
				{ name: 'Credits', value: 'credits' },
				{ name: 'Counting', value: 'counting' },
				{ name: 'Leveling', value: 'leveling' },
        { name: 'Faction [ Members ]', value: 'factionmembers' },
        { name: 'Faction [ Credits ]', value: 'factioncredits' }
			)),

	async execute(interaction, data, client, Discord, splashtext) {

      const message = await interaction.reply({content: '<a:typing:1000730579542736927> *Solace is thinking* <a:typing:1000730579542736927>', fetchReply: true})
        var ico = ''
        var str = []
        var files = fs.readdirSync(path.resolve('./data/user'))
        var leaderboardName = ''

        if(interaction.options.getString('leaderboard') === `credits`){

          ico = '⌬'
          for(const i of files){
            var credits = parseInt(data.read(`./data/user/` +  i, 'credits'))
            if(data.read(`./data/user/${i}`, 'bank')){
              credits = credits + parseInt(data.read(`./data/user/` +  i, 'bank'))
            }
            var id = i.slice(0, -5)
            if(!Number.isNaN(credits) && credits){
                str.push({"credits": credits, "id": id})
            }
            leaderboardName = 'Credits'
            
        }
        }

        if(interaction.options.getString('leaderboard') === 'counting'){

          ico = '#'
          for(const i of files){
            var credits = parseInt(data.read(`./data/user/` +  i, 'counted'))
            var id = i.slice(0, -5)
            if(!Number.isNaN(credits) && credits){
                str.push({"credits": credits, "id": id})
            }
            leaderboardName = 'Counting'
            
        }
        }
        if(interaction.options.getString('leaderboard') === 'factionmembers'){

          ico = 'Faction Members'
          files = fs.readdirSync(path.resolve('./data/faction'))
          for(const i of files){
            var credits = parseInt(data.read(`./data/faction/` +  i, 'members').split(',').length)
            var id = data.read(`./data/faction/` +  i, 'owner')
            if(!Number.isNaN(credits) && credits){
                str.push({"credits": credits, "id": id})
            }
            leaderboardName = 'Faction [ Members ]'
            
        }
        }
        if(interaction.options.getString('leaderboard') === 'factioncredits'){

          ico = 'Faction ⌬'
          files = fs.readdirSync(path.resolve('./data/faction'))
          for(const i of files){
            var credits = parseInt(data.read(`./data/faction/` +  i, 'credits'))
            var id = data.read(`./data/faction/` +  i, 'owner')
            if(!Number.isNaN(credits) && credits){
                str.push({"credits": credits, "id": id})
            }
            leaderboardName = 'Faction [ Credits ]'
            
        }
        }
        if(interaction.options.getString('leaderboard') === 'leveling'){

          ico = `LvL`
          for(const i of files){
            var credits = parseInt(data.read(`./data/user/` +  i, 'level'))
            var id = i.slice(0, -5)
            if(!Number.isNaN(credits) && credits){
                str.push({"credits": credits, "id": id})
            }
            leaderboardName = 'Leveling'
            
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
                
                  name = "**" + user.username + "**"
              }
              catch {

                  name = `<@!${str[i].id}>`

              }

              num = num + 1
              msg = msg + `${num}. » ${name} › *${str[i].credits}* **${ico}**\n\n`

            }
            
        }

        var embed = new MessageEmbed()
        .setTitle(`${leaderboardName} Leaderboard`)
        .setColor("RANDOM")
        .setDescription(msg)
        .setFooter({ text: splashtext, iconURL: client.user.avatarURL() });
        message.edit({content: '_ _', embeds:[embed]})
    
    }
}