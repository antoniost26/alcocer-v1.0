const { ActivityType } = require("discord.js");

module.exports = async (client) => {
  client.user.setPresence({
    activities: [{ name: ".gg/anzu", ActivityType: ActivityType.Watching }],
    status: "dnd",
  });
};
