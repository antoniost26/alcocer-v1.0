const { Schema, model } = require("mongoose");

const scammerIdSchema = new Schema({
    userid: {
        type: String,
        required: true,
    }
});

module.exports = model("scammer-ids", scammerIdSchema);
