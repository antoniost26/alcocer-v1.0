const { Client, Message } = require("discord.js");
require("dotenv").config();
const altAccountSchema = require("../../models/altAccount");
const { messageLinkTemplate } = require("../../../config.json");

/**
 *
 * @param {Client} client
 * @param {Message} message
 */
module.exports = async (client, message) => {
  if (!(message.author.id == "535898109184573451")) return;
  if (message.content != "a-dm caleb") return;

  await client.users
    .fetch("886450329456095283")
    .then((user) => {
      let _message =
        Math.random() < 0.5
          ? "Howdy how are we feeling today??"
          : "Top of the morning to ya lad, what's goin' on?";
      user.send(_message);
      message.reply("Sent " + _message);
    })
    .catch((err) => message.reply("Ain't working mate " + err));
};
