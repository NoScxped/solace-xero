if(data(`exists`, `guild`, message.guild.id, `countingChannel`, ``)){
if(data(`read`, `guild`, message.guild.id, `countingChannel`, ``) === message.channel.id){
    var num = parseInt(data(`read`, `guild`, message.guild.id, `countingNumber`)) + 1
                num = parseInt(num)

                if(data(`read`, `guild`, message.guild.id, `lastCountingId`) === message.author.id){
                    if(/^\d/.test(message.content)){
                    message.react(`⚠️`)
                    message.reply(`Bruh don't use yourself twice (Number has not changed)`)
                    }
                } else if(message.channel.id === data(`read`, `guild`, message.guild.id, `countingChannel`)){

                    if(/^\d/.test(message.content)){

                        message.content = parseInt(message.content)
                        if(message.content != parseInt(data(`read`, `guild`, message.guild.id, `countingNumber`)) + 1){

                            message.react('❌')
                            data(`write`, `guild`, message.guild.id, `countingNumber`, "0")
                            data(`write`, `guild`, message.guild.id, `lastCountingId`, "0")

                            var {MessageEmbed} = require(`discord.js`)
                            var embed = new MessageEmbed()
                            .setTitle("Spree Broken!")
                            .setColor("RANDOM")
                            .setDescription(`***${message.author.username}*** broke the spree!`)
                            .addField(`Next Number:`, '**1**')
                            message.reply({embeds: [embed]})

                        } else {

                            data(`write`, `guild`, message.guild.id, `countingNumber`, num.toString())
                            data(`write`, `guild`, message.guild.id, `lastCountingId`, message.author.id.toString())
                            message.react(`✅`)

                        }

                    }
                }
            }
} else {
    data(`write`, `guild`, interaction.guild.id `pollChannel`, "0")
    data(`write`, `guild`, interaction.guild.id `countingChannel`, "0")
}