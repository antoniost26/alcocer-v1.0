const { ApplicationCommandOptionType, inlineCode } = require("discord.js");
const feedbackSchema = require("../../models/feedback.js");
let ephemeralBoolean = true;

module.exports = {
  name: "feedback",
  description:
    "Leave a feedback on your colleague and let them know how good/bad they did!",
  // devOnly: Boolean,
  // testOnly: Boolean,
  options: [
    {
      name: "user",
      description: "The user you send your feedback to.",
      required: true,
      type: ApplicationCommandOptionType.Mentionable,
    },
    {
      name: "feedback",
      description:
        "The feedback in it's sense, here you're gonna put your opinion.",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
    {
      name: "anon",
      description: "Whether you want your opinion to be anonymous or not.",
      required: true,
      type: ApplicationCommandOptionType.Boolean,
    },
    {
      name: "message-link",
      description: "message link to point to an exact situation (optional).",
      required: false,
      type: ApplicationCommandOptionType.String,
    },
  ],

  callback: async (client, interaction) => {
    try {
      // validations
      if (
        !interaction.member.roles.cache.some((role) =>
          ["883746079718379581", "1069064906286043136"].includes(role.id)
        )
      ) {
        interaction.reply({
          content:
            "You don't have enough permissions to run this command. Command is reserved to staff only.",
          ephemeral: ephemeralBoolean,
        });
        return;
      }
      if (
        !interaction.options.getMentionable("user")?.user ||
        interaction.options.getMentionable("user").user.bot
      ) {
        interaction.reply({
          content: `${inlineCode(
            "user"
          )} option must be a valid user, not a role/bot`,
          ephemeral: ephemeralBoolean,
        });
        return;
      }
      if (
        !interaction.options
          .getMentionable("user")
          .roles.cache.some((role) =>
            ["883746079718379581", "1069064906286043136"].includes(role.id)
          )
      ) {
        interaction.reply({
          content:
            "The person you want to give feedback must be a Reporter/Deko.",
          ephemeral: ephemeralBoolean,
        });
        return;
      }
      if (
        interaction.options.getString("message-link") &&
        !interaction.options
          .getString("message-link")
          .match(
            /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
          )
      ) {
        interaction.reply({
          content: `${inlineCode("message-link")} option must be a valid link`,
          ephemeral: ephemeralBoolean,
        });
        return;
      }
      //

      // embed construction
      const feedbackEmbed = {
        color: 0x2b2d31,
        title: `New feedback sent by ${
          interaction.options.getBoolean("anon")
            ? "Anonymous User"
            : interaction.user.username
        }`,
        description: interaction.options.getString("feedback"),
        fields: [
          {
            name: "Reference:",
            Value: interaction.options.getString("message-link")
              ? `${interaction.options.getString("message-link")}`
              : "none",
          },
        ],
        footer: {
          text: `Received by ${
            interaction.options.getMentionable("user").user.username
          }`,
          iconURL: interaction.options
            .getMentionable("user")
            .user.displayAvatarURL(),
        },
      };
      //

      // logic
      let targetUser = interaction.options.getMentionable("user").user.id;
      let author = interaction.user.id;
      let feedback = interaction.options.getString("feedback");
      let isAnon = interaction.options.getBoolean("anon");
      let messageLink = interaction.options.getString("message-link");

      let feedbackQuery = feedbackSchema({
        targetId: targetUser,
        authorId: author,
        feedback: feedback,
        isAnon: isAnon,
        messageLink: messageLink,
      });
      await feedbackQuery.save();
      //

      // interaction reply and dm
      await interaction.reply({
        content: `Your feedback was successfuly sent to <@${
          interaction.options.getMentionable("user").user.id
        }>`,
        embeds: [feedbackEmbed],
        ephemeral: ephemeralBoolean,
      });
      await interaction.options
        .getMentionable("user")
        .user.send({
          content: `You have received new feedback!`,
          embeds: [feedbackEmbed],
        })
        .catch((error) => console.log(error));
      //
    } catch (error) {
      console.log(error);
    }
  },
};
