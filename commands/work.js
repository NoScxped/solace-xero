const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Message, Discord, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('work')
		.setDescription('Work at your job!'),
	async execute(interaction, data, client, Discord, splashtext, worked) {
        if(data.read(`./data/user/${interaction.user.id}.json`, `job`)){
            if(worked.has(interaction.user.id)){
                return interaction.reply(`<:xmark:1000738231886811156> *You cannot work right now!* <:xmark:1000738231886811156>`)
            } else {

            const fs = require(`fs`)
            var jobs = JSON.parse(data.read(`./data/global/jobs.json`))
            var job = jobs[data.read(`./data/user/${interaction.user.id}.json`, 'job')]
            var min = parseInt(job.pay_min)
            var max = parseInt(job.pay_max)
            var pay = Math.floor(Math.random() * (max - min + 1) + min)
            var credits = pay

            if(data.read(`./data/user/${interaction.user.id}.json`, `credits`)){
                credits = parseInt(data.read(`./data/user/${interaction.user.id}.json`, `credits`))
                credits = credits + pay
            }

            var workAgain = parseInt(job.cooldown) / 1000
            workAgain = workAgain / 60
            var embed = new MessageEmbed()
            .setAuthor({name: `You worked as a`})
            .setTitle(`*${job.name}!*`)
            .setColor(`#a6dced`)
            .setImage(interaction.user.avatarURL())
            .setFooter({ text: splashtext.toString(), iconURL: client.user.avatarURL() });

            if(data.read(`./data/user/${interaction.user.id}.json`, 'booster')){

                var boost = pay * .25

                credits = credits + Math.ceil(boost)

                embed.addFields([{
                    name: '__Credits Boost__',
                    value: boost.toString()
                }])
            
            }

                
            if(data.read(`./data/user/${interaction.user.id}.json`, `faction`)){

                var factionId = data.read(`./data/user/${interaction.user.id}.json`, `faction`)
                var factionCredits = parseInt(data.read(`./data/faction/${factionId}.json`, 'credits'))
                var tax = Math.round(pay * 0.2)
                pay = pay - tax
                factionCredits = factionCredits + tax

                data.write(`./data/faction/${factionId}.json`, 'credits', factionCredits.toString())

                embed.addFields([{name: `__Faction Tax__`, value: tax + ' ⌬', inline: true}])

            }
            //faction tax
            embed.addFields([
                {name: `__Pay__`, value:  pay.toString() + " ⌬", inline: true},
                {name: `__Cooldown__`, value: `${workAgain} min`, inline: true}
            ])

            function cool(){

                worked.delete(interaction.user.id)

            }
            
            worked.add(interaction.user.id)
            data.write(`./data/user/${interaction.user.id}.json`, `credits`, credits.toString())
            interaction.reply({embeds: [embed]})
            setTimeout(cool, parseInt(job.cooldown))

        }
        } else {
            interaction.reply({content: "<:xmark:1000738231886811156> *You dont have a job! Use **/jobs** to find one!* <:xmark:1000738231886811156>", ephemermal: true})
        }
    }
}