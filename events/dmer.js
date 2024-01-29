const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    once: false,
    async execute(message) {
        if (message.author.id === 'ID of Reciever here' && message.content.toLowerCase() === ':3') {
            // Send a direct message to the user
            message.author.send(':3');
        }
    }
};