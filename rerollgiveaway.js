const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rerollgiveaway')
    .setDescription('Rerolls the giveaway winner.')
    .addStringOption(option =>
      option.setName('message_id')
        .setDescription('The message ID of the giveaway')
        .setRequired(true)),

  async execute(interaction) {
    const messageId = interaction.options.getString('message_id');
    const giveawayMessage = await interaction.channel.messages.fetch(messageId).catch(() => null);

    if (!giveawayMessage) {
      return interaction.reply({ content: '❌ Giveaway message not found.', ephemeral: true });
    }

    const users = await giveawayMessage.reactions.resolve('🎉')?.users.fetch();
    if (!users || users.size < 1) {
      return interaction.reply({ content: '❌ No participants found.', ephemeral: true });
    }

    const newWinner = users.filter(user => !user.bot).random();
    if (!newWinner) {
      return interaction.reply({ content: '❌ No valid winner found.', ephemeral: true });
    }

    await interaction.reply(`🔄 The giveaway has been rerolled! Congratulations, ${newWinner}!`);
  }
};