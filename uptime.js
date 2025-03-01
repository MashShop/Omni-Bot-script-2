const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('uptime')
    .setDescription('Displays the bot\'s uptime.'),
    
  async execute(interaction) {
    const uptime = process.uptime();
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / 3600) % 24);
    const days = Math.floor(uptime / 86400);
    await interaction.reply(`Uptime: ${days}d ${hours}h ${minutes}m ${seconds}s`);
  },
};