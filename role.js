const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('role')
    .setDescription('Add or remove a role from a user.')
    .addStringOption(option =>
      option.setName('action')
            .setDescription('Select "add" or "remove".')
            .setRequired(true)
            .addChoices(
              { name: 'Add', value: 'add' },
              { name: 'Remove', value: 'remove' }
            ))
    .addUserOption(option =>
      option.setName('target')
            .setDescription('User to modify')
            .setRequired(true))
    .addRoleOption(option =>
      option.setName('role')
            .setDescription('Role to add or remove')
            .setRequired(true)),
  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageRoles)) {
      return interaction.reply({ content: '❌ You do not have permission to manage roles.', ephemeral: true });
    }
    const action = interaction.options.getString('action');
    const user = interaction.options.getUser('target');
    const role = interaction.options.getRole('role');
    const targetMember = await interaction.guild.members.fetch(user.id);
    if (action === 'add') {
      await targetMember.roles.add(role);
      return interaction.reply({ content: `✅ Added ${role.name} to ${user.tag}.` });
    } else {
      await targetMember.roles.remove(role);
      return interaction.reply({ content: `✅ Removed ${role.name} from ${user.tag}.` });
    }
  },
};