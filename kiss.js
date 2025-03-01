import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('kiss')
  .setDescription('Kiss a mentioned user with an anime gif')
  .addUserOption(option =>
    option.setName('target')
      .setDescription('User to kiss')
      .setRequired(true)
  );

export async function execute(interaction) {
  const target = interaction.options.getUser('target');
  const kissGifs = [
    'https://example.com/anime_kiss1.gif',
    'https://example.com/anime_kiss2.gif',
    'https://example.com/anime_kiss3.gif'
  ];
  const gif = kissGifs[Math.floor(Math.random() * kissGifs.length)];
  const embed = new EmbedBuilder()
    .setTitle('Kiss!')
    .setDescription(`${interaction.user.tag} kissed ${target.tag}`)
    .setImage(gif)
    .setColor(0xFF69B4);
  await interaction.reply({ embeds: [embed] });
}