const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('Displays information about Omni Bot.'),
    
  async execute(interaction) {
    const bot = interaction.client.user;
    const embed = new EmbedBuilder()
      .setTitle('Omni Bot Information')
      .addFields(
        { name: 'Name', value: bot.username, inline: true },
        { name: 'ID', value: bot.id, inline: true },
        { name: 'Servers', value: interaction.client.guilds.cache.size.toString(), inline: true }
      )
      .setColor('Purple')
      .setTimestamp();
      
    await interaction.reply({ embeds: [embed] });
  },
};