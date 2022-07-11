const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu, MessageButton, Message, Discord, MessageEmbed } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
    .setName('challenges')
	.setDescription('View Completed Challenges')
    .toJSON(),

    async execute(interaction, data, client, Discord, splashtext) {
        
        const challenges = JSON.parse(data.read('./data/global/challenges.json'))
        const msg = await interaction.reply({ content: '<a:typing:994063591340773466> *Xero is thinking* <a:typing:994063591340773466>', fetchReply: true, embeds: [], components: []})

        var embed = new MessageEmbed()
                .setAuthor({name: `『 ${interaction.user.username}'s Challenges 』`})
                .setDescription(`» Select a Challenge`)
                .setColor(`RANDOM`)
                .setFooter({ text: `You have 30 seconds to reply!`, iconURL: client.user.avatarURL() });

        const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Select a Challenge'));
        var num = 0
        for(var i in challenges){

            if(data.read(`./data/user/${interaction.user.id}.json`, `challenges`)){

                if(data.read(`./data/user/${interaction.user.id}.json`, `challenges`).includes(challenges[i].id)){

                itm = challenges[i].id
                num = num + 1
                       row.components[0].addOptions([{
                            label: `${challenges[i].name}`,
                            description: `${challenges[i].description}`,
                            value: `${challenges[i].id}`,
                            }]); 
                        }
                    }
            
            }
            var closebar = new MessageActionRow()
                         .addComponents(
                        new MessageButton()
                            .setCustomId(`close`)
                            .setEmoji('<:xmark:994105062353817682>')
                            .setLabel(`Close`)
                            .setStyle(`DANGER`)
                            )
            if(num === 0){
                return msg.edit({content: `<:xmark:994105062353817682> *You (Somehow) haven't completed a challenge yet!* <:xmark:994105062353817682>`})
            }
           await msg.edit({content: '_ _', embeds: [embed], components: [row, closebar]})
            var filter = i => i.user.id === interaction.user.id
            const collector = interaction.channel.createMessageComponentCollector({filter, idle: 30000})
                var cont = true
                var res = false

            var str = ""
            collector.on(`collect`, async i => {

                await i.deferUpdate()

                if(i.values){

                  str = Array.from(i.values)  

                }

                if(i.customId){

                    if(i.customId === 'close'){
                        
                        res = false
                        return collector.stop()
                        
                    }
                    
                }
                for(var i in challenges){

                    if(cont === true){

                    if(challenges[i].id === str[0]){
                        var embed = new MessageEmbed()
                        .setAuthor({name: "You have completed this Challenge!"})
                        .setTitle(`『 ${challenges[i].name} 』`)
                        .setDescription(`» ${challenges[i].description}`)
                        .addField(`» Reward`, `› ${challenges[i].credits_reward}  ⌬`)
                        .setColor(`RANDOM`)
                        .setFooter({ text: `You have 30 seconds to reply!`, iconURL: client.user.avatarURL() });

                        
                
                        await msg.edit({embeds: [embed], components: [row, closebar]})
                    
                
                }
                    }
                }
        })

            collector.on(`end`, collected => {

                if(res === false){

                return msg.edit({content: "<:xmark:994105062353817682> *This interaction has been closed!* <:xmark:994105062353817682>", embeds: [], components: []})

                }
            })
        }

        }
