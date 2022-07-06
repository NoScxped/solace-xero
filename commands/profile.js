const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Message, MessageEmbed } = require('discord.js');

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
            if(data('exists', 'user', interaction.user.id) != false){

                var embed = new MessageEmbed()
                    .setAuthor({ name: `『 ` + interaction.user.username + " 』", iconURL: interaction.user.avatarURL(), url: interaction.user.avatarURL() })
                    .setColor(`RANDOM`)
                    .setThumbnail(interaction.user.avatarURL())
                    .addField(`» Credits **⌬**`, "› " + data(`read`, `user`, interaction.user.id, `credits`), true)
                    .addField(`» Level`, "› " + data(`read`, `user`, interaction.user.id, `level`), true)
                    .addField(`» XP`, "› " + data(`read`, `user`,  interaction.user.id, `xp`), true)
                    .addField(`» XP needed for level up`,  "› " + data(`read`, `user`, interaction.user.id, `pointsNeeded`), true)
                    .setFooter({ text: splashtext, iconURL: client.user.avatarURL() });
                    if(data('read', 'user', interaction.user.id, 'bio') != false && data('read', 'user', interaction.user.id, 'bio') != '0'){
                        embed.setDescription("» " + data('read', 'user', interaction.user.id, 'bio').toString())
                    }
    
                interaction.reply({embeds: [embed]})
    
            }  else {
                interaction.reply('There is no information for this user!')
            }
        }
        if(interaction.options.getSubcommand() === 'set-bio'){
            data('write', 'user', interaction.user.id, 'bio', interaction.options.getString('bio'))
            interaction.reply('Bio Updated!')
        }
        if(interaction.options.getSubcommand() === 'remove-bio'){
            data('write', 'user', interaction.user.id, 'bio', `0`)
            interaction.reply('Bio Removed.')
        }
	}
}