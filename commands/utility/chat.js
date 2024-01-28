const fs = require('fs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { guildId } = require('../../config.json');

const fileLocation = 'commands/utility/pinned-message-ids.txt';
const isEmpty = val => val == null || !(Object.keys(val) || val).length;

module.exports = {
    category: 'utility',
    data: new SlashCommandBuilder()
        .setName('chat')
        .setDescription('Returns all pinned messages in that chat')
        .addChannelOption(option =>
            option.setName('chat')
                .setDescription('Chat to return pinned')
                .setRequired(true))
        .addChannelOption(option =>
            option.setName('destination')
                .setDescription('Channel to send collected messages')
                .setRequired(true)),
    async execute(interaction) {
        let amount = 0;
        const channelId = interaction.options.getChannel('chat')?.id;
        const destinationChannelId = interaction.options.getChannel('destination')?.id;

        const guild = await interaction.client.guilds.fetch(guildId);
        const channel = guild.channels.cache.get(channelId);
        const destinationChannel = guild.channels.cache.get(destinationChannelId);

        if (channel && destinationChannel) {
            const pinnedMessages = await channel.messages.fetchPinned();

            // Read existing IDs from file or initialize an empty array
            let existingIDs = [];
            try {
                const data = fs.readFileSync(fileLocation, 'utf8');
                existingIDs = data.split('\n').map(id => id.trim());
            } catch (error) {
                console.error('Error reading file:', error);
            }

            // Filter out duplicates and save new IDs
            const newMessageIDs = pinnedMessages
                .filter(pinnedMessage => !existingIDs.includes(pinnedMessage.id))
                .map(pinnedMessage => pinnedMessage.id);

            // Save new IDs to the file
            if (!isEmpty(newMessageIDs)) {
                fs.appendFileSync(fileLocation, newMessageIDs.join('\n')+'\n' );
                // Process each message
                for (const [messageId, pinnedMessage] of pinnedMessages) {
                    // Check if the message ID is a new one
                    if (!newMessageIDs.includes(messageId)) {
                        continue; // Skip duplicates
                    };
                    if(pinnedMessage.content==''){
                        continue; // Skip stickers
                    };
                    amount++;
                    const embed = new EmbedBuilder()
                        //.setTitle(`Pinned Message in #${channel.name}`)
                        .setURL(pinnedMessage.url)
                        .setColor('#3498db')
                        .setAuthor({ name: pinnedMessage.author.tag, iconURL: pinnedMessage.author.displayAvatarURL() })
                        .setDescription(pinnedMessage.content)
                        .setTimestamp(pinnedMessage.createdTimestamp)

                    if (pinnedMessage.attachments.size > 0) {
                        const attachment = pinnedMessage.attachments.first();
                        embed.setImage(attachment.url);
                    }

                    if (pinnedMessage.type === 19) {
                        const repliedTo = await channel.messages.fetch(pinnedMessage.reference.messageId);
                        const replyEmbed = new EmbedBuilder()
                            //.setTitle(`Replied to`)
                            .setURL(repliedTo.url)
                            .setColor('#3498db')
                            .setAuthor({ name: repliedTo.author.tag, iconURL: repliedTo.author.displayAvatarURL() })
                            .setDescription(repliedTo.content)
                            .setTimestamp(repliedTo.createdTimestamp)

                        if (repliedTo.attachments.size > 0) {
                            const repAttach = repliedTo.attachments.first();
                            replyEmbed.setImage(repAttach.url);
                        }
                        destinationChannel.send({
                        content: 'Replied to',
                        embeds: [replyEmbed] }
                        );
                    }
                    destinationChannel.send({
                    content: `Pinned message in ${channel.url}`,
                    embeds: [embed] }
                    );
                }
            }
            await interaction.reply(`Total of ${amount} message(s) have been fetched and sent to ${destinationChannel}`);
        } else {
            await interaction.reply(`Invalid channel(s) specified`);
        }
    }
};
