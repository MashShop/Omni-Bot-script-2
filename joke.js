import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('joke')
  .setDescription('Tell a random joke');

export async function execute(interaction) {
  const jokes = [
    'Why don’t scientists trust atoms? Because they make up everything!',
    'I told my computer I needed a break, and now it won’t stop sending me KitKat commercials.',
    'I would tell you a construction joke, but I’m still working on it.'
  ];
  const joke = jokes[Math.floor(Math.random() * jokes.length)];
  await interaction.reply(joke);
}