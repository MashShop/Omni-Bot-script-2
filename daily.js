import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('daily')
  .setDescription('Claim your daily reward');

export async function execute(interaction) {
  const uid = interaction.user.id;
  if (!interaction.client.economy) interaction.client.economy = {};
  if (!interaction.client.economy[uid]) {
    interaction.client.economy[uid] = { balance: 1000 };
  }
  interaction.client.economy[uid].balance += 500;
  const balance = interaction.client.economy[uid].balance;
  await interaction.reply(`Daily reward claimed! New balance: 💰 ${balance}`);
}