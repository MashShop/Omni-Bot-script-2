const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warn a user.')
    .addUserOption(option =>
      option.setName('target')
            .setDescription('User to warn.')
            .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
            .setDescription('Reason for warning.')
            .setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('target');
    const reason = interaction.options.getString('reason');
    const embed = new EmbedBuilder()
      .setTitle('User Warned')
      .setColor('Yellow')
      .addFields(
        { name: 'User', value: `${user.tag} (${user.id})`, inline: true },
        { name: 'Moderator', value: `<@${interaction.user.id}>`, inline: true },
        { name: 'Reason', value: reason }
      )
      .setTimestamp();
    // Di sini, kamu bisa menambahkan logging warn ke database jika diinginkan.
    await interaction.reply({ embeds: [embed] });
  }
};