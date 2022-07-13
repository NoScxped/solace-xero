const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
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
            .setName('members')
            .setDescription('Faction Member List'))
    .addSubcommand(subcommand =>
        subcommand
            .setName('leave')
            .setDescription('Leave your Faction'))
    .addSubcommand(subcommand =>
        subcommand
            .setName('add')
            .setDescription('Invite a user to your faction')
            .addUserOption(option => option.setName('user').setDescription('User').setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
            .setName('admin')
            .setDescription(`Toggle a User's Faction Admin Status`)
            .addUserOption(option => option.setName('admin').setDescription('Select a user').setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
            .setName('name')
            .setDescription(`Rename You Faction`)
            .addStringOption(option => option.setName('newname').setDescription('Choose a Name').setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
            .setName('description')
            .setDescription(`Choose a new Description for your Faction!`)
            .addStringOption(option => option.setName('newdescription').setDescription('Choose a Description').setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
            .setName('owner')
            .setDescription(`Transfer Ownership of a Faction`)
            .addUserOption(option => option.setName('newowner').setDescription('Select an Owner').setRequired(true)))
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

            if(!data.read(`./data/user/${interaction.user.id}.json`, `faction`)){

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
                .setDescription("» " + interaction.options.getString(`factiondescription`))
                .addField("Owner", interaction.user.username, true)
                .addField('Level', '1', true)
                .setFooter({ text: 'ID: ' + factionId})
                .setColor('RANDOM')

                data.write(`./data/faction/${factionId}.json`, 'name', factionName.toString())
                data.write(`./data/faction/${factionId}.json`, 'credits', `0`)
                data.write(`./data/faction/${factionId}.json`, 'owner', interaction.user.id.toString())
                data.write(`./data/faction/${factionId}.json`, 'members', `${interaction.user.id.toString()}`)
                data.write(`./data/faction/${factionId}.json`, 'level', `1`)
                data.write(`./data/faction/${factionId}.json`, 'description', interaction.options.getString('factiondescription'))
                data.write(`./data/user/${interaction.user.id}.json`, 'faction', factionId.toString())

                interaction.reply({embeds: [embed]})
            } else {
                interaction.reply({content: "<:xmark:994105062353817682> *You are already in a faction!* <:xmark:994105062353817682>"})
            }
        }

        if(interaction.options.getSubcommand() === 'owner'){

            var factionId = data.read(`./data/user/${interaction.user.id}.json`, 'faction')

            if(factionId === undefined){

                return interaction.reply('<:xmark:994105062353817682> *You are not in a faction!* <:xmark:994105062353817682>')

            }

            if(data.read(`./data/faction/${factionId}.json`, "owner") === interaction.user.id.toString()){

                var dataArray = data.read(`./data/faction/${factionId}.json`, 'members')

                if(!dataArray.includes(interaction.options.getUser('newowner').id.toString())){

                    return interaction.reply("<:xmark:994105062353817682> *This user is not in your Faction!* <:xmark:994105062353817682>")

                }


                data.write(`./data/faction/${factionId}.json`, 'owner', interaction.options.getUser('newowner').id.toString())

                var embed = new MessageEmbed()
                    .setAuthor({name: "You transferred Ownership of your Faction!"})
                    .setTitle(`『 ${data.read(`./data/faction/${factionId}.json`, 'name')} 』`)
                    .setDescription(`» [-] *${interaction.user.username}*\n» [+] *${interaction.options.getUser('newowner').username}*`)
                    .setColor('RANDOM')
                    .setFooter({ text: splashtext, iconURL: client.user.avatarURL() })
                    return interaction.reply({embeds: [embed]})

            } else {

                return interaction.reply('<:xmark:994105062353817682> *You do not own this faction!* <:xmark:994105062353817682>')

            }

        }
        //rename
        if(interaction.options.getSubcommand() === 'name'){

            var factionId = data.read(`./data/user/${interaction.user.id}.json`, 'faction')
            var factionName = interaction.options.getString(`newname`).toLowerCase()

            if(factionId === undefined){

                return interaction.reply('<:xmark:994105062353817682> *You are not in a faction!* <:xmark:994105062353817682>')

            }

            if(data.read(`./data/faction/${factionId}.json`, "owner") === interaction.user.id.toString()){


                const files = fs.readdirSync(path.resolve('./data/faction'))
                    for (const file of files){

                        var scanName = data.read(`./data/faction/${file}`, 'name')

                        if(scanName.toLowerCase() === factionName){

                            return interaction.reply('<:xmark:994105062353817682> *That name is taken!* <:xmark:994105062353817682>')

                        }
                        
                    }
                

                var embed = new MessageEmbed()
                    .setAuthor({name: "You Updated the Name of your Faction!"})
                    .setDescription(`» [-] *${data.read(`./data/faction/${factionId}.json`, 'name')}*\n» [+] *${interaction.options.getString('newname')}*`)
                    .setColor('RANDOM')
                    .setFooter({ text: splashtext, iconURL: client.user.avatarURL() })
                    interaction.reply({embeds: [embed]})
                    data.write(`./data/faction/${factionId}.json`, 'name', interaction.options.getString('newname'))
                    return

            } else {

                return interaction.reply('<:xmark:994105062353817682> *You do not own this faction!* <:xmark:994105062353817682>')

            }

        }

        if(interaction.options.getSubcommand() === 'delete'){

            var factionId = data.read(`./data/user/${interaction.user.id}.json`, 'faction')

            if(factionId === undefined){

                return interaction.reply('<:xmark:994105062353817682> *You are not in a faction!* <:xmark:994105062353817682>')

            }

            if(data.read(`./data/faction/${factionId}.json`, "owner") === interaction.user.id.toString()){

                var dataArray = data.read(`./data/faction/${factionId}.json`, 'members').split(',')

                dataArray.forEach(user => 

                    data.delete(`./data/user/${user}.json`, 'faction')

                )

                data.delete(`./data/faction/${factionId}.json`)
                return interaction.reply('<:checkmark:994105025292943390> *Faction Deleted!* <:checkmark:994105025292943390>')

            } else {

                return interaction.reply('<:xmark:994105062353817682> *You do not own this faction!* <:xmark:994105062353817682>')

            }

        }
        //re-description
        if(interaction.options.getSubcommand() === 'description'){

            var factionId = data.read(`./data/user/${interaction.user.id}.json`, 'faction')

            if(factionId === undefined){

                return interaction.reply('<:xmark:994105062353817682> *You are not in a faction!* <:xmark:994105062353817682>')

            }

            if(data.read(`./data/faction/${factionId}.json`, "owner") === interaction.user.id.toString()){


                

                var embed = new MessageEmbed()
                    .setAuthor({name: "You Updated the Description of your Faction!"})
                    .setDescription(`» *${interaction.options.getString('newdescription')}*`)
                    .setColor('RANDOM')
                    .setFooter({ text: splashtext, iconURL: client.user.avatarURL() })
                    interaction.reply({embeds: [embed]})
                    data.write(`./data/faction/${factionId}.json`, 'name', interaction.options.getString('newdescription'))
                    return

            } else {

                return interaction.reply('<:xmark:994105062353817682> *You do not own this faction!* <:xmark:994105062353817682>')

            }

        }

        if(interaction.options.getSubcommand() === 'delete'){

            var factionId = data.read(`./data/user/${interaction.user.id}.json`, 'faction')

            if(factionId === undefined){

                return interaction.reply('<:xmark:994105062353817682> *You are not in a faction!* <:xmark:994105062353817682>')

            }

            if(data.read(`./data/faction/${factionId}.json`, "owner") === interaction.user.id.toString()){

                var dataArray = data.read(`./data/faction/${factionId}.json`, 'members').split(',')

                dataArray.forEach(user => 

                    data.delete(`./data/user/${user}.json`, 'faction')

                )

                data.delete(`./data/faction/${factionId}.json`)
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

            var factionId = data.read(`./data/user/${interaction.user.id}.json`, 'faction')

            if(factionId){

                var factionName = data.read(`./data/faction/${factionId}.json`, 'name')
                var factionOwner = data.read(`./data/faction/${factionId}.json`, 'owner')
                var factionMembers = data.read(`./data/faction/${factionId}.json`, 'members').split(',')
                var factionLevel = data.read(`./data/faction/${factionId}.json`, 'level')
                var description = data.read(`./data/faction/${factionId}.json`, 'description')
                var credits = data.read(`./data/faction/${factionId}.json`, 'credits')
                var userCredits = 0

                for(var i in factionMembers){

                    var creds = parseInt(data.read(`./data/user/${factionMembers[i]}.json`, 'credits'))
                    userCredits = userCredits + creds
                    
                }

                var embed = new MessageEmbed()
                .setAuthor({name: '『 ' + factionName.toString() + ' 』'})
                .setDescription("» " + description)
                .addField(`Members`, factionMembers.length.toString() + '/30', true)
                .addField(`Owner`, `<@!` + factionOwner + ">", true)
                .addField(`Level`, factionLevel, true)
                .addField(`Faction Credits **⌬**`, credits + ' ⌬', true)
                .addField(`Total User Credits **⌬**`, userCredits + ' ⌬', true)
                .setColor('RANDOM')
                .setFooter({ text: splashtext, iconURL: client.user.avatarURL() });
                await interaction.reply({embeds: [embed]})

            } else {

                interaction.reply('<:xmark:994105062353817682> *This user is not in a faction!* <:xmark:994105062353817682>')

            }
        }
        //invite a user
        if(interaction.options.getSubcommand() === 'add'){

            if(!data.exists(`./data/user/${interaction.options.getUser('user').id}.json`)){

                data.write(`./data/user/${interaction.options.getUser('user').id}.json`, `xp`, `0`)
                data.write(`./data/user/${interaction.options.getUser('user').id}.json`, 'pointsNeeded', `35`)
                data.write(`./data/user/${interaction.options.getUser('user').id}.json`, 'level', `0`)
                data.write(`./data/user/${interaction.options.getUser('user').id}.json`, 'credits', `100`)
            }

            var invites = data.read(`./data/user/${interaction.options.getUser('user').id}.json`, 'invites')

            var factionId = data.read(`./data/user/${interaction.user.id}.json`, 'faction')

            if(!data.read(`./data/user/${interaction.user.id}.json`, 'faction')){
                return interaction.reply('<:xmark:994105062353817682> *You are not in a Faction* <:xmark:994105062353817682>')
            }

            if(interaction.options.getUser('user').id === interaction.user.id){

                return interaction.reply('<:xmark:994105062353817682> *Your cannot invite yourself!* <:xmark:994105062353817682>')

            }
        var admin = data.read(`./data/faction/${factionId}.json`, `admin`)

            if(!admin){

                admin = `1`

            }

        if(admin.includes(interaction.user.id) || data.read(`./data/faction/${factionId}.json`, 'owner') === interaction.user.id.toString()){

            if(data.exists(`./data/user/${interaction.options.getUser('user').id}.json`)){

            if(invites){
                if(invites.toString().includes(factionId.toString())){
                return interaction.reply({content: "<:xmark:994105062353817682> *You have already invited this user!* <:xmark:994105062353817682>"})

                }
            }
        }
            
            var embed = new MessageEmbed()
            .setAuthor({name: 'You invited a user to the Faction!'})
            .setTitle(`『 ${data.read(`./data/faction/${factionId}.json`, 'name')} 』`)
            .setDescription('» ***' + interaction.user.username + '*** *invited* ***' + interaction.options.getUser('user').username + '***')
            .setColor(`RANDOM`)

            var invId = data.read(`./data/user/${interaction.user.id}.json`, 'faction')

            if(!data.read(`./data/user/${interaction.options.getUser('user').id}.json`, 'invites')){

            data.write(`./data/user/${interaction.options.getUser('user').id}.json`, 'invites', invId.toString())

            
            return interaction.reply({embeds: [embed]})

            } else {

                    if(invites.split(',').length > 24){

                        return interaction.reply(`<:xmark:994105062353817682> *This user has the maximum **25** pending invites!* <:xmark:994105062353817682>`)

                    }
                
                invites = invites.split(',')
                invites.push(invId.toString())
                invites = invites.toString()
                data.write(`./data/user/${interaction.options.getUser('user').id}.json`, 'invites', invites)
                return interaction.reply({embeds: [embed]})
                

            }
        } else {

            return interaction.reply(`<:xmark:994105062353817682> *You do not have the Faction Permissions to do this!* <:xmark:994105062353817682>`)

        }
    }
        //view invites and join factions
        if(interaction.options.getSubcommand() === 'invites'){

            var invites = data.read(`./data/user/${interaction.user.id}.json`, 'invites')

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
            try{
                var faction = JSON.parse(data.read(`./data/faction/${i}.json`))

                       row.components[0].addOptions([{
                            label: `${faction.name}`,
                            description: `${faction.description}`,
                            value: `${i}`,
                            }]); 
            } catch {
                //sit on my ass and do nothing
            }
                
                    
                            
            
            }
           await msg.edit({content: "_ _", embeds: [embed], components: [row]})
           var filter = i => i.user.id === interaction.user.id
            const collector = interaction.channel.createMessageComponentCollector({filter, idle: 30000})
                var cont = true
                var res = false

            var str = ""
            collector.on(`collect`, async i => {
                var invites = data.read(`./data/user/${interaction.user.id}.json`, 'invites').split(',')
                var faction = null

                await i.deferUpdate()

                if(i.values){
                  str = Array.from(i.values)  
                }

                if(i.customId){

                if(i.customId === 'accept'){

                    if(data.read(`./data/user/${interaction.user.id}.json`, 'faction')){
                        //faction join attempt, already in faction
                        await msg.edit({content: "<:xmark:994105062353817682> *You are already in a Faction!* <:xmark:994105062353817682>", embeds: [], components: []})
                        res = true
                        collector.stop()
                        return
                    }
                    //join a faction
                var mbrs = data.read(`./data/faction/${str[0]}.json`, `members`).split(',')
                if(mbrs.length >= 30){return interaction.reply(`<:xmark:994105062353817682> *Factions are currently capped at 30 members!* <:xmark:994105062353817682>`)}
                invites = invites.filter(e => e !== str[0]);
                if(invites.length === 0){
                    data.delete(`./data/user/${interaction.user.id}.json`, 'invites')
                } else {
                    data.write(`./data/user/${interaction.user.id}.json`, 'invites', invites.toString())
                }
                mbrs.push(interaction.user.id)
                data.write(`./data/faction/${str[0]}.json`, 'members',  mbrs.toString())
                
                data.write(`./data/user/${interaction.user.id}.json`, 'faction', str[0].toString())
                

                embed = new MessageEmbed()
                    .setAuthor({name: "You have joined a Faction!"})
                    .setTitle(`『 ${data.read(`./data/faction/${str[0]}.json`, 'name')} 』`)
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
                    data.write(`./data/user/${interaction.user.id}.json`, 'invites', invites.toString())
                    if(invites.length === 0){
                        data.delete(`./data/user/${interaction.user.id}.json`, 'invites')
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

                        faction = JSON.parse(data.read(`./data/faction/${invites[i]}.json`))

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
        var factionId = data.read(`./data/user/${interaction.user.id}.json`, `faction`)
        if(interaction.options.getUser('kickeduser').id === interaction.user.id){

            return interaction.reply('<:xmark:994105062353817682> *Your cannot kick yourself!* <:xmark:994105062353817682>')

        }

        if(!factionId){return interaction.reply(`You are not in a Faction!`)}

        var admin = data.read(`./data/faction/${factionId}.json`, `admin`)

            if(!admin){

                admin = `1`

            }
            if(interaction.options.getUser(`kickedser`).id === data.read(`./data/faction/${factionId}.json`, 'owner')){return interaction.reply({content: "<:xmark:994105062353817682> *You cannot kick the Owner!* <:xmark:994105062353817682>"})}

        if(admin.includes(interaction.user.id) || data.read(`./data/faction/${factionId}.json`, 'owner') === interaction.user.id.toString()){

            var members = data.read(`./data/faction/${factionId}.json`, 'members').split(',')

            if(members.includes(interaction.options.getUser(`kickeduser`).id.toString())){

                members = members.filter(e => e !== interaction.options.getUser(`kickeduser`).id);

                data.write(`./data/faction/${factionId}.json`, 'members', members.toString())
                data.delete(`./data/user/${interaction.options.getUser(`kickeduser`).id}.json`, `faction`)

                var embed = new MessageEmbed()
                .setAuthor({name: `You expelled a user from the Faction!`})
                .setTitle(`『 ${data.read(`./data/faction/${factionId}.json`, 'name')} 』`)
                .setDescription(`» [x] *${interaction.options.getUser(`kickeduser`).username}*`)
                .setColor('RANDOM')

                await interaction.reply({embeds: [embed]})

            } else {

                return interaction.reply(`<:xmark:994105062353817682> *This user is not in the Faction!* <:xmark:994105062353817682>`)

            }

            

        } else {

            return interaction.reply('You do not own this Faction!')
        
    }
    }
    if(interaction.options.getSubcommand() === 'leave'){
        var factionId = data.read(`./data/user/${interaction.user.id}.json`, 'faction')
        if(!factionId){return interaction.reply(`<:xmark:994105062353817682> *You are not in a Faction!* <:xmark:994105062353817682>`)}
        if(data.read(`./data/faction/${factionId}.json`, 'owner') === interaction.user.id.toString()){return interaction.reply(`<:xmark:994105062353817682> *You cannot leave a Faction you own!* <:xmark:994105062353817682>`)}
        var members = data.read(`./data/faction/${factionId}.json`, 'members').split(',')

            if(members.includes(interaction.user.id.toString())){

                members = members.filter(e => e !== interaction.user.id);
                data.write(`./data/faction/${factionId}.json`, 'members', members.toString())
                data.delete(`./data/user/${interaction.user.id}.json`, `faction`)
                var embed = new MessageEmbed()
                .setAuthor({name: `You have left the Faction!`})
                .setTitle(`『 ${data.read(`./data/faction/${factionId}.json`, 'name')} 』`)
                .setDescription(`» [-] *${interaction.user.username}*`)
                .setColor('RANDOM')
                await interaction.reply({embeds: [embed]})
            }
    }
    //toggle faction admin for a user
    if(interaction.options.getSubcommand() === 'admin'){
        var factionId = data.read(`./data/user/${interaction.user.id}.json`, 'faction')
        var adminFactionId = data.read(`./data/user/${interaction.options.getUser('admin').id}.json`, 'faction')

        if(!adminFactionId){return interaction.reply(`<:xmark:994105062353817682> *This user is not in a Faction!* <:xmark:994105062353817682>`)}

        if(!factionId){return interaction.reply(`<:xmark:994105062353817682> *You are not in a Faction!* <:xmark:994105062353817682>`)}

        if(data.read(`./data/faction/${factionId}.json`, 'owner') != interaction.user.id){ return interaction.reply('<:xmark:994105062353817682> *You do not own this Faction!* <:xmark:994105062353817682>')}

        if(factionId === adminFactionId){
        var arr = data.read(`./data/faction/${factionId}.json`, 'admin')
        var members = data.read(`./data/faction/${factionId}.json`, 'members').split(',')
        var adminLimit = Math.ceil(members.length * 0.15)

        

        if(!arr){

            data.write(`./data/faction/${factionId}.json`, 'admin', interaction.options.getUser(`admin`).id.toString())
            return interaction.reply({content: `<:checkmark:994105025292943390> *${interaction.options.getUser(`admin`).username} is now a Faction Admin!  You have ${adminLimit - 1} Admin Slots Left!* <:checkmark:994105025292943390>`})

        } else {

            arr = arr.split(',')
            if(arr.includes(interaction.options.getUser(`admin`).id)){

                arr = arr.filter(e => e !== interaction.options.getUser('admin').id.toString())
                
                if(arr.length === 0){ data.delete(`./data/faction/${factionId}.json`, 'admin')} else {data.write(`./data/faction/${factionId}.json`, 'admin', arr.toString())}
                return interaction.reply({content: `<:checkmark:994105025292943390> *${interaction.options.getUser(`admin`).username} is no longer a Faction Admin!* <:checkmark:994105025292943390>`})

            } else {
                
                if(arr.length > adminLimit){return interaction.reply(`<:xmark:994105062353817682> *This Faction has reached its Admin Limit of ${adminLimit}. Invite more people!* <:xmark:994105062353817682>`)}
                arr.push(interaction.options.getUser('admin').id)
                data.write(`./data/faction/${factionId}.json`, 'admin', arr.toString())
                return interaction.reply({content: `<:checkmark:994105025292943390> *${interaction.options.getUser(`admin`).username} is now a Faction Admin! You have ${adminLimit - admins.length} Admin Slots Left!* <:checkmark:994105025292943390>`})

            }
        }
            
        }

    }
    //faction member list
    if(interaction.options.getSubcommand() === 'members'){
        var factionId = data.read(`./data/user/${interaction.user.id}.json`, 'faction')
        var adminCnt = 0
        var members = data.read(`./data/faction/${factionId}.json`, 'members').split(',')
        var admins = data.read(`./data/faction/${factionId}.json`, 'admin')
        var owner = data.read(`./data/faction/${factionId}.json`, 'owner')

        if(admins){
        admins = admins.split(`,`)
        var adminCnt = admins.length
        }

        var memberlist = `» Members › **${members.length}/30**\n\n`
        var adminlist = `» Admins › **${adminCnt}/${Math.ceil(members.length * 0.15)}**\n\n`

        if(members.length > 1){
        for(var i in members){
            if(admins){
            if(!admins.includes(members[i]) && members[i] != owner){
                memberlist = memberlist + `› <@!${members[i]}>\n`
            }
        } else {
            if(members[i] != owner){
            memberlist = memberlist + `› <@!${members[i]}>\n`
            }
        }
        }
    } else {
        memberlist = ''
    }
        if(admins){
        for(var i in admins){

            adminlist = adminlist + `› <@!${admins[i]}>\n`
        }
    } else {
        adminlist = ''
    }

        var embed = new MessageEmbed()
        .setAuthor({name: `『 ${data.read(`./data/faction/${factionId}.json`, 'name')} 』`})
        .setTitle(`Total Members: ` + members.length )
        .setDescription(`» Owner\n\n› <@!${owner}>\n\n${adminlist}\n${memberlist}
        `)
        .setColor(`RANDOM`)
        await interaction.reply({embeds: [embed]})
    }
    
}}