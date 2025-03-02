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

// 1) Load events from the /events folder (fix missing folder)
const eventsPath = path.join(__dirname, 'events');
if (!fs.existsSync(eventsPath)) {
  console.log("⚠️ Folder 'events' tidak ditemukan, membuat folder...");
  fs.mkdirSync(eventsPath);
}

fs.readdirSync(eventsPath).forEach(file => {
  if (file.endsWith('.js')) {
    try {
      const event = require(path.join(eventsPath, file));
      if (event.name) {
        client.on(event.name, (...args) => event.execute(...args, client));
        console.log(`✅ Event '${event.name}' loaded.`);
      }
    } catch (error) {
      console.error(`❌ Gagal memuat event ${file}:`, error);
    }
  }
});

// 2) Load commands from the /commands folder (fix missing folder)
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');

if (!fs.existsSync(commandsPath)) {
  console.log("⚠️ Folder 'commands' tidak ditemukan, membuat folder...");
  fs.mkdirSync(commandsPath);
}

const commandFolders = fs.readdirSync(commandsPath);

for (const folder of commandFolders) {
  const folderPath = path.join(commandsPath, folder);
  if (fs.statSync(folderPath).isDirectory()) {
    const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
      try {
        const command = require(path.join(folderPath, file));
        client.commands.set(command.data.name, command);
        console.log(`✅ Command '${command.data.name}' loaded.`);
      } catch (error) {
        console.error(`❌ Gagal memuat command ${file}:`, error);
      }
    }
  } else if (folder.endsWith('.js')) {
    try {
      const command = require(path.join(commandsPath, folder));
      client.commands.set(command.data.name, command);
      console.log(`✅ Command '${command.data.name}' loaded.`);
    } catch (error) {
      console.error(`❌ Gagal memuat command ${folder}:`, error);
    }
  }
}

// 3) Interaction handler for slash commands
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction, client);
  } catch (error) {
    console.error(`❌ Error saat menjalankan command '${interaction.commandName}':`, error);
    await interaction.reply({ content: '❌ An error occurred while executing the command!', ephemeral: true });
  }
});

// 4) When the bot is ready
client.once('ready', () => {
  console.log(`✅ Bot is online as ${client.user.tag}`);
});

// 5) Login with token from .env
client.login(process.env.TOKEN).catch(error => {
  console.error("❌ Gagal login! Periksa TOKEN di file .env", error);
});
