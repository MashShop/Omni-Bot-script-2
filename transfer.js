import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('transfer')
  .setDescription('Transfer money to another user')
  .addUserOption(option =>
    option.setName('target')
      .setDescription('User to transfer money to')
      .setRequired(true)
  )
  .addIntegerOption(option =>
    option.setName('amount')
      .setDescription('Amount of money to transfer')
      .setRequired(true)
  );

export async function execute(interaction) {
  const uid = interaction.user.id;
  const target = interaction.options.getUser('target');
  const amount = interaction.options.getInteger('amount');

  if (!interaction.client.economy) interaction.client.economy = {};
  if (!interaction.client.economy[uid]) interaction.client.economy[uid] = { balance: 1000 };
  if (!interaction.client.economy[target.id]) interaction.client.economy[target.id] = { balance: 1000 };

  if (amount <= 0) return interaction.reply('Enter a valid amount.');
  if (interaction.client.economy[uid].balance < amount) return interaction.reply('Insufficient funds!');
  
  interaction.client.economy[uid].balance -= amount;
  interaction.client.economy[target.id].balance += amount;
  await interaction.reply(`Transferred 💰 ${amount} to ${target.tag}.`);
}