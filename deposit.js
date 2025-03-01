const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deposit')
        .setDescription('Deposit money into your bank account.')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('The amount of money to deposit')
                .setRequired(true)),
    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');
        const userId = interaction.user.id;

        // Database check (replace with your DB system)
        const userBalance = await getUserBalance(userId); // Function to get balance
        const userBank = await getUserBank(userId); // Function to get bank balance

        if (amount > userBalance) {
            return interaction.reply({ content: "You don't have enough money!", ephemeral: true });
        }

        // Update balances
        await updateUserBalance(userId, userBalance - amount);
        await updateUserBank(userId, userBank + amount);

        return interaction.reply({ content: `You deposited **$${amount}** into your bank!`, ephemeral: false });
    }
};

// Dummy database functions (replace with real database)
async function getUserBalance(userId) {
    return 1000; // Example balance
}

async function getUserBank(userId) {
    return 5000; // Example bank balance
}

async function updateUserBalance(userId, newBalance) {
    console.log(`Updated ${userId}'s balance to $${newBalance}`);
}

async function updateUserBank(userId, newBankBalance) {
    console.log(`Updated ${userId}'s bank balance to $${newBankBalance}`);
}