
if(data.exists(`./data/guild/${message.guild.id}.json`)){

if(data.read(`./data/guild/${message.guild.id}.json`, `countingChannel`)){

    if(data.read(`./data/guild/${message.guild.id}.json`, `countingChannel`) === message.channel.id){

        var num = parseInt(data.read(`./data/guild/${message.guild.id}.json`, `countingNumber`)) + 1

                    num = parseInt(num)
    
                    if(data.read(`./data/guild/${message.guild.id}.json`, `lastCountingId`) === message.author.id){

                        if(/^\d/.test(message.content)){

                        message.react(`⚠️`)
                        message.reply(`⚠️ *You cannot count twice in a row! Please let someone else count now!* ⚠️`)

                        }

                    } else {
    
                        if(/^\d/.test(message.content)){
    
                            message.content = parseInt(message.content)

                            if(message.content != parseInt(data.read(`./data/guild/${message.guild.id}.json`, `countingNumber`)) + 1){
    
                                try{

                                    message.react(`<:counting_x:1000732168710000670>`)

                                } catch {

                                  message.react('❌')  

                                }
                                

                                data.write(`./data/guild/${message.guild.id}.json`, `countingNumber`, '0')
                                data.delete(`./data/guild/${message.guild.id}.json`, `lastCountingId`)
    
                                var embed = new MessageEmbed()
                                .setTitle("Spree Broken!")
                                .setColor(`#a6dced`)
                                .setDescription(`***${message.author.username}** broke the spree!*`)
                                .addFields([{name:`__Next Number__`, value:'**1**'}])
                                message.reply({embeds: [embed]})
    
                            } else {
    
                                data.write(`./data/guild/${message.guild.id}.json`, `countingNumber`, num.toString())
                                data.write(`./data/guild/${message.guild.id}.json`, `lastCountingId`, message.author.id.toString())

                                if(data.read(`./data/user/${message.author.id}.json`, 'counted')){

                                    var add = parseInt(data.read(`./data/user/${message.author.id}.json`, 'counted')) + 1
                                    data.write(`./data/user/${message.author.id}.json`, 'counted', add.toString())

                                } else {
                                    data.write(`./data/user/${message.author.id}.json`, 'counted', `1`)
                                }

                                try {

                                    message.react(`<:counting_check:1000732200435724308>`)

                                } catch {

                                    message.react(`✅`)

                                }
                                
    
                            }
    
                        }
                    }
                }
    }
    
}