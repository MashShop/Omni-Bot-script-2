const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Displays the avatar of a user.')
    .addUserOption(option =>
      option.setName('target')
            .setDescription('Select a user')
            .setRequired(false)),
    
  async execute(interaction) {
    const user = interaction.options.getUser('target') || interaction.user;
    const embed = new EmbedBuilder()
      .setTitle(`${user.username}'s Avatar`)
      .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setColor('Blue');
      
    await interaction.reply({ embeds: [embed] });
  },
};