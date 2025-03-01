const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('seek')
    .setDescription('Seek to a specific time in the current track (format: mm:ss).')
    .addStringOption(option =>
      option.setName('time')
            .setDescription('Time to seek to (mm:ss)')
            .setRequired(true)
    ),
  async execute(interaction) {
    const timeStr = interaction.options.getString('time');
    const parts = timeStr.split(':');
    if (parts.length !== 2) {
      return interaction.reply({ content: 'Invalid time format. Use mm:ss', ephemeral: true });
    }
    const minutes = parseInt(parts[0]);
    const seconds = parseInt(parts[1]);
    const seekTime = minutes * 60 + seconds;
    const guildId = interaction.guild.id;
    const player = global.musicPlayers && global.musicPlayers[guildId];
    if (!player) return interaction.reply({ content: 'No song is currently playing.', ephemeral: true });
    
    player.seek(seekTime * 1000); // Assuming the seek method expects milliseconds
    await interaction.reply({ content: `Seeked to ${timeStr}.` });
  },
};