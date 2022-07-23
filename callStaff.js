const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.once('ready', () => {
    console.log('Bot is ready!');
});


client.on('messageCreate', message => {
    if (message.content.startsWith('!callstaff')) {
        message.reply('Your help request has been successfully reported.');
		client.channels.fetch('728561480869478450').then(channel => channel.send(`<@&849438477232635984> Staff alert: <@!${message.author.id}> called for help in <#${message.channel.id}> at ${message.url}`));
    }

});


client.login('');
