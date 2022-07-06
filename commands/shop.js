const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu, MessageButton, Message, Discord, MessageEmbed } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
    .setName('shop')
	.setDescription('View the Xero Shop')
    .toJSON(),

    async execute(interaction, data, client, Discord, splashtext) {
        const fs = require('fs');
        const items = JSON.parse(fs.readFileSync('./data/global/items.json', 'utf-8'))
        const msg = await interaction.reply({ content: 'Loading...', fetchReply: true, embeds: [], components: []})
        var prc = 0
        var ident = ""
        var max = 0
        var embed = new MessageEmbed()
                .setTitle(`『 Xero Store 』`)
                .setDescription(`» Select an item`)
                .setColor(`RANDOM`)
                .setFooter({ text: `You have 30 seconds to reply!`, iconURL: client.user.avatarURL() });

        const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Select an item'));
        for(var i in items){
                itm= items[i].id

                       row.components[0].addOptions([{
                            label: `${items[i].name}`,
                            description: `${items[i].description}`,
                            value: `${items[i].id}`,
                            }]); 
                    
                            
            
            }
           await msg.edit({content: '_ _', embeds: [embed], components: [row]})
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
                        if(parseInt(data(`read`, `user`, interaction.user.id, `credits`)) >= parseInt(prc)){

                            if(data(`read`, `user`, interaction.user.id, ident) != false && data(`read`, `user`, interaction.user.id, ident) != `NaN`){
                                if(parseInt(data(`read`, `user`, interaction.user.id, ident)) >= parseInt(max)){
                                    embed = new MessageEmbed()
                                    .setTitle(`『 ❌ Purchase Failed! ❌ 』`)
                                    .setDescription(`You can only have *${max}* of this item!`)
                                    .setColor("RANDOM")
                                    .setFooter({ text: splashtext, iconURL: client.user.avatarURL() });
                                    msg.edit({embeds: [embed], components: []})
                                    res = true
                                    return collector.stop()
                                    
                                }
    
                                res = true

                                embed = new MessageEmbed()
                                .setTitle(`『 Purchase Successful! 』`)
                                .setDescription('You have successfully purchased this item!')
                                .setColor("RANDOM")
                                .setFooter({ text: splashtext, iconURL: client.user.avatarURL() });

                                var add = parseInt(data(`read`, `user`, interaction.user.id, ident)) + 1
                                var sub = parseInt(data(`read`, `user`, interaction.user.id, `credits`)) - parseInt(prc)
    
                                data(`write`, `user`, interaction.user.id, ident, add.toString())
                                data(`write`, `user`, interaction.user.id, `credits`, sub.toString())
                                
                                res = true
                                await msg.edit({embeds: [embed], components: []})
                                return collector.stop()
    
                            } else {

                                data(`write`, `user`, interaction.user.id, ident, `1`)
                                embed = new MessageEmbed()
                                .setTitle(`『 Purchase Successful! 』`)
                                .setDescription('You have successfully purchased this item!')
                                .setColor("RANDOM")
                                .setFooter({ text: splashtext, iconURL: client.user.avatarURL() });
                                res = true
                                await msg.edit({embeds: [embed], components: []})
                                return collector.stop()

                            }
    
                        } else {
                            embed = new MessageEmbed()
                                .setTitle(`『 ❌ Purchase Failed! ❌ 』`)
                                .setDescription('You do not have enough money!')
                                .setColor("RANDOM")
                                .setFooter({ text: splashtext, iconURL: client.user.avatarURL() });
                                res = true
                                await msg.edit({embeds: [embed], components: []})
                                return collector.stop()
    
                        }

                        
                    }
                    if(i.customId === 'deny'){
                        cont  = false
                        collector.stop()
                    }
                }
                for(var i in items){

                    if(cont === true){

                    if(items[i].id === str[0]){
                        max = parseInt(items[i].max)
                        prc = items[i].price
                        ident = items[i].id.toString()
                        var embed = new MessageEmbed()
                        .setTitle(`『 ${items[i].name} 』`)
                        .setDescription(`» ${items[i].description}`)
                        .addField(`» Price`, `› ${items[i].price} ⌬`)
                        .setColor(`RANDOM`)
                        .setFooter({ text: `You have 30 seconds to reply!`, iconURL: client.user.avatarURL() });

                        var acceptbar = new MessageActionRow()
                         .addComponents(
                         new MessageButton()
                            .setCustomId(`accept`)
                            .setLabel(`Buy`)
                            .setEmoji('✔️')
                            .setStyle(`SUCCESS`),
                        new MessageButton()
                            .setCustomId(`deny`)
                            .setLabel(`Close`)
                            .setEmoji('❌')
                            .setStyle(`DANGER`)
                        )
                
                        await msg.edit({embeds: [embed], components: [row, acceptbar]})
                    
                
                }
                    }
                }
        })

            collector.on(`end`, collected => {

                if(res === false){

                return msg.edit({content: "❌ **This interaction was cancelled** ❌", embeds: [], components: []})

                }
            })
        }

        }
