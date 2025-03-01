const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('remove')
    .setDescription('Remove a song from the queue by position.')
    .addIntegerOption(option =>
      option.setName('position')
            .setDescription('Position number of the song in the queue')
            .setRequired(true)
    ),
  async execute(interaction) {
    const position = interaction.options.getInteger('position');
    const guildId = interaction.guild.id;
    const queue = global.musicQueues && global.musicQueues[guildId];
    if (!queue || queue.length < position) {
      return interaction.reply({ content: 'Invalid position in the queue.', ephemeral: true });
    }
    const removed = queue.splice(position - 1, 1);
    await interaction.reply({ content: `Removed **${removed[0].title}** from the queue.` });
  },
};