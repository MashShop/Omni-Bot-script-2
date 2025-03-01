const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('timeout')
    .setDescription('Timeout a user for a specified duration (in seconds).')
    .addUserOption(option =>
      option.setName('target')
            .setDescription('User to timeout.')
            .setRequired(true))
    .addIntegerOption(option =>
      option.setName('duration')
            .setDescription('Duration in seconds.')
            .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
            .setDescription('Reason for timeout.')
            .setRequired(false)),
  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers)) {
      return interaction.reply({ content: '❌ You do not have permission to timeout members.', ephemeral: true });
    }
    const member = interaction.options.getMember('target');
    const duration = interaction.options.getInteger('duration');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    try {
      await member.timeout(duration * 1000, reason);
      const embed = new EmbedBuilder()
        .setTitle('User Timed Out')
        .setColor('Orange')
        .addFields(
          { name: 'User', value: `${member.user.tag} (${member.id})`, inline: true },
          { name: 'Duration', value: `${duration} seconds`, inline: true },
          { name: 'Reason', value: reason }
        )
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: '❌ Failed to timeout user.', ephemeral: true });
    }
  }
};