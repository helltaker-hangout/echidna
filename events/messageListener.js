const { Events } = require('discord.js');

// Export the event listener function
module.exports = {
    name: Events.MessageCreate,
    once: false,
    async execute(message) {
        // Check if the message author is a bot
        if (message.author.bot) return;

        // Check if the message content includes a specific link
        const xLink = 'https://x.com/';
        const twitterLink = 'https://twitter.com/';
        let newLink = null
        let linkAfterDomain = null
        if (message.content.includes(xLink)) {
            // Extract the part after x.com/
            linkAfterDomain = message.content.split(xLink)[1];
            // Check if there is anything after x.com/
            if (linkAfterDomain) {
                // Build the new link
                newLink = message.content.replace(xLink, 'https://fixupx.com/');
            }
        } else if (message.content.includes(twitterLink)) {
            // Replace twitter.com with fxtwitter.com
            linkAfterDomain = message.content.split(twitterLink)[1];
            // Check if there is anything after twitter.com/
            if (linkAfterDomain) {
                // Build the new link
                newLink = message.content.replace(twitterLink, 'https://fxtwitter.com/');
            }
        } else { return; }
        message.reply({
            content: newLink,
            allowedMentions: { repliedUser: false }
        })
            .then(() => console.log('Link replaced successfully'))
            .catch(error => console.error('Error replacing link:', error));
    }
};
