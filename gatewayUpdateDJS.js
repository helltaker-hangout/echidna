//testing the update 
const { Client, Events, GatewayIntentBits } = require('discord.js');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent
	] 
});

client.on('ready', () => {
	console.log('bots ready')
})

client.on('messageCreate', message => {
	if (message.content === 'ping'){
		message.reply('pong')
	}
})

// token for HH Echidna 
client.login('tokenhere');
