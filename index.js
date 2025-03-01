require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent
  ]
});

// 1) Load events from the /events folder
const eventsPath = path.join(__dirname, 'events');
fs.readdirSync(eventsPath).forEach(file => {
  if (file.endsWith('.js')) {
    const event = require(path.join(eventsPath, file));
    // If the event file exports an object with "name" and "execute", we register it
    if (event.name) {
      client.on(event.name, (...args) => event.execute(...args, client));
    }
  }
});

// 2) Load commands from the /commands folder (including subfolders)
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(commandsPath);

for (const folder of commandFolders) {
  const folderPath = path.join(commandsPath, folder);
  // If it's a directory, load all .js files inside it
  if (fs.statSync(folderPath).isDirectory()) {
    const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
      const command = require(path.join(folderPath, file));
      // We assume each command exports { data: SlashCommandBuilder, execute(interaction) }
      client.commands.set(command.data.name, command);
    }
  } else {
    // If it's a single file in /commands (no subfolder)
    if (folder.endsWith('.js')) {
      const command = require(path.join(commandsPath, folder));
      client.commands.set(command.data.name, command);
    }
  }
}

// 3) Interaction handler for slash commands
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    // Some commands might need (interaction, client)
    await command.execute(interaction, client);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: '❌ An error occurred while executing the command!', ephemeral: true });
  }
});

// 4) When the bot is ready
client.once('ready', () => {
  console.log(`✅ Bot is online as ${client.user.tag}`);
});

// 5) Login with token from .env
client.login(process.env.TOKEN);