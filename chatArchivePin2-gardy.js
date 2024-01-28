// on 27.1.24 archive pins of a channel
const { Client, Events, GatewayIntentBits } = require('discord.js');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent
	] 
});

client.on('ready', () => {
	console.log('bots ready')
})

client.on('messageCreate', message => {
 	if (message.author.id === '916088867872972840'){
			
			
			const guild = client.guilds.fetch(message.guildId);
			const channel = guild.channels.cache.get(message.channelId); 
 
			if (channel) {
				const pinnedMessages = channel.messages.fetchPinned();
				//pinnedMessages.forEach((pinnedMessage) => {
				for (const prepared of pinnedMessages){
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
					const repliedto= channel.messages.fetch(pinnedMessage.reference.messageId);
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
					message.channel.send({embeds: [replyembed]});
				}
				console.log(`Pinned Message: ${pinnedMessage.content}`);
				message.channel.send({embeds: [embed]});
			};
				message.reply('Pinned messages fetched successfully.');
			}else 
			message.reply(`This is not a valid channel`)


	
	} 
})

// token for HH Echidna 
client.login('token-here');
