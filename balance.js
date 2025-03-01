import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('balance')
  .setDescription('Check your current balance');

export async function execute(interaction) {
  const uid = interaction.user.id;
  // Menggunakan properti economy yang disimpan secara global pada client
  if (!interaction.client.economy) interaction.client.economy = {};
  if (!interaction.client.economy[uid]) {
    interaction.client.economy[uid] = { balance: 1000 };
  }
  const balance = interaction.client.economy[uid].balance;
  await interaction.reply(`Your balance is: 💰 ${balance}`);
}