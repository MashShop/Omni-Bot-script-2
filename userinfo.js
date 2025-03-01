const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Displays information about a user.')
    .addUserOption(option => option.setName('target').setDescription('Select a user').setRequired(false)),
    
  async execute(interaction) {
    const user = interaction.options.getUser('target') || interaction.user;
    const member = await interaction.guild.members.fetch(user.id);

    const embed = new EmbedBuilder()
      .setTitle(`User Info - ${user.username}`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: '🆔 User ID', value: user.id, inline: true },
        { name: '👤 Username', value: user.username, inline: true },
        { name: '📆 Joined Discord', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`, inline: false },
        { name: '📅 Joined Server', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>`, inline: false },
        { name: '🔰 Roles', value: member.roles.cache.map(role => role).join(' ') || 'No Roles', inline: false }
      )
      .setColor('Blue')
      .setFooter({ text: `Requested by ${interaction.user.username}` })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};