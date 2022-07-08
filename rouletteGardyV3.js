const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.once('ready', () => {
    console.log('Bot is ready!');
});

// const replies = {
    // "the HH staff team!": 1,
    // "Gardy!": 2,
    // "Melty!": 3,
    // "Faz!": 4,
    // "M7!": 5,
    // "Sam!": 6,
    // "Jeweled!": 7,
// };

let staff = ["the HH staff team", "Melty", "Prinz simp (M7)", "Faz", "Jeweled", "Maou", "Gardy", "Riri", "Aki", "Kap", "Sam", "the bot's creator (céle)"];
let lastStamp = client.readyTimestamp;

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


client.on('messageCreate', message => {
    if (message.content.startsWith('!roulette')) {
		if (lastStamp - message.createdTimestamp > 100){
			// const repNb = Math.floor(Math.random() * 10) + 1;
			const repNb = getRandomArbitrary(0, 11);
			// const dispNb = Math.floor(Math.random() * 100) + 1;     
			const dispNb = getRandomArbitrary(1, 100);
			const replied = staff[repNb];
			message.reply(`You landed on ${dispNb}, hello from ${replied}!`);
			
			let lastStamp = message.createdTimestamp;
		
		} //else {
			//message.reply('wait');
		//}

    }

});


// token for Testing groungds 2
//client.login('OTY1MzMyMzUzMzAyMDI4MzA4.GKjD6Z.b-FTXHdEXvpdFXwmfmvh5_pCGu6huGG2mjIfdk');

// token for HH Echidna 
client.login('OTY3MTYwMDQ4NTM3MTgyMzE4.YmMP_A.kM1JsmT_cqRAG69A8AbCQ6WeMRs');
