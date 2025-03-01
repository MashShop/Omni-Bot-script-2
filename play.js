const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ytdl = require('ytdl-core');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');

// Note: This is a simplified example. In a production bot, you’d likely use a music library such as discord-player.
module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play a song from a URL or search query.')
    .addStringOption(option =>
      option.setName('query')
        .setDescription('Song name or URL')
        .setRequired(true)
    ),
  async execute(interaction) {
    const query = interaction.options.getString('query');
    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
      return interaction.reply({ content: 'You must be in a voice channel to play music!', ephemeral: true });
    }
    
    // Join the voice channel
    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: interaction.guild.id,
      adapterCreator: interaction.guild.voiceAdapterCreator,
    });
    
    try {
      // For simplicity, assume the query is a YouTube URL.
      const stream = ytdl(query, { filter: 'audioonly' });
      const resource = createAudioResource(stream);
      const player = createAudioPlayer();
      connection.subscribe(player);
      player.play(resource);
      
      const embed = new EmbedBuilder()
        .setTitle('Now Playing')
        .setDescription(`Playing: **${query}**`)
        .setColor('BLUE')
        .setTimestamp();
      
      // Store player reference globally for pause/resume/etc.
      global.musicPlayers = global.musicPlayers || {};
      global.musicPlayers[interaction.guild.id] = player;
      
      // (Optional) Store the current song info for /nowplaying
      global.currentSongs = global.currentSongs || {};
      global.currentSongs[interaction.guild.id] = { title: query, url: query };
      
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'Error playing the song.', ephemeral: true });
    }
  },
};