import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('kill')
  .setDescription('Kill a mentioned user with an anime effect')
  .addUserOption(option =>
    option.setName('target')
      .setDescription('User to kill')
      .setRequired(true)
  );

export async function execute(interaction) {
  const target = interaction.options.getUser('target');
  const killGifs = [
    'https://example.com/anime_kill1.gif',
    'https://example.com/anime_kill2.gif',
    'https://example.com/anime_kill3.gif'
  ];
  const gif = killGifs[Math.floor(Math.random() * killGifs.length)];
  const embed = new EmbedBuilder()
    .setTitle('Eliminated!')
    .setDescription(`${target.tag} has been eliminated.`)
    .setImage(gif)
    .setColor(0x8B0000);
  await interaction.reply({ embeds: [embed] });
}