const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageActionRow, MessageButton, Message, Discord, MessageEmbed } = require('discord.js');
const { Permissions } = require('discord.js');
const fs = require('fs');
const path = require('path')
module.exports = {
	data: new SlashCommandBuilder()
    .setName('faction')
	.setDescription('Xero Factions')
	.addSubcommand(subcommand =>
		subcommand
			.setName('create')
			.setDescription('Create a faction')
			.addStringOption(option => option.setName('factionname').setDescription('Faction Name').setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
            .setName('delete')
            .setDescription('Delete your faction'))
    .addSubcommand(subcommand =>
        subcommand
            .setName('invite')
            .setDescription('Invite a user to your faction')
            .addUserOption(option => option.setName('user').setDescription('User')))
    .addSubcommand(subcommand =>
        subcommand
            .setName('info')
            .setDescription('See faction info for a user')
            .addUserOption(option => option.setName('factionuser').setDescription('Faction User')))
    .toJSON(),

    async execute(interaction, data, client, Discord, splashtext) {

        if(interaction.options.getSubcommand() === 'create'){

            if(data(`read`, `user`, interaction.user.id, `faction`) === false || data(`read`, `user`, interaction.user.id, `faction`) === "0"){

                var factionId = Date.now()
                var factionName = interaction.options.getString('factionname')

                const files = fs.readdirSync(path.resolve('./data/faction'))
                    for (const file of files){

                        var scanName = JSON.parse(fs.readFileSync(`./data/faction/${file}`)).name.toLowerCase()

                        if(scanName === factionName.toLowerCase()){

                            return interaction.reply('That name is taken!')

                        }
                        
                    }

                var embed = new MessageEmbed()
                .setAuthor({name: '✔️ Faction Created! ✔️'})
                .setTitle(`『 ${factionName} 』`)
                .addField("Owner", interaction.user.username, true)
                .addField('Level', '1', true)
                .setFooter({ text: 'ID: ' + factionId})
                .setColor('RANDOM')
                interaction.channel.send('Factions are heavily Work-In-Progress, so be aware your faction may be deleted')

                data('write', 'faction', factionId, 'name', factionName.toString())
                data('write', 'faction', factionId, 'owner', interaction.user.id.toString())
                data('write', 'faction', factionId, 'members', `${interaction.user.id.toString()}`)
                data('write', 'faction', factionId, 'level', `1`)
                data('write', 'user', interaction.user.id, 'faction', factionId.toString())

                interaction.reply({embeds: [embed]})
            } else {
                interaction.reply({content: "❌ You are already in a faction! ❌"})
            }
        }

        if(interaction.options.getSubcommand() === 'delete'){

            var factionId = data('read', 'user', interaction.user.id, 'faction')

            if(factionId === false || factionId === '0'){

                return interaction.reply('❌ You are not in a faction! ❌')

            }

            if(data('read', 'faction', factionId, "owner") === interaction.user.id.toString()){

                var dataArray = data('read', 'faction', factionId, 'members').split(' ')

                dataArray.forEach(user => 

                    data('write', 'user', user, "faction", '0')

                )

                fs.unlinkSync(`./data/faction/${factionId}.json`)
                return interaction.reply('✔️ Faction Deleted ✔️')

            } else {

                return interaction.reply('❌ You do not own this faction! ❌')

            }

        }

        if(interaction.options.getSubcommand() === 'info'){

            if(interaction.options.getUser(`factionuser`)){

                interaction.user = interaction.options.getUser(`factionuser`)
    
                if(interaction.user.bot){
    
                    interaction.reply(`You cannot get information on a bot!`)
                    return
                    
                }
            }

            var factionId = data('read', 'user', interaction.user.id, 'faction')

            if(factionId != false || factionId != '0'){

                var factionName = data('read', 'faction', factionId, 'name')
                var factionOwner = data('read', 'faction', factionId, 'owner')
                var factionMembers = data('read', 'faction', factionId, 'members').split(' ').length
                var factionLevel = data('read', 'faction', factionId, 'level')

                var embed = new MessageEmbed()
                .setAuthor({name: '『 ' + factionName.toString() + ' 』'})
                .addField(`Members`, factionMembers.toString(), true)
                .addField(`Owner`, `<@!` + factionOwner + ">", true)
                .addField(`Level`, factionLevel)
                .setColor('RANDOM')
                .setFooter({ text: splashtext, iconURL: client.user.avatarURL() });
                await interaction.reply({embeds: [embed]})

            } else {

                interaction.reply('❌ This user is not in a faction! ❌')

            }
        }
    }
}