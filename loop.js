const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('loop')
    .setDescription('Set loop mode for the current track or queue.')
    .addStringOption(option =>
      option.setName('mode')
            .setDescription('Choose a loop mode: off, single, or queue')
            .setRequired(true)
            .addChoices(
              { name: 'Off', value: 'off' },
              { name: 'Single', value: 'single' },
              { name: 'Queue', value: 'queue' }
            )
    ),
  async execute(interaction) {
    const mode = interaction.options.getString('mode');
    const guildId = interaction.guild.id;
    const player = global.musicPlayers && global.musicPlayers[guildId];
    if (!player) return interaction.reply({ content: 'No song is currently playing.', ephemeral: true });
    
    // Pseudocode: player.setLoopMode() implementation depends on your music library.
    player.setLoopMode(mode); 
    await interaction.reply({ content: `Loop mode set to **${mode}**.` });
  },
};