import { Client, Collection } from 'discord.js';
import { config } from 'dotenv';
import { readFile, readdir, stat, writeFile } from 'fs/promises';
import { fileURLToPath, pathToFileURL } from 'url';
import { join, dirname } from 'path';

// @ts-ignore
const client: _Client = new Client({
  intents: ['DIRECT_MESSAGES', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILDS'],
});

config();

const __filename = fileURLToPath(import.meta.url);

client.__dirname = dirname(__filename);
client.commands = new Collection<string, Command>();
client.config = JSON.parse(
  (
    await readFile(
      // process.env.DEV == "TRUE" ? "./devconfig.json" : "./config.json"
      './config.json'
    )
  ).toString()
);

client.cooldowns = {};

client.on('ready', async () => {
  /*                     /
  /                      /
  /     LOAD EVENTS      /
  /                      /
  /                     */
  let files = await readdir('./js/clientEvents');

  // @ts-ignore
  const events: EventFile[] = await ReadDirectoryFiles(files, join(client.__dirname, 'clientEvents'));
  for (const event of events) {
    switch (event.eventName) {
      case 'messageCreate':
        client.on('messageCreate', (message) => event.run(message, client));
        break;
    }
  }

  /*                          /
  /                           /
  /       LOAD COMMANDS       /
  /                           /
  /                          */
  files = await readdir('./js/clientCommands');

  // @ts-ignore
  const commands: Command[] = await ReadDirectoryFiles(files, join(client.__dirname, 'clientCommands'));
  for (const command of commands) {
    client.commands.set(command.name, command);
  }

  setInterval(() => {
    const cooldowns = client.cooldowns;
    if (Object.keys(cooldowns).length == 0) return;

    for (let key of Object.keys(cooldowns)) {
      if (cooldowns[key][Object.keys(cooldowns[key])[0]] < Date.now()) {
        delete client.cooldowns[key][Object.keys(cooldowns[key])[0]];

        if (Object.keys(cooldowns[key]).length == 0) {
          delete client.cooldowns[key];
        }
      }
    }
  }, 100);

  console.log('Bot ready!');
});

async function ReadDirectoryFiles(files: string[], fullDir: string): Promise<(Command | EventFile)[]> {
  let commands: (Command | EventFile)[] = [];
  for (const file of files) {
    const fStat = await stat(join(fullDir, file));
    if (fStat.isDirectory()) {
      commands = [...commands, ...(await ReadDirectoryFiles(await readdir(join(fullDir, file)), join(fullDir, file)))];
    } else {
      console.log(fullDir);
      commands.push((await import(pathToFileURL(join(fullDir, file)).toString())).default);
    }
  }
  return commands;
}

client.login(process.env.TOKEN);

export default {};
