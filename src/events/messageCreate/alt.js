const { Client, Message, inlineCode } = require('discord.js');
require('dotenv').config();

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
module.exports = async (client, message) => {
    if (!message.content.startsWith(process.env.COMMAND_PREFIX)) {
        return;
    }

    const command = 'alt';
    const syntax = process.env.COMMAND_PREFIX + command + ' <id>';

    if (message.content.substring(process.env.COMMAND_PREFIX.length,process.env.COMMAND_PREFIX.length+command.length) == command) {
        const args = message.content.split(' ');

        if (args.length != 2) {
            await message.channel.send(`Invalid syntax running command ${inlineCode(process.env.COMMAND_PREFIX + command)}. Try using ${inlineCode(syntax)}`);
            return;
        }

        if (!/^[0-9]*$/.test(args.at(1))) {
            await message.channel.send(`Command ${inlineCode(process.env.COMMAND_PREFIX + command)} uses ids with digits only. Try running it again with a valid id.`)
            return;
        }
        
        const targetId = args.at(1).trim();

        await message.channel.send(`Cannot unveil alts for taget id ${inlineCode(targetId)}, process is under construction.`);
    }
};