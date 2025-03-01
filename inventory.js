const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const econPath = path.join(__dirname, '..', 'data', 'economy.json');

function loadEconomy() {
  if (!fs.existsSync(econPath)) return {};
  return JSON.parse(fs.readFileSync(econPath, 'utf8'));
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('inventory')
    .setDescription('Check the items in your inventory.'),
    
  async execute(interaction) {
    const userId = interaction.user.id;
    let economy = loadEconomy();

    if (!economy[userId]) {
      economy[userId] = { balance: 0, bank: 0, inventory: [] };
    }

    const inv = economy[userId].inventory || [];
    if (inv.length === 0) {
      return interaction.reply('Your inventory is empty.');
    }

    const embed = new EmbedBuilder()
      .setTitle(`${interaction.user.username}'s Inventory`)
      .setDescription(inv.join(', '))
      .setColor('Blue')
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};