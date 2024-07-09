var configFile = require('../../config/config.json');

// vAMSYS API key from the config.json file
const VAMSYS_API_KEY = configFile.vamsysKey;

// Discord token from the config.json file
const DISCORD_TOKEN = configFile.discordToken;

// Servers from the config.json file
const BOT_SERVERS = configFile.servers;

// AirlineID from the config.json file
const AIRLINE_ID = configFile.airlineId;

// Nickname Format from the config.json file
const NICK_FORMAT = configFile.nickFormat;

module.exports = {
  VAMSYS_API_KEY,
  DISCORD_TOKEN,
  BOT_SERVERS,
  AIRLINE_ID,
	NICK_FORMAT,
}
