const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
var https = require('https');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('joke')
		.setDescription('Get a joke!'),
	async execute(interaction, data, client, Discord, splashtext) {
        let joke = ''
        
        https.get('https://v2.jokeapi.dev/joke/Any?blacklistFlags=racist,sexist&type=single', (resp) => {
        resp.on('data', (part) => {
            joke += part;
        });

        resp.on('end', () => {

        var embed = new MessageEmbed()
        .setTitle(`Here's a ${JSON.parse(joke).category} Joke!`)
        .setDescription(`*${JSON.parse(joke).joke}*`)
        .setColor("RANDOM")
        .setFooter({text: "Thanks to https://sv443.net/jokeapi/v2/ for the jokes!"})

        interaction.reply({embeds: [embed]})

          });
        
        }).on("error", (err) => {
        return err
        });
       
    }
}