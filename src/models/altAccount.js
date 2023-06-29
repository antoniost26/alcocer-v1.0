const { Schema, model } = require("mongoose");

const altSchema = new Schema({
  mainAccount: {
    type: String,
    required: true,
  },
  altAccount: {
    type: String,
    required: true,
  },
  messageLink: {
    type: String,
    required: true,
  },
});

module.exports = model("DetectedAltIntrusions", altSchema);
