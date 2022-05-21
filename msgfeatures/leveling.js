    if(!data(`exists`, `guild`, message.guild.id, ``, ``)){

            data(`write`, `guild`, message.guild.id, `levelChannel`, `0`)

        } else {

            if(data(`read`, `guild`, message.guild.id, `levelChannel`, ``) != "0"){

                if(!data(`exists`, `user`, message.author.id, ``, ``)){

                    data(`write`, `user`, message.author.id, `xp`, `0`)
                    data(`write`, `user`, message.author.id, `pointsNeeded`, `35`)
                    data(`write`, `user`, message.author.id, `level`, `0`)
                    data(`write`, `user`, message.author.id, `credits`, `0`)

                } else {

                    var points = parseInt(data(`read`, `user`, message.author.id, `xp`, ``)) + 1
                    points = points.toString()
                    var credits = parseInt(data(`read`, `user`, message.author.id, `credits`, ``))
                    credits = credits + Math.floor(Math.random() * 5) + 1
                    credits = credits.toString()
                    data(`write`, `user`, message.author.id, `credits`, credits)
                    data(`write`, `user`, message.author.id, `xp`, points)
                    if(points === data(`read`, `user`, message.author.id, `pointsNeeded`, ``)){

                        var newlvl = parseInt(data(`read`, `user`, message.author.id, `level`, ``)) + 1
                        var pointsNeed = parseInt(data(`read`, `user`, message.author.id, `pointsNeeded`, ``)) * 1.4
                        pointsNeed = parseInt(pointsNeed)
                        data(`write`, `user`, message.author.id, `level`, newlvl.toString())
                        data(`write`, `user`, message.author.id, `pointsNeeded`, pointsNeed.toString())
                        data(`write`, `user`, message.author.id, `xp`, `1`)
                        var channel = data(`read`, `guild`, message.guild.id, `levelChannel`, ``)
                        try {
                        client.channels.cache.get(channel).send(`Congrats **${message.author.username}**, you leveled up to level **${newlvl}**`)
                        } catch(err){
                            console.error(err)
                        }

                    }
                }
            }
        }