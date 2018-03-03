const Logger = require('../utility/Logger.js');
const client = require('../structures/client.js');

client.on('error', (err) => {
  Logger.handleError(err);
});
