const { SlashCommandBuilder } = require('discord.js');
// Simpan auto role secara sederhana dengan global Map.
const autoRoles = new Map();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('autorole')
    .setDescription('Set the auto role for new members.')
    .addRoleOption(option =>
      option.setName('role')
            .setDescription('Role to assign automatically.')
            .setRequired(true)),
  async execute(interaction) {
    const role = interaction.options.getRole('role');
    autoRoles.set(interaction.guild.id, role.id);
    await interaction.reply({ content: `✅ Auto role has been set to ${role.name}.`, ephemeral: true });
  }
};