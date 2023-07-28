const { Client, Message, inlineCode } = require("discord.js");
require("dotenv").config();
const teamSchema = require("../../models/teams.js");
const { devs } = require("../../../config.json");

/**
 *
 * @param {Client} client
 * @param {Message} message
 */
module.exports = async (client, message) => {
  if (!message.inGuild || message.author.bot) return;
  if (!message.content.startsWith(process.env.COMMAND_PREFIX)) return;
  if (
    !(
      message.guildId === "829600493398786078" ||
      message.guildId === "1119350182346244178"
    )
  )
    return;
  if (message.content.length > 100) return;
  if (!devs.includes(message.member.id)) return;

  const command = "trm";

  if (
    message.content.substring(
      process.env.COMMAND_PREFIX.length,
      process.env.COMMAND_PREFIX.length + command.length
    ) == command
  ) {
    const memberId = message.content.match(/\d+/gm)[0];
    const memberIds = message.content.match(/\d+/gm);
    memberIds.forEach(async (memberId) => {
      let findUser = await client.users.fetch(memberId).catch(async (error) => {
        if (error)
          await message.reply(`invalid id ${inlineCode(memberId)}: ${error}`);
        return;
      });
      if (findUser === undefined) return;

      if (await teamSchema.findOne({ accountId: memberId })) {
        await teamSchema.deleteMany({ accountId: memberId });
        await message.reply(
          `removed ${inlineCode(memberId)} from team management.`
        );
      } else {
        await message.reply(
          `no member with id ${inlineCode(scammerId)} found in team management`
        );
      }
    });
  }
};
