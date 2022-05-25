if(data(`read`, `guild`, message.guild.id, `countingChannel`, ``) != false){
if(data(`read`, `guild`, message.guild.id, `countingChannel`, ``) === message.channel.id){
    var num = parseInt(data(`read`, `guild`, message.guild.id, `countingNumber`)) + 1
                num = parseInt(num)
    if(data(`read`, `guild`, message.guild.id, `countingNumber`) === false){
        data(`write`, `guild`, message.guild.id, `countingNumber`, `0`)
    }
                if(data(`read`, `guild`, message.guild.id, `lastCountingId`) === message.author.id){
                    if(/^\d/.test(message.content)){
                    message.react(`⚠️`)
                    message.reply(`Bruh don't use yourself twice (Number has not changed)`)
                    }
                } else if(message.channel.id === data(`read`, `guild`, message.guild.id, `countingChannel`)){
                    if(/^\d/.test(message.content)){
                        var go = 1
                        try {
                            var math = require(`mathjs`)
                            message.content = math.evaluate(message.content)
                        } catch (err){
                            message.react(`⚠️`)
                        message.reply(`Unable to process this equation (Number has not changed)`)
                        go = 0
                        }

                        message.content = parseInt(message.content)
                        if(message.content != parseInt(data(`read`, `guild`, message.guild.id, `countingNumber`)) + 1 && go === 1){
                            if(data(`read`, `user`, message.author.id, `save`) === `0` || data(`read`, `user`, message.author.id, `save`) === false){ 

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

                                message.react(`😨`)
                                var {MessageEmbed} = require(`discord.js`)
                                var add = parseInt(data(`read`, `guild`, message.guild.id, `countingNumber`)) + 1
                            var sub = parseInt(data(`read`, `user`, message.author.id, `save`)) - 1
                            var embed = new MessageEmbed()
                            .setTitle("Spree Saved!")
                            .setColor("RANDOM")
                            .setDescription(`***${message.author.username}*** messed up, but they had a save!`)
                            .addField(`Next Number:`, add.toString())
                            data(`write`, `user`, message.author.id, `save`, sub.toString())
                            data(`write`, `guild`, message.guild.id, `lastCountingId`, message.author.id.toString())
                            message.reply({embeds: [embed]})

                            }

                        } else if(go === 1) {

                            data(`write`, `guild`, message.guild.id, `countingNumber`, num.toString())
                            data(`write`, `guild`, message.guild.id, `lastCountingId`, message.author.id.toString())
                            message.react(`✅`)

                        }

                    }
                }
            }
} else {
    data(`write`, `guild`, message.guild.id, `pollChannel`, "0")
    data(`write`, `guild`, message.guild.id, `countingChannel`, "0")
}