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

                const msg = await interaction.reply({ content: '<a:typing:994063591340773466> *Xero is thinking* <a:typing:994063591340773466>', fetchReply: true })

                var embed = new MessageEmbed()
                .setTitle(`『 <:gamble_chips:993964578390151229> Gambling <:gamble_chips:993964578390151229> 』`)
                .setDescription(`» Would you like to gamble this amount?`)
                .addField(`» Amount to Gamble`, `› ${amount}`, true)
                .addField(`» Current Credits`, `› ${credits}`, true)
                .setColor(`RANDOM`)
                .setFooter({ text: `You have 15 seconds to reply!`, iconURL: client.user.avatarURL() });

                var row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setCustomId(`accept`)
                    .setEmoji('<:checkmark:994105025292943390>')
                    .setStyle(`SUCCESS`),
                    new MessageButton()
                    .setCustomId('deny')
                    .setEmoji('<:xmark:994105062353817682>')
                    .setStyle('DANGER')
                )

                msg.edit({content: "_ _", embeds: [embed], components: [row]})
                var filter = e => e.customId === "accept" || 'deny' && e.user.id === interaction.user.id
                const collector = interaction.channel.createMessageComponentCollector({filter, time: 15000})
                var res = false
                collector.on(`end`, collected => {
                    if(res === false){
                    msg.edit({content: `❌ **This interaction has been cancelled!** ❌`, embeds: [], components: []})
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
                            .setTitle(`『 <:gamble_chips:993964578390151229> Gambling <:gamble_chips:993964578390151229> 』`)
                            .setDescription("<:checkmark:994105025292943390>  You Won! <:checkmark:994105025292943390> ")
                            .addField('» Amount Gained', "› " + amount.toString())
                            .addField('» Credits ⌬', "› " + credits.toString())
                            .setColor("RANDOM")
                            .setFooter({ text: splashtext, iconURL: client.user.avatarURL() });

                            msg.edit({content: "_ _", embeds: [win], components: []})

                        } else {

                            credits = credits - amount

                            var lose = new MessageEmbed()
                            .setTitle("『 <:gamble_chips:993964578390151229> Gambling <:gamble_chips:993964578390151229> 』")
                            .setDescription("<:xmark:994105062353817682> You Lost! <:xmark:994105062353817682>")
                            .addField('» Amount Lost', "› " + amount.toString())
                            .addField('» Credits ⌬', "› " + credits.toString())
                            .setColor("RANDOM")
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