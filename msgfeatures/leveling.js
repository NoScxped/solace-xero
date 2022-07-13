const { MessageEmbed } = require("discord.js")

if(!leveling.has(message.author.id)){
                leveling.add(message.author.id)
                function cool(){

                    leveling.delete(message.author.id)
    
                }
                
                leveling.add(message.author.id)
                setTimeout(cool, 5000)
                    var points = parseInt(data.read(`./data/user/${message.author.id}.json`, `xp`)) + 1
                    points = points.toString()
                    var credits = parseInt(data.read(`./data/user/${message.author.id}.json`, `credits`))
                    
                    var rand = Math.floor(Math.random() * 5) + 1
                    if(data.read(`./data/user/${message.author.id}.json`, 'booster')){credits = credits + Math.ceil(rand * 1.75)} else { credits = credits + Math.floor(Math.random() * 5) + 1 }

                    data.write(`./data/user/${message.author.id}.json`, `credits`, credits.toString())
                    data.write(`./data/user/${message.author.id}.json`, `xp`, points)
                    if(points === data.read(`./data/user/${message.author.id}.json`, `pointsNeeded`, ``)){

                        var newlvl = parseInt(data.read(`./data/user/${message.author.id}.json`, `level`, ``)) + 1
                        var pointsNeed = parseInt(data.read(`./data/user/${message.author.id}.json`, `pointsNeeded`, ``)) * 1.2
                        pointsNeed = parseInt(pointsNeed)
                        data.write(`./data/user/${message.author.id}.json`, `level`, newlvl.toString())
                        data.write(`./data/user/${message.author.id}.json`, `pointsNeeded`, pointsNeed.toString())
                        data.write(`./data/user/${message.author.id}.json`, `xp`, `1`)
                        try {
                        var embed = new MessageEmbed()
                        .setTitle(`『 *Level up!* 』`)
                        .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL(), url: message.author.avatarURL() })
                        .setColor(`RANDOM`)
                        .setThumbnail(message.author.avatarURL())
                        .addField(`» ***${message.author.username}*** has leveled up!`, `› **You are now level __${newlvl}__!**`)
                        if(Math.floor((Math.random()*9)) === 8){
                            embed = new MessageEmbed()
                            .setTitle(`😱😱***__Level Up!__***😍😍`)
                            .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL(), url: message.author.avatarURL() })
                            .setColor(`RANDOM`)
                            .setThumbnail(message.author.avatarURL())
                            .addField(`Good job my little  ***__${message.author.username}__***  pog champ 🥺, you've ⬆️ ***__LEVEL UPED⬆️__***`, `**Keep on going and get to level ${newlvl + 1}**😊`)
                        }
                        if(data.read(`./data/guild/${message.guild.id}.json`, 'levelMessages') === 'true' || !data.read(`./data/guild/${message.guild.id}.json`, 'levelMessages')) {
                           message.channel.send({embeds: [embed]}) 
                        }
                        
                        } catch(err){

                        }

                    }
                }
                
            