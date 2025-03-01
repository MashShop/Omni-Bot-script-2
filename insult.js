import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('insult')
  .setDescription('Give a playful insult');

export async function execute(interaction) {
  const insults = [
    'You’re as bright as a black hole, and twice as dense.',
    'If laughter is the best medicine, your face must be curing the world.',
    'I’d explain it to you, but I left my crayons at home.'
  ];
  const insult = insults[Math.floor(Math.random() * insults.length)];
  await interaction.reply(insult);
}