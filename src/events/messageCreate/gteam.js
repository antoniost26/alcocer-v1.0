const { Client, Message } = require("discord.js");
require("dotenv").config();
const teamSchema = require("../../models/teams.js");
const { devs, carries } = require("../../../config.json");

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

  const command = "gteam";

  if (
    message.content.substring(
      process.env.COMMAND_PREFIX.length,
      process.env.COMMAND_PREFIX.length + command.length
    ) == command
  ) {
    let teamNumber = message.content.match(/\d+/gm)[0];
    let carr = [...carries];
    carr.sort(function () {
      return 0.5 - Math.random();
    });
    let rep = [];
    const reporters = teamSchema.find();
    for await (const reporter of reporters) rep.push(reporter.accountId);
    rep.sort(function () {
      return 0.5 - Math.random();
    });
    for (let i = 1; i < 5; i++)
      rep.sort(function () {
        return 0.5 - Math.random();
      });
    let teams = [[]];
    for (let i = 0; i < teamNumber; i++) {
      teams[i] = carr.length ? [carr.pop()] : [];
    }
    if (carr.length) rep.concat(carr);
    let i = 0;
    while (rep.length) {
      teams[i].push(rep.pop());
      if (i == teamNumber - 1) {
        i = 0;
      } else {
        i++;
      }
    }

    let teamAnno = [];
    let ind = 1;
    teams.forEach((element) => {
      teamAnno.push(
        `Team ${ind}:\n${element.map((el) => `<@${el}>`).join(", ")}`
      );
      ind++;
    });
    message.channel.send(
      `Teams have been generated as following:\n${teamAnno.join("\n-\n")}`
    );
  }
};
