const { Schema, model } = require("mongoose");

const feedbackSchema = new Schema({
  targetId: {
    type: String,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  isAnon: {
    type: Boolean,
    required: true,
  },
  messageLink: {
    type: String,
    required: false,
  },
});

module.exports = model("feedback-test", feedbackSchema);
