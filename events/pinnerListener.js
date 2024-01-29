const { Events } = require('discord.js');
const fs = require('fs');
const { EmbedBuilder } = require('discord.js');
const isEmpty = val => val == null || !(Object.keys(val) || val).length;
const fileLocation = 'commands/utility/pinned-message-ids.txt';
const chatID = '1201496539818885151' //ID for the event to save pinned messages, currently it's #pinned-messages\
let reply = null;

module.exports = {
    name: Events.ChannelPinsUpdate,
    once: false,
    async execute(channel,timestamp) {
        if(timestamp<=new Date().getTime()-(60*1000)){
            return;
        }
        const messages = await channel.messages.fetchPinned();
        const message = messages.first();
        // Read existing IDs from file or initialize an empty array
        let existingIDs = [];
        try {
            const data = fs.readFileSync(fileLocation, 'utf8');
            existingIDs = data.split('\n').map(id => id.trim());
        } catch (error) {
            console.error('Error reading file:', error);
        }
        const newMessageIDs = messages
        .filter(messages => !existingIDs.includes(messages.id))
        .map(messages => messages.id);
        if (!isEmpty(newMessageIDs)) {

            fs.appendFileSync(fileLocation, message + '\n');
            if (message.type === 19) {
                reply = await channel.messages.fetch(message.reference.messageId);
            }
            
            const embed = new EmbedBuilder()
                //.setTitle(`Pinned Message in #${channel.name}`)
                .setURL(message.url)
                .setColor('#3498db')
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setTimestamp(message.createdTimestamp)
            if (message.content.length >= 1) {
                embed.setDescription(message.content);
            }
            if (message.attachments.size > 0) {
                attch = message.attachments.first();
                attch_type = attch.contentType.split('/');
                if (attch_type[0] == 'video') {
                    embed.addFields({ name: `Video`, value: `[Link to video](${attch.url})` });
                } else {
                    embed.setImage(attch.url);
                }
            }
            const chanmem = channel.guild.channels.cache.get(chatID);

            if (message.type === 19) {
                const replyEmbed = new EmbedBuilder()
                    //.setTitle(`Replied to`)
                    .setURL(reply.url)
                    .setColor('#3498db')
                    .setAuthor({ name: reply.author.tag, iconURL: reply.author.displayAvatarURL() })
                    .setTimestamp(reply.createdTimestamp)
                if (reply.content.length >= 1) {
                    replyEmbed.setDescription(reply.content);
                }
                if (reply.attachments.size > 0) {
                    attch = reply.attachments.first();
                    attch_type = attch.contentType.split('/');
                    if (attch_type[0] == 'video') {
                        replyEmbed.addFields({ name: `Video`, value: `[Link to video](${attch.url})` });
                    } else {
                        replyEmbed.setImage(attch.attachment);
                    }
                }
                chanmem.send({
                    content: 'Replied to',
                    embeds: [replyEmbed]
                });
            } chanmem.send({
                content: `Pinned message in ${channel.url}`,
                embeds: [embed]
            });
        }
    }
};