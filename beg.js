import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('beg')
  .setDescription('Beg for money from the bot');

export async function execute(interaction) {
  const uid = interaction.user.id;
  // Pastikan ekonomi sudah ada di client
  if (!interaction.client.economy) interaction.client.economy = {};
  // Inisialisasi data user jika belum ada
  if (!interaction.client.economy[uid]) {
    interaction.client.economy[uid] = { balance: 1000, donation: 0 };
  }
  // Hasil random dari command beg (misalnya antara 10 hingga 100)
  const donationAmount = Math.floor(Math.random() * 91) + 10;
  interaction.client.economy[uid].balance += donationAmount;
  interaction.client.economy[uid].donation += donationAmount;
  await interaction.reply(`You begged and received 💰 ${donationAmount}!\nYour new balance is: ${interaction.client.economy[uid].balance}`);
}