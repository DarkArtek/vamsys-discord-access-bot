const { SlashCommandBuilder } = require('discord.js');
const accessRequestButton = require('../components/activateModal').data;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('createRequestButton')
    .setDescription('Creates a request button inside current channel')
    .setDefaultMemberPermissions(0),
  async execute(interaction) {
    console.log(`Handling createRequestButton command for ${interaction?.user?.tag}`);

    await interaction.deferReply();
    await interaction.channel.send({ components: [accessRequestButton] });
    await interaction.deleteReply();
  },
};
