const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
 
const prefix = '!';
 
const fs = require('fs');
 
client.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./cmd_hw/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./cmd_hw/${file}`);
 
    client.commands.set(command.name, command);
}
 
 
client.once('ready', () => {
    console.log('clien application is launching');
});
 
client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
 
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
 
    if(command === 'catt'){
        client.commands.get('catt').execute(message, args);
	} else if (command == 'archive'){
		client.commands.get('archive').execute(message, args);
	} else if (command == 'callstaff'){
		client.commands.get('callstaff').execute(message, args);
	} else if (command == 'roulette'){
		client.commands.get('roulette').execute(message, args);
	} else if (command == 'testx'){
		client.commands.get('testx').execute(message, args);
	}
	
});

// on github version no token 
const { token } = require('./config.json');
client.login(token);
