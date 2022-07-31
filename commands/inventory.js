const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
    .setName('inventory')
	.setDescription('View your Solace Inventory')
    .addUserOption(option => option.setName('user').setDescription('Select a User'))
    .toJSON(),

    async execute(interaction, data, client, Discord, splashtext) {

        var intializer = interaction.user.id

        if(interaction.options.getUser(`user`)){
            interaction.user = interaction.options.getUser(`user`)
        }
        
        const items = JSON.parse(data.read('./data/global/items.json'))
        const msg = await interaction.reply({ content: '<a:typing:1000730579542736927> *Solace is thinking* <a:typing:1000730579542736927>', fetchReply: true, embeds: [], components: []})

        var embed = new MessageEmbed()
                .setAuthor({name: `${interaction.user.username}'s Inventory`})
                .setDescription(`*Select an item*`)
                .setColor("a6dced")
                .setFooter({ text: `You have 30 seconds to reply!`, iconURL: client.user.avatarURL() });

        const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Select an item'));
        var num = 0
        for(var i in items){

            if(data.read(`./data/user/${interaction.user.id}.json`, items[i].id.toString())){

                itm = items[i].id
                num = num + 1
                       row.components[0].addOptions([{
                            label: `${items[i].name}`,
                            description: `${items[i].description}`,
                            value: `${items[i].id}`,
                            }]); 
                        } 
            
            }
            if(num === 0){
                return msg.edit({content: `<:xmark:1000738231886811156> *This inventory is empty!* <:xmark:1000738231886811156>`})
            }
           await msg.edit({content: '_ _', embeds: [embed], components: [row]})
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

                    if(i.customId === 'refund'){
                        res = true
                        var price = Math.ceil(data.read(`./data/global/items.json`, str[0]).price * .75)
                        var credits = parseInt(data.read(`./data/user/${interaction.user.id}.json`, `credits`))
                        credits = credits + price
                        var quantity = parseInt(data.read(`./data/user/${interaction.user.id}.json`, str[0])) - 1

                        if(quantity === 0){ data.delete(`./data/user/${interaction.user.id}.json`, str[0])} else { data.write(`./data/user/${interaction.user.id}.json`, str[0], quantity.toString()) }

                        data.write(`./data/user/${interaction.user.id}.json`, `credits`, credits.toString())

                        embed = new MessageEmbed()
                            .setAuthor({name: `${interaction.user.username}'s Inventory`})
                            .setTitle(`Refund Success!`)
                            .addFields([{name: `__Credits__`, value: '*' + credits + '* ⌬', inline: true}])
                            .setColor("a6dced")
                            if(data.read(`./data/user/${interaction.user.id}.json`, `bio`)){
                                embed.setDescription(`» ` + data.read(`./data/user/${interaction.user.id}.json`, `bio`))
                            }

                            await msg.edit({embeds: [embed], components: []})
                            return collector.stop()
                        
                    }
                    if(i.customId === 'close'){
                        
                        res = false
                        return collector.stop()
                        
                    }
                    
                }
                for(var i in items){

                    if(cont === true){

                    if(items[i].id === str[0]){

                        max = parseInt(items[i].max)
                        prc = parseInt(items[i].price)
                        ident = items[i].id.toString()

                        var embed = new MessageEmbed()
                        .setTitle(`『 ${items[i].name} 』`)
                        .setDescription(`» ${items[i].description}`)
                        .addFields([{name: `__Quantity__`, value:`${data.read(`./data/user/${interaction.user.id}.json`, items[i].id.toString())}`}])

                        if(intializer === interaction.user.id){

                            embed.addFields([{name: `__Refund Price__`, value: `${Math.ceil(prc * .75)} ⌬`}])

                        }
                        
                        embed.setColor(`RANDOM`)
                        embed.setFooter({ text: `You have 30 seconds to reply!`, iconURL: client.user.avatarURL() });

                        var refundbar = new MessageActionRow()
                         

                            if(interaction.user.id === intializer){

                            refundbar.addComponents(
                        new MessageButton()
                                .setCustomId(`refund`)
                                .setEmoji('<:checked:1000730910133596240>')
                                .setLabel(`Refund`)
                                .setStyle(`PRIMARY`)
                                )
                            }

                            refundbar.addComponents(
                        new MessageButton()
                            .setCustomId(`close`)
                            .setEmoji('<:xmark:1000738231886811156>')
                            .setLabel(`Close`)
                            .setStyle(`DANGER`)
                            )
                
                        await msg.edit({embeds: [embed], components: [row, refundbar]})
                    
                
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
