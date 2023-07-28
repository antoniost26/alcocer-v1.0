const { Schema, model } = require("mongoose");

const teamSchema = new Schema({
  accountId: {
    type: String,
    required: true,
  },
});

module.exports = model("team-members", teamSchema);
