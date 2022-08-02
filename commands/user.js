const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('user')
		.setDescription('View and change your profile!')
        .addSubcommand(subcommand =>
            subcommand
                .setName('set-bio')
                .setDescription('Update your Bio!')
                .addStringOption(option => option.setName('bio').setDescription('Update your bio!').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove-bio')
                .setDescription('Remove your Bio'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('view')
                .setDescription('View your own profile... or someone elses!')
                .addUserOption(option => option.setName('user').setDescription(`View a user's profile`)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('theme')
                .setDescription('Change your Profile Theme!')
                .addStringOption(option=> 
                    option.setName(`theme`)
                    .setDescription(`Change your theme!`)
                    .setRequired(true)
                    .addChoices(
                              { name: 'Default', value: 'default' },
                              { name: '『 Classic 』', value: 'classic' },
                              { name: 'Cᴏᴍᴘᴀᴄᴛ', value: 'compact' },
                              { name: '⁺₊⁺₊ Galaxy ₊⁺₊⁺', value: 'galaxy' }
                          ))),
        
	async execute(interaction, data, client, Discord, splashtext) {

		if(interaction.options.getSubcommand() === 'view'){

            

            if(interaction.options.getUser(`user`)){

                interaction.user = interaction.options.getUser(`user`)
    
                if(interaction.user.bot){
    
                    interaction.reply(`<:xmark:1000738231886811156> *You cannot get information on a bot!* <:xmark:1000738231886811156>`)
                    return
                    
                }
            }

            var themes = require('../data/global/themes.json');
            var theme = data.read(`./data/user/${interaction.user.id}.json`, 'theme');

            if(theme === undefined){theme = 'default'}

            if(data.exists(`./data/user/${interaction.user.id}.json`)){
                
                var embed = new MessageEmbed()

                    .setAuthor({name: themes[theme].title.toString().replace(/{title}/g, interaction.user.username + "#" + interaction.user.discriminator)})

                    .setColor(themes[theme].color)

                    .addFields([

                        {name: themes[theme].fieldname.toString().replace(/{name}/g, 'Credits'),  value: themes[theme].fieldvalue.toString().replace(/{value}/g, data.read(`./data/user/${interaction.user.id}.json`, `credits`) + ' ⌬'), inline: true},

                        {name: themes[theme].fieldname.toString().replace(/{name}/g, 'Level'), value: themes[theme].fieldvalue.toString().replace(/{value}/g, data.read(`./data/user/${interaction.user.id}.json`, `level`)), inline: true},

                        {name: themes[theme].fieldname.toString().replace(/{name}/g, 'XP'), value: themes[theme].fieldvalue.toString().replace(/{value}/g, data.read(`./data/user/${interaction.user.id}.json`, `xp`) + '/' + data.read(`./data/user/${interaction.user.id}.json`, `pointsNeeded`)), inline: true},

                    ])

                    .setFooter({ text: splashtext, iconURL: client.user.avatarURL() });

                    if(data.read(`./data/user/${interaction.user.id}.json`, 'bio')){

                        embed.setDescription(themes[theme].description.toString().replace(/{description}/g, data.read(`./data/user/${interaction.user.id}.json`, 'bio').toString()))

                    }

                    if(data.read(`./data/user/${interaction.user.id}.json`, 'bank')){

                        embed.addFields([{name: themes[theme].fieldname.toString().replace(/{name}/g, `Bank`), value: themes[theme].fieldvalue.toString().replace(/{value}/g, `${data.read(`./data/user/${interaction.user.id}.json`, 'bank')} ⌬`), inline: true}])

                    }

                    if(themes[theme].imageType === 'thumbnail'){

                        embed.setThumbnail(interaction.user.avatarURL())

                    } else if(themes[theme].imageType === 'image') {

                        embed.setImage(interaction.user.avatarURL())

                    } else if(themes[theme].imageType === 'author'){

                        embed.setAuthor({name: themes[theme].title.toString().replace(/{title}/g, interaction.user.username + "#" + interaction.user.discriminator), iconURL: interaction.user.avatarURL()})
                        embed.setFooter({text: ' ', iconURL: ' '})

                    }

                interaction.reply({embeds: [embed]})
    
            }  else {
                interaction.reply('<:xmark:1000738231886811156> *There is no information for this user!* <:xmark:1000738231886811156>')
            }
        }
        if(interaction.options.getSubcommand() === 'set-bio'){
            data.write(`./data/user/${interaction.user.id}.json`, 'bio', interaction.options.getString('bio'))
            interaction.reply('<:checkmark:1000737491621523488> *Bio Updated!* <:checkmark:1000737491621523488>')
        }
        if(interaction.options.getSubcommand() === 'remove-bio'){
            data.delete(`./data/user/${interaction.user.id}.json`, 'bio')
            interaction.reply('<:checkmark:1000737491621523488> *Bio Removed.* <:checkmark:1000737491621523488>')
        }

        if(interaction.options.getSubcommand() === 'theme'){

            data.write(`./data/user/${interaction.user.id}.json`, `theme`, interaction.options.getString('theme').toLowerCase())

            return interaction.reply(`<:checkmark:1000737491621523488> *Theme updated to **${interaction.options.getString('theme')}**!* <:checkmark:1000737491621523488>`)

        }
	}
}