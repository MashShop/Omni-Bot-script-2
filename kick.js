const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a user from the server.')
    .addUserOption(option => 
      option.setName('target')
            .setDescription('User to kick')
            .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
            .setDescription('Reason for kick')
            .setRequired(false)),
  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.KickMembers)) {
      return interaction.reply({ content: '❌ You do not have permission to kick members.', ephemeral: true });
    }
    const user = interaction.options.getUser('target');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const embed = new EmbedBuilder()
      .setTitle('User Kicked')
      .setColor('Orange')
      .addFields(
        { name: 'User', value: `${user.tag} (${user.id})`, inline: true },
        { name: 'Moderator', value: `<@${interaction.user.id}>`, inline: true },
        { name: 'Reason', value: reason }
      )
      .setTimestamp();
    try {
      const member = await interaction.guild.members.fetch(user.id);
      await member.kick(reason);
      return interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      return interaction.reply({ content: '❌ Failed to kick user. Check role hierarchy.', ephemeral: true });
    }
  },
};