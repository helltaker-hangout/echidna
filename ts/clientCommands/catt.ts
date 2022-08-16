import { Message } from 'discord.js';

module.exports = {
  name: 'catt',
  description: 'removes the catt role and give it back after a defined delay',
  run: function (client: _Client, message: Message, args: string[]) {
    if (message.member?.roles.cache.has('931329640914616320')) {
      //let userId = args[0];
      let catDuration = parseInt(args[1]);
      catDuration = isFinite(catDuration) ? catDuration : 60000;
      const logChan = '737631798921527366';
      const catRole = '951376685247365121';

      message.mentions.members?.forEach((member) => {
        let logMsg = `moderator: ${message.author} removed the catt role from ${member} for ${catDuration}`;
        //const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
        member.roles.remove(catRole, logMsg);
        //client.channels.fetch(logChan).then(channel => channel.send(logMsg));
        message.reply('done!!');

        //timeout in miliseconds
        setTimeout(() => {
          member.roles.add(catRole, 'giving the role back');
        }, catDuration);
      });
    } else {
      message.channel.send('you do not have the permission to execute that command');
    }
  },
};
