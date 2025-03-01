import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('bank')
  .setDescription('Check your current balance and bank amount');

export async function execute(interaction) {
  const uid = interaction.user.id;
  // Pastikan objek ekonomi ada di client
  if (!interaction.client.economy) interaction.client.economy = {};
  // Inisialisasi data user jika belum ada
  if (!interaction.client.economy[uid]) {
    interaction.client.economy[uid] = { balance: 1000, bank: 0, donation: 0 };
  }
  const userData = interaction.client.economy[uid];
  await interaction.reply(`Your balance is: 💰 ${userData.balance}\nYour bank amount is: 🏦 ${userData.bank}`);
}