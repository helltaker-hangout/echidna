import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

import * as discord from "discord.js";
import * as fs from "fs";

import { config } from "dotenv";
config();

const client = new discord.Client({
  intents: ["GUILD_MESSAGES", "GUILD_MEMBERS", "DIRECT_MESSAGES", "GUILDS"],
});

let data = {};

data = JSON.parse(fs.readFileSync("./data.json").toString());

client.on("ready", () => {
  console.log("Ready!");
});

const prefix = "j!";

client.on("messageCreate", async (message) => {
  if (!message.content.startsWith(prefix)) return;
  if (message.author.bot) return;

  const args = message.content.substring(prefix.length).split(/\s+/);

  if (args.length == 0) return;

  const command = args[0].toLowerCase();

  switch (command) {
    case "role":
      if (args[1] == null || data[message.author.id]?.roleId == null) {
        if (data[message.author.id]?.roleId == null) {
          let createdRole = await message.guild.roles.create();

          data[message.author.id] = {
            roleId: createdRole.id,
          };

          fs.writeFileSync("./data.json", JSON.stringify(data));

          await message.member.roles.add(createdRole);
          message.reply("Role Created!");
        } else {
          let role = await message.guild.roles.fetch(
            data[message.author.id]?.roleId
          );
          message.reply(`Role name: ${role.name}\nColor: #${role.hexColor}`);
        }
      } else {
        if (args[1] == "color" || args[1] == "colour") {
          if (args[2] == null || !args[2].match(/[0-9A-Fa-f]{6}/)) {
            message.reply("Please provide a color! (Hex)");
            return;
          }

          let role = await message.guild.roles.fetch(
            data[message.author.id]?.roleId
          );

          await role.setColor(args[2]);

          message.reply("successfully changed role color");
        } else if (args[1] == "name") {
          let name = args.slice(2).join(" ");
          if (!name || name.length < 1) {
            message.reply("Please provide a name!");
            return;
          }

          let role = await message.guild.roles.fetch(
            data[message.author.id]?.roleId
          );

          await role.setName(name);

          message.reply("successfully changed role name");
        }
      }
      break;
  }
});

client.login(process.env.TOKEN);
