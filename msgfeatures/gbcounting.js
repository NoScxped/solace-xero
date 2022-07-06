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
            if(data('read', 'global', 'gbcounting', 'lastGuild') != message.guild.id && data('read', 'global', 'gbcounting', 'lastUser') != message.author.id){
            num = num + 1
            data('write', 'global', 'gbcounting', 'number', num.toString())
            var embed = new MessageEmbed()
                .setAuthor({name: message.author.username, iconURL: message.author.avatarURL()})
                .setDescription("» " + num.toString())
                .setColor('RANDOM')
                .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL() });
            message.delete()
            data('write', 'global', 'gbcounting', 'lastGuild', message.guild.id.toString())
            data('write', 'global', 'gbcounting', 'lastUser', message.author.id.toString())
            if(data('read', 'user', message.author.id, 'counted') === false){
                data('write', 'user', message.author.id, 'counted', `1`)
            } else {
                var num = parseInt(data('read', 'user', message.author.id, 'counted'))
                num = num + 1
                data('write', 'user', message.author.id, 'counted', num.toString())
            }
                for(var i in arr){

                    

                        try {
                            client.channels.cache.get(arr[i].toString()).send({embeds: [embed]})
                        } catch{
                            
                        }
                        

                    
                }
            } else {
                message.delete()
                if(data('read', 'global', 'gbcounting', 'lastGuild') === message.guild.id){
                   message.author.send(`Your server cannot count twice in a row in Xero's ***Global* Counting!** Please wait for another server to count!`) 
                }
                if(data('read', 'global', 'gbcounting', 'lastUser') === message.author.id){
                    message.author.send(`You cannot count twice in a row in Xero's ***Global* Counting!** Please wait for someone else in another server to count!`) 
                 }
            }
        }
    
        }
    
    } 
