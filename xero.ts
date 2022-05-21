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
client.msgfeatures = new Collection()

//commands
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
//message features (leveling, counting, etc)
const msgfeatures = fs.readdirSync(path.resolve('./msgfeatures')).filter(file => file.endsWith(`.js` || `.ts`))
for (const file of msgfeatures){
    const feature = require(`./msgfeatures/` + file)
    try {
    client.msgfeatures.set(feature.data.id, feature)
}
    catch(err) {
        console.error(err)
    }
}
//data thing
//fuck databases or wtv
function data(func, type, id, string, val){
    try {
    //check if exists
    if(func === 'exists'){
        if(fs.existsSync(`./data/${type}/${id}.json`)){
            return true
        } else {
            return false
        }
    }
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
            return obj[res].toString()
        }
    }
    //writing to a file
    if(func === "write"){
        if(fs.existsSync(`./data/${type}/${id}.json`)){
            var obj = JSON.parse(fs.readFileSync(`./data/${type}/${id}.json`, `utf-8`))
            var arr = new Set()
            Object.keys(obj).forEach((key) => {
                if(key === string){
                    if(string in obj){
                    obj[key] = val
                    }
                }
            })
            if(string in obj === false){
                obj[string] = val
            }
            fs.writeFileSync(`./data/${type}/${id}.json`, JSON.stringify(obj))
        } else {
            fs.writeFileSync(`./data/${type}/${id}.json`, `{"${string}": "${val}"}`)
        }
    }
} catch(err) {
    console.error(err)
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
//message features (leveling, counting, etc)
client.on('messageCreate', message => {
    if(!message.author.bot){
        client.msgfeatures.forEach((feature) => {
            try {
                feature.execute(message, data, client, Discord)
            } catch(err){
                console.log(err)
            }
        })
    }
})
//slash commands
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