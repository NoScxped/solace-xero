const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
    .setName('fight')
	.setDescription(`Fight your enemies and steal their Credits!`)
	.addUserOption(option => option.setName('user').setDescription('Select a User').setRequired(true))
    .toJSON(),

    async execute(interaction, data, client, Discord, splashtext, worked, fight, fought) {

        if(fight.has(interaction.user.id)){return interaction.reply(`<:xmark:994105062353817682> *You recently fought someone! Please wait awhile bfore attacking again!* <:xmark:994105062353817682>`)}
        if(fight.has(interaction.options.getUser(`user`).id)){return interaction.reply(`<:xmark:994105062353817682> *This user was recently attacked! Please wait awhile before attacking them!* <:xmark:994105062353817682>`)}
        
        if(interaction.user.id === interaction.options.getUser(`user`).id){ return interaction.reply({content: `<:xmark:994105062353817682> *You beat yourself up! ${interaction.user.username} lost **0** Credits and ${interaction.user.username} gained **0** Credits!* <:xmark:994105062353817682>`})}
        if(interaction.options.getUser(`user`).bot){return interaction.reply({content: `<:xmark:994105062353817682> *You cant fight a Bot! **${interaction.options.getUser(`user`).username}** would kick your ass!* <:xmark:994105062353817682>`}) }

        if(data.read(`./data/user/${interaction.user.id}.json`, 'gloves')){

            var embed = ''
            var userGloves = parseInt(data.read(`./data/user/${interaction.user.id}.json`, 'gloves')) - 1
            if(userGloves === 0){ data.delete(`./data/user/${interaction.user.id}.json`, 'gloves')} else {data.write(`./data/user/${interaction.user.id}.json`, 'gloves', userGloves.toString())}

            if(data.exists(`./data/user/${interaction.options.getUser('user').id}.json`)){

                if(data.read(`./data/user/${interaction.options.getUser(`user`).id}.json`, 'gloves')){

                    var attackedGloves = parseInt(data.read(`./data/user/${interaction.options.getUser(`user`).id}.json`, 'gloves')) - 1
                    if(attackedGloves === 0){ data.delete(`./data/user/${interaction.options.getUser(`user`).id}.json`, 'gloves')} else {data.write(`./data/user/${interaction.user.id}.json`, 'gloves', userGloves.toString())}

                    var arr = [interaction.user.id, interaction.options.getUser(`user`).id]
                    var rand = Math.floor(Math.random() * 4)

                    if(rand === 3){ rand = interaction.user.id } else { rand = interaction.options.getUser(`user`).id }

                    var user = await client.users.fetch(interaction.options.getUser(`user`).id.toString()).catch(console.error)

                    if(rand === interaction.user.id){

                        var loseCreds = Math.ceil(parseInt(data.read(`./data/user/${interaction.options.getUser(`user`).id}.json`, 'credits')) * 0.05)
                        var userCredits = parseInt(data.read(`./data/user/${interaction.user.id}.json`, 'credits')) + loseCreds
                        var loseTotal = parseInt(data.read(`./data/user/${interaction.options.getUser(`user`).id}.json`, 'credits'))
                        loseTotal = loseTotal - loseCreds

                        embed = new MessageEmbed()
                        .setAuthor({name: user.username + ' had boxing Gloves!'})
                        .setTitle(`${interaction.user.username} won!`)
                        .setDescription(`» You stole *` + loseCreds + `* ⌬ from **${interaction.options.getUser(`user`).username}**!`)
                        .addField(`» Gloves Left`, userGloves.toString())
                        .addField(`» Cooldown`, `› *15 Minutes*`)
                        .setColor(`RANDOM`)
                        
                        data.write(`./data/user/${interaction.options.getUser(`user`).id}.json`, 'credits', loseTotal.toString())
                        data.write(`./data/user/${interaction.user.id}.json`, 'credits', userCredits.toString())

                        interaction.reply({embeds: [embed]})

                    } else {

                        var loseCreds = Math.ceil(parseInt(data.read(`./data/user/${interaction.user.id}.json`, 'credits')) * 0.02)
                        var userCredits = parseInt(data.read(`./data/user/${interaction.options.getUser(`user`).id}.json`, 'credits')) + loseCreds
                        var loseTotal = parseInt(data.read(`./data/user/${interaction.user.id}.json`, 'credits'))
                        loseTotal = loseTotal - loseCreds


                        embed = new MessageEmbed()
                        .setAuthor({name: user.username + ' had boxing Gloves!'})
                        .setTitle(`『 ${interaction.user.username} lost! 』`)
                        .setDescription(`» ${user.username} stole *` + loseCreds + `* ⌬ from **${interaction.user.username}**!`)
                        .addField(`» Gloves Left`, userGloves.toString())
                        .addField(`» Cooldown`, `› *15 Minutes*`)
                        .setColor(`RANDOM`)

                        data.write(`./data/user/${interaction.user.id}.json`, 'credits', loseTotal.toString())
                        data.write(`./data/user/${interaction.options.getUser(`user`).id}.json`, 'credits', userCredits.toString())

                        interaction.reply({embeds: [embed]})

                    }
                    
                    
        
                } else {

                    var loseCreds = Math.ceil(parseInt(data.read(`./data/user/${interaction.options.getUser(`user`).id}.json`, 'credits')) * 0.02)
                    var userCredits = parseInt(data.read(`./data/user/${interaction.user.id}.json`, 'credits')) + loseCreds
                    var loseTotal = parseInt(data.read(`./data/user/${interaction.options.getUser(`user`).id}.json`, 'credits'))
                    loseTotal = loseTotal - loseCreds

                    embed = new MessageEmbed()
                    .setAuthor({name: interaction.options.getUser(`user`).username + ` didn't have any Boxing Gloves!`})
                    .setTitle(`『 ${interaction.user.username} won! 』`)
                    .setColor("RANDOM")
                    .setDescription(`» You stole *` + loseCreds + `* ⌬ from **${interaction.options.getUser(`user`).username}**!`)
                    .addField(`» Cooldown`, `› *15 Minutes*`)

                    data.write(`./data/user/${interaction.options.getUser(`user`).id}.json`, 'credits', loseTotal.toString())
                    data.write(`./data/user/${interaction.user.id}.json`, 'credits', userCredits.toString())

                    interaction.reply({embeds: [embed]})
                
            }
                
            fight.add(interaction.user.id)
            fought.add(interaction.options.getUser(`user`).id)
            function cool(){
            fight.delete(interaction.user.id)
            fought.delete(interaction.options.getUser(`user`).id)
            }
            setTimeout(cool, 900000)
            
            } else {
                interaction.reply({content: "<:xmark:994105062353817682> *You cannot fight a new user!* <:xmark:994105062353817682>"})
                data.write(`./data/user/${interaction.options.getUser('user').id}.json`, `xp`, `0`)
                data.write(`./data/user/${interaction.options.getUser('user').id}.json`, 'pointsNeeded', `35`)
                data.write(`./data/user/${interaction.options.getUser('user').id}.json`, 'level', `0`)
                data.write(`./data/user/${interaction.options.getUser('user').id}.json`, 'credits', `100`)
                return 
            }

        } else {
            return interaction.reply(`<:xmark:994105062353817682> *You do not have any **Boxing Gloves!** buy some from the **/shop!*** <:xmark:994105062353817682>`)
        }

    }
}