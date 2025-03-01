const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stop the music and clear the queue.'),
  async execute(interaction) {
    const guildId = interaction.guild.id;
    const player = global.musicPlayers && global.musicPlayers[guildId];
    if (!player) return interaction.reply({ content: 'No song is currently playing.', ephemeral: true });
    
    player.stop();
    await interaction.reply({ content: '⏹ Stopped the music and cleared the queue.' });
  },
};