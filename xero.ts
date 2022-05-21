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

client.on('ready', () => {
    console.log(`Logged in`)
    try {
      client.user.setPresence({ activities: [{ name: config.status_message, type: config.status_type }] });  
    } catch {
        console.error()
    }
})

client.on(`interactionCreate`, async interaction => {
    if(interaction.isCommand()){
        const command = client.commands.get(interaction.commandName)
        try {
            await command.execute(interaction, client, Discord)
        } catch (error) {
            console.error(error)
            await interaction.reply({ content: 'There was an error executing this command!', ephemeral: true })
        }
    }
})
client.login(config.token)