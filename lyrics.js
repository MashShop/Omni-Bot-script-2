const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lyrics')
        .setDescription('Find the lyrics of a song')
        .addStringOption(option => 
            option.setName('song')
                .setDescription('The name of the song')
                .setRequired(true)
        ),

    async execute(interaction) {
        const songName = interaction.options.getString('song');

        try {
            const response = await axios.get(`https://api.genius.com/search`, {
                params: { q: songName },
                headers: { Authorization: `Bearer YOUR_GENIUS_API_KEY` }
            });

            if (response.data.response.hits.length === 0) {
                return interaction.reply({ content: '❌ No lyrics found for this song.', ephemeral: true });
            }

            const songData = response.data.response.hits[0].result;
            const lyricsUrl = songData.url;

            const embed = new EmbedBuilder()
                .setTitle(`Lyrics: ${songData.full_title}`)
                .setURL(lyricsUrl)
                .setThumbnail(songData.song_art_image_thumbnail_url)
                .setDescription(`Click [here](${lyricsUrl}) to view full lyrics!`)
                .setColor('#1DB954');

            await interaction.reply({ embeds: [embed] });

        } catch (error) {
            console.error(error);
            return interaction.reply({ content: '⚠️ Error fetching lyrics. Try again later.', ephemeral: true });
        }
    }
};