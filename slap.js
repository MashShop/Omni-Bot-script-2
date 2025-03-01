import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('slap')
  .setDescription('Slap a mentioned user with an anime gif')
  .addUserOption(option =>
    option.setName('target')
      .setDescription('User to slap')
      .setRequired(true)
  );

export async function execute(interaction) {
  const target = interaction.options.getUser('target');
  const slapGifs = [
    'https://example.com/anime_slap1.gif',
    'https://example.com/anime_slap2.gif',
    'https://example.com/anime_slap3.gif'
  ];
  const gif = slapGifs[Math.floor(Math.random() * slapGifs.length)];
  const embed = new EmbedBuilder()
    .setTitle('Slap!')
    .setDescription(`${target.tag} got slapped!`)
    .setImage(gif)
    .setColor(0xFFA500);
  await interaction.reply({ embeds: [embed] });
}