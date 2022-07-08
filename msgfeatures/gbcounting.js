const { MessageEmbed } = require("discord.js")
var arr = data.read(`./data/global/gbcounting.json`, 'channels').split(',')
if(arr.includes(message.channel.id.toString())){

        var cont = true

        if(!/^\d/.test(message.content)){
            message.delete()
            cont = false
        }
        var color = 0
        if(data.exists(data.exists(`./data/guild/${message.guild.id}.json`))){ color = data.read(`./data/guild/${message.guild.id}.json`, 'color') }
        else {
            var rng = Math.floor(Math.random() * 999999)
            data.write(`./data/guild/${message.guild.id}.json`, 'color', rng.toString())
            color = rng
        }
        if(cont != false){

        var num = parseInt(data.read(`./data/global/gbcounting.json`, 'number'))
        var arr = data.read(`./data/global/gbcounting.json`, 'channels').split(',')
        
        if(message.content != num + 1){

            message.delete()

        } else {
            if(data.read(`./data/global/gbcounting.json`, 'lastGuild') != message.guild.id && data.read(`./data/global/gbcounting.json`, 'lastUser') != message.author.id){
            num = num + 1
            data.write(`./data/global/gbcounting.json`, 'number', num.toString())
            var embed = new MessageEmbed()
                .setAuthor({name: message.author.username, iconURL: message.author.avatarURL()})
                .setDescription("» " + num.toString())
                .setColor(`#${color}`)
                .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL() });
            message.delete()
            data.write(`./data/global/gbcounting.json`, 'lastGuild', message.guild.id.toString())
            data.write(`./data/global/gbcounting.json`, 'lastUser', message.author.id.toString())
            if(!data.read(`./data/user/${message.author.id}.json`, 'counted')){
                data.write(`./data/user/${message.author.id}.json`, 'counted', `1`)
            } else {
                var num = parseInt(data.read(`./data/user/${message.author.id}.json`, 'counted'))
                num = num + 1
                data.write(`./data/user/${message.author.id}.json`, 'counted', num.toString())
            }
                for(var i in arr){

                    

                        try {
                            client.channels.cache.get(arr[i].toString()).send({embeds: [embed]})
                        } catch{
                            
                        }
                        

                    
                }
            } else {
                message.delete()
                if(data.read(`./data/global/gbcounting.json`, 'lastGuild') === message.guild.id){
                   message.author.send(`Your server cannot count twice in a row in Xero's ***Global* Counting!** Please wait for another server to count!`) 
                }
                if(data.read(`./data/global/gbcounting.json`, 'lastUser') === message.author.id){
                    message.author.send(`You cannot count twice in a row in Xero's ***Global* Counting!** Please wait for someone else in another server to count!`) 
                 }
            }
        }
    
        }
    
    } 
