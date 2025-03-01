import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('marry')
  .setDescription('Propose marriage to a member')
  .addUserOption(option =>
    option.setName('target')
      .setDescription('The member you want to marry')
      .setRequired(true)
  );

export async function execute(interaction) {
  const proposer = interaction.user;
  const target = interaction.options.getUser('target');

  if (target.id === proposer.id) {
    return interaction.reply({ content: "You cannot propose to yourself!", ephemeral: true });
  }

  const proposalEmbed = new EmbedBuilder()
    .setTitle("Marriage Proposal")
    .setDescription(`${target}, do you accept the marriage proposal from ${proposer}? React with ✅ for Yes or ❌ for No.`)
    .setColor(0x00AE86);

  // Kirim pesan proposal dan simpan message-nya
  const proposalMessage = await interaction.reply({ embeds: [proposalEmbed], fetchReply: true });

  try {
    await proposalMessage.react('✅');
    await proposalMessage.react('❌');
  } catch (err) {
    console.error("Error adding reactions: ", err);
    return;
  }

  // Filter: hanya ambil reaksi dari target dan hanya emoji ✅ atau ❌
  const filter = (reaction, user) => {
    return ['✅', '❌'].includes(reaction.emoji.name) && user.id === target.id;
  };

  proposalMessage.awaitReactions({ filter, max: 1, time: 30000, errors: ['time'] })
    .then(collected => {
      const reaction = collected.first();
      if (reaction.emoji.name === '✅') {
        // Jika target memilih Yes: kedua belah pihak dapat GIF married
        const marriedGifs = [
          'https://example.com/married1.gif',
          'https://example.com/married2.gif'
        ];
        const marriedGif = marriedGifs[Math.floor(Math.random() * marriedGifs.length)];
        const acceptedEmbed = new EmbedBuilder()
          .setTitle("Marriage Accepted!")
          .setDescription(`${target} accepted the marriage proposal from ${proposer}!`)
          .setImage(marriedGif)
          .setColor(0x00AE86);
        interaction.followUp({ embeds: [acceptedEmbed] });
      } else if (reaction.emoji.name === '❌') {
        // Jika target memilih No: proposer mendapatkan GIF wasted
        const wastedGifs = [
          'https://example.com/wasted1.gif',
          'https://example.com/wasted2.gif'
        ];
        const wastedGif = wastedGifs[Math.floor(Math.random() * wastedGifs.length)];
        const declinedEmbed = new EmbedBuilder()
          .setTitle("Marriage Declined")
          .setDescription(`${target} declined the marriage proposal from ${proposer}. As a result, ${proposer} got wasted!`)
          .setImage(wastedGif)
          .setColor(0xFF0000);
        interaction.followUp({ embeds: [declinedEmbed] });
      }
    })
    .catch(() => {
      interaction.followUp({ content: 'No reaction was collected. Marriage proposal timed out.', ephemeral: true });
    });
}