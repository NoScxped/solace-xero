const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageActionRow, MessageButton, Message, Discord, MessageEmbed, MessageSelectMenu, UserFlags } = require('discord.js');
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
			.addStringOption(option => option.setName('factionname').setDescription('Faction Name').setRequired(true))
            .addStringOption(option => option.setName('factiondescription').setDescription('Faction Description').setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
            .setName('delete')
            .setDescription('Delete your faction'))
    .addSubcommand(subcommand =>
        subcommand
            .setName('leave')
            .setDescription('Leave your Faction'))
    .addSubcommand(subcommand =>
        subcommand
            .setName('invite')
            .setDescription('Invite a user to your faction')
            .addUserOption(option => option.setName('user').setDescription('User').setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
            .setName('invites')
            .setDescription('View your faction invites'))
    .addSubcommand(subcommand =>
        subcommand
            .setName('info')
            .setDescription('See faction info for a user')
            .addUserOption(option => option.setName('factionuser').setDescription('Faction User')))
    .addSubcommand(subcommand =>
        subcommand
            .setName('kick')
            .setDescription('Kick a user out of your Faction!')
            .addUserOption(option => option.setName('kickeduser').setDescription('Faction User').setRequired(true)))
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

                            return interaction.reply('<:xmark:994105062353817682> *That name is taken!* <:xmark:994105062353817682>')

                        }
                        
                    }

                var embed = new MessageEmbed()
                .setAuthor({name: `${interaction.user.username} created a Faction!`})
                .setTitle(`『 ${factionName} 』`)
                .addField("Owner", interaction.user.username, true)
                .addField('Level', '1', true)
                .setFooter({ text: 'ID: ' + factionId})
                .setColor('RANDOM')

                data('write', 'faction', factionId, 'name', factionName.toString())
                data('write', 'faction', factionId, 'owner', interaction.user.id.toString())
                data('write', 'faction', factionId, 'members', `${interaction.user.id.toString()}`)
                data('write', 'faction', factionId, 'level', `1`)
                data('write', 'faction', factionId, 'description', interaction.options.getString('factiondescription'))
                data('write', 'user', interaction.user.id, 'faction', factionId.toString())

                interaction.reply({embeds: [embed]})
            } else {
                interaction.reply({content: "<:xmark:994105062353817682> *You are already in a faction!* <:xmark:994105062353817682>"})
            }
        }

        if(interaction.options.getSubcommand() === 'delete'){

            var factionId = data('read', 'user', interaction.user.id, 'faction')

            if(factionId === false || factionId === '0'){

                return interaction.reply('<:xmark:994105062353817682> *You are not in a faction!* <:xmark:994105062353817682>')

            }

            if(data('read', 'faction', factionId, "owner") === interaction.user.id.toString()){

                var dataArray = data('read', 'faction', factionId, 'members').split(',')

                dataArray.forEach(user => 

                    data('delete', 'user', user, "faction")

                )

                fs.unlinkSync(`./data/faction/${factionId}.json`)
                return interaction.reply('<:checkmark:994105025292943390> *Faction Deleted!* <:checkmark:994105025292943390>')

            } else {

                return interaction.reply('<:xmark:994105062353817682> *You do not own this faction!* <:xmark:994105062353817682>')

            }

        }

        if(interaction.options.getSubcommand() === 'info'){

            if(interaction.options.getUser(`factionuser`)){

                interaction.user = interaction.options.getUser(`factionuser`)
    
                if(interaction.user.bot){
    
                    interaction.reply(`<:xmark:994105062353817682> *You cannot get information on a bot!* <:xmark:994105062353817682>`)
                    return
                    
                }
            }

            var factionId = data('read', 'user', interaction.user.id, 'faction')

            if(factionId != false || factionId != '0'){

                var factionName = data('read', 'faction', factionId, 'name')
                var factionOwner = data('read', 'faction', factionId, 'owner')
                var factionMembers = data('read', 'faction', factionId, 'members').split(',').length
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

                interaction.reply('<:xmark:994105062353817682> *This user is not in a faction!* <:xmark:994105062353817682>')

            }
        }
        //invite a user
        if(interaction.options.getSubcommand() === 'invite'){

            var invites = data('read', 'user', interaction.options.getUser('user').id, 'invites')

            var factionId = data('read', 'user', interaction.user.id, 'faction')

            if(data('read', 'user', interaction.user.id, 'faction') === false){
                return interaction.reply('<:xmark:994105062353817682> *You are not in a Faction* <:xmark:994105062353817682>')
            }

            if(interaction.options.getUser('user').id === interaction.user.id){

                return interaction.reply('<:xmark:994105062353817682> *Your cannot invite yourself!* <:xmark:994105062353817682>')

            }

            if(data('read', 'faction', factionId, 'owner') != interaction.user.id.toString()){
                return interaction.reply('You do not own a Faction!')
            }

            if(data('exists', 'user', interaction.options.getUser('user').id)){

            if(invites != false){
                if(invites.toString().includes(factionId.toString())){
                return interaction.reply({content: "<:xmark:994105062353817682> *You have already invited this user!* <:xmark:994105062353817682>"})
            }
            }
        }
            
            var embed = new MessageEmbed()
            .setAuthor({name: 'You invited a user to the Faction!'})
            .setTitle(`『 ${data('read', 'faction', factionId, 'name')} 』`)
            .setDescription('» ***' + interaction.user.username + '*** *invited* ***' + interaction.options.getUser('user').username + '***')
            .setColor(`RANDOM`)

            var invId = data('read', 'user', interaction.user.id, 'faction')

            if(data('read', 'user', interaction.options.getUser('user').id, 'invites') === false){

            data('write', 'user', interaction.options.getUser('user').id, 'invites', invId.toString( ))

            
            return interaction.reply({embeds: [embed]})

            } else {
                    if(invites.split(',').length > 24){
                        return interaction.reply(`<:xmark:994105062353817682> *This user has the maximum **25** pending invites!* <:xmark:994105062353817682>`)
                    }
                
                invites = invites.split(',')
                invites.push(invId.toString())
                invites = invites.toString()
                data('write', 'user', interaction.options.getUser('user').id, 'invites', invites)
                return interaction.reply({embeds: [embed]})
                

            }
        }
        //view invites and join factions
        if(interaction.options.getSubcommand() === 'invites'){

            var invites = data('read', 'user', interaction.user.id, 'invites')

            if(!invites){

                await interaction.reply({ content: '<:xmark:994105062353817682> *You do not have any invites :(* <:xmark:994105062353817682>'})
                return

            }
            invites = invites.split(',')
            const msg = await interaction.reply({ content: '<a:typing:994063591340773466> *Xero is thinking* <a:typing:994063591340773466>', fetchReply: true, embeds: [], components: []})
        
            var embed = new MessageEmbed()
                .setAuthor({name: "Here are your Faction Invites!"})
                .setDescription(`» Select a Faction`)
                .setColor(`RANDOM`)
                .setFooter({ text: `You have 30 seconds to reply!`, iconURL: client.user.avatarURL() });

            const row = new MessageActionRow()
			    .addComponents(
				    new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Select a Faction'));

        for(var i of invites){
                var faction = JSON.parse(data('read', 'faction', i))

                       row.components[0].addOptions([{
                            label: `${faction.name}`,
                            description: `${faction.description}`,
                            value: `${i}`,
                            }]); 
                    
                            
            
            }
           await msg.edit({content: "_ _", embeds: [embed], components: [row]})
           var filter = i => i.user.id === interaction.user.id
            const collector = interaction.channel.createMessageComponentCollector({filter, idle: 30000})
                var cont = true
                var res = false

            var str = ""
            collector.on(`collect`, async i => {
                var invites = data('read', 'user', interaction.user.id, 'invites').split(',')
                var faction = null

                await i.deferUpdate()

                if(i.values){
                  str = Array.from(i.values)  
                }

                if(i.customId){

                if(i.customId === 'accept'){

                    if(data('read', 'user', interaction.user.id, 'faction') != false){
                        //faction join attempt, already in faction
                        await msg.edit({content: "<:xmark:994105062353817682> *You are already in a Faction!* <:xmark:994105062353817682>", embeds: [], components: []})
                        res = true
                        collector.stop()
                        return
                    }
                    //join a faction
                var mbrs = data('read', 'faction', str[0], 'members').split(',')
                invites = invites.filter(e => e !== str[0]);
                mbrs.push(interaction.user.id)
                data('write', 'faction', str[0], 'members', mbrs.toString())
                data('write', 'user', interaction.user.id, 'invites', invites.toString())
                data('write', 'user', interaction.user.id, 'faction', str[0].toString())
                if(invites.length === 0){
                    data('delete', 'user', interaction.user.id, 'invites')
                }

                embed = new MessageEmbed()
                    .setAuthor({name: "You have joined a Faction!"})
                    .setTitle(`『 ${data('read', 'faction', str[0], 'name')} 』`)
                    .setDescription('» [+] *' + interaction.user.username + '*')
                    .setColor("RANDOM")
                    .setFooter({ text: splashtext, iconURL: client.user.avatarURL() });

                    await msg.edit({embeds: [embed], components: []})

                    res = true
                    collector.stop()
                    return

                
                }

                if(i.customId === 'deny'){
                    //decline invite

                    cont  = false
                    collector.stop()

                }

                if(i.customId === 'delete'){
                    //remove invite

                    await msg.edit({content: "🗑️ *Invite deleted!* 🗑️", embeds: [], components: []})

                    invites = invites.filter(e => e !== str[0]);
                    data('write', 'user', interaction.user.id, 'invites', invites.toString())
                    if(invites.length === 0){
                        data('delete', 'user', interaction.user.id, 'invites')
                    }

                    cont  = false
                    res = true
                    collector.stop()
                    return

                }
            }
                for(var i in invites){

                    if(cont === true){
                    
                    if(invites[i] === str[0]){

                        faction = JSON.parse(data('read', 'faction', invites[i]))

                        var embed = new MessageEmbed()
                        .setAuthor({name: "Would you like to join this Faction?"})
                        .setTitle(`『 ${faction.name} 』`)
                        .setDescription(`» ${faction.description}`)
                        .addField(`» Members`, `› ${faction.members.split(',').length}`)
                        .setColor(`RANDOM`)
                        .setFooter({ text: `You have 30 seconds to reply!`, iconURL: client.user.avatarURL() });

                        var acceptbar = new MessageActionRow()
                         .addComponents(

                         new MessageButton()
                            .setCustomId(`accept`)
                            .setEmoji('<:checkmark:994105025292943390>')
                            .setStyle(`SUCCESS`),

                        new MessageButton()
                            .setCustomId(`deny`)
                            .setEmoji('<:xmark:994105062353817682>')
                            .setStyle(`DANGER`),

                        new MessageButton()
                            .setCustomId(`delete`)
                            .setEmoji('🗑️')
                            .setStyle(`DANGER`)

                        )

                        
                        
                
                        await msg.edit({embeds: [embed], components: [row, acceptbar]})
                    
                
                
                    }
                }
            }
            
        })

            collector.on(`end`, collected => {

                if(res === false){

                return msg.edit({content: "<:xmark:994105062353817682> *This interaction was cancelled* <:xmark:994105062353817682>", embeds: [], components: []})

                }
            })
        }
        //kick a user from the faction
    if(interaction.options.getSubcommand() === 'kick'){
        var factionId = data('read', 'user', interaction.user.id, 'faction')
        if(interaction.options.getUser('kickeduser').id === interaction.user.id){

            return interaction.reply('<:xmark:994105062353817682> *Your cannot kick yourself!* <:xmark:994105062353817682>')

        }

        if(!factionId){return interaction.reply(`You are not in a Faction!`)}

        if(data('read', 'faction', factionId, 'owner') != interaction.user.id.toString()){

            return interaction.reply('You do not own this Faction!')

        } else {

            var members = data('read', 'faction', factionId, 'members').split(',')

            if(members.includes(interaction.options.getUser(`kickeduser`).id.toString())){

                members = members.filter(e => e !== interaction.options.getUser(`kickeduser`).id);

                data('write', 'faction', factionId, 'members', members.toString())
                data('delete', 'user', interaction.options.getUser(`kickeduser`).id, 'faction')

                var embed = new MessageEmbed()
                .setAuthor({name: `You expelled a user from the Faction!`})
                .setTitle(`『 ${data('read', 'faction', factionId, 'name')} 』`)
                .setDescription(`» [x] *${interaction.options.getUser(`kickeduser`).username}*`)

                await interaction.reply({embeds: [embed]})

            } else {

                return interaction.reply(`<:xmark:994105062353817682> *This user is not in the Faction!* <:xmark:994105062353817682>`)

            }
        
    }
    }
    if(interaction.options.getSubcommand() === 'leave'){
        var factionId = data('read', 'user', interaction.user.id, 'faction')
        if(!factionId){return interaction.reply(`<:xmark:994105062353817682> *You are not in a Faction!* <:xmark:994105062353817682>`)}
        if(data('read', 'faction', factionId, 'owner') === interaction.user.id.toString()){return interaction.reply(`<:xmark:994105062353817682> *You cannot leave a Faction you own!* <:xmark:994105062353817682>`)}
        var members = data('read', 'faction', factionId, 'members').split(',')

            if(members.includes(interaction.user.id.toString())){

                members = members.filter(e => e !== interaction.user.id);
                data('write', 'faction', factionId, 'members', members.toString())
                data('delete', 'user', interaction.user.id, 'faction')
                var embed = new MessageEmbed()
                .setAuthor({name: `You have left the Faction!`})
                .setTitle(`『 ${data('read', 'faction', factionId, 'name')} 』`)
                .setDescription(`» [-] *${interaction.user.username}*`)
                await interaction.reply({embeds: [embed]})
            }
    }
    
}}