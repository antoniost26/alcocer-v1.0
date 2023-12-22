const { Client, Message } = require("discord.js");
require("dotenv").config();
const { devs, staffRoles } = require("../../../config.json");

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
  if (
    !devs.includes(message.member.id) &&
    message.member.id != "1007560759846387773" &&
    message.member.id != "165343848669642754"
  )
    return;

  const command = "randomize";

  if (
    message.content.substring(
      process.env.COMMAND_PREFIX.length,
      process.env.COMMAND_PREFIX.length + command.length
    ) == command
  ) {
    if (message.content === command) return;

    let members = await message.guild.members.fetch();
    let filteredMembers = members.filter((member) =>
      member.roles.cache.some((role) => staffRoles.includes(role.id))
    );
    let assignedMembers = {};
    let possibleMembers = [];
    filteredMembers.forEach((element) => {
      possibleMembers.push(element.user.id);
    });
    filteredMembers.forEach((filteredMember) => {
      let possibleMember =
        possibleMembers[Math.floor(Math.random() * possibleMembers.length)];
      assignedMembers[
        filteredMember.user.id ? filteredMember.user.id : "unknown"
      ] = possibleMember ? possibleMember : "0";
      possibleMembers = possibleMembers.filter(
        (_member) => _member != possibleMember
      );
    });
    let sentMessage = [];
    for (var key in assignedMembers) {
      let index = 0;
      while (sentMessage[index]?.join("\n").length > 1800) index += 1;

      if (sentMessage[index]?.length > 0) {
        sentMessage.push(`${key} -> ${assignedMembers[key]}`);
        continue;
      }
      sentMessage[index] = [`${key} -> ${assignedMembers[key]}`];
    }
    message.channel.send(`Randomized as following:\n`);
    console.log(sentMessage[0]);
    sentMessage.forEach((array) => {
      message.channel.send(array.join("\n"));
    });
  }
};
