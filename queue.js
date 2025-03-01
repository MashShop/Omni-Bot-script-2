const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Display the current music queue.'),
  async execute(interaction) {
    const guildId = interaction.guild.id;
    const queue = global.musicQueues && global.musicQueues[guildId];
    if (!queue || queue.length === 0) {
      return interaction.reply({ content: 'The queue is empty.', ephemeral: true });
    }
    
    const embed = new EmbedBuilder()
      .setTitle('Song Queue')
      .setDescription(queue.map((song, i) => `${i + 1}. ${song.title}`).join('\n'))
      .setColor('BLUE');
      
    await interaction.reply({ embeds: [embed] });
  },
};