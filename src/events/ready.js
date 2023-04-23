module.exports = async (client) => {
  console.log('Client Ready');

  try {
    await client.checkRoleConfiguration();
  } catch (e) {
    throw new Error(e);
    return;
  }

  console.log('Roles are configurated correctly');

  await client.loadCommands();
  await client.loadComponents();
  await client.laodModals();

  console.log('Ready');
};
