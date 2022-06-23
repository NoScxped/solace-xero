const { MessageEmbed } = require("discord.js")

    if(!data(`exists`, `guild`, message.guild.id, ``, ``)){

            data(`write`, `guild`, message.guild.id, `levelChannel`, `0`)

        } else {

                if(data("read", "user", message.author.id, "xp") != false){

                    var points = parseInt(data(`read`, `user`, message.author.id, `xp`, ``)) + 1
                    points = points.toString()
                    var credits = parseInt(data(`read`, `user`, message.author.id, `credits`, ``))
                    credits = credits + Math.floor(Math.random() * 5) + 1
                    credits = credits.toString()
                    data(`write`, `user`, message.author.id, `credits`, credits)
                    data(`write`, `user`, message.author.id, `xp`, points)
                    if(points === data(`read`, `user`, message.author.id, `pointsNeeded`, ``)){

                        var newlvl = parseInt(data(`read`, `user`, message.author.id, `level`, ``)) + 1
                        var pointsNeed = parseInt(data(`read`, `user`, message.author.id, `pointsNeeded`, ``)) * 1.2
                        pointsNeed = parseInt(pointsNeed)
                        data(`write`, `user`, message.author.id, `level`, newlvl.toString())
                        data(`write`, `user`, message.author.id, `pointsNeeded`, pointsNeed.toString())
                        data(`write`, `user`, message.author.id, `xp`, `1`)
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
                        message.channel.send({embeds: [embed]})
                        } catch(err){

                        }

                    }
                }
            }