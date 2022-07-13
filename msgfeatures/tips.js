const { MessageEmbed } = require("discord.js")

var rand = Math.floor(Math.random() * 100) + 1

if(rand === 1){

    if(data.exists(`./data/guild/${message.guild.id}.json`)){

        if(data.read(`./data/guild/${message.guild.id}.json`, 'tipMessages') === 'true' || !data.read(`./data/guild/${message.guild.id}.json`, 'tipMessages')){
    

    var messages = JSON.parse(data.read(`./data/global/tips.json`))

    var arr = []

    for(var i in messages){

        arr.push(messages[i])

    }

    var msg = arr[Math.floor(Math.random() * arr.length)]

    var embed = new MessageEmbed()
        .setAuthor({name: "Here's a Tip!"})
        .setTitle(`『 ${msg.name} 』`)
        .setDescription(`» ${msg.description}`)
        .setColor("RANDOM")
 try {
    message.reply({embeds: [embed]})
 } catch {
    //do nothing lmao
 }
    

        }
    }
}