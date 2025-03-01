const { SlashCommandBuilder } = require('discord.js');
// Simpan join role menggunakan global Map.
const joinRoles = new Map();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('joinrole')
    .setDescription('Set the role assigned to new members upon joining.')
    .addRoleOption(option =>
      option.setName('role')
            .setDescription('Role to assign.')
            .setRequired(true)),
  async execute(interaction) {
    const role = interaction.options.getRole('role');
    joinRoles.set(interaction.guild.id, role.id);
    await interaction.reply({ content: `✅ Join role set to ${role.name}.`, ephemeral: true });
  }
};