const { SlashCommandBuilder,EmbedBuilder  } = require('discord.js');
const { guildId } = require('../../config.json')

module.exports = {
    category: 'utility',
    data: new SlashCommandBuilder()
        .setName('chat')
        .setDescription('Returns all pinned messages in that chat')
        .addChannelOption(option =>
            option.setName('chat')
                .setDescription('Chat to return pinned')
                .setRequired(true)),
    async execute(interaction) {
        //        interaction.client.messages = new Collection();
        const channelId = interaction.options.getChannel('chat')?.id;
        const guild = await interaction.client.guilds.fetch(guildId);
        const channel = guild.channels.cache.get(channelId); if (channel) {
        const pinnedMessages = await channel.messages.fetchPinned();

        pinnedMessages.forEach((pinnedMessage) => {
            const embed = new EmbedBuilder()
            .setTitle(`Pinned Messages in #${channel.name}`)
            .setColor('#3498db') // You can set the color according to your preference    
            .setAuthor({name:pinnedMessage.author.tag})
            .addFields({ name:'Message', value :pinnedMessage.content})
            .setFooter({text:pinnedMessage.createdAt.toString()})
            if (pinnedMessage.attachments.size > 0) {
                const attachment = pinnedMessage.attachments.first();
                // Add the image to the embed as a field
                embed.setImage(attachment.url);
              }
            console.log(`Pinned Message: ${pinnedMessage.content}`);
            interaction.channel.send({embeds: [embed]});
        });
            await interaction.reply('Pinned messages fetched successfully.');
        }
    }
};
