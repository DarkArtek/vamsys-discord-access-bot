const DiscordBot = require('./src');
const { DISCORD_TOKEN, BOT_SERVERS, NICK_FORMAT } = require('./src/constants/configuration');

var configFile = require('../../config/config.json');

async function start() {
  try {
		console.log(configFile.nickFormat);
		console.log(NICK_FORMAT);
    new DiscordBot(DISCORD_TOKEN, BOT_SERVERS);
  } catch(e) {
    console.log(e)
  }
}

start();
