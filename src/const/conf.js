const confFile = require('../../conf.jsonc');

// read the vAMSYS API Key from config file
const VAMSYS_API_KEY = confFile.vamsysKey;

// Discord Token from config file
const DISCORD_TOKEN = confFile.discordToken;

// Server(s) ID from config file
const BOT_SERVERS = confFile.servers;

// Airline ID
const AIRLINE = confFile.airlineId;

module.exports = {
  VAMSYS_API_KEY,
  DISCORD_TOKEN,
  BOT_SERVERS,
  AIRLINE,
};
