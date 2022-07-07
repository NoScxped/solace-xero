const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu, MessageButton, Message, Discord, MessageEmbed } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
    .setName('jobs')
	.setDescription('Select a job!')
    .toJSON(),

    async execute(interaction, data, client, Discord, splashtext) {
        const jobs = JSON.parse(data.read('./data/global/jobs.json'))
        const msg = await interaction.reply({ content: '<a:typing:994063591340773466> *Xero is thinking* <a:typing:994063591340773466>', fetchReply: true, embeds: [], components: []})
        var embed = new MessageEmbed()
                .setTitle(`『 Job List 』`)
                .setDescription(`» Select a job`)
                .setColor(`RANDOM`)
                .setFooter({ text: `You have 30 seconds to reply!`, iconURL: client.user.avatarURL() });

        const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Select a job'));
        for(var i in jobs){
                jid = jobs[i].id

                       row.components[0].addOptions([{
                            label: `${jobs[i].name}`,
                            description: `${jobs[i].description}`,
                            value: `${jobs[i].id}`,
                            }]); 
                    
                            
            
            }
            msg.edit({content: '_ _', embeds: [embed], components: [row]})
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
                    if(i.customId === 'accept'){

                        res = true

                        embed = new MessageEmbed()
                        .setTitle(`『 Job Accepted! 』`)
                        .setDescription("» Use ***/work*** to work!")
                        .setColor("RANDOM")
                        .setFooter({ text: splashtext, iconURL: client.user.avatarURL() });
                        data.write(`./data/user/${interaction.user.id}.json`, 'job', `${str[0]}`)
                        return msg.edit({embeds: [embed], components: []})

                        
                    }
                    if(i.customId === 'deny'){
                        cont  = false
                        collector.stop()
                    }
                }
                for(var i in jobs){
                    if(cont === true){
                    if(jobs[i].id === str[0]){
                        var cooldown = parseInt(jobs[i].cooldown) / 1000
                        cooldown = cooldown / 60
                        
                        var embed = new MessageEmbed()
                        .setAuthor({name: "You got a new job!"})
                        .setTitle(`『 ${jobs[i].name} 』`)
                        .setDescription(`» ${jobs[i].description}`)
                        .addField(`» Pay`, `› ${jobs[i].pay_min} - ${jobs[i].pay_max} ⌬`)
                        .addField(`» Cooldown`, `› ${cooldown} min`)
                        .setColor(`RANDOM`)
                        .setFooter({ text: `You have 30 seconds to reply!`, iconURL: client.user.avatarURL() });

                        var acceptbar = new MessageActionRow()
                         .addComponents(
                         new MessageButton()
                            .setCustomId(`accept`)
                            .setEmoji('<:checkmark:994105025292943390>')
                            .setStyle(`SUCCESS`),
                        new MessageButton()
                            .setCustomId(`deny`)
                            .setEmoji('<:xmark:994105062353817682>')
                            .setStyle(`DANGER`)
                        )
                
                   msg.edit({embeds: [embed], components: [row, acceptbar]})
                    
                
                }
                    }
                }
        })

            collector.on(`end`, collected => {
                if(res === false){
                return msg.edit({content: `❌ **This interaction was cancelled** ❌`, embeds: [], components: []})
                }
            })
        }

        }
