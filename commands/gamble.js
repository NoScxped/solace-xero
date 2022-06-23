const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Message, Discord, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gamble')
		.setDescription('Satisfy your gambling addiction!')
        .addStringOption(option=> option.setName(`credits`).setDescription(`How many credits will you put on the line?`).setRequired(true)),
	async execute(interaction, data, client, Discord, splashtext, loadCommands, worked) {
        if(data(`read`,`user`, interaction.user.id, `credits`) != false){
            var amount = Math.abs(parseInt(interaction.options.getString('credits')))
            var credits = parseInt(data(`read`,`user`, interaction.user.id, `credits`))

            if(amount > credits){

                return interaction.reply('You do not have enough credits!')

            } else {

                const msg = await interaction.reply({ content: 'Loading...', fetchReply: true })

                var embed = new MessageEmbed()
                .setTitle(`『 🎲 Gambling 🎲 』`)
                .setDescription(`» Would you like to gamble this amount?`)
                .addField(`» Amount to Gamble`, `› ${amount}`, true)
                .addField(`» Current Credits`, `› ${credits}`, true)
                .setColor(`RANDOM`)
                .setFooter({ text: `You have 15 seconds to reply!`, iconURL: client.user.avatarURL() });

                var row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setCustomId(`accept`)
                    .setLabel(`Yes`)
                    .setStyle(`SUCCESS`),
                    new MessageButton()
                    .setCustomId('deny')
                    .setLabel('No')
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
                        var win = Math.random() < 0.5;

                        if(win){

                            credits = credits + amount
                            var win = new MessageEmbed()
                            .setTitle(`『 🎲 Gambling 🎲 』`)
                            .setDescription("✔️ You Won! ✔️")
                            .addField('» Amount Gained', "› " + amount.toString())
                            .addField('» Credits ⌬', "› " + credits.toString())
                            .setColor("RANDOM")
                            .setFooter({ text: splashtext, iconURL: client.user.avatarURL() });

                            msg.edit({content: "_ _", embeds: [win], components: []})

                        } else {

                            credits = credits - amount

                            var lose = new MessageEmbed()
                            .setTitle("『 🎲 Gambling 🎲 』")
                            .setDescription("❌ You Lost! ❌")
                            .addField('» Amount Lost', "› " + amount.toString())
                            .addField('» Credits ⌬', "› " + credits.toString())
                            .setColor("RANDOM")
                            .setFooter({ text: splashtext, iconURL: client.user.avatarURL() });

                            msg.edit({content: "_ _", embeds: [lose], components: []})

                        }
                        data(`write`,`user`, interaction.user.id, `credits`, credits.toString())
                         res = true
                         collector.stop()
                    }

                }
                    })}

                    
            }
        }
    }