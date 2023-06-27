const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  userMention,
} = require("discord.js");

module.exports = {
  callback: async (client, interaction) => {
    await interaction.deferReply();
    const targetUser = interaction.options.getMember("target-user");

    if (!interaction.guild.members.fetch(targetUser.user.id)) {
      await interaction.editReply("That user doesn't exist in this server.");
      return;
    }

    if (targetUser.id === interaction.guild.ownerId) {
      await interaction.editReply(
        "You can't use this command on the server owner."
      );
      return;
    }

    const staffRole = interaction.guild.roles.cache.find(
      (role) => role.id === "1059479758213230673"
    );
    const trialRole = interaction.guild.roles.cache.find(
      (role) => role.id === "1057631475790520411"
    );

    if (targetUser.roles.cache.some((role) => role.id === staffRole.id)) {
      await interaction.editReply(
        `${userMention(targetUser.user.id)} is already part of the staff.`
      );
      return;
    }

    targetUser.roles
      .add([staffRole, trialRole])
      .then(async () => {
        await interaction.editReply(
          `Successfully updated roles for ${userMention(
            targetUser.user.id
          )}. Welcome to our staff team!`
        );
      })
      .catch(async (err) => {
        await interaction.editReply(
          `Encountered the following error when giving roles: ${err}`
        );
      });
  },
  name: "addstaff",
  description:
    "Hands roles to new staff, use with caution (gives staff + trial mod)",
  // devOnly: Boolean,
  testOnly: true,
  options: [
    {
      name: "target-user",
      description: "The user to give roles to.",
      required: true,
      type: ApplicationCommandOptionType.Mentionable,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.ManageRoles],
  botPermissions: [PermissionFlagsBits.ManageRoles],
};
