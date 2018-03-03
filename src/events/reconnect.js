const Logger = require('../utility/Logger.js');
const client = require('../structures/client.js');

client.on('reconnect', () => {
  Logger.log('Bot is attempting to reconnect...', 'INFO');
});
