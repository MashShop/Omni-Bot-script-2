import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('pun')
  .setDescription('Tell a pun');

export async function execute(interaction) {
  const puns = [
    'I’m reading a book on anti-gravity. It’s impossible to put down!',
    'I used to be a banker but I lost interest.',
    'I would tell you a joke about construction, but I’m still working on it.'
  ];
  const pun = puns[Math.floor(Math.random() * puns.length)];
  await interaction.reply(pun);
}