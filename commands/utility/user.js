const { SlashCommandBuilder} = require('discord.js');

module.exports = {
    category: 'utility',
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Provides information about the user.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User name')
                .setRequired(true)),
    async execute(interaction) {
        // interaction.user is the object representing the User who ran the command
        // interaction.member is the GuildMember object, which represents the user in the specific guild

        // Get the mentioned user or use the command author if no user is mentioned
        const targetUser = interaction.options.getMember('user') || interaction.member;

        await interaction.reply(`User: ${targetUser.user.username}
Joined Server: ${targetUser.joinedAt}
Joined Discord: ${targetUser.user.createdAt}
Avatar String: ${targetUser.user.avatar}
        `);
    },
};