const DiscordBot = require('./src');
const { DISCORD_TOKEN, BOT_SERVERS, NICK_FORMAT } = require('./src/constants/configuration');

async function start() {
  try {
		console.log(NICK_FORMAT);
    new DiscordBot(DISCORD_TOKEN, BOT_SERVERS);
  } catch(e) {
    console.log(e)
  }
}

start();
