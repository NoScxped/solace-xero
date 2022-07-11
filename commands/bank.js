const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Message, Discord, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bank')
		.setDescription('Deposit and Withdraw!')
        .addSubcommand(subcommand =>
            subcommand
                .setName('deposit')
                .setDescription('Deposit some Credits!')
                .addIntegerOption(option => option.setName('credits').setDescription('Specify some Credits').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('withdraw')
                .setDescription('Withdrawl some Credits!')
                .addIntegerOption(option => option.setName('credits').setDescription('Specify some Credits').setRequired(true))),
	async execute(interaction, data, client, Discord, splashtext) {
        var userCredits = parseInt(data.read(`./data/user/${interaction.user.id}.json`, 'credits'))
        var bankCredits = interaction.options.getInteger('credits')
        var currentBank = parseInt(data.read(`./data/user/${interaction.user.id}.json`, 'bank'))
        
        if(interaction.options.getSubcommand() === 'deposit'){

            if(bankCredits > userCredits){

                    return interaction.reply(`<:xmark:994105062353817682> *You do not have enough Credits for this!* <:xmark:994105062353817682>`)

                }

                if(userCredits - bankCredits <= 0){

                    return interaction.reply(`<:xmark:994105062353817682> *That amoung would put you into the negatives!* <:xmark:994105062353817682>`)

                }


                var embed = new MessageEmbed()
                .setAuthor({name: `Deposit Success!`})
                .setColor(`RANDOM`)
                .setFooter({ text: splashtext, iconURL: client.user.avatarURL() });

            if(currentBank){

                var sum = currentBank + bankCredits
                var sub = userCredits - bankCredits

                if(sum > 10000){

                    return interaction.reply(`<:xmark:994105062353817682> *This amount breaks the capacity!* <:xmark:994105062353817682>`)

                } else {

                    data.write(`./data/user/${interaction.user.id}.json`, 'bank', sum.toString())
                    data.write(`./data/user/${interaction.user.id}.json`, 'credits', sub.toString())

                    embed.addField(`» Bank`, `› ${sum} ⌬`, true)
                    embed.addField(`» Credits`, `› ${sub} ⌬`, true)

                    return interaction.reply({embeds: [embed]})

                }

            } else {

                if(bankCredits > 10000){

                    return interaction.reply(`<:xmark:994105062353817682> *This amount breaks the capacity!* <:xmark:994105062353817682>`)

                } else {

                    var sub = userCredits - bankCredits

                    data.write(`./data/user/${interaction.user.id}.json`, 'bank', bankCredits.toString())
                    data.write(`./data/user/${interaction.user.id}.json`, 'credits', sub.toString())

                    embed.addField(`» Bank`, `› ${bankCredits} ⌬`, true)
                    embed.addField(`» Credits`, `› ${sub} ⌬`, true)

                    return interaction.reply({embeds: [embed]})

                }

            }
        }
        if(interaction.options.getSubcommand() === 'withdraw'){

            if(!currentBank){
                return interaction.reply(`<:xmark:994105062353817682> *You don't have anything in the Bank!* <:xmark:994105062353817682>`)
            }

         if(bankCredits > currentBank)
            return interaction.reply(`<:xmark:994105062353817682> *That is more money than you currently have in the Bank!* <:xmark:994105062353817682>`)
        }

        withdraw = currentBank - bankCredits

        

        userCredits = userCredits + bankCredits

        var embed = new MessageEmbed()
            .setAuthor({name: `Withdraw Success!`})
            .setColor(`RANDOM`)
            .addField(`» Bank`, `› ${withdraw} ⌬`, true)
            .addField(`» Credits`, `› ${userCredits} ⌬`, true)
            .setFooter({ text: splashtext, iconURL: client.user.avatarURL() });

        data.write(`./data/user/${interaction.user.id}.json`, 'bank', withdraw.toString())
        data.write(`./data/user/${interaction.user.id}.json`, 'credits', userCredits.toString())

        if(withdraw === 0){ data.delete(`./data/user/${interaction.user.id}.json`, 'bank') }

        return interaction.reply({embeds: [embed]})
    }
}