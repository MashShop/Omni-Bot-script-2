const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loan')
        .setDescription('Borrow money from the bank.')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('The amount of money you want to borrow')
                .setRequired(true)),
    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');
        const userId = interaction.user.id;

        // Database check (replace with real database system)
        const userLoan = await getUserLoan(userId);
        const userBalance = await getUserBalance(userId);

        if (userLoan + amount > 10000) {
            return interaction.reply({ content: "You can't borrow more than $10,000!", ephemeral: true });
        }

        // Update loan and balance
        await updateUserLoan(userId, userLoan + amount);
        await updateUserBalance(userId, userBalance + amount);

        return interaction.reply({ content: `You borrowed **$${amount}** from the bank. Don't forget to pay it back!`, ephemeral: false });
    }
};

// Dummy database functions (replace with real database)
async function getUserLoan(userId) {
    return 0; // Example: user has no loan initially
}

async function getUserBalance(userId) {
    return 1000; // Example balance
}

async function updateUserLoan(userId, newLoan) {
    console.log(`Updated ${userId}'s loan balance to $${newLoan}`);
}

async function updateUserBalance(userId, newBalance) {
    console.log(`Updated ${userId}'s balance to $${newBalance}`);
}