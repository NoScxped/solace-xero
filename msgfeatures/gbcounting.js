const { MessageEmbed } = require("discord.js")
var arr = data('read', 'global', 'gbcounting', 'channels').split(',')

if(arr.includes(message.channel.id.toString())){

        var cont = true

        if(!/^\d/.test(message.content)){
            message.delete()
            cont = false
        }

        if(cont != false){

        var num = parseInt(data('read', 'global', 'gbcounting', 'number'))
        var arr = data('read', 'global', 'gbcounting', 'channels').split(',')
        
        if(message.content != num + 1){

            message.delete()

        } else {
            if(data('read', 'global', 'gbcounting', 'lastUser') != message.author.id){
            message.react('✔️')
            num = num + 1
            data('write', 'global', 'gbcounting', 'number', num.toString())
            var embed = new MessageEmbed()
                .setAuthor({name: message.author.username, iconURL: message.author.avatarURL()})
                .setDescription("» " + num.toString())
                .setColor('RANDOM')
                .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL() });

            data('write', 'global', 'gbcounting', 'lastUser', message.author.id.toString())
                for(var i in arr){

                    if(message.channel.id.toString() != arr[i]){

                        try {
                            client.channels.cache.get(arr[i].toString()).send({embeds: [embed]})
                        } catch{
                            //do nothing dw ab it
                        }
                        

                    }
                }
            } else {
                message.delete()
                message.author.send(`You cannot count twice in a row in Xero's ***Global* Counting!**`)
            }
        }
    
        }
    
    } 
