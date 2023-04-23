const { InteractionType, ComponentType } = require('discord.js');

module.exports = async (interaction) => {
  let interactionId;

  switch (interaction.type) {
    case InteractionType.ApplicationCommand:
      interactionId = interaction.commandName;
      console.log(`${interactionId} COMMAND interaction from ${interaction?.user?.tag} registered`);
      break;

    case InteractionType.MessageComponent:
      if (interaction.componentType === ComponentType.Button) {
        interactionId = interaction.customId;
        console.log(`${interactionId} BUTTON interaction from ${interaction?.user?.tag} registered`);
      }
      break;

    case InteractionType.ModalSubmit:
      interactionId = interaction.customId;
      console.log(`${interactionId} MODAL submission from ${interaction?.user?.tag} registered`);
      break;

    default:
      console.log(`${interactionId} interaction from ${interaction?.user?.tag} not handled`);
      return;
  }

  const interactionHandler = interaction.client.handlers.get(interactionId);

  console.log(interactionId);

  try {
    return await interactionHandler.execute(interaction);
  } catch (e) {
    console.log(e);
  }
};
