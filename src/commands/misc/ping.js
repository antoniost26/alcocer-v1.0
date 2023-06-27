module.exports = {
  name: "ping",
  description: "Check bot latency",
  devOnly: true,
  // testOnly: true,
  // options: Object[],
  // deleted: Boolean,

  callback: (client, interaction) => {
    interaction.reply({
      content: `Hey there! Current ${client.user.tag} ping is: ${client.ws.ping}ms`,
      ephemeral: true,
    });
  },
};
