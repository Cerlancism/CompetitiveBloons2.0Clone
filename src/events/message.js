const Logger = require('../utility/Logger.js');
const CommandService = require('../services/CommandService.js');
const client = require('../structures/client.js');

client.on('message', (msg) => {
  return CommandService.run(msg)
    .catch((err) => Logger.handleError(err));
});
