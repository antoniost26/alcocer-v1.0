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
  if (message.content != "a-dm zack") return;

  await client.users
    .fetch("796047729175822356")
    .then((user) => {
      let _message = Math.random() < 0.5 ? "wowzers!! O_o" : "kachow o-o";
      user.send(_message);
      message.reply("Sent " + _message);
    })
    .catch((err) => message.reply("Ain't working mate " + err));
};
