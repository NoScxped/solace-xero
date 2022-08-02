const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('Delete a certain amount of messages!')
        .addIntegerOption(option=> option.setName(`integer`).setDescription(`Specify how many messages you want deleted!`).setRequired(true)),
	async execute(interaction, data, client, Discord, splashtext, loadCommands, worked) {
        if(!interaction.member.permissions.has([Permissions.FLAGS.MANAGE_MESSAGES])){
            return interaction.reply({content: `<:xmark:1000738231886811156> *Failed to Purge messages!* <:xmark:1000738231886811156>\n\n*You are missing the **Manage Messages** permission!*`, ephemeral: true})
        }
        try {
            interaction.channel.bulkDelete(interaction.options.getInteger(`integer`))
            interaction.reply({content: `<:checkmark:1000737491621523488> *Messages Deleted Successfully!* <:checkmark:1000737491621523488>`, ephemeral: true})
        } catch {
            interaction.reply({content: `<:xmark:1000738231886811156> *Failed to Purge messages!* <:xmark:1000738231886811156>\n\n*This may be due to the fact that the messages in question are over two weeks old. Discord's API does not allow for bulk-deleting messages over two weeks old.*`, ephemeral: true})
        }
               
        }
    }