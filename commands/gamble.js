const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gamble')
		.setDescription('Satisfy your gambling addiction!')
        .addStringOption(option=> option.setName(`credits`).setDescription(`How many credits will you put on the line?`).setRequired(true)),
	async execute(interaction, data, client, Discord, splashtext, loadCommands, worked) {
        if(data.read(`./data/user/${interaction.user.id}.json`, `credits`)){
            var amount = Math.abs(parseInt(interaction.options.getString('credits')))
            var credits = parseInt(data.read(`./data/user/${interaction.user.id}.json`, `credits`))

            if(amount > credits){

                return interaction.reply('You do not have enough credits!')

            } else {

                const msg = await interaction.reply({ content: '<a:typing:1000730579542736927> *Solace is thinking* <a:typing:1000730579542736927>', fetchReply: true })

                var embed = new MessageEmbed()
                .setTitle(`<:gamble_chips:1000730735344369704> Would you like to gamble this amount? <:gamble_chips:1000730735344369704>`)
                .addFields([
                    {name: `__Amount to Gamble__`, value: `${amount}`, inline: true},
                    {name: `__Current Credits__`, value: `${credits}`, inline: true}
                ])
                .setColor(`RANDOM`)
                .setFooter({ text: `You have 15 seconds to reply!`, iconURL: client.user.avatarURL() });

                var row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setCustomId(`accept`)
                    .setEmoji('<:checkmark:1000737491621523488>')
                    .setStyle(`SUCCESS`),
                    new MessageButton()
                    .setCustomId('deny')
                    .setEmoji('<:xmark:1000738231886811156>')
                    .setStyle('DANGER')
                )

                msg.edit({content: "_ _", embeds: [embed], components: [row]})
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
                        //I SWEAR TO YOU IT IS 5050
                        //back for 3.3.1 optmization, i still can assure u its 5050
                        var win = Math.random() < 0.5;

                        if(win){

                            credits = credits + amount
                            var win = new MessageEmbed()
                            .setTitle(`<:gamble_chips:1000730735344369704> Gambling <:gamble_chips:1000730735344369704>`)
                            .setDescription("<:checkmark:1000737491621523488> You Won! <:checkmark:1000737491621523488>")
                            .addFields([
                                {name: '__Amount Gained__', value: amount.toString()},
                                {name: '__Credits ⌬__', value: credits.toString()}
                            ])
                            .setColor("a6dced")
                            .setFooter({ text: splashtext, iconURL: client.user.avatarURL() });

                            msg.edit({content: "_ _", embeds: [win], components: []})

                        } else {

                            credits = credits - amount

                            var lose = new MessageEmbed()
                            .setTitle("<:gamble_chips:1000730735344369704> Gambling <:gamble_chips:1000730735344369704>")
                            .setDescription("<:xmark:1000738231886811156> You Lost! <:xmark:1000738231886811156>")
                            .addFields([
                                {name: '__Amount Lost__', value: amount.toString()},
                                {name: '__Credits ⌬__', value: credits.toString()}
                            ])
                            .setColor("a6dced")
                            .setFooter({ text: splashtext, iconURL: client.user.avatarURL() });

                            msg.edit({content: "_ _", embeds: [lose], components: []})

                        }
                        data.write(`./data/user/${interaction.user.id}.json`, "credits", credits.toString())
                         res = true
                         collector.stop()
                    }

                }
                    })}

                    
            }
        }
    }