const { Client, Message } = require("discord.js");
require("dotenv").config();

/**
 *
 * @param {Client} client
 * @param {Message} message
 */
module.exports = async (client, message) => {
  if (!(message.author.id == "535898109184573451")) return;
  if (message.content != "a-dm alfie") return;

  await client.users
    .fetch("571247064785223697")
    .then((user) => {
      let _message =
        Math.random() < 0.5 ? "hii how r u :3" : "is Spotify available?";
      user.send(_message);
      message.reply("Sent " + _message);
    })
    .catch((err) => message.reply("Ain't working mate " + err));
};
