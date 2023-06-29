const { Client, Message, inlineCode } = require("discord.js");
require("dotenv").config();
const altAccount = require("../../models/altAccount");
const cooldowns = [];

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

  const command = "alt";
  const syntax = process.env.COMMAND_PREFIX + command + " <id>";

  if (
    message.content.substring(
      process.env.COMMAND_PREFIX.length,
      process.env.COMMAND_PREFIX.length + command.length
    ) == command
  ) {
    if (cooldowns.includes(message.author.id)) return;
    if (!message.member.roles.cache.some(role => role.id === "883746079718379581")) return;

    const args = message.content.split(" ");

    if (args.length < 2) {
      await message.channel.send(
        `Invalid syntax running command ${inlineCode(
          process.env.COMMAND_PREFIX + command
        )}. Try using ${inlineCode(syntax)}`
      );
      return;
    }

    //if (!/^[0-9]*$/.test(args.at(1))) {
      //await message.channel.send(
        //`Command ${inlineCode(
          //process.env.COMMAND_PREFIX + command
        //)} uses ids with digits only. Try running it again with a valid id.`
      //);
      //return;
   // }
    let targetId
    if (message.mentions.members.first()) targetId = message.mentions?.members.first().id;
        else targetId = args.at(1).trim();
//    const targetId = message?.mentions?.members.at(0).id? message?.mentions?.members.at(0).id : args.at(1).trim();

    let findUser = await client.users.fetch(targetId).catch((error) => {
      console.log("invalid id");
      return;
    });

    if (findUser === undefined) {
      message.channel.send(
        `Invalid id ${inlineCode(targetId)}. Try running with a valid id.`
      );
      return;
    }

    const mainQuery = {
      mainAccount: targetId,
    };

    const altQuery = {
      altAccount: targetId,
    };

    try {
      const mainAccountDetections = await altAccount.find(mainQuery);
      const altAccountDetections = await altAccount.find(altQuery);
      const allAccountDetections = [
        ...new Set([...mainAccountDetections, ...altAccountDetections]),
      ];

      if (allAccountDetections.length <= 0) {
        await message.channel.send({
          content: `No alt intrusions found with id ${inlineCode(targetId)}`,
        });
        return;
      }

      await message.channel.send({
        content: `Found following alt intrusions for id ${inlineCode(
          targetId
        )}\n${allAccountDetections.map((alt) => alt.messageLink).join("\n")}`,
      });
    } catch (error) {
      console.log(
        `Error searching alts for ${inlineCode(targetId)}:\n ${error}`
      );
    }
    cooldowns.push(message.author.id);
    setTimeout(() => {
      cooldowns.pop(message.author.id);
    }, 6000);
  }
};
