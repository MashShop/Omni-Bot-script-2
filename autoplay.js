const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('autoplay')
    .setDescription('Toggle autoplay for recommended songs.')
    .addBooleanOption(option =>
      option.setName('enable')
            .setDescription('Enable or disable autoplay')
            .setRequired(true)
    ),
  async execute(interaction) {
    const enable = interaction.options.getBoolean('enable');
    const guildId = interaction.guild.id;
    const player = global.musicPlayers && global.musicPlayers[guildId];
    if (!player) return interaction.reply({ content: 'No song is currently playing.', ephemeral: true });
    // Pseudocode: Toggle autoplay; implementation depends on your music library.
    player.setAutoplay(enable);
    await interaction.reply({ content: `Autoplay has been ${enable ? 'enabled' : 'disabled'}.` });
  },
};