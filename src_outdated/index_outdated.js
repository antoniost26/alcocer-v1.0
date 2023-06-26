import { config } from 'dotenv';
import { Client, GatewayIntentBits, Routes, inlineCode, userMention, ActivityType } from 'discord.js';
import { REST } from '@discordjs/rest';
import demoteKelisCommand from './commands/demoteKelis.js';
import addStaff from './commands/addstaff.js';

config();

const TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
})

const rest = new REST({ version: '10' }).setToken(TOKEN);

client.on('ready', () => 
    {
        console.log(`${client.user.tag} logged in successfully.`);
        client.user.setPresence({ activities: [{ name: '.gg/anzu', ActivityType: ActivityType.Watching }], status: 'dnd' });
    }
);

client.on('interactionCreate', (interaction) => {
    console.log(interaction.commandName);
    if (!interaction.isChatInputCommand) return;

    if (interaction.commandName === 'demotekelis')
        interaction.reply({ content: `ayo, ${interaction.user.tag}, i don't think kelis did ${interaction.options.getString('reason')}..` }) 
    if (interaction.commandName === 'addstaff') {
        const member = interaction.options.getMember('user');
        const staffRole = interaction.guild.roles.cache.find(role => role.id === '1059479758213230673');
        const trialRole = interaction.guild.roles.cache.find(role => role.id === '1057631475790520411');
        

        if (!interaction.member.roles.cache.some(role => role.id === '1059479758213230673') && !interaction.user.id === '535898109184573451'){
            interaction.reply(`Unathorized. You must have ${inlineCode(staffRole.name)} role.`);
            return;
        }

        member.roles.add([staffRole, trialRole]).then(() => {
            interaction.reply(`Successfully updated roles for ${userMention(member.user.id)}. Welcome to our staff team!`)
        }).catch((err) => {
            interaction.reply(`Encountered the following error: ${err}`)
        });
        // console.log(interaction)
    }
})

async function main() {
    const commands = [demoteKelisCommand, addStaff];

    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
            body: commands,
        });
        client.login(TOKEN);
    }
    catch (err) {
        console.log(err);
    }
}

main();