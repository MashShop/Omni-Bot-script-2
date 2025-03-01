const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('invitebot')
    .setDescription('Get the invite link for Omni Bot.'),
    
  async execute(interaction) {
    const inviteLink = 'https://discord.com/oauth2/authorize?client_id=1342885164027482112&permissions=8&scope=bot%20applications.commands';
    
    await interaction.reply(`🔗 **Invite Omni Bot to your server:**\n${inviteLink}`);
  },
};