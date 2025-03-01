const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nowplaying')
    .setDescription('Display the currently playing song.'),
  async execute(interaction) {
    const guildId = interaction.guild.id;
    const currentSong = global.currentSongs && global.currentSongs[guildId];
    if (!currentSong) return interaction.reply({ content: 'No song is currently playing.', ephemeral: true });
    const embed = new EmbedBuilder()
      .setTitle('Now Playing')
      .setDescription(`**${currentSong.title}**\n${currentSong.url}`)
      .setColor('BLUE')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};