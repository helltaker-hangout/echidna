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
        const channel = guild.channels.cache.get(channelId); 
        if (channel) {
            const pinnedMessages = await channel.messages.fetchPinned();
            //pinnedMessages.forEach((pinnedMessage) => {
            for await (const prepared of pinnedMessages){
            const pinnedMessage=prepared[1]
            //console.log(pinnedMessage);

            const embed = new EmbedBuilder()
            .setTitle(`Pinned Message in #${channel.name}`)
            .setColor('#3498db') // You can set the color according to your preference    
            .setAuthor({name:pinnedMessage.author.tag,iconURL:pinnedMessage.author.displayAvatarURL()})
            .setDescription(pinnedMessage.content)
            .setTimestamp(pinnedMessage.createdTimestamp)
            //.setFooter({text:pinnedMessage.createdAt.toString()})
            if (pinnedMessage.attachments.size > 0) {
                const attachment = pinnedMessage.attachments.first();
                // Add the image to the embed as a field
                embed.setImage(attachment.url);
              }
            if (pinnedMessage.type == 19)
            {
                const repliedto= await channel.messages.fetch(pinnedMessage.reference.messageId);
                //console.log(pinnedMessage.reference)
                //console.log(repliedto);
                const replyembed = new EmbedBuilder()
                .setTitle(`Replied to`)
                .setColor('#3498db') // You can set the color according to your preference    
                .setAuthor({name:repliedto.author.tag,iconURL:repliedto.author.displayAvatarURL()})
                .setDescription(repliedto.content)
                .setTimestamp(repliedto.createdTimestamp)
                //.setFooter({text:repliedto.createdAt.toString()})
                if (repliedto.attachments.size > 0) {
                    const repAttach = repliedto.attachments.first();
                    // Add the image to the embed as a field
                    replyembed.setImage(repAttach.url);
                  }
                interaction.channel.send({embeds: [replyembed]});
            }
            console.log(`Pinned Message: ${pinnedMessage.content}`);
            interaction.channel.send({embeds: [embed]});
        };
            await interaction.reply('Pinned messages fetched successfully.');
        }else 
        await interaction.reply(`This is not a valid channel`)
    }
};
