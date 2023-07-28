const { Client, Message, inlineCode } = require("discord.js");
require("dotenv").config();
const { devs } = require("../../../config.json");
const teamSchema = require("../../models/teams.js");

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
  if (message.content.length > 2000) return;
  if (!devs.includes(message.member.id)) return;

  const command = "tadd";

  if (
    message.content.substring(
      process.env.COMMAND_PREFIX.length,
      process.env.COMMAND_PREFIX.length + command.length
    ) == command
  ) {
    const memberIds = message.content.match(/\d+/gm);
    memberIds.forEach(async (memberId) => {
      let findUser = await client.users.fetch(memberId).catch(async (error) => {
        if (error)
          await message.reply(`invalid id ${inlineCode(memberId)}: ${error}`);
        return;
      });
      if (findUser === undefined) return;

      if (await teamSchema.findOne({ accountId: memberId })) {
        botMessage.push(
          await message.reply(
            `${inlineCode(memberId)} already exists in team management`
          )
        );
      }
      const newMemberId = new teamSchema({ accountId: memberId });
      await newMemberId
        .save()
        .then(async (result) => {
          await message.reply(
            `pushed ${inlineCode(memberId)} into team management.`
          );
        })
        .catch(async (err) => {
          await message.reply(
            `error while adding ${memberId} into team management: ${err}`
          );
        });
    });
  }
};
