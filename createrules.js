const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('createrules')
    .setDescription('Create the official server and bot rules for Omni Bot Community.'),
  async execute(interaction) {
    // Hanya administrator atau server owner yang dapat membuat rules
    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({ content: '❌ Only administrators can create rules.', ephemeral: true });
    }

    // Embed untuk Server Rules
    const serverRulesEmbed = new EmbedBuilder()
      .setTitle('📜 Official Server Rules - Omni Bot Community')
      .setDescription(`Welcome to **Omni Bot Community**! Please read and follow these rules.`)
      .addFields(
        { name: '1️⃣ Respect All Members', value: 'Treat everyone with respect regardless of differences.' },
        { name: '2️⃣ No Spamming', value: 'Avoid excessive messages, emojis, or mentions.' },
        { name: '3️⃣ No NSFW/Inappropriate Content', value: 'Do not post content that is offensive or not safe for work.' },
        { name: '4️⃣ No Harassment or Hate Speech', value: 'Harassment, bullying, or hate speech is strictly prohibited.' },
        { name: '5️⃣ No Dangerous Links', value: 'Do not share harmful or malicious links.' },
        { name: '6️⃣ No Unauthorized Advertising', value: 'Advertising without permission is not allowed.' },
        { name: '7️⃣ Proper Channel Usage', value: 'Use channels according to their intended purpose.' },
        { name: '8️⃣ No Mass Mentions', value: 'Do not abuse @everyone or @here mentions.' },
        { name: '9️⃣ Follow Moderator Instructions', value: 'Always comply with directions given by moderators.' },
        { name: '🔟 No Exploiting Loopholes', value: 'Do not search for or exploit loopholes to bypass these rules.' },
        { name: '📜 Omni Bot ToS', value: '[Click here for Omni Bot ToS](https://mashshop.github.io/ToS-Omni-Bot/)' },
        { name: '📜 Discord ToS', value: '[Click here for Discord Terms of Service](https://discord.com/terms)' },
        { name: '⚠️ Consequences', value: 'Violations of these rules will result in warnings, kicks, or bans.' }
      )
      .setColor('Blue')
      .setFooter({ text: 'Rules cannot be changed by regular members.' })
      .setTimestamp();

    // Embed untuk Bot Rules (Omni Bot ToS)
    const botRulesEmbed = new EmbedBuilder()
      .setTitle('🤖 Omni Bot Terms of Service')
      .setDescription(`By using Omni Bot, you agree to the following rules:`)
      .addFields(
        { name: '1️⃣ No Misuse of Bot Commands', value: 'Do not spam commands or misuse the bot in any way.' },
        { name: '2️⃣ No Attempts to Break Security', value: 'Any attempt to exploit the bot will result in a permanent ban.' },
        { name: '3️⃣ Respect Bot Permissions', value: 'Do not remove bot permissions unless necessary.' },
        { name: '4️⃣ No Abuse of Auto-Moderation', value: 'Users attempting to bypass moderation will be warned or banned.' },
        { name: '5️⃣ Bot Logs & Monitoring', value: 'All actions performed with the bot are logged for security reasons.' },
        { name: '6️⃣ Omni Bot Admins Have Full Control', value: 'Developers reserve the right to change, update, or remove the bot without prior notice.' },
        { name: '🔗 Read Full ToS', value: '[Click here for the complete Omni Bot ToS](https://mashshop.github.io/ToS-Omni-Bot/)' }
      )
      .setColor('Red')
      .setFooter({ text: 'Using Omni Bot means you accept these terms.' })
      .setTimestamp();

    // Kirim embed ke channel tempat command dijalankan
    await interaction.channel.send({ embeds: [serverRulesEmbed, botRulesEmbed] });
    await interaction.reply({ content: '✅ Server and Bot rules have been successfully created.', ephemeral: true });
  },
};