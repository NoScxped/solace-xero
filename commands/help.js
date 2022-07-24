const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Get help with all things Solace'),
	async execute(interaction, data, client, Discord, splashtext) {
        const fs = require('node:fs');
        const commands = [];
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`../commands/${file}`);
            commands.push(command.data);
        }
        var send = ''
        commands.forEach(command => {
            send = send + `**» ${command.name.charAt(0).toUpperCase() + command.name.slice(1)}** - *${command.description}*\n`
        })
        var embed = new MessageEmbed()
        .setTitle("『 Help 』")
        .setColor("RANDOM")
        .setDescription(send)
        .addField(`Usage`, 'Slash commands ( **/** ) work *|* The old prefix ( **+** ) DOES NOT work anymore!')
        .setFooter({ text: splashtext.toString(), iconURL: client.user.avatarURL() });
        
        interaction.reply({embeds: [embed]})
    }
}