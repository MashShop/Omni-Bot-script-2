const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
// Simpan status anti-raid secara global (untuk produksi, gunakan penyimpanan persisten)
let antiRaidEnabled = false;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('antiraid')
    .setDescription('Toggle anti-raid mode.')
    .addBooleanOption(option =>
      option.setName('enable')
            .setDescription('Enable or disable anti-raid.')
            .setRequired(true)),
  async execute(interaction) {
    const enable = interaction.options.getBoolean('enable');
    antiRaidEnabled = enable;
    const embed = new EmbedBuilder()
      .setTitle('Anti-Raid Mode')
      .setDescription(enable ? 'Anti-raid mode is now ENABLED.' : 'Anti-raid mode is now DISABLED.')
      .setColor(enable ? 'Green' : 'Red')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};