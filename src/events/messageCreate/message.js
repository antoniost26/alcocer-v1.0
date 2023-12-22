const { Client, Message } = require("discord.js");
const { randomMessages } = require("../../../config.json");
require("dotenv").config();

/**
 *
 * @param {Client} client
 * @param {Message} message
 */
module.exports = async (client, message) => {
  if (!(message.author.id == "535898109184573451")) return;
  if (
    message.content.startsWith != "a-dm" &&
    !message.content.includes("a-dm alfie")
  )
    return;

  const targetId = message.mentions.repliedUser
    ? message.mentions.repliedUser.id
    : message.mentions.members.first()
    ? message.mentions.members.first().id
    : args.at(1).trim();
  let _message =
    randomMessages[Math.floor(Math.random() * randomMessages.length)];
  await client.users
    .fetch(targetId)
    .then((user) => {
      user.send(_message);
      message.reply("Sent " + _message);
    })
    .catch((err) => message.reply("Ain't working mate " + err));
};
