const { SlashCommandBuilder } = require('discord.js');
// Untuk penyimpanan data secara persist, sebaiknya gunakan database.
// Di sini kita gunakan global Map untuk contoh sederhana.
const logChannels = new Map();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setlogs')
    .setDescription('Set the log channel for moderation events.')
    .addChannelOption(option =>
      option.setName('channel')
            .setDescription('Channel to use for logs.')
            .setRequired(true)),
  async execute(interaction) {
    const channel = interaction.options.getChannel('channel');
    logChannels.set(interaction.guild.id, channel.id);
    await interaction.reply({ content: `✅ Log channel has been set to ${channel}.`, ephemeral: true });
  }
};