const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('endgiveaway')
    .setDescription('Ends an active giveaway and selects a winner.')
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

    const winner = users.filter(user => !user.bot).random();
    if (!winner) {
      return interaction.reply({ content: '❌ No valid winner found.', ephemeral: true });
    }

    await interaction.reply(`🎉 The giveaway has ended! Congratulations, ${winner}!`);
  }
};