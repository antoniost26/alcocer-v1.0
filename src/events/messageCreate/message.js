const { Client, Message } = require("discord.js");
const { randomMessages, commandWhitelist } = require("../../../config.json");
require("dotenv").config();

/**
 *
 * @param {Client} client
 * @param {Message} message
 */
module.exports = async (client, message) => {
  if (!commandWhitelist.includes(message.author.id)) return;
  if (
    !message.content.startsWith("a-dm") ||
    message.content.includes("a-dm alfie")
  )
    return;
  let args = message.content.split(" ");

  const targetId = message.mentions.repliedUser
    ? message.mentions.repliedUser.id
    : message.mentions.members.first()
    ? message.mentions.members.first().id
    : args.at(1).trim();

  let _message =
    randomMessages[Math.floor(Math.random() * randomMessages.length)];
  await client.users
    .fetch(targetId)
    .then(async (user) => {
      user.send(_message);
      let repliedMessage = await message.reply("Sent " + _message);
      setTimeout(() => {
        repliedMessage.delete();
      }, 5000);
    })
    .catch((err) => message.reply("Ain't working mate " + err));
};
