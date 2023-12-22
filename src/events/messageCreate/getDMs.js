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

  // validations
  let author = message.author;

  let dev = await client.users.fetch(devs[0]);
  dev
    .send({
      content: `Message sent by ${
        author.username ? author.username : author.id
      } (${author.id}) in DMs: \n ${message.content}`,
      files: message.attachments ? message.attachments : null,
    })
    .catch((error) => console.log(error));
};
