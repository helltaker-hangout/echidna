import { Client, Collection, Message } from "discord.js";

declare global {
  interface _Client extends Client {
    commands: Collection<string, Command>;
    config: {
      serverID: string,
      prefix: string,
    };
    __dirname: string;
    cooldowns: Cooldown
  }

  interface Command {
    description: string;
    name: string;
    aliases?: string[];
    run: function(_Client, Message, string[]);
    syntax: string;
    cooldown: number;
  }

  interface EventFile {
    eventName: string;
    run: function;
  }

  interface Warn {
    reason: string,
    id: string
  }

  interface Cooldown {
    [command: string]: {[userId: string]: number}
  }
}

export {}