import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('help')
  .setDescription("Display a list of all available commands for Omni Bot");

export async function execute(interaction) {
  // Ambil semua command yang sudah didaftarkan
  const commands = interaction.client.commands.map(cmd => {
    return `/${cmd.data.name} - ${cmd.data.description}`;
  });
  
  // Gabungkan semua command menjadi satu string, dipisahkan dengan newline
  const fullCommandList = commands.join('\n');
  
  // Bagi string command menjadi potongan-potongan agar tiap field tidak melebihi batas 1024 karakter Discord
  const fields = [];
  for (let i = 0; i < fullCommandList.length; i += 1024) {
    fields.push({
      name: i === 0 ? "Commands" : "Commands (continued)",
      value: fullCommandList.substring(i, i + 1024)
    });
  }
  
  const embed = new EmbedBuilder()
    .setTitle("Omni Bot Commands")
    .setDescription("Below is the complete list of available commands:")
    .setColor(0x00AE86)
    .addFields(fields);
    
  await interaction.reply({ embeds: [embed], ephemeral: true });
}