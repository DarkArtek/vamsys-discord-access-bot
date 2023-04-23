const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const accessRequestModal = require('../modal/AccessModal').data;

module.exports = {
  data: new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('activate-modal')
        .setLabel('Request Access')
        .setStyle(ButtonStyle.Primary),
    ),
  async execute(interaction) {
    const modalToDisplay = accessRequestModal;
    modalToDisplay.setTitle(`Request access to ${interaction.guild.name}`);

    interaction.showModal(accessRequestModal);
  },
};
