const { Client, Message } = require("discord.js");
const { devs } = require("../../../config.json");
require("dotenv").config();
/**
 *
 * @param {Client} client
 * @param {Message} message
 */
module.exports = async (client, message) => {
  if (message?.guild != null) return;
  if (message.author.id != devs[0]) return;
  if (!message.content.startsWith("a-message")) return;

  let _targetId = message.content.split(" ")[1];
  let _message = message.content.split(" ").slice(2).join(" ");
  let targetUser = await client.users.fetch(_targetId);
  targetUser.send(_message).catch((error) => console.log(error));
  let sentMessage = await message
    .reply(`Sent message to ${_targetId}: \n ${_message}`)
    .catch((error) => console.log(error));
  sentMessage.delete().catch((error) => console.log(error));
  message.delete().catch((error) => console.log(error));
};
