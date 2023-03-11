// how to mass delete my messages using DJS v14  
// Note: doesnt properly works only for like 3 messages for some unknown reason
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent
	] 
});
const userID = ''; //replace with actual user ID
const token = ''; //replace with actual bot token

client.on('ready', () => {
	console.log('bots ready')
})

client.on('messageCreate', message => {
 	if (message.author.id === userID){		
		let searchBfr = message.id;
		let i = 1;
		while (i < 10){
		//while (true){
			message.channel.messages.fetch({ limit: 100, before: searchBfr }).then(messages => messages.forEach(message => {
				//let searchBfr = message.id;
				//console.log(message.id);
				if (message.author.id === userID && message.id != searchBfr){
					//message.delete().then(msg => console.log(msg)).catch(console.error);
					message.delete().then(msg => console.log(msg.content));
				} else {
					let searchBfr = message.id;
				}
			}));
			console.log(i);
			i++;
		}
	} 
})
 
client.login(token);
