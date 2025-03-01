const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Resume the paused song.'),
  async execute(interaction) {
    const guildId = interaction.guild.id;
    const player = global.musicPlayers && global.musicPlayers[guildId];
    if (!player) return interaction.reply({ content: 'No song is currently playing.', ephemeral: true });
    
    player.unpause();
    await interaction.reply({ content: '▶ Resumed the music.' });
  },
};