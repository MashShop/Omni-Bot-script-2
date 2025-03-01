const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'shop.json');

function loadShop() {
  if (!fs.existsSync(dataPath)) return [];
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('shop')
    .setDescription('Displays items available for purchase.'),
    
  async execute(interaction) {
    const shopItems = loadShop(); // e.g. [{name: 'Sword', price: 500}, ...]

    if (!shopItems.length) {
      return interaction.reply('The shop is currently empty.');
    }

    const embed = new EmbedBuilder()
      .setTitle('🛒 Shop Items')
      .setColor('Blue');

    let description = '';
    shopItems.forEach((item, index) => {
      description += `**${index + 1}. ${item.name}** - $${item.price}\n`;
    });

    embed.setDescription(description);

    await interaction.reply({ embeds: [embed] });
  }
};