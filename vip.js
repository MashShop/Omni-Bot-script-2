const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('vip')
    .setDescription('Check VIP status based on Robux purchase and assign VIP role.')
    .addStringOption(option =>
      option.setName('username')
            .setDescription('Your Roblox username')
            .setRequired(true)),
    
  async execute(interaction) {
    const username = interaction.options.getString('username');
    
    // Get Roblox user ID
    const res = await fetch('https://users.roblox.com/v1/usernames/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usernames: [username], excludeBannedUsers: true })
    });
    const data = await res.json();
    if (!data.data || data.data.length === 0) {
      return interaction.reply({ content: 'Roblox username not found.', ephemeral: true });
    }
    const userId = data.data[0].id;
    
    // Game pass IDs (from previous conversation):\n// 3223359091 for 2 years, 3223357569 for 2 months\n\nconst vip2YearsID = 3223359091;\nconst vip2MonthsID = 3223357569;\n\nconst checkGamepass = async (userId, gamepassId) => {\n  const res = await fetch(`https://inventory.roblox.com/v1/users/${userId}/items/GamePass/${gamepassId}`);\n  const result = await res.json();\n  return result.data && result.data.length > 0;\n};\n\nconst has2Years = await checkGamepass(userId, vip2YearsID);\nconst has2Months = await checkGamepass(userId, vip2MonthsID);\n\nif (!has2Years && !has2Months) {\n  return interaction.reply({ content: 'You have not purchased the VIP game pass.', ephemeral: true });\n}\n\n// Find VIP role (assumes role name is 'VIP')\nconst vipRole = interaction.guild.roles.cache.find(r => r.name === 'VIP');\nif (!vipRole) {\n  return interaction.reply({ content: 'VIP role not found on this server.', ephemeral: true });\n}\n\ntry {\n  const member = await interaction.guild.members.fetch(interaction.user.id);\n  await member.roles.add(vipRole);\n  let vipDuration = has2Years ? '2 years' : '2 months';\n  const embed = new EmbedBuilder()\n    .setTitle('VIP Status Granted')\n    .setDescription(`You have been granted VIP status for **${vipDuration}**.`)\n    .setColor('Gold')\n    .setTimestamp();\n  await interaction.reply({ embeds: [embed] });\n} catch (error) {\n  console.error(error);\n  await interaction.reply({ content: '❌ Failed to assign VIP role.', ephemeral: true });\n}\n  }\n};\n```

---

### Website for Bot Settings

Untuk pengaturan bot (seperti mengubah prefix, auto role, log channel, dll.) secara real-time, kamu bisa membuat website dashboard. Dashboard ini dapat menggunakan framework seperti Express.js untuk backend dan React atau Vue.js untuk frontend, serta menyimpan pengaturan ke database (misalnya MongoDB).

Sebagai gambaran, nanti dashboard akan menyediakan:

- **Dashboard Login:** Mengautentikasi dengan Discord OAuth2.
- **Server Settings:** Pilih server yang kamu kelola, lalu atur pengaturan seperti:
  - Auto role
  - Log channel
  - Prefix
  - VIP settings
  - Dan lain-lain.

Karena pembuatan website dashboard merupakan proyek tersendiri, untuk saat ini fokuslah pada command–command utility di atas. Nanti setelah command sudah berjalan dengan baik, kita bisa mulai membuat dashboard web untuk setting bot.

---

Itulah kumpulan utility commands yang dipilih untuk Omni Bot Community beserta tambahan VIP command. Jika ada yang perlu diperbaiki atau ditambah, silakan beritahu aku!