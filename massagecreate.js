module.exports = {
    name: 'messageCreate',
    execute(message) {
        if (message.author.bot) return;
        console.log(`[${message.author.tag}]: ${message.content}`);
    },
};