const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Checks the bot latency.'),
    
  async execute(interaction) {
    const latency = interaction.client.ws.ping;
    await interaction.reply(`🏓 Pong! Latency is ${latency}ms`);
  },
};