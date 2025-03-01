import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('work')
  .setDescription('Work to earn money');

export async function execute(interaction) {
  const uid = interaction.user.id;
  if (!interaction.client.economy) interaction.client.economy = {};
  if (!interaction.client.economy[uid]) {
    interaction.client.economy[uid] = { balance: 1000 };
  }
  const earned = Math.floor(Math.random() * 300) + 100;
  interaction.client.economy[uid].balance += earned;
  const balance = interaction.client.economy[uid].balance;
  await interaction.reply(`You worked and earned 💰 ${earned}. New balance: ${balance}`);
}