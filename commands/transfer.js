const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('transfer')
		.setDescription('Transfer an amount to someone else!')
        .addIntegerOption(option=> option.setName(`credits`).setDescription(`How many credits are you paying?`).setRequired(true))
        .addUserOption(option=> option.setName(`user`).setDescription(`Who are you paying?`).setRequired(true)),
	async execute(interaction, data, client, Discord, splashtext, loadCommands, worked) {
        if(interaction.options.getUser('user').bot){
            return interaction.reply('<:xmark:1000738231886811156> *You cannot donate to bots!* <:xmark:1000738231886811156>')
        }
        if(interaction.options.getUser('user').id === interaction.user.id){
            return interaction.reply('<:xmark:1000738231886811156> *You cannot donate to yourself!* <:xmark:1000738231886811156>')
        }
        if(data.read(`./data/user/${interaction.user.id}.json`, `credits`)){
            if(data.read(`./data/user/${interaction.options.getUser('user').id}.json`, "credits")){
                var creditsfrom = parseInt(data.read(`./data/user/${interaction.user.id}.json`, `credits`))
                var transferfrom = Math.abs(parseInt(interaction.options.getInteger('credits')))
                var creditsto = parseInt(data.read(`./data/user/${interaction.options.getUser('user').id}.json`, `credits`))
                var transferto = parseInt(data.read(`./data/user/${interaction.options.getUser('user').id}.json`, `credits`))
                if(creditsfrom >= transferfrom){

                    transferto = transferfrom + transferto
                    var dis = creditsfrom
                    creditsfrom = creditsfrom - transferfrom

                    var embed = new MessageEmbed()
                    .setTitle(`Credit Transfer`)
                    .setDescription(`*Would you like to transfer this amount to **${interaction.options.getUser('user').username}***?`)
                    .addFields([
                        {name: `__Your credits__`, value: `${dis}`, inline: true},
                        {name: `__Amount to transfer__`, value: `${transferfrom}`, inline: true},
                        {name: `__**${interaction.options.getUser('user').username}**'s Credits__`, value: `${creditsto}`},
                        {name: `__**${interaction.options.getUser('user').username}**'s New Total__`, value: `${transferto}`, inline: true}
                    ])
                    .setColor(`a6dced`)
                    .setFooter({ text: `You have 15 seconds to reply!`, iconURL: client.user.avatarURL() });

                    var row = new MessageActionRow()
                    .addComponents(
                    new MessageButton()
                    .setCustomId(`accept`)
                    .setEmoji("<:checkmark:1000737491621523488>")
                    .setStyle(`SUCCESS`),
                    new MessageButton()
                    .setCustomId('deny')
                    .setEmoji('<:xmark:1000738231886811156>')
                    .setStyle('DANGER')
                )

                    const msg = await interaction.reply({ embeds: [embed], components: [row], fetchReply: true })

                    var filter = e => e.customId === "accept" || 'deny' && e.user.id === interaction.user.id
                    const collector = interaction.channel.createMessageComponentCollector({filter, time: 15000})
                    var res = false
                    collector.on(`end`, collected => {
                        if(res === false){
                        msg.edit({content: `<:xmark:1000738231886811156> *This interaction has been closed!* <:xmark:1000738231886811156>`, embeds: [], components: []})
                        }
                    })
                    collector.on(`collect`, async e => {
                        if(e.user.id === interaction.user.id){
                        if(e.customId === `deny`){
                            res = false
                            collector.stop()
                        }
                        if(e.customId === `accept`){
                            data.write(`./data/user/${interaction.user.id}.json`, "credits", creditsfrom.toString())
                            data.write(`./data/user/${interaction.options.getUser('user').id}.json`, "credits", transferto.toString())

                            var embed = new MessageEmbed()
                            .setTitle(`<:checkmark:1000737491621523488> Transaction Successful! <:checkmark:1000737491621523488>`)
                            .setDescription(`***${interaction.user.username}** --> **${interaction.options.getUser('user').username}***`)
                            .addFields([
                                {name: `__**${interaction.user.username}**'s credits__`, value: `${creditsfrom}`, inline: true},
                                {name: `__Amount Transferred__`, value: `${transferfrom}`, inline: true},
                                {name: `__**${interaction.options.getUser('user').username}**'s Credits__`, value: `${transferto}`, inline: true}
                            ])
                            .setColor(`a6dced`)
                            .setFooter({ text: `You have 15 seconds to reply!`, iconURL: client.user.avatarURL() });

                            msg.edit({embeds: [embed], components: []})

                            res = true
                            collector.stop()
                        }
    
                    }
                        })
                        
                    


                } else {
                    return interaction.reply("<:xmark:1000738231886811156> *You do not have enough credits* <:xmark:1000738231886811156>")
                }
            }
            }
        }
    }