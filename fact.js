import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('fact')
  .setDescription('Send a random fact');

export async function execute(interaction) {
  const facts = [
    'Honey never spoils.',
    'A day on Venus is longer than a year on Venus.',
    'Octopuses have three hearts.'
  ];
  const fact = facts[Math.floor(Math.random() * facts.length)];
  await interaction.reply(fact);
}