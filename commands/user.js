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
                .addUserOption(option => option.setName('user').setDescription(`View a user's profile`))),
        
	async execute(interaction, data, client, Discord, splashtext) {

		if(interaction.options.getSubcommand() === 'view'){

            if(interaction.options.getUser(`user`)){

                interaction.user = interaction.options.getUser(`user`)
    
                if(interaction.user.bot){
    
                    interaction.reply(`You cannot get information on a bot!`)
                    return
                    
                }
            }
            if(data.exists(`./data/user/${interaction.user.id}.json`)){
                
                var embed = new MessageEmbed()
                    .setTitle(interaction.user.username + "#" + interaction.user.discriminator)
                    .setColor(`#a6dced`)
                    .setImage(interaction.user.avatarURL())
                    .addFields([
                        {name: `__Credits__`,  value: data.read(`./data/user/${interaction.user.id}.json`, `credits`) + ' ⌬', inline: true},
                        {name: `__Level__`, value: data.read(`./data/user/${interaction.user.id}.json`, `level`), inline: true},
                        {name: `__XP__`, value: data.read(`./data/user/${interaction.user.id}.json`, `xp`) + '/' + data.read(`./data/user/${interaction.user.id}.json`, `pointsNeeded`), inline: true},
                    ])
                    .setFooter({ text: splashtext, iconURL: client.user.avatarURL() });

                    if(data.read(`./data/user/${interaction.user.id}.json`, 'bio')){

                        embed.setDescription(data.read(`./data/user/${interaction.user.id}.json`, 'bio').toString())

                    }

                    if(data.read(`./data/user/${interaction.user.id}.json`, 'bank')){

                        embed.addFields([{name: "__Bank__", value: `${data.read(`./data/user/${interaction.user.id}.json`, 'bank')} ⌬`, inline: true}])

                    }

                    //xracer special
                    if(interaction.user.id === '752335155049529355'){

                        embed.setDescription(`<:dev:1000730820123824138> Developer of Solace Client!`)

                        if(data.read(`./data/user/${interaction.user.id}.json`, 'bio')){

                            embed.setTitle(data.read(`./data/user/${interaction.user.id}.json`, 'bio').toString())
                            embed.setAuthor({name: interaction.user.username + "#" + interaction.user.discriminator})

                        }
                    }

                interaction.reply({embeds: [embed]})
    
            }  else {
                interaction.reply('There is no information for this user!')
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
	}
}