const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('shuffle')
    .setDescription('Shuffle the current music queue.'),
  async execute(interaction) {
    const guildId = interaction.guild.id;
    const queue = global.musicQueues && global.musicQueues[guildId];
    if (!queue || queue.length < 2) return interaction.reply({ content: 'Not enough songs to shuffle.', ephemeral: true });
    
    // Simple Fisher-Yates shuffle
    for (let i = queue.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [queue[i], queue[j]] = [queue[j], queue[i]];
    }
    await interaction.reply({ content: 'The queue has been shuffled.' });
  },
};