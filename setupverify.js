const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setupverify')
    .setDescription('Set up the verification message with a Verify button.')
    .addChannelOption(option =>
      option.setName('channel')
            .setDescription('Channel to send the verification message')
            .setRequired(true))
    .addRoleOption(option =>
      option.setName('role')
            .setDescription('Role to assign when verified')
            .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  
  async execute(interaction) {
    const channel = interaction.options.getChannel('channel');
    const role = interaction.options.getRole('role');
    
    const embed = new EmbedBuilder()
      .setTitle('Verify Yourself')
      .setDescription(`Click the button below to verify and receive the **${role.name}** role. This will grant you access to all channels.`)
      .setColor('Blue')
      .setTimestamp();
      
    // Buat tombol Verify dengan custom ID yang menyertakan role ID
    const button = new ButtonBuilder()
      .setCustomId(`verify_${role.id}`)
      .setLabel('Verify')
      .setStyle(ButtonStyle.Primary);
    
    const row = new ActionRowBuilder().addComponents(button);
    
    // Kirim pesan verifikasi ke channel yang ditentukan
    await channel.send({ embeds: [embed], components: [row] });
    await interaction.reply({ content: `✅ Verification message sent in ${channel}.`, ephemeral: true });
  },
};