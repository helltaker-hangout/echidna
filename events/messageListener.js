const { GatewayIntentBits, Client, Events } = require('discord.js');
const client = new Client({ intents: ['Guilds', 'GuildMessages', 'MessageContent'] });

// Export the event listener function
module.exports = {
    name: Events.MessageCreate, // The event name should be in lowercase for Discord.js v13
    once: false,
    execute (message){
        // Check if the message author is a bot
        if (message.author.bot) return;

        // Check if the message content includes a specific link
        const specificLink = 'https://x.com';
        if (message.content.includes(specificLink)) {
            // Replace 'x.com' with 'fixupx.com'
            const newLink = 'https://fixupx.com';
            const updatedContent = message.content.replace(specificLink, newLink);

            // Edit the message to replace the link
            message.edit(updatedContent)
                .then(() => console.log('Link replaced successfully'))
                .catch(error => console.error('Error replacing link:', error));
        }
    }
};
