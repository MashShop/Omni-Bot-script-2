import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('leaderboard')
  .setDescription('Display the leaderboard of total coins (balance + bank)');

export async function execute(interaction) {
  const economy = interaction.client.economy || {};
  let leaderboardData = [];

  // Ambil data tiap user dan hitung total koin (balance + bank)
  for (const [userId, userData] of Object.entries(economy)) {
    const balance = userData.balance || 0;
    const bank = userData.bank || 0;
    const total = balance + bank;
    leaderboardData.push({ userId, total });
  }

  // Urutkan berdasarkan total koin tertinggi
  leaderboardData.sort((a, b) => b.total - a.total);

  const embed = new EmbedBuilder()
    .setTitle("Coin Leaderboard")
    .setColor(0x00AE86);

  if (leaderboardData.length === 0) {
    embed.setDescription("No data available.");
  } else {
    let description = "";
    // Tampilkan 10 teratas
    for (let i = 0; i < Math.min(10, leaderboardData.length); i++) {
      const entry = leaderboardData[i];
      description += `${i + 1}. <@${entry.userId}> - Total Coins: ${entry.total}\n`;
    }
    embed.setDescription(description);
  }

  await interaction.reply({ embeds: [embed], ephemeral: true });
}