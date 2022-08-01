const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Get help with all things Solace'),
	async execute(interaction, data, client, Discord, splashtext, worked, commands) {

        const msg = await interaction.reply({ content: '<a:typing:1000730579542736927> *Solace is thinking* <a:typing:1000730579542736927>', fetchReply: true});

        console.log(commands)

        var embed = new MessageEmbed()
        .setAuthor({ name: 'Solace-Xero', iconURL: interaction.user.avatarURL(), url: interaction.user.avatarURL() })
        .setTitle(`Help`)
        .setDescription(`*Select a command to get more information!*`)
        .setColor("a6dced")
        .setFooter({ text: `You have 30 seconds to reply!`, iconURL: client.user.avatarURL() });

        var index = 0

        const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('page' + index.toString())
					.setPlaceholder('Select a Command || Page ' + index.toString()));
        const close = new MessageActionRow()
                    .addComponents(
                    new MessageButton()
                       .setCustomId(`close`)
                       .setLabel(`Close`)
                       .setEmoji(`<:xmark:1000738231886811156>`)
                       .setStyle(`DANGER`))

        var rowarr = []

        commands.forEach(command => {

            row.components[0].addOptions([{

                label: `${"/" + command.name.charAt(0).toUpperCase() + command.name.slice(1)}`,
                description: `${command.description}`,
                value: `${command.name}`,

                }]);
            
        })

        rowarr.push(row, close)
        
        msg.edit({embeds: [embed], components: rowarr})

        var filter = i => i.user.id === interaction.user.id

            const collector = interaction.channel.createMessageComponentCollector({filter, idle: 30000})
            var cont = true
            var str = ""

            collector.on(`collect`, async i => {

                i.deferUpdate()

                if(i.values){

                  str = Array.from(i.values)

                }

                if(i.customId === 'close'){
                    cont = false
                    collector.stop()
                }

                
                commands.forEach(command => {
                    
                    if(command.name === str[0]){
        
                    embed = new MessageEmbed()
                    
                    .setDescription("*" + command.description + "*")
                    .setColor("a6dced")
                    var cmdname = "/" + command.name.charAt(0).toUpperCase() + command.name.slice(1)
                    
                    if(command.options.length > 0){
        
                        command.options.forEach(option => {
                           
                            if(option.type === 1){
        
                                cmdname = cmdname.concat(` ${option.name.charAt(0).toUpperCase() + option.name.slice(1)}`)
        
                            if(option.options){
        
                                option.options.forEach(option => {
        
                                    cmdname = cmdname.concat(` [${option.name}]`)
        
                                })
                                
                            }
        
                            embed.addFields([{name: cmdname, value: "> *" + option.description + "*"}])
                            cmdname = "/" + command.name.charAt(0).toUpperCase() + command.name.slice(1)
        
                    } else  {

                        cmdname = cmdname.concat(` [ ${option.name.charAt(0).toUpperCase() + option.name.slice(1)} ]`)

                    }
                    

                })
        
                    }
                    embed.setTitle(cmdname)
                    if(cont === true){msg.edit({content: '_ _', embeds: [embed], components: rowarr})}
                    
                }
                })
                

                    

                        
        })

            collector.on(`end`, collected => {

                    return msg.edit({content: "<:xmark:1000738231886811156> *This interaction has been closed!* <:xmark:1000738231886811156>", embeds: [], components: []})
                
                    
            })


    }
        
    }