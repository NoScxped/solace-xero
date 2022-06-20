const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Message, Discord, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('work')
		.setDescription('Work at your job!'),
	async execute(interaction, data, client, Discord, splashtext, loadCommands, worked) {
        if(data(`read`,`user`, interaction.user.id, `job`) != false){
            if(worked.has(interaction.user.id)){
                return interaction.reply(`You cannot work right now!`)
            } else {

            const fs = require(`fs`)
            var jobs = JSON.parse(fs.readFileSync(`./data/global/jobs.json`))
            var job = jobs[data(`read`, `user`, interaction.user.id, `job`)]
            var credits = parseInt(data(`read`, `user`, interaction.user.id, `credits`))
            var min = parseInt(job.pay_min)
            var max = parseInt(job.pay_max)
            var workAgain = parseInt(job.cooldown) / 1000
            workAgain = workAgain / 60
            var pay = Math.floor(Math.random() * (max - min + 1) + min)
            credits = credits + pay
            var embed = new MessageEmbed()
            .setTitle(`『 ${job.name} 』`)
            .setDescription(`**» You did your job!**`)
            .addField(`» Pay`, "› " + pay.toString() + " ⌬")
            .addField(`» You can work again in`, `› ${workAgain} min`)
            .setColor("RANDOM")
            .setThumbnail(interaction.user.avatarURL())
            .setFooter({ text: splashtext.toString(), iconURL: client.user.avatarURL() });
            function cool(){
                worked.delete(interaction.user.id)
            }
            worked.add(interaction.user.id)
            data(`write`, `user`, interaction.user.id, `credits`, credits.toString())
            interaction.reply({embeds: [embed]})
            setTimeout(cool, parseInt(job.cooldown))

        }
        } else {
            interaction.reply({content: "You dont have a job!", ephemermal: true})
        }
    }
}