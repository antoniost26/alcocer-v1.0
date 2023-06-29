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
  if (!message.author.bot) return;
  if (!["703886990948565003"].includes(message.author.id)) return;
  if (!message.content.match(/[aA]lt-account intrusion/)) return;

  const messageContent = message.content;

  const mainAccount = messageContent
    ?.match(/\(([\d)]+)\)/gm)
    ?.at(1)
    ?.match(/\d+/gm)
    ?.at(0);
  const altAccount = messageContent
    ?.match(/\(([\d)]+)\)/gm)
    ?.at(0)
    ?.match(/\d+/gm)
    .at(0);
  const messageLink = messageLinkTemplate
    .replace("<guild-id>", message.guildId)
    .replace("<channel-id>", message.channelId)
    .replace("<message-id>", message.id);

  try {
    const newAlt = new altAccountSchema({
      mainAccount,
      altAccount,
      messageLink,
    });
    await newAlt.save();
  } catch (error) {
    console.log(`Error saving alt ${error}`);
  }
};
