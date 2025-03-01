const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'guildMemberRemove',
    execute(member, client) {
        const goodbyeChannelId = 'ID_CHANNEL_GOODBYE'; // Ganti dengan ID channel goodbye
        const goodbyeChannel = client.channels.cache.get(goodbyeChannelId);

        if (!goodbyeChannel) return;

        const embed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle(`🚪 ${member.user.username} has left`)
            .setDescription(`Goodbye ${member.user.username}, we will miss you!`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setFooter({ text: `Total Members: ${member.guild.memberCount}` });

        goodbyeChannel.send({ embeds: [embed] });
    },
};