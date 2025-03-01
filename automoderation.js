const { EmbedBuilder } = require('discord.js');

// Daftar kata terlarang (contoh, sesuaikan dengan kebutuhan)
const bannedWords = [
  'badword1', 
  'badword2', 
  'jorokword', 
  'vulgarword'
];

// Konfigurasi untuk spam mention
const mentionThreshold = 10; // Jika mencapai 10 kali
const mentionTimeout = 10 * 60 * 1000; // Reset count setelah 10 menit

// Map untuk melacak spam mention per user: { userID: { count: number, timeout: Timeout } }
const mentionSpams = new Map();

module.exports = {
  name: 'messageCreate',
  async execute(message, client) {
    // Abaikan pesan dari bot
    if (message.author.bot) return;

    const content = message.content.toLowerCase();

    // Cek pesan untuk konten kasar/jorok
    for (const word of bannedWords) {
      if (content.includes(word)) {
        const warningEmbed = new EmbedBuilder()
          .setTitle('⚠️ Warning: Inappropriate Content')
          .setDescription(`Your message contains inappropriate language or content. Please review our [Terms of Service](https://mashshop.github.io/ToS-Omni-Bot/).`)
          .setColor('Yellow')
          .setTimestamp();
        try {
          await message.reply({ embeds: [warningEmbed], ephemeral: true });
        } catch (err) {
          console.error('Failed to send warning:', err);
        }
        // Jika sudah menemukan satu kata, cukup keluar dari loop.
        break;
      }
    }

    // Cek spam mention (@everyone atau @here)
    if (message.mentions.everyone) {
      let userData = mentionSpams.get(message.author.id);
      if (!userData) {
        userData = { count: 0, timeout: null };
        mentionSpams.set(message.author.id, userData);
      }
      userData.count += 1;

      // Jika ini adalah pelanggaran pertama, atur timer reset setelah 10 menit
      if (!userData.timeout) {
        userData.timeout = setTimeout(() => {
          mentionSpams.delete(message.author.id);
        }, mentionTimeout);
      }

      // Jika sudah mencapai threshold spam
      if (userData.count >= mentionThreshold) {
        try {
          const kickReason = 'Excessive spam of @everyone or @here mentions.';
          await message.member.kick(kickReason);
          const kickEmbed = new EmbedBuilder()
            .setTitle('User Kicked')
            .setDescription(`${message.author.tag} was kicked for excessive spam of mentions.`)
            .setColor('Red')
            .setTimestamp();
          message.channel.send({ embeds: [kickEmbed] });
        } catch (err) {
          console.error('Failed to kick user:', err);
        }
      } else {
        // Jika belum mencapai threshold, beri peringatan
        const mentionWarning = new EmbedBuilder()
          .setTitle('⚠️ Warning: Spam Mentions')
          .setDescription(`Please do not spam @everyone or @here. Continued offenses may result in a kick. Please review our [Terms of Service](https://mashshop.github.io/ToS-Omni-Bot/).`)
          .setColor('Yellow')
          .setTimestamp();
        try {
          await message.reply({ embeds: [mentionWarning], ephemeral: true });
        } catch (err) {
          console.error('Failed to send mention warning:', err);
        }
      }
    }
  },
};