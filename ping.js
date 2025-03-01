import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription("Checks the bot's latency");

export async function execute(interaction) {
  await interaction.reply(`🏓 Pong! Latency is ${interaction.client.ws.ping}ms.`);
}