const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Message, Discord, MessageEmbed } = require('discord.js');
//idk why this is a function i wrote this at midnight i couldve just done obj[key].name.charAt(0).toUpperCase() + obj[key].name.slice(1) but itll be ok trust the process
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
module.exports = {
	data: new SlashCommandBuilder()
		.setName('buy')
		.setDescription('Make a purchase from the Xero Shop')
        .addStringOption(option => option.setName('id').setDescription('Enter item ID (Can be found in /shop)').setRequired(true)),
	async execute(interaction, data, client) {
    const fs = require('node:fs');
        var obj = JSON.parse(fs.readFileSync(`./data/global/items.json`, `utf-8`))
            Object.keys(obj).forEach((key) => {

                if(interaction.options.getString(`id`) === obj[key].id){

                    if(parseInt(data(`read`, `user`, interaction.user.id, `credits`)) >= parseInt(obj[key].price)){
                        if(data(`read`, `user`, interaction.user.id, obj[key].id) != undefined){

                            var add = parseInt(data(`read`, `user`, interaction.user.id, obj[key].id)) + 1
                            var sub = parseInt(data(`read`, `user`, interaction.user.id, `credits`)) - parseInt(obj[key].price)

                            data(`write`, `user`, interaction.user.id, obj[key].id, add.toString())
                            data(`write`, `user`, interaction.user.id, `credits`, sub.toString())

                            interaction.reply(`Sucessfully purchased **` + obj[key].name + '**')

                        } else {
                            data(`write`, `user`, interaction.user.id, obj[key].id, `1`)
                            interaction.reply(`Sucessfully purchased **` + obj[key].name + '**')
                        }

                    } else {

                        interaction.reply(`You do not have enough money to buy this item!`)

                    }

                } else {

                    interaction.reply(`This item does not exist!`)

                }
            })
    }
}