

		if(!data(`exists`, `guild`, message.guild.id, ``, ``)){

            data(`write`, `guild`, message.guild.id, `levelChannel`, `0`)

        } else {

            if(data(`read`, `guild`, message.guild.id, `levelChannel`, ``) != "0"){

                if(!data(`exists`, `user`, message.author.id, ``, ``)){

                    data(`write`, `user`, message.author.id, `xp`, `0`)
                    data(`write`, `user`, message.author.id, `pointsNeeded`, `35`)
                    data(`write`, `user`, message.author.id, `level`, `0`)

                } else {

                    var points = parseInt(data(`read`, `user`, message.author.id, `xp`, ``)) + 1
                    points = points.toString()
                    if(points === data(`read`, `user`, message.author.id, `pointsNeeded`, ``)){

                        var newlvl = parseInt(data(`read`, `user`, message.author.id, `level`, ``)) + 1
                        var pointsNeed = parseInt(data(`read`, `user`, message.author.id, `pointsNeeded`, ``)) * 1.4
                        pointsNeed = parseInt(pointsNeed)

                        data(`write`, `user`, message.author.id, `level`, newlvl.toString())
                        data(`write`, `user`, message.author.id, `pointsNeeded`, pointsNeed.toString())
                        data(`write`, `user`, message.author.id, `xp`, `0`)
                        var channel = data(`read`, `guild`, message.guild.id, `levelChannel`, ``)
                        try {
                        client.channels.cache.get(channel).send(`Congrats **${message.author.username}**, you leveled up to level **${newlvl}**`)
                        } catch(err){
                            console.error(err)
                        }

                    }
                    data(`write`, `user`, message.author.id, `xp`, points)
                }
            }
        }
	
