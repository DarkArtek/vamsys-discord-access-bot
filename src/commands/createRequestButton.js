const { SlashCommandBuilder } = require('discord.js');

const accessRequestButton = require('../components/activateModal').data;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('requestaccessity')
    .setDescription('Creates a request access button in the current channel.')
    .setDefaultMemberPermissions(0),
  async execute(interaction) {
    console.log(`Handling createRequestButton command for ${interaction?.user?.tag}`)

    await interaction.deferReply();
    await interaction.channel.send({ components: [ accessRequestButton ] });
    await interaction.deleteReply();
  }
}