const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
    .setName('challenges')
	.setDescription('View Challenges')
    .addUserOption(option => option.setName('user').setDescription('Select a User'))
    .toJSON(),

    async execute(interaction, data, client, Discord, splashtext) {

        var intializer = interaction.user.id

        if(interaction.options.getUser(`user`)){
            interaction.user = interaction.options.getUser(`user`)
        }
        
        const challenges = JSON.parse(data.read('./data/global/challenges.json'))
        const msg = await interaction.reply({ content: '<a:typing:1000730579542736927> *Solace is thinking* <a:typing:1000730579542736927>', fetchReply: true, embeds: [], components: []})

        var embed = new MessageEmbed()
                .setAuthor({name: `${interaction.user.username}'s Challenges`, icon: interaction.user.avatarURL()})
                .setDescription(`*Select a Challenge!*`)
                .setColor(`RANDOM`)
                .setFooter({ text: `You have 30 seconds to reply!`, iconURL: client.user.avatarURL() });

        const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Select a Challenge'));
        var num = 0
        for(var i in challenges){

                itm = challenges[i].id
                num = num + 1
                       row.components[0].addOptions([{
                            label: `${challenges[i].name}`,
                            description: `${challenges[i].description}`,
                            value: `${challenges[i].id}`,
                            }]); 
                        }
                    
            var closebar = new MessageActionRow()
                         .addComponents(
                        new MessageButton()
                            .setCustomId(`close`)
                            .setEmoji('<:xmark:1000738231886811156>')
                            .setLabel(`Close`)
                            .setStyle(`DANGER`)
                            )
            if(num === 0){
                return msg.edit({content: `<:xmark:1000738231886811156> *This user (Somehow) has not completed a challenge yet!* <:xmark:1000738231886811156>`})
            }
           await msg.edit({content: '_ _', embeds: [embed], components: [row, closebar]})
            var filter = i => i.user.id === intializer
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
                        .setAuthor({name: `${interaction.user.username}'s Challenges`, icon: interaction.user.avatarURL()})
                        .setTitle(`${challenges[i].name}`)
                        .setDescription(`*${challenges[i].description}**`)
                        .addFields([{name: `__Reward__`, value: `${challenges[i].credits_reward}  ⌬`}])
                        .setColor(`RANDOM`)
                        .setFooter({ text: `You have 30 seconds to reply!`, iconURL: client.user.avatarURL() });

                        if(data.read(`./data/user/${interaction.user.id}.json`, 'challenges').includes(challenges[i].id)){
                            embed.setAuthor({name: `${interaction.user.username} has completed this Challenge!`})
                        } else {
                            embed.setAuthor({name: `${interaction.user.username} has NOT completed this Challenge!`})
                        }
                
                        await msg.edit({embeds: [embed], components: [row, closebar]})
                    
                
                }
                    }
                }
        })

            collector.on(`end`, collected => {

                if(res === false){

                return msg.edit({content: "<:xmark:1000738231886811156> *This interaction has been closed!* <:xmark:1000738231886811156>", embeds: [], components: []})

                }
            })
        }

        }
