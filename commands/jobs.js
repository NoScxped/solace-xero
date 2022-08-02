const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
    .setName('jobs')
	.setDescription('Select a job!')
    .toJSON(),

    async execute(interaction, data, client, Discord, splashtext) {
        const jobs = JSON.parse(data.read('./data/global/jobs.json'))
        const msg = await interaction.reply({ content: '<a:typing:1000730579542736927> *Solace is thinking* <a:typing:1000730579542736927>', fetchReply: true, embeds: [], components: []})
        var embed = new MessageEmbed()
                .setTitle(`Jobs`)
                .setDescription(`*Select a job*`)
                .setColor("a6dced")
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

                try {
                    i.deferUpdate()
                } catch{
                     
                }
                
                if(i.values){
                  str = Array.from(i.values)  
                }
                if(i.customId){
                    if(i.customId === 'accept'){

                        res = true

                        embed = new MessageEmbed()
                        .setTitle(`Job Accepted!`)
                        .setDescription("*Use **/work** to work!*")
                        .setColor("a6dced")
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
                        .addFields([
                            {name: `__Pay__`, value: `› ${jobs[i].pay_min} - ${jobs[i].pay_max} ⌬`},
                            {name: `__Cooldown__`, value: `› ${cooldown} min`}
                        ])
                        .setColor("a6dced")
                        .setFooter({ text: `You have 30 seconds to reply!`, iconURL: client.user.avatarURL() });

                        var acceptbar = new MessageActionRow()
                         .addComponents(
                            new MessageButton()
                            .setCustomId(`accept`)
                            .setEmoji('<:checkmark:1000737491621523488>')
                            .setStyle(`SUCCESS`),

                        new MessageButton()
                            .setCustomId(`deny`)
                            .setEmoji('<:xmark:1000738231886811156>')
                            .setStyle(`DANGER`)
                        )
                   msg.edit({embeds: [embed], components: [row, acceptbar]})
                    
                
                }
                    }
                }
        })

            collector.on(`end`, collected => {
                if(res === false){
                return msg.edit({content: `<:xmark:1000738231886811156> *This interaction has been closed!* <:xmark:1000738231886811156>`, embeds: [], components: []})
                }
            })
        }

        }
