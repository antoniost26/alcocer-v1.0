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
    let asignees = [];
    console.log(filteredMembers.length);
    filteredMembers.forEach((filteredMember) => {
      console.log(filteredMembers.length);
      let possibleMember = filteredMembers.filter(
        (_filteredMember) =>
          _filteredMember.user.id != filteredMember.user.id &&
          !asignees.includes(_filteredMember.user.id)
      )[Math.floor(Math.random() * possibleMembers.length)];
      assignedMembers[
        filteredMember?.user?.id ? filteredMember?.user?.id : "unknown"
      ] = possibleMember?.user?.id ? possibleMember.user?.id : "0";
      asignees.push(possibleMember?.user?.id ? possibleMember?.user?.id : "0");
    });
    let sentMessage = [];
    for (var key in assignedMembers) {
      sentMessage.push(`${key} -> ${assignedMembers[key]}`);
    }
    message.channel.send(
      `Teams have been generated as following:\n${sentMessage.join("\n")}`
    );
  }
};
