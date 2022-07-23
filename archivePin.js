const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const pinChannel = '737631798921527366';

client.once('ready', () => {
    console.log('Bot is ready!');
});


client.on('messageCreate', message => {
    if (message.content.startsWith('!archive')) {
		message.channel.messages.fetchPinned()
		.then(messages => messages.forEach(message => {
			client.channels.fetch(pinChannel).then(channel => channel.send(`(${message.id}) ${message.author} [${message.createdAt}]: ${message.content}`));
			//message.pin();
		}))
		.catch(console.error);
		
    }

});



// because gitHub the token for Echidna is now in separate file
const { token } = require('./config.json');
console.log(token);
