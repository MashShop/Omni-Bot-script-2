const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Mute a user for a specified duration.')
    .addUserOption(option =>
      option.setName('target')
            .setDescription('User to mute')
            .setRequired(true))
    .addStringOption(option =>
      option.setName('duration')
            .setDescription('Duration (e.g., 10m, 1h) - optional')
            .setRequired(false))
    .addStringOption(option =>
      option.setName('reason')
            .setDescription('Reason for mute')
            .setRequired(false)),
  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageRoles)) {
      return interaction.reply({ content: '❌ You do not have permission to mute members.', ephemeral: true });
    }
    const user = interaction.options.getUser('target');
    const duration = interaction.options.getString('duration') || 'indefinite';
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const muteRoleId = 'MUTED_ROLE_ID'; // ← Update this with your muted role ID.
    const embed = new EmbedBuilder()
      .setTitle('User Muted')
      .setColor('Grey')
      .addFields(
        { name: 'User', value: `${user.tag} (${user.id})`, inline: true },
        { name: 'Duration', value: duration, inline: true },
        { name: 'Reason', value: reason }
      )
      .setTimestamp();
    try {
      const member = await interaction.guild.members.fetch(user.id);
      await member.roles.add(muteRoleId, reason);
      await interaction.reply({ embeds: [embed] });
      // Optionally, you can add auto-unmute functionality here.
    } catch (error) {
      console.error(error);
      return interaction.reply({ content: '❌ Failed to mute user.', ephemeral: true });
    }
  },
};