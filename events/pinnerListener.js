const { Events } = require('discord.js');
const fs = require('fs');
const isEmpty = val => val == null || !(Object.keys(val) || val).length;
const fileLocation = 'commands/utility/pinned-message-ids.txt';
const chatID='1201496539818885151' //ID for the event to save pinned messages, currently it's #pinned-messages
module.exports = {
    name: Events.ChannelPinsUpdate,
    once: false,
    async execute(channel) {
        const messages = await channel.messages.fetchPinned();

        // Read existing IDs from file or initialize an empty array
        let existingIDs = [];
        try {
            const data = fs.readFileSync(fileLocation, 'utf8');
            existingIDs = data.split('\n').map(id => id.trim());
        } catch (error) {
            console.error('Error reading file:', error);
        }

        // Filter out duplicates and save new IDs
        const newMessageIDs = messages
            .filter(messages => !existingIDs.includes(messages.id))
            .map(messages => messages.id);

        if (!isEmpty(newMessageIDs)) {

            fs.appendFileSync(fileLocation, newMessageIDs.join('\n') + '\n');

            const message = messages.first();
            if (!newMessageIDs.includes(message.id)) {
                return; // Skip duplicates
            };
            message.nonce = 0;
            const chanmem = channel.guild.channels.cache.get(chatID);
            chanmem.send(`Pinned message in ${channel.url}`);
            chanmem.send(message);
        }
    }
};