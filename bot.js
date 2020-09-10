require('dotenv').config();

const { Client } = require('discord.js');
const bot = new Client;

const { tominecraft, fromminecraft } = require('./useful')

bot.on('ready', () => {
    console.log(`${bot.user.tag} (${bot.user.id}) is now ready with ${bot.guilds.cache.size} guilds and ${bot.users.cache.size} users.`)
    bot.user.setActivity('enchantment books. Mention me for my commands.', { type: 'WATCHING' })
});

bot.on('message', (message) => {
    if(message.author.bot) return;

    if(message.content.startsWith('!tominecraft ')) return message.reply(tominecraft(message.content.slice(13)));
    if(message.content.startsWith('!fromminecraft ')) return message.reply(fromminecraft(message.content.slice(15)));
    
    if( message.content.startsWith('<@726958787067641907>') || 
        message.content.startsWith('<@!726958787067641907>')) 
        return message.reply('You can use `!tominecraft` to translate it to enchantment table.\n'
                           + 'You can also use `!fromminecraft` to translate it back to English.')
    //if(message.content.startsWith('!eval ')) return eval(message.content.slice(6));
});

bot.on('guildCreate', (guild) => {
    bot.channels.fetch('727149444126081024')
        .then((channel) => {
            channel.send({
                embed: {
                    title: `Guild Join - ${guild.name}`,
                    description: `Members: ${guild.memberCount} | Owner: ${guild.owner.user.tag}`
                },
            })
        })
})
bot.on('guildDelete', (guild) => {
    bot.channels.fetch('727150536972959754')
        .then((channel) => {
            channel.send({
                embed: {
                    title: `Guild Leave - ${guild.name}`,
                    description: `Members: ${guild.memberCount} | Owner: ${guild.owner.user.tag}`
                },
            })
        })
})

bot.login();