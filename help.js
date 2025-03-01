const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Displays a list of commands from the screenshots (categorized).'),

  async execute(interaction) {
    // EXACT commands from your screenshots:
    const categories = {
      Moderation: [
        'antiraid',
        'autorole',
        'ban',
        'createrules',
        'endgiveaway',
        'giveaway',
        'joinrole',
        'kick',
        'mute',
        'nickname',
        'purge',
        'reactionrole',
        'rereollgiveaway',
        'role',
        'setlogs',
        'slowmode',
        'timeout',
        'unban',
        'warn'
      ],
      Music: [
        'autoplay',
        'bassboost',
        'clearqueue',
        'loop',
        'lyrics',
        'nowplaying',
        'pause',
        'play',
        'queue',
        'remove',
        'resume',
        'shuffle',
        'skip',
        'volume'
      ],
      Economy: [
        'balance',
        'bank',
        'beg',
        'buy',
        'daily',
        'deposit',
        'gamble',
        'help',
        'inventory',
        'leaderboard',
        'ping',
        'rob',
        'shop',
        'transfer',
        'work'
      ],
      Fun: [
        '8ball',
        'coinflip',
        'fact',
        'insult',
        'joke',
        'kill',
        'kiss',
        'marry',
        'meme',
        'pun',
        'roast',
        'slap',
        'wasted'
      ],
      Utility: [
        'Avatar',
        'botinfo',
        'createserver',
        'invitebot',
        'ping',
        'serverinfo',
        'setupverify',
        'uptime',
        'userinfo',
        'vip'
      ]
    };

    // Build select menu options from these categories
    const menuOptions = Object.keys(categories).map(category => ({
      label: category,
      value: category,
      description: `View commands for ${category}`
    }));

    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId('help_select')
      .setPlaceholder('Select a command category')
      .addOptions(menuOptions);

    const row = new ActionRowBuilder().addComponents(selectMenu);

    // Main embed
    const mainEmbed = new EmbedBuilder()
      .setTitle('OmniBot Help')
      .setDescription('Pick a category below to see its commands.')
      .setColor('BLUE')
      .setTimestamp();

    // Send ephemeral message with select menu
    await interaction.reply({ embeds: [mainEmbed], components: [row], ephemeral: true });

    // Create collector to handle the select menu
    const filter = i => i.customId === 'help_select' && i.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000, max: 1 });

    collector.on('collect', async i => {
      const chosenCategory = i.values[0];
      const commandsList = categories[chosenCategory].map(cmd => `\`${cmd}\``).join(', ');

      const detailEmbed = new EmbedBuilder()
        .setTitle(`${chosenCategory} Commands`)
        .setDescription(commandsList)
        .setColor('GREEN')
        .setTimestamp();

      await i.update({ embeds: [detailEmbed], components: [] });
    });

    collector.on('end', collected => {
      if (collected.size === 0) {
        // If user never selects anything, remove the menu
        interaction.editReply({ components: [] });
      }
    });
  },
};