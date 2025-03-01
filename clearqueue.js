const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clearqueue')
    .setDescription('Clear the entire music queue.'),
  async execute(interaction) {
    const guildId = interaction.guild.id;
    if (global.musicQueues && global.musicQueues[guildId]) {
      global.musicQueues[guildId] = [];
      return interaction.reply({ content: 'The music queue has been cleared.' });
    }
    return interaction.reply({ content: 'No music queue to clear.', ephemeral: true });
  },
};