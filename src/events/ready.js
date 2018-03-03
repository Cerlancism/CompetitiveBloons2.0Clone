const Constants = require('../utility/Constants.js');
const Logger = require('../utility/Logger.js');
const client = require('../structures/client.js');

client.on('ready', async () => {
  Logger.log('Bot has successfully connected.', 'INFO');
  return client.user.setGame(Constants.game);
});
