for(var i in challenges){
    
       if(parseInt(data.read(`./data/user/${message.author.id}.json`, challenges[i].required_item)) >= challenges[i].required_amount){

            var splashtext = splash[Math.floor((Math.random()*splash.length))]
            var credits = parseInt(data.read(`./data/user/${message.author.id}.json`, "credits")) + challenges[i].credits_reward

            var embed = new MessageEmbed()
                .setAuthor({name: `${message.author.username} completed a challenge!`})
                .setTitle(`『 ${challenges[i].name} 』`)
                .setDescription(`» ${challenges[i].description}`)
                .addField(`Reward`, `${challenges[i].credits_reward} ⌬`)
                .setColor(`RANDOM`)
                .setFooter({ text: splashtext, iconURL: client.user.avatarURL() });

                

        if(data.read(`./data/user/${message.author.id}.json`, `challenges`)){

            if(!data.read(`./data/user/${message.author.id}.json`, `challenges`).includes(challenges[i].id)){

                var challenge = data.read(`./data/user/${message.author.id}.json`, 'challenges').split(',')
                challenge.push(challenges[i].id)
                data.write(`./data/user/${message.author.id}.json`, 'challenges', challenge.toString())
                data.write(`./data/user/${message.author.id}.json`, `credits`, credits.toString())
                if(data.read(`./data/guild/${message.guild.id}.json`, 'challengeMessages') === 'true' || !data.read(`./data/guild/${message.guild.id}.json`, 'challengeMessages')) {
                    message.reply({embeds: [embed]}) 
                 }
                
            }
            
        } else {

                data.write(`./data/user/${message.author.id}.json`, `credits`, credits.toString())
                if(data.read(`./data/guild/${message.guild.id}.json`, 'challengeMessages') === 'true' || !data.read(`./data/guild/${message.guild.id}.json`, 'challengeMessages')) {
                    message.reply({embeds: [embed]}) 
                 }
            data.write(`./data/user/${message.author.id}.json`, 'challenges', `${challenges[i].id}`)

        }
       }
    
}