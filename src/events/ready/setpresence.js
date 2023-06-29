const { ActivityType } = require("discord.js");

module.exports = async (client) => {
  client.user.setPresence({
    activities: [{ name: "-.", ActivityType: ActivityType.Watching }],
    status: "dnd",
  });
};
