const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('slowmode')
    .setDescription('Set slowmode for the current channel.')
    .addIntegerOption(option =>
      option.setName('seconds')
            .setDescription('Duration in seconds')
            .setRequired(true)),
  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
      return interaction.reply({ content: '❌ You do not have permission to manage channels.', ephemeral: true });
    }
    const seconds = interaction.options.getInteger('seconds');
    try {
      await interaction.channel.setRateLimitPerUser(seconds);
      return interaction.reply({ content: `✅ Set slowmode to ${seconds} seconds.` });
    } catch (error) {
      console.error(error);
      return interaction.reply({ content: '❌ Failed to set slowmode.', ephemeral: true });
    }
  },
};