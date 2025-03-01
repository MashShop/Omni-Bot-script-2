const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Economy data
const econPath = path.join(__dirname, '..', 'data', 'economy.json');
// Shop data
const shopPath = path.join(__dirname, '..', 'data', 'shop.json');

function loadEconomy() {
  if (!fs.existsSync(econPath)) return {};
  return JSON.parse(fs.readFileSync(econPath, 'utf8'));
}

function saveEconomy(data) {
  fs.writeFileSync(econPath, JSON.stringify(data, null, 2));
}

function loadShop() {
  if (!fs.existsSync(shopPath)) return [];
  return JSON.parse(fs.readFileSync(shopPath, 'utf8'));
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('buy')
    .setDescription('Buy an item from the shop.')
    .addStringOption(option =>
      option.setName('item')
        .setDescription('The name of the item to buy')
        .setRequired(true)
    ),

  async execute(interaction) {
    const userId = interaction.user.id;
    const itemName = interaction.options.getString('item');

    let economy = loadEconomy();
    let shop = loadShop();

    if (!economy[userId]) {
      economy[userId] = { balance: 0, bank: 0, inventory: [] };
    }

    const item = shop.find(i => i.name.toLowerCase() === itemName.toLowerCase());
    if (!item) {
      return interaction.reply({ content: 'Item not found in the shop.', ephemeral: true });
    }

    if (economy[userId].balance < item.price) {
      return interaction.reply({ content: "You don't have enough money to buy this item!", ephemeral: true });
    }

    // Deduct money and add item to inventory
    economy[userId].balance -= item.price;
    economy[userId].inventory.push(item.name);

    saveEconomy(economy);

    await interaction.reply(`You bought **${item.name}** for $${item.price}!`);
  }
};