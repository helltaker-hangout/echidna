//test of an openAI generated JS for a discord music bot with v14
//const { Client, Intents } = require('discord.js');
const { Client, Events, GatewayIntentBits } = require('discord.js');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent
	] 
});
const { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType } = require('@discordjs/voice');
const ytdl = require('ytdl-core-discord');

//const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const prefix = '!'; // Change this to your desired command prefix

client.once('ready', () => {
  console.log('Ready!');
});

client.on('messageCreate', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'play') {
    if (!message.member.voice.channel) return message.reply('You need to be in a voice channel!');
    if (!args.length) return message.reply('You need to provide a URL or a search query!');
    
    const connection = joinVoiceChannel({
      channelId: message.member.voice.channel.id,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator
    });

    const player = createAudioPlayer();
    connection.subscribe(player);

    let stream;
    try {
      stream = await ytdl(args[0], { filter: 'audioonly' });
    } catch (error) {
      console.error(error);
      return message.reply('There was an error while trying to play this song!');
    }

    const resource = createAudioResource(stream, { inputType: StreamType.Opus });
    player.play(resource);

    //message.reply(`Now playing: ${stream.videoDetails.title}`);
	message.reply(`Now playing: your music`);
  }

  if (command === 'stop') {
    if (!message.member.voice.channel) return message.reply('You need to be in a voice channel to stop the music!');
    const connection = client.voice.connections.get(message.guild.id);
    if (!connection) return message.reply('The bot is not currently playing any music!');
    connection.destroy();
    message.reply('Stopped the music!');
  }
});

client.login("");
