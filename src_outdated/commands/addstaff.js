import { SlashCommandBuilder } from "@discordjs/builders";
import { PermissionFlagsBits } from "discord.js";

const addStaff = new SlashCommandBuilder()
    .setName('addstaff')
    .setDescription('adds new member to staff team (staff role, trial mod)')
    .addUserOption((option) => 
        option
            .setName('user')
            .setDescription('User to which you want to add roles')
            .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles);

export default addStaff.toJSON();