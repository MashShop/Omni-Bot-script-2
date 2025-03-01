const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nickname')
    .setDescription('Change a user\'s nickname.')
    .addUserOption(option =>
      option.setName('target')
            .setDescription('User whose nickname to change.')
            .setRequired(true))
    .addStringOption(option =>
      option.setName('nickname')
            .setDescription('New nickname.')
            .setRequired(true)),
  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageNicknames)) {
      return interaction.reply({ content: '❌ You do not have permission to change nicknames.', ephemeral: true });
    }
    const target = interaction.options.getMember('target');
    const nickname = interaction.options.getString('nickname');
    try {
      await target.setNickname(nickname);
      const embed = new EmbedBuilder()
        .setTitle('Nickname Changed')
        .setDescription(`Nickname for ${target.user.tag} has been changed to ${nickname}.`)
        .setColor('Blue')
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: '❌ Failed to change nickname.', ephemeral: true });
    }
  }
};