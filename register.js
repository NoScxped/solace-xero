const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require('./configuration.json');
const fs = require('node:fs');
const apollo = require(`apollo.console`)

apollo.setPort(8000)
apollo.setHostname(`localhost`)
apollo.setName('Xero')

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Place your client and guild ids here
const clientId = config.client_id

apollo.log('Registering Slash Commands...');

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	if(command.data.description.toString() != '(Ignore)'){
        commands.push(command.data);	
        }
}

const rest = new REST({ version: '9' }).setToken(config.token);

(async () => {
	try {

		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		apollo.log('All Slash Commands Registered.');
	} catch (error) {
		apollo.log(error);
	}
})();