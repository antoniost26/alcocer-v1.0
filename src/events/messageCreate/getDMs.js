const { Client, Message } = require("discord.js");
const { devs } = require("../../../config.json");
require("dotenv").config();
/**
 *
 * @param {Client} client
 * @param {Message} message
 */
module.exports = async (client, message) => {
  if (message.guild != null) return;
  if (message.author.id === "1123735122684944384") return;

  // validations
  let author = message.author;

  let dev = await client.users.fetch(devs[0]);

  let attachments = message.attachments;
  dev
    .send({
      content: `Message sent by ${
        author.username ? author.username : author.id
      } (${author.id}) in DMs: \n ${message.content}`,
      files: attachments ? [...attachments.values()] : [],
    })
    .catch((error) => console.log(error));
};
