import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('8ball')
  .setDescription('Ask the magic 8ball a question')
  .addStringOption(option =>
    option.setName('question')
      .setDescription('Your question (optional)')
      .setRequired(false)
  );

export async function execute(interaction) {
  const defaultQuestions = [
    "Will I be rich?", "Is today my lucky day?", "Should I take that risk?",
    "Will I find love?", "Is success in my future?", "Should I trust my intuition?"
  ];
  const userQuestion = interaction.options.getString('question');
  const question = userQuestion || defaultQuestions[Math.floor(Math.random() * defaultQuestions.length)];
  
  const responses = [
    'It is certain.', 'It is decidedly so.', 'Without a doubt.', 'Yes – definitely.',
    'You may rely on it.', 'As I see it, yes.', 'Most likely.', 'Outlook good.',
    'Yes.', 'Signs point to yes.', 'Reply hazy, try again.', 'Ask again later.',
    'Better not tell you now.', 'Cannot predict now.', 'Concentrate and ask again.',
    'Don’t count on it.', 'My reply is no.', 'My sources say no.', 'Outlook not so good.',
    'Very doubtful.'
  ];
  const answer = responses[Math.floor(Math.random() * responses.length)];
  await interaction.reply(`🎱 **Question:** ${question}\n**Answer:** ${answer}`);
}