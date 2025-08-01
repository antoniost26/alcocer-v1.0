const { Client, Message, inlineCode } = require("discord.js");
require("dotenv").config();
const scammerIdSchema = require("../../models/scammerIds.js");
const { scammersIdChannelId } = require("../../../config.json");

/**
 *
 * @param {Client} client
 * @param {Message} message
 */
module.exports = async (client, message) => {
  if (message.author.bot && message.author.id != "1084377720236019743") return;
  if (!(message.channelId === scammersIdChannelId)) return;
  if (message.content.includes("752841321303244941")) {
    await message.delete().catch((error) => console.log(error));
    return;
  }
  if (!message.content.match(/[\d to be removed]+/gm)) return;

  const messageContent = message.content;
  let botMessage = [];
  let toDelete = true;

  messageContent.split("\n").forEach(async (element) => {
    if (element.match(/to be removed/gm) && element.match(/\d+/gm)) {
      try {
        const scammerId = element.match(/\d+/gm)[0];
        let findUser = await client.users
          .fetch(scammerId)
          .catch(async (error) => {
            if (error)
              botMessage.push(
                await message.reply(
                  `invalid id ${inlineCode(scammerId)}: ${error}`
                )
              );
            return;
          });
        if (findUser === undefined) return;
        if (await scammerIdSchema.findOne({ userid: scammerId })) {
          await scammerIdSchema.deleteMany({ userid: scammerId });
          botMessage.push(
            await message.reply(
              `removed ${inlineCode(scammerId)} from scammer-ids.`
            )
          );
          toDelete = false;
        } else {
          botMessage.push(
            await message.reply(
              `no scammer with id ${inlineCode(scammerId)} found in scammer-ids`
            )
          );
        }
      } catch (error) {
        console.error(error);
      }
    } else if (element.match(/\d+/gm)) {
      try {
        const scammerId = element.match(/\d+/gm)[0];
        let findUser = await client.users
          .fetch(scammerId)
          .catch(async (error) => {
            if (error)
              botMessage.push(
                await message.reply(
                  `invalid id ${inlineCode(scammerId)}: ${error}`
                )
              );
            return;
          });
        if (findUser === undefined) return;
        if (await scammerIdSchema.findOne({ userid: scammerId })) {
          botMessage.push(
            await message.reply(
              `${inlineCode(scammerId)} already exists in scammer-ids`
            )
          );
        } else {
          const newScammerId = new scammerIdSchema({ userid: scammerId });
          await newScammerId.save();
          botMessage.push(
            await message.reply(
              `pushed ${inlineCode(scammerId)} into scammer-ids.`
            )
          );
          toDelete = false;
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      botMessage.push(
        await message.reply(
          `Incorrect template. Please send <id> to add and <id> to be removed to remove`
        )
      );
      toDelete = true;
    }
  });
  setTimeout(async () => {
    if (toDelete) await message.delete().catch((error) => console.log(error));
    if (botMessage.length)
      await message.channel
        .bulkDelete(botMessage)
        .catch((error) => console.log(error));
  }, 10000);
};
