const {Discord, Client, Collection, MessageEmbed, Intents} = require('discord.js')
const data = require('apollo.data')
const apollo = require("apollo.console")
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES],
    allowedMentions: {
        repliedUser: false,
        parse: ['users', 'roles']
    }
})

apollo.setPort(8000)
apollo.setHostname(`localhost`)
apollo.setName('Xero')
var challenges = JSON.parse(data.read(`./data/global/challenges.json`))
var worked = new Set()
var fight = new Set()
var fought = new Set()
var leveling = new Set()
const config = JSON.parse(data.read(`configuration.json`))
const fs = require('fs')
var splash = data.read(`./data/global/splashes.xero`).split(`^`)
const path = require('path')
module.exports = client;
client.commands = new Collection();
client.msgfeatures = new Collection()

//commands
const commands = fs.readdirSync(path.resolve('./commands')).filter(file => file.endsWith(`.js` || `.ts`))
apollo.log('Starting Xero...')
for (const file of commands){
    const command = require(`./commands/` + file)
    try {
    client.commands.set(command.data.name, command)
}
    catch(err) {
        apollo.log(err)
    }
}
apollo.log(`Loaded commands.`)

//message features (leveling, counting, etc)
const msgfeatures = fs.readdirSync(path.resolve('./msgfeatures')).filter(file => file.endsWith(`.js` || `.ts`))
var features = new Set()
for (const file of msgfeatures){
    try {
    features.add(file)
}
    catch(err) {
        apollo.log(err)
    }
}


client.on('ready', () => {  
    apollo.log(`Logged in`)
    try {
        var link = null
        if(config.url){
            link = config.url
        }
      client.user.setPresence({ activities: [{ name: config.status_message, type: config.status_type, url: link }] });  
    } catch(err) {
        apollo.log(err)
    }
})

//message features (leveling, counting, etc)
client.on('messageCreate', message => {
    if(!message.author.bot){
        if(!data.exists(`./data/user/${message.author.id}.json`)){

            data.write(`./data/user/${message.author.id}.json`, `xp`, `0`)
            data.write(`./data/user/${message.author.id}.json`, 'pointsNeeded', `35`)
            data.write(`./data/user/${message.author.id}.json`, 'level', `0`)
            data.write(`./data/user/${message.author.id}.json`, 'credits',`100`)
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
        if(!data.exists(`./data/user/${interaction.user.id}.json`)){

            data.write(`./data/user/${interaction.user.id}.json`, `xp`, `0`)
            data.write(`./data/user/${interaction.user.id}.json`, 'pointsNeeded', `35`)
            data.write(`./data/user/${interaction.user.id}.json`, 'level', `0`)
            data.write(`./data/user/${interaction.user.id}.json`, 'credits', `100`)
        }
        try {
            var splashtext = splash[Math.floor((Math.random()*splash.length))]
            await command.execute(interaction, data, client, Discord, splashtext, worked, fight, fought)
        } catch (error) {
            apollo.log(error)
            await interaction.reply({ content: 'There was an error executing this command!', ephemeral: true })
        }
    }
})

client.login(config.token)