import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('meme')
  .setDescription('Send a random meme');

export async function execute(interaction) {
  const memes = [
    'https://i.imgflip.com/30b1gx.jpg',
    'https://i.imgflip.com/1bij.jpg',
    'https://i.imgflip.com/26am.jpg'
    // Tambahkan URL meme lainnya jika diperlukan
  ];
  const memeUrl = memes[Math.floor(Math.random() * memes.length)];
  const embed = new EmbedBuilder()
    .setTitle('Random Meme')
    .setImage(memeUrl)
    .setColor(0x00AE86);
  await interaction.reply({ embeds: [embed] });
}