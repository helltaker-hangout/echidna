const fs = require('fs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { guildId } = require('../../config.json');

const fileLocation = 'commands/utility/pinned-message-ids.txt';
const isEmpty = val => val == null || !(Object.keys(val) || val).length;
let embedcollect = new Map();
let replycollect = new Map();

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
                fs.appendFileSync(fileLocation, newMessageIDs.join('\n') + '\n');
                // Process each message
                for (const [messageId, pinnedMessage] of pinnedMessages) {
                    // Check if the message ID is a new one
                    if (!newMessageIDs.includes(messageId)) {
                        continue; // Skip duplicates
                    };
                    amount++;
                    const embed = new EmbedBuilder()
                        //.setTitle(`Pinned Message in #${channel.name}`)
                        .setURL(pinnedMessage.url)
                        .setColor('#3498db')
                        .setAuthor({ name: pinnedMessage.author.tag, iconURL: pinnedMessage.author.displayAvatarURL() })
                        .setTimestamp(pinnedMessage.createdTimestamp)
                    if (pinnedMessage.content.length >= 1) {
                        embed.setDescription(pinnedMessage.content);
                    }
                    if (pinnedMessage.attachments.size > 0) {
                        attch = pinnedMessage.attachments.first();
                        let attch_type = attch.contentType.split('/');
                        if (attch_type == 'video') {
                            embed.addFields({ name: 'video', value: attach.url });
                        } else {
                            embed.setImage(attch.url);
                        }
                    }
                    if (pinnedMessage.type === 19) {
                        const repliedTo = await channel.messages.fetch(pinnedMessage.reference.messageId);
                        const replyEmbed = new EmbedBuilder()
                            //.setTitle(`Replied to`)
                            .setURL(repliedTo.url)
                            .setColor('#3498db')
                            .setAuthor({ name: repliedTo.author.tag, iconURL: repliedTo.author.displayAvatarURL() })
                            .setTimestamp(repliedTo.createdTimestamp)
                        if (repliedTo.content.length >= 1) {
                            replyEmbed.setDescription(repliedTo.content);
                        }
                        if (repliedTo.attachments.size > 0) {
                            attch = repliedTo.attachments.first();
                            let attch_type = attch.contentType.split('/');
                            console.log(attch.contentType);
                            if (attch_type == 'video') {
                                embed.addFields({ name: 'video', value: attach.url });
                            } else {
                                embed.setImage(attch.url);
                            }
                        }
                        replycollect.set(amount, replyEmbed);
                    }
                    embedcollect.set(amount, embed);
                }
            }
            await interaction.reply(`Total of ${amount} message(s) have been fetched and sent to ${destinationChannel}`);
        } else {
            await interaction.reply(`Invalid channel(s) specified`);
        }
        for (let i = 1; i <= amount; i++) {
            if(replyembed.has(amount))
            destinationChannel.send({
                content: 'Replied to',
                embeds: [replyEmbed[i]]
            });
            destinationChannel.send({
                content: `Pinned message in ${channel.url}`,
                embeds: [embed[i]]
            });
        }
        await interaction.reply(`Waiting`);
    }
};
