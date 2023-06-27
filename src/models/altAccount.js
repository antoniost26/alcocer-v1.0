const { Schema, model } = require("mongoose");

const altSchema = new Schema({
  _id: Schema.Types.ObjectId,
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
