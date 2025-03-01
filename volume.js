const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('volume')
    .setDescription('Set the volume of the music player (1-100).')
    .addIntegerOption(option =>
      option.setName('level')
            .setDescription('Volume level (1-100)')
            .setRequired(true)
    ),
  async execute(interaction) {
    const level = interaction.options.getInteger('level');
    const guildId = interaction.guild.id;
    const player = global.musicPlayers && global.musicPlayers[guildId];
    if (!player) return interaction.reply({ content: 'No song is currently playing.', ephemeral: true });
    
    player.setVolume(level); // This depends on your music player implementation
    await interaction.reply({ content: `Volume set to ${level}%.` });
  },
};