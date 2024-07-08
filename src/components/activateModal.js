const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const accessRequestModal = require('../modals/AccessModal').data;

module.exports = {
  data: new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('activate-modal')
        .setLabel('Request Access')
        .setStyle(ButtonStyle.Success)
    ),
  async execute(interaction) {
    const modalToDisplay = accessRequestModal;
    modalToDisplay.setTitle(`Request access`)

    interaction.showModal(accessRequestModal)
  }
}