module.exports = async (client) => {
    console.log('Client ready');
  
    try {
        await client.checkRoleConfiguration();
    } catch(e) {
      throw new Error(e);
      return;
    }
  
    console.log('Roles are configured correctly');
    
    await client.loadCommands();
    await client.loadComponents();
    await client.loadModals();
  
    console.log('Bot ready');
  }