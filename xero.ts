const {Discord, Client, Collection, MessageEmbed, Intents} = require('discord.js')
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES],
    allowedMentions: {
        repliedUser: false,
        parse: ['users', 'roles']
    }
})
const config = require(`./config.json`)
const fs = require('fs')
const path = require('path')
module.exports = client;
client.commands = new Collection();

const commands = fs.readdirSync(path.resolve('./commands')).filter(file => file.endsWith(`.js` || `.ts`))
for (const file of commands){
    const command = require(`./commands/` + file)
    try {
    client.commands.set(command.data.name, command)
}
    catch(err) {
        console.error(err)
    }
}

//data thing
//fuck databases or wtv
function data(func, type, id, string, val){
    //reading a file
    if(func === "read"){
        if(fs.existsSync(`./data/${type}/${id}.json`)){
            var obj = JSON.parse(fs.readFileSync(`./data/${type}/${id}.json`, `utf-8`))
            var res = ''
            for(var i in obj){
                if (i = string){
                    res = i
                }
            }
            return res
        }
    }
    //writing to a file
    if(func === "write"){
        if(fs.existsSync(`./data/${type}/${id}.json`)){
            var obj = JSON.parse(fs.readFileSync(`./data/${type}/${id}.json`, `utf-8`))
            var arr = new Set()
            console.log(obj)
            Object.keys(obj).forEach((key) => {
                if(key === string){
                    if(string in obj){
                    console.log(obj[key])
                    obj[key] = val
                    }
                }
            })
            if(string in obj === false){
                obj[string] = val
            }
            fs.writeFileSync(`./data/${type}/${id}.json`, JSON.stringify(obj))
        }
    }
}
client.on('ready', () => {
    console.log(`Logged in`)
    try {
        var link = null
        if(config.url){
            link = config.url
        }
      client.user.setPresence({ activities: [{ name: config.status_message, type: config.status_type, url: link }] });  
    } catch {
        console.error()
    }
})

client.on(`interactionCreate`, async interaction => {
    if(interaction.isCommand()){
        const command = client.commands.get(interaction.commandName)
        try {
            await command.execute(interaction, data, client, Discord)
        } catch (error) {
            console.error(error)
            await interaction.reply({ content: 'There was an error executing this command!', ephemeral: true })
        }
    }
})
client.login(config.token)