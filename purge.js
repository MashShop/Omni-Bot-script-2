const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('Delete a number of messages in this channel.')
    .addIntegerOption(option =>
      option.setName('amount')
            .setDescription('Number of messages to delete (1-100)')
            .setRequired(true)),
  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
      return interaction.reply({ content: '❌ You do not have permission to delete messages.', ephemeral: true });
    }
    const amount = interaction.options.getInteger('amount');
    if (amount < 1 || amount > 100) {
      return interaction.reply({ content: 'Please provide a number between 1 and 100.', ephemeral: true });
    }
    try {
      const deleted = await interaction.channel.bulkDelete(amount, true);
      return interaction.reply({ content: `✅ Deleted ${deleted.size} messages.`, ephemeral: true });
    } catch (error) {
      console.error(error);
      return interaction.reply({ content: '❌ Failed to delete messages.', ephemeral: true });
    }
  },
};