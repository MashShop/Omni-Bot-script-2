const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
const createWelcomeImage = require('../utils/welcomeImage');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member, client) {
        const welcomeChannelId = 'ID_CHANNEL_WELCOME'; // Ganti dengan ID channel welcome
        const welcomeChannel = client.channels.cache.get(welcomeChannelId);

        if (!welcomeChannel) return;

        const welcomeImage = await createWelcomeImage(member.user);
        const attachment = new AttachmentBuilder(welcomeImage, { name: 'welcome.png' });

        const embed = new EmbedBuilder()
            .setColor('#00ff00')
            .setTitle(`👋 Welcome, ${member.user.username}!`)
            .setDescription(`Selamat datang di **${member.guild.name}**, ${member.user.username}!`)
            .setImage('attachment://welcome.png')
            .setFooter({ text: `Total Members: ${member.guild.memberCount}` });

        welcomeChannel.send({ embeds: [embed], files: [attachment] });
    },
};