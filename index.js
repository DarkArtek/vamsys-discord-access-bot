const DiscordBot = require('./src');
const { DISCORD_TOKEN, BOT_SERVERS } = require('./src/const/conf');

async function start() {
  try {
    new DiscordBot(DISCORD_TOKEN, BOT_SERVERS);
  } catch (e) {
    console.log(e);
  }
}

start();
