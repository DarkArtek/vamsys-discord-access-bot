const fs = require('fs');
const path = require('path');

const { Client, Collection, GatewayIntentBits, ApplicationCommandPermissionType } = require('discord.js');

class DiscordBot extends Client {
  #token;
  #servers;

  constructor(token, servers) {
    console.log(`Creating new Discord bot for ${token.substr(-8)}`);
    super({ intents: [ GatewayIntentBits.Guilds ] })

    this.handlers = new Collection();

    this.#token = token;
    this.#servers = servers;

    this.login(this.#token);
    this.loadEvents();
  }

  /**
   * Validates the role configuration in the server
   * ie. bot role should be > role that is being awarded
   * @returns {boolean}
   */
  async checkRoleConfiguration() {
    return new Promise(async (resolve, reject) => {
      for await (const guildId of Object.keys(this.#servers)) {
        const guild = await this?.guilds.fetch(guildId);
        const botRole = await guild.roles.botRoleFor(this.user.id);
  
        const assignmentRoles = this.getServerConfiguration(guildId).accessRoleId;
  
        assignmentRoles.forEach(async roleToAdd => {
          const roleComparison = await guild.roles.comparePositions(botRole, roleToAdd);
  
          if (roleComparison <= 0) {
            reject(`Role ${roleToAdd} is lower in the role hierachy in comparison to the bot's role. The bot role needs to be moved higher in the role hierarchy settings for the server.`);
          }
        })
  
        const roleRemovalEnabled = this.getServerConfiguration(guildId).roleRemoval.enabled;
  
        if (roleRemovalEnabled) {
          const removalRoles = this.getServerConfiguration(guildId).roleRemoval.roleId;
  
          removalRoles.forEach(async roleToRemove => {
            const roleComparison = await guild.roles.comparePositions(botRole, roleToRemove);
  
            if (roleComparison <= 0) {
              reject(`Role ${roleToRemove} is lower in the role hierachy in comparison to the bot's role. The bot role needs to be moved higher in the role hierarchy settings for the server.`);
            }
          })
        }
      }

      resolve(true);
    })

    return await !roleConfigurations.includes(false);
  }

  /**
   * Gets the JSON bot configuration for a server, given a server ID.
   * @param {Snowflake} serverId
   * @returns {Object}
   */
  getServerConfiguration(serverId) {
    return this.#servers[serverId];
  }

  /**
   * Loads Discord '.on' events
   */
  loadEvents() {
    console.log('Loading events...')

    const eventFiles = fs.readdirSync(path.join(__dirname, 'events')).filter(fileName => { return fileName.endsWith('.js'); });

    eventFiles.forEach(fileName => {
      const eventHandler = require(`./events/${fileName}`);
      const eventName = fileName.split('.js')[0];

      this.on(eventName, eventHandler)
    })
  }

  /**
   * Loads slash commands
   */
   async loadCommands() {
    console.log('Loading commands...');

    const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(fileName => { return fileName.endsWith('.js') });

    const commands = commandFiles.map(fileName => {
      const commandInfo = require(`./commands/${fileName}`);
      commandInfo.data.setDefaultPermission(false);

      this.handlers.set(commandInfo.data.name, commandInfo);

      return commandInfo.data.toJSON();
    });

    Object.entries(this.#servers).forEach(async ([guildId, server]) => {
      console.log('Registering commands...')

      await this.application.commands.set(commands, guildId);
    });
  }

  /**
   * Adds components and modals to Discord client for reference and easier component interaction handling
   */
  loadComponents() {
    console.log('Loading components...')

    const buttons = fs.readdirSync(path.join(__dirname, 'components')).filter(fileName => { return fileName.endsWith('.js') });

    buttons.forEach(fileName => {
      const buttonInfo = require(`./components/${fileName}`);

      buttonInfo.data.components.forEach(component => {
        this.handlers.set(component.data.custom_id, buttonInfo);
      })
    });
  }

  loadModals() {
    console.log('Loading modals...')

    const modals = fs.readdirSync(path.join(__dirname, 'modals')).filter(fileName => { return fileName.endsWith('.js') });

    modals.forEach(fileName => {
      const modalInfo = require(`./modals/${fileName}`);

      const modal = modalInfo.data;
      this.handlers.set(modal.data.custom_id, modalInfo);
    });
  }
  
}

module.exports = DiscordBot;