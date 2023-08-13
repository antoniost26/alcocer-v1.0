const { Client, Message, inlineCode } = require("discord.js");
require("dotenv").config();
const feedbackSchema = require("../../models/feedback.js");

/**
 *
 * @param {Client} client
 * @param {Message} message
 */
module.exports = async (client, message) => {
  const command = "feedback";
  if (
    !(
      message.content.substring(
        process.env.COMMAND_PREFIX.length,
        process.env.COMMAND_PREFIX.length + command.length
      ) == command
    )
  )
    return;
  let isAdmin = false;
  if (!(message.channel.type == 1))
    isAdmin = message.member.roles.cache.some((role) =>
      [
        "1016462713725145189",
        "985939443162685500",
        "882838495419314237",
        "921064407096754218",
      ].includes(role.id)
    );
  if (
    !(message.channel.type == 1) &&
    !(message.guildId === "829600493398786078")
  )
    return;
  if (!(message.channel.type == 1) && !isAdmin) return;
  if (!message.content.startsWith(process.env.COMMAND_PREFIX)) return;
  if (message.content.length > 100) return;

  // validations
  let targetUser = isAdmin
    ? message.content.match(/\d+/gm)
      ? message.content.match(/\d+/gm)[0]
      : message.author.id
    : message.author.id;
  //
  const _ = require("lodash/array");
  let embeds = [];
  let data = await constructEmbeds(client, message, targetUser);

  if (data[0].length == 0) {
    let { targetAvatarURL, targetUsername } = await getUserData(
      client,
      targetUser
    );
    message.channel.send({
      embeds: [
        {
          color: 0x2b2d31,
          title: "",
          author: {
            name: `${targetUsername[0]}'s feedback`,
            iconURL: targetAvatarURL[0],
          },
          fields: [
            {
              name: "",
              value: `No feedback available for <@${targetUser}>`,
            },
          ],
          footer: {
            text: `requested by ${message.author.username}`,
            iconURL: message.author.displayAvatarURL(),
          },
        },
      ],
    });
  }
  let chunkedFields = _.chunk(data[0], 24);
  chunkedFields.forEach((fieldChunk) => {
    const feedbackEmbed = {
      color: 0x2b2d31,
      title: "",
      author: {
        name: `${data[2][0]}'s feedback`,
        iconURL: data[1][0],
      },
      fields: fieldChunk,
      footer: {
        text: `requested by ${message.author.username}`,
        iconURL: message.author.displayAvatarURL(),
      },
    };
    embeds.push(feedbackEmbed);
  });
  let chunkedEmbeds = _.chunk(embeds, 5);
  chunkedEmbeds.forEach((chunkedEmbed) =>
    message.channel.send({ embeds: chunkedEmbed })
  );
};

async function constructEmbeds(client, message, targetUser) {
  const feedbackCursor = feedbackSchema.find({ targetId: targetUser });
  let feedbackArray = [];
  for await (const feedback of feedbackCursor) feedbackArray.push(feedback);
  let fields = [];
  let avatarURL = [];
  let targetUsername = [];
  const _ = require("lodash/array");
  feedbackArray.forEach((feedback) => {
    client.users
      .fetch(targetUser)
      .then((targetMember) => {
        fields.push({
          name: ``,
          value: `Received from ${
            feedback.isAnon ? "Anonymous User" : `<@${feedback.authorId}>`
          }\n${feedback.feedback}\n${inlineCode("Reference:")}:\n${
            feedback.messageLink ? feedback.messageLink : "none"
          }`,
          inline: true,
        });
        avatarURL.push(targetMember.displayAvatarURL());
        targetUsername.push(targetMember.username);
      })
      .catch((error) => console.log(error));
  });
  return [fields, avatarURL, targetUsername];
}

async function getUserData(client, targetUser) {
  let targetAvatarURL = [];
  let targetUsername = [];
  client.users.fetch(targetUser).then((targetMember) => {
    targetAvatarURL.push(targetMember.displayAvatarURL());
    targetUsername.push(targetMember.username);
  });
  return {
    targetAvatarURL: targetAvatarURL,
    targetUsername: targetUsername,
  };
}
