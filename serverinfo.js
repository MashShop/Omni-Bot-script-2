const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Displays information about the server.'),
  
  async execute(interaction) {
    const guild = interaction.guild;
    const embed = new EmbedBuilder()
      .setTitle(`Server Info - ${guild.name}`)
      .addFields(
        { name: '👑 Owner', value: `<@${guild.ownerId}>`, inline: true },
        { name: '👥 Members', value: guild.memberCount.toString(), inline: true },
        { name: '📆 Created On', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`, inline: false }
      )
      .setColor('Green')
      .setTimestamp();
      
    await interaction.reply({ embeds: [embed] });
  },
};