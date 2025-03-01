const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { GiveawaysManager } = require('discord-giveaways');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('giveaway')
    .setDescription('Create a giveaway.')
    .addIntegerOption(option =>
      option.setName('duration')
        .setDescription('Duration in minutes')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('winners')
        .setDescription('Number of winners')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('prize')
        .setDescription('Giveaway prize')
        .setRequired(true)),

  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
      return interaction.reply({ content: '❌ You need **Manage Messages** permission.', ephemeral: true });
    }

    const duration = interaction.options.getInteger('duration') * 60000;
    const winners = interaction.options.getInteger('winners');
    const prize = interaction.options.getString('prize');

    const embed = new EmbedBuilder()
      .setTitle('🎉 Giveaway Started!')
      .setDescription(`React with 🎉 to participate!\n\n**Prize:** ${prize}\n**Winners:** ${winners}`)
      .setColor('Gold')
      .setTimestamp(Date.now() + duration);

    const giveawayMessage = await interaction.reply({ embeds: [embed], fetchReply: true });
    await giveawayMessage.react('🎉');

    setTimeout(async () => {
      const message = await interaction.channel.messages.fetch(giveawayMessage.id);
      const reactions = message.reactions.cache.get('🎉');

      if (!reactions || reactions.count <= 1) {
        return interaction.channel.send('❌ Not enough participants.');
      }

      const users = await reactions.users.fetch();
      const participants = users.filter(user => !user.bot).map(user => user.id);
      if (participants.length < winners) {
        return interaction.channel.send('❌ Not enough participants to pick winners.');
      }

      const shuffled = participants.sort(() => Math.random() - 0.5);
      const selectedWinners = shuffled.slice(0, winners).map(id => `<@${id}>`).join(', ');

      const resultEmbed = new EmbedBuilder()
        .setTitle('🎊 Giveaway Ended!')
        .setDescription(`**Prize:** ${prize}\n**Winners:** ${selectedWinners}`)
        .setColor('Green');

      await interaction.channel.send({ embeds: [resultEmbed] });
    }, duration);
  },
};