const {Discord, Client, Collection, MessageEmbed, Intents} = require('discord.js')
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES],
    allowedMentions: {
        repliedUser: false,
        parse: ['users', 'roles']
    }
})

var worked = new Set()
const config = require(`./config.json`)
const fs = require('fs')
var splash = fs.readFileSync(`./data/global/splash_text.xero`, "utf-8")
splash = splash.split(`^`)
const path = require('path')
module.exports = client;
client.commands = new Collection();
client.msgfeatures = new Collection()

//commands
//this is only put in a function for the /reload command
function loadCommands(){
const commands = fs.readdirSync(path.resolve('./commands')).filter(file => file.endsWith(`.js` || `.ts`))
console.log('Starting Xero...')
for (const file of commands){
    const command = require(`./commands/` + file)
    try {
    client.commands.set(command.data.name, command)
}
    catch(err) {
        console.error(err)
    }
}
console.log(`Loaded commands.`)
}
loadCommands()

//message features (leveling, counting, etc)
const msgfeatures = fs.readdirSync(path.resolve('./msgfeatures')).filter(file => file.endsWith(`.js` || `.ts`))
var features = new Set()
for (const file of msgfeatures){
    try {
    features.add(file)
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
            if(obj[res] === undefined){
                return false
            } else {
            return obj[res]
            }
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
        if(data(`exists`, `user`, message.author.id) === false){

            data(`write`, `user`, message.author.id, `xp`, `0`)
            data(`write`, `user`, message.author.id, `pointsNeeded`, `35`)
            data(`write`, `user`, message.author.id, `level`, `0`)
            data(`write`, `user`, message.author.id, `credits`, `100`)
        }
     features.forEach((msgfeature) => {
         eval(fs.readFileSync(`./msgfeatures/${msgfeature}`, "utf-8"))
     })  
    }
})

//slash commands
client.on(`interactionCreate`, async interaction => {
    if(interaction.isCommand()){
        const command = client.commands.get(interaction.commandName)
        if(data(`exists`, `user`, interaction.user.id) === false){

            data(`write`, `user`, interaction.user.id, `xp`, `0`)
            data(`write`, `user`, interaction.user.id, `pointsNeeded`, `35`)
            data(`write`, `user`, interaction.user.id, `level`, `0`)
            data(`write`, `user`, interaction.user.id, `credits`, `100`)
        }
        try {
            var splashtext = splash[Math.floor((Math.random()*splash.length))]
            await command.execute(interaction, data, client, Discord, splashtext, loadCommands, worked)
        } catch (error) {
            console.error(error)
            await interaction.reply({ content: 'There was an error executing this command!', ephemeral: true })
        }
    }
})

client.login(config.token)