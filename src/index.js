require("dotenv").config();
const { Client, IntentsBitField, Partials } = require("discord.js");
const eventHandler = require("./handlers/eventHandler");
const mongoose = require("mongoose");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.DirectMessages,
  ],
  partials: [Partials.Channel, Partials.Message],
});

const startBot = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.DB_TOKEN, { keepAlive: true });
    console.log("[Database Status]: Connected");
    eventHandler(client);
    client.login(process.env.TOKEN);
  } catch (error) {
    console.error(error);
  }
};

startBot();
