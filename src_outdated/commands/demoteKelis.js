import { SlashCommandBuilder } from '@discordjs/builders';

const demoteKelisCommand = new SlashCommandBuilder()
    .setName('demotekelis')
    .setDescription('demotes kelis to member')
    .addStringOption((option) => 
        option
            .setName('reason')
            .setDescription('Reason for demotion')
            .setRequired(true)
    );

export default demoteKelisCommand.toJSON();