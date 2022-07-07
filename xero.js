const {Discord, Client, Collection, MessageEmbed, Intents} = require('discord.js')
const data = require('xerodata')
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES],
    allowedMentions: {
        repliedUser: false,
        parse: ['users', 'roles']
    }
})

var worked = new Set()
const config = JSON.parse(data.read(`config.json`))
const fs = require('fs')
var splash = data.read(`./data/global/splashes.xero`).split(`^`)
const path = require('path')
module.exports = client;
client.commands = new Collection();
client.msgfeatures = new Collection()

//commands
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
            await command.execute(interaction, data, client, Discord, splashtext, worked)
        } catch (error) {
            console.error(error)
            await interaction.reply({ content: 'There was an error executing this command!', ephemeral: true })
        }
    }
})

client.login(config.token)