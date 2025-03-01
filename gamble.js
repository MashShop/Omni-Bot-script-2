import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('gamble')
  .setDescription('Gamble your money')
  .addIntegerOption(option =>
    option.setName('amount')
      .setDescription('Amount of money to bet')
      .setRequired(true)
  );

export async function execute(interaction) {
  const uid = interaction.user.id;
  if (!interaction.client.economy) interaction.client.economy = {};
  if (!interaction.client.economy[uid]) {
    interaction.client.economy[uid] = { balance: 1000 };
  }
  const bet = interaction.options.getInteger('amount');
  if (bet <= 0) return interaction.reply('Enter a valid bet amount.');
  if (bet > interaction.client.economy[uid].balance) return interaction.reply('Insufficient funds!');
  
  const win = Math.random() > 0.5;
  if (win) {
    interaction.client.economy[uid].balance += bet;
    await interaction.reply(`You won! New balance: ${interaction.client.economy[uid].balance}`);
  } else {
    interaction.client.economy[uid].balance -= bet;
    await interaction.reply(`You lost! New balance: ${interaction.client.economy[uid].balance}`);
  }
}