const { SlashCommandBuilder, Message } = require('discord.js');
const { guildId } = require('../../config.json');

module.exports = {
    category: 'utility',
    data: new SlashCommandBuilder()
        .setName('message')
        .setDescription('Consoles the message insides.')
        .addChannelOption(option =>
            option.setName('chat')
                .setDescription('Chat to return pinned')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('message_id')
                .setDescription('Message ID')
                .setRequired(true)),
    async execute(interaction) {
        const channelId = interaction.options.getChannel('chat')?.id;
        const guild = await interaction.client.guilds.fetch(guildId);
        const channel = guild.channels.cache.get(channelId);
        let message = await channel.messages.fetch(interaction.options.getString('message_id'));
        console.log(message);
       //await interaction.channel.messages.fetch(interaction.options.data)
       //.then(message => console.log(message))
       //.catch(console.error);
    },
}
