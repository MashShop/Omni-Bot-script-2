const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('createserver')
    .setDescription('Helps set up a server structure with categories, channels, and roles.')
    .addStringOption(option =>
      option.setName('theme')
        .setDescription('The theme of the server you want to create')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('roles')
        .setDescription('Separate each role with a comma, e.g., Admin,Moderator,Member')
        .setRequired(false))
    .addStringOption(option =>
      option.setName('categories')
        .setDescription('Separate each category with a comma, e.g., Information,Social,Voice')
        .setRequired(false))
    .addStringOption(option =>
      option.setName('channels')
        .setDescription('Separate each channel with a comma, e.g., general,announcements,rules')
        .setRequired(false)),

  async execute(interaction) {
    const { guild } = interaction;
    const theme = interaction.options.getString('theme');
    const rolesInput = interaction.options.getString('roles');
    const categoriesInput = interaction.options.getString('categories');
    const channelsInput = interaction.options.getString('channels');

    await interaction.reply(`🛠️ Setting up the server with theme **${theme}**...`);

    // Creating roles
    if (rolesInput) {
      const roles = rolesInput.split(',').map(role => role.trim());
      for (const role of roles) {
        await guild.roles.create({ name: role, permissions: [] });
      }
    }

    // Creating categories
    let categories = {};
    if (categoriesInput) {
      const categoryNames = categoriesInput.split(',').map(cat => cat.trim());
      for (const name of categoryNames) {
        const category = await guild.channels.create({
          name,
          type: 4, // 4 is a category
        });
        categories[name] = category.id;
      }
    }

    // Creating channels
    if (channelsInput) {
      const channels = channelsInput.split(',').map(ch => ch.trim());
      for (const channel of channels) {
        let parentCategory = null;
        if (Object.keys(categories).length > 0) {
          parentCategory = Object.values(categories)[0]; // Assign first category if available
        }

        await guild.channels.create({
          name: channel,
          type: 0, // 0 is a text channel
          parent: parentCategory,
        });
      }
    }

    await interaction.editReply('✅ Server setup completed successfully!');
  },
};