const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('profile')
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
                    .setAuthor({ name: `『 ` + interaction.user.username + " 』", iconURL: interaction.user.avatarURL() })
                    .setColor(`RANDOM`)
                    .setThumbnail(interaction.user.avatarURL())
                    .addField(`» Credits`, "› " + data.read(`./data/user/${interaction.user.id}.json`, `credits`) + ' ⌬', true)
                    .addField(`» Level`, "› " + data.read(`./data/user/${interaction.user.id}.json`, `level`), true)
                    .addField(`» XP`, "› " + data.read(`./data/user/${interaction.user.id}.json`, `xp`) + '/' + data.read(`./data/user/${interaction.user.id}.json`, `pointsNeeded`), true)
                    .setFooter({ text: splashtext, iconURL: client.user.avatarURL() });
                    if(data.read(`./data/user/${interaction.user.id}.json`, 'bio')){
                        embed.setDescription("» " + data.read(`./data/user/${interaction.user.id}.json`, 'bio').toString())
                    }
                    if(data.read(`./data/user/${interaction.user.id}.json`, 'bank')){
                        embed.addField("» Bank", `${data.read(`./data/user/${interaction.user.id}.json`, 'bank')} ⌬`, true)
                    }
    
                interaction.reply({embeds: [embed]})
    
            }  else {
                interaction.reply('There is no information for this user!')
            }
        }
        if(interaction.options.getSubcommand() === 'set-bio'){
            data.write(`./data/user/${interaction.user.id}.json`, 'bio', interaction.options.getString('bio'))
            interaction.reply('<:checkmark:994105025292943390> *Bio Updated!* <:checkmark:994105025292943390>')
        }
        if(interaction.options.getSubcommand() === 'remove-bio'){
            data.delete(`./data/user/${interaction.user.id}.json`, 'bio')
            interaction.reply('<:checkmark:994105025292943390> *Bio Removed.* <:checkmark:994105025292943390>')
        }
	}
}