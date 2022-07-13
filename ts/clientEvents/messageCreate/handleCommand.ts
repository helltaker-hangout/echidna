import { Message } from 'discord.js';

export default {
  eventName: 'messageCreate',
  run: async function (message: Message, client: _Client) {
    const args: string[] = message.content.substring(client.config.prefix.length).split(/\s+/);

    // @ts-ignore
    const command: Command =
      client.commands.get(args[0]) ||
      // @ts-ignore
      client.commands.find((c) => c.aliases?.includes(args[0]));

    if (!command) return;
    if (!client.cooldowns[args[0]]) client.cooldowns[args[0]] = {};

    if (client.cooldowns[args[0]][message.author.id]) {
      // Add custom message if needed
      //await message.reply('COOLDOWN!');
      return;
    }

    command.run(client, message, args.slice(1));

    client.cooldowns[args[0]][message.author.id] = command.cooldown + Date.now();
  },
};
