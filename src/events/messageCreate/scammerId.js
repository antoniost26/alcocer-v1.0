const { Client, Message, inlineCode, EmbedBuilder } = require("discord.js");
require("dotenv").config();
const scammerIdSchema = require("../../models/scammerIds.js");
const cooldowns = [];
const { devs, serverNames, messageTemplate } = require("../../../config.json");

/**
 *
 * @param {Client} client
 * @param {Message} message
 */
module.exports = async (client, message) => {
    if (!message.inGuild || message.author.bot) return;
    if (!message.content.startsWith(process.env.COMMAND_PREFIX)) return;
    if (
        !(
            message.guildId === "829600493398786078" ||
            message.guildId === "1119350182346244178"
        )
    )
        return;
    if (message.content.length > 100) return;

    const command = "construct";

    if (
        message.content.substring(
            process.env.COMMAND_PREFIX.length,
            process.env.COMMAND_PREFIX.length + command.length
        ) == command
    ) {
        if (cooldowns.includes(message.author.id)) return;
        if (!devs.includes(message.member.id)) return;

        try {
            const _ = require('lodash/array');
            const scammerIdsCursor = scammerIdSchema.find();
            let scammerIds = [];
            for await (const scammerId of scammerIdsCursor)
                scammerIds.push(scammerId.userid);
            const chunkedScammerIds = _.chunk(scammerIds, 50);
            let embeds = [];
            chunkedScammerIds.forEach((chunkedScammerId, myindex) => {
                const exampleEmbed = {
                    title: myindex,
                    description: chunkedScammerId.join(" ")
                }
                message.channel.send({embeds:[exampleEmbed]});
                // embeds.push(exampleEmbed)
                // let description = chunkedScammerId.join(" ");
                // const embed = new EmbedBuilder().setTitle(myindex).setDescription(description);
                // embeds.push(embed);
            });
            embeds.forEach(embed => message.channel.send({embeds: embed}));
            console.log("ran successfully")
        } catch (error) {
            console.log(
                `Error constructing embeds:\n ${error}`
            );
        }
        setTimeout(() => {
            cooldowns.pop(message.author.id);
        }, 6000);
    }
};
