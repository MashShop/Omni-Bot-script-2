const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a user from the server.')
    .addUserOption(option => 
      option.setName('target')
            .setDescription('User to ban')
            .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
            .setDescription('Reason for ban')
            .setRequired(false)),
  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) {
      return interaction.reply({ content: '❌ You do not have permission to ban members.', ephemeral: true });
    }
    const user = interaction.options.getUser('target');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const embed = new EmbedBuilder()
      .setTitle('User Banned')
      .setColor('Red')
      .addFields(
        { name: 'User', value: `${user.tag} (${user.id})`, inline: true },
        { name: 'Moderator', value: `<@${interaction.user.id}>`, inline: true },
        { name: 'Reason', value: reason }
      )
      .setTimestamp();
    try {
      await interaction.guild.members.ban(user, { reason });
      return interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      return interaction.reply({ content: '❌ Failed to ban user. Check role hierarchy.', ephemeral: true });
    }
  },
};