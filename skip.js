const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skip the current track.'),
  async execute(interaction) {
    const guildId = interaction.guild.id;
    const player = global.musicPlayers && global.musicPlayers[guildId];
    if (!player) return interaction.reply({ content: 'No song is currently playing.', ephemeral: true });
    
    player.stop(); // In many implementations, stopping the current track will automatically skip to the next.
    await interaction.reply({ content: '⏭ Skipped the current track.' });
  },
};