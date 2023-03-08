const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.once("ready", () => {
  console.log("Bot is ready!");
});

let staff = [
  "the HH staff team",
  "Melty",
  "Prinz simp (M7)",
  "Faz",
  "Jeweled",
  "Maou",
  "Gardy",
  "Riri",
  "Aki",
  "Kap",
  "Sam",
  "the bot's creator (céle)",
];

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const rolled = new Map();

client.on("messageCreate", (message) => {
  if (message.content.startsWith("!roulette")) {
    if (message.createdTimestamp < rolled[client.user.id]) {
      message.reply("wait");
    } else {
      const repNb = getRandomArbitrary(0, 11);
      const dispNb = getRandomArbitrary(1, 100);
      const replied = staff[repNb];
      message.reply(`You landed on ${dispNb}, hello from ${replied}!`);

      let Stamp = message.createdTimestamp + 30000;
      rolled[client.user.id] = Stamp;
    }
  }
});

// because gitHub the token for Echidna is now in separate file
const { token } = require("./config.json");
console.log(token);
