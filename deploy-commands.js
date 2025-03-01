const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const clientId = process.env.CLIENT_ID;  // Your bot's Client ID
const guildId = process.env.GUILD_ID;      // If you want to register guild commands (for testing), otherwise leave this out for global commands.
const token = process.env.TOKEN;

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(commandsPath);
for (const folder of commandFolders) {
    const folderPath = path.join(commandsPath, folder);
    const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(folderPath, file);
        const command = require(filePath);
        commands.push(command.data.toJSON());
    }
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);
        
        // Register as guild commands (for faster updates during development)
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands }
        );
        
        // Uncomment di bawah untuk mendaftarkan sebagai global commands (butuh waktu hingga 1 jam untuk update)
        /*
        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands }
        );
        */
        
        console.log(`Successfully reloaded application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();