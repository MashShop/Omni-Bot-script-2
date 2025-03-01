import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('wasted')
  .setDescription('Apply an anime wasted effect');

export async function execute(interaction) {
  const wastedGifs = [
    'https://example.com/anime_wasted1.gif',
    'https://example.com/anime_wasted2.gif',
    'https://example.com/anime_wasted3.gif'
  ];
  const gif = wastedGifs[Math.floor(Math.random() * wastedGifs.length)];
  const embed = new EmbedBuilder()
    .setTitle('Wasted!')
    .setImage(gif)
    .setColor(0xFF0000);
  await interaction.reply({ embeds: [embed] });
}