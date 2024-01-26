import { Message } from 'discord.js';
import utils from '../utils.js';

const responses = {
  '10': 'Balls',
  '25': 'Jew steals all your shekels!',
  '50': 'You received a hello from the staff team!',
  '75': 'Dog',
  '100': 'You receive... nothing! :tada:',
};

export default {
  description: 'Roulette',
  name: 'roulette',
  syntax: 'roulette',
  run: function (client: _Client, message: Message, args: string[]) {
    const n = utils.getRandom(0, 101);

    let res = `The roulette lands on ${n}!`;

    // @ts-ignore
    if (responses[n.toString()]) {
      // @ts-ignore
      res += `\n\n${responses[n.toString()]}`;
    }

    message.reply(res);
  },
  cooldown: 3000,
};
