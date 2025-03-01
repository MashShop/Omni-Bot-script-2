const { SlashCommandBuilder } = require('discord.js');
// Simpan mapping reaction role menggunakan global Map.
const reactionRoles = new Map();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('reactionrole')
    .setDescription('Set up a reaction role.')
    .addStringOption(option =>
      option.setName('emoji')
            .setDescription('Emoji to react with.')
            .setRequired(true))
    .addRoleOption(option =>
      option.setName('role')
            .setDescription('Role to assign when reacted.')
            .setRequired(true)),
  async execute(interaction) {
    const emoji = interaction.options.getString('emoji');
    const role = interaction.options.getRole('role');
    reactionRoles.set(`${interaction.guild.id}-${emoji}`, role.id);
    await interaction.reply({ content: `✅ Reaction role set: React with ${emoji} to get ${role.name}.`, ephemeral: true });
  }
};