import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('compliment')
  .setDescription('Give a compliment');

export async function execute(interaction) {
  const compliments = [
    'You’re incredible!',
    'You have a great sense of humor.',
    'Your creativity is inspiring!'
  ];
  const compliment = compliments[Math.floor(Math.random() * compliments.length)];
  await interaction.reply(compliment);
}