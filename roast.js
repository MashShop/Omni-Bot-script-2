import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('roast')
  .setDescription('Roast a mentioned user')
  .addUserOption(option =>
    option.setName('target')
      .setDescription('User to roast')
      .setRequired(true)
  );

export async function execute(interaction) {
  const user = interaction.options.getUser('target');
  const roasts = [
    'You look like you got hit by a truck.',
    'If I had a face like yours, I\'d sue my parents.',
    'You are the human equivalent of a participation trophy.',
    'I’d agree with you but then we’d both be wrong.'
  ];
  const roast = roasts[Math.floor(Math.random() * roasts.length)];
  await interaction.reply(`${user}, ${roast}`);
}