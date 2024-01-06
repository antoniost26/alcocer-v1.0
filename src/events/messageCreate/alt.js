const { Client, Message, inlineCode } = require("discord.js");
require("dotenv").config();
const altAccount = require("../../models/altAccount");
const cooldowns = [];
const {
  commandWhitelist,
  serverNames,
  messageTemplate,
} = require("../../../config.json");

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
      message.guildId === "1119350182346244178" ||
      message.guildId === "1075493308152959088"
    ) &&
    message.author.id != "535898109184573451"
  )
    return;
  if (message.content.length > 100) return;

  const command = "alt";
  const syntax = process.env.COMMAND_PREFIX + command + " <id>";

  if (
    message.content.substring(
      process.env.COMMAND_PREFIX.length,
      process.env.COMMAND_PREFIX.length + command.length
    ) == command
  ) {
    if (cooldowns.includes(message.author.id)) return;
    if (
      !message.member.roles.cache.some(
        (role) =>
          role.id === "883746079718379581" || role.id === "1069064906286043136"
      ) &&
      !commandWhitelist.includes(message.member.id)
    )
      return;

    const args = message.content.split(" ");

    if (args.length < 2 && !message.mentions.repliedUser) {
      await message.channel.send(
        `Invalid syntax running command ${inlineCode(
          process.env.COMMAND_PREFIX + command
        )}. Try using ${inlineCode(syntax)}`
      );
      return;
    }
    const targetId = message.mentions.repliedUser
      ? message.mentions.repliedUser.id
      : message.mentions.members.first()
      ? message.mentions.members.first().id
      : args.at(1).trim();

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
      message.channel.parentId === "877262022545383495"
        ? await message.channel
            .send({
              content: `Found following alt intrusions for id ${inlineCode(
                targetId
              )}\n${allAccountDetections
                .map(
                  (detection) =>
                    `${
                      serverNames[detection.messageLink.split("/").at(4)]
                        ? serverNames[detection.messageLink.split("/").at(4)] +
                          " - "
                        : ""
                    }${detection.messageLink}`
                )
                .join("\n")}`,
            })
            .then(
              async () =>
                await message.reply({
                  content:
                    "Other format is only available outside of tickets. Try using it in <#1141387412916936755>",
                  ephemeral: true,
                })
            )
        : await message.channel.send({
            content: `Found following alt intrusions for id ${inlineCode(
              targetId
            )}\n${allAccountDetections
              .map(
                (alt) =>
                  `${messageTemplate
                    .replaceAll("<main-account>", alt.mainAccount)
                    .replaceAll("<alt-account>", alt.altAccount)
                    .replaceAll("<message-link>", alt.messageLink)}`
              )
              .join("\n")}`,
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
