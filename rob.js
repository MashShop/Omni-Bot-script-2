import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('rob')
  .setDescription('Attempt to rob money from another user')
  .addUserOption(option =>
    option.setName('target')
      .setDescription('User to rob')
      .setRequired(true)
  );

export async function execute(interaction) {
  const uid = interaction.user.id;
  const target = interaction.options.getUser('target');
  
  if (target.id === uid) return interaction.reply("You cannot rob yourself!");
  
  // Pastikan data ekonomi tersedia untuk kedua user
  if (!interaction.client.economy) interaction.client.economy = {};
  if (!interaction.client.economy[uid]) {
    interaction.client.economy[uid] = { balance: 1000, donation: 0 };
  }
  if (!interaction.client.economy[target.id]) {
    interaction.client.economy[target.id] = { balance: 1000, donation: 0 };
  }
  
  // Jika target memiliki saldo sangat rendah, tolak perampokan
  if (interaction.client.economy[target.id].balance < 50) {
    return interaction.reply(`${target.tag} doesn't have enough money to rob.`);
  }
  
  // Chance keberhasilan 50%
  if (Math.random() > 0.5) {
    // Sukses: mencuri antara 10% sampai 30% dari saldo target
    const percentage = Math.random() * (0.3 - 0.1) + 0.1;
    const amountStolen = Math.floor(interaction.client.economy[target.id].balance * percentage);
    interaction.client.economy[target.id].balance -= amountStolen;
    interaction.client.economy[uid].balance += amountStolen;
    await interaction.reply(`Successful robbery! You stole 💰 ${amountStolen} from ${target.tag}.`);
  } else {
    // Gagal: penalti kehilangan 10% dari saldo si pelaku
    const penalty = Math.floor(interaction.client.economy[uid].balance * 0.1);
    interaction.client.economy[uid].balance -= penalty;
    await interaction.reply(`Robbery failed! You lost 💰 ${penalty} as a penalty.`);
  }
}