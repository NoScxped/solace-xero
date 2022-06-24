const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Message, Discord, MessageEmbed } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
    .setName('job')
	.setDescription('(DEPRECATED) Select a job!')
	.addStringOption(option => option.setName('id').setDescription('Job ID:').setRequired(true))
    .toJSON(),

    async execute(interaction, data, client, Discord, splashtext) {
        const fs = require('fs');
        const jobs = JSON.parse(fs.readFileSync('./data/global/jobs.json', 'utf-8'))
        const msg = await interaction.reply({ content: 'Searching...', fetchReply: true })
        var found = false
        var givenid = interaction.options.getString('id').toLowerCase()
        var jid = ''
        for(var i in jobs){
            if(jobs[i].id === givenid){
                jid = jobs[i].id
                var cooldown = parseInt(jobs[i].cooldown) / 1000
                cooldown = cooldown / 60
                var embed = new MessageEmbed()
                .setTitle(`『 ${jobs[i].name} 』`)
                .setDescription(`» ${jobs[i].description}`)
                .addField(`» Pay`, `› ${jobs[i].pay_min} - ${jobs[i].pay_max} ⌬ each time you work`)
                .addField(`» Cooldown`, `› ${cooldown} min`)
                .setColor(`RANDOM`)
                .setFooter({ text: `You have 15 seconds to reply!`, iconURL: client.user.avatarURL() });

                var row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setCustomId(`accept`)
                    .setLabel(`Yes`)
                    .setStyle(`SUCCESS`)
                )
                interaction.channel.send('⚠️ **/job is now deprecated! Use /jobs for a better experience :)** ⚠️')
                msg.edit({content: "Here you go!", embeds: [embed], components: [row]})
                var filter = i => i.customId === "accept" && i.user.id === interaction.user.id
                const collector = interaction.channel.createMessageComponentCollector({filter, time: 15000})
                    var res = false
                collector.on(`collect`, async i => {

                    if(i.customId === `accept`){

                        embed = new MessageEmbed()
                        .setTitle(`『 Job Accepted! 』`)
                        .setDescription("» Use ***/work*** to work!")
                        .setColor("RANDOM")
                        .setFooter({ text: splashtext, iconURL: client.user.avatarURL() });
                        msg.edit({content: "You have a new job!", embeds: [embed], components: []})
                        data(`write`, `user`, interaction.user.id, `job`, `${jid}`)
                        res = true
                    }})

                collector.on(`end`, collected => {
                    if(res === false){
                    msg.edit({content: `❌ **Interaction cancelled. You can out of time!** ❌`, embeds: [], components: []})
                    }
                })
                found = true
            }

        }

        if(found === false){
            msg.edit(`Unable to find this job!`)

        }

        }
}